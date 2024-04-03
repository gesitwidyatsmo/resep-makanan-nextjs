/* eslint-disable @next/next/no-img-element */
import Link from "next/link";
import React from "react";

const NotFound = () => {
  return (
    <div class='w-full h-screen flex flex-col items-center justify-center'>
      <img src='Image/NotFound.svg' className='w-52 h-52' alt='notfound' />
      <h1 className='text-lg font-extrabold text-primary'>Page Not Found</h1>
      <p className='mt-2'>Halaman yang anda tuju tidak ditemukan</p>
      <Link href={"/"}>
        <button className='mt-4 py-3 px-4 bg-secondary text-white text-base rounded-full transition-transform hover:scale-105 duration-300 ease-in-out'>Kembali</button>
      </Link>
    </div>
  );
};

export default NotFound;
