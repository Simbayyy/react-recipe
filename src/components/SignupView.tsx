import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export const SignupView: React.FunctionComponent =  (): React.ReactElement => {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    let [result, setResult] = useState("nothing sent")
  
    const navigate = useNavigate()

    const handleUsernameChange = (e: React.SyntheticEvent) => {
        let target = e.target as HTMLInputElement
        setUsername(target.value);
    };
  
    const handleEmailChange = (e: React.SyntheticEvent) => {
        let target = e.target as HTMLInputElement
        setEmail(target.value);
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
            body:JSON.stringify({ username, email, password})
        }
        let url = `${import.meta.env.VITE_DOMAIN != 'build' ? 'http://localhost:3000' : ''}/login/signup`
        try {
            const response = await fetch(url, request)

            if (response.ok) {
                navigate('/')
            } else {
                setResult(`Nom d'utilisateur ou mot de passe inconnu`)
            }
        } catch (error) {
            console.error(`An error occurred: ${error}`)
        }
};
  
    return (
      <div>
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
            <label htmlFor="username">Adresse email : </label>
            <input
              type="text"
              id="email"
              name="email"
              value={email}
              onChange={handleEmailChange}
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
            <button type="submit">Signup</button>
          </div>
        </form>
      </div>
    );
  }