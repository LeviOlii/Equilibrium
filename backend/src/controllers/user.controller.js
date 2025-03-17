const Usuario = require('../models/user.model');

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

       //Validação
       if ((!nome || !email || !senha || !pacienteData.idade || !pacienteData.genero || !pacienteData.queixas || !pacienteData.historico_familiar || 
        !pacienteData.uso_medicamentos || !pacienteData.objetivo_terapia) && (tipo.toUpperCase() === "PACIENTE")) {
        return res.status(400).json({error: 'Dado(s) obrigatório(s) não preenchido(s)!'})
       } 
       
       if ((!nome || !email || !senha || !profissionalData.especialidade || !profissionalData.localizacao || 
        !profissionalData.faixa_etaria || !profissionalData.atendimentos_gratuitos || !profissionalData.foto) && (tipo.toUpperCase() === "PROFISSIONAL")) {
        return res.status(400).json({error: 'Dado(s) obrigatório(s) não preenchido(s)!'})
       }
       
       const novoUsuario = await Usuario.criarUsuario({
        nome,
        email,
        senha,
        tipo,
        pacienteData,
        profissionalData,
       });

       res.status(201).json(novoUsuario);
    } catch(error) {
        if(error.message.includes("E-mail já cadastrado")){
            res.status(409).json({error: error.message});
        }

        res.status(500).json({error: 'Erro interno na criação de usuário!'});
    }
};

exports.atualizarUsuario = async (req, res) => {
    try {
        const { id } = req.params;
        const { nome, email, senha, tipo, pacienteData, profissionalData } = req.body;

        //Validação
       if ((!nome || !email || !senha || !pacienteData.idade || !pacienteData.genero || !pacienteData.queixas || !pacienteData.historico_familiar || 
        !pacienteData.uso_medicamentos || !pacienteData.objetivo_terapia) && (tipo.toUpperCase() === "PACIENTE")) {
        return res.status(400).json({error: 'Dado(s) obrigatório(s) não preenchido(s)!'})
       } 
       
       if ((!nome || !email || !senha || !profissionalData.especialidade || !profissionalData.localizacao || 
        !profissionalData.faixa_etaria || !profissionalData.atendimentos_gratuitos || !profissionalData.foto) && (tipo.toUpperCase() === "PROFISSIONAL")) {
        return res.status(400).json({error: 'Dado(s) obrigatório(s) não preenchido(s)!'})
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
    } catch(error) {
        res.status(500).json({error: error.message || 'Erro interno ao atualizar usuario'});
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


