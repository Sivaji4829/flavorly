// src/components/Navbar.jsx

import React from 'react';
import { NavLink } from 'react-router-dom';
import { useLocalStorage } from '../hooks/useLocalStorage';

const Navbar = () => {
  const [favorites] = useLocalStorage('favorites', []);

  return (
    // Replaced Bootstrap classes with a single custom class
    <nav className="glass-navbar">
      <NavLink to="/" className="navbar-brand">
       Flavorly
      </NavLink>
      <div className="nav-links">
        <NavLink 
          to="/" 
          className={({ isActive }) => (isActive ? 'nav-link active' : 'nav-link')}
        >
          Home
        </NavLink>
        <NavLink 
          to="/favorites" 
          className={({ isActive }) => (isActive ? 'nav-link active' : 'nav-link')}
        >
        ❤️ Favorites
          {favorites.length > 0 && (
            <span className="favorites-badge">
              {favorites.length}
            </span>
          )}
        </NavLink>
      </div>
    </nav>
  );
};

export default Navbar;