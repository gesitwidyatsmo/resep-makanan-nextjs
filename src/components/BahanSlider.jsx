import React, { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import { Pagination } from "swiper/modules";
import Skeleton from "./Skeleton";
import Link from "next/link";

const BahanSlider = () => {``
  const [Bahans, setBahans] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchBahans = async () => {
      try {
        const response = await fetch("https://www.themealdb.com/api/json/v1/1/list.php?i=list");
        const data = await response.json();

        setBahans(data.meals);
        setIsLoading(false);
      } catch (error) {
        console.error("Terjadi kesalahan:", error);
        setIsLoading(false);
      }
    };

    fetchBahans();
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
          className='mySwiper mt-3 '
        >
          {Bahans.slice(0, 10).map((bahan) => (
            <SwiperSlide key={bahan.idIngredient}>
              <Link href={`/bahan-bahan/${bahan.strIngredient}`}>
                <img src={`https://www.themealdb.com/images/ingredients/${bahan.strIngredient}.png`} alt={bahan.strIngredient} className='flex justify-center items-center mx-auto' />
                <h3 className='flex justify-center items-center text-sm font-bold mt-2'>{bahan.strIngredient}</h3>
              </Link>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
};

export default BahanSlider;
