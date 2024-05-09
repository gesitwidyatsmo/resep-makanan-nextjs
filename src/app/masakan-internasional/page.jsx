"use client";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/20/solid";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { FiChevronsLeft, FiChevronsRight } from "react-icons/fi";

const Internasional = () => {
  const [inters, setInters] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const page = 15;

  useEffect(() => {
    const fetchBahan = async () => {
      const response = await fetch("https://www.themealdb.com/api/json/v1/1/list.php?a=list");
      const data = await response.json();
      const bahansWithImages = data.meals.map((gambar) => ({
        ...gambar,
        imageUrl: `/Negara/${gambar.strArea}.jpg`
      }));

      setInters(bahansWithImages);
    };

    fetchBahan();
  }, []);

  const indexLast = currentPage * page;
  const indexFirst = indexLast - page;
  const currentInters = inters.slice(indexFirst, indexLast);

  const goToNextPage = () => setCurrentPage(currentPage + 1);
  const goToPreviousPage = () => setCurrentPage(currentPage - 1);

  const totalPages = Math.ceil(inters.length / page);

  const getPageNumbers = () => {
    const pageNumbers = [];
    if (totalPages <= 7) {
      for (let i = 1; i <= totalPages; i++) {
        pageNumbers.push(i);
      }
    } else {
      if (currentPage <= 2) {
        pageNumbers.push(1, 2, 3, "...");
        pageNumbers.push(totalPages);
      } else if (currentPage <= 3) {
        pageNumbers.push(1, 2, 3, 4, "...");
        pageNumbers.push(totalPages);
      } else if (currentPage <= 4) {
        pageNumbers.push(1, 2, 3, 4, 5, "...");
        pageNumbers.push(totalPages);
      } else if (currentPage > totalPages - 4) {
        pageNumbers.push(1, "...");
        pageNumbers.push(totalPages - 4, totalPages - 3, totalPages - 2, totalPages - 1, totalPages);
      } else {
        pageNumbers.push(1, "...");
        pageNumbers.push(currentPage - 2, currentPage - 1, currentPage, currentPage + 1, currentPage + 2, "...");
        pageNumbers.push(totalPages);
      }
    }
    return pageNumbers;
  };

  return (
    <>
      <Header />
      <div className='py-10 px-4 md:px-16 xl:px-36'>
        <div className='flex flex-col justify-center items-center text-center'>
          <h1 className='text-black text-2xl md:text-3xl font-extrabold leading-7 xl:w-[90%] xl:leading-[55px] xl:text-5xl'>Masakan Internasional</h1>
          <p className='text-zinc-500 text-xs xl:text-base font-medium mt-2 md:mt-3 md:w-[90%] '>
            Selamat datang di dunia kuliner internasional. Bersiaplah untuk merasakan sentuhan kelezatan dari setiap benua, menjelajahi ragam rasa yang menakjubkan, dan memanjakan lidah Anda dengan
            cita rasa yang unik dan tak terlupakan.
          </p>
        </div>
        <div className='grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-5 my-5'>
          {currentInters.map((inters, i) => (
            <Link key={i} href={`masakan-internasional/${inters.strArea}`}>
              <div className='flex flex-col justify-center items-center'>
                <img src={inters.imageUrl} alt={inters.strArea} className='flex justify-center items-center mx-auto' />
                <h2 className='mt-3'>{inters.strArea}</h2>
              </div>
            </Link>
          ))}
        </div>
        <div className='flex flex-col lg:flex-row gap-5  items-center justify-between border-t border-gray-200 bg-white px-4 py-3 sm:px-6 mt-5'>
          <p className='text-sm text-gray-700'>
            Showing <span className='font-medium'>{indexFirst + 1}</span> to <span className='font-medium'>{currentPage === totalPages ? inters.length : indexLast}</span> of{" "}
            <span className='font-medium'>{inters.length}</span> results
          </p>
          <div className='flex flex-1 justify-between sm:hidden'>
            <button
              onClick={() => {
                goToPreviousPage();
                window.scrollTo({ top: 0, behavior: "smooth" });
              }}
              disabled={currentPage === 1}
              className='relative inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50'
            >
              <ChevronLeftIcon className='h-5 w-5' aria-hidden='true' />
              Previous
            </button>
            <button
              onClick={() => {
                goToNextPage();
                window.scrollTo({ top: 0, behavior: "smooth" });
              }}
              disabled={currentInters.length < page}
              className='relative ml-3 inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50'
            >
              Next
              <ChevronRightIcon className='h-5 w-5' aria-hidden='true' />
            </button>
          </div>
          <div className='justify-center items-center gap-3 cursor-pointer hidden sm:flex'>
            <div
              className={`${currentPage === 1 ? "hidden" : "block"}`}
              onClick={() => {
                goToPreviousPage();
                window.scrollTo({ top: 0, behavior: "smooth" });
              }}
            >
              <FiChevronsLeft size={20} />
            </div>
            <nav className='rounded-md shadow-sm' aria-label='Pagination'>
              {getPageNumbers().map((pageNumber, index) => (
                <button
                  key={index}
                  onClick={() => {
                    if (typeof pageNumber === "number") {
                      setCurrentPage(pageNumber);
                      window.scrollTo({ top: 0, behavior: "smooth" });
                    }
                  }}
                  className={`relative inline-flex items-center px-4 py-2 rounded-lg text-sm font-semibold ${pageNumber === currentPage ? "bg-indigo-600 text-white " : "text-gray-700"}`}
                  disabled={typeof pageNumber !== "number"}
                >
                  {pageNumber}
                </button>
              ))}
            </nav>
            <div
              className={`${currentPage === totalPages ? "hidden" : "block"}`}
              onClick={() => {
                goToNextPage();
                window.scrollTo({ top: 0, behavior: "smooth" });
              }}
            >
              <FiChevronsRight size={20} />
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Internasional;
