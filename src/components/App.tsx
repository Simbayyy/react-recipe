import React, { useEffect, useState } from 'react';
import { Route, RouterProvider, createBrowserRouter, createRoutesFromElements } from "react-router-dom";
import { Home } from "./Home";
import { Recipe } from "./Recipe";
import { RecipeList } from "./RecipeList";
import { SignupView } from "./SignupView";
import { AdminDashboard } from './AdminDashboard';
import { ErrorView } from './ErrorView';
import { IngredientList } from './IngredientList';

export function App (): React.ReactElement {
    
    const [user, setUser] = useState("")
    const [admin, setAdmin] = useState(false)

    useEffect(() => {
      const url = `${import.meta.env.VITE_DOMAIN != 'build' ? 'http://localhost:3000' : ''}/api/check-auth`
      fetch(url)
        .then((response) => response.json())
        .then((response) => {
            setUser(response.user ?? "")
            setAdmin(response.admin ?? false)
        })
        .catch((error) => {
      console.error(`An error occurred: ${error}`)
      } )
    }, [])

    const router = createBrowserRouter(
    createRoutesFromElements(
      [<Route
        key={1}
        path="/"
        element={<Home user={user} admin={admin} setUser={setUser} setAdmin={setAdmin}/>}  
      >
        <Route 
          path="recipes" 
          element={<RecipeList />}
        >
          <Route 
            path=":recipeId"  
            element={<Recipe />}
          />
        </Route>
        <Route 
          path="admin"  
          element={admin ? <AdminDashboard /> : <ErrorView errorCode={"unauthorized"} />
          }
        >
            <Route 
              path="ingredients"
              element={<IngredientList />}
            />
            <Route 
              path="low-confidence"
              element={<IngredientList />}
            />
        </Route>
      </Route>,
      <Route 
        key={2}
        path="/login" 
        element={<SignupView userSetter={setUser} adminSetter={setAdmin} />}
      >
      </Route>,
      <Route 
        key={3}
        path="/signup" 
        element={<SignupView userSetter={setUser} adminSetter={setAdmin} />}
      >
      </Route>]
    ));
  
    return <RouterProvider router={router} />
}
