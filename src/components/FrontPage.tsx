import React, { useState } from "react";
import { Link } from "react-router-dom";
import bol from "../static/bol2.webp"
import { Loading } from "./Icons";

export const FrontPage: React.FunctionComponent = ({}): React.ReactElement => {
    const [isLoading, setIsLoading] = useState(true)

    function onLoad() {
        setIsLoading(false)
    }

    return <div className="recipe__frontpage">
        <div className="recipe__frontpage__goal recipe__frontpage__section">
            <div className="recipe__frontpage__box">
                <div style={{display: isLoading ? "block" : "none"}}className="recipe__frontpage__bol" >
                    <Loading />    
                </div>
                <img style={{display: isLoading ? "none" : "block"}} className="recipe__frontpage__bol" src={bol} alt="Bol fait maison avec un diagramme représentant la méconnaissance des apports de ce bol" onLoad={onLoad} />
            </div>
            <div className="recipe__frontpage__box">
                <div className="recipe__frontpage__quote">
                    «&nbsp;Mange des lentilles, c'est plein de fer&nbsp;»
                </div>
                <div className="recipe__frontpage__quote">
                    «&nbsp;Remplacer le sucre par du miel, c'est mieux&nbsp;»
                </div>
                <div className="recipe__frontpage__quote">
                    «&nbsp;Cuisine toi-même, tu sauras ce qu'il y a dedans au moins&nbsp;»
                </div>
            </div>
            <div className="recipe__frontpage__box">
                <div className="recipe__frontpage__text">
                    De plus en plus de personnes s'intéressent à ce qui se trouve dans leurs assiettes, dans les moindres détails, et tentent de suivre leur alimentation. Sans avoir la prétention de remplacer le travail des nutritionnistes ni des diététicien·nes, ce site est un outil pour suivre la composition de ses plats maison, et avoir des chiffres en tête pour comparer ! 
                </div>
            </div>
        </div>
        <div className="recipe__frontpage__account recipe__frontpage__section">
            <div className="recipe__frontpage__box">
                <div className="recipe__frontpage__text">
                    Sans compte, les recettes « vitrines » sont accessible, et il est possible d'ajouter des recettes provenant d'autres sites (qui ont leur recette dans un format qui le permet). Il n'y a pas de moyen de sauvegarder ses recherches, qui disparaîtront en changeant de page. 
                </div>
                <Link to={"/recipes"} className="recipe__frontpage__button">
                    Aller à la page des recettes
                </Link>
            </div>
            <div className="recipe__frontpage__box">
                <div className="recipe__frontpage__text">
                    Une fois connecté·e, les recettes recherchées seront liées au compte, et pourront être retrouvées à l'avenir.
                </div>
                <Link to={"/login"} className="recipe__frontpage__button">
                    Se connecter
                </Link>
                <Link to={"/signup"} className="recipe__frontpage__button">
                    Créer un compte
                </Link>
            </div>
        </div>
        <div className="recipe__frontpage__header"> Fonctionnalités prochainement ajoutées</div>
        <div className="recipe__frontpage__upcoming recipe__frontpage__section">
        <div className="recipe__frontpage__functionality">
                Filtre de recherche pour les recettes 
            </div>
            <div className="recipe__frontpage__functionality">
                Lecture des recettes à partir du texte d'un site
            </div>
            <div className="recipe__frontpage__functionality">
                Accès aux recettes en langue étrangère  
            </div>
            <div className="recipe__frontpage__functionality">
                Traduction de la page en langues étrangères
            </div>
        </div>
    </div>
}
