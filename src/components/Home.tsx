import { Link, Outlet } from 'react-router-dom';

export const Home: React.FunctionComponent<
        {
            user:string,
            admin:boolean,
            setUser:React.Dispatch<React.SetStateAction<string>>
        }> = ({user, admin, setUser}): React.ReactElement => {

    const logout = () => {
        fetch(`${import.meta.env.VITE_DOMAIN != 'build' ? 'http://localhost:3000' : ''}/login/logout`,
        {method:'POST'})
            .then(() => setUser(""))
            .catch(()=> console.error("Rejected logout"))
    }

    const logInComponents = [<Link to="/" className='home__header__title'>Ceci est un site, ici est son logo</Link>,
    <Link to="recipes" className='home__header__link'> Accueil recettes </Link>].concat(
        user == "" ? [<Link to="/login" className='home__header__link'> Connexion </Link>,
            <Link to="/signup" className='home__header__link'> Créer un compte </Link>,]
        : [<div className='home__header__nolink'> Connecté·e en tant que {user} </div>,
            <div className='home__header__link' onClick={logout}> Se déconnecter </div>]
        ).concat(
            admin === true ? [<Link to="/admin" className='home__header__link'> Administration </Link>] : []
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
