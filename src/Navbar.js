import React, { useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import Switch from 'react-switch';
import './App.css';
import axios from 'axios';

function Navbar({ isLoggedIn, onLogout, darkMode, toggleDarkMode }) {
  const navigate = useNavigate();

  useEffect(() => {
    document.body.classList.toggle('dark-mode', darkMode);
  }, [darkMode]);

  const handleSignout = () => {
    // First, remove the token from localStorage
    localStorage.removeItem('token');
    
    axios.post('http://localhost:4001/logout')
      .then(() => {
        // Notify parent component and redirect
        onLogout(); // Notify parent component that user logged out
        navigate('/login');
      })
      .catch((err) => {
        console.error('Error during logout:', err);
        // Even if the logout API fails, we still remove the token and redirect to the login page
        onLogout(); // Fallback to logging out even if there's an error
        navigate('/login');
      });
  };
  
  return (
    <div className={`navbar ${darkMode ? 'dark-navbar' : ''}`}>
      <div className={`nav-buttons ${darkMode ? 'dark-nav-buttons' : ''}`}>
        
        
        {!isLoggedIn ? (
          <>
            <button className={`nav-button ${darkMode ? 'dark-nav-button' : ''}`} onClick={() => navigate('/login')}>Login</button>
            <button className={`nav-button ${darkMode ? 'dark-nav-button' : ''}`} onClick={() => navigate('/signup')}>Signup</button>
          </>
        ) : (
          <button className={`nav-button ${darkMode ? 'dark-nav-button' : ''}`} onClick={handleSignout}>Signout</button>
        )}
      </div>
      <Switch
          className={`dark-mode-checkbox ${darkMode ? 'dark-checkbox' : ''}`}
          onChange={toggleDarkMode}
          checked={darkMode}
          onColor="#86d3ff"
          onHandleColor="#2693e6"
          handleDiameter={30}
          uncheckedIcon={false}
          checkedIcon={false}
          boxShadow="0px 1px 5px rgba(0, 0, 0, 0.6)"
          activeBoxShadow="0px 0px 1px 10px rgba(0, 0, 0, 0.2)"
          height={20}
          width={48}
        />
      <Link to="/" className={`heading ${darkMode ? 'dark-heading' : ''}`}>AYUSH Portal</Link>
      <div className="bottom-nav-links">
        {isLoggedIn ? (
          <Link to="/registration" className={`nav-link ${darkMode ? 'dark-nav-link' : ''}`}>Registration</Link>
          
        ) : null}
        {isLoggedIn ? (
          <Link to="/dashboard" className={`nav-link ${darkMode ? 'dark-nav-link' : ''}`}>Dashboard</Link>
          
        ) : null}
        
      
      
        <Link to="/aboutus" className={`nav-link ${darkMode ? 'dark-nav-link' : ''}`}>About Us</Link>
      </div>
    </div>
  );
}

export default Navbar;
