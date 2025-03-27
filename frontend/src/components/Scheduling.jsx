import { useState } from 'react';

export default function Scheduling({ onClose }) {
    const [selectedTime, setSelectedTime] = useState(null);

    return (
      <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
        <div className="relative bg-white p-6 rounded-lg shadow-lg w-80">
          <button className="absolute top-2 right-2 text-xl" onClick={onClose}>
            ×
          </button>
          <h2 className="text-xl font-semibold mb-4">Escolha um horário</h2>
          <ul className="mb-4"> {/* Adicionei margin-bottom para espaçar o botão Confirmar */}
            {["08:00", "10:00", "14:00", "16:00"].map((time) => (
              <li key={time} className="my-2 ">
                <button 
                  className={`w-full p-2 border rounded ${
                    selectedTime === time ? 'bg-desktop-bg -hover text-white' : 'hover:bg-gray-200'
                  }`}
                  onClick={() => setSelectedTime(time)}
                >
                  {time}
                </button>
              </li>
            ))}
          </ul>
          
          {/* Botão Confirmar (aparece apenas se selectedTime não for nulo) */}
          {selectedTime && (
            <button
              className="w-full p-2 bg-desktop-bg text-white rounded hover:opacity-90 transition-opacity"
              onClick={() => {
                alert(`Horário ${selectedTime} confirmado!`); // Exemplo de ação
                onClose(); // Fecha o modal após confirmar (opcional)
              }}
            >
              Confirmar
            </button>
          )}
        </div>
      </div>
    );
}