import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link, useNavigate } from "react-router-dom";


const UserProfile = () => {
  const [user, setUser] = useState(null);
  const [error, setError] = useState('');
  const navigate = useNavigate();

//colocar a opção de editar os dados tbm
  useEffect(() => {
    const carregarDadosUsuario = async () => {
      try {
        const resId = await axios.get("http://localhost:3000/api/check-auth", {
          withCredentials: true,
          });

          if (resId.data.isLoggedIn) {
              const userId = resId.data.user.id;
              const response = await axios.get(`http://localhost:3000/api/usuarios/${userId}`);
              setUser(response.data);      
          } else {
              navigate('/login');
          }

       
      } catch (err) {
        setError('Erro ao carregar os dados');
      }
    };

    carregarDadosUsuario();
  });

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <div className='bg-desktop-bg h-screen flex items-center justify-center'>
      {user && (
        <div className="loginContainer text-center border-1 bg-brand-white text-black rounded-2xl font-dmSans font-light shadow-2xl lg:w-full lg:max-w-md">
          <div>
            <h1 className="font-extrabold text-2xl p-4">Perfil do usuário</h1>
            <p className="pb-4">Essa página infoma dados sobre o usuário.</p>
            <hr />
          </div>
          <p className="p-4">ID: {user.id}</p>
          <hr />
          <p className="p-4">Nome: {user.nome}</p>
          <hr />
          <p className="p-4">Email: {user.email}</p>
          <hr />
          <p className="p-4">Tipo: {user.tipo}</p>
          <hr />
          <Link to="/">
                        <button className="border-2 border-desktop-bg px-6 py-2 m-2 rounded-full hover:bg-desktop-bg hover:text-brand-white transition">
                            Home
                        </button>
          </Link>
        </div>
      )}
    </div>
  );
};

export default UserProfile;