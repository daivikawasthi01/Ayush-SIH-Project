# AYUSH Startup Support Portal

A full-stack web portal (built for Smart India Hackathon) that handles registration and regulatory tracking for startups in the AYUSH sector (Ayurveda, Yoga, Unani, Siddha, and Homeopathy). Organizations can sign up, submit a registration form with supporting documents, and track their application status.

## Features

- **User authentication** — signup/login with hashed passwords (bcrypt) and JWT-based session checks.
- **Startup registration form** — captures organization type, contact details, address, and an uploaded establishment document (via Multer file uploads).
- **Registration status tracking** — a dashboard showing request status (received / in progress / completed) and a pie chart visualization (Chart.js).
- **Static informational pages** — Home, About Us, Terms & Conditions, and Disclaimer pages.
- **Dark mode toggle** persisted via local storage.

## Tech Stack

**Frontend**
- React 18 (Create React App) with React Router
- Material UI / MUI, Bootstrap
- Chart.js / react-chartjs-2
- Formik + Yup for form handling/validation
- Axios for API calls

**Backend**
- Node.js + Express
- MongoDB with Mongoose
- JWT authentication, bcrypt/bcryptjs password hashing
- Multer for file uploads, express-session for sessions

## Getting Started

### Prerequisites

- Node.js and npm
- A MongoDB database (the app connects to MongoDB Atlas by default, configured in `server.js`)

### Installation

```bash
git clone https://github.com/daivikawasthi01/Ayush-SIH-Project.git
cd Ayush-SIH-Project
npm install
```

### Usage

Start the backend API server (listens on port 4001 by default):

```bash
node server.js
```

In a separate terminal, start the React development server:

```bash
npm start
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

> **Note:** `server.js` currently has database credentials and JWT secrets hard-coded inline rather than read from environment variables. Before deploying or sharing this project publicly, move these to a `.env` file (and rotate the exposed credentials).
