import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from "axios";
import { Link } from 'react-router-dom';

const AccountLogin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const userData = { email: email, senha: password }

    if (email && password) {
      try {
        const user = await axios.post("http://localhost:3000/api/login", userData, {
          withCredentials: true
        });


        navigate('/');

      } catch (error) {
        setError(error?.response?.data?.message || error?.message)
      }

    } else {
      setError('Email ou senha incorretos');
    }
  };

  return (
    <>
      <div className="bg-desktop-bg h-screen flex items-center justify-center">
        <div className="loginContainer text-center border-solid border-1 bg-brand-white text-black rounded-2xl font-dmSans font-extralight shadow-2xl lg:w-full lg:max-w-md">
          <form className="mx-10 my-36" onSubmit={(e) => handleSubmit(e)}>
            <h1 className="text-gray-headline font-thin text-3xl my-6 italic">Seja bem-vindo(a)!</h1>

            <div className="user_icon w-12 h-12 mx-auto my-5">
              <img src="https://www.svgrepo.com/show/522697/user-round.svg" alt="user_icon" />
            </div>

            {error && <p className="text-red-500">{error}</p>}

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
            <Link to="/signup">
            <p className="text-gray-headline">Não possui uma conta?</p>
            </Link>
            <br />
            {/* <a className="text-gray-headline" href="_blank">Esqueceu sua senha?</a>
            <br /> */}
            <button className="bg-mobile-bg border-2 border-solid rounded-xl shadow-md px-8 my-6 text-center py-1" type="submit">Login</button>
          </form>
        </div>
      </div>
    </>
  );
};

export default AccountLogin;