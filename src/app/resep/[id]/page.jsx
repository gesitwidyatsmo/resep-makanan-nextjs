"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const RecipeDetailPage = ({ params: { id } }) => {
  const [recipe, setRecipe] = useState(null);
  const [recomen, setRecomen] = useState(null);
  const [recomenCateg, setRecomenCateg] = useState(null);

  useEffect(() => {
    document.body.style = "auto";
    const fetchRecipe = async () => {
      const response = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`);
      const data = await response.json();
      setRecipe(data.meals[0]);

      const fetchedRecipes = [];
      while (fetchedRecipes.length < 2) {
        const response = await fetch("https://www.themealdb.com/api/json/v1/1/random.php");
        const data = await response.json();
        const newRecipe = data.meals[0];

        const isDuplicate = fetchedRecipes.some((recipe) => recipe.idMeal === newRecipe.idMeal);

        if (!isDuplicate) {
          fetchedRecipes.push(newRecipe);
        }
      }
      setRecomen(fetchedRecipes);

      const responseCateg = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${data.meals[0].strCategory}`);
      const dataCateg = await responseCateg.json();
      setRecomenCateg(dataCateg.meals);
    };

    fetchRecipe();
  }, [id]);

  console.log(recipe);
  return (
    <>
      <Header />
      <div className='py-10 px-4 md:px-16 xl:px-36 mx-auto md:flex gap-3'>
        <div className='w-full md:w-2/3'>
          {recipe ? (
            <div>
              <div className=''>
                <h1 className='text-2xl font-bold '>{recipe.strMeal}</h1>
                <h2>
                  From <span className='text-primary font-semibold'>{recipe.strArea}</span>
                </h2>
                <h2>
                  Kategori <span className='text-primary font-semibold'>{recipe.strCategory}</span>
                </h2>
                <div className='p-10 '>
                  <img src={recipe.strMealThumb} alt={recipe.strMeal} className='w-full h-full object-cover rounded-2xl' />
                </div>
              </div>

              <div className='mt-4'>
                <h2 className='text-xl font-bold'>Ingredients</h2>
                <div className='grid md:grid-cols-2 mt-3'>
                  {Object.keys(recipe)
                    .filter((key) => key.startsWith("strIngredient") && recipe[key] !== "" && recipe[key] !== null)
                    .map((key, index) => (
                      <div key={index} className='flex justify-start items-center gap-3 mb-3'>
                        <img src={`https://www.themealdb.com/images/ingredients/${recipe[key]}-Small.png`} alt={recipe.strIngredient} />
                        <div>
                          <h2 className=''>{recipe[key]}</h2>
                          <p className='text-secondary font-semibold'>{recipe[`strMeasure${key.slice(-1)}`]}</p>
                        </div>
                      </div>
                    ))}
                </div>
              </div>
              <div className='mt-4'>
                <h2 className='text-xl font-bold'>Instructions</h2>
                <ol className='list-decimal ml-6 mt-4'>
                  {recipe.strInstructions
                    .split("\r\n\r\n")
                    .filter((instruction) => instruction.trim() !== "")
                    .map((instruction, index) => (
                      <li key={index} className='mb-2 text-justify'>
                        {instruction}
                      </li>
                    ))}
                </ol>
              </div>
            </div>
          ) : (
            <p>Loading...</p>
          )}
          <div>
            {recipe && recipe.strYoutube && (
              <div className='mt-6'>
                <h2 className='text-xl font-bold'>Video Tutorial</h2>
                <div className=' mt-4'>
                  <iframe
                    className='w-full aspect-video'
                    src={`https://www.youtube.com/embed/${recipe.strYoutube.split("v=")[1]}`}
                    title='YouTube video player'
                    frameBorder='0'
                    allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture'
                    allowFullScreen
                  ></iframe>
                </div>
              </div>
            )}
          </div>
        </div>
        <div>
          <div className='bg-primary w-full h-1 rounded-full mt-6 md:hidden'></div>
          <div className='bg-secondary w-[1px] h-full rounded-full mt-6 hidden md:block'></div>
        </div>
        <div className='w-full md:w-1/3 my-6 md:ml-5'>
          <div>
            <h1 className='text-xl font-bold'>Rekomendasi Resep</h1>
            {recomen ? (
              <div className=''>
                {recomen.map((recipe, i) => (
                  <div key={i} className='flex md:flex-col md:justify-center md:items-center md:text-center mx-auto lg:flex-row lg:justify-normal lg:items-start  lg:text-start  mt-3 gap-3'>
                    <img src={recipe.strMealThumb} alt={recipe.strMeal} className='w-52 md:w-40 h-52 md:h-40 object-cover rounded-xl mb-3' />
                    <div>
                      <h3 className='text-lg font-bold line-clamp-2'>{recipe.strMeal}</h3>
                      <h3>From {recipe.strArea}</h3>
                      <h3>Kategori {recipe.strCategory}</h3>
                      <Link href={`/resep/${recipe.idMeal}`}>
                        <button className='mt-5 py-2 px-4 bg-primary rounded-full text-white text-sm'>Lihat Resep</button>
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p>Loading...</p>
            )}
          </div>
          <div className='mt-4'>
            <h1 className='text-xl font-bold'>Resep Serupa</h1>
            {recomenCateg ? (
              <div className='grid grid-cols-2 md:grid-cols-1 lg:grid-cols-2 my-auto gap-3 mt-4'>
                {recomenCateg.slice(0, 2).map((recipe, i) => (
                  <div key={i} className='md:flex lg:flex-none md:flex-col md:mt-4 md:justify-center lg:justify-normal md:items-center '>
                    <img src={recipe.strMealThumb} alt={recipe.strMeal} className='w-52 md:w-40 h-52 md:h-40 object-cover rounded-xl ' />
                    <h3 className='text-center mt-1 line-clamp-1'>{recipe.strMeal}</h3>
                    <Link href={`/resep/${recipe.idMeal}`}>
                      <button className='mt-1 py-2 px-4 bg-primary rounded-full text-white text-sm flex justify-center items-center mx-auto'>Lihat Resep</button>
                    </Link>
                  </div>
                ))}
              </div>
            ) : (
              <p>Loading...</p>
            )}
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default RecipeDetailPage;
