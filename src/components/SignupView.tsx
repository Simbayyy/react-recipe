import React, { useState } from 'react';
import { useNavigate, matchPath } from 'react-router-dom';

export function SignupView(props:{userSetter:React.Dispatch<React.SetStateAction<string>>}): React.ReactElement {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [result, setResult] = useState("")
    const [errorCode, setErrorCode] = useState("")
  
    const isLogin = !!matchPath(
      location.pathname,
      '/login'
    )

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
        let url = `${import.meta.env.VITE_DOMAIN != 'build' ? 'http://localhost:3000' : ''}/login/${isLogin ? "password" :  "signup" }`
        try {
            const response = await fetch(url, request)
            const responsejson = await response.json()

            if (response.ok) {
                props.userSetter(responsejson.username ?? "")
                navigate('/')
            } else {
                setResult(responsejson.error ?? 'Une erreur est survenue')
                setErrorCode(responsejson.code)
            }
        } catch (error) {
            console.error(`An error occurred: ${error}`)
        }
};
  
    return (
      <div className='login__background'>
        <div className='login__box'>
          <div className="login__form__title">{isLogin ? "Se connecter" : "S'inscrire"}</div>
          <div>{result}</div>
          <form onSubmit={handleSubmit} className='login__form'>
          <div className={`login__form__field ${errorCode == '23505' ? "login__form__field__error" : ""}`}>
              <label htmlFor="username">Nom d'utilisateur</label>
              <input
                type="text"
                id="username"
                name="username"
                value={username}
                onChange={handleUsernameChange}
              />
            </div>
            {!isLogin && <div className={`login__form__field ${errorCode == '23505' ? "login__form__field__error" : ""}`}>
              <label htmlFor="username">Adresse email</label>
              <input
                type="text"
                id="email"
                name="email"
                value={email}
                onChange={handleEmailChange}
              />
            </div>}
            <div className='login__form__field'>
              <label htmlFor="password">Mot de passe</label>
              <input
                type="password"
                id="password"
                name="password"
                value={password}
                onChange={handlePasswordChange}
              />
            </div>
            <button className='login__send' type="submit">Envoyer</button>
          </form>
        </div>
      </div>
    );
  }