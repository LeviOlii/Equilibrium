import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; // Importa useNavigate

const SearchBar = () => {
    const [region, setRegion] = useState("");
    const [specialty, setSpecialty] = useState("");
    const [ageGroup, setAgeGroup] = useState("");

    const navigate = useNavigate(); // Hook para navegação

    const handleSearch = (e) => {
        e.preventDefault();

        // Criando query params para passar os filtros
        const queryParams = new URLSearchParams();
        if (region) queryParams.append("region", region);
        if (specialty) queryParams.append("specialty", specialty);
        if (ageGroup) queryParams.append("ageGroup", ageGroup);

    
        navigate(`/search?${queryParams.toString()}`);
    };

    return (
        <section className="bg-brand-white p-6 rounded-lg shadow-lg max-w-5xl mx-auto lg:w-max">
            <form onSubmit={handleSearch} className="flex flex-col md:flex-row gap-4 md:gap-0 items-center">
                <select
                    className="px-1 py-3 border rounded-md w-full md:w-auto lg:mr-2"
                    value={region}
                    onChange={(e) => setRegion(e.target.value)}
                >
                    <option value="">Região</option>
                    <option value="norte">Norte</option>
                    <option value="sul">Sul</option>
                    <option value="centro-oeste">Centro-Oeste</option>
                    <option value="nordeste">Nordeste</option>
                    <option value="sudeste">Sudeste</option>
                </select>

                <select
                    className="px-4 py-3 border rounded-md w-full md:w-auto md:mr-2"
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
                    className="px-4 py-3 border rounded-md w-full md:w-auto"
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
                    className="bg-brand-green text-white px-4 py-3 md:mx-4 rounded-md hover:bg-brand-green-hover transition w-full md:w-auto">
                    Buscar
                </button>
            </form>
        </section>
    );
};

export default SearchBar;
