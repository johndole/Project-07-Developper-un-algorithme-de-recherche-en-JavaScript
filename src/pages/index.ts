// main.ts
import "../styles/main.css";
import { Recipe } from "../models/recettes";
import { cardRecipeTemplate } from "../templates/recettes-cards";
import { getRecipes } from "../api/api";
import { getIngredients } from "../api/api";
import { getRecipeByUstensils } from "../api/api";
import { getRecipeByAppliance } from "../api/api";
import { initializeDropdown } from "../utils/dropdowns";
import { initSearchByLoop } from "../utils/searchByLoop";


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
  initializeDropdown("#dropdown__ingredients", ingredients, 'ingredient');
  initializeDropdown("#dropdown__ustensils", ustensils, 'utensil');
  initializeDropdown("#dropdown__appliances", appliances, 'appliance');





});


function displayData(recipes: Recipe[]) {
  recipes.forEach((recipe) => {
    const recipeCardTemplate = cardRecipeTemplate(recipe);
    const recipeCardDOM = recipeCardTemplate.recipeCardDOM();
    recipeDomContainer?.appendChild(recipeCardDOM);
  });
}

