import React, { useState } from 'react';
import ReactDOM from 'react-dom/client';
import { Route, RouterProvider, createBrowserRouter, createRoutesFromElements } from "react-router-dom";
import { Home } from "./Home";
import { LoginView } from "./LoginView";
import { Recipe } from "./Recipe";
import { RecipeList } from "./RecipeList";
import { SignupView } from "./SignupView";



export function App (): React.ReactElement {
    
    const [user, setUser] = useState("")

    const router = createBrowserRouter(
    createRoutesFromElements(
      <Route
        path="/"
        element={<Home user={user}/>}  
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
          path="login" 
          element={<LoginView userSetter={setUser} />}
        >
        </Route>
        <Route 
          path="signup" 
          element={<SignupView />}
        >
        </Route>
      </Route>
    ));
  
    return <RouterProvider router={router} />
}
