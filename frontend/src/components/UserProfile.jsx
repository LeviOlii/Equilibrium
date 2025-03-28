import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link, useNavigate } from "react-router-dom";


const UserProfile = ({ userId }) => {
  const [user, setUser] = useState(null);
  const [error, setError] = useState('');
  const [currentUser, setCurrentUser] = useState(null);
  userId = parseInt(userId);
  const navigate = useNavigate();
  const [edit, setEdit] = useState(false);
  const [editedUser, setEditedUser] = useState({});

  
  useEffect(() => {
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
  }, [user]);

  const handleEditClick = async () => {
    // iterar
      // se de profissional abrir outro for loop
    if(edit){
      try{
        const updatedUser = { ...user };

        for (const key in editedUser) {
          if (typeof editedUser[key] === "object" && editedUser[key] !== null) {
            updatedUser[key] = { ...updatedUser[key], ...editedUser[key] };
          } else {
            updatedUser[key] = editedUser[key];
          }
        }
              
        const res = await axios.put(`http://localhost:3000/api/usuarios/${user.id}`, updatedUser, {
          withCredentials: true,
        });
        

        setUser(res.data);
        
      
      } catch (error){
        setError("falha ao atualizar");
      }
    }
    setEdit(!edit);
  };

  const handleDelete = async () => {
    try{
      const res = await axios.delete(`http://localhost:3000/api/usuarios/${user.id}`, {
        withCredentials: true
      })
      if (currentUser.id === user.id){
        await axios.post("http://localhost:3000/api/logout", {}, { withCredentials: true });
        navigate('/');
      } else {
        if (currentUser.tipo === "ADMIN"){
          navigate('/dashboard');  
        } else {
          navigate('/');
        }
    }
       
      
      
    }catch(error){
      setError("Falha ao deletar usuário");
    }
  }

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditedUser((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

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

          {edit ? (
            <form>
              <div className="my-2">
                <label className="font-bold text-desktop-bg mr-2">Nome:</label>
                <input
                  className="bg-brand-beige border-2 border-desktop-bg rounded-md focus:outline-none"
                  type="text"
                  name="nome"
                  value={editedUser.nome}
                  onChange={handleChange}
                />
              </div>

              <div className="my-2">
                <label className="font-bold text-desktop-bg mr-2">Email:</label>
                <input
                  className="bg-brand-beige border-2 border-desktop-bg rounded-md focus:outline-none"
                  type="email"
                  name="email"
                  value={editedUser.email}
                  onChange={handleChange}
                />
              </div>

              <div className="my-2 px-28">
                <label className="font-bold text-desktop-bg mr-1">Tipo:</label>
                  {user.tipo}
              </div>

            </form>
        ) : (
          
          
          <div>
            <hr />
            <p className="p-4"><span className="font-bold text-desktop-bg">Nome:</span> {user.nome}</p>

            <hr />
            <p className="p-4"><span className="font-bold text-desktop-bg">Email:</span> {user.email}</p>
            
            <hr />
            <p className="p-4"><span className="font-bold text-desktop-bg">Tipo:</span> {user.tipo}</p>
            <hr />
          </div>
          )}

          
          {user.tipo === 'PACIENTE' && user.Paciente && ( // form de edição
            edit ? (
              <form>
                <div className="mb-4">
                  <label className="font-bold text-desktop-bg mr-2">Idade:</label>
                  <input
                    className="bg-brand-beige border-2 border-desktop-bg rounded-md focus:outline-none"
                    type="number"
                    name="idade"
                    value={editedUser.Paciente?.idade}
                    onChange={handleChange}
                  />
                </div>

                <div className="my-4">
                  <label className="font-bold text-desktop-bg mr-2">Gênero:</label>
                  <input
                    className="bg-brand-beige border-2 border-desktop-bg rounded-md focus:outline-none"
                    type="text"
                    name="genero"
                    value={editedUser.Paciente?.genero}
                    onChange={handleChange}
                  />
                </div>

                <div className="my-4">
                  <label className="font-bold text-desktop-bg mr-2">Queixas:</label>
                  <input
                    className="bg-brand-beige border-2 border-desktop-bg rounded-md focus:outline-none"
                    type="text"
                    name="queixas"
                    value={editedUser.Paciente?.queixas}
                    onChange={handleChange}
                  />
                </div>

                <div className="my-4">
                  <label className="font-bold text-desktop-bg mr-2">Histórico Familiar:</label>
                  <input
                    className="bg-brand-beige border-2 border-desktop-bg rounded-md focus:outline-none"
                    type="text"
                    name="historico_familiar"
                    value={editedUser.Paciente?.historico_familiar}
                    onChange={handleChange}
                  />
                </div>

                <div className="my-4">
                  <label className="font-bold text-desktop-bg mr-2">Uso de Medicamentos:</label>
                  <input
                    className="bg-brand-beige border-2 border-desktop-bg rounded-md focus:outline-none"
                    type="text"
                    name="uso_medicamentos"
                    value={editedUser.Paciente?.uso_medicamentos}
                    onChange={handleChange}
                  />
                </div>

                <div className="my-4">
                  <label className="font-bold text-desktop-bg mr-2">Objetivo Terapia:</label>
                  <input
                    className="bg-brand-beige border-2 border-desktop-bg rounded-md focus:outline-none"
                    type="text"
                    name="objetivo_terapia"
                    value={editedUser.Paciente?.objetivo_terapia}
                    onChange={handleChange}
                  />
                </div>
              </form>
            ) : (
            
            <div className="mt-4">
              <h2 className="font-bold">Dados de Paciente</h2>
              <p className="p-4"><span className="font-bold text-desktop-bg">Idade:</span>{user.Paciente.idade}</p>

              <hr />
              <p className="p-4"><span className="font-bold text-desktop-bg">Gênero:</span> {user.Paciente.genero}</p>

              <hr />
              <p className="p-4"><span className="font-bold text-desktop-bg">Queixas:</span> {user.Paciente.queixas}</p>

              <hr />
              <p className="p-4"><span className="font-bold text-desktop-bg">Histórico Familiar:</span> {user.Paciente.historico_familiar}</p>

              <hr />
              <p className="p-4"><span className="font-bold text-desktop-bg">Uso de Medicamentos:</span> {user.Paciente.uso_medicamentos}</p>
              
              <hr />
              <p className="p-4"><span className="font-bold text-desktop-bg">Objetivo Terapia:</span> {user.Paciente.objetivo_terapia}</p>
            </div>
            )
          )}  


          {user.tipo === 'PROFISSIONAL' && user.Profissional && (
          edit ? (
            <form>
              {user.Profissional.foto && <img src={user.Profissional.foto} alt="Foto do profissional" className="mt-4 w-32 h-32 rounded-full mx-auto" />}
                  
                  <div className="mr-4 ">
                    <label className="font-bold text-desktop-bg mr-2">Especialidade:</label>
                    <select
                      className="w-[57%] bg-brand-beige border-2 border-desktop-bg rounded-md focus:outline-none text-center"
                      type="text"
                      name="especialidade"
                      value={editedUser.Profissional?.especialidade}
                      onChange={handleChange}
                    >
                    <option value="">Selecione</option>
                    <option value="terapia-infantil">Terapia Infantil</option>
                    <option value="Ansiedade">Ansiedade</option>
                    <option value="Depressão">Depressão</option>
                    <option value="Casal">Terapia de Casal</option>
                    </select>
                  </div>
                  <br />

                  <div className="mb-6">
                    <label className="font-bold text-desktop-bg mr-2">Localização:</label>
                    <select
                      className="w-[55%] bg-brand-beige border-2 border-desktop-bg rounded-md focus:outline-none text-center"
                      type="text"
                      name="localizacao"
                      value={editedUser.Profissional?.localizacao}
                      onChange={handleChange}
                      >
                    <option value="">Selecione</option>
                    <option value="Fortaleza">Fortaleza</option>
                    <option value="Quixadá">Quixadá</option>
                    <option value="Caucaia">Caucaia</option>
                    <option value="Eusébio">Eusébio</option>
                    <option value="Maracanaú">Maracanaú</option>

                      </select>
                    
                  </div>


                  <div className="my-2">
                    <label className="font-bold text-desktop-bg mr-2">Faixa Etária:</label>
                    <select
                      className="w-[55%] bg-brand-beige border-2 border-desktop-bg rounded-md focus:outline-none text-center"
                      type="number"
                      name="faixa_etaria"
                      value={editedUser.Profissional?.faixa_etaria}
                      onChange={handleChange}
                    >
                    <option value="">Selecione</option>
                    <option value="Crianças">Crianças</option>
                    <option value="Adolescentes">Adolescentes</option>
                    <option value="Adultos">Adultos</option>
                    <option value="Idosos">Idosos</option>
                    </select>
                  </div>
            </form>
            ) : (
          

            <div className="mt-4">
              <h2 className="font-bold" >Dados de Profissional</h2>
              {user.Profissional.foto && <img src={user.Profissional.foto} alt="Foto do profissional" className="mt-4 w-32 h-32 rounded-full mx-auto" />}

              <p className="p-4"><span className="font-bold text-desktop-bg">Especialidade:</span> {user.Profissional.especialidade}</p>
              
              <hr />
              <p className="p-4"><span className="font-bold text-desktop-bg">Localização:</span> {user.Profissional.localizacao}</p>

              <hr />
              <p className="p-4"><span className="font-bold text-desktop-bg">Faixa Etária de Atendimento:</span> {user.Profissional.faixa_etaria}</p>
              
              <hr />
              <p className="p-4"><span className="font-bold text-desktop-bg">Atendimentos Gratuitos:</span> {user.Profissional.atendimentos_gratuitos ? 'Sim' : 'Não'}</p>
            </div>
          ))}

         
          <Link to="/">
            <button className="border-2 border-desktop-bg px-6 py-2 m-2 rounded-full hover:bg-desktop-bg hover:text-brand-white transition">
               Home
            </button>
          </Link>

          {(currentUser.id === user.id || currentUser.tipo == "ADMIN") && (
            <button
            onClick={handleEditClick}
            className="border-2 border-desktop-bg px-6 py-2 m-2 rounded-full hover:bg-desktop-bg hover:text-brand-white transition">
            {edit ? 'Salvar' : 'Editar'}
          </button>)}

          {((currentUser.id === user.id || currentUser.tipo == "ADMIN") && !edit) && (
            <button
            onClick={handleDelete}
            className="border-2 border-desktop-bg px-6 py-2 m-2 rounded-full hover:bg-red-600 hover:text-brand-white transition">
            Delete
          </button>)}

          {((currentUser.tipo == "ADMIN") && !edit) && (
           <Link to="/dashboard">
           <button className="border-2 border-desktop-bg px-6 py-2 m-2 rounded-full hover:bg-desktop-bg hover:text-brand-white transition">
              Dashboard
           </button>
         </Link>)}

          {edit && (
          <button
            onClick={() => setEdit(false)}
            className="border-2 border-desktop-bg px-6 py-2 m-2 rounded-full hover:bg-desktop-bg hover:text-brand-white transition">
            Cancelar
          </button>
          )}
        </div>
      )}
    </div>
  );
};

export default UserProfile;