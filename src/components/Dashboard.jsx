import { useState, useEffect } from "react";
import Header from "./Header";
import { Link } from "react-router-dom";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";
import axios from "axios";

const Dashboard = () => {
    const [activePanel, setActivePanel] = useState(null);
    const [users, setUsers] = useState(null);

    const handleCardClick = (panel) => {
        setActivePanel(panel === activePanel ? null : panel);
    };

    useEffect(() => {
        axios
          .get("http://localhost:3000/api/usuarios")
          .then((response) => {
            let users = response.data;
                
            setUsers(users);
          })
          .catch((error) => {
            console.error("Erro ao buscar usuários:", error);
          });
      }, []);

    const accessData = [
        { name: "Seg", acessos: 120 },
        { name: "Ter", acessos: 200 },
        { name: "Qua", acessos: 300 },
        { name: "Qui", acessos: 250 },
        { name: "Sex", acessos: 400 },
        { name: "Sáb", acessos: 180 },
        { name: "Dom", acessos: 220 }
    ];

    return (
        <>  
            <Header />
            <div className="bg-desktop-bg font-dmSans min-h-screen">
                <h1 className="text-center p-4 text-3xl text-white">Painel do Administrador</h1>
                <section className="bg-mobile-bg min-h-screen flex flex-col items-center">
                    <div className="grid lg:grid-cols-2 lg:gap-5 xl:grid-cols-4 xl:w-[90vw] grid-cols-1 gap-y-4 pt-10 place-items-center">
                        <div className="shadow rounded-md h-[127px] w-[360px] bg-white cursor-pointer"
                            onClick={() => handleCardClick("usuarios")}>
                            <p className="pt-7 pl-4 text-light">Total de usuários</p>
                            <p className="pt-2 pl-4 text-xl font-bold">4500</p>
                        </div>
                        <div className="shadow rounded-md h-[127px] w-[360px] bg-white cursor-pointer"
                            onClick={() => handleCardClick("atendimentos")}>
                            <p className="pt-7 pl-4 text-light">Novos cadastros por período</p>
                            <p className="pt-2 pl-4 text-xl font-bold">4500</p>
                        </div>
                        <div className="shadow rounded-md h-[127px] w-[360px] bg-white cursor-pointer"
                            onClick={() => handleCardClick("depoimentos")}>
                            <p className="pt-7 pl-4 text-light">Atendimentos realizados</p>
                            <p className="pt-2 pl-4 text-xl font-bold">122</p>
                        </div>
                        <div className="shadow rounded-md h-[127px] w-[360px] bg-white cursor-pointer"
                            onClick={() => handleCardClick("grupos")}>
                            <p className="pt-7 pl-4 text-light">Número de acessos ao site</p>
                            <p className="pt-2 pl-4 text-xl font-bold">4500</p>
                        </div>
                    </div>

                    {/* Painéis de informações */}
                    <div className={activePanel === "usuarios" ? "flex flex-col gap-10 ml-[25%] md:ml-0 p-4 w-full max-w-[90%] md:grid md:grid-rows-4 md:grid-flow-col gap-4 gap-x-[60px] justify-start" : "p-4 w-full max-w-4xl flex flex-col items-center"}>

                        {activePanel === "usuarios" && (
                          <>
                          {users.length === 0 ? 
                          (
                            <p>Ninguem pra mostrar</p>
                          ) 
                          : 
                          (
                            users.map((user) => (
                            <div className="h-[127px] w-[360px] bg-white rounded-lg p-4 ml-1 flex justify-between items-start">
                                <div>
                                    <h2 className="text-xl font-semibold text-gray-800">{user.nome}</h2>
                                    <p className="text-gray-600">{(user.email).slice(0,24)}</p>
                                    <p className="text-gray-600">{user.tipo}</p>
                                    <p className="text-gray-600">Id: {user.id}</p>
                                </div>
                                <Link to={`/profile/${user.id}`}>
                                <button className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600">
                                    Ver perfil
                                </button>
                                </Link>
                          </div>  
                            ))
                          )};  
                          
                        </>
                        )}
                        {activePanel === "atendimentos" && (
                            <div className="w-full bg-white rounded-lg p-4 shadow-md">
                                <h2 className="text-lg font-bold">Novos Cadastros</h2>
                                <p>Últimos 30 dias: 4500 novos cadastros.</p>
                                <p>Crescimento: 12% comparado ao mês anterior.</p>
                            </div>
                        )}
                        {activePanel === "depoimentos" && (
                            <div className="w-full bg-white rounded-lg p-4 shadow-md">
                                <h2 className="text-lg font-bold">Atendimentos Realizados</h2>
                                <p>Total: 122 atendimentos.</p>
                                <p>Satisfação: 95% de avaliações positivas.</p>
                            </div>
                        )}
                        {activePanel === "grupos" && (
                            <div className="w-full bg-white rounded-lg p-4 shadow-md">
                                <h2 className="text-lg font-bold">Número de Acessos</h2>
                                <p>Total: 4500 acessos no site.</p>
                                <p>Média diária: 150 acessos.</p>
                                <div className="w-full h-64">
                                    <ResponsiveContainer width="100%" height="100%">
                                        <BarChart data={accessData}>
                                            <XAxis dataKey="name" />
                                            <YAxis />
                                            <Tooltip />
                                            <Bar dataKey="acessos" fill="#8884d8" />
                                        </BarChart>
                                    </ResponsiveContainer>
                                </div>
                            </div>
                        )}
                    </div>
                </section>
            </div>
        </>
    );
};

export default Dashboard;
