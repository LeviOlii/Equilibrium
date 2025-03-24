const Usuario = require('../models/user.model');
const { profissional } = require('../prisma')
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
       const { nome, email, senha, tipo, Paciente, Profissional } = req.body;
       console.log("Dados recebidos:", req.body);
        

       //Validação
       if (
        tipo.toUpperCase() === "PACIENTE" &&
        (!nome || !email || !senha || !Paciente || 
        !Paciente.idade || !Paciente.genero || !Paciente.queixas || 
        !Paciente.historico_familiar || !Paciente.uso_medicamentos || !Paciente.objetivo_terapia)
    ) {
        return res.status(400).json({ error: "Dados incompletos para cadastro de paciente." });
    }
    
    if (
        tipo.toUpperCase() === "PROFISSIONAL" &&
        (!nome || !email || !senha || !Profissional ||
        !Profissional.especialidade || !Profissional.localizacao || 
        !Profissional.faixa_etaria || (Profissional.atendimentos_gratuitos === undefined || Profissional.atendimentos_gratuitos === null)
        || !Profissional.foto)
    ) {
        return res.status(400).json({ error: "Dados incompletos para cadastro de profissional." });
    }
    
       const hashed_senha = await bcrypt.hash(senha, 14);

       const novoUsuario = await Usuario.criarUsuario({
        nome,
        email,
        senha: hashed_senha,  
        tipo,
        Paciente: tipo.toUpperCase() === "PACIENTE" ? Paciente : null, //Define como null se não for do tipo paciente
        Profissional: tipo.toUpperCase() === "PROFISSIONAL" ? Profissional : null, //Define como null se não for do tipo profissional
       });

       if (novoUsuario) {
            const token = jwt.sign(
                { tipo: novoUsuario.tipo, id: novoUsuario.id },
                process.env.SECRET_KEY,
                { expiresIn: "24h" } // add option for 30 days
            )

            res.cookie("token", token, {
                httpOnly: true,
                //secure: true
                sameSite: "Lax",
                maxAge: 1 * 60 * 60 * 1000 // 24h
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

exports.atualizarUsuario = async (req, res) => {
    try {
        const { id } = req.params;
        const { nome, email, senha, tipo, Paciente, Profissional     } = req.body;
        console.log("Dados recebidos:", req.body);

        // Validação
        if (tipo?.toUpperCase() === "PACIENTE") {
            if (!Paciente || !Paciente.idade || !Paciente.genero || !Paciente.queixas || !Paciente.historico_familiar || 
                !Paciente.uso_medicamentos || !Paciente.objetivo_terapia) {
                return res.status(400).json({ error: "Dados incompletos para atualizar paciente." });
            }
        } 

        if (tipo?.toUpperCase() === "PROFISSIONAL") {
            if (!Profissional || !Profissional.especialidade || !Profissional.localizacao || 
                !Profissional.faixa_etaria || !Profissional.atendimentos_gratuitos) {
                return res.status(400).json({ error: "Dados incompletos para atualizar profissional." });
            }
        }


        const hashed_senha = await bcrypt.hash(senha, 14);

        const usuarioAtualizado = await Usuario.atualizarUsuario(Number(id), {
            nome,
            email,
            senha: hashed_senha,
            tipo,
            Paciente,
            Profissional,
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


