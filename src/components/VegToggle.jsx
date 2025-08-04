// src/components/VegToggle.jsx

import React from 'react';
import styled from 'styled-components';

const StyledWrapper = styled.div`
  .toggle {
    display: flex;
    align-items: center;
    gap: .8rem;
    font-weight: 600;
    font-size: 0.9rem;
    color: #343a40;
    cursor: pointer;
    user-select: none;
  }

  .toggle__switch {
    --w-toggle-switch: 60px;
    --w-h-toggle-circle: 22px;
    --pd-toggle-switch: 4px;

    height: 30px;
    width: var(--w-toggle-switch);
    background-color: #e9ecef;
    border-radius: 4rem;
    border: 2px solid #dee2e6;
    display: flex;
    align-items: center;
    padding: 0 var(--pd-toggle-switch);
    transition: background-color 500ms;
  }

  .toggle__circle {
    width: var(--w-h-toggle-circle);
    height: var(--w-h-toggle-circle);
    background-color: #28a745; /* Green for Veg */
    border-radius: 50%;
    transition: margin 400ms ease-in-out, background-color 500ms;
  }

  /* This class is now controlled by a prop */
  &.toggled .toggle__circle {
    margin-left: calc(var(--w-toggle-switch) - (var(--pd-toggle-switch) * 2) - var(--w-h-toggle-circle));
    background-color: #dc3545; /* Red for Non-Veg */
  }
`;

const VegToggle = ({ isNonVeg, onToggle }) => {
  return (
    // The onClick and className are now controlled by props
    <StyledWrapper className={isNonVeg ? 'toggled' : ''} onClick={onToggle}>
      <div className="toggle">
        🥦 Veg
        <div className="toggle__switch">
          <div className="toggle__circle" />
        </div>
        🍤 Non-Veg
      </div>
    </StyledWrapper>
  );
};

export default VegToggle;