import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const ProfessionalForm = ({username,email,password, role, goToFirstForm, setError, error}) => {
  const [speciality, setSpeciality] = useState('');
  const [address, setAddress] = useState('');
  const [freeService, setFreeService] = useState('');
  const [maxAge, setMaxAge] = useState('');
  const [minAge, setMinAge] = useState('');
  const navigate = useNavigate();

  const ParseNumber = (setter) => (e) => {
    const value = e.target.value
    if (value >= 0){
      setter(value);
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault();


    if (parseInt(minAge) > parseInt(maxAge)) {
      setError('A idade mínima não pode ser maior que a idade máxima');
      return;
    }

    if (speciality && address) {
      localStorage.setItem('professionalDatas', JSON.stringify({ speciality, freeService, address, minAge, maxAge }));
      navigate('/dashboard');
    } else {
      setError('Por favor, preencha todos os campos corretamente');
    }
  };

  return (
    <>
      <div className="bg-desktop-bg h-screen flex items-center justify-center">
        <div className="loginContainer text-center border-solid border-1 bg-brand-white text-black rounded-2xl font-dmSans font-extralight shadow-2xl w-full max-w-xl">
          <form className="mx-10 my-36" onSubmit={handleSubmit}>
            <h1 className="text-gray-headline font-thin text-3xl my-6 italic">Cadastro do profissional</h1>

            <div className="user_icon w-12 h-12 mx-auto my-5">
              <img src="src/assets/icons/signUp.png" alt="signup_icon" />
            </div>

            {error && <p className="text-red-500">{error}</p>}
            <label htmlFor="speciality" className="block text-left">Especialidade</label>
            <input
              type="text"
              placeholder="Insira sua especialidade"
              name="speciality"
              id="speciality"
              className="bg-mobile-bg italic p-2 border-2 border-solid rounded-xl shadow-md w-full"
              value={speciality}
              onChange={(e) => setSpeciality(e.target.value)}
              required
            />
            <br />
            <label htmlFor="localization" className="block text-left mt-6">Localização</label>
            <input
              type="text"
              placeholder="Informações de saúde mental: principais queixas, histórico familiar, uso de medicamentos, etc."
              name="address"
              id="address"
              className="bg-mobile-bg italic mb-6 p-2 border-2 border-solid rounded-xl shadow-md w-full"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              required
            />
            <br />
            <label htmlFor="ageRange" className="block text-left">Faixa etária de atendimento desejada</label>
            <div className="flex justify-between">
              <input
                type="number"
                placeholder="Idade mínima"
                name="minAge"
                id="minAge"
                className="bg-mobile-bg italic p-2 border-2 border-solid rounded-xl shadow-md w-1/2 mr-2"
                value={minAge}
                onChange={ParseNumber(setMinAge)}
              />
              <input
                type="number"
                placeholder="Idade máxima"
                name="maxAge"
                id="maxAge"
                className="bg-mobile-bg italic p-2 border-2 border-solid rounded-xl shadow-md w-1/2 ml-2"
                value={maxAge}
                onChange={ParseNumber(setMaxAge)}
              />
            </div>
            <br />
            <label htmlFor="freeServices" className="block text-left">Atendimentos gratuitos</label>
            <input
              type="number"
              placeholder="Quantidade de atendimentos gratuitos a oferecer"
              name="freeService"
              id="freeService"
              className="bg-mobile-bg italic mb-6 p-2 border-2 border-solid rounded-xl shadow-md w-full"
              value={freeService}
              onChange={ParseNumber(setFreeService)}
            />
            <br />

            <button className="bg-mobile-bg border-2 border-solid rounded-xl shadow-md px-8 my-6 text-center py-1" type="submit">Concluir</button>
          </form>
        </div>
      </div>
    </>
  );
};

export default ProfessionalForm;