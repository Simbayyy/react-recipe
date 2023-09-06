import { Recipe } from "../functions/types"


export const RecipeCard: React.FunctionComponent<{recipe:Recipe, index:number}> =  ({recipe, index}): React.ReactElement => {
    return <div key={index}>
        <a href={recipe.url} target="_blank" style={{color:"red"}}>{recipe.name}</a>
        <div>{recipe.ingredients.length} ingrédient{recipe.ingredients.length > 1 ? "s": ""}</div>
        <div>{`${recipe.time.time} ${recipe.time.unit}`}</div>
    </div>
}