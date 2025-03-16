import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';


const SignUp = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState('');
  const [role, setRole] = useState('paciente');
  const [error, setError] = useState('');

  const [step, setStep] = useState(1);

  const [datebirth, setDatebirth] = useState('');
  const [gender, setGender] = useState('');
  const [complaints, setComplaints] = useState('');
  const [familyHistory, setFamilyHistory] = useState('');
  const [medication, setMedication] = useState('');
  const [goal, setGoal] = useState('');
  
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();

    if (datebirth && gender && complaints && familyHistory && medication && goal){

      try{
        const userData = {nome: username, email: email, senha: password, tipo: role.toUpperCase()}
        console.log(userData)
        const user = await axios.post("http://localhost:3000/api/auth/signup", userData)  

        navigate('/dashboard')

      } catch(error){

        if (error?.response?.status === 409){
          console.log(error.response.status)
          setError("Email ja está cadastrado")
          setStep(1);
        }else{
          setError(error?.data?.message || error?.message)
        }
        
      }
    
    }
    
    


  }

  const handleFirstSubmit = async (e) => {
    e.preventDefault();

    if (email && password && username && role) {
      
      try{

        setStep(2);    

      } catch(error){
          setError(error?.data?.message || error?.message)
      }

    } else {
      setError('Por favor, preencha todos os campos');
    }

    setError('');
  };

  return (
    step === 1 ?(  
      <div className="bg-desktop-bg min-h-screen flex items-center justify-center">
        <div className="loginContainer text-center border-solid border-1 bg-brand-white text-black rounded-2xl font-dmSans font-extralight shadow-2xl lg:w-full lg:max-w-lg">
          <form className="mx-10 my-36" onSubmit={(e) => handleFirstSubmit(e)}>
            <h1 className="text-gray-headline font-thin text-3xl my-6 italic">Cadastre-se!</h1>

            <div className="user_icon w-12 h-12 mx-auto my-5">
              <img src="src/assets/icons/signUp.png" alt="SignUp_icon" />
            </div>

            {error && <p className="text-red-500">{error}</p>}
            
            <input
              type="text"
              placeholder="Insira seu nome"
              name="email"
              id="email"
              className="bg-mobile-bg italic my-6 p-1 border-2 border-solid rounded-xl shadow-md px-14 text-center"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
            <br />
            <input
              type="email"
              placeholder="Insira seu email"
              name="email"
              id="email"
              className="bg-mobile-bg italic p-1 border-2 border-solid rounded-xl shadow-md px-14 text-center"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <br />
            <input
              type="password"
              placeholder="Insira sua senha"
              name="psw"
              className="bg-mobile-bg italic my-6 p-1 border-2 border-solid rounded-xl shadow-md px-14 text-center"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />

            <br />

            <div className="my-6">
              <label className="mr-8">
                <input
                  type="radio"
                  name="role"
                  value="paciente"
                  checked={role === 'paciente'}
                  onChange={(e) => setRole(e.target.value)}
                />
                <span className="ml-2">Paciente</span>
              </label>
              <label>
                <input
                  type="radio"
                  name="role"
                  value="profissional"
                  checked={role === 'profissional'}
                  onChange={(e) => setRole(e.target.value)}
                />
                <span className="ml-2">Profissional</span>
              </label>
            </div>

            <br />
            <button className="bg-mobile-bg border-2 border-solid rounded-xl shadow-md px-8 my-6 text-center py-1" type="submit">Cadastrar-se</button>
          </form>
        </div>
      </div>
    )
    :
    (
      <div className="bg-desktop-bg h-screen flex items-center justify-center lg:h-full lg:p-12">
        <div className="loginContainer text-center border-solid border-1 bg-brand-white text-black rounded-2xl font-dmSans font-extralight shadow-2xl w-full max-w-xl">
          <form className="mx-10 my-36" onSubmit={(e) => handleRegister(e)}>
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
      </div>

    )
  );
};

export default SignUp;