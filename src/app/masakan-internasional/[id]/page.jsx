"use client";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/20/solid";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { FiChevronsLeft, FiChevronsRight } from "react-icons/fi";

const DetailKategories = ({ params: { id } }) => {
  const [intern, setIntern] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const page = 15;

  useEffect(() => {
    const fectKategori = async () => {
      const response = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?a=${id}`);
      const data = await response.json();
      setIntern(data.meals);
    };
    fectKategori();
  }, [id]);

  const indexLast = currentPage * page;
  const indexFirst = indexLast - page;
  const currentInters = intern.slice(indexFirst, indexLast);

  const goToNextPage = () => setCurrentPage(currentPage + 1);
  const goToPreviousPage = () => setCurrentPage(currentPage - 1);

  const totalPages = Math.ceil(intern.length / page);

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
    <div>
      <Header />
      <div className='py-10 px-4 md:px-16 xl:px-36'>
        <div>
          <h1 className='text-black text-xl md:text-xl font-extrabold xl:text-xl'>
            Masakan Internasional dari <span className='text-secondary'>{id}</span>
          </h1>
          <div className='grid grid-cols-2 sm:grid-cols-3 gap-5 mt-3 md:mt-5'>
            {currentInters.map((kategori) => (
              <div key={kategori.idMeal} className='flex flex-col justify-start items-center mx-auto'>
                <div className='relative'>
                  <img src={kategori.strMealThumb} alt={kategori.strMeal} className='rounded-lg relative w-48 h-48 md:w-56 md:h-56 lg:w-80 lg:h-80 object-cover' />
                </div>
                <h3 className='text-sm md:text-base font-extrabold mt-3 line-clamp-2 '>{kategori.strMeal}</h3>
                <Link href={`/resep/${kategori.idMeal}`}>
                  <p className='text-sm md:text-base font-normal cursor-pointer mt-1 hover:underline hover:text-primary'>Lihat Resep</p>
                </Link>
              </div>
            ))}
          </div>
        </div>
        <div className='flex flex-col lg:flex-row gap-5  items-center justify-between border-t border-gray-200 bg-white px-4 py-3 sm:px-6 mt-5'>
          <p className='text-sm text-gray-700'>
            Showing <span className='font-medium'>{indexFirst + 1}</span> to <span className='font-medium'>{currentPage === totalPages ? intern.length : indexLast}</span> of{" "}
            <span className='font-medium'>{intern.length}</span> results
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
    </div>
  );
};

export default DetailKategories;
