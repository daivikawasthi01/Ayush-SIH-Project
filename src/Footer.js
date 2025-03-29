import React from 'react';
import { Link } from 'react-router-dom';

export default function Footer({ darkMode, toggleDarkMode }) {
  return (
    <div className={darkMode ? "footer dark-mode" : "footer"}>
      <div className='footer-content'>
        <div className='footer-column'>
          <h3>About Us</h3>
          <p>
            We are team MADSAP
          </p>
        </div>
        <div className='footer-column'>
          <h3>Quick Links</h3>
          <ul>
            <li><Link to="/">Home</Link></li>
            <li><Link to="/aboutus">About Us</Link></li>
          </ul>
        </div>
        <div className='footer-column'>
          <h3>Terms and Conditions</h3>
          <ul>
            <li><Link to="/terms">Terms of Service</Link></li>
            <li><Link to="/disclaimer">Disclaimer</Link></li>
          </ul>
        </div>
      </div>
      <p className='a'>&copy; 2024 Team MADSAP. All rights reserved.</p>
      <p className='a'>Created by Team MADSAP</p>
    </div>
  );
}