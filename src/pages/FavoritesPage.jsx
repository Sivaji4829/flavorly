import React from 'react';
import { useLocalStorage } from '../hooks/useLocalStorage';
import RecipeCard from '../components/RecipeCard';

const FavoritesPage = () => {
  const [favorites] = useLocalStorage('favorites', []);

  return (
    <div className="container py-4">
      <h1 className="text-center mb-4">Your Favorite Recipes</h1>
      {favorites.length === 0 ? (
        <div className="info-text">You have no favorite recipes yet.</div>
      ) : (
        <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-4 g-4">
          {favorites.map((recipe) => (
            <div key={recipe.idMeal} className="col">
              <RecipeCard recipe={recipe} />
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default FavoritesPage;