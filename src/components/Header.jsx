import React, { useState } from "react";

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="bg-brand-green text-white p-6 font-dmSans tracking-wide">
      <div className=" hidden md:flex container justify-center items-center min-w-full">
        {/* Logo */}
        <h1 className="absolute top-2/ left-36 text-2xl tracking-wide">
          Equilibrium
        </h1>

        {/* Menu para Desktop */}
        <nav className="hidden md:flex space-x-6 justify-center items-center ">
          <a href="#home" className="hover:underline">
            Início
          </a>
          <a href="#about" className="hover:underline">
            Sobre
          </a>
          <a href="#groups" className="hover:underline">
            Grupos
          </a>
          <a href="#testimony" className="hover:underline">
            Depoimentos
          </a>
        </nav>

        <button className="hidden md:block absolute top-3 right-16 border-2 text-white px-8 py-2 rounded-3xl mr-4">
          BUSQUE AJUDA
        </button>
      </div>

      {/* Menu Mobile */}
      {menuOpen && (
        <nav className="md:hidden  p-4 mt-2 space-y-2">
          <a href="#home" className="block hover:underline">
            Início
          </a>
          <a href="#about" className="block hover:underline">
            Sobre
          </a>
          <a href="#groups" className="block hover:underline">
            Grupos
          </a>
          <a href="#testimony" className="block hover:underline">
            Depoimentos
          </a>
        </nav>
      )}
    </header>
  );
};

export default Header;
