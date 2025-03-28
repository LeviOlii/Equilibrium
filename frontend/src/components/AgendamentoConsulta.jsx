import { useState, useEffect } from 'react';
import axios from 'axios';

export default function AgendamentoConsulta({ profissional, paciente, onClose }) {
  const [availableSlots, setAvailableSlots] = useState([]);
  const [selectedSlot, setSelectedSlot] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchAvailability = async () => {
      try {
        const response = await axios.get(
          `/api/disponibilidades?profissional_id=${profissional.id}&disponivel=true`,
          { withCredentials: true }
        );
        
        const now = new Date();
        const slots = response.data
          .filter(d => new Date(d.dataHora) > now)
          .map(d => ({
            id: d.id,
            horario: new Date(d.dataHora).toLocaleTimeString('pt-BR', { 
              hour: '2-digit', 
              minute: '2-digit' 
            }),
            dataCompleta: d.dataHora
          }));

        setAvailableSlots(slots);
      } catch (err) {
        setError('Erro ao carregar horários');
      } finally {
        setLoading(false);
      }
    };

    fetchAvailability();
  }, [profissional.id]);

  const handleAgendamento = async () => {
    try {
      await axios.post('/api/sessoes', {
        profissional_id: profissional.id,
        paciente_id: paciente.id,
        disponibilidade_id: selectedSlot.id,
        status: "Agendado"
      }, { withCredentials: true });

      alert(`Consulta agendada para ${selectedSlot.horario}!`);
      onClose();
    } catch (err) {
      setError(err.response?.data?.error || 'Erro ao agendar');
    }
  };

  if (loading) return <div>Carregando...</div>;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-white p-6 rounded-lg w-96">
        <h2 className="text-xl font-bold mb-4">Agendar com {profissional.nome}</h2>
        
        {error && <div className="text-red-500 mb-4">{error}</div>}

        <div className="mb-6">
          <h3 className="font-semibold mb-2">Horários Disponíveis:</h3>
          <div className="grid grid-cols-2 gap-2">
            {availableSlots.map(slot => (
              <button
                key={slot.id}
                className={`p-2 border rounded ${
                  selectedSlot?.id === slot.id 
                    ? 'bg-blue-500 text-white' 
                    : 'hover:bg-gray-100'
                }`}
                onClick={() => setSelectedSlot(slot)}
              >
                {slot.horario}
              </button>
            ))}
          </div>
        </div>

        <div className="flex justify-end gap-2">
          <button 
            className="px-4 py-2 border rounded"
            onClick={onClose}
          >
            Cancelar
          </button>
          <button
            className="px-4 py-2 bg-blue-500 text-white rounded disabled:opacity-50"
            onClick={handleAgendamento}
            disabled={!selectedSlot}
          >
            Confirmar
          </button>
        </div>
      </div>
    </div>
  );
}