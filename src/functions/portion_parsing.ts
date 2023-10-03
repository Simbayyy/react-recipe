import { RecipeSchema } from "./types"

export function parsePortion(recipe:RecipeSchema | undefined): number {
    let portions: number = 1
    if (recipe !== undefined) {
        let rePortionNumber: RegExpMatchArray | null = null
        if (typeof recipe.recipeYield === 'string') {
            rePortionNumber = recipe.recipeYield.match(/\d+/)
        } else if (recipe.recipeYield !== undefined) {
            rePortionNumber = recipe.recipeYield[0].match(/\d+/)
        }
        if (rePortionNumber) {
            portions = Number(rePortionNumber[0])
        }
    }
    return portions
}