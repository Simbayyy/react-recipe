import { Link } from "react-router-dom"
import { Recipe } from "../functions/types"


export const RecipeCard: React.FunctionComponent<{recipe:Recipe, index:number}> =  ({recipe, index}): React.ReactElement => {
    return <Link to={`${recipe.id}` || '.'} key={index}>
        <div>{recipe.name}</div>
        <div>{recipe.ingredients.length} ingrédient{recipe.ingredients.length > 1 ? "s": ""}</div>
        <div>{`${recipe.time.time} ${recipe.time.unit}`}</div>
    </Link>
}