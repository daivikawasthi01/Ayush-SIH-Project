const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  registration: {
    organizationType: String,
    subOrganizationType: String,
    firstName: String,
    lastName: String,
    organizationName: String,
    gender: String,
    contactNumber: String,
    state: String,
    district: String,
    address: String,
    pincode: String,
    mobileNumber: String,
    email: String,
    establishmentCopy: String,
    headOfOrganization: String,
    orgAddress: String,
    orgContactNumber: String,
    orgEmailID: String,
    coordinatorName: String,
    coordinatorContactNumber: String,
    coordinatorEmailID: String,
  },
  registrationCompleted: { type: Boolean, default: false },
  requestStatus: { 
    requestReceived: Number,
    inProgress: Number,
    completed: Number,
  }
});

module.exports = mongoose.model('User', userSchema);
