export interface Ingredient {
  name: string;
  amount: number;
  unit: string;
  name_en?: string;
  fdc_id?: number;
  high_confidence?: boolean;
  energy: number;
  calcium: number;
  carbohydrates: number;
  fiber: number;
  iron: number;
  sodium: number;
  lipid: number;
  magnesium: number;
  protein: number;
  zinc: number;
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

export interface Nutrient {
  name:
    | "lipid"
    | "energy"
    | "protein"
    | "fiber"
    | "iron"
    | "magnesium"
    | "carbohydrates"
    | "zinc"
    | "calcium"
    | "sodium";
  display_name: string;
  unit: string;
}

export const nutrientList: Nutrient[] = [
  {
    name: "energy",
    display_name: "Énergie",
    unit: "kcal",
  },
  {
    name: "carbohydrates",
    display_name: "Glucides",
    unit: "g",
  },
  {
    name: "protein",
    display_name: "Protéines",
    unit: "g",
  },
  {
    name: "lipid",
    display_name: "Lipides",
    unit: "g",
  },
  {
    name: "iron",
    display_name: "Fer",
    unit: "mg",
  },
  {
    name: "calcium",
    display_name: "Calcium",
    unit: "mg",
  },
  {
    name: "sodium",
    display_name: "Sodium",
    unit: "mg",
  },
  {
    name: "zinc",
    display_name: "Zinc",
    unit: "mg",
  },
  {
    name: "magnesium",
    display_name: "Magnésium",
    unit: "mg",
  },
  {
    name: "fiber",
    display_name: "Fibres",
    unit: "g",
  },
];
