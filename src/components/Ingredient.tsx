import { Ingredient as IngredientType }  from "../functions/types"


export const Ingredient: React.FunctionComponent<{ingredient:IngredientType, index:number}> =  ({ingredient, index}): React.ReactElement => {    
    return <div key={index}>
        <div>{ingredient.name}</div>
        <div>{`${ingredient.amount} ${ingredient.unit}`}</div>
    </div>
}