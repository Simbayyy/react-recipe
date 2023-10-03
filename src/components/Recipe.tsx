import { useParams, useOutletContext } from "react-router-dom";
import {
  Ingredient as IngredientType,
  Nutrient,
  RecipeSchema,
  nutrientList,
} from "../functions/types";
import { Ingredient } from "./Ingredient";
import React, { useEffect, useState } from "react";
import * as td from "tinyduration";
import {
  Time,
  display_time_string,
  reduce_time_object,
  Duration,
  parseAndSetTime,
  defaultTimeObject,
} from "../functions/time_parsing";
import { CookTime, PrepTime, TotalTime } from "./Icons";
import { getConversionFactor } from "../functions/unit_conversion";

const Recipe: React.FunctionComponent<
  Record<string, never>
> = (): React.ReactElement => {
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
    parseAndSetTime(recipe, "totalTime", setReducedTotalTime);
    parseAndSetTime(recipe, "prepTime", setReducedPrepTime);
    parseAndSetTime(recipe, "cookTime", setReducedCookTime);
  }, [recipeId]);

  function renderIngredients(ingredients: IngredientType[]) {
    const ingredientComponents = ingredients.map((ingredient, index) => {
      return Ingredient({ ingredient, index });
    });
    return (
      <div className="recipe__ingredients">
        <div className="recipe__section__title">Ingrédients</div>
        {ingredientComponents}
      </div>
    );
  }

  function renderNutrition(
    ingredients: IngredientType[],
    nutrients: Nutrient[],
  ) {
    const nutrientComponents = nutrients.map((elt) => {
      return {
        name: elt.display_name,
        unit: elt.unit,
        value: Number(
          (
            ingredients
              .map((ingredient) => {
                return (
                  (ingredient[elt.name] *
                    Number(ingredient.amount) *
                    getConversionFactor(ingredient.unit)) /
                  10000
                );
              })
              .reduce((a, b) => {
                return a + b;
              }, 0) / 1000
          ).toPrecision(3),
        ),
      };
    });
    const nutritionComponents = nutrientComponents.map((elt) => {
      return (
        <div key={elt.name} className="recipe__nutrition__item">
          <div className="recipe__nutrient__name">{`${elt.name}`}</div>
          <div className="recipe__nutrient__quantity">
            &nbsp;{`: ${elt.value} ${elt.unit}`}
          </div>
        </div>
      );
    });
    return (
      <div className="recipe__nutrition">
        <div className="recipe__section__title">Nutriments</div>
        {nutritionComponents}
      </div>
    );
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
          <div className="recipe__content__lists">
            {renderIngredients(
              (recipe.recipeIngredient as IngredientType[]) || [],
            )}
            {renderNutrition(
              (recipe.recipeIngredient as IngredientType[]) || [],
              nutrientList,
            )}
          </div>
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
