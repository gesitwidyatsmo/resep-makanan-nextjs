import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useEffect, useRef, useState } from "react";
import { BiSearch } from "react-icons/bi";
import { FaAngleRight } from "react-icons/fa";

const MenuSearch = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const router = useRouter();
  const menuRef = useRef(null);
  const searchRef = useRef();
  const [searchValue, setSearchValue] = useState("");
  const [searchResult, setSearchResult] = useState("");

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
    if (!isMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
  };

  const handleClickOutside = (event) => {
    if (menuRef.current && !menuRef.current.contains(event.target)) {
      setIsMenuOpen(false);
      document.body.style.overflow = "auto";
    }
  };

  useEffect(() => {
    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  const fetchData = async () => {
    const response = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${searchValue}`);
    const data = await response.json();
    setSearchResult(data.meals || []);
  };

  useEffect(() => {
    if (searchValue !== "") {
      fetchData();
    } else {
      setSearchResult([]);
    }
  }, [searchValue]);

  const handleSearch = (event) => {
    if (event.key === "Enter" || event.type === "click") {
      const keyword = searchRef.current.value;
      if (keyword.trim() !== "") {
        setSearchValue(keyword);
        router.push("/search/" + keyword);
      }
    }
  };

  const handleResetInput = () => {
    setSearchValue("");
    setSearchResult([]);
    searchRef.current.value = "";
  };

  return (
    <div ref={menuRef}>
      <BiSearch size={35} strokeWidth={1} onClick={toggleMenu} className={`cursor-pointer ${isMenuOpen ? "hidden" : "block"}`} />
      <div
        className={`fixed inset-0 overflow-hidden top-[59px] right-0 w-full h-screen bg-opacity-25 bg-black backdrop-blur-[3.5px] transition-opacity duration-400 ${!isMenuOpen ? "hidden" : "block"}`}
        onClick={toggleMenu}
      ></div>
      <div
        className={`absolute w-full lg:w-[80%] xl:w-[60%] mx-auto h-auto right-0 left-1/2 transform -translate-x-1/2 bg-accentPrimary flex flex-col top-[59px] lg:top-20 lg:rounded-xl ${
          !isMenuOpen ? "hidden" : "block"
        }`}
      >
        <div className='flex justify-center items-center mt-5'>
          <input
            type='text'
            ref={searchRef}
            onKeyDown={handleSearch}
            onChange={(e) => setSearchValue(e.target.value)}
            placeholder='Cari resep...'
            className='w-full h-12 ml-5 mr-2 rounded-full pl-14 pr-9 border-2 border-transparent focus:outline-none focus:border-secondary placeholder-gray-400'
          />
          <div className='absolute left-8 flex flex-row justify-center items-center gap-1'>
            <BiSearch size={30} color='#134f4b' onClick={handleSearch} className='cursor-pointer' />
            <div className='w-0.5 rounded-full h-8 bg-secondary'></div>
          </div>
          <div className='absolute right-[70px] cursor-pointer' onClick={handleResetInput}>
            <div className='w-6 h-6'>
              <div className='w-4 h-px bg-primary transform rotate-45 origin-center absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2'></div>
              <div className='w-4 h-px bg-primary transform -rotate-45 origin-center absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2'></div>
            </div>
          </div>
          <p className='flex mr-4 cursor-pointer' onClick={toggleMenu}>
            Batal
          </p>
        </div>
        <div className='mx-5 mt-5'>
          {searchValue && searchResult.length > 0 ? (
            <>
              <h2 className='text-lg font-bold text-primary'>Resep</h2>
              {searchResult.slice(0, 3).map((item, index) => (
                <Link key={index} href={`/resep/${item.idMeal}`}>
                  <div
                    className={`p-2 bg-white rounded-lg mt-2 flex justify-between items-center hover:scale-105 hover:xl:scale-100 hover:xl:text-primary transition-transform duration-200 ease-in-out cursor-pointer ${
                      searchValue && searchResult.length <= 3 ? "mb-7" : ""
                    }`}
                  >
                    {item.strMeal}
                    <FaAngleRight />
                  </div>
                </Link>
              ))}
              {searchValue && searchResult.length > 3 ? (
                <button
                  className='text-sm font-bold text-white my-5 bg-red-700  py-3 px-4 flex justify-center items-center mx-auto rounded-full cursor-pointer hover:scale-105 transition-transform duration-200 ease-in-out'
                  onClick={handleSearch}
                >
                  Selengkapnya
                </button>
              ) : (
                ""
              )}
            </>
          ) : (
            searchValue && <p className='pb-5'>No results for &quot;{searchValue}&quot;</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default MenuSearch;
