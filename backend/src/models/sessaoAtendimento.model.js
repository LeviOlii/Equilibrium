const prisma = require("../prisma");

const criarSessaoAtendimento = async ({ profissional_id, paciente_id, disponibilidade_id, status, avaliacao }) => {
    const profissionalExistente = await prisma.profissional.findUnique({
        where: { id: profissional_id },
    });

    if (!profissionalExistente) {
        throw new Error("O profissional informado não está cadastrado.");
    }

    const pacienteExistente = await prisma.paciente.findUnique({
        where: { id: paciente_id },
    });

    if (!pacienteExistente) {
        throw new Error("O paciente informado não está cadastrado.");
    }

    const disponibilidadeExistente = await prisma.disponibilidade.findUnique({
        where: { id: disponibilidade_id,
                 disponivel: true },
        
    });

    if (!disponibilidadeExistente) {
        throw new Error("A disponibilidade informada não está cadastrada ou não está disponível.");
    }

    return await prisma.sessaoAtendimento.create({
        data: {
            profissional_id, 
            paciente_id,      
            disponibilidade_id,
            status,
            avaliacao: avaliacao || null
        }
    });
};

const listarSessoes = async () => {
    return await prisma.sessaoAtendimento.findMany({
        include: { profissional: true, paciente: true, evolucao: true }
    });
};

const buscarSessaoPorId = async (id) => {
    const sessao = await prisma.sessaoAtendimento.findUnique({
        where: { id },
        include: { profissional: true, paciente: true }
    });

    if (!sessao) {
        throw new Error('Sessão não encontrada.');
    }

    return sessao;
};

const atualizarSessao = async (id, { disponibilidade, status, avaliacao, evolucaoClinica }) => {
    return await prisma.$transaction(async (prisma) => {
        const sessaoExistente = await prisma.sessaoAtendimento.findUnique({
            where: { id },
            include: { paciente: true, profissional: true },
        });

        if (!sessaoExistente) {
            throw new Error("Sessão não encontrada.");
        }

        let evolucaoId = sessaoExistente.evolucao_id;

        if (status === "Realizado" && !evolucaoId) {
            const relato = evolucaoClinica?.relatoAtendimento ?? "Aguardando preenchimento";
            const ajustes = evolucaoClinica?.ajustesNoTratamento ?? "Aguardando preenchimento";

            const evolucao = await prisma.evolucaoClinica.create({
                data: {
                    pacienteId: sessaoExistente.paciente.id,
                    profissionalId: sessaoExistente.profissional.id,
                    relatoAtendimento: relato,  // Aqui garante que usa o valor correto
                    ajustesNoTratamento: ajustes, // Aqui garante que usa o valor correto
                    sessaoId: id,
                },
            });

            evolucaoId = evolucao.id;
        }

        const sessao = await prisma.sessaoAtendimento.update({
            where: { id },
            data: { disponibilidade, status, avaliacao, evolucao_id: evolucaoId },
        });

        return sessao;
    });
};



const deletarSessao = async (id) => {
    return await prisma.sessaoAtendimento.delete({
        where: { id },
    });
};

module.exports = {
    criarSessaoAtendimento,
    listarSessoes,
    buscarSessaoPorId,
    atualizarSessao,
    deletarSessao
};
