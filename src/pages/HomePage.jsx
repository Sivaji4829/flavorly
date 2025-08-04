// src/pages/HomePage.jsx

import React, { useState, useEffect } from 'react';
import { getInitialRecipes, searchRecipesByName, fetchRecipesByLetter, getRecipesByCategory } from '../api/mealDB';
import RecipeCard from '../components/RecipeCard';
import Loader from '../components/Loader';
import SearchBar from '../components/SearchBar';

const HomePage = () => {
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isNonVeg, setIsNonVeg] = useState(false);
  const [loadingMore, setLoadingMore] = useState(false);
  const [nextLetter, setNextLetter] = useState('d');
  const [searched, setSearched] = useState(false);
  const [pageTitle, setPageTitle] = useState('Discover Recipes');

  useEffect(() => {
    setLoading(true);
    getInitialRecipes().then(initialRecipes => {
      setRecipes(initialRecipes || []);
      setLoading(false);
    });
  }, []);

  const handleSearch = async (query) => {
    const searchTerm = query.trim();
    if (!searchTerm) return;
    
    setLoading(true);
    setSearched(true);
    const results = await searchRecipesByName(searchTerm);
    setRecipes(results || []);
    setPageTitle(`Results for "${searchTerm}"`);
    setLoading(false);
  };

  const handleFilter = async (category) => {
    setLoading(true);
    const results = await getRecipesByCategory(category);
    setRecipes(results || []);
    const categoryName = category === 'Seafood' ? 'Non-Vegetarian' : category;
    setPageTitle(`${categoryName} Recipes`);
    setLoading(false);
  };
  
  const handleToggleChange = () => {
    const newIsNonVeg = !isNonVeg;
    setIsNonVeg(newIsNonVeg);
    const categoryToFilter = newIsNonVeg ? 'Seafood' : 'Vegetarian';
    handleFilter(categoryToFilter);
  };

  const handleLoadMore = async () => {
    setLoadingMore(true);
    const newRecipes = await fetchRecipesByLetter(nextLetter);
    if (newRecipes && newRecipes.length > 0) {
      setRecipes(prevRecipes => [...prevRecipes, ...newRecipes]);
      setNextLetter(String.fromCharCode(nextLetter.charCodeAt(0) + 1));
    }
    setLoadingMore(false);
  };

  if (loading) {
    return <Loader text="Finding Recipes..." />;
  }

  return (
    <div className="container py-4">
      <h1 className="text-center mb-4 page-title">{pageTitle}</h1>
      
      <div className="mb-5">
        <SearchBar 
          onSearch={handleSearch} 
          onToggle={handleToggleChange} 
          isNonVeg={isNonVeg} 
        />
      </div>

      {recipes.length === 0 && !loading && (
        <div className="info-text" style={{color: '#fff', textShadow: '0 1px 4px #000'}}>
          No recipes found. Please try another search!
        </div>
      )}

      {recipes.length > 0 && (
        <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-4 g-4">
          {recipes.map((recipe) => (
            <div key={`${recipe.idMeal}-${recipe.strMeal}`} className="col">
              <RecipeCard recipe={recipe} />
            </div>
          ))}
        </div>
      )}

      {!loading && !searched && recipes.length > 0 && (
        <div className="text-center mt-5">
          <button 
            className="btn btn-primary btn-lg" 
            onClick={handleLoadMore} 
            disabled={loadingMore}
          >
            {loadingMore ? (
              <>
                <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                <span className="ms-2">Loading...</span>
              </>
            ) : (
              'Load More Recipes'
            )}
          </button>
        </div>
      )}
    </div>
  );
};

export default HomePage;