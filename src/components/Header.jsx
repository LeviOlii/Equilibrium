import React, { useState } from "react";
import "../index.css";

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="bg-blue-500 text-white p-4 font-dmSans bg-brand-green">
      <div className="container mx-aut flex justify-between items-center">
        {/* Logo */}
        <h1 className="text-2xl font-bold">Minha Plataforma</h1>

        {/* Menu para Desktop */}
        <nav className="hidden md:flex space-x-6">
          <a href="#home" className="hover:underline">
            Início
          </a>
          <a href="#about" className="hover:underline">
            Sobre
          </a>
          <a href="#contact" className="hover:underline">
            Contato
          </a>
        </nav>

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
        <nav className="md:hidden bg-blue-600 p-4 mt-2 space-y-2">
          <a href="#home" className="block hover:underline">
            Início
          </a>
          <a href="#about" className="block hover:underline">
            Sobre
          </a>
          <a href="#contact" className="block hover:underline">
            Contato
          </a>
        </nav>
      )}
    </header>
  );
};

export default Header;
