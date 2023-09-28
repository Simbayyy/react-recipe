import { useParams, useOutletContext } from "react-router-dom";
import { Ingredient as IngredientType, RecipeSchema } from "../functions/types";
import { Ingredient } from "./Ingredient";
import React, { useEffect, useState } from "react";
import * as td from "tinyduration";
import {
  Time,
  display_time_string,
  reduce_time_object,
  Duration,
} from "../functions/time_parsing";
import { CookTime, PrepTime, TotalTime } from "./Icons";

const Recipe: React.FunctionComponent<
  Record<string, never>
> = (): React.ReactElement => {
  const defaultTimeObject = {
    mainTime: null,
    mainUnit: null,
    secondaryTime: null,
    secondaryUnit: null,
  };

  const [reducedTotalTime, setReducedTotalTime] =
    useState<Time>(defaultTimeObject);
  const [reducedCookTime, setReducedCookTime] =
    useState<Time>(defaultTimeObject);
  const [reducedPrepTime, setReducedPrepTime] =
    useState<Time>(defaultTimeObject);

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
    const totalTimeObject = td.parse(recipe?.totalTime ?? "") as Duration;
    setReducedTotalTime(reduce_time_object(totalTimeObject));
    const prepTimeObject = td.parse(recipe?.prepTime ?? "") as Duration;
    setReducedPrepTime(reduce_time_object(prepTimeObject));
    const cookTimeObject = td.parse(recipe?.cookTime ?? "") as Duration;
    setReducedCookTime(reduce_time_object(cookTimeObject));
  }, [recipeId]);

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
            {reducedPrepTime.mainTime ? (
              <PrepTime
                className="recipe__preptime__icon time__icon"
                text={display_time_string(reducedPrepTime, true)}
              />
            ) : (
              ""
            )}
            {reducedCookTime.mainTime ? (
              <CookTime
                className="recipe__cooktime__icon time__icon"
                text={display_time_string(reducedCookTime, true)}
              />
            ) : (
              ""
            )}
            {reducedTotalTime.mainTime ? (
              <TotalTime
                className="recipe__totaltime__icon time__icon"
                text={display_time_string(reducedTotalTime, true)}
              />
            ) : (
              ""
            )}
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
