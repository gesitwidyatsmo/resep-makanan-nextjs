"use client";
import BahanSlider from "@/components/BahanSlider";
import CardResep from "@/components/CardResep";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import ImageHero from "@/components/ImageHero";
import InternasionalFood from "@/components/InternasionalFood";
import SliderKategori from "@/components/SliderKategori";
import Link from "next/link";
import { FaAngleRight } from "react-icons/fa";

function DataBlock({ number, label }) {
  return (
    <div className='flex flex-col justify-center items-center text-center'>
      <div className='text-white text-base md:text-lg font-extrabold'>{number}</div>
      <div className='flex justify-center items-center text-white text-xs font-normal md:w-16 md:flex md:justify-center md:items-center md:text-center md:mt-1'>{label}</div>
    </div>
  );
}
``;
export default function Home() {
  return (
    <main className=''>
      {/* Header */}
      <Header />

      {/* Hero */}
      <section className='px-4 md:px-16 md:py-10 xl:px-36 linear-gradient md:flex md:justify-center items-center text-center'>
        <div className='text-center pt-28 md:pt-10 md:text-start'>
          <h1 className='text-black text-2xl md:text-3xl font-extrabold leading-7 xl:w-[90%] xl:leading-[55px] xl:text-5xl'>Rahasia Rasa yang Tersembunyi dalam Setiap Resep</h1>
          <p className='text-zinc-500 text-xs xl:text-base font-medium mt-6 md:mt-3 md:w-[90%] '>
            Setiap hidangan menyimpan cerita dan rahasia di dalamnya. Rasakan petualangan kuliner yang memikat di setiap resep.
          </p>
          <Link href={"/resep"}>
            <button className='mt-9 md:mt-4 bg-primary text-white text-xs font-medium p-4 rounded-full'>Eksplor Resep</button>
          </Link>
        </div>
        <div className='flex justify-center items-center mt-10 py-4'>
          <ImageHero />
        </div>
      </section>

      {/* Information */}
      <section className='py-10 linear-gradient2'>
        <div className='w-40 h-56 md:w-[420px] md:h-24 bg-secondary rounded-2xl flex flex-col justify-center items-center gap-3.5 mx-auto md:flex-row md:justify-evenly'>
          <DataBlock number='302' label='Total Resep' />
          <div className='w-28 h-px md:w-px md:h-12 border border-white'></div>
          <DataBlock number='575' label='Total Bahan' />
          <div className='w-28 h-px md:w-px md:h-12 border border-white'></div>
          <DataBlock number='33' label='Masakan Internasioal' />
        </div>
      </section>

      {/* Discover */}
      <section className='py-10 px-4 md:px-16 xl:px-36 bg-accentSecondary'>
        <div className='flex justify-between'>
          <h2 className='text-xl font-extrabold md:text-2xl'>Discover</h2>
          <Link href={"/resep"}>
            <div className='flex justify-center items-center gap-1 cursor-pointer hover:underline'>
              <p className='text-xs font-medium md:text-base '>Selengapnya</p>
              <FaAngleRight />
            </div>
          </Link>
        </div>
        <p className='mt-2 mb-7 font-light'>Jelajahi ragam cita rasa yang tersembunyi di setiap masakan</p>
        <div>
          <CardResep />
        </div>
      </section>

      {/* Kategori */}
      <section className='px-4 md:px-16 pt-10 md:pt-16 xl:px-36'>
        <h2 className='text-xl font-extrabold'>Kategori</h2>
        <p className='mt-1 mb-5 font-light'>Jelajahi ragam kategori kuliner terbaik, tempat di mana kelezatan bertemu keberagaman</p>
        <SliderKategori />
      </section>

      {/* Bahan */}
      <section className='px-4 md:px-16 xl:px-36  pt-10 md:pt-16 bg-accentPrimary'>
        <div className='flex justify-between'>
          <h2 className='text-xl font-extrabold'>Bahan-Bahan</h2>
          <Link href={"/bahan-bahan"}>
            <div className='flex justify-center items-center gap-1 cursor-pointer hover:underline'>
              <p className='text-xs font-medium'>Selengapnya</p>
              <FaAngleRight />
            </div>
          </Link>
        </div>
        <p className='mt-2 mb-7 font-light'>Telusuri kelezatan setiap bahan yang menjadi jantung dari setiap hidangan</p>
        <div>
          <BahanSlider />
        </div>
      </section>

      {/* InternasionalFood */}
      <section className='px-4 md:px-16 xl:px-36 pt-10 md:pt-16'>
        <div className='flex justify-between items-center'>
          <h2 className='text-xl font-extrabold'>
            Masakan
            <br />
            Internasional
          </h2>
          <Link href={"/masakan-internasional"}>
            <div className='flex justify-center items-center gap-1 cursor-pointer hover:underline'>
              <p className='text-xs font-medium'>Selengapnya</p>
              <FaAngleRight />
            </div>
          </Link>
        </div>
        <p className='mt-2 mb-7 font-light'>Bersiaplah untuk merasakan sentuhan kelezatan dari setiap benua</p>
        <InternasionalFood />
      </section>

      {/* Footer */}
      <Footer />
    </main>
  );
}
