const prisma = require("../prisma");

const criarEvolucaoClinica = async ({ pacienteId, profissionalId, relatoAtendimento, ajustesNoTratamento, sessaoId }) => {
    const pacienteExistente = await prisma.paciente.findUnique({
        where: { id: pacienteId },
    });
    if (!pacienteExistente) {
        throw new Error("O paciente informado não está cadastrado.");
    }

    const profissionalExistente = await prisma.profissional.findUnique({
        where: { id: profissionalId },
    });
    if (!profissionalExistente) {
        throw new Error("O profissional informado não está cadastrado.");
    }
    
    if (sessaoId) {
        const sessaoExistente = await prisma.sessaoAtendimento.findUnique({ where: { id: sessaoId } });
        if (!sessaoExistente) {
            throw new Error("A sessão de atendimento informada não existe.");
        }
    }

    return await prisma.evolucaoClinica.create({
        data: {
            pacienteId,
            profissionalId,
            relatoAtendimento,
            ajustesNoTratamento,
            sessaoId: sessaoId || null
        }
    });
};

const listarEvolucoes = async () => {
    return await prisma.evolucaoClinica.findMany({
        include: { paciente: true, profissional: true, sessao: true }
    });
};

const buscarEvolucaoPorId = async (id) => {
    const evolucao = await prisma.evolucaoClinica.findUnique({
        where: { id },
        include: { paciente: true, profissional: true, sessao: true }
    });
    if (!evolucao) {
        throw new Error("Evolução clínica não encontrada.");
    }
    return evolucao;
};

const atualizarEvolucao = async (id, { relatoAtendimento, ajustesNoTratamento }) => {
    return await prisma.evolucaoClinica.update({
        where: { id },
        data: { relatoAtendimento, ajustesNoTratamento }
    });
};

const deletarEvolucao = async (id) => {
    return await prisma.evolucaoClinica.delete({ where: { id } });
};

module.exports = {
    criarEvolucaoClinica,
    listarEvolucoes,
    buscarEvolucaoPorId,
    atualizarEvolucao,
    deletarEvolucao
};
