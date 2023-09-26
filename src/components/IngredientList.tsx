import { Outlet } from "react-router-dom"
import { IngredientRaw } from "../functions/types"
import { useIngredients } from "./AdminDashboard"
import React from 'react'

const IngredientCard: React.FunctionComponent<
        IngredientRaw
    > = (
        ingredient
    ) => {
    return <div key={ingredient.ingredient_id} className={`ingredient__card ${ingredient.high_confidence ? "ingredient__trusty" : ""}`}>
        <div className="ingredient__name">{ingredient.name}</div>
        <div className="ingredient__name_en">{ingredient.name_en}</div>
        <div className="ingredient__fdc_id">{ingredient.fdc_id}</div>
    </div>
}

export const IngredientList: React.FunctionComponent =  (): React.ReactElement => {    
    
    const {ingredients} = useIngredients()
    
    return <div className="ingredient__cards">
            {ingredients.map(IngredientCard)}
            <Outlet />
        </div>
}

