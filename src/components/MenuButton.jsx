import Link from "next/link";
import React, { useState, useRef, useEffect } from "react";
import { usePathname } from "next/navigation";

const MenuButton = ({ data }) => {
  const pathname = usePathname();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuRef = useRef(null);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleClickOutside = (event) => {
    if (menuRef.current && !menuRef.current.contains(event.target)) {
      setIsMenuOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  return (
    <div className='block md:hidden' ref={menuRef}>
      <label htmlFor='menu_button' className='w-9 h-9 cursor-pointer flex flex-col justify-center items-center gap-1.5'>
        <input type='checkbox' id='menu_button' className='hidden peer' onClick={toggleMenu} checked={isMenuOpen} onChange={() => setIsMenuOpen(!isMenuOpen)} />
        <div
          className={`w-6 h-1.5 rounded-lg bg-black transition-all duration-300 origin-right ${isMenuOpen ? "peer-checked:w-full peer-checked:rotate-[-30deg] peer-checked:translate-y-[-5px]" : ""}`}
        ></div>
        <div className={`w-full h-1.5 rounded-lg bg-black transition-all duration-300 origin-center ${isMenuOpen ? "peer-checked:rotate-90 peer-checked:translate-x-4" : ""}`}></div>
        <div
          className={`w-6 h-1.5 rounded-lg bg-black transition-all duration-300 origin-right ${isMenuOpen ? "peer-checked:w-full peer-checked:rotate-[30deg] peer-checked:translate-y-[5px]" : ""}`}
        ></div>
      </label>

      {isMenuOpen && (
        <div className='absolute right-0 top-[59px] w-1/2 bg-white border border-gray-300 shadow-md p-4'>
          {data.map((item, index) => (
            <Link key={index} href={item.href}>
              <div className={`text-center py-2 cursor-pointer hover:text-primary ${pathname === item.href ? "bg-secondary dark:text-white rounded-full hover:text-white" : ""}`} onClick={toggleMenu}>
                {item.nav}
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
};

export default MenuButton;
