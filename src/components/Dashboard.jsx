
const Dashboard = () => {

  return (
    <>
        <body className="bg-mobile-bg">
            <h1 className="text-center p-6 text-3xl font-dmSans">Painel do Administrador</h1>
            <div className="panel font-dmSans text-center border-solid border-2 mx-32 bg-desktop-bg text-black rounded-2xl">
                <div className="p-12 bg-brand-beige my-6 mx-96">
                    <h1>Pacientes cadastrados</h1>
                    <br/>
                    <p>0</p>
                </div>

                <div className="p-12 bg-brand-beige my-6 mx-96">
                    <h1>Profissionais cadastrados</h1>
                    <br/>
                    <p>0</p>
                </div>

                <div className="p-12 bg-brand-beige my-6 mx-96">
                    <h1>Sessões realizadas</h1>
                    <br/>
                    <p>0</p>
                </div>

                <div className="p-12 bg-brand-beige my-6 mx-96">
                    <h1>Atendimentos gratuitos oferecidos</h1>
                    <br/>
                    <p>0</p>
                </div>

                <div className="p-12 bg-brand-beige my-6 mx-96">
                    <h1>Depoimentos enviados</h1>
                    <br/>
                    <p>0</p>
                </div>

                <div className="p-12 bg-brand-beige my-6 mx-96">
                    <h1>Atendimentos por especialidade</h1>
                    <br/>
                    <p>0</p>
                </div>

                <div className="p-12 bg-brand-beige my-6 mx-96">
                    <h1>Grupos de apoio</h1>
                    <br/>
                    <p>0</p>
                </div>
            </div>
        </body>
    </>
  );
};

export default Dashboard;