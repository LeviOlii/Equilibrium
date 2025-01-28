import React from "react";

const Testimony = () => {
    const testimonies = [
        {
            id: 1,
            name: "Maria Clara",
            role: "Empresária",
            testimony: "A Equilibrium transformou minha vida. Com o apoio dos profissionais, aprendi a lidar melhor com meus desafios e encontrei equilíbrio na minha rotina.",
        },
        {
            id: 2,
            name: "João Pedro",
            role: "Estudante",
            testimony: "Sempre tive dificuldade em encontrar apoio emocional acessível. A Equilibrium me conectou com ótimos profissionais e fez toda a diferença!",
        },
        {
            id: 3,
            name: "Fernanda Souza",
            role: "Designer",
            testimony: "O serviço da Equilibrium é incrível! Finalmente consegui o suporte que precisava, de forma simples e acolhedora.",
        },

        {
            id: 4,
                name: "Carlos dos Santos",
                role: "Trabalhador Rural",
                testimony: "Nunca imaginei ter acesso a uma assistência psicológica. Com a Equilibrium, recebi apoio profissional sem sair da minha comunidade. É um sonho realizado.",
        },
        {
            id: 5,
            name: "Ana Pereira",
            role: "Aposentada",
            testimony: "Após perder meu marido, fiquei perdida. A Equilibrium foi um refúgio, me ajudando a superar a dor e encontrar força novamente. É uma bênção!",
        },
        {
            id: 6,
            name: "José Francisco",
            role: "Motoboy",
            testimony: "Com a correria do dia a dia, a saúde mental sempre ficou de lado. A Equilibrium me deu suporte de forma prática e acessível. Recomendo para todos!",
        },
    ];

    return (
        <section id="depoimentos" className="bg-brand-white px-8 md:px-16 font-dmSans pt-48 pb-36">
            <div className="text-center mb-12">
                <h2 className="text-4xl font-bold text-desktop-bg">Depoimentos</h2>
                <p className="text-gray-700 mt-4 text-lg">
                    O que nossos usuários dizem sobre nós
                </p>
            </div>

            <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-3">
                {testimonies.map((testimony) => (
                    <div
                        key={testimony.id}
                        className="bg-white rounded-2xl shadow-lg p-6 space-y-4 text-center"
                    >
                        <p className="text-gray-600 italic">
                            "{testimony.testimony}"
                        </p>
                        <div className="text-desktop-bg font-bold text-xl">
                            {testimony.name}
                        </div>
                        <div className="text-gray-500 text-sm">
                            {testimony.role}
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default Testimony;
