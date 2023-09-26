import { Link } from "react-router-dom"
import { RecipeSchema } from "../functions/types"
import React from 'react'

const RecipeCard: React.FunctionComponent<{recipe:RecipeSchema, index:number}> =  ({recipe, index}): React.ReactElement => {
    
    return <Link to={`${recipe.id}` || '.'} key={index} className="content__recipes__card">
        <div className="content__recipe__card__name">{recipe.name}</div>
        <div>{(recipe.recipeIngredient || []).length} ingrédient{(recipe.recipeIngredient || []).length > 1 ? "s": ""}</div>
        <div>{`${recipe.totalTime} ${recipe.totalTime}`}</div>
    </Link>
}

export {RecipeCard}