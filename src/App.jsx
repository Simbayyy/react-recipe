"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("./App.css");
const react_1 = require("react");
function App() {
    const [data, setData] = (0, react_1.useState)(null);
    const [loading, setLoading] = (0, react_1.useState)(true);
    (0, react_1.useEffect)(() => {
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
    function showRecipes(data) {
        if (data) {
            let dataComponents = data.recipes.map((element, index) => {
                return <div>Hello {index}</div>;
            });
            return <div>
        {dataComponents}
      </div>;
        }
        else {
            return <div>No recipe</div>;
        }
    }
    return (<div className="App">
      <header className="App-header">
        {showRecipes(data)}
      </header>
    </div>);
}
exports.default = App;
