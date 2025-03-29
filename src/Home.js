import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './App.css';

const images = [
  'https://www.petlifesite.com/wordpress/wp-content/uploads/2024/07/v2-f8vsz-9gfgj.jpg',
  'https://c02.purpledshub.com/uploads/sites/40/2023/03/GillHerbsFood311695-c499017.jpg',
  'https://wallpaperaccess.com/full/5252272.jpg',
  'https://images.pexels.com/photos/1463186/pexels-photo-1463186.jpeg?cs=srgb&dl=pexels-roldan-ancajas-545494-1463186.jpg&fm=jpg',
];

export default function Home() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isDarkMode, setIsDarkMode] = useState(false); 

  const handleNextClick = () => {
    setCurrentIndex((currentIndex + 1) % images.length);
  };

  const handlePreviousClick = () => {
    setCurrentIndex((currentIndex - 1 + images.length) % images.length);
  };

  return (
    <div className={isDarkMode ? 'dark-mode' : 'App'}>
      <h1 className='home-heading'>Welcome to AYUSH</h1>
      <p className='home-p'>Start your journey in the AYUSH sector with us. <br /> The AYUSH Startup Support Portal is designed to streamline the registration and regulatory <br /> process for businesses focused on Ayurveda, <br /> Yoga, Unani, Siddha, and Homeopathy. <br /> Whether you're just starting or seeking to scale, <br /> we're here to help you every step of the way.
      Explore the resources below,<br /> register your startup,<br /> upload necessary documents, and track your registration status-all in one place.</p>
      <div
        className='slideshow'
        style={{
          backgroundImage: `url(${images[currentIndex]})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          height: '90vh',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center'
        }}
      >
        <div className='about-us-section'>
          <h2>About Us<br /></h2>
          <p><b>The Ministry has developed this portal for digitalization <br />of various processes involved in all Central Sector Schemes of the Ministry.</b></p>
          <br />
          <Link to="/aboutus">
            <button className='read-more-btn'>Read More</button>
          </Link>
        </div>
      </div>
      <span className='previous-arrow' onClick={handlePreviousClick}>
        &#x2190;
      </span>
      <span className='next-arrow' onClick={handleNextClick}>
        &#x2192;
      </span>
    </div>
  );
}
