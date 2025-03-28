const Usuario = require('../models/user.model');
const { profissionalData } = require('../prisma')
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken')

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
        
        // Validação (mantida igual)
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
            !profissionalData.faixa_etaria || (profissionalData.atendimentos_gratuitos === undefined || profissionalData.atendimentos_gratuitos === null)
            || !profissionalData.foto)
        ) {
            return res.status(400).json({ error: "Dados incompletos para cadastro de profissional." });
        }
        
        const hashed_senha = await bcrypt.hash(senha, 14);

        // Cria o usuário (agora com suporte a disponibilidades)
        const novoUsuario = await Usuario.criarUsuario({
            nome,
            email,
            senha: hashed_senha,  
            tipo,
            pacienteData: tipo.toUpperCase() === "PACIENTE" ? pacienteData : null,
            profissionalData: tipo.toUpperCase() === "PROFISSIONAL" ? {
                ...profissionalData,
                disponibilidades: profissionalData.disponibilidades || [] // Campo opcional
            } : null,
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
                maxAge: 24 * 60 * 60 * 1000 // 24h
            })
        }
        
        return res.status(201).json(novoUsuario);
    } catch(error) {
        if(error.message.includes("E-mail já cadastrado")){
            return res.status(409).json({error: error.message});
        }
        console.error("Erro detalhado:", error);
        return res.status(500).json({error: 'Erro interno ao cadastrar usuário'});
    }
};

exports.atualizarUsuario = async (req, res) => {
    try {
        const { id } = req.params;
        const { nome, email, senha, tipo, pacienteData, profissionalData     } = req.body;
        console.log("Dados recebidos:", req.body);

        // Validação
        if (tipo?.toUpperCase() === "PACIENTE") {
            if (!pacienteData || !pacienteData.idade || !pacienteData.genero || !pacienteData.queixas || !pacienteData.historico_familiar || 
                !pacienteData.uso_medicamentos || !pacienteData.objetivo_terapia) {
                return res.status(400).json({ error: "Dados incompletos para atualizar pacienteData." });
            }
        } 

        if (tipo?.toUpperCase() === "PROFISSIONAL") {
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


exports.deletarUsuario = async (req, res) => {
    try {
        const { id } = req.params;

        await Usuario.deletarUsuario(Number(id));
        res.status(204).send();
    } catch (error) {
        res.status(500).json({error: error.message || 'Erro interno ao excluir usuario'})
    }
}


