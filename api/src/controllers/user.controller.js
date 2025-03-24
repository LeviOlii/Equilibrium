const Usuario = require('../models/user.model');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const listarUsuarios = async (req, res) => {
    try {
        const usuarios = await Usuario.listarUsuarios();
        res.json(usuarios);
    } catch(error) {
        res.status(500).json({error: error.message || 'Erro ao listar usuarios'});
    }
};

const buscarUsuarioPorId = async (req, res) => {
    try {
        const { id } = req.params;
        const usuario = await Usuario.buscarUsuarioPorId(Number(id));
        res.json(usuario);
    } catch(error) {
        res.status(404).json({error: error.message || 'Usuario não encontrado'});
    }
};

const criarUsuario = async (req, res) => {
    try {
       const { nome, email, senha, tipo, pacienteData, profissionalData } = req.body;
       console.log("Dados recebidos:", req.body);
        
       if (
        tipo.toUpperCase() === "PACIENTE" &&
        (!nome || !email || !senha || !pacienteData || 
        !pacienteData.idade || !pacienteData.genero || !pacienteData.queixas || 
        !pacienteData.historico_familiar || !pacienteData.uso_medicamentos || !pacienteData.objetivo_terapia)
    ) {
        return res.status(400).json({ error: "Dados incompletos para cadastro de pacienteData." });
    }
    
    if (
        tipo.toUpperCase() === "PROFISISONAL" &&
        (!nome || !email || !senha || !profissionalData ||
        !profissionalData.especialidade || !profissionalData.localizacao || 
        !profissionalData.faixa_etaria || (profissionalData.atendimentos_gratuitos === undefined || profissionalData.atendimentos_gratuitos === null)
        || !profissionalData.foto)
    ) {
        return res.status(400).json({ error: "Dados incompletos para cadastro de profissionalData." });
    }
    
       const hashed_senha = await bcrypt.hash(senha, 14);

       const novoUsuario = await Usuario.criarUsuario({
        nome,
        email,
        senha: hashed_senha,  
        tipo,
        pacienteData: tipo.toUpperCase() === "PACIENTE" ? pacienteData : null,
        profissionalData: tipo.toUpperCase() === "PROFISISONAL" ? profissionalData : null,
       });

       if (novoUsuario) {
            const token = jwt.sign(
                { tipo: novoUsuario.tipo, id: novoUsuario.id },
                process.env.SECRET_KEY,
                { expiresIn: "24h" }
            )

            res.cookie("token", token, {
                httpOnly: true,
                sameSite: "Lax",
                maxAge: 1 * 60 * 60 * 1000
            })
        }   
       return res.status(201).json(novoUsuario);
    } catch(error) {
        if(error.message.includes("E-mail já cadastrado")){
          return res.status(409).json({error: error.message});
        }
        return res.status(500).json({error: 'Erro interno ao cadastrar usuário'});
    }
};

const atualizarUsuario = async (req, res) => {
    try {
        const { id } = req.params;
        const { nome, email, senha, tipo, pacienteData, profissionalData } = req.body;
        console.log("Dados recebidos:", req.body);

        if (tipo?.toUpperCase() === "PACIENTE") {
            if (!pacienteData || !pacienteData.idade || !pacienteData.genero || !pacienteData.queixas || !pacienteData.historico_familiar || 
                !pacienteData.uso_medicamentos || !pacienteData.objetivo_terapia) {
                return res.status(400).json({ error: "Dados incompletos para atualizar pacienteData." });
            }
        } 

        if (tipo?.toUpperCase() === "PROFISISONAL") {
            if (!profissionalData || !profissionalData.especialidade || !profissionalData.localizacao || 
                !profissionalData.faixa_etaria || !profissionalData.atendimentos_gratuitos) {
                return res.status(400).json({ error: "Dados incompletos para atualizar profissionalData." });
            }
        }

        const hashed_senha = await bcrypt.hash(senha, 14);

        const usuarioAtualizado = await Usuario.atualizarUsuario(Number(id), {
            nome,
            email,
            senha: hashed_senha,
            tipo,
            pacienteData,
            profissionalData,
        });

        res.json(usuarioAtualizado);
    } catch (error) {
        res.status(500).json({ error: error.message || 'Erro interno ao atualizar usuário' });
    }
};

const deletarUsuario = async (req, res) => {
    try {
        const { id } = req.params;
        await Usuario.deletarUsuario(Number(id));
        res.status(204).send();
    } catch (error) {
        res.status(500).json({error: error.message || 'Erro interno ao excluir usuario'})
    }
};

module.exports = { listarUsuarios, buscarUsuarioPorId, criarUsuario, atualizarUsuario, deletarUsuario };
