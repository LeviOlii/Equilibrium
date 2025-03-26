const prisma = require("../prisma");

async function listarUsuarios() {
    return prisma.usuario.findMany();
}

async function buscarUsuarioPorId(id) {
    const usuario = await prisma.usuario.findUnique({
        where: { id },
        include: { // agora inclui os dados de paciente/profissional
            Paciente: true,
            Profissional: true,
        }
    });

    if (!usuario) {
        throw new Error('Usuário não encontrado');
    }

    return usuario;
}

async function criarUsuario({ nome, email, senha, tipo, Paciente, Profissional }) {
    const usuarioExistente = await prisma.usuario.findUnique({
        where: { email },
    });

    console.log("model Profissional", Profissional);

    if (usuarioExistente) {
        throw new Error("E-mail já cadastrado!");
    }

    const usuario = await prisma.usuario.create({
        data: {
            nome,
            email,
            senha,
            tipo: tipo.toUpperCase(),
        },
    });

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

    if (tipo.toUpperCase() === "PROFISSIONAL" && Profissional) {
        await prisma.profissional.create({
            data: {
                usuario_id: usuario.id,
                especialidade: Profissional.especialidade,
                localizacao: Profissional.localizacao,
                faixa_etaria: Profissional.faixa_etaria,
                atendimentos_gratuitos: Profissional.atendimentos_gratuitos,
                foto: Profissional.foto,
            }
        });
    }
    return usuario;
}

async function atualizarUsuario(id, { nome, email, Paciente, Profissional }) {
    const usuario = await prisma.usuario.findUnique({
        where: { id },
    });

    if (!usuario) {
        throw new Error('Usuário não encontrado');
    }

    const usuarioAtualizado = await prisma.usuario.update({
        where: { id },
        data: {
            nome,
            email,
        },
    });

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
}

async function deletarUsuario(id) {
    const usuario = await prisma.usuario.findUnique({
        where: { id },
    });

    if (!usuario) {
        throw new Error('Usuário não encontrado!');
    }

    await prisma.usuario.delete({
        where: { id },
    });
}

module.exports = { listarUsuarios, buscarUsuarioPorId, criarUsuario, atualizarUsuario, deletarUsuario };
