import { Ingredient as IngredientType } from "../functions/types";
import React from "react";

const Ingredient: React.FunctionComponent<{
  ingredient: IngredientType;
  index: number;
}> = ({ ingredient, index }): React.ReactElement => {
  return (
    <div key={index} className="recipe__ingredients__ingredient">
      {ingredient.name}, {`${ingredient.amount} ${ingredient.unit}`}
    </div>
  );
};

export { Ingredient };
