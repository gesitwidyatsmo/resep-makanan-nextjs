"use client";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import Link from "next/link";
import React, { useEffect, useState } from "react";

const Search = ({ params: { keyword } }) => {
  const searchValue = decodeURIComponent(keyword);
  const [searchResult, setSearchResult] = useState([]);

  useEffect(() => {
    document.body.style = "auto";
    const fetchData = async () => {
      const response = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${searchValue}`);
      const data = await response.json();
      setSearchResult(data.meals || []);
    };
    fetchData();
  }, [searchValue]);

  console.log(searchResult);

  return (
    <div>
      <Header />
      <div className='py-10 px-4 md:px-16 xl:px-36'>
        <h1 className='text-black text-xl md:text-xl font-extrabold xl:text-xl'>
          Hasil Pencarian dari <span className='text-secondary'>&quot;{searchValue}&quot;</span>
        </h1>
        <div className='grid grid-cols-2 sm:grid-cols-3 gap-5 mt-3 md:mt-5'>
          {searchResult.map((meal) => (
            <div key={meal.idMeal} className='flex flex-col justify-start items-center mx-auto'>
              <div className='relative'>
                <img src={meal.strMealThumb} alt={meal.strMeal} className='rounded-lg relative w-48 h-48 md:w-56 md:h-56 lg:w-80 lg:h-80 object-cover' />
              </div>
              <h3 className='text-sm md:text-base font-extrabold mt-3 line-clamp-2 '>{meal.strMeal}</h3>
              <Link href={`/resep/${meal.idMeal}`}>
                <p className='text-sm md:text-base font-normal cursor-pointer mt-1 hover:underline hover:text-primary'>Lihat Resep</p>
              </Link>
            </div>
          ))}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Search;
