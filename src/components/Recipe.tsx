import { useParams, useOutletContext } from "react-router-dom";
import {
  Ingredient as IngredientType,
  RecipeSchema,
} from "../functions/types";
import { Ingredient } from "./Ingredient";
import React, { useEffect } from "react";
import * as td from 'tinyduration'

const Recipe: React.FunctionComponent<
  Record<string, never>
> = (): React.ReactElement => {
  const { recipeId } = useParams();
  const data: null | { recipes: RecipeSchema[] } = useOutletContext();

  let recipe =
    data?.recipes.find((elt) => {
      return elt.id == recipeId;
    }) || undefined;

  useEffect(() => {
    recipe =
      data?.recipes.find((elt) => {
        return elt.id == recipeId;
      }) || undefined;
  }, [recipeId]);

  const totalTimeObject = td.parse(recipe?.totalTime ?? "")
  const cookTimeObject = td.parse(recipe?.cookTime ?? "")
  const prepTimeObject = td.parse(recipe?.prepTime ?? "")

  function renderIngredients(ingredients: IngredientType[]) {
    const ingredientComponents = ingredients.map((ingredient, index) => {
      return Ingredient({ ingredient, index });
    });
    return <div className="recipe__ingredients">{ingredientComponents}</div>;
  }

  function displayRecipe(recipe: undefined | RecipeSchema) {
    if (recipe) {
      return (
        <div className="content__recipes__recipe">
          <div className="content__recipes__recipe__title">{recipe.name}</div>
          <a
            href={recipe.url}
            target="_blank"
            rel="noreferrer"
            className="content__recipes__recipe__link"
          >
            {recipe.url}
          </a>
          <div className="content__recipes__recipe__summary">
            {(recipe.recipeIngredient || []).length} ingrédient
            {(recipe.recipeIngredient || []).length > 1 ? "s" : ""},{" "}
            {`${recipe.totalTime} ${recipe.totalTime}`}
          </div>
          {renderIngredients(
            (recipe.recipeIngredient as IngredientType[]) || [],
          )}
        </div>
      );
    } else {
      return (
        <div className="content__recipes__recipe">
          Recipe {recipeId} loading...{" "}
        </div>
      );
    }
  }

  return displayRecipe(recipe);
};

export { Recipe };
