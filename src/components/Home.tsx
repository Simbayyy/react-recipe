import { Link, Outlet, useNavigate } from 'react-router-dom';
import React from 'react'

export const Home: React.FunctionComponent<
        {
            user:string,
            admin:boolean,
            setUser:React.Dispatch<React.SetStateAction<string>>,
            setAdmin:React.Dispatch<React.SetStateAction<boolean>>,            
        }> = ({user, admin, setUser, setAdmin}): React.ReactElement => {


    const navigate = useNavigate()

    const logout = () => {
        fetch(`${import.meta.env.VITE_DOMAIN != 'build' ? 'http://localhost:3000' : ''}/login/logout`,
        {method:'POST'})
            .then(() => {
                setUser("")
                setAdmin(false)
                navigate("/")
            })
            .catch(()=> console.error("Rejected logout"))
    }

    const logInComponents = [<Link key={1} to="/" className='home__header__title'>Ceci est un site, ici est son logo</Link>,
    <Link key={2} to="recipes" className='home__header__link'> Accueil recettes </Link>].concat(
        user == "" ? [<Link key={3} to="/login" className='home__header__link'> Connexion </Link>,
            <Link key={4} to="/signup" className='home__header__link'> Créer un compte </Link>,]
        : [<div key={3} className='home__header__nolink'> Connecté·e en tant que {user} </div>,
            <div key={4} className='home__header__link' onClick={logout}> Se déconnecter </div>]
        ).concat(
            admin === true ? [<Link key={5} to="/admin" className='home__header__link'> Administration </Link>] : []
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
