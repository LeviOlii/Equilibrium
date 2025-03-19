const Usuario = require('../models/user.model');
const { profissional } = require('../prisma');

exports.listarUsuarios = async (req, res) => {
    try {
        const usuarios = await Usuario.listarUsuarios();
        res.json(usuarios);
    } catch(error) {
        res.status(500).json({error: error.message || 'Erro ao listar usuarios'});
    }
};

exports.buscarUsuarioPorId = async (req, res) => {
    try {
        const { id } = req.params;
        const usuario = await Usuario.buscarUsuarioPorId(Number(id));
        res.json(usuario);
    } catch(error) {
        res.status(404).json({error: error.message || 'Usuario não encontrado'});
    }
};

exports.criarUsuario = async (req, res) => {
    try {
       const { nome, email, senha, tipo, pacienteData, profissionalData } = req.body;
       console.log("Dados recebidos:", req.body); 

       //Validação
       if (
        tipo.toUpperCase() === "PACIENTE" &&
        (!nome || !email || !senha || !pacienteData || 
        !pacienteData.idade || !pacienteData.genero || !pacienteData.queixas || 
        !pacienteData.historico_familiar || !pacienteData.uso_medicamentos || !pacienteData.objetivo_terapia)
    ) {
        return res.status(400).json({ error: "Dados incompletos para cadastro de paciente." });
    }
    
    if (
        tipo.toUpperCase() === "PROFISSIONAL" &&
        (!nome || !email || !senha || !profissionalData ||
        !profissionalData.especialidade || !profissionalData.localizacao || 
        !profissionalData.faixa_etaria || !profissionalData.atendimentos_gratuitos || !profissionalData.foto)
    ) {
        return res.status(400).json({ error: "Dados incompletos para cadastro de profissional." });
    }
    
       
       const novoUsuario = await Usuario.criarUsuario({
        nome,
        email,
        senha,  
        tipo,
        pacienteData: tipo.toUpperCase() === "PACIENTE" ? pacienteData : null, //Define como null se não for do tipo paciente
        profissionalData: tipo.toUpperCase() === "PROFISSIONAL" ? profissionalData : null, //Define como null se não for do tipo profissional
       });

       return res.status(201).json(novoUsuario);
    } catch(error) {
        if(error.message.includes("E-mail já cadastrado")){
          return res.status(409).json({error: error.message});
        }

        return res.status(500).json({error: 'Erro interno ao cadastrar usuário'});
    }
};

exports.atualizarUsuario = async (req, res) => {
    try {
        const { id } = req.params;
        const { nome, email, senha, tipo, pacienteData, profissionalData } = req.body;
        console.log("Dados recebidos:", req.body);

        // Validação
        if (tipo?.toUpperCase() === "PACIENTE") {
            if (!pacienteData || !pacienteData.idade || !pacienteData.genero || !pacienteData.queixas || !pacienteData.historico_familiar || 
                !pacienteData.uso_medicamentos || !pacienteData.objetivo_terapia) {
                return res.status(400).json({ error: "Dados incompletos para atualizar paciente." });
            }
        }

        if (tipo?.toUpperCase() === "PROFISSIONAL") {
            if (!profissionalData || !profissionalData.especialidade || !profissionalData.localizacao || 
                !profissionalData.faixa_etaria || !profissionalData.atendimentos_gratuitos) {
                return res.status(400).json({ error: "Dados incompletos para atualizar profissional." });
            }
        }

        const usuarioAtualizado = await Usuario.atualizarUsuario(Number(id), {
            nome,
            email,
            senha,
            tipo,
            pacienteData,
            profissionalData,
        });

        res.json(usuarioAtualizado);
    } catch (error) {
        res.status(500).json({ error: error.message || 'Erro interno ao atualizar usuário' });
    }
};


exports.excluirUsuario = async (req, res) => {
    try {
        const { id } = req.params;

        await Usuario.excluirUsuario(Number(id));
        res.status(204).send();
    } catch (error) {
        res.status(500).json({error: error.message || 'Erro interno ao excluir usuario'})
    }
}


