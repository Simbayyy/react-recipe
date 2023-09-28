export interface Ingredient {
  name: string;
  amount: number;
  unit: string;
  name_en?: string;
  fdc_id?: number;
  high_confidence?: boolean;
}

export interface IngredientRaw {
  ingredient_id: number;
  name: string;
  name_en: string;
  fdc_id: number;
  high_confidence: boolean;
}

export interface RecipeSchema {
  name: string;
  prepTime?: string;
  cookTime?: string;
  totalTime?: string;
  recipeInstructions?: string | string[] | object[];
  recipeYield?: string | string[];
  recipeCategory?: string | string[];
  recipeCuisine?: string | string[];
  url?: string;
  recipeIngredient?: string[] | Ingredient[];
  id?: number;
}
