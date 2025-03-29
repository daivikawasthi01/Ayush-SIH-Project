
import React, { useState, useEffect } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Navbar from './Navbar';
import Login from './Login';
import Signup from './Signup';
import Registration from './Registration';
import Aboutus from './Aboutus';
import Home from './Home';
import Footer from './Footer';
import Termsandcondition from './Termsandcondition';
import Disclaimer from './Disclaimer';
import axios from 'axios';
import Dashboard from './Dashboard';
function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [darkMode, setDarkMode] = useState(
    localStorage.getItem('theme') === 'dark'
  );

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const response = await axios.get('http://localhost:4001/checkAuth', {
          headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
        });
        setIsLoggedIn(response.data.authenticated);
      } catch (err) {
        setIsLoggedIn(false);
      }
    };

    checkAuth();
  }, []);

  const handleLogin = () => {
    setIsLoggedIn(true);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    localStorage.removeItem('token');
  };



  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
    localStorage.setItem('theme', !darkMode ? 'dark' : 'light');
  };

  return (
    <BrowserRouter>
      <div className={darkMode ? "App dark-mode" : "App"}>
        <Navbar 
          isLoggedIn={isLoggedIn} 
          onLogout={handleLogout}
          darkMode={darkMode} 
          toggleDarkMode={toggleDarkMode} 
        />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/terms" element={<Termsandcondition />} />
          <Route path="/disclaimer" element={<Disclaimer />} />
          <Route path="/login" element={<Login onLogin={handleLogin} />} />
          <Route path="/registration" element={<Registration />} />
          <Route path="/aboutus" element={<Aboutus />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/dashboard" element={<Dashboard />}/>
        </Routes>
        <Footer
          darkMode={darkMode} 
          toggleDarkMode={toggleDarkMode} 
        />
        
      </div>
    </BrowserRouter>
  );
}

export default App;
