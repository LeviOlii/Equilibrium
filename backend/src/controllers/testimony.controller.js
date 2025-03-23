const Testimony = require("../models/Testimony");
const Usuario = require("../models/Usuario");

// Listar depoimentos com nome do usuário
exports.listarTestimonies = async (req, res) => {
    try {
        const testimonies = await Testimony.findAll({
            include: {
                model: Usuario,
                attributes: ["nome"], // Busca apenas o nome do usuário
            },
        });

        // Ajusta os depoimentos para incluir o nome corretamente
        const response = testimonies.map(t => ({
            id: t.id,
            name: t.Usuario.nome, // Nome do usuário associado
            role: t.role,
            testimony: t.testimony,
        }));

        res.json(response);
    } catch (error) {
        res.status(500).json({ error: "Erro ao buscar depoimentos" });
    }
};

// Criar depoimento associado a um usuário
exports.criarTestimony = async (req, res) => {
    try {
        const { usuario_id, role, testimony } = req.body;
        if (!testimony) return res.status(400).json({ error: "O depoimento é obrigatório" });

        const newTestimony = await Testimony.create({ usuario_id, role, testimony });
        res.status(201).json(newTestimony);
    } catch (error) {
        res.status(500).json({ error: "Erro ao criar depoimento" });
    }
};
