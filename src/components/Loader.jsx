import React from 'react';
import styled from 'styled-components';

// This is a reusable styled-component for the loader.
const StyledWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 50vh; /* Ensures it takes up significant space */

  .loader-wrapper {
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
    font-family: "Poppins", sans-serif;
    font-size: 2em; /* Made it a bit larger */
    font-weight: 600;
    user-select: none;
    color: #343a40; /* Changed color to fit the theme */
  }

  .loader {
    position: absolute;
    top: 0;
    left: 0;
    height: 100%;
    width: 100%;
    z-index: 1;
    background-color: transparent;
    mask: repeating-linear-gradient(90deg, transparent 0, transparent 6px, black 7px, black 8px);
  }

  .loader::after {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-image: radial-gradient(circle at 50% 50%, #ff6347 0%, transparent 40%),
      radial-gradient(circle at 45% 45%, #ffc107 0%, transparent 40%),
      radial-gradient(circle at 55% 55%, #0dcaf0 0%, transparent 40%);
    mask: radial-gradient(circle at 50% 50%, transparent 0%, transparent 10%, black 25%);
    animation:
      transform-animation 2s infinite alternate,
      opacity-animation 4s infinite;
    animation-timing-function: cubic-bezier(0.6, 0.8, 0.5, 1);
  }

  @keyframes transform-animation {
    0% { transform: translate(-55%); }
    100% { transform: translate(55%); }
  }

  @keyframes opacity-animation {
    0%, 100% { opacity: 0; }
    15% { opacity: 1; }
    65% { opacity: 0; }
  }

  .loader-letter {
    display: inline-block;
    opacity: 0;
    animation: loader-letter-anim 4s infinite linear;
    z-index: 2;
    margin: 0 1px; /* Adds a little space between letters */
  }

  @keyframes loader-letter-anim {
    0% {
      opacity: 0;
    }
    5% {
      opacity: 1;
      text-shadow: 0 0 4px #fff;
      transform: scale(1.1) translateY(-2px);
    }
    20% {
      opacity: 0.2;
    }
    100% {
      opacity: 0;
    }
  }
`;

/**
 * A reusable loader component that animates the provided text.
 * @param {{text: string}} props The text to display in the loader.
 */
const Loader = ({ text = "Loading..." }) => {
  return (
    <StyledWrapper>
      <div className="loader-wrapper">
        {text.split('').map((letter, index) => (
          // We use inline styles here to dynamically set the animation delay for each letter
          <span
            key={index}
            className="loader-letter"
            style={{ animationDelay: `${index * 0.}s` }}
          >
            {letter === ' ' ? '\u00A0' : letter} {/* Handle spaces */}
          </span>
        ))}
        <div className="loader" />
      </div>
    </StyledWrapper>
  );
};

export default Loader;