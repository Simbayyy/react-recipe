import React from 'react';
import ReactDOM from 'react-dom/client';
import './static/index.css';
import Home from './components/Home';
import reportWebVitals from './reportWebVitals';
import { createBrowserRouter,
  createRoutesFromElements,
  RouterProvider,
  Route,
  Link, } from 'react-router-dom'

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route 
      path="/" 
      element={<Home />}
    >
    </Route>

  ));

const root = ReactDOM.createRoot(document.getElementById("root") as Element)

root.render(
    <RouterProvider router={router} />
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals(console.log);