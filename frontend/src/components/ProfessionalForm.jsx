import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const ProfessionalForm = ({username, email, password, role, goToFirstForm, setError, error}) => {
  const [step, setStep] = useState(1);
  const [speciality, setSpeciality] = useState('');
  const [address, setAddress] = useState('');
  const [freeService, setFreeService] = useState();
  const [ageRange, setAgeRange] = useState('');
  const [foto, setFoto] = useState('');

  const [selectedDays, setSelectedDays] = useState([]);
  const [selectedTimes, setSelectedTimes] = useState([]);
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');

  const navigate = useNavigate();

  const handleImage = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
  
    reader.onloadend = () => {
      setFoto(reader.result);
    };
  
    if (file) {
      reader.readAsDataURL(file); // <-- conversão para Base64
  }}
 
  

  const daysOfWeek = [
    { id: 'seg', name: 'Segunda-feira' },
    { id: 'ter', name: 'Terça-feira' },
    { id: 'qua', name: 'Quarta-feira' },
    { id: 'qui', name: 'Quinta-feira' },
    { id: 'sex', name: 'Sexta-feira' },
    { id: 'sab', name: 'Sábado' },
    { id: 'dom', name: 'Domingo' }
  ];

  const availableTimes = ['08:00', '09:00', '10:00', '11:00', '12:00', '13:00', '14:00', '15:00', '16:00', '17:00'];

  const handleFirstStepSubmit = async (e) => {
    e.preventDefault();
    if (speciality && address) {
      try{
        const userData = 
        {
          nome: username,
          email: email,
          senha: password,
          tipo: role,
          Paciente: null,
          Profissional:{
            especialidade: speciality,
            localizacao: address,
            faixa_etaria: ageRange,
            atendimentos_gratuitos: freeService,
            foto: foto,   
          }        
        }

        console.log(userData);

        const user = await axios.post("http://localhost:3000/api/usuarios", userData, {
          withCredentials: true
        })  

        navigate('/')

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

  const toggleDay = (dayId) => {
    setSelectedDays(prev =>
      prev.includes(dayId)
        ? prev.filter(d => d !== dayId)
        : [...prev, dayId]
    );
  };

  const toggleTime = (time) => {
    setSelectedTimes(prev =>
      prev.includes(time)
        ? prev.filter(t => t !== time)
        : [...prev, time]
    );
  };

  const generateAvailabilities = () => {
    const availabilities = [];
    
    // Corrige o parsing das datas para evitar problemas de timezone
    const start = new Date(startDate + 'T00:00:00');
    const end = new Date(endDate + 'T23:59:59');
    
    // Para cada dia no período
    for (let date = new Date(start); date <= end; date.setDate(date.getDate() + 1)) {
      // Cria uma nova data sem horário para evitar problemas de timezone
      const dateWithoutTime = new Date(date.getFullYear(), date.getMonth(), date.getDate());
      
      const dayOfWeek = daysOfWeek[dateWithoutTime.getDay() === 0 ? 6 : dateWithoutTime.getDay() - 1].id;
      
      // Se o dia está selecionado
      if (selectedDays.includes(dayOfWeek)) {
        // Para cada horário selecionado
        selectedTimes.forEach(time => {
          const [hours, minutes] = time.split(':');
          
          // Cria a data/hora final no fuso horário local
          const localDateTime = new Date(
            dateWithoutTime.getFullYear(),
            dateWithoutTime.getMonth(),
            dateWithoutTime.getDate(),
            parseInt(hours),
            parseInt(minutes),
            0
          );
          
          // Converte para string manualmente no formato ISO sem ajuste de timezone
          const isoDateTime = formatToISOLocal(localDateTime);
          
          availabilities.push({
            dataHora: isoDateTime,
            disponivel: true
          });
        });
      }
    }
    
    return availabilities;
  };
  
  // Função auxiliar para formatar a data no formato ISO sem ajuste de timezone
  const formatToISOLocal = (date) => {
    const pad = (num) => (num < 10 ? '0' + num : num);
    
    return date.getFullYear() + '-' +
      pad(date.getMonth() + 1) + '-' +
      pad(date.getDate()) + 'T' +
      pad(date.getHours()) + ':' +
      pad(date.getMinutes()) + ':' +
      pad(date.getSeconds()) + '.000Z'; // Mantém o Z para indicar UTC, mas os valores são locais
  };

  const handleFinalSubmit = async (e) => {
    e.preventDefault();
    
    if (role.toUpperCase() === "PROFISSIONAL" && (selectedDays.length === 0 || selectedTimes.length === 0 || !startDate || !endDate)) {
      setError('Preencha todos os campos de disponibilidade');
      return;
    }

    try {
      // Gera as disponibilidades primeiro (sem profissional_id ainda)
      const availabilities = role.toUpperCase() === "PROFISSIONAL" ? generateAvailabilities() : [];
      
      const payload = {
        nome: username,
        email: email,
        senha: password,
        tipo: role.toUpperCase(),
        pacienteData: role.toUpperCase() === "PACIENTE" ? pacienteData : null, 
        profissionalData: role.toUpperCase() === "PROFISSIONAL" ? {
          especialidade: speciality,
          localizacao: address,
          faixa_etaria: ageRange,
          atendimentos_gratuitos: freeService,
          foto: "1",
          disponibilidades: availabilities // Adiciona as disponibilidades aqui
        } : null
      };

      // Envia tudo em uma única requisição
      const response = await axios.post(
        "http://localhost:3000/api/usuarios", 
        payload,
        { withCredentials: true }
      );

      navigate('/');
    } catch(error) {
      if (error?.response?.status === 409) {
        setError("Email já está cadastrado");
        goToFirstForm();
      } else {
        setError(error?.response?.data?.error || error?.message || "Erro ao cadastrar");
      }
    }
};

  return (
    <div className="bg-desktop-bg min-h-screen flex items-center justify-center">
      <div className="loginContainer text-center border-solid border-1 bg-brand-white text-black rounded-2xl font-dmSans font-extralight shadow-2xl w-full max-w-xl">
        {step === 1 ? (
          <form className="mx-10 my-10 py-6" onSubmit={handleFirstStepSubmit}>
            <h1 className="text-gray-headline font-thin text-3xl my-6 italic">Cadastro do profissional</h1>

            <div className="user_icon w-12 h-12 mx-auto my-5">
              <img src="https://cdn-icons-png.flaticon.com/128/684/684831.png" alt="signup_icon" />
            </div>

            {error && <p className="text-red-500">{error}</p>}
            
            <label htmlFor="speciality" className="block text-left">Especialidade</label>
            <select
              type="text"
              name="speciality"
              id="speciality"
              className="bg-mobile-bg italic p-2 border-2 border-solid rounded-xl shadow-md w-full"
              value={speciality}
              onChange={(e) => setSpeciality(e.target.value)}
              required
          
              >
                <option value="">Selecione</option>
                <option value="terapia-infantil">Terapia Infantil</option>
                <option value="Ansiedade">Ansiedade</option>
                <option value="Depressão">Depressão</option>
                <option value="Casal">Terapia de Casal</option>
            </select>
            
            <label htmlFor="localization" className="block text-left mt-6">Localização</label>
            <select
              type="text"
              name="address"
              id="address"
              className="bg-mobile-bg italic mb-6 p-2 border-2 border-solid rounded-xl shadow-md w-full"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              required
            >
              <option value="">Selecione</option>
              <option value="Fortaleza">Fortaleza</option>
              <option value="Quixadá">Quixadá</option>
              <option value="Caucaia">Caucaia</option>
              <option value="Eusébio">Eusébio</option>
              <option value="Maracanaú">Maracanaú</option>
            </select>
            
            <label htmlFor="ageRange" className="block text-left">Faixa etária de atendimento desejada</label>
            <select
              type="text"  
              name="ageRange"
              id="ageRange"
              className="bg-mobile-bg italic p-2 border-2 border-solid rounded-xl shadow-md w-full mr-2"
              value={ageRange}
              onChange={(e) => setAgeRange(e.target.value)}
            >
              <option value="">Selecione</option>
              <option value="Crianças">Crianças</option>
              <option value="Adolescentes">Adolescentes</option>
              <option value="Adultos">Adultos</option>
              <option value="Idosos">Idosos</option>
            </select>
            
            <label htmlFor="freeServices" className="block text-left mt-6">Atendimentos gratuitos</label>
            <select
              type="number"
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

            <label htmlFor="foto" className="block text-left">Foto do profissional</label>
            <input
              type="file"
              id="foto"
              accept="image/*"
              className="bg-mobile-bg italic mb-6 p-2 border-2 border-solid rounded-xl shadow-md w-full"
              onChange={handleImage}
            />
            <br />
                
            <button className="bg-mobile-bg border-2 border-solid rounded-xl shadow-md px-8 my-6 text-center py-1" type="submit">Concluir</button>
            <button 
              className="bg-mobile-bg border-2 border-solid rounded-xl shadow-md px-8 py-2 text-center" 
              type="submit"
            >
              Continuar
            </button>
          </form>
        ) : (
          <form className="mx-10 my-10 py-6" onSubmit={handleFinalSubmit}>
            <h1 className="text-gray-headline font-thin text-3xl my-6 italic">Disponibilidade de Atendimento</h1>
            
            <div className="user_icon w-12 h-12 mx-auto my-5">
              <img src="src/assets/icons/calendar.png" alt="calendar_icon" />
            </div>

            {error && <p className="text-red-500">{error}</p>}
            
            <div className="space-y-6">
              <div>
                <label className="block text-left mb-2">Período de disponibilidade:</label>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm text-left mb-1">Data inicial</label>
                    <input
                      type="date"
                      className="w-full p-2 border rounded-lg"
                      value={startDate}
                      onChange={(e) => setStartDate(e.target.value)}
                      min={new Date().toISOString().split('T')[0]}
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm text-left mb-1">Data final</label>
                    <input
                      type="date"
                      className="w-full p-2 border rounded-lg"
                      value={endDate}
                      onChange={(e) => setEndDate(e.target.value)}
                      min={startDate || new Date().toISOString().split('T')[0]}
                      required
                    />
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-left mb-2">Dias da semana:</label>
                <div className="grid grid-cols-2 gap-2">
                  {daysOfWeek.map(day => (
                    <button
                      key={day.id}
                      type="button"
                      className={`p-2 rounded-lg border text-left ${
                        selectedDays.includes(day.id)
                          ? 'bg-blue-500 text-white border-blue-500'
                          : 'border-gray-300 hover:bg-gray-50'
                      }`}
                      onClick={() => toggleDay(day.id)}
                    >
                      {day.name}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-left mb-2">Horários disponíveis:</label>
                <div className="grid grid-cols-3 gap-2">
                  {availableTimes.map(time => (
                    <button
                      key={time}
                      type="button"
                      className={`p-2 rounded-lg border ${
                        selectedTimes.includes(time)
                          ? 'bg-blue-500 text-white border-blue-500'
                          : 'border-gray-300 hover:bg-gray-50'
                      }`}
                      onClick={() => toggleTime(time)}
                    >
                      {time}
                    </button>
                  ))}
                </div>
              </div>

              <div className="bg-gray-50 p-4 rounded-lg">
                <h3 className="font-medium text-left mb-2">Resumo:</h3>
                {selectedDays.length > 0 && selectedTimes.length > 0 && startDate && endDate ? (
                  <div className="text-left">
                    <p>Disponível nas {selectedDays.length} dias selecionados</p>
                    <p>Horários: {selectedTimes.sort().join(', ')}</p>
                    <p>Período: {new Date(new Date(startDate + 'T00:00:00')).toLocaleDateString('pt-BR')} até {new Date(new Date(endDate + 'T00:00:00')).toLocaleDateString('pt-BR')}</p>                  </div>
                ) : (
                  <p className="text-gray-500">Preencha todos os campos para ver o resumo</p>
                )}
              </div>
            </div>
            
            <div className="flex justify-between gap-4 mt-6">
              <button
                type="button"
                className="bg-gray-200 hover:bg-gray-300 px-6 py-2 rounded-lg flex-1"
                onClick={() => setStep(1)}
              >
                Voltar
              </button>
              <button
                type="submit"
                className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded-lg flex-1"
                disabled={selectedDays.length === 0 || selectedTimes.length === 0 || !startDate || !endDate}
              >
                Finalizar Cadastro
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};

export default ProfessionalForm;