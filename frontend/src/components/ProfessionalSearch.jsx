import React, { useState, useEffect } from "react";
import axios from "axios";
import Header from "./Header";
import {Link} from "react-router-dom";
import { useLocation } from "react-router-dom";

const SearchProfessional = () => {
  const [specialty, setSpecialty] = useState("");
  const [region, setRegion] = useState("");
  const [groupAge, setGroupAge] = useState("");
  const [filteredProfessionals, setFilteredProfessionals] = useState([]);
  const [visibleCount, setVisibleCount] = useState(5);
  const location = useLocation();

  // Função para normalizar strings (remove acentos e coloca em minúsculas)
  const normalizeString = (str) => {
    return str
      ? str
          .toLowerCase()
          .normalize("NFD")
          .replace(/[\u0300-\u036f]/g, "")
      : "";
  };

  // Reordenação aleatória da lista de profissionais
  const shuffleArray = (array) => {
    return array
      .map((a) => ({ sort: Math.random(), value: a }))
      .sort((a, b) => a.sort - b.sort)
      .map((a) => a.value);
  };

  // Função para buscar profissionais aplicando os filtros
  const filterProfessionals = () => {
    axios
      .get("http://localhost:3000/api/profissionais")
      .then((response) => {
        let filtered = response.data;

        // Aplica os filtros se os parâmetros estiverem definidos
        if (region) {
          filtered = filtered.filter(
            (prof) => normalizeString(prof.localizacao) === normalizeString(region)
          );
        }

        if (specialty) {
          filtered = filtered.filter(
            (prof) => normalizeString(prof.especialidade) === normalizeString(specialty)
          );
        }

        if (groupAge) {
          filtered = filtered.filter(
            (prof) => normalizeString(prof.faixa_etaria) === normalizeString(groupAge)
          );
        }

        // Embaralha a lista de profissionais filtrados
        filtered = shuffleArray(filtered);

        // Atualiza o estado
        setFilteredProfessionals(filtered);
        setVisibleCount(5); // Reseta para 5 após a busca
      })
      .catch((error) => {
        console.error("Erro ao buscar profissionais:", error);
      });
  };

  // Captura os parâmetros da URL e define os filtros
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    setRegion(params.get("region") || "");
    setSpecialty(params.get("specialty") || "");
    setGroupAge(params.get("ageGroup") || "");
  }, [location.search]); // Esse useEffect é responsável por atualizar os filtros com base nos parâmetros da URL

  // Função para carregar mais profissionais
  const loadMore = () => {
    setVisibleCount(visibleCount + 3);
  };

  // Função para carregar os profissionais com base nos filtros
  useEffect(() => {
    filterProfessionals(); // Executa a busca automaticamente sempre que os filtros mudam
  }, [region, specialty, groupAge]); // Re-executa sempre que os filtros (parâmetros) mudarem

  const professionalsToShow = filteredProfessionals.slice(0, visibleCount);

  return (
    <>
      <Header renderButtons={false} />
      <section className="flex flex-col items-center bg-mobile-bg shadow-lg py-8">
        <div className="w-3/5 bg-gray-200 p-8 rounded-lg shadow-lg mt-8 flex flex-col items-center">
          <h2 className="text-gray-700 font-thin text-2xl italic mb-4">
            Buscar Profissionais
          </h2>

          <div className="flex flex-col gap-4 mb-6 w-full items-center">
            <select
              value={region}
              onChange={(e) => setRegion(e.target.value)}
              className="p-2 border rounded w-3/5"
            >
              <option value="">Selecione uma Cidade</option>
              <option value="Fortaleza">Fortaleza</option>
              <option value="Quixadá">Quixadá</option>
              <option value="Caucaia">Caucaia</option>
              <option value="Eusébio">Eusébio</option>
              <option value="Maracanaú">Maracanaú</option>
            </select>

            <select
              value={specialty}
              onChange={(e) => setSpecialty(e.target.value)}
              className="p-2  border rounded w-3/5"
            >
              <option value="">Especialidade</option>
              <option value="terapia-infantil">Terapia Infantil</option>
              <option value="ansiedade">Ansiedade</option>
              <option value="depressao">Depressão</option>
              <option value="casal">Terapia de Casal</option>
            </select>

            <select
              value={groupAge}
              onChange={(e) => setGroupAge(e.target.value)}
              className="p-2 border rounded w-3/5 "
            >
              <option value="">Faixa Etária</option>
              <option value="criancas">Crianças</option>
              <option value="adolescentes">Adolescentes</option>
              <option value="adultos">Adultos</option>
              <option value="idosos">Idosos</option>
            </select>
          </div>
        </div>

        <div className="w-3/5 mt-10">
          {professionalsToShow.length === 0 ? (
            <p className="text-center text-xl text-gray-600">
              Nenhum profissional encontrado
            </p>
          ) : (
            professionalsToShow.map((profissional) => (
              <div
                key={profissional.id}
                className="flex items-center bg-white p-4 mb-4 rounded-lg shadow-md hover:bg-gray-100"
              >
                <div className="w-16 h-16 rounded-full mr-4 bg-gray-100 flex items-center justify-center overflow-hidden relative">
                  {profissional.foto ? (
                    <img
                      src={profissional.foto}
                      alt={profissional.usuario?.nome || "Profissional sem nome"}
                      className="w-full h-full object-cover rounded-full"
                    />
                  ) : (
                    <svg
                      className="absolute w-12 h-12 text-gray-400"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
                        clipRule="evenodd"
                      ></path>
                    </svg>
                  )}
                </div>
                <div className="flex flex-col">
                  <h2 className="text-xl font-semibold text-gray-800">
                    {profissional.usuario?.nome}
                  </h2>
                  <p className="text-gray-600">{profissional.especialidade === "terapia-infantil" ? "Terapia Infantil" : profissional.especialidade}</p>
                  <p className="text-gray-600">{profissional.localizacao}</p>
                  <p className="text-gray-600">{profissional.faixa_etaria}</p>
                </div>

                {/* So ta aqui por estar*/}
                <Link 
                  to={`/profile/${profissional.usuario.id}`} 
                  className="ml-auto px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700 inline-block text-center"
                  >
                  Saber mais
                </Link>

              </div>
            ))  
          )}

          {filteredProfessionals.length > visibleCount && (
            <div className="w-full flex justify-center mt-6">
              <button
                onClick={loadMore}
                className="px-10 py-3 bg-blue-500 text-white rounded hover:bg-blue-700"
              >
                Mostrar mais
              </button>
            </div>
          )}
        </div>
      </section>
    </>
  );
};

export default SearchProfessional;
