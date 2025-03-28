const SessaoAtendimento = require("../models/sessaoAtendimento.model");
const EvolucaoClinica = require("../models/evolucaoClinica.model");

exports.criarSessaoAtendimento = async (req, res) => {
    try {
        const sessao = await SessaoAtendimento.criarSessaoAtendimento(req.body);
        return res.status(201).json(sessao);
    } catch (error) {
        return res.status(400).json({ error: error.message });
    }
};

exports.listarSessoes = async (req, res) => {
    try {
        const sessoes = await SessaoAtendimento.listarSessoes();
        return res.json(sessoes);
    } catch (error) {
        return res.status(500).json({ error: "Erro ao listar sessões." });
    }
};

exports.buscarSessaoPorId = async (req, res) => {
    try {
        const sessao = await SessaoAtendimento.buscarSessaoPorId(Number(req.params.id));
        return res.json(sessao);
    } catch (error) {
        return res.status(404).json({ error: error.message });
    }
};

exports.atualizarSessao = async (req, res) => {
    try {
        const sessao = await SessaoAtendimento.atualizarSessao(Number(req.params.id), req.body);
        return res.json(sessao);
    } catch (error) {
        return res.status(400).json({ error: error.message });
    }
};


exports.deletarSessao = async (req, res) => {
    try {
        await SessaoAtendimento.deletarSessao(Number(req.params.id));
        return res.json({ message: "Sessão deletada com sucesso." });
    } catch (error) {
        return res.status(400).json({ error: error.message });
    }
};
