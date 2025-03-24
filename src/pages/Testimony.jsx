import React, { useState, useEffect } from "react";

const Testimony = ({ userId }) => {
    const [user, setUser] = useState(null);
    const [testimony, setTestimony] = useState("");
    const [isAnonymous, setIsAnonymous] = useState(false);

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const response = await fetch(`/api/users/${userId}`);
                const data = await response.json();
                setUser(data);
            } catch (error) {
                console.error("Erro ao buscar usuário:", error);
            }
        };
        
        if (userId) {
            fetchUser();
        }
    }, [userId]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        const newTestimony = {
            name: isAnonymous ? "Anônimo" : user?.name,
            role: isAnonymous ? "" : user?.role,
            testimony,
        };

        console.log("Novo depoimento enviado:", newTestimony);

        setTestimony("");
        setIsAnonymous(false);
    };

    return (
        <section className="bg-white px-8 md:px-16 font-sans pt-20 pb-36">
            <div className="max-w-2xl mx-auto bg-gray-100 p-8 rounded-xl shadow-lg">
                <h2 className="text-3xl font-bold text-gray-800 text-center mb-6">Deixe seu Depoimento</h2>
                <p className="text-gray-600 text-center mb-6">Compartilhe sua experiência e ajude outras pessoas a conhecerem a Equilibrium.</p>
                
                <form onSubmit={handleSubmit} className="space-y-4">
                    <textarea
                        placeholder="Escreva seu depoimento..."
                        value={testimony}
                        onChange={(e) => setTestimony(e.target.value)}
                        className="w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
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
                        className="w-full bg-green-500 hover:bg-green-600 text-white font-bold py-3 rounded-md transition"
                    >
                        Enviar Depoimento
                    </button>
                </form>
            </div>
        </section>
    );
};

export default Testimony;

