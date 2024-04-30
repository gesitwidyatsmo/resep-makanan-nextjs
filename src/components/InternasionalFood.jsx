import React, { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import { Pagination } from "swiper/modules";
import Skeleton from "./Skeleton";
import Link from "next/link";

const InternasionalFood = () => {
  const [negara, setNegara] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchNegara = async () => {
      try {
        const response = await fetch("https://www.themealdb.com/api/json/v1/1/list.php?a=list");
        const data = await response.json();

        const bahansWithImages = data.meals.map((gambar) => ({
          ...gambar,
          imageUrl: `Negara/${gambar.strArea.toLowerCase()}.jpg`
        }));

        setNegara(bahansWithImages);
        setIsLoading(false);
      } catch (error) {
        console.error("Terjadi kesalahan:", error);
      }
    };

    fetchNegara();
  }, []);

  return (
    <div className='swiper'>
      {isLoading && (
        <div className='grid grid-cols-2 gap-2'>
          <Skeleton h={"h-32"} text1={false} text2={false} content={""} card={2} />
        </div>
      )}
      <div className='swiper-wrapper '>
        <Swiper
          pagination={{
            dynamicBullets: true
          }}
          modules={[Pagination]}
          spaceBetween={10}
          breakpoints={{
            320: {
              slidesPerView: 2
            },
            640: {
              slidesPerView: 2
            },
            768: {
              slidesPerView: 3
            },
            1024: {
              slidesPerView: 4
            }
          }}
          className=''
        >
          {negara.slice(0, 10).map((negara, i) => (
            <SwiperSlide key={i} className='relative'>
              <Link href={`/masakan-internasional/${negara.strArea}`}>
                <img src={`/${negara.imageUrl}`} alt={negara.strIngredient} className='flex justify-center items-center rounded-xl mx-auto h-32 md:h-40 lg:h-44 w-full  brightness-50' />
                <div className='absolute bottom-[50%] translate-y-[50%] w-full text-center bg-opacity-75'>
                  <h3 className='text-xl font-bold text-white py-2'>{negara.strArea}</h3>
                </div>
              </Link>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
};

export default InternasionalFood;
