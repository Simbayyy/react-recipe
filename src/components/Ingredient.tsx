import { Ingredient as IngredientType } from "../functions/types";
import React from "react";
import { getConversionFactor } from "../functions/unit_conversion";

const Ingredient: React.FunctionComponent<{
  ingredient: IngredientType;
  index: number;
}> = ({ ingredient, index }): React.ReactElement => {
  const amount_100 = Number(ingredient.amount);
  const amount_corrected = amount_100 / 100;
  const conversionFactor = getConversionFactor(ingredient.unit)

  return (
    <div
      key={index}
      className={`recipe__ingredients__ingredient 
      ${ingredient.fdc_id === null ? "null__fdc_id" : ``}
      ${conversionFactor === 0 ? "dimensionless" : ``}
      ${ingredient.high_confidence ? "" : `faulty__ingredient`}
      `}
      title={`${conversionFactor === 0 ? "L'unité de l'ingrédient ne permet pas d'en calculer les apports\n" : ""}${ingredient.fdc_id === null ? "Le serveur n'a pas trouvé de données pour calculer les apports\n" : ""}${ingredient.high_confidence
        ? ""
        : "Le serveur n'est pas certain d'avoir les bonnes données pour le calcul des paramètres"}`}
    >
      <div
        className="ingredient__name ingredient__text"
      >
        {`${ingredient.name.charAt(0).toUpperCase()}${ingredient.name.slice(
          1,
        )}`}
      </div>
      <div className="ingredient__quantity ingredient__text">
        &nbsp;
        {amount_100 !== 0 ? `: ${amount_corrected} ${ingredient.unit}` : ""}
      </div>
    </div>
  );
};

export { Ingredient };
