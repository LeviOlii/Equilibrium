import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
const ProfessionalForm = ({username,email,password, role, goToFirstForm, setError, error}) => {
  const [speciality, setSpeciality] = useState('');
  const [address, setAddress] = useState('');
  const [freeService, setFreeService] = useState();
  const [ageRange, setAgeRange] = useState('');
  const navigate = useNavigate();

  const ParseNumber = (setter) => (e) => {
    const value = e.target.value
    if (value >= 0){
      setter(value);
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    if (speciality && address) {
      try{
        const userData = 
        {
          nome: username,
          email: email,
          senha: password,
          tipo: role,
          pacienteData: null,
          profissionalData:{
            especialidade: speciality,
            localizacao: address,
            faixa_etaria: ageRange,
            atendimentos_gratuitos: freeService,
            foto: "1", // implement form of this  
          }        
        }

        console.log(userData);

        const user = await axios.post("http://localhost:3000/api/usuarios", userData)  

        navigate('/dashboard')

      } catch(error){
          if (error?.response?.status === 409){
            console.log(error.response.status)
            setError("Email ja está cadastrado")
            goToFirstForm();
          }else{
            setError(error?.data?.message || error?.message)
          }
      }
      
    } else {
      setError('Por favor, preencha todos os campos corretamente');
    }
  };

  return (
    <>
      <div className="bg-desktop-bg h-screen flex items-center justify-center">
        <div className="loginContainer text-center border-solid border-1 bg-brand-white text-black rounded-2xl font-dmSans font-extralight shadow-2xl w-full max-w-xl">
          <form className="mx-10 my-36" onSubmit={(e) => handleSubmit(e)}>
            <h1 className="text-gray-headline font-thin text-3xl my-6 italic">Cadastro do profissional</h1>

            <div className="user_icon w-12 h-12 mx-auto my-5">
              <img src="src/assets/icons/signUp.png" alt="signup_icon" />
            </div>

            {error && <p className="text-red-500">{error}</p>}
            <label htmlFor="speciality" className="block text-left">Especialidade</label>
            <select
              type="text"
              placeholder="Insira sua especialidade"
              name="speciality"
              id="speciality"
              className="bg-mobile-bg italic p-2 border-2 border-solid rounded-xl shadow-md w-full"
              value={speciality}
              onChange={(e) => setSpeciality(e.target.value)}
              required
          
              >
                <option value="">Selecione</option>
                <option value="terapia_infantil">Terapia Infantil</option>
                <option value="ansiedade">Ansiedade</option>
                <option value="depressao">Depressão</option>
                <option value="terapia_casal">Terapia de Casal</option>
            </select>
            <br />
            <label htmlFor="localization" className="block text-left mt-6">Localização</label>
            <select
              type="text"
              placeholder="Localização"
              name="address"
              id="address"
              className="bg-mobile-bg italic mb-6 p-2 border-2 border-solid rounded-xl shadow-md w-full"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              required
            >
              <option value="">Selecione</option>
              <option value="SP">São Paulo</option>
              <option value="RJ">Rio De Janeiro</option>
              <option value="MG">Minas Gerais</option>
              <option value="BH">Bahia</option>
              <option value="PR">Paraná</option>
            </select>
            <br />
            <label htmlFor="ageRange" className="block text-left">Faixa etária de atendimento desejada</label>
            <div className="flex justify-between">
              <select
                type="text"
                placeholder="Faixa etária"  
                name="ageRange"
                id="ageRange"
                className="bg-mobile-bg italic p-2 border-2 border-solid rounded-xl shadow-md w-full mr-2"
                value={ageRange}
                onChange={(e) => setAgeRange(e.target.value)}
              >
              <option value="">Selecione</option>
              <option value="crianca">Crianças</option>
              <option value="adolescentes">Adolescentes</option>
              <option value="adultos">Adultos</option>
              <option value="idosos">Idosos</option>
              </select>
              
            </div>
            <br />
            <label htmlFor="freeServices" className="block text-left">Atendimentos gratuitos</label>
            <select
              type="number"
              placeholder="Oferecer atendimentos gratuitos?"
              name="freeService"
              id="freeService"
              className="bg-mobile-bg italic mb-6 p-2 border-2 border-solid rounded-xl shadow-md w-full"
              value={freeService}
              onChange={(e) => setFreeService(e.target.value === "true")}
            >
              <option value="">Selecione</option>
              <option value="true">Sim</option>
              <option value="false">Não</option>
              
            </select>
            <br />
    
            
            <button className="bg-mobile-bg border-2 border-solid rounded-xl shadow-md px-8 my-6 text-center py-1" type="submit">Concluir</button>
          </form>
        </div>
      </div>
    </>
  );
};

export default ProfessionalForm;