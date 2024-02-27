export type Recipe = {
  id: string;
  image: string;
  name: string;
  servings: number;
  ingredients: {
    ingredient: string;
    quantity?: number;
    unit?: string;
  }[];
  time: number;
  description: string;
  appliance: string;
  ustensils: string[];
  [key: string]: any; // Index signature to allow string indexing
};