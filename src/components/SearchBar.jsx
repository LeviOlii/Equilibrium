import React, { useState } from "react";
import { FaSearch } from "react-icons/fa";

const SearchBar = () => {
  const [search, setSearch] = useState("");
  const [region, setRegion] = useState("");
  const [specialty, setSpecialty] = useState("");
  const [ageGroup, setAgeGroup] = useState("");

  const handleSearch = (e) => {
    e.preventDefault();
    console.log("Busca por:", { search, region, specialty, ageGroup });
  };

  return (
    <section className="bg-brand-white p-6 rounded-lg shadow-lg max-w-4xl mx-auto">
      <form onSubmit={handleSearch} className="flex flex-col md:flex-row gap-4">
        {/* Campo de busca principal */}
        <div className="relative flex-1">
          <input
            type="text"
            placeholder="Busque um profissional..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full px-4 py-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-brand-green"
          />
          <FaSearch className="absolute top-3 right-4 text-gray-500" />
        </div>

        {/* Filtros */}
        <select
          className="px-4 py-3 border rounded-md"
          value={region}
          onChange={(e) => setRegion(e.target.value)}
        >
          <option value="">Região</option>
          <option value="norte">Norte</option>
          <option value="sul">Sul</option>
          <option value="leste">Leste</option>
          <option value="oeste">Oeste</option>
        </select>

        <select
          className="px-4 py-3 border rounded-md"
          value={specialty}
          onChange={(e) => setSpecialty(e.target.value)}
        >
          <option value="">Especialidade</option>
          <option value="terapia-infantil">Terapia Infantil</option>
          <option value="ansiedade">Ansiedade</option>
          <option value="depressao">Depressão</option>
          <option value="casal">Terapia de Casal</option>
        </select>

        <select
          className="px-4 py-3 border rounded-md"
          value={ageGroup}
          onChange={(e) => setAgeGroup(e.target.value)}
        >
          <option value="">Faixa Etária</option>
          <option value="criancas">Crianças</option>
          <option value="adolescentes">Adolescentes</option>
          <option value="adultos">Adultos</option>
          <option value="idosos">Idosos</option>
        </select>

        <button
          type="submit"
          className="bg-brand-green text-white px-6 py-3 rounded-md hover:bg-brand-green-hover transition"
        >
          Buscar
        </button>
      </form>
    </section>
  );
};

export default SearchBar;
