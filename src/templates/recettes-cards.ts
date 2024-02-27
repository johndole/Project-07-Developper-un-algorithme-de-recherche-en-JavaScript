import { Recipe } from '../models/recettes';

export function cardRecipeTemplate(recipe: Recipe) {
  const { id,
    image,
    name,
    servings,
    ingredients,
    time,
    description,
    appliance,
    ustensils,
  }
    = recipe;

  function recipeCardDOM() {

    const article = document.createElement('article');
    article.classList.add('card');

    const recipeImageDiv = document.createElement('div');
    recipeImageDiv.classList.add('card__image--div');

    const recipeImage = document.createElement('img');
    recipeImage.classList.add('card__image');
    recipeImage.src = image;
    recipeImage.alt = name;

    const recipeBody = document.createElement('div');
    recipeBody.classList.add('card__body');

    const recipeTitle = document.createElement('h3');
    recipeTitle.textContent = name;
    recipeTitle.classList.add('card__title');

    const recipeDescriptionTitle = document.createElement('h4');
    recipeDescriptionTitle.textContent = 'Recette';
    recipeDescriptionTitle.classList.add('card__description-title');

    const recipeDescription = document.createElement('p');
    recipeDescription.textContent = description;
    recipeDescription.classList.add('card__description');

    const recipeUstensils = document.createElement('span');
    recipeUstensils.classList.add('card__ustensils');
    recipeUstensils.setAttribute('data-utensil',  ustensils.join(', '));

    const recipeAppliance = document.createElement('span');
    recipeAppliance.classList.add('card__appliance');
    recipeAppliance.setAttribute('data-appliance', appliance);

    const recipeIngredientsTitle = document.createElement('h4');
    recipeIngredientsTitle.textContent = 'Ingrédients';
    recipeIngredientsTitle.classList.add('card__ingredients-title');

    const recipeIngredients = document.createElement('ul');
    recipeIngredients.classList.add('card__ingredients');

    ingredients.forEach((ingredient) => {
      const listItem = document.createElement('li');
      listItem.classList.add('card__ingredient');

      const nameSpan = document.createElement('span');
      nameSpan.textContent = ingredient.ingredient;
      nameSpan.classList.add('card__ingredient-name');
      nameSpan.setAttribute('data-ingredient', ingredient.ingredient);

      const quantitySpan = document.createElement('span');
      quantitySpan.textContent = `${ingredient.quantity || ''} ${ingredient.unit || ''}`;
      quantitySpan.classList.add('card__ingredient-quantity');
      listItem.appendChild(nameSpan);
      listItem.appendChild(quantitySpan);
      recipeIngredients.appendChild(listItem);
    });

    const recipeTimeTitle = document.createElement('p');
    recipeTimeTitle.classList.add('card__time-title');
    recipeTimeTitle.textContent = `${time} min`;


    article.appendChild(recipeImageDiv);
    recipeImageDiv.appendChild(recipeImage);
    recipeImageDiv.appendChild(recipeTimeTitle);
    article.appendChild(recipeBody);
    recipeBody.appendChild(recipeTitle);
    recipeBody.appendChild(recipeDescriptionTitle);
    recipeBody.appendChild(recipeDescription);
    recipeBody.appendChild(recipeIngredientsTitle);
    recipeBody.appendChild(recipeIngredients);
    recipeBody.appendChild(recipeUstensils);
    recipeBody.appendChild(recipeAppliance);

    return article;

  }
  return {
    id,
    image,
    name,
    servings,
    ingredients,
    time,
    description,
    appliance,
    ustensils,
    recipeCardDOM
  }
}