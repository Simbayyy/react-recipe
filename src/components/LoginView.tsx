import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCookies } from "react-cookie";

export function LoginView(props:{userSetter:React.Dispatch<React.SetStateAction<string>>}): React.ReactElement {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    let [result, setResult] = useState("nothing sent")
  
    const navigate = useNavigate()

    const checkAuth = () => {
        fetch(`${import.meta.env.VITE_DOMAIN != 'build' ? 'http://localhost:3000' : ''}/api/check-auth`)
      .then((response) => response.json())
      .then((data) => {
        props.userSetter(data.username); // Update the state based on the response

      })
      .catch((error) => {
        console.error(`Error checking authentication: ${error}`);
      });
    }

    const handleUsernameChange = (e: React.SyntheticEvent) => {
        let target = e.target as HTMLInputElement
        setUsername(target.value);
    };
  
    const handlePasswordChange = (e: React.SyntheticEvent) => {
        let target = e.target as HTMLInputElement
        setPassword(target.value)
    };
  
    const handleSubmit = async (e: React.SyntheticEvent) => {
        e.preventDefault()
        let request = {
            headers: {
                "Content-Type":"application/json",
            },
            method:'POST',
            body:JSON.stringify({ username, password})
        }
        let url = `${import.meta.env.VITE_DOMAIN != 'build' ? 'http://localhost:3000' : ''}/login/password`
        try {
            const response = await fetch(url, request)
            const responsejson = await response.json()
            if (response.ok) {
                props.userSetter(responsejson.username ?? "")
                navigate('/')
            } else {
                setResult(`Nom d'utilisateur ou mot de passe inconnu`)
            }
        } catch (error) {
            console.error(`An error occurred: ${error}`)
        }
};
  
    return (
      <div className='login__box'>
        <div>{result}</div>
        <form onSubmit={handleSubmit}>
          <div>
            <label htmlFor="username">Nom d'utilisateur : </label>
            <input
              type="text"
              id="username"
              name="username"
              value={username}
              onChange={handleUsernameChange}
            />
          </div>
          <div>
            <label htmlFor="password">Mot de passe : </label>
            <input
              type="password"
              id="password"
              name="password"
              value={password}
              onChange={handlePasswordChange}
            />
          </div>
          <div>
            <button type="submit">Login</button>
          </div>
        </form>
      </div>
    );
  }