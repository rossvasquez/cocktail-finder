import { useState, useEffect } from 'react'
import './App.css'
import artDecoBar from './assets/artDecoBar.png'

function App() {
  const [Data, setData] = useState(null)
  const [Ingredients, setIngredients] = useState(null)
  const [Measurments, setMeasurments] = useState(null)

  useEffect(() => {
    const getCocktail = async () => {
      const response = await fetch("https://cocktail.ross-vasquez-17.workers.dev/")
      const jsonData = await response.json();
      setData(jsonData);
      let count = 1
      let ingredients = []
      while(count<16){
        const ingredientProperty = `strIngredient${count}`;
        if (jsonData.drinks[0][ingredientProperty] == null || jsonData.drinks[0][ingredientProperty] == ''){

        } else {
          ingredients.push({
            "ingredient": jsonData.drinks[0][ingredientProperty],
            "amount": ''
          })
        }
        count++ 
      }
      count = 1
      let arrCount = 0
      while(count<16){
        const measurementProperty = `strMeasure${count}`;
        if (jsonData.drinks[0][measurementProperty] == null || jsonData.drinks[0][measurementProperty] == ''){

        } else {
          ingredients[arrCount].amount = (jsonData.drinks[0][measurementProperty])
          arrCount++
        }
        count++ 
      }
      setIngredients(ingredients)
    }
    getCocktail()
  }, [])

  const DrinkContent = () =>
  <div className='flex flex-col md:flex-row'>
  <img className='rounded-md border-4 border-slate-600 h-1/4 md:h-80' src={Data.drinks[0].strDrinkThumb} />
  <div className='ml-0 md:ml-6 mt-4 md:mt-0'>
  <p className='w-full pl-2 text-3xl text-white font-semibold capitalize'>{Data.drinks[0].strDrink}</p>
  <p className='w-full pl-2 text-xl text-slate-600'>{Data.drinks[0].strCategory}</p>
  <p className='w-full pl-2 text-xl text-white font-light mt-1'>{Data.drinks[0].strInstructions}</p>
  <a href={Data.drinks[0].strVideo} target='_blank' className={`w-full pl-2 text-xl text-slate-600 hover:cursor-pointer hover:text-slate-500 font-light underline ${Data.drinks[0].strVideo == null ? 'hidden' : null}`}>Video</a>
  <p className='w-full pl-2 text-2xl text-white font-semibold mt-4'>Ingredients</p>
  <p className='w-full pl-2 text-xl text-white font-light mb-1 capitalize'>{Data.drinks[0].strGlass}</p>
  {Ingredients.map((item, i) =>
  <p className='pl-2 text-neutral-50 text-xl capitalize'><span className='text-slate-600 font-light'>‣</span> {item.amount} {item.ingredient}</p>
  )}
  </div>
  </div>

  const Loading = () =>
  <p className='text-white text-3xl animate-pulse'>Loading...</p>

  return (
    <div className='relative h-auto'>
    <div className='flex justify-center items-center py-6 px-2'>
      <div className={`flex justify-center items-center bg-slate-400 w-screen max-w-4xl rounded-md mx-auto p-6 shadow-lg text-2xl ${Data == null ? 'h-[20rem]' : 'h-auto'}`}>
        {Data == null ? <Loading /> : <DrinkContent /> }
      </div>
    </div>
    </div>
  )
}

export default App
