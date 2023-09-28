import { Link } from "react-router-dom";
import { RecipeSchema } from "../functions/types";
import React, {forwardRef, MutableRefObject, useState, useEffect} from "react";
import * as td from 'tinyduration'
import {Time, TimeUnit, reduce_time_object, units} from '../functions/time_parsing'

const RecipeAdderCard = forwardRef<HTMLAnchorElement,{
    index: number;
    fetchRecipe: Function
    ref?: MutableRefObject<HTMLAnchorElement | null>;
    active?: boolean
  }>( ({ index, fetchRecipe, active }, ref): React.ReactElement => {
    const [url, setUrl] = useState("")

    const handleUrlChange = (e: React.SyntheticEvent) => {
        const target = e.target as HTMLInputElement;
        setUrl(target.value);
      };

  return (
    <a
      key={index}
      className={`content__recipes__card ${active ? "" : "content__inactive__sender"}`}
      ref={ref}
    >
      <textarea 
        className="content__recipe__card__name recipe__adder" 
        placeholder="Entre une URL ici"
        id="email"
        name="email"
        value={url}
        onChange={handleUrlChange}
        />
      <button 
        onClick={() => {active ? fetchRecipe(url).then((_:any) => {setUrl("")}) : ""}} 
        className="recipe__adder__sender"
        >
            Chercher
        </button>
    </a>
  );
});

const RecipeCard = forwardRef<HTMLAnchorElement,{
    recipe: RecipeSchema;
    index: number;
    ref?: MutableRefObject<HTMLAnchorElement | null>;
  }>( ({ recipe, index }, ref): React.ReactElement => {

    const [reducedTime, setReducedTime] = useState<Time>({
        mainTime: null,
        mainUnit: null,
        secondaryTime: null,
        secondaryUnit: null,        
    })
    useEffect(() => {
        const totalTimeObject = td.parse(recipe?.totalTime ?? "")
        setReducedTime(reduce_time_object(totalTimeObject)) 
    }, [])

  return (
    <Link
      to={`${recipe.id}` || "."}
      key={index}
      className="content__recipes__card"
      ref={ref}
    >
      <div className="content__recipe__card__name">{recipe.name}</div>
      <div>
        {(recipe.recipeIngredient || []).length} ingrédient
        {(recipe.recipeIngredient || []).length > 1 ? "s" : ""}
      </div>
      <div>{`${reducedTime.mainTime} ${units[reducedTime.mainUnit ?? "none"]} ${reducedTime.secondaryTime ? `${reducedTime.secondaryTime} ${units[reducedTime.secondaryUnit ?? "none"]}` : ""}`}</div>
    </Link>
  );
});

export { RecipeCard, RecipeAdderCard };
