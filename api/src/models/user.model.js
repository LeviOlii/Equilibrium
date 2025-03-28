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

const criarUsuario = async ({ nome, email, senha, tipo, Paciente, Profissional }) => {
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
        if (tipo.toUpperCase() === "PACIENTE" && Paciente) {
            await prisma.paciente.create({
                data: {
                    usuario_id: usuario.id,
                    idade: Paciente.idade,
                    genero: Paciente.genero,
                    queixas: Paciente.queixas,
                    historico_familiar: Paciente.historico_familiar,
                    uso_medicamentos: Paciente.uso_medicamentos,
                    objetivo_terapia: Paciente.objetivo_terapia,
                }
            });
        }

        // Se for profissional
        if (tipo.toUpperCase() === "PROFISSIONAL" && Profissional) {
            const profissional = await prisma.profissional.create({
                data: {
                    usuario_id: usuario.id,
                    especialidade: Profissional.especialidade,
                    localizacao: Profissional.localizacao,
                    faixa_etaria: Profissional.faixa_etaria,
                    atendimentos_gratuitos: Profissional.atendimentos_gratuitos,
                    foto: Profissional.foto || "1",
                }
            });

            // Cria disponibilidades se existirem
            if (Profissional.disponibilidades && Profissional.disponibilidades.length > 0) {
                await prisma.disponibilidade.createMany({
                    data: Profissional.disponibilidades.map(d => ({
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

const atualizarUsuario = async (id, { nome, email, senha, tipo, Paciente, Profissional }) => {
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
    if (usuarioAtualizado.tipo === "PACIENTE" && Paciente) {
        await prisma.paciente.updateMany({
            where: { usuario_id: id },
            data: {
                idade: Paciente.idade,
                genero: Paciente.genero,
                queixas: Paciente.queixas,
                historico_familiar: Paciente.historico_familiar,
                uso_medicamentos: Paciente.uso_medicamentos,
                objetivo_terapia: Paciente.objetivo_terapia,
            },
        });
    }

    // Se for profissional, atualiza os dados na tabela Profissional
    if (usuarioAtualizado.tipo === "PROFISSIONAL" && Profissional) {
        await prisma.profissional.update({
            where: { usuario_id: id },
            data: {
                especialidade: Profissional.especialidade,
                localizacao: Profissional.localizacao,
                faixa_etaria: Profissional.faixa_etaria,
                atendimentos_gratuitos: Profissional.atendimentos_gratuitos,
                foto: Profissional.foto,
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
