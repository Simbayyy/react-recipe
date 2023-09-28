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

function areIngredients(ingredients: Ingredient[] | object[]): boolean {
  function isIngredient(
    ingredient: Ingredient | object,
  ): ingredient is Ingredient {
    const ingredientAs = ingredient as Ingredient;
    return (
      ingredientAs.name !== undefined &&
      typeof ingredientAs.name == "string" &&
      ingredientAs.amount !== undefined &&
      typeof ingredientAs.amount == "number" &&
      ingredientAs.unit !== undefined &&
      typeof ingredientAs.unit == "string"
    );
  }

  let allingredients = true;
  ingredients.forEach((ingredient) => {
    allingredients ? (allingredients = isIngredient(ingredient)) : 0;
  });
  return allingredients;
}
