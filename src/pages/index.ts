// main.ts
import "../styles/main.css";
import { Recipe } from "../models/recettes";
import { cardRecipeTemplate } from "../templates/recettes-cards";
import {
  getRecipes,
  getIngredients,
  getRecipeByUstensils,
  getRecipeByAppliance,
} from "../api/api";

import { initSearchByLoop } from "../components/methodSearchByLoop";
import { initializeDropdown } from "../components/dropdownModule";
import { filterRecipesBySelectedValues } from '../components/filterModule';
import { updateMatchCountDisplay } from "../components/updateMatchCount";
const recipeDomContainer = document.querySelector(".recipes__cards");

document.addEventListener("DOMContentLoaded", async () => {
  const recipes = await fetchData(getRecipes());
  const ingredients = await fetchData(getIngredients());
  const ustensils = await fetchData(getRecipeByUstensils());
  const appliances = await fetchData(getRecipeByAppliance());

  async function fetchData<T>(promise: Promise<T[]>): Promise<T[]> {
    try {
      const result = await promise;
      if (result.length === 0) {
        console.warn("No data fetched.");
      }
      return result;
    } catch (error) {
      console.error("Error fetching data:", error);
      return [];
    }
  }

  //Display the DOM
  displayData(recipes);

  //Initialize search
  initSearchByLoop();


  //Display dropdown
  initializeDropdown("#dropdown__ingredients", ingredients, onSelectionChange);
  initializeDropdown("#dropdown__ustensils", ustensils, onSelectionChange);
  initializeDropdown("#dropdown__appliances", appliances, onSelectionChange);
});

// Supposons que cette fonction est appelée chaque fois que les valeurs sélectionnées changent
const onSelectionChange = (selectedValues: string[]) => {
  filterRecipesBySelectedValues(selectedValues);
  updateMatchCountDisplay(); // Mise à jour du compte après le filtrage
};


function displayData(recipes: Recipe[]) {
  recipes.forEach((recipe) => {
    const recipeCardTemplate = cardRecipeTemplate(recipe);
    const recipeCardDOM = recipeCardTemplate.recipeCardDOM();
    recipeDomContainer?.appendChild(recipeCardDOM);
  });
}
