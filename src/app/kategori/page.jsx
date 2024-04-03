"use client";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import React, { useEffect, useState } from "react";
import Link from "next/link";

const Kategori = () => {
  const [kategoris, setKategoris] = useState([]);

  useEffect(() => {
    const fetchBahan = async () => {
      const response = await fetch("https://www.themealdb.com/api/json/v1/1/list.php?c=list");
      const data = await response.json();
      setKategoris(data.meals);
    };

    fetchBahan();
  }, []);

  return (
    <>
      <Header />
      <div className='py-10 px-4 md:px-16 xl:px-36'>
        <div className='flex flex-col justify-center items-center text-center'>
          <h1 className='text-black text-2xl md:text-3xl font-extrabold leading-7 xl:w-[90%] xl:leading-[55px] xl:text-5xl'>Kategori</h1>
          <p className='text-zinc-500 text-xs xl:text-base font-medium mt-2 md:mt-3 md:w-[90%] '>
            Jelajahi ragam kategori kuliner terbaik, tempat di mana kelezatan bertemu keberagaman. Dari daging sapi yang gurih hingga ayam yang lembut, setiap hidangan di kategori ini menghadirkan
            kombinasi unik dari cita rasa dan tekstur.
          </p>
        </div>
        <div className='grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-5 my-5'>
          {kategoris.map((kategori, i) => (
            <Link key={i} href={`/kategori/${kategori.strCategory}`}>
              <div className='flex flex-col justify-center items-center cursor-pointer'>
                <img src={`https://www.themealdb.com/images/category/${kategori.strCategory}.png`} alt={kategori.strCategory} className='flex justify-center items-center mx-auto rounded-xl' />
                <h2 className='mt-3'>{kategori.strCategory}</h2>
              </div>
            </Link>
          ))}
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Kategori;
