import React from "react";
import { PiBowlFood } from "react-icons/pi";
import { usePathname } from "next/navigation";
import Link from "next/link";
import MenuButton from "./MenuButton";
import MenuSearch from "./MenuSearch";

const navItems = [
  {
    nav: "Home",
    href: "/"
  },
  {
    nav: "Resep",
    href: "/resep"
  },
  {
    nav: "Kategori",
    href: "/kategori"
  },
  {
    nav: "Bahan",
    href: "/bahan-bahan"
  }
];

const Header = () => {
  const pathname = usePathname();

  return (
    <header className='sticky top-0 right-0 z-50 bg-[#fdfefe]'>
      <div className='px-4 md:px-16 xl:px-36 py-2 flex justify-between items-center'>
        <Link href={"/"}>
          <div className='flex justify-center items-center gap-2'>
            <PiBowlFood size={45} />
            <h1 className='text-xl font-bold hidden md:block'>Resepnyo</h1>
          </div>
        </Link>
        <nav className='hidden md:flex gap-0.5'>
          {navItems.map((item, index) => (
            <Link key={index} href={`${item.href}`} className='cursor-pointer'>
              <div
                className={`text-secondary font-Poppins font-medium text-sm py-2 px-5 rounded-full hover:bg-secondary dark:text-black  dark:hover:text-white ${
                  pathname === item.href ? "bg-secondary dark:text-white" : ""
                }`}
              >
                {item.nav}
              </div>
            </Link>
          ))}
        </nav>
        <div className='flex justify-center items-center gap-1'>
          <MenuSearch />
          <MenuButton data={navItems} />
        </div>
      </div>
    </header>
  );
};

export default Header;
