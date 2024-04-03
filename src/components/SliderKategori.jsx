import React, { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import { Pagination } from "swiper/modules";
import Skeleton from "./Skeleton";
import Link from "next/link";

function App() {
  const [categories, setCategories] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch("https://www.themealdb.com/api/json/v1/1/categories.php");
        const data = await response.json();
        setCategories(data.categories);
        setIsLoading(false);
      } catch (error) {
        console.error("Terjadi kesalahan:", error);
        setIsLoading(false);
      }
    };

    fetchCategories();
  }, []);

  return (
    <div className='swiper'>
      {isLoading && (
        <div className='mySwiper mt-3 grid grid-cols-3 gap-2'>
          <Skeleton h={"h-32"} text1={false} text2={true} content={"flex justify-center items-center mx-auto"} card={3} />
        </div>
      )}
      <div className='swiper-wrapper '>
        <Swiper
          pagination={{
            dynamicBullets: true
          }}
          modules={[Pagination]}
          breakpoints={{
            320: {
              slidesPerView: 2,
              spaceBetween: 20
            },
            640: {
              slidesPerView: 2,
              spaceBetween: 20
            },
            768: {
              slidesPerView: 3,
              spaceBetween: 30
            },
            1024: {
              slidesPerView: 4,
              spaceBetween: 40
            }
          }}
          spaceBetween={10}
          className='mySwiper mt-3 md:mt-7'
        >
          {categories.map((category) => (
            <SwiperSlide key={category.idCategory} className='cursor-pointer '>
              <Link href={`/kategori/${category.strCategory}`}>
                <img src={category.strCategoryThumb} alt={category.strCategory} className='rounded-xl h-30 w-full' />
                <h3 className='flex justify-center items-center text-sm md:text-base font-bold md:font-extrabold mt-2'>{category.strCategory}</h3>
              </Link>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
}

export default App;
