import React, { useState, useEffect } from "react";
import Skeleton from "./Skeleton";
import Link from "next/link";

const CardResep = () => {
  const [recipes, setRecipes] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const numLoaders = 6;

  useEffect(() => {
    const fetchRecipes = async () => {
      try {
        const fetchedRecipes = [];

        while (fetchedRecipes.length < numLoaders) {
          const response = await fetch("https://www.themealdb.com/api/json/v1/1/random.php");
          const data = await response.json();
          const newRecipe = data.meals[0];

          const isDuplicate = fetchedRecipes.some((recipe) => recipe.idMeal === newRecipe.idMeal);

          if (!isDuplicate) {
            fetchedRecipes.push(newRecipe);
          }
        }

        setRecipes(fetchedRecipes);
        setIsLoading(false);
      } catch (error) {
        console.error("Terjadi kesalahan:", error);
        setIsLoading(false);
      }
    };

    fetchRecipes();
  }, []);

  return (
    <div>
      {isLoading && (
        <div className='grid grid-cols-2 sm:grid-cols-3 gap-5 mt-3'>
          <Skeleton h={"h-36 mb-2"} text1={true} text2={true} content={""} card={6} />
        </div>
      )}
      <div className='grid grid-cols-2 sm:grid-cols-3 gap-5 mt-3 md:mt-5'>
        {recipes.map((recipe) => (
          <div key={recipe.idMeal} className='flex flex-col justify-start items-center mx-auto'>
            <div className='relative'>
              <img src={recipe.strMealThumb} alt={recipe.strMeal} className='rounded-lg relative w-48 h-48 md:w-56 md:h-56 lg:w-80 lg:h-80 object-cover' />
              <div className='absolute bottom-1 left-1 lg:bottom-3 lg:left-3'>
                <div className='px-3 py-2 rounded-full font-bold text-xs md:text-sm text-white bg-primary opacity-85'>{recipe.strCategory}</div>
              </div>
            </div>
            <h3 className='text-sm md:text-base font-extrabold mt-3 line-clamp-2 '>{recipe.strMeal}</h3>
            <Link href={`/resep/${recipe.idMeal}`}>
              <p className='text-sm md:text-base font-normal cursor-pointer mt-1 hover:underline hover:text-primary'>Lihat Resep</p>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CardResep;
