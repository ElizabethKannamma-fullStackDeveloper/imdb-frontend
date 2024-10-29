import React from 'react';
import '../App.css'; 
import { Link } from 'react-router-dom';
import AddMovie from './AddMovie';

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="logo">IMDb Clone</div>
      <ul className="nav-links">
        <li>Home</li>
        <li>Movies</li>
        <Link style={{color:"white",textDecoration:"none"}} to="/add-movie">Add Movie</Link>
      </ul>
    </nav>
  );
};

export default Navbar;
