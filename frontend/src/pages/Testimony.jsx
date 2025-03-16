import React, { useState } from "react";

const Testimony = () => {
    const [name, setName] = useState("");
    const [role, setRole] = useState("");
    const [testimony, setTestimony] = useState("");
    const [isAnonymous, setIsAnonymous] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();
        
        const newTestimony = {
            name: isAnonymous ? "Anônimo" : name,
            role: isAnonymous ? "" : role,
            testimony,
        };

        console.log("Novo depoimento enviado:", newTestimony);

        setName("");
        setRole("");
        setTestimony("");
        setIsAnonymous(false);
    };

    return (
        <section className="bg-brand-white px-8 md:px-16 font-dmSans pt-20 pb-36">
            <div className="max-w-2xl mx-auto bg-white p-8 rounded-xl shadow-lg">
                <h2 className="text-3xl font-bold text-desktop-bg text-center mb-6">Deixe seu Depoimento</h2>
                <p className="text-gray-600 text-center mb-6">Compartilhe sua experiência e ajude outras pessoas a conhecerem a Equilibrium.</p>
                
                <form onSubmit={handleSubmit} className="space-y-4">
                    {!isAnonymous && (
                        <>
                            <input
                                type="text"
                                placeholder="Seu nome"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                className="w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-brand-green"
                                required
                            />
                            <input
                                type="text"
                                placeholder="Sua ocupação"
                                value={role}
                                onChange={(e) => setRole(e.target.value)}
                                className="w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-brand-green"
                                required
                            />
                        </>
                    )}
                    <textarea
                        placeholder="Escreva seu depoimento..."
                        value={testimony}
                        onChange={(e) => setTestimony(e.target.value)}
                        className="w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-brand-green"
                        rows="4"
                        required
                    ></textarea>
                    <div className="flex items-center space-x-2">
                        <input
                            type="checkbox"
                            checked={isAnonymous}
                            onChange={() => setIsAnonymous(!isAnonymous)}
                            className="w-5 h-5"
                        />
                        <label className="text-gray-700">Enviar como anônimo</label>
                    </div>
                    <button
                        type="submit"
                        className="w-full bg-brand-green hover:bg-brand-green-hover text-white font-bold py-3 rounded-md transition"
                    >
                        Enviar Depoimento
                    </button>
                </form>
            </div>
        </section>
    );
};

export default Testimony;
