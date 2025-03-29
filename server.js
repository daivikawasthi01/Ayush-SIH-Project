const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('./models/user'); // Ensure this path is correct
const multer = require('multer');
const session = require('express-session');
const axios = require('axios');
const FormData = require('form-data');
const fs = require('fs'); // Required for reading files
const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Connect to MongoDB Atlas
mongoose.connect('mongodb+srv://bitterlipshai:vZufH8O82sMLVmCG@mydatabase.nwhl5.mongodb.net/?retryWrites=true&w=majority&appName=mydatabase', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('MongoDB connected'))
.catch(err => {
  console.error('Error connecting to MongoDB:', err);
  process.exit(1);
});

app.use(session({
  secret: 'your_secret_key',
  resave: false,
  saveUninitialized: true,
  cookie: { secure: false } // Set to true if using HTTPS
}));

// Middleware to authenticate requests
const authenticateToken = (req, res, next) => {
  const token = req.headers['authorization']?.split(' ')[1];
  if (!token) return res.status(401).json({ authenticated: false });

  jwt.verify(token, 'your_jwt_secret', (err, user) => {
    if (err) return res.status(403).json({ authenticated: false });
    req.user = user;
    next();
  });
};


// Multer configuration for file upload
const upload = multer({ dest: '../uploads' });

// Signup route
app.post('/signup', async (req, res) => {
  const { username, email, password } = req.body;

  try {
    if (!username || !email || !password) {
      return res.status(400).json({ message: 'All fields are required' });
    }

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) return res.status(400).json({ message: 'Email already exists' });

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new user
    const newUser = new User({ username, email, password: hashedPassword });
    await newUser.save();

    res.json({ message: 'Signup successful' });
  } catch (err) {
    console.error('Error during signup:', err);
    res.status(500).json({ message: 'Server error' });
  }
});

// Login route
app.post('/login', async (req, res) => {
  const { username, password } = req.body;

  try {
    const user = await User.findOne({ username });
    if (!user) return res.status(400).json({ message: 'User not found' });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ message: 'Invalid credentials' });

    const token = jwt.sign({ id: user._id }, 'your_jwt_secret', { expiresIn: '1h' });
    res.json({ token });
  } catch (err) {
    console.error('Error during login:', err);
    res.status(500).json({ message: 'Server error' });
  }
});

// Register route with file upload
app.post('/register', upload.single('establishmentCopy'), authenticateToken, async (req, res) => {
  try {
    const userId = req.user.id;
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    if (user.registrationCompleted) {
      return res.status(400).json({ message: 'User has already registered' });
    }

    user.registration = {
      organizationType: req.body.organizationType,
      subOrganizationType: req.body.subOrganizationType,
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      organizationName: req.body.organizationName,
      gender: req.body.gender,
      contactNumber: req.body.contactNumber,
      state: req.body.state,
      district: req.body.district,
      address: req.body.address,
      pincode: req.body.pincode,
      mobileNumber: req.body.mobileNumber,
      email: req.body.email,
      establishmentCopy: req.file ? req.file.path : '../uploads',
      headOfOrganization: req.body.headOfOrganization,
      orgAddress: req.body.orgAddress,
      orgContactNumber: req.body.orgContactNumber,
      orgEmailID: req.body.orgEmailID,
      coordinatorName: req.body.coordinatorName,
      coordinatorContactNumber: req.body.coordinatorContactNumber,
      coordinatorEmailID: req.body.coordinatorEmailID,
    };

    // Initialize request status
    user.requestStatus = {
      requestReceived: 0,
      inProgress: 0,
      completed: 0,
    };

    user.registrationCompleted = true;
    await user.save();
    res.status(200).json({ message: 'Registration successful' });
  } catch (err) {
    console.error('Error during registration:', err);
    res.status(500).json({ message: 'Server error' });
  }
});





// Get registration details

app.get('/registration-details', authenticateToken, async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    if (!user || !user.registration) {
      return res.status(404).json({ message: 'No registration found' });
    }
    res.json(user.registration);
  } catch (err) {
    console.error('Error fetching registration details:', err);
    res.status(500).json({ message: 'Server error' });
  }
});



// Logout route
app.post('/logout', (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      return res.status(500).send('Logout failed');
    }
    res.clearCookie('connect.sid'); // If using session cookies
    res.status(200).send('Logout successful');
  });
});

// Check authentication status
app.get('/checkAuth', authenticateToken, (req, res) => {
  res.json({ authenticated: true });
});

// Start the server
const PORT = process.env.PORT || 4001;
app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});
