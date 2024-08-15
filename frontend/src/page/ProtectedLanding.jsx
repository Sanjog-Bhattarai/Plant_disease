import React from 'react';
import { Link } from 'react-router-dom';

import './ProtectedLanding.css';

function ProtectedLanding() {
  // const navigate = useNavigate();



  return (
    <div className="landing">
      <header className="landing-header">
        <Link to='/' className='login-link'>Login/Logout</Link>
        <img 
          src="https://cdn.pixabay.com/photo/2020/10/11/19/51/cat-5646889_1280.jpg" 
          alt="Logo" 
          className="logo"
        />
      </header>
      <div className="center-box">
        <Link to="/check" className="center-link">Check Disease</Link>
        <Link to="/his" className="center-link">History</Link>
      </div>
    </div>
  );
}

export default ProtectedLanding;
