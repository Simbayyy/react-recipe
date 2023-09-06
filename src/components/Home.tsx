import '../static/App.css';
import { FC, useEffect, useState } from 'react';
import { Recipe } from '../functions/types';
import { RecipeCard } from './RecipeCard';
import { Outlet } from 'react-router-dom';

const Home: React.FunctionComponent =  (): React.ReactElement => {

  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  
  useEffect(() => {
    fetch(`${process.env.REACT_APP_DOMAIN ? 'http://localhost:3000' : ''}/api/recipes`)
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
  function showRecipes (data: null | {recipes:Recipe[]}) {
    if (data) {
      let dataComponents = data.recipes.filter((elt) => {return elt.name != ""}).map((element, index) => {
        return RecipeCard({recipe:element, index:index})
      }); 
      return <div>
        {dataComponents}
      </div>
  
    } else {
      return <div>Loading from {process.env.keys}...</div>
    }
  }
  return (
    <div className="App">
      <header className="App-header">
        {showRecipes(data)}
      </header>
      <Outlet context={data}/>
    </div>
  );
}

export default Home;
