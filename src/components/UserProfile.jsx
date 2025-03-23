import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link, useNavigate } from "react-router-dom";


const UserProfile = () => {
  const [user, setUser] = useState(null);
  const [error, setError] = useState('');
  const navigate = useNavigate();

//colocar a opção de editar os dados tbm pfvvvvvv
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

          <div>
            <hr />
            <p className="p-4"><span className="font-bold text-desktop-bg">Nome:</span> {user.nome}
            <button className="h-5 w-5 m-2 py-0.5"><img src="src/assets/icons/edit.svg" alt="editar" /></button>
            </p>

            <hr />
            <p className="p-4"><span className="font-bold text-desktop-bg">Email:</span> {user.email}
            <button className="h-5 w-5 m-2 py-0.5"><img src="src/assets/icons/edit.svg" alt="editar" /></button>
            </p>
            
            <hr />
            <p className="p-4"><span className="font-bold text-desktop-bg">Tipo:</span> {user.tipo}</p>
            <hr />
          </div>


          
          {user.tipo === 'PACIENTE' && user.Paciente && (
            <div className="mt-4">
              <h2 className=" font-bold">Dados de Paciente</h2>
              <p className="p-4"><span className="font-bold text-desktop-bg">Idade:</span>{user.Paciente.idade}
              <button className="h-5 w-5 m-2 py-0.5"><img src="src/assets/icons/edit.svg" alt="editar" /></button>
              </p>

              <hr />
              <p className="p-4"><span className="font-bold text-desktop-bg">Gênero:</span> {user.Paciente.genero}
              <button className="h-5 w-5 m-2 py-0.5"><img src="src/assets/icons/edit.svg" alt="editar" /></button>
              </p>

              <hr />
              <p className="p-4"><span className="font-bold text-desktop-bg">Queixas:</span> {user.Paciente.queixas}
              <button className="h-5 w-5 m-2 py-0.5"><img src="src/assets/icons/edit.svg" alt="editar" /></button>
              </p>

              <hr />
              <p className="p-4"><span className="font-bold text-desktop-bg">Histórico Familiar:</span> {user.Paciente.historico_familiar}
              <button className="h-5 w-5 m-2 py-0.5"><img src="src/assets/icons/edit.svg" alt="editar" /></button>
              </p>

              <hr />
              <p className="p-4"><span className="font-bold text-desktop-bg">Uso de Medicamentos:</span> {user.Paciente.uso_medicamentos}
              <button className="h-5 w-5 m-2 py-0.5"><img src="src/assets/icons/edit.svg" alt="editar" /></button>
              </p>
              
              <hr />
              <p className="p-4"><span className="font-bold text-desktop-bg">Objetivo Terapia:</span> {user.Paciente.objetivo_terapia}
              <button className="h-5 w-5 m-2 py-0.5"><img src="src/assets/icons/edit.svg" alt="editar" /></button>
              </p>
            </div>
          )}

    
          {user.tipo === 'PROFISSIONAL' && user.Profissional && (
            <div className="mt-4">
              <h2 className="font-bold" >Dados de Profissional</h2>
              {user.Profissional.foto && <img src={user.Profissional.foto} alt="Foto do profissional" className="mt-4 w-32 h-32 rounded-full mx-auto" />}
              <button className="h-5 w-5 my-4"><img src="src/assets/icons/editimage.svg" alt="editar_imagem" /></button>

              <p className="p-4"><span className="font-bold text-desktop-bg">Especialidade:</span> {user.Profissional.especialidade}
              <button className="h-5 w-5 m-2 py-0.5"><img src="src/assets/icons/edit.svg" alt="editar" /></button>
              </p>
              
              <hr />
              <p className="p-4"><span className="font-bold text-desktop-bg">Localização:</span> {user.Profissional.localizacao}
              <button className="h-5 w-5 m-2 py-0.5"><img src="src/assets/icons/edit.svg" alt="editar" /></button>
              </p>

              <hr />
              <p className="p-4"><span className="font-bold text-desktop-bg">Faixa Etária de Atendimento:</span> {user.Profissional.faixa_etaria}
              <button className="h-5 w-5 m-2 py-0.5"><img src="src/assets/icons/edit.svg" alt="editar" /></button>
              </p>
              
              <hr />
              <p className="p-4"><span className="font-bold text-desktop-bg">Atendimentos Gratuitos:</span> {user.Profissional.atendimentos_gratuitos ? 'Sim' : 'Não'}
              <button className="h-5 w-5 m-2 py-0.5"><img src="src/assets/icons/edit.svg" alt="editar" /></button>
              </p>
            </div>
          )}

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