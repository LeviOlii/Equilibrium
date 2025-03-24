import { useTestimony } from "../context/TestimonyContext";

const TestimonyList = () => {
    const { testimonies } = useTestimony();

    return (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {testimonies.length > 0 ? (
                testimonies.map(({ id, content, user }) => (
                    <div key={id} className="bg-gray-100 p-4 rounded-lg shadow-md">
                        <p className="italic">"{content}"</p>
                        <p className="text-right text-sm text-gray-700 mt-2">- {user.name} ({user.role})</p>
                    </div>
                ))
            ) : (
                <p className="text-center text-gray-600">Nenhum testemunho ainda.</p>
            )}
        </div>
    );
};

export default TestimonyList;

