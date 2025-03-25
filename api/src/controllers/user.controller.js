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
       const { nome, email, senha, tipo, Paciente, Profissional } = req.body;
       console.log("Dados recebidos:", req.body);
        
       if (
        tipo.toUpperCase() === "PACIENTE" &&
        (!nome || !email || !senha || !Paciente || 
        !Paciente.idade || !Paciente.genero || !Paciente.queixas || 
        !Paciente.historico_familiar || !Paciente.uso_medicamentos || !Paciente.objetivo_terapia)
    ) {
        return res.status(400).json({ error: "Dados incompletos para cadastro de Paciente." });
    }
    
    if (
        tipo.toUpperCase() === "PROFISISONAL" &&
        (!nome || !email || !senha || !Profissional ||
        !Profissional.especialidade || !Profissional.localizacao || 
        !Profissional.faixa_etaria || (Profissional.atendimentos_gratuitos === undefined || Profissional.atendimentos_gratuitos === null)
        || !Profissional.foto)
    ) {
        return res.status(400).json({ error: "Dados incompletos para cadastro de Profissional." });
    }
    
       const hashed_senha = await bcrypt.hash(senha, 14);

       console.log("controller Profissional", Profissional);


       const novoUsuario = await Usuario.criarUsuario({
        nome,
        email,
        senha: hashed_senha,  
        tipo,
        Paciente: tipo.toUpperCase() === "PACIENTE" ? Paciente : null,
        Profissional: tipo.toUpperCase() === "PROFISSIONAL" ? Profissional : null,
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

    // eu mudei isso daq pra não precisar ter TODOS os dados
    // pra poder atualizar, só atualiza o campo que mandar,
    // também, não pode atualizar TIPO, não faz sentio.
    try {
        const { id } = req.params;
        const { nome, email, Paciente, Profissional } = req.body;

        const usuarioExistente = await Usuario.buscarUsuarioPorId(Number(id));
        if (!usuarioExistente) {
            return res.status(404).json({ error: "Usuário não encontrado." });
        }

        const dadosAtualizados = {};

        if (nome !== undefined && nome !== "") dadosAtualizados.nome = nome;
        if (email !== undefined && email !== "") dadosAtualizados.email = email;
        

        if (Paciente) {
            dadosAtualizados.Paciente = {
                ...usuarioExistente.Paciente,  
                ...Paciente,                   // aq ta pegando oq eu mandei e mandando pro usuario q eu vou atualizar
            };
        }

        if (Profissional) {
            dadosAtualizados.Profissional = {
                ...usuarioExistente.Profissional, //
                ...Profissional,
            };
        }

        // Atualiza no banco apenas os dados modificados
        const usuarioAtualizado = await Usuario.atualizarUsuario(Number(id), dadosAtualizados);

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
