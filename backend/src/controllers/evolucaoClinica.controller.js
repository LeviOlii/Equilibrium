const EvolucaoClinica = require("../models/evolucaoClinica.model");

exports.criarEvolucaoClinica = async (req, res) => {
    try {
        const { pacienteId, profissionalId, relatoAtendimento, ajustesNoTratamento, sessaoId } = req.body;
        console.log("Dados recebidos:", req.body);


        if (!pacienteId || !profissionalId || !relatoAtendimento || !ajustesNoTratamento) {
            return res.status(400).json({ error: "Todos os campos obrigatórios devem ser preenchidos." });
        }

        const evolucao = await EvolucaoClinica.criarEvolucaoClinica({
            pacienteId,
            profissionalId,
            relatoAtendimento,
            ajustesNoTratamento,
            sessaoId,
        });

        return res.status(201).json(evolucao);
    } catch (error) {
        return res.status(400).json({ error: error.message });
    }
};

exports.listarEvolucoes = async (req, res) => {
    try {
        const evolucoes = await EvolucaoClinica.listarEvolucoes();
        return res.json(evolucoes);
    } catch (error) {
        return res.status(500).json({ error: "Erro ao listar evoluções." });
    }
};

exports.buscarEvolucaoPorId = async (req, res) => {
    try {
        const id = Number(req.params.id);
        if (isNaN(id)) return res.status(400).json({ error: "ID inválido." });

        const evolucao = await EvolucaoClinica.buscarEvolucaoPorId(id);
        if (!evolucao) return res.status(404).json({ error: "Evolução não encontrada." });

        return res.json(evolucao);
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
};

exports.atualizarEvolucao = async (req, res) => {
    try {
        const id = Number(req.params.id);
        if (isNaN(id)) return res.status(400).json({ error: "ID inválido." });

        const evolucao = await EvolucaoClinica.atualizarEvolucao(id, req.body);
        return res.json(evolucao);
    } catch (error) {
        return res.status(400).json({ error: error.message });
    }
};

exports.deletarEvolucao = async (req, res) => {
    try {
        const id = Number(req.params.id);
        if (isNaN(id)) return res.status(400).json({ error: "ID inválido." });

        await EvolucaoClinica.deletarEvolucao(id);
        return res.json({ message: "Evolução deletada com sucesso." });
    } catch (error) {
        return res.status(400).json({ error: error.message });
    }
};
