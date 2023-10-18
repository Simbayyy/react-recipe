import { useParams, useOutletContext, useNavigate, useLocation } from "react-router-dom";
import {
  Ingredient as IngredientType,
  Nutrient,
  RecipeSchema,
  nutrientList,
} from "../functions/types";
import { Ingredient } from "./Ingredient";
import React, { useEffect, useState } from "react";
import * as td from "tinyduration";
import {
  Time,
  display_time_string,
  parseAndSetTime,
  defaultTimeObject,
} from "../functions/time_parsing";
import { CookTime, Loading, PrepTime, TotalTime } from "./Icons";
import { getConversionFactor } from "../functions/unit_conversion";
import { Toggle } from "./Toggle";
import { parsePortion } from "../functions/portion_parsing";
import { nonNullIngredient } from "../functions/functions";

const Recipe: React.FunctionComponent<
  Record<string, never>
> = (): React.ReactElement => {
  const [reducedTotalTime, setReducedTotalTime] =
    useState<Time>(defaultTimeObject);
  const [reducedCookTime, setReducedCookTime] =
    useState<Time>(defaultTimeObject);
  const [reducedPrepTime, setReducedPrepTime] =
    useState<Time>(defaultTimeObject);
  const [faultyToggle, setFaultyToggle] =
    useState<boolean>(false);
  const [portionToggle, setPortionToggle] =
    useState<boolean>(false);
  const [recipePortions, setRecipePortions] =
    useState<number>(1);
  const [addedIngredients, setAddedIngredients] =
    useState<number>(0);
  const [isSaving, setIsSaving] =
    useState<boolean>(false);
  const [name, setName] =
    useState<string>("");
  const [minutesPrep, setMinutesPrep] =
    useState<number>(0)
  const [minutesCook, setMinutesCook] =
    useState<number>(0)

  const { recipeId } = useParams();
  const data: null | { recipes: RecipeSchema[] } = useOutletContext();

  let recipe =
    data?.recipes.find((elt) => {
      return elt.id == recipeId;
    }) || undefined;

  const navigate = useNavigate()
  const location = useLocation()

  
  const handleNameChange = (e: React.SyntheticEvent) => {
    const target = e.target as HTMLInputElement;
    let newName = target.value.replace(/\n/, "") 
    setName(newName)
    if (recipe !== undefined) {recipe.name = newName}
  };
  
  const handlePortionChange = (e: React.SyntheticEvent) => {
    const target = e.target as HTMLInputElement;
    setRecipePortions(Number(target.value.replace(/\D/g, "")));
    if (recipe !== undefined) {recipe.recipeYield = target.value.replace(/\D/g, "")}
  };

  const handlePrepTimeChange = (e: React.SyntheticEvent) => {
    const target = e.target as HTMLInputElement;
    if (recipe !== undefined) {recipe.prepTime = `PT${Number(target.value.replace(/\D/g, ""))}M`}
    if (recipe !== undefined) {recipe.totalTime = `PT${(Number(target.value.replace(/\D/g, "")) + minutesCook) ?? 0}M`}    
    setMinutesPrep(Number(target.value.replace(/\D/g, "")));
  }

  const handleCookTimeChange = (e: React.SyntheticEvent) => {
    const target = e.target as HTMLInputElement;
    if (recipe !== undefined) {recipe.cookTime = `PT${Number(target.value.replace(/\D/g, ""))}M`}
    if (recipe !== undefined) {recipe.totalTime = `PT${(minutesPrep + Number(target.value.replace(/\D/g, ""))) ?? 0}M`}   
    setMinutesCook(Number(target.value.replace(/\D/g, "")));
  }

  useEffect(() => {
    recipe =
      data?.recipes.find((elt) => {
        return elt.id == recipeId;
      }) || undefined;
    setName(recipe !== undefined ? recipe.name : "")
    setRecipePortions(parsePortion(recipe))
    if (recipe === undefined) {navigate("/recipes")}
    else if (recipeId === '0') {navigate('/recipes/0/edit')}

    parseAndSetTime(recipe, "totalTime", setReducedTotalTime);
    parseAndSetTime(recipe, "prepTime", setReducedPrepTime);
    parseAndSetTime(recipe, "cookTime", setReducedCookTime);
  }, [recipeId]);


  function renderIngredients() {
    if (recipe) {recipe.recipeIngredient = recipe?.recipeIngredient?.filter((elt) => {return isEdit || nonNullIngredient(elt)}) }
    const ingredientComponents = recipe?.recipeIngredient?.map((ingredient, index) => {
      return <Ingredient key={`${ingredient.name}_${ingredient.amount}_${index}`} isSaving={isSaving} ingredient={ingredient}/>;
    });
    return (
      <div className="recipe__ingredients">
        <div className="recipe__section__title">Ingrédients</div>
        {ingredientComponents}
        
        {isEdit && <button 
          key={"addbutton"} 
          className={"ingredient__adder__button"}
          onClick={() => {
          recipe?.recipeIngredient?.push({
            amount:0,
            unit:"",
            name:"",
          })
          setAddedIngredients(addedIngredients+1)
        }}> +</button>}
      </div>
    );
  }

  let isEdit = location.pathname.match(/edit/)

  function renderNutrition(
    ingredients: IngredientType[],
    nutrients: Nutrient[],
  ) {
    if (isEdit) {
      return <div></div>
    }
    const nonNullIngredients = ingredients.filter((elt) => {
      return elt.amount !== 0 && elt.name !== ""
    }) 
    const nutrientComponents = nutrients.map((elt) => {
      return {
        name: elt.display_name,
        unit: elt.unit,
        value: Number(
          (
            nonNullIngredients
              .filter((ingredient) => {
                return faultyToggle ? ingredient.high_confidence === true : true
              })
              .map((ingredient) => {
                return (
                  (((ingredient[elt.name] ?? 0) *
                    Number(ingredient.amount) *
                    getConversionFactor(ingredient.unit, ingredient.name_en ?? "")) /
                  10000) / (portionToggle ? recipePortions : 1)
                );
              })
              .reduce((a, b) => {
                return a + b;
              }, 0) / 1000
          ).toPrecision(2),
        ),
      };
    });
    const nutritionComponents = nutrientComponents.map((elt) => {
      return (
        <div key={elt.name} className="recipe__nutrition__item">
          <div className="recipe__nutrient__name">{`${elt.name}`}</div>
          <div className="recipe__nutrient__quantity">
            &nbsp;{`: ${elt.value} ${elt.unit}`}
          </div>
        </div>
      );
    });
    return (
      <div className="recipe__nutrition">
        <div className="recipe__section__title">Nutriments</div>
        {nutritionComponents}
      </div>
    );
  }

  function save() {
    setIsSaving(true)
    fetch(
      `${
        import.meta.env.VITE_DOMAIN != "build" ? "http://localhost:3000" : ""
      }/api/edit`,
      {
        body: JSON.stringify({ recipe: recipe }),
        method: "POST",
        headers: { "Content-Type": "application/json" },  
      }
    )
      .then((res) => {
        if (res.status === 200) {
          return res.json()
        } else {
          throw Error("Could not edit recipe")
        }
      })
      .then((res) => {
        let newData = data || {recipes:[]}
        newData.recipes.push(res)
        if ('originalId' in res && typeof res.originalId == 'number') {
              newData.recipes = newData.recipes.filter((elt) => {
                return elt.id !== res.originalId && elt.id !== 0
              } )
        } else {
          newData.recipes = newData.recipes.filter((elt) => {
            return elt.id !== 0
          } )
        }
        setIsSaving(false)
        navigate(`/recipes/${res.id}`)
      })
      .catch(() => {
        setIsSaving(false);
      })
      .finally(() => {
        navigate(".")
      });
  }

  function displayRecipe(recipe: undefined | RecipeSchema) {
    if (recipe) {
      return (
        <div className="content__recipes__recipe">
          {
            isEdit 
            ? <textarea 
            className="content__recipes__recipe__title recipe__edit "
            value={name}
            disabled={isSaving}
            onChange={handleNameChange}
            />
            : <div className="content__recipes__recipe__title">{recipe.name}</div>
          }
          {recipe.url !== 'custom' && <a
            href={recipe.url}
            target="_blank"
            rel="noreferrer"
            className="content__recipes__recipe__link"
          >
            {recipe.url}
          </a>}
          {
            isEdit
            ? <div className="content__recipes__recipe__portions">Cette recette donne 
            <input 
              className="content__recipes__recipe__portions__edit"
              value={recipePortions}
              type="number"
              disabled={isSaving}
              onChange={handlePortionChange}              
              />
             parts</div>
            : <div className="content__recipes__recipe__portions">{recipePortions !== 1 ? `Cette recette donne ${recipePortions} parts` : ""}</div>}
          <div className="content__recipes__recipe__summary">
            { !isEdit 
            ? [reducedPrepTime.mainTime !== null &&
                <PrepTime
                  key="preptime"
                  className="recipe__preptime__icon time__icon"
                  text={display_time_string(reducedPrepTime, true)}
                />
              ,
              reducedCookTime.mainTime !== null &&
                <CookTime
                  key="cooktime"
                  className="recipe__cooktime__icon time__icon"
                  text={display_time_string(reducedCookTime, true)}
                />
              ,
              reducedTotalTime.mainTime !== null &&
                <TotalTime
                  key="totaltime"
                  className="recipe__totaltime__icon time__icon"
                  text={display_time_string(reducedTotalTime, true)}
                />
              ]
            : [ <div className="recipe__time__selector__wrapper">
                  <div className="time__edit__title">Temps de préparation</div>
                  <div className="recipe__time__edit__minute">
                    <input 
                      type="number"
                      className="recipe__time__selector"
                      onChange={handlePrepTimeChange}
                      value={minutesPrep}
                      />
                    <span>&nbsp;minutes</span>
                    </div>
                </div>,
                <div className="recipe__time__selector__wrapper" >
                  <div className="time__edit__title">Temps de cuisson</div>
                  <div className="recipe__time__edit__minute">
                    <input 
                      type="number"
                      className="recipe__time__selector"
                      onChange={handleCookTimeChange}
                      value={minutesCook}
                      />
                    <span>&nbsp;minutes</span>
                  </div>
                </div>,
                <div className="recipe__time__selector__wrapper" >
                  <div className="time__edit__title">Temps total</div>
                  <div>{`${(recipe.totalTime !== "" && recipe.totalTime !== undefined ? recipe.totalTime : "0").replace(/\D/g, "")} min`}</div>
                </div>,
                ]
            }
          </div>
          <div className="recipe__toggles">
          <Toggle 
              className="recipe__toggles__faulty" 
              toggled={faultyToggle}
              setToggled={setFaultyToggle}
              text={"Ignorer les ingrédients aux données incertaines"}
            />
            {recipePortions !== 1 && <Toggle 
              className="recipe__toggles__portions" 
              toggled={portionToggle}
              setToggled={setPortionToggle}
              text={"Afficher la nutrition par portion du plat"}
            />}
            {isEdit
            ? <button 
                className={`content__recipes__recipe__button edit__button__save ${isSaving ? "edit__button__is__saving" : ""}`} 
                onClick={save}
                >
                {isSaving ? <Loading className="edit__button__loading"/> : "Enregistrer"}
              </button>
            : <button 
                className="content__recipes__recipe__button" 
                onClick={() => {navigate("edit")}}
                >
                Modifier
              </button>}

          </div>
          <div className={`recipe__content__lists ${faultyToggle ? 'faulty__toggle' : ''}`}>
            {renderIngredients()}
            {renderNutrition(
              recipe.recipeIngredient || [],
              nutrientList,
            )}
          </div>
        </div>
      );
    } else {
      return (
        <div className="content__recipes__recipe">
          Recipe {recipeId} loading...{" "}
        </div>
      );
    }
  }

  return displayRecipe(recipe);
};

export { Recipe };
