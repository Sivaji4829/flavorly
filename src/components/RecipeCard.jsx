import React from 'react';
import { Link } from 'react-router-dom';

const RecipeCard = ({ recipe }) => {
  return (
    // Wrapper div to create the 3D perspective space
    <div className="recipe-card-wrapper">
      <Link to={`/recipe/${recipe.idMeal}`} className="card h-100 text-decoration-none text-dark recipe-card-3d">
        <img src={recipe.strMealThumb} className="card-img-top" alt={recipe.strMeal} />
        <div className="card-body d-flex flex-column">
          <h5 className="card-title text-center">{recipe.strMeal}</h5>
        </div>
      </Link>
    </div>
  );
};

export default RecipeCard;