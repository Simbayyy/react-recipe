import React, { useState } from "react";
import { useNavigate, matchPath } from "react-router-dom";

export function SignupView(props: {
  userSetter: React.Dispatch<React.SetStateAction<string>>;
  adminSetter: React.Dispatch<React.SetStateAction<boolean>>;
}): React.ReactElement {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorCode, setErrorCode] = useState("");

  const errorText = (errorCode: string) => {
    if (errorCode == "23505") {
      return "Le nom d'utilisateur ou l'adresse email est déjà utilisé";
    }
    if (errorCode == "incorrect") {
      return "Nom d'utilisateur ou mot de passe incorrect";
    }
    if (errorCode == "shortpass") {
      return "Mot de passe trop court";
    }
    if (errorCode == "") {
      return "";
    }

    return "Une erreur inattendue est survenue";
  };

  const isLogin = !!matchPath(location.pathname, "/login");

  const navigate = useNavigate();

  const handleUsernameChange = (e: React.SyntheticEvent) => {
    const target = e.target as HTMLInputElement;
    setUsername(target.value);
  };

  const handleEmailChange = (e: React.SyntheticEvent) => {
    const target = e.target as HTMLInputElement;
    setEmail(target.value);
  };

  const handlePasswordChange = (e: React.SyntheticEvent) => {
    const target = e.target as HTMLInputElement;
    setPassword(target.value);
  };

  const handleSubmit = async (e: React.SyntheticEvent) => {
    e.preventDefault();
    const request = {
      headers: {
        "Content-Type": "application/json",
      },
      method: "POST",
      body: JSON.stringify({ username, email, password }),
    };
    const url = `${
      import.meta.env.VITE_DOMAIN != "build" ? "http://localhost:3000" : ""
    }/login/${isLogin ? "password" : "signup"}`;
    try {
      const response = await fetch(url, request);
      const responsejson = await response.json();

      if (response.ok) {
        props.userSetter(responsejson.username ?? "");
        props.adminSetter(responsejson.admin ?? false);
        navigate("/");
      } else {
        setErrorCode(responsejson.code);
      }
    } catch (error) {
      console.error(`An error occurred: ${error}`);
    }
  };

  const goBack = () => {
    navigate(-1);
  };

  return (
    <div className="login__background">
      <div onClick={goBack} className="login__go_back">
        Revenir en arrière
      </div>
      <div className="login__box">
        <div className="login__form__title">
          {isLogin ? "Se connecter" : "S'inscrire"}
        </div>
        <div className="login__form__error">{errorText(errorCode)}</div>
        <form onSubmit={handleSubmit} className="login__form">
          <div
            className={`login__form__field 
                        ${
                          errorCode == "23505"
                            ? " login__form__field__error"
                            : ""
                        }
                        ${
                          errorCode == "incorrect"
                            ? " login__form__field__error"
                            : ""
                        }`}
          >
            <label htmlFor="username">Nom d&apos;utilisateur</label>
            <input
              type="text"
              id="username"
              name="username"
              value={username}
              onChange={handleUsernameChange}
            />
          </div>
          {!isLogin && (
            <div
              className={`login__form__field ${
                errorCode == "23505" ? "login__form__field__error" : ""
              }`}
            >
              <label htmlFor="username">Adresse email</label>
              <input
                type="text"
                id="email"
                name="email"
                value={email}
                onChange={handleEmailChange}
              />
            </div>
          )}
          <div
            className={`login__form__field 
                        ${
                          errorCode == "incorrect"
                            ? " login__form__field__error"
                            : ""
                        }
                        ${
                          errorCode == "shortpass"
                            ? " login__form__field__error"
                            : ""
                        }`}
          >
            <label htmlFor="password">Mot de passe</label>
            <input
              type="password"
              id="password"
              name="password"
              value={password}
              onChange={handlePasswordChange}
            />
            <div className="login__form__password__criteria">
              8 caractères minimum
            </div>
          </div>
          <button className="login__send" type="submit">
            Envoyer
          </button>
        </form>
      </div>
    </div>
  );
}
