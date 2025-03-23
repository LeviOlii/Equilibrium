import { useEffect, useState } from "react";

const TestimonyList = () => {
    const [testimonies, setTestimonies] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchTestimonies = async () => {
            try {
                const response = await fetch("http://localhost:3000/api/testimonies");
                if (!response.ok) throw new Error("Erro ao buscar depoimentos");

                const data = await response.json();
                setTestimonies(data);
            } catch (error) {
                console.error(error);
            } finally {
                setLoading(false);
            }
        };

        fetchTestimonies();
    }, []);

    if (loading) return <p>Carregando depoimentos...</p>;

    return (
        <div className="p-4">
            <h2 className="text-2xl font-bold mb-4">Depoimentos</h2>
            {testimonies.length === 0 ? (
                <p>Nenhum depoimento encontrado.</p>
            ) : (
                <ul>
                    {testimonies.map((t) => (
                        <li key={t.id} className="border p-4 mb-4 rounded-lg shadow-md">
                            <p className="font-semibold">{t.name} - <span className="text-sm italic">{t.role}</span></p>
                            <p className="text-gray-700">{t.testimony}</p>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default TestimonyList;
