import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const SingUp = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState('');
  const [role, setRole] = useState('paciente');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    if (email && password && username && role) {
      localStorage.setItem('user', JSON.stringify({ email, password, username, role }));
      
      if (role === 'pacient') {
        navigate('/anamnesis');
      } else if (role === 'professional') {
        navigate('/professional');
      }
    } else {
      setError('Por favor, preencha todos os campos');
    }
  };

  return (
    <>
      <body className="bg-desktop-bg min-h-screen flex items-center justify-center">
        <div className="loginContainer text-center border-solid border-1 bg-brand-white text-black rounded-2xl font-dmSans font-extralight shadow-2xl lg:w-full lg:max-w-lg">
          <form className="mx-10 my-36" onSubmit={handleSubmit}>
            <h1 className="text-gray-headline font-thin text-3xl my-6 italic">Cadastre-se!</h1>

            <div className="user_icon w-12 h-12 mx-auto my-5">
              <img src="src/assets/icons/signUp.png" alt="singup_icon" />
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
                  value="pacient"
                  checked={role === 'pacient'}
                  onChange={(e) => setRole(e.target.value)}
                />
                <span className="ml-2">Paciente</span>
              </label>
              <label>
                <input
                  type="radio"
                  name="role"
                  value="professional"
                  checked={role === 'professional'}
                  onChange={(e) => setRole(e.target.value)}
                />
                <span className="ml-2">Profissional</span>
              </label>
            </div>

            <br />
            <button className="bg-mobile-bg border-2 border-solid rounded-xl shadow-md px-8 my-6 text-center py-1" type="submit">Cadastrar-se</button>
          </form>
        </div>
      </body>
    </>
  );
};

export default SingUp;