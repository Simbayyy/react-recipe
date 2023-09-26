import { useEffect, useState } from 'react';
import {RecipeType} from '../functions/types';
import {RecipeCard} from './RecipeCard';
import { Outlet, useOutlet } from 'react-router-dom';
import React from 'react'

const RecipeList: React.FunctionComponent =  (): React.ReactElement => {

  const [data, setData] = useState(null);

  const outlet = useOutlet()
  const placeholder = <div className="content__recipes__recipe">Clique sur une recette pour en voir les détails</div>

  useEffect(() => {
    fetch(`${import.meta.env.VITE_DOMAIN != 'build' ? 'http://localhost:3000' : ''}/api/recipes`)
      .then((res) => res.json())
      .then((res) => {
        setData(res);
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });
  }, []); // Empty dependency array ensures this effect runs only once on mount  
  function showRecipes (data: null | {recipes:RecipeType[]}) {
    if (data) {
      const dataComponents = data.recipes.filter((elt) => {return elt.name != ""}).map((element, index) => {
        return RecipeCard({recipe:element, index:index})
      }); 
      return <div className="content__recipes">
        {dataComponents}
      </div>
  
    } else {
      return <div className="content__recipes">Loading from {import.meta.env.keys}...</div>
    }
  }
  return (
    <div className="content">
      {showRecipes(data)}
      {(outlet && <Outlet context={data}/>) || placeholder}
    </div>
  );
}

export { RecipeList }