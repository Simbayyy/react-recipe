import { useEffect, useState } from "react"
import { Link, Outlet, useOutletContext } from "react-router-dom"
import { IngredientRaw } from "../functions/types"
import React from 'react'

export const AdminDashboard: React.FunctionComponent<Record<string,never>> =  (): React.ReactElement => {

    const [ingredients, setIngredients] = useState<IngredientRaw[]>([])
    
    useEffect(() => {
        const url = `${import.meta.env.VITE_DOMAIN != 'build' ? 'http://localhost:3000' : ''}/api/ingredients`
        fetch(url)
          .then((response) => response.json())
          .then((response) => {
              setIngredients(response.ingredients ?? [])
          })
          .catch((error) => {
        console.error(`An error occurred: ${error}`)
        } )
      }, [])

    return <div className="admin__dashboard">
        <div className="admin__dashboard__buttons">
            <Link to={'ingredients'} className={"admin__button"}>
                <div className="admin__button__title">Liste des ingrédients</div>
                <div className="admin__button__desc">Accès à la liste de tous les ingrédients dans la base de données</div>
            </Link>
            <Link to={'low-confidence'} className={"admin__button"}>
                <div className="admin__button__title">Vérification des ingrédients incertains</div>
                <div className="admin__button__desc">Correction ou validation des ingrédients douteux</div>
            </Link>
        </div>
        <Outlet context={{ ingredients }}/>
    </div>
}

export function useIngredients() {
    return useOutletContext<{ingredients:IngredientRaw[]}>();
  }