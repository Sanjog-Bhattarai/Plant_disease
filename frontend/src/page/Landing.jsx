import React from 'react';
import { Link } from 'react-router-dom';
import './Landing.css'; // Ensure you have a CSS file for styling

function Landing() {
  return (
    <div className="landing">
      <header className="landing-header">
        <h1 className="site-title">Plant Disease Detection</h1>
        <p className="site-description">
          Welcome to the Plant Disease Detection application. Our platform helps you
          identify and diagnose plant diseases by analyzing images of plants. 
          With our easy-to-use interface, you can get insights into the health of your plants
          and take appropriate actions to keep them healthy.
        </p>
        <Link to="/login" className="login-link">Login</Link>
      </header>
    </div>
  );
}

export default Landing;
