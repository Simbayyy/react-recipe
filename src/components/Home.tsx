import { Link, Outlet } from 'react-router-dom';

export const Home: React.FunctionComponent =  (): React.ReactElement => {

    return (
    <div className='home'>
        <div className='home__header'>
            <div className='home__header__title'>Ceci est un site, ici est son logo</div>
            <Link to="recipes" className='home__header__torecipes'> Accueil recettes </Link>
        </div>
        <Outlet /> 
    </div>
  );
}
