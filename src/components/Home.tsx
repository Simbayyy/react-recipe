import { Link, Outlet } from 'react-router-dom';
import { CookiesProvider } from 'react-cookie';

export const Home: React.FunctionComponent =  (): React.ReactElement => {

    return (
    <CookiesProvider>
        <div className='home'>
            <div className='home__header'>
                <Link to="/" className='home__header__title'>Ceci est un site, ici est son logo</Link>
                <Link to="recipes" className='home__header__torecipes'> Accueil recettes </Link>
                <Link to="login" className='home__header__torecipes'> Connexion </Link>
                <Link to="signup" className='home__header__torecipes'> Créer un compte </Link>
            </div>
            <Outlet /> 
        </div>
    </CookiesProvider>
  );
}
