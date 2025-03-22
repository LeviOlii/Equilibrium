import { useState, useEffect } from 'react';
import axios from 'axios';

const SearchProfessional = () => {
  const [specialty, setSpecialty] = useState('');
  const [region, setRegion] = useState('');
  const [groupAge, setGroupAge] = useState('');
  const [profissionais, setProfissionais] = useState([]);
  const [filteredProfessionals, setFilteredProfessionals] = useState([]);

  // filtros
  const especializacoes = [
    "Cardiologista", "Dermatologista", "Pediatra", "Ortopedista", "Neurologista"
  ];

  const regioes = [
    "São Paulo", "Rio de Janeiro", "Minas Gerais", "Bahia", "Paraná"
  ];

  const faixasEtarias = [
    "Crianças", "Adolescentes", "Adultos", "Idosos"
  ];

  // Requisição para obter profissionais do backend
  useEffect(() => {
    axios.get('http://localhost:3000/api/profissionais')
      .then(response => {
        console.log('Profissionais recebidos do backend:', response.data);
        setProfissionais(response.data);
        setFilteredProfessionals(response.data);  // Inicializa com todos os profissionais
      })
      .catch(error => {
        console.error('Erro ao buscar profissionais:', error);
      });
  }, []);

  // Função para filtrar os profissionais com base nos filtros
  const handleSearch = () => {
    console.log('Aplicando filtros', { specialty, region, groupAge });

    let filtered = [...profissionais];  // Faz uma cópia para não modificar o estado original

    // Aplica os filtros se eles estiverem preenchidos
    if (specialty) {
      filtered = filtered.filter((profissional) =>
        profissional.especialidade.toLowerCase().includes(specialty.toLowerCase())
      );
    }

    if (region) {
      filtered = filtered.filter((profissional) =>
        profissional.localizacao.toLowerCase().includes(region.toLowerCase())
      );
    }

    if (groupAge) {
      filtered = filtered.filter((profissional) =>
        profissional.faixa_etaria.toLowerCase().includes(groupAge.toLowerCase())
      );
    }

    console.log('Profissionais filtrados:', filtered);
    setFilteredProfessionals(filtered);  // Atualiza o estado dos profissionais filtrados
  };

  // Função para exibir mais informações
  const handleSaberMais = (profissionalId) => {
    console.log('Exibindo mais informações do profissional com id:', profissionalId);
    // Aqui você pode implementar a lógica para abrir um modal, redirecionar para outra página, etc.
  };

  return (
    <section className="flex flex-col items-center bg-white">
      <h1 className="text-gray-headline text-3xl font-thin italic bg-desktop-bg flex items-center justify-center w-full h-20">
        Encontre um especialista próximo de você!
      </h1>

      {/* Filtros de pesquisa */}
      <div className="w-3/5 bg-gray-200 p-8 rounded-lg shadow-lg mt-8 flex flex-col items-center">
        <h2 className="text-gray-700 font-thin text-2xl italic mb-4">Filtrar Profissionais</h2>

        {/* Select de Especialização */}
        <select
          value={specialty}
          onChange={(e) => setSpecialty(e.target.value)}
          className="mb-4 p-2 border rounded w-4/5 pr-8"
        >
          <option value="">Selecione uma especialização</option>
          {especializacoes.map((esp, index) => (
            <option key={index} value={esp}>{esp}</option>
          ))}
        </select>

        {/* Select de Região */}
        <select
          value={region}
          onChange={(e) => setRegion(e.target.value)}
          className="mb-4 p-2 border rounded w-4/5"
        >
          <option value="">Selecione uma região</option>
          {regioes.map((regiao, index) => (
            <option key={index} value={regiao}>{regiao}</option>
          ))}
        </select>

        {/* Select de Faixa Etária */}
        <select
          value={groupAge}
          onChange={(e) => setGroupAge(e.target.value)}
          className="mb-4 p-2 border rounded w-4/5"
        >
          <option value="">Selecione uma faixa etária</option>
          {faixasEtarias.map((faixa, index) => (
            <option key={index} value={faixa}>{faixa}</option>
          ))}
        </select>

        {/* Botão de Buscar */}
        <button
          onClick={handleSearch}
          className="p-2 mt-4 bg-blue-500 text-white rounded hover:bg-blue-700"
        >
          Buscar
        </button>
      </div>

      {/* Lista de Profissionais */}
      <div className="w-3/5 mt-10">
        {filteredProfessionals.length === 0 ? (
          <p className="text-center text-xl text-gray-600">Nenhum profissional encontrado</p>
        ) : (
          filteredProfessionals.map((profissional) => (
            <div key={profissional.id} className="flex items-center bg-white p-4 mb-4 rounded-lg shadow-md hover:bg-gray-100">
              {/* Avatar genérico do Tailwind ou foto do profissional */}
              <div className="w-16 h-16 rounded-full mr-4 bg-gray-100 flex items-center justify-center overflow-hidden relative">
                {profissional.foto ? (
                  <img
                    src={profissional.foto}
                    alt={profissional.usuario?.nome || "Profissional sem nome"}
                    className="w-full h-full object-cover rounded-full"
                  />
                ) : (
                  <svg className="absolute w-12 h-12 text-gray-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                    <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd"></path>
                  </svg>
                )}
              </div>
              <div className="flex flex-col">
                <h2 className="text-xl font-semibold text-gray-800">{profissional.usuario?.nome}</h2>
                <p className="text-gray-600">{profissional.especialidade}</p>
                <p className="text-gray-600">{profissional.localizacao}</p>
                <p className="text-gray-600">{profissional.faixa_etaria}</p>
              </div>
              <button
                onClick={() => handleSaberMais(profissional.id)}
                className="ml-auto p-2 bg-blue-500 text-white rounded hover:bg-blue-700"
              >
                Saber Mais
              </button>
            </div>
          ))
        )}
      </div>
    </section>
  );
};

export default SearchProfessional;
