import './App.css';
import { useEffect, useState } from 'react';
import { Recipe } from './types';

function App() {

  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('http://localhost:3000/api/recipes')
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
      let dataComponents = data.recipes.map((element, index) => {
        return <div>Hello {index}</div>
      }); 
      return <div>
        {dataComponents}
      </div>
  
    } else {
      return <div>No recipe</div>
    }
  }
  return (
    <div className="App">
      <header className="App-header">
        {showRecipes(data)}
      </header>
    </div>
  );
}

export default App;
