import { Link } from "react-router-dom";
import { RecipeSchema } from "../functions/types";
import React, {forwardRef, MutableRefObject} from "react";

const RecipeAdderCard = forwardRef<HTMLAnchorElement,{
    index: number;
    ref?: MutableRefObject<HTMLAnchorElement | null>;
  }>( ({ index }, ref): React.ReactElement => {
  return (
    <a
      key={index}
      className="content__recipes__card"
      ref={ref}
    >
      <input className="content__recipe__card__name" placeholder="Entre une URL ici" type="text"/>
      <div>
      </div>
      <div></div>
    </a>
  );
});

const RecipeCard = forwardRef<HTMLAnchorElement,{
    recipe: RecipeSchema;
    index: number;
    ref?: MutableRefObject<HTMLAnchorElement | null>;
  }>( ({ recipe, index }, ref): React.ReactElement => {
  return (
    <Link
      to={`${recipe.id}` || "."}
      key={index}
      className="content__recipes__card"
      ref={ref}
    >
      <div className="content__recipe__card__name">{recipe.name}</div>
      <div>
        {(recipe.recipeIngredient || []).length} ingrédient
        {(recipe.recipeIngredient || []).length > 1 ? "s" : ""}
      </div>
      <div>{`${recipe.totalTime} ${recipe.totalTime}`}</div>
    </Link>
  );
});

export { RecipeCard, RecipeAdderCard };
