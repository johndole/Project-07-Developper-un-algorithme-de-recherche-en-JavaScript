import { Recipe } from "../models/recettes";

export async function getRecipes(): Promise<Recipe[]> {
  try {
    const response = await fetch("/data/recipes.json");

    if (!response.ok) {
      throw new Error(`Failed to fetch recipes. Status: ${response.status}`);
    }

    const recipes = await response.json() as Recipe[];
    console.log('Recipes from API:', recipes);

    return recipes.map<Recipe>((recipe) => ({
      ...recipe,
      image: `assets/images/${recipe.image}`,
    }));

  } catch (error) {
    console.error("Error fetching recipes:", error);
    return [];
  }
}

export async function getIngredients(): Promise<string[]> {
  const response = await fetch("/data/recipes.json");
  if (!response.ok) {
    throw new Error(`Failed to fetch ingredients. Status: ${response.status}`);
  }
  const recipes = await response.json() as Recipe[];
 
  
  // Use flatMap to extract ingredients from each recipe
  const ingredients: string[] = recipes.flatMap(recipe =>
    recipe.ingredients.map(ingredient => ingredient.ingredient)
  );
  return [...new Set(ingredients)];
  
}

export async function getRecipeByUstensils(): Promise<string[]> {
  const response = await fetch("/data/recipes.json");
  if (!response.ok) {
    throw new Error(`Failed to fetch recipes. Status: ${response.status}`);
  }
  
  const recipes = await response.json() as Recipe[];
  
  // Extract all utensils and ensure they're unique
  const utensils: string[] = recipes.flatMap(recipe => recipe.ustensils);

  // Capitalize the first letter of each utensil and ensure the rest are lowercase
  const capitalizedUtensils = [...new Set(utensils)].map(utensil => 
    utensil.charAt(0).toUpperCase() + utensil.slice(1).toLowerCase()
  );
  
  return [...new Set(capitalizedUtensils)];
}

export async function getRecipeByAppliance(): Promise<string[]> {
  const response = await fetch("/data/recipes.json");
  if (!response.ok) {
    throw new Error(`Failed to fetch recipes. Status: ${response.status}`);
  }
  
  const recipes = await response.json() as Recipe[];
  
  // Extract descriptions from recipes
  const appliances: string[] = recipes.map(recipe => recipe.appliance);
  
  return [...new Set(appliances)];
}
