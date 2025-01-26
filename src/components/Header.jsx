import { useState } from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  // Função para scroll suave
  const scrollToSection = (id) => {
    const section = document.getElementById(id);
    if (section) {
      section.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <header className="bg-desktop-bg text-white p-6 font-dmSans tracking-wide">
      {/* Container principal */}
      <div className="container mx-auto flex justify-between items-center">
        {/* Logo */}
        <h1 className="text-2xl text-white">Equili<span className="font-bold">brium</span></h1>

        {/* Menu para Desktop */}
        <nav className="hidden md:flex md:space-x-6">
          <button onClick={() => scrollToSection("inicio")} className="hover:underline">
            Início
          </button>
          <button onClick={() => scrollToSection("sobre")} className="hover:underline">
            Sobre
          </button>
          <button onClick={() => scrollToSection("grupos")} className="hover:underline">
            Grupos
          </button>
          <button onClick={() => scrollToSection("depoimentos")} className="hover:underline">
            Depoimentos
          </button>
          <Link to="/login" className="hover:underline">Login</Link>
        </nav>

        {/* Botão de Ação para Desktop */}
        <Link to="/login">
          <button className="hidden md:block border-2 border-white px-6 py-2 rounded-full hover:bg-brand-green-hover hover:text-brand-green transition">
            BUSQUE AJUDA
          </button>
        </Link>

        {/* Botão de Menu para Mobile */}
        <button
          className="md:hidden"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Abrir menu"
        >
          <FontAwesomeIcon icon={faBars} className="text-2xl" />
        </button>
      </div>

      {/* Menu Mobile */}
      {menuOpen && (
        <nav className="md:hidden grid bg-brand-green mt-2 space-y-4 p-6 text-2xl">
          <button onClick={() => scrollToSection("inicio")} className="block hover:underline text-center font-bold py-4">
            Início
          </button>
          <button onClick={() => scrollToSection("sobre")} className="block hover:underline text-center font-bold py-4">
            Sobre
          </button>
          <button onClick={() => scrollToSection("grupos")} className="block hover:underline text-center font-bold py-4">
            Grupos
          </button>
          <button onClick={() => scrollToSection("depoimentos")} className="block hover:underline text-center font-bold py-4">
            Depoimentos
          </button>
          <button className="border-2 border-white py-3 rounded-full hover:bg-brand-green-hover hover:text-brand-green font-bold transition">
            BUSQUE AJUDA
          </button>
        </nav>
      )}
    </header>
  );
};

export default Header;
