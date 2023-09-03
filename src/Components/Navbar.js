import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav className='navbar'>
        <div className='navLeft'>
            <h1>Dictionary App</h1>
        </div>
        <div className='navRight'>
              <Link to="/">Home</Link>
              <Link to="/history">History</Link>
        </div>
      
    </nav>
  );
};

export default Navbar;