// search.ts
import { Recipe } from '../models/recettes';

export function initializeSearch(recipes: Recipe[], displayFunction: (recipes: Recipe[]) => void): void {
  const searchInput = document.querySelector('.hero__search-input') as HTMLInputElement;

  // Add event listener for the search input
  searchInput.addEventListener('input', () => {
    const searchValue = searchInput.value.toLowerCase().trim();
    if (searchValue.length >= 3) {
      const filteredRecipes = recipes.filter(recipe =>
        recipe.name.toLowerCase().includes(searchValue) ||
        recipe.description.toLowerCase().includes(searchValue) ||
        recipe.ingredients.some(ingredient => ingredient.ingredient.toLowerCase().includes(searchValue))
      );

      displayFunction(filteredRecipes);
    } else {
      // Clear the display if the search value is less than 3 characters
      displayFunction(recipes);
    }
  });
}


//  Initialize search functionality in index.ts

//initializeSearch(recipes, updateDisplay);

/*
//update DOM with filtered recipes via searchbar
function updateDisplay(filteredRecipes: Recipe[]) {
// Clear existing content
if (recipeDomContainer) {
  recipeDomContainer.innerHTML = "";
}
// Display the filtered recipes
displayData(filteredRecipes);
}

*/