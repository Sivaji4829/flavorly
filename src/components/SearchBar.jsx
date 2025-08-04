// src/components/SearchBar.jsx

import React, { useState } from 'react';
import styled from 'styled-components';
import VegToggle from './VegToggle';

const SearchBarWrapper = styled.form`
  --font-color: #212529;
  --bg-color: #ffffff;
  --border-color: #ced4da;
  --border-focus-color: #8ab4f8;
  --shadow-color: rgba(0, 0, 0, 0.1);
  --shadow-focus-color: rgba(74, 144, 226, 0.25);
  --border-width: 2px;
  --transition-speed: 0.3s;

  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1.5rem;
  perspective: 1000px;

  .search-input-wrapper {
    position: relative;
    transform-style: preserve-3d;
    transition: transform var(--transition-speed) ease;
  }
  
  &:focus-within .search-input-wrapper {
    transform: rotateX(-10deg) translateY(-5px);
  }

  .search-input {
    width: 350px;
    height: 50px;
    border: var(--border-width) solid var(--border-color);
    border-radius: 10px;
    background-color: var(--bg-color);
    color: var(--font-color);
    padding: 0 50px 0 20px;
    font-size: 1rem;
    outline: none;
    transition: all var(--transition-speed) ease;
    box-shadow: 0 4px 12px var(--shadow-color);
  }

  .search-input::placeholder {
    color: #6c757d;
  }

  .search-input:focus {
    border-color: var(--border-focus-color);
    box-shadow: 0 5px 20px var(--shadow-focus-color);
  }

  .search-icon {
    position: absolute;
    right: 15px;
    top: 50%;
    transform: translateY(-50%);
    color: #6c757d;
    cursor: pointer;
    transition: color var(--transition-speed);
  }

  .search-icon:hover {
    color: var(--font-color);
  }
`;

// It now receives isNonVeg and onToggle from HomePage
const SearchBar = ({ onSearch, onToggle, isNonVeg }) => {
  const [query, setQuery] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    onSearch(query);
  };

  return (
    <SearchBarWrapper onSubmit={handleSubmit}>
      <div className="search-input-wrapper">
        <input
          type="text"
          className="search-input"
          placeholder="Search for any recipe..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <svg onClick={handleSubmit} className="search-icon" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="11" cy="11" r="8"></circle>
          <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
        </svg>
      </div>
      
      {/* Pass the props down to the toggle */}
      <VegToggle isNonVeg={isNonVeg} onToggle={onToggle} />
      
    </SearchBarWrapper>
  );
};

export default SearchBar;