// src/pages/RecipePage.jsx

import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useParams } from 'react-router-dom';
import { getRecipeById } from '../api/mealDB';
import { useLocalStorage } from '../hooks/useLocalStorage';
import Loader from '../components/Loader';

// --- Define the styled-components first ---

const StyledYouTubeButton = styled.a`
  /* ... styles for the YouTube button ... */
  background: transparent;
  position: relative;
  padding: 5px 15px;
  display: flex;
  align-items: center;
  font-size: 17px;
  font-weight: 600;
  text-decoration: none;
  cursor: pointer;
  border: 1px solid rgb(255, 0, 0);
  border-radius: 25px;
  outline: none;
  overflow: hidden;
  color: rgb(255, 0, 0);
  transition: color 0.3s 0.1s ease-out;
  text-align: center;
  span { margin: 10px; }
  &::before { position: absolute; top: 0; left: 0; right: 0; bottom: 0; margin: auto; content: ''; border-radius: 50%; display: block; width: 20em; height: 20em; left: -5em; text-align: center; transition: box-shadow 0.5s ease-out; z-index: -1; }
  &:hover { color: #fff; border: 1px solid rgb(255, 0, 0); }
  &:hover::before { box-shadow: inset 0 0 0 10em rgb(255, 0, 0); }
`;

const StyledFavoriteButtonWrapper = styled.div`
  /* ... styles for the Favorite button ... */
  label { background-color: white; display: flex; align-items: center; gap: 14px; padding: 10px 15px 10px 10px; cursor: pointer; user-select: none; border-radius: 10px; box-shadow: rgba(149, 157, 165, 0.2) 0px 8px 24px; color: black; font-size: 17px; font-weight: 600; }
  input { display: none; }
  input:checked + label svg { fill: hsl(0deg 100% 50%); stroke: hsl(0deg 100% 50%); animation: heartButton .8s ease-out; }
  @keyframes heartButton { 0% { transform: scale(1); } 25% { transform: scale(1.3); } 50% { transform: scale(1); } 75% { transform: scale(1.3); } 100% { transform: scale(1); } }
  input + label .action { position: relative; overflow: hidden; display: grid; }
  input + label .action span { grid-column-start: 1; grid-column-end: 1; grid-row-start: 1; grid-row-end: 1; transition: all .4s; }
  input + label .action span.option-1 { transform: translate(0px, 0%); opacity: 1; }
  input:checked + label .action span.option-1 { transform: translate(0px, -100%); opacity: 0; }
  input + label .action span.option-2 { transform: translate(0px, 100%); opacity: 0; }
  input:checked + label .action span.option-2 { transform: translate(0px, 0%); opacity: 1; }
`;

// --- Define the button components ---

const YouTubeButton = ({ href }) => (
  <StyledYouTubeButton href={href} target="_blank" rel="noopener noreferrer">
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-youtube" viewBox="0 0 16 16">
  <path d="M8.051 1.999h.089c.822.003 4.987.033 6.11.335a2.01 2.01 0 0 1 1.415 1.42c.101.38.172.883.22 1.402l.01.104.022.26.008.104c.065.914.073 1.77.074 1.957v.075c-.001.194-.01 1.108-.082 2.06l-.008.105-.009.104c-.05.572-.124 1.14-.235 1.558a2.01 2.01 0 0 1-1.415 1.42c-1.16.312-5.569.334-6.18.335h-.142c-.309 0-1.587-.006-2.927-.052l-.17-.006-.087-.004-.171-.007-.171-.007c-1.11-.049-2.167-.128-2.654-.26a2.01 2.01 0 0 1-1.415-1.419c-.111-.417-.185-.986-.235-1.558L.09 9.82l-.008-.104A31 31 0 0 1 0 7.68v-.123c.002-.215.01-.958.064-1.778l.007-.103.003-.052.008-.104.022-.26.01-.104c.048-.519.119-1.023.22-1.402a2.01 2.01 0 0 1 1.415-1.42c.487-.13 1.544-.21 2.654-.26l.17-.007.172-.006.086-.003.171-.007A100 100 0 0 1 7.858 2zM6.4 5.209v4.818l4.157-2.408z"/>
</svg>
    <span>Watch on YouTube</span>
  </StyledYouTubeButton>
);

// THIS IS THE MISSING COMPONENT DEFINITION
const FavoriteButton = ({ isFavorited, onClick }) => (
  <StyledFavoriteButtonWrapper>
    <input 
      type="checkbox" 
      id="favorite" 
      checked={isFavorited} 
      onChange={() => {}}
    />
    <label htmlFor="favorite" className="container" onClick={onClick}>
      <svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="feather feather-heart">
        <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
      </svg>
      <div className="action">
        <span className="option-1">Add to Favorites</span>
        <span className="option-2">Added to Favorites</span>
      </div>
    </label>
  </StyledFavoriteButtonWrapper>
);


// --- Main RecipePage Component ---
const RecipePage = () => {
  const { id } = useParams();
  const [recipe, setRecipe] = useState(null);
  const [loading, setLoading] = useState(true);
  const [favorites, setFavorites] = useLocalStorage('favorites', []);

  useEffect(() => {
    getRecipeById(id).then(data => {
      setRecipe(data);
      setLoading(false);
    });
  }, [id]);

  if (loading) {
    return <Loader text="Loading Recipe..." />;
  }
  
  if (!recipe) {
    return <div className="info-text">Recipe not found.</div>;
  }

  const isFavorited = favorites.some(fav => fav.idMeal === recipe.idMeal);

  const handleFavoriteToggle = () => {
    if (isFavorited) {
      setFavorites(favorites.filter(fav => fav.idMeal !== recipe.idMeal));
    } else {
      setFavorites([...favorites, recipe]);
    }
  };

  const ingredients = [];
  for (let i = 1; i <= 20; i++) {
    const ingredient = recipe[`strIngredient${i}`];
    const measure = recipe[`strMeasure${i}`];
    if (ingredient && ingredient.trim() !== '') {
      ingredients.push({ ingredient, measure });
    }
  }

  return (
    <div>
      <div 
        className="recipe-detail-header" 
        style={{ backgroundImage: `url(${recipe.strMealThumb})` }}
      >
        <div className="recipe-header-content">
          <span className="recipe-category">{recipe.strCategory}</span>
          <h1>{recipe.strMeal}</h1>
          <p>{recipe.strArea}</p>
        </div>
      </div>

      <div className="container">
        <div className="recipe-detail-body">
          <div className="recipe-actions">
            {/* Using the component defined above */}
            <FavoriteButton 
              isFavorited={isFavorited}
              onClick={handleFavoriteToggle}
            />
            {recipe.strYoutube && (
              <YouTubeButton href={recipe.strYoutube} />
            )}
          </div>
          <div className="row">
            <div className="col-lg-5">
              <h2 className="section-title">Ingredients</h2>
              <div className="ingredients-grid">
                {ingredients.map((item, index) => (
                  <div key={index} className="ingredient-tag">
                    <span>{item.ingredient}</span>
                    <span className="measure">{item.measure}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="col-lg-7">
              <h2 className="section-title">Instructions</h2>
              <div className="instructions">
                {recipe.strInstructions.split('\n').filter(p => p.trim() !== '').map((paragraph, index) => (
                  <p key={index}>{paragraph}</p>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RecipePage;