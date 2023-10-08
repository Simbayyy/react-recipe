import { Link, Outlet, useNavigate, useOutlet } from "react-router-dom";
import React from "react";
import { FrontPage } from "./FrontPage";
import { Cake } from "./Icons";

export const Home: React.FunctionComponent<{
  user: string;
  admin: boolean;
  setUser: React.Dispatch<React.SetStateAction<string>>;
  setAdmin: React.Dispatch<React.SetStateAction<boolean>>;
}> = ({ user, admin, setUser, setAdmin }): React.ReactElement => {
  const navigate = useNavigate();
  const outlet = useOutlet();

  const logout = () => {
    fetch(
      `${
        import.meta.env.VITE_DOMAIN != "build" ? "http://localhost:3000" : ""
      }/login/logout`,
      { method: "POST" },
    )
      .then(() => {
        setUser("");
        setAdmin(false);
        navigate("/");
      })
      .catch(() => console.error("Rejected logout"));
  };

  const logInComponents = [
    <Link key={1} to="/" className="home__header__title">
      <Cake className="home__header__logo" />
    </Link>,
    <Link key={2} to="recipes" className="home__header__link">
      {" "}
      Accueil recettes{" "}
    </Link>,
  ]
    .concat(
      user == ""
        ? [
            <Link key={3} to="/login" className="home__header__link">
              {" "}
              Connexion{" "}
            </Link>,
            <Link key={4} to="/signup" className="home__header__link">
              {" "}
              Créer un compte{" "}
            </Link>,
          ]
        : [
            <div key={3} className="home__header__nolink">
              {" "}
              Connecté·e en tant que {user}{" "}
            </div>,
            <div key={4} className="home__header__link" onClick={logout}>
              {" "}
              Se déconnecter{" "}
            </div>,
          ],
    )
    .concat(
      admin === true
        ? [
            <Link key={5} to="/admin" className="home__header__link">
              {" "}
              Administration{" "}
            </Link>,
          ]
        : [],
    );

  const footerComponents = [
    <div className="fooddatacentral__quote"> Données de FoodData Central : U.S. Department of Agrigulture, Agricultural Research Service, FoodData Central, 2019. <a href="fdc.nal.usda.gov">fdc.nal.usda.gov</a></div>,
    <a className="home__footer__link" href="https://github.com/Simbayyy/react-recipe/"> Repo du frontend React </a>,
    <a className="home__footer__link" href="https://github.com/Simbayyy/noderecipe/"> Repo du backend Node </a>,
    <a href="https://sbaillet.com" className="home__footer__link"> Un site de Simon Baillet </a>
  ]

  return (
    <div className="home">
      {[<div key={"header"} className="home__header">{logInComponents}</div>,
      (outlet && <Outlet />) || <FrontPage />,
      <div key={"footer"} className="home__footer">{footerComponents}</div>]}
    </div>
  );
};
