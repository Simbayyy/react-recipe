import React, { useState } from 'react';
import { Route, RouterProvider, createBrowserRouter, createRoutesFromElements } from "react-router-dom";
import { Home } from "./Home";
import { Recipe } from "./Recipe";
import { RecipeList } from "./RecipeList";
import { SignupView } from "./SignupView";
import { AdminDashboard } from './AdminDashboard';
import { ErrorView } from './ErrorView';

export function App (): React.ReactElement {
    
    const [user, setUser] = useState("")
    const [admin, setAdmin] = useState(false)

    async function checkAuth () {
      let url = `${import.meta.env.VITE_DOMAIN != 'build' ? 'http://localhost:3000' : ''}/api/check-auth`
      try {
          const response = await fetch(url)
          const responsejson = await response.json()
  
          if (response.ok) {
              setUser(responsejson.user ?? "")
              setAdmin(responsejson.admin ?? false)
          } else {
              console.error('Could not fetch user')
          }
      } catch (error) {
          console.error(`An error occurred: ${error}`)
      }  
    }

    checkAuth()

    const router = createBrowserRouter(
    createRoutesFromElements(
      [<Route
        path="/"
        element={<Home user={user} admin={admin} setUser={setUser}/>}  
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
            element={<AdminDashboard />// : <ErrorView errorCode={"unauthorized"} />
          }
          >
        </Route>
      </Route>,
      <Route 
        path="/login" 
        element={<SignupView userSetter={setUser} adminSetter={setAdmin} />}
      >
      </Route>,
      <Route 
        path="/signup" 
        element={<SignupView userSetter={setUser} adminSetter={setAdmin} />}
      >
      </Route>]
    ));
  
    return <RouterProvider router={router} />
}
