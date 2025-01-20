import React, { useState } from "react";

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="bg-desktop-bg text-white p-6 font-dmSans tracking-wide">
      {/* Container principal */}
      <div className="container mx-auto flex justify-between items-center">
        {/* Logo */}
        <h1 className="text-2xl text-white">Equili<span className="font-bold">brium</span></h1>

        {/* Menu para Desktop */}
        <nav className="hidden md:flex md:space-x-6">
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

        {/* Botão de Ação para Desktop */}
        <button className="hidden md:block border-2 border-white px-6 py-2 rounded-full hover:bg-brand-green-hover hover:text-brand-green transition">
          BUSQUE AJUDA
        </button>

        {/* Botão de Menu para Mobile */}
        <button
          className="md:hidden"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Abrir menu"
        >
          <span className="material-icons">menu</span>
        </button>
      </div>

      {/* Menu Mobile */}
      {menuOpen && (
        <nav className="md:hidden grid bg-brand-green mt-2 space-y-4 p-6 col-span-5 text-2xl">
          <a href="#home" className="block hover:underline text-center font-bold py-4">
            Início
          </a>
          <a href="#about" className="block hover:underline text-center font-bold py-4">
            Sobre
          </a>
          <a href="#groups" className="block hover:underline text-center font-bold py-4">
            Grupos
          </a>
          <a href="#testimony" className="block hover:underline text-center font-bold py-4">
            Depoimentos
          </a>
          <button className="border-2 border-white py-3 rounded-full hover:bg-brand-green-hover hover:text-brand-green font-bold transition">
          BUSQUE AJUDA
        </button>
        </nav>
      )}
    </header>
  );
};

export default Header;
