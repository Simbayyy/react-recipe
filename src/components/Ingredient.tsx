import { Ingredient as IngredientType } from "../functions/types";
import React from "react";

const Ingredient: React.FunctionComponent<{
  ingredient: IngredientType;
  index: number;
}> = ({ ingredient, index }): React.ReactElement => {
    const amount_100 = Number(ingredient.amount)
    const amount_corrected = amount_100 / 100

  return (
    <div key={index} className={`recipe__ingredients__ingredient ${ingredient.high_confidence ? "" : `faulty__ingredient`}`}>
      <div 
        className="ingredient__name" 
        title={ingredient.high_confidence 
            ? "" 
            : "Le serveur n'est pas certain d'avoir les bonnes données pour le calcul des paramètres"}
        >{`${ingredient.name.charAt(0).toUpperCase()}${ingredient.name.slice(1)}`}
      </div>
      <div className="ingredient__quantity"> : {`${amount_corrected} ${ingredient.unit}`}</div>
    </div>
  );
};

export { Ingredient };
