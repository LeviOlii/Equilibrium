const prisma = require("../prisma");
const express = require("express");

const listarUsuarios = async () => {
    return await prisma.usuario.findMany({
        include: {
            Paciente: true,
            Profissional: true,
        },
    });
};

const buscarUsuarioPorId = async (id) => {
    const usuario = await prisma.usuario.findUnique({
        where: { id },
        include: { //agr inclui os dados de paciente/profissional
            Paciente: true,
            Profissional: true,
        }
    });

    if (!usuario) {
        throw new Error('Usuário não encontrado');
    }

    return usuario;
}

const criarUsuario = async ({ nome, email, senha, tipo, pacienteData, profissionalData }) => {
    return await prisma.$transaction(async (prisma) => {
        const usuarioExistente = await prisma.usuario.findUnique({
            where: { email },
        });

        if (usuarioExistente) {
            throw new Error("E-mail já cadastrado!");
        }

        // Cria usuário base
        const usuario = await prisma.usuario.create({
            data: {
                nome,
                email,
                senha,
                tipo: tipo.toUpperCase(),
            },
        });

        // Se for paciente
        if (tipo.toUpperCase() === "PACIENTE" && pacienteData) {
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

        // Se for profissional
        if (tipo.toUpperCase() === "PROFISSIONAL" && profissionalData) {
            const profissional = await prisma.profissional.create({
                data: {
                    usuario_id: usuario.id,
                    especialidade: profissionalData.especialidade,
                    localizacao: profissionalData.localizacao,
                    faixa_etaria: profissionalData.faixa_etaria,
                    atendimentos_gratuitos: profissionalData.atendimentos_gratuitos,
                    foto: profissionalData.foto || "1",
                }
            });

            // Cria disponibilidades se existirem
            if (profissionalData.disponibilidades && profissionalData.disponibilidades.length > 0) {
                await prisma.disponibilidade.createMany({
                    data: profissionalData.disponibilidades.map(d => ({
                        profissional_id: profissional.id,
                        dataHora: new Date(d.dataHora),
                        disponivel: true
                    }))
                });
            }
        }

        return usuario;
    });
};

const atualizarUsuario = async (id, { nome, email, senha, tipo, pacienteData, profissionalData }) => {
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
            tipo,
        },
    });

    // Se for paciente, atualiza os dados na tabela Paciente
    if (usuarioAtualizado.tipo === "PACIENTE" && pacienteData) {
        await prisma.paciente.updateMany({
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
    if (usuarioAtualizado.tipo === "PROFISSIONAL" && profissionalData) {
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