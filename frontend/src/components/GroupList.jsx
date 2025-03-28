import React, { useState } from "react";

const groups = [
    { id: 1, name: "Apoio à Ansiedade", region: "Fortaleza", specialty: "Ansiedade" },
    { id: 2, name: "Grupo de Terapia Infantil", region: "Quixadá", specialty: "Terapia Infantil" },
    { id: 3, name: "Cuidando da Mente", region: "Caucaia", specialty: "Saúde Mental" },
    { id: 4, name: "Viva Bem", region: "Eusébio", specialty: "Bem-Estar" },
    { id: 5, name: "Superando a Depressão", region: "Maracanaú", specialty: "Depressão" },
];

const GroupList = () => {
    const [regionFilter, setRegionFilter] = useState("");
    const [specialtyFilter, setSpecialtyFilter] = useState("");

    const filteredGroups = groups.filter(group =>
        (regionFilter === "" || group.region === regionFilter) &&
        (specialtyFilter === "" || group.specialty === specialtyFilter)
    );

    return (
        <section id="grupos" className="font-dmSans bg-brand-white p-8">
            <div className="container mx-auto">
                <h2 className="text-3xl font-bold text-desktop-bg mb-4 text-center">Grupos de Apoio</h2>

                <div className="flex flex-col md:flex-row gap-4 mb-6">
                    <select
                        className="p-2 border rounded-md w-full md:w-auto"
                        onChange={(e) => setRegionFilter(e.target.value)}
                    >
                        <option value="">Selecione</option>
                        <option value="Fortaleza">Fortaleza</option>
                        <option value="Quixadá">Quixadá</option>
                        <option value="Caucaia">Caucaia</option>
                        <option value="Eusébio">Eusébio</option>
                        <option value="Maracanaú">Maracanaú</option>
                    </select>

                    <select
                        className="p-2 border rounded-md w-full md:w-auto"
                        onChange={(e) => setSpecialtyFilter(e.target.value)}
                    >
                        <option value="">Todas as especialidades</option>
                        <option value="Ansiedade">Ansiedade</option>
                        <option value="Terapia Infantil">Terapia Infantil</option>
                        <option value="Saúde Mental">Saúde Mental</option>
                        <option value="Bem-Estar">Bem-Estar</option>
                        <option value="Depressão">Depressão</option>
                    </select>
                </div>

                <ul className="space-y-4">
                    {filteredGroups.map(group => (
                        <li key={group.id} className="p-4 border rounded-lg shadow-md bg-brand-beige">
                            <h3 className="text-xl font-bold text-desktop-bg">{group.name}</h3>
                            <p className="text-gray-700">Região: {group.region}</p>
                            <p className="text-gray-700">Especialidade: {group.specialty}</p>
                        </li>
                    ))}
                </ul>
            </div>
        </section>
    );
};

export default GroupList;