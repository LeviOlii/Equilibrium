import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Anamnesis = () => {
  const [datebirth, setDatebirth] = useState('');
  const [gender, setGender] = useState('');
  const [observation, setObservation] = useState('');
  const [goal, setGoal] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (datebirth && gender) {

      localStorage.setItem('anamnesis', JSON.stringify({ datebirth, gender, observation, goal }));
      
      navigate('/dashboard');
    } else {
      setError('Por favor, preencha todos os campos');
    }
  };

  return (
    <>
      <body className="bg-desktop-bg h-screen flex items-center justify-center">
        <div className="loginContainer text-center border-solid border-1 bg-brand-white text-black rounded-2xl font-dmSans font-extralight shadow-2xl w-full max-w-xl">
          <form className="mx-10 my-36" onSubmit={handleSubmit}>
            <h1 className="text-gray-headline font-thin text-3xl my-6 italic">Anamnese básica</h1>

            <div className="user_icon w-12 h-12 mx-auto my-5">
              <img src="src/assets/icons/signUp.png" alt="singup_icon" />
            </div>

            {error && <p className="text-red-500">{error}</p>}
            <label htmlFor="datebirth" className="block text-left">Data de Nascimento</label>
            <input
              type="date"
              placeholder="Insira sua idade"
              name="datebirth"
              id="datebirth"
              className="bg-mobile-bg italic p-2 border-2 border-solid rounded-xl shadow-md w-full"
              value={datebirth}
              onChange={(e) => setDatebirth(e.target.value)}
              required
            />
            <br />
            <label htmlFor="observation" className="block text-left mt-6">Observações</label>
            <input
              type="text"
              placeholder="Informações de saúde mental: principais queixas, histórico familiar, uso de medicamentos, etc."
              name="observation"
              id="observation"
              className="bg-mobile-bg italic mb-6 p-2 border-2 border-solid rounded-xl shadow-md w-full"
              value={observation}
              onChange={(e) => setObservation(e.target.value)}
            />
            <br />
            <label htmlFor="observation" className="block text-left">Objetivos</label>
            <input
              type="text"
              placeholder="Objetivo da terapia: ex.: ansiedade, luto, autoconhecimento, pessoas neuroatípicas."
              name="goal"
              id="goal"
              className="bg-mobile-bg italic mb-6 p-2 border-2 border-solid rounded-xl shadow-md w-full"
              value={goal}
              onChange={(e) => setGoal(e.target.value)}
            />
            <br />
            <label htmlFor="gender" className="block text-left">Sexo</label>
            <select
              name="gender"
              id="gender"
              className="bg-mobile-bg italic mb-6 p-2 border-2 border-solid rounded-xl shadow-md w-full"
              value={gender}
              onChange={(e) => setGender(e.target.value)}
              required
            >
              <option value="">Selecione</option>
              <option value="masculino">Masculino</option>
              <option value="feminino">Feminino</option>
            </select>
            <br />

            <button className="bg-mobile-bg border-2 border-solid rounded-xl shadow-md px-8 my-6 text-center py-1" type="submit">Concluir</button>
          </form>
        </div>
      </body>
    </>
  );
};

export default Anamnesis;