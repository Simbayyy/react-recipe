import { useParams, useOutletContext } from "react-router-dom"
import { Recipe as RecipeType, Ingredient as IngredientType}  from "../functions/types"
import { Ingredient } from "./Ingredient"
import { useEffect, useState } from "react"


export const Recipe: React.FunctionComponent<{}> =  (): React.ReactElement => {
    let {recipeId} = useParams()
    let data: null | {recipes:RecipeType[]} = useOutletContext()

    let recipe = data?.recipes.find((elt) => {return elt.id == recipeId}) || undefined
    useEffect(() => {
        recipe = data?.recipes.find((elt) => {return elt.id == recipeId}) || undefined
    }, [recipeId])
    
    function renderIngredients (ingredients:IngredientType[]) {
        let ingredientComponents = ingredients.map((ingredient, index) => {
            return Ingredient({ingredient, index})
        })
        return <div className="recipe__ingredients">
            {ingredientComponents}
        </div>
    }

    function displayRecipe(recipe: undefined | RecipeType) {
        if (recipe) {
            return <div className="home__recipes__recipe">
                <div className="home__recipes__recipe__title">{recipe.name}</div>
                <a href={recipe.url} target="_blank" className="home__recipes__recipe__link">{recipe.url}</a>
                <div className="home__recipes__recipe__summary">
                    {recipe.ingredients.length} ingrédient{recipe.ingredients.length > 1 ? "s": ""}, {`${recipe.time.time} ${recipe.time.unit}`}
                </div>
                {renderIngredients(recipe.ingredients)}
             </div>
        } else {
            return <div className="home__recipes__recipe">Recipe {recipeId} loading... </div>
        }    
    }

    return displayRecipe(recipe)
}