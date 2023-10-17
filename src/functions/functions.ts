import { Ingredient } from "./types"

export const nonNullIngredient = (elt:Ingredient) => {
    return elt.amount !== 0 && elt.name !== ""
  }