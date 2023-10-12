import { Ingredient as IngredientType } from "../functions/types";
import React, { useState } from "react";
import { getConversionFactor } from "../functions/unit_conversion";

const Ingredient: React.FunctionComponent<{
  ingredient: IngredientType;
  index: number;
}> = ({ ingredient, index }): React.ReactElement => {
  const amount_100 = Number(ingredient.amount);
  const amount_corrected = amount_100 / 100;
  const conversionFactor = getConversionFactor(ingredient.unit, ingredient.name_en ?? "")
  const [amount, setAmount] = useState<number>(amount_corrected)
  const [name, setName] = useState<string>(`${ingredient.name.charAt(0).toUpperCase()}${ingredient.name.slice(
    1,
  )}`)
  const [unit, setUnit] = useState<string>(`${ingredient.unit}`)

  const handleAmountChange = (e: React.SyntheticEvent) => {
    const target = e.target as HTMLInputElement;
    setAmount(Number(target.value.replace(/\D/g, "")));
    ingredient.amount = Number(target.value.replace(/\D/g, "")) * 100
  };

  const handleNameChange = (e: React.SyntheticEvent) => {
    const target = e.target as HTMLInputElement;
    setName(target.value)
    ingredient.name = target.value
  };

  const handleUnitChange = (e: React.SyntheticEvent) => {
    const target = e.target as HTMLInputElement;
    setUnit(target.value)
    ingredient.unit = target.value
  };

  let isEdit = location.pathname.match(/edit/) 

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
      {isEdit 
       ? <div
          className="ingredient__name ingredient__text"
          >
            <input 
              className="ingredient__name__edit ingredient__edit"
              value={name}
              type="text"
              onChange={handleNameChange}
              />
          {`\u00A0:`}
        </div>
        : <div
        className="ingredient__name ingredient__text"
      >
        {`${ingredient.name.charAt(0).toUpperCase()}${ingredient.name.slice(
          1,
        )}\u00A0:`}
      </div>}
      {isEdit
        ? <div className="ingredient__edit__right_side"><input 
        type="text" 
        className="ingredient__quantity ingredient__text ingredient__edit__amount ingredient__edit"
        value={amount}
        onChange={handleAmountChange}
        />
        &nbsp;
        <input 
        type="text" 
        className="ingredient__quantity ingredient__text ingredient__edit__amount ingredient__edit"
        value={unit}
        onChange={handleUnitChange}
        />
      </div>  
      : <div className="ingredient__quantity ingredient__text">
        &nbsp;
        {amount_100 !== 0 ? `${amount_corrected}\u00A0${ingredient.unit}` : ""}
      </div>}
    </div>
  );
};

export { Ingredient };
