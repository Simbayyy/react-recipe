import { useEffect, useState, useRef } from "react";
import { RecipeType } from "../functions/types";
import { RecipeAdderCard, RecipeCard } from "./RecipeCard";
import { Outlet, useOutlet } from "react-router-dom";
import React from "react";
import {Loading, Arrow} from './Icons'

const Carousel: React.FunctionComponent<{
  data:{
    recipe: RecipeType;
    index: number;
  }[],
  name:string
}> = ({
  data,
  name
}): React.ReactElement => {
  const [activeCard, setActiveCard] = useState(0)
  const [numItems, setNumItems] = useState(5);
  const activeRef = useRef<null | HTMLAnchorElement >(null)
  
  const width = window.innerWidth;
  useEffect(() => {
      if (width > 700) {
          setNumItems(5);
      } else {
          setNumItems(2);
      }
  }, [width]) 

  useEffect(() => {
    if (activeRef.current) {
      activeRef.current.scrollIntoView({
        behavior: 'smooth',
        block: 'nearest',
        inline: 'start'
      });
    }
  }, [activeCard]) 

  const maxCard = data.length + 1

  const recipeAdder = (index:number) => <RecipeAdderCard index={index} ref={index === activeCard ? activeRef : null}/>

  return <div className={`carousel__${name}`}>
    <button onClick={() => setActiveCard((activeCard - 1 + maxCard) % (maxCard))} className={`carousel__${name}__button`}>
      <Arrow className="carousel__button__arrow flipped"/>
    </button>
    <div className={`carousel__${name}__content`}>
      {recipeAdder(0)}
      {data
        .map((card)=>{
          return <RecipeCard recipe={card.recipe} index={card.index + 1} ref={card.index + 1 === activeCard ? activeRef : null}/>
        })
        .concat(maxCard > 1 ? [recipeAdder(maxCard)] : [])
        .concat(
          data.slice(0,numItems)
          .map((card)=>{
            return <RecipeCard recipe={card.recipe} index={card.index + 1 + numItems} ref={null}/>
      }))}
    </div>
    <button onClick={() => setActiveCard((activeCard + 1) % (maxCard))} className={`carousel__${name}__button`}>
      <Arrow className="carousel__button__arrow"/>
    </button>
  </div>
}

const RecipeList: React.FunctionComponent = (): React.ReactElement => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  const outlet = useOutlet();
  const placeholder = (
    <div className="content__recipes__recipe">
      Clique sur une recette pour en voir les détails
    </div>
  );

  useEffect(() => {
    fetch(
      `${
        import.meta.env.VITE_DOMAIN != "build" ? "http://localhost:3000" : ""
      }/api/recipes`,
    )
      .then((res) => res.json())
      .then((res) => {
        setData(res);
        setLoading(false)
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
        setLoading(false)
      });
  }, []); // Empty dependency array ensures this effect runs only once on mount
  function prepRecipes(data: null | { recipes: RecipeType[] }) {
    if (data) {
      const dataComponents = data.recipes
        .filter((elt) => {
          return elt.name != "";
        })
        .map((element, index) => {
          return { recipe: element, index: index };
        });
      return dataComponents;
    } else {
      return [];
    }
  }
  return (
    <div className="content">
      {(loading && <Loading className="content__loading"/>) || [<Carousel data={prepRecipes(data)} name={"recipes"}/>,
      (outlet && <Outlet context={data} />) || placeholder]}
    </div>
  );
};

export { RecipeList };
