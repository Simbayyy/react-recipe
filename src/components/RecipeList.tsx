import { useEffect, useState, useRef } from "react";
import { RecipeSchema } from "../functions/types";
import { RecipeAdderCard, RecipeCard } from "./RecipeCard";
import { Outlet, useOutlet, useNavigate, useParams } from "react-router-dom";
import React from "react";
import { Loading, Arrow } from "./Icons";

const Carousel: React.FunctionComponent<{
  data: {
    recipe: RecipeSchema;
    index: number;
  }[];
  name: string;
  fetching: boolean;
  fetchRecipe: (url: string) => Promise<boolean>;
}> = ({ data, name, fetching, fetchRecipe }): React.ReactElement => {
  const [activeCard, setActiveCard] = useState(0);
  const [numItems, setNumItems] = useState(5);
  const activeRef = useRef<null | HTMLAnchorElement>(null);
  const recipeId = useParams()

  const width = window.innerWidth;
  useEffect(() => {
    if (width > 700) {
      setNumItems(5);
    } else {
      setNumItems(2);
    }
  }, [width]);

  useEffect(() => {
    if (activeRef.current) {
      activeRef.current.scrollIntoView({
        behavior: "smooth",
        block: "nearest",
        inline: "start",
      });
    }
  }, [activeCard]);

  const maxCard = data.length + 1;

  const recipeAdder = (index: number) => (
    <RecipeAdderCard
      index={index}
      key={index}
      fetchRecipe={fetchRecipe}
      active={!fetching}
      ref={index === activeCard ? activeRef : null}
    />
  );

  return (
    <div className={`carousel__${name}`}>
      <button
        onClick={() => setActiveCard((activeCard + 1) % maxCard)}
        className={`carousel__${name}__button`}
      >
        <Arrow className="carousel__button__arrow flipped" />
      </button>
      <div className={`carousel__${name}__content`}>
        {recipeAdder(0)}
        {data
          .map((card) => {
            return (
              <RecipeCard
                key={card.index + 1}
                recipe={card.recipe}
                index={card.index + 1}
                ref={card.index + 1 === activeCard ? activeRef : null}
                extraClass={'recipeId' in recipeId && recipeId.recipeId === (card.recipe.id ?? -1).toString() ? 'content__inactive__sender' : ""}
              />
            );
          })
          .concat(maxCard >= numItems ? [recipeAdder(maxCard)] : [])
          .concat(
            maxCard >= numItems 
            ? data.slice(0, numItems).map((card) => {
                return (
                  <RecipeCard
                    key={card.index + 1 + numItems}
                    recipe={card.recipe}
                    index={card.index + 1 + numItems}
                    ref={null}
                    extraClass={'recipeId' in recipeId && recipeId.recipeId === (card.recipe.id ?? -1).toString() ? 'content__inactive__sender' : ""}
                  />
                );
              })
            : []
          )}
      </div>
      <button
        onClick={() => setActiveCard((activeCard - 1 + maxCard) % maxCard)}
        className={`carousel__${name}__button`}
      >
        <Arrow className="carousel__button__arrow" />
      </button>
    </div>
  );
};

const RecipeList: React.FunctionComponent = (): React.ReactElement => {
  const [data, setData] = useState<null | { recipes: RecipeSchema[] }>(null);
  const [loading, setLoading] = useState(true);
  const [fetching, setFetching] = useState(false);
  const [placeholderText, setPlaceholderText] = useState(
    "Clique sur une recette pour en voir les détails",
  );

  const outlet = useOutlet();
  const placeholder = (
    <div key={1} className="content__recipes__recipe">
      {placeholderText}
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
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
        setLoading(false);
      });
  }, []); // Empty dependency array ensures this effect runs only once on mount
  function prepRecipes(data: null | { recipes: RecipeSchema[] }) {
    if (data) {
      const dataComponents = data.recipes
        .filter((elt) => {
          return elt.name != "";
        })
        .map((element, index) => {
          return { recipe: element, index: index };
        })
        .reverse();
      return dataComponents;
    } else {
      return [];
    }
  }
  const navigate = useNavigate();

  const fetchRecipe = async (url: string) => {
    setFetching(true);
    fetch("/api/parse", {
      body: JSON.stringify({ url: url }),
      method: "POST",
      headers: { "Content-Type": "application/json" },
    })
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          throw Error("Could not fetch recipe");
        }
      })
      .then((response) => {
        setFetching(false);
        if (data === null) {
          setData({ recipes: response });
        } else {
          setData({ recipes: data.recipes.concat([response]) });
        }
        navigate(`/recipes/${response.id}`);
      })
      .catch(() => {
        setFetching(false);
        setPlaceholderText(
          "Une erreur est survenue lors de la recherche de la recette",
        );
        navigate(`/recipes`);
      });
    return true;
  };

  return (
    <div className="content">
      {(loading && <Loading className="content__loading" />) || [
        <Carousel
          key={0}
          data={prepRecipes(data)}
          name={"recipes"}
          fetching={fetching}
          fetchRecipe={fetchRecipe}
        />,
        (outlet && <Outlet key={1} context={data} />) || placeholder,
      ]}
    </div>
  );
};

export { RecipeList };
