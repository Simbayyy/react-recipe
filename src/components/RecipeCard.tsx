import { Link } from "react-router-dom"
import { RecipeType } from "../functions/types"


const RecipeCard: React.FunctionComponent<{recipe:RecipeType, index:number}> =  ({recipe, index}): React.ReactElement => {
    return <Link to={`${recipe.id}` || '.'} key={index} className="content__recipes__card">
        <div className="content__recipe__card__name">{recipe.name}</div>
        <div>{recipe.ingredients.length} ingrédient{recipe.ingredients.length > 1 ? "s": ""}</div>
        <div>{`${recipe.time.time} ${recipe.time.unit}`}</div>
    </Link>
}

export {RecipeCard}