import { FC, useEffect, useState } from 'react';
import {RecipeType} from '../functions/types';
import {RecipeCard} from './RecipeCard';
import { Outlet, useOutlet } from 'react-router-dom';

const RecipeList: React.FunctionComponent =  (): React.ReactElement => {

  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  let outlet = useOutlet()
  let placeholder = <div className="content__recipes__recipe">Clique sur une recette pour en voir les détails</div>

  useEffect(() => {
    fetch(`${import.meta.env.VITE_DOMAIN != 'build' ? 'http://localhost:3000' : ''}/api/recipes`)
      .then((res) => res.json())
      .then((res) => {
        setData(res);
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
        setLoading(false);
      });
  }, []); // Empty dependency array ensures this effect runs only once on mount  
  function showRecipes (data: null | {recipes:RecipeType[]}) {
    if (data) {
      let dataComponents = data.recipes.filter((elt) => {return elt.name != ""}).map((element, index) => {
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