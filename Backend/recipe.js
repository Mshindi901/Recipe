/* eslint-disable no-undef */
import dotenv from 'dotenv'
dotenv.config()

const apiKey = process.env.API_KEY


const searchRecipe = async (searchTerm, Page ) =>{

    if(!apiKey) {
        throw new Error('Wrong api Key')
    }
    const baseUrl = `https://api.spoonacular.com/recipes/complexSearch`
    const url = new URL(baseUrl)

    const queryParams = {
        apiKey,
        query: searchTerm,
        number: "20",
        offset: (Page *10).toString(),
        addRecipeInstructions: true,
        fillIngredients: true,
    }

    url.search = new URLSearchParams(queryParams).toString()

    try {
        const results= await fetch(url)

        if(!results.ok){
            throw new Error(`Api Error ${results.status} ${results.statusText}`)
        }
        const data = await results.json()
        //for recipes
        const recipeIds = data.results.map(recipe => recipe.id)
        const recipedetails = await Promise.all(
            recipeIds.map(async (id) => {
                const recipes = `https://api.spoonacular.com/recipes/${id}/information?apiKey=${apiKey}`
                try {
                    const recipeResults = await fetch(recipes)
                    const recipeData = await recipeResults.json()
                    return recipeData
                } catch (error) {
                    console.log(error)
                }
            })
        )


        return {
            searchResults: data,
            recipeDetails: recipedetails.filter(details => details !== null)
        }
    } catch (error) {
        console.log(error.message)
    }
}

export default searchRecipe