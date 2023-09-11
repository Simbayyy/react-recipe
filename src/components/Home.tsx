import { Link, Outlet } from 'react-router-dom';
import { CookiesProvider } from 'react-cookie';
import { useState } from 'react';

export const Home: React.FunctionComponent<{user:string}> =  ({user}): React.ReactElement => {

    const logout = () => {
        
    }

    const logInComponents = [<Link to="/" className='home__header__title'>Ceci est un site, ici est son logo</Link>,
    <Link to="recipes" className='home__header__link'> Accueil recettes </Link>].concat(
        user == "" ? [<Link to="login" className='home__header__link'> Connexion </Link>,
            <Link to="signup" className='home__header__link'> Créer un compte </Link>,]
        : [<div className='home__header__nolink'> Connecté·e en tant que {user} </div>,
            <div className='home__header__link' onClick={logout}> Se déconnecter </div>]
        )

    return (
    <div>
        <div className='home'>
            <div className='home__header'>
                {logInComponents}
            </div>
            <Outlet /> 
        </div>
    </div>
  );
}
