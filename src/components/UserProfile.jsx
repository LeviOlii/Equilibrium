import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link, useNavigate } from "react-router-dom";
import ProfileField from "./ProfileField";



const UserProfile = ({ userId }) => {
  const [user, setUser] = useState(null);
  const [error, setError] = useState('');
  const [currentUser, setCurrentUser] = useState(null);
  userId = parseInt(userId);
  const navigate = useNavigate();


  const handleDelete = (id) => {

  }

  //colocar a opção de editar os dados tbm pfvvvvvv
  useEffect(() => { // open someone elses profile

    const carregarDadosUsuario = async () => {
      const res = await axios.get("http://localhost:3000/api/check-auth", {
        withCredentials: true,
      });
      if (res.data.isLoggedIn) { // se ele tiver logado
        setCurrentUser(res.data.user);
        if (userId && Number.isInteger(userId) && userId >= 1) { // se tiver um :id dps do /profile
          if (res.data.user.tipo === "PACIENTE") {
            const response = await axios.get(`http://localhost:3000/api/usuarios/${userId}`);
            if (response.data.tipo === "PACIENTE" || response.data.tipo === "ADMIN") {
              navigate('/');
            } else {
              setUser(response.data);
            }
          } else { // isso daq é se o cara for profissional
            const response = await axios.get(`http://localhost:3000/api/usuarios/${userId}`);
            if (response.data.tipo === "ADMIN") {
              navigate('/');
            }
            else {
              setUser(response.data);
            }
          }
        } else { // se n tiver :id, abre o perfil dele
          try {
            const userId = res.data.user.id;
            const response = await axios.get(`http://localhost:3000/api/usuarios/${userId}`);
            setUser(response.data);
          } catch (err) {
            setError('Erro ao carregar os dados');
          }
        }
      }
      else { // n ta logado
        navigate('/login');
      };
    }
    carregarDadosUsuario();
  }, []);

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
            <ProfileField label="Nome" value={user.nome} canEdit={currentUser.id === user.id || currentUser.tipo === "ADMIN"} />
            <hr />
            <ProfileField label="Email" value={user.email} canEdit={currentUser.id === user.id || currentUser.tipo === "ADMIN"} />
            <hr />
            <ProfileField label="Tipo" value={user.tipo} canEdit={false} />
            <hr />
          </div>

          {user.tipo === 'PACIENTE' && user.Paciente && (
            <div className="mt-4">
              <h2 className=" font-bold">Dados de Paciente</h2>
              <ProfileField label="Idade" value={user.Paciente.idade} canEdit={currentUser.id === user.id || currentUser.tipo === "ADMIN"} />
              <hr />
              <ProfileField label="Genero" value={user.Paciente.genero} canEdit={currentUser.id === user.id || currentUser.tipo === "ADMIN"} />
              <hr />
              <ProfileField label="Queixas" value={user.Paciente.queixas} canEdit={currentUser.id === user.id || currentUser.tipo === "ADMIN"} />
              <hr />
              <ProfileField label="Queixas" value={user.Paciente.historico_familiar} canEdit={currentUser.id === user.id || currentUser.tipo === "ADMIN"} />
              <hr />
              <ProfileField label="Uso de medicamentos" value={user.Paciente.uso_medicamentos} canEdit={currentUser.id === user.id || currentUser.tipo === "ADMIN"} />
              <hr />
              <ProfileField label="Objetivo da terapia" value={user.Paciente.objetivo_terapia} canEdit={currentUser.id === user.id || currentUser.tipo === "ADMIN"} />
            </div>
          )}


          {user.tipo === 'PROFISSIONAL' && user.Profissional && (
            <div className="mt-4">
              <h2 className="font-bold" >Dados de Profissional</h2>
              {user.Profissional.foto && <img src={user.Profissional.foto} alt="Foto do profissional" className="mt-4 w-32 h-32 rounded-full mx-auto" />}
              {currentUser.id === user.id || currentUser.tipo === "ADMIN" && (<button className="h-5 w-5 my-4"><img src="https://www.svgrepo.com/show/522527/edit-3.svg" alt="editar_imagem" /></button>)}
              <ProfileField label="Especialidade" value={user.Profissional.especialidade} canEdit={currentUser.id === user.id || currentUser.tipo === "ADMIN"} />
              <hr />
              <ProfileField label="Localização" value={user.Profissional.localizacao} canEdit={currentUser.id === user.id || currentUser.tipo === "ADMIN"} />
              <hr />
              <ProfileField label="Faixa etária de atendimento" value={user.Profissional.faixa_etaria} canEdit={currentUser.id === user.id || currentUser.tipo === "ADMIN"} />
              <hr />
              <ProfileField label="Atendimentos gratuitos" value={user.Profissional.atendimentos_gratuitos ? 'Sim' : 'Não'} canEdit={currentUser.id === user.id || currentUser.tipo === "ADMIN"} />
            </div>
          )}

         
          <Link to="/">
            <button className="border-2 border-desktop-bg px-6 py-2 m-2 rounded-full hover:bg-desktop-bg hover:text-brand-white transition">
              Home
            </button>
            {currentUser.tipo === 'ADMIN' && (
            <button className="border-2 border-desktop-bg px-6 py-2 m-2 rounded-full hover:bg-red-600 hover:text-brand-white transition">
              Delete
            </button>
            )}
            
          </Link>

        </div>
      )}
    </div>
  );
};

export default UserProfile;