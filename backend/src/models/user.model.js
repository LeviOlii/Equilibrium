const prisma = require("../prisma");
const express = require("express");

const listarUsuarios = async () => {
    return await prisma.usuario.findMany();
};

const buscarUsuarioPorId = async (id) => {
    const usuario = await prisma.usuario.findUnique({
        where: { id },
    });

    if(!usuario) {
        throw new Error('Usuário não encontrado');
    }

    return usuario;
}

const criarUsuario = async ({ nome, email, senha, tipo, pacienteData, profissionalData }) => {
    
    const usuarioExistente = await prisma.usuario.findUnique({
        where: { email },
    });

    if (usuarioExistente) {
        throw new Error("E-mail já cadastrado!");
    }

    //Cria usuário na tabela Usuário
    const usuario = await prisma.usuario.create({
        data: {
            nome,
            email,
            senha, 
            tipo,
        },
    });

    //Se for paciente, cria registro na tabela Paciente
    if (tipo.toUpperCase() === "PACIENTE" && pacienteData){
        await prisma.paciente.create({
            data: {
                usuario_id: usuario.id,
                idade: pacienteData.idade,
                genero: pacienteData.genero,
                queixas: pacienteData.queixas,
                historico_familiar: pacienteData.historico_familiar,
                uso_medicamentos: pacienteData.uso_medicamentos,
                objetivo_terapia: pacienteData.objetivo_terapia,
            }
        });
    }
    //Se for profissional, cria registro na tabela Paciente
    if (tipo.toUpperCase() === "PROFISSIONAL" && profissionalData){
        await prisma.profissional.create({
            data: {
                usuario_id: usuario.id,
                especialidade: profissionalData.especialidade,
                localizacao: profissionalData.localizacao,
                faixa_etaria: profissionalData.faixa_etaria,
                atendimentos_gratuitos: profissionalData.atendimentos_gratuitos,
                foto: profissionalData.foto,
            }
        });
    }
    return usuario;
};

const atualizarUsuario = async (id, { nome, email, senha, pacienteData, profissionalData }) => {
    // Verifica se o usuário existe
    const usuario = await prisma.usuario.findUnique({
        where: { id },
    });

    if (!usuario) {
        throw new Error('Usuário não encontrado');
    }

    // Atualiza os dados do usuário na tabela Usuario
    const usuarioAtualizado = await prisma.usuario.update({
        where: { id },
        data: {
            nome,
            email,
            senha,
        },
    });

    // Se for paciente, atualiza os dados na tabela Paciente
    if (usuario.tipo === "PACIENTE" && pacienteData) {
        await prisma.paciente.update({
            where: { usuario_id: id },
            data: {
                idade: pacienteData.idade,
                genero: pacienteData.genero,
                queixas: pacienteData.queixas,
                historico_familiar: pacienteData.historico_familiar,
                uso_medicamentos: pacienteData.uso_medicamentos,
                objetivo_terapia: pacienteData.objetivo_terapia,
            },
        });
    }

    // Se for profissional, atualiza os dados na tabela Profissional
    if (usuario.tipo === "PROFISSIONAL" && profissionalData) {
        await prisma.profissional.update({
            where: { usuario_id: id },
            data: {
                especialidade: profissionalData.especialidade,
                localizacao: profissionalData.localizacao,
                faixa_etaria: profissionalData.faixa_etaria,
                atendimentos_gratuitos: profissionalData.atendimentos_gratuitos,
                foto: profissionalData.foto,
            },
        });
    }

    return usuarioAtualizado;
};

const deletarUsuario = async (id) => {
    // Verifica se existe o usuário
    const usuario = await prisma.usuario.findUnique({
        where: { id },
    });

    if (!usuario) {
        throw new Error('Usuário não encontrao!');
    }

    await prisma.usuario.delete({
        where: { id },
    });
};

module.exports = {
    listarUsuarios,
    buscarUsuarioPorId,
    criarUsuario,
    atualizarUsuario,
    deletarUsuario,
};