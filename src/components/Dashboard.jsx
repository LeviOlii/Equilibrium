import { useState } from "react";
import Header from "./Header";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";

const Dashboard = () => {
    const [activePanel, setActivePanel] = useState(null);

    const handleCardClick = (panel) => {
        setActivePanel(panel === activePanel ? null : panel);
    };

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
                    <div className="p-4 w-full max-w-4xl flex flex-col items-center">
                        {activePanel === "usuarios" && (
                            <div className="w-full bg-white rounded-lg p-4 shadow-md">
                                <h2 className="text-lg font-bold">Detalhes dos Usuários</h2>
                                <p>Total: 4500 usuários cadastrados.</p>
                                <p>Ativos no último mês: 3200.</p>
                            </div>
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
