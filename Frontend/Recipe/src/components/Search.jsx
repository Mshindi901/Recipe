import { useState } from "react";

function Search(){
    const [textdisplay,  settextdisplay] = useState(true)
    const [mealname, setmealname] = useState("")
    const [datalist, setdatalist] = useState([])
    const [recipelist, setrecipelist] = useState([])
    const [selectedRecipe, setselectedRecipe] = useState(null)
    const handleSearchSubmit = async (e) => {
        e.preventDefault();
        settextdisplay(false)
        const apiURL = `/api/search?meal=${mealname}`
        console.log(apiURL)
        
        try {
            const response = await fetch(apiURL)
            if(!response.ok){
                throw new Error("Failed to fetch results")
            }
            console.log(response)
            const data = await response.json()
            console.log(data)
            setdatalist(data.searchResults.results || [])
            setrecipelist(data.recipeDetails || [])
        } catch (error) {
            console.log(error)
        }
    }
    return(
        <>
            <div className="w-screen h-fit p-6 border-b rounded-2xl border-red-500">
                <form action="" method="post" onSubmit={handleSearchSubmit} className="flex md:flex-row flex-col justify-center p-4 gap-2">
                    <input type="text" name="" id="" placeholder="Enter meal name" value={mealname} onChange={(e) => setmealname(e.target.value)} className="md:w-3/4 w-full py-3 rounded-xl border border-black text-black"/>
                    <input type="submit" value="Search" className="w-max h-max px-12 py-2 rounded-lg bg-red-500 text-white text-xl" />
                </form>
                {
                    textdisplay&&
                    <div className="flex justify-center items-center">
                        <h1 className="text-3xl text-yellow-700">
                            Search your favorite meals Here and Get Cooking!
                        </h1>
                    </div>
                }
                <div className="grid grid-cols-1 md:grid-cols-4 lg:grid-cols-5 gap-4 p-4 ">
                    {
                        Array.isArray(datalist) ? (datalist.map((recipe, index) => (
                            <div key={index} className="flex flex-col p-4 rounded-lg shadow-xl bg-none border-white" onClick={() => setselectedRecipe(recipe)}>
                                <img src={recipe.image} className="rounded-xl object-cover"/>
                                <p className="text-xl text-yellow-700">{recipe.title}</p>
                            </div>
                        ))):(
                            <p>No Images available</p>
                        )
                    }

                    {
                        selectedRecipe &&(
                            <div className=" fixed inset-0 w-screen h-screen bg-slate bg-opacity-50 flex justify-center items-center p-4">
                                <div className="md:w-2/3 w-full h-fit flex flex-col rounded-xl bg-white p-6 shadow-2xl my-4 overflow-y-auto">
                                    <h2 className="text-3xl text-red-500">{selectedRecipe.title}</h2>
                                    <p className="text-2xl text-center text-red-500">Ingredients</p>
                                    <ul className="flex flex-col gap-4">
                                        {recipelist.length > 0 &&
                                            recipelist
                                                .filter(recipe => recipe.id === selectedRecipe.id)
                                                .flatMap(recipe => recipe.extendedIngredients)
                                                .map((ingredient, idx) =>(
                                                    <li key={idx}>{ingredient.name}</li>
                                                ))
                                        }
                                    </ul>

                                    <p className="text-2xl text-black text-center">Steps</p>
                                    <ol className="flex flex-col">
                                        {recipelist.length > 0 &&
                                            recipelist
                                                ?.filter(recipe => recipe.id === selectedRecipe.id)
                                                ?.flatMap(recipe => recipe.analyzedInstructions)
                                                ?.flatMap(instruction => instruction.steps)
                                                .map((step, idx) =>(
                                                    <li key={idx}>{step.step}</li>
                                                ))
                                        }
                                    </ol>

                                </div>
                            </div>
                        )
                    }
                </div>

            </div>
        </>
    )
}
export default Search;