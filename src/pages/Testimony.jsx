import React, { useState, useEffect } from "react";
import axios from "axios";

const Testimony = () => {
    const [testimonies, setTestimonies] = useState([]);
    const [name, setName] = useState("");
    const [role, setRole] = useState("");
    const [testimony, setTestimony] = useState("");
    const [isAnonymous, setIsAnonymous] = useState(false);

    useEffect(() => {
        axios.get("http://localhost:3001/api/depoimentos")
            .then(response => setTestimonies(response.data))
            .catch(error => console.error("Erro ao buscar depoimentos:", error));
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const newTestimony = {
            name: isAnonymous ? "Anônimo" : name,
            role: isAnonymous ? "" : role,
            testimony,
        };

        try {
            const response = await axios.post("http://localhost:3001/api/depoimentos", newTestimony);
            setTestimonies([response.data, ...testimonies]);
            setName("");
            setRole("");
            setTestimony("");
            setIsAnonymous(false);
        } catch (error) {
            console.error("Erro ao enviar depoimento:", error);
        }
    };

    return (
        <section className="px-8 md:px-16 pt-20 pb-36">
            <div className="max-w-2xl mx-auto bg-white p-8 rounded-xl shadow-lg">
                <h2 className="text-3xl font-bold text-center mb-6">Deixe seu Depoimento</h2>
                <form onSubmit={handleSubmit} className="space-y-4">
                    {!isAnonymous && (
                        <>
                            <input type="text" placeholder="Seu nome" value={name} onChange={(e) => setName(e.target.value)} className="w-full p-3 border rounded-md" required />
                            <input type="text" placeholder="Sua ocupação" value={role} onChange={(e) => setRole(e.target.value)} className="w-full p-3 border rounded-md" required />
                        </>
                    )}
                    <textarea placeholder="Escreva seu depoimento..." value={testimony} onChange={(e) => setTestimony(e.target.value)} className="w-full p-3 border rounded-md" rows="4" required></textarea>
                    <div className="flex items-center space-x-2">
                        <input type="checkbox" checked={isAnonymous} onChange={() => setIsAnonymous(!isAnonymous)} className="w-5 h-5" />
                        <label>Enviar como anônimo</label>
                    </div>
                    <button type="submit" className="w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-3 rounded-md transition">Enviar Depoimento</button>
                </form>
            </div>

            <div className="mt-10 max-w-3xl mx-auto">
                <h3 className="text-2xl font-bold text-center mb-6">Depoimentos</h3>
                <div className="space-y-4">
                    {testimonies.length > 0 ? (
                        testimonies.map((t, index) => (
                            <div key={index} className="bg-gray-100 p-4 rounded-md shadow">
                                <p className="italic">"{t.testimony}"</p>
                                <div className="font-bold">{t.name}</div>
                                <div className="text-sm text-gray-600">{t.role}</div>
                            </div>
                        ))
                    ) : (
                        <p className="text-center text-gray-600">Nenhum depoimento ainda.</p>
                    )}
                </div>
            </div>
        </section>
    );
};

export default Testimony;

