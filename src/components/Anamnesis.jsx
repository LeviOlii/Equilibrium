import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Anamnesis = () => {
  const [datebirth, setDatebirth] = useState('');
  const [gender, setGender] = useState('');
  const [complaints, setComplaints] = useState('');
  const [familyHistory, setFamilyHistory] = useState('');
  const [medication, setMedication] = useState('');
  const [goal, setGoal] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (datebirth && gender) {

      localStorage.setItem('Anamnesis', JSON.stringify({ datebirth, gender, complaints, familyHistory, medication, goal }));
      
      navigate('/dashboard');
    } else {
      setError('Por favor, preencha todos os campos');
    }
  };

  return (
    <>
      <body className="bg-desktop-bg h-screen flex items-center justify-center lg:h-full lg:p-12">
        <div className="loginContainer text-center border-solid border-1 bg-brand-white text-black rounded-2xl font-dmSans font-extralight shadow-2xl w-full max-w-xl">
          <form className="mx-10 my-36" onSubmit={handleSubmit}>
            <h1 className="text-gray-headline font-thin text-3xl my-6 italic">Cadastro do paciente</h1>

            <div className="user_icon w-12 h-12 mx-auto my-5">
              <img src="src/assets/icons/signUp.png" alt="signup_icon" />
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

            <label htmlFor="complaints" className="block text-left mt-6">Queixas</label>
            <input
              type="text"
              placeholder="Principais queixas"
              name="complaints"
              id="complaints"
              className="bg-mobile-bg italic mb-1 p-2 border-2 border-solid rounded-xl shadow-md w-full"
              value={complaints}
              onChange={(e) => setComplaints(e.target.value)}
            />
            

            <label htmlFor="familyHistory" className="block text-left mt-6">Histórico Familiar</label>
            <input
              type="text"
              placeholder="Informe seu histórico familiar (ex.: doenças)"
              name="familyHistory"
              id="familyHistory"
              className="bg-mobile-bg italic mb-1 p-2 border-2 border-solid rounded-xl shadow-md w-full"
              value={familyHistory}
              onChange={(e) => setFamilyHistory(e.target.value)}
            />


            <label htmlFor="medication" className="block text-left mt-6">Uso de medicamentos</label>
            <input
              type="text"
              placeholder="Você faz uso de medicamentos?"
              name="medication"
              id="medication"
              className="bg-mobile-bg italic mb-6 p-2 border-2 border-solid rounded-xl shadow-md w-full"
              value={medication}
              onChange={(e) => setMedication(e.target.value)}
            />

            <label htmlFor="goal" className="block text-left">Objetivos</label>
            <input
              type="text"
              placeholder="Objetivo da terapia: ex.: ansiedade, luto, autoconhecimento, pessoas neuroatípicas."
              name="goal"
              id="goal"
              className="bg-mobile-bg italic mb-6 p-2 border-2 border-solid rounded-xl shadow-md w-full"
              value={goal}
              onChange={(e) => setGoal(e.target.value)}
            />

            <label htmlFor="gender" className="block text-left">Gênero</label>
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