import { useState } from 'react';
import Anamnesis from "./Anamnesis.jsx";
import ProfessionalForm from "./ProfessionalForm.jsx"
import { Link } from 'react-router-dom';

const SignUp = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState('');
  const [role, setRole] = useState('paciente');
  const [error, setError] = useState('');
  
  const [step, setStep] = useState(1);

  const goToFirstForm = () => {
    setStep(1);
  };
  
  const handleFirstSubmit = async (e) => {
    e.preventDefault();

    if (email && password && username && role) {
      
      try{
        if (role === "paciente"){
          setStep(2);
        } else if (role === "profissional"){
          setStep(3);
        }
            
      } catch(error){
          setError(error?.data?.message || error?.message)
      }

    } else {
      setError('Por favor, preencha todos os campos');
    }

    setError('');
  };


  const steps = {
    1: (
      <div className="bg-desktop-bg min-h-screen flex items-center justify-center">
        <div className="loginContainer text-center border-solid border-1 bg-brand-white text-black rounded-2xl font-dmSans font-extralight shadow-2xl lg:w-full lg:max-w-lg">
          <form className="mx-10 my-36" onSubmit={(e) => handleFirstSubmit(e)}>
            <h1 className="text-gray-headline font-thin text-3xl my-6 italic">Cadastre-se!</h1>

            <div className="user_icon w-12 h-12 mx-auto my-5">
              <img src="https://cdn-icons-png.flaticon.com/128/684/684831.png" alt="SignUp_icon" />
            </div>

            {error && <p className="text-red-500">{error}</p>}
            
            <input
              type="text"
              placeholder="Insira seu nome"
              name="nome"
              id="nome"
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
            <Link to="/login">
            <p className="-my-3 text-gray-headline">Já possui uma conta?</p>
            </Link>
          </form>
        </div>
      </div>
    ),
    2: (
      <Anamnesis 
        username={username}
        email={email}
        password={password}
        role={role}
        goToFirstForm={goToFirstForm}
        setError={setError}
        error={error}
      />
    ),
    3: (
      <ProfessionalForm 
      username={username}
      email={email}
      password={password}
      role={role}
      goToFirstForm={goToFirstForm}
      setError={setError}
      error={error}
      />
    )
  };

  return steps[step];

};

export default SignUp;