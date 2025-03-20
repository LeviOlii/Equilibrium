const Testimony = require("../models/Testimony");

// Buscar todos os depoimentos
exports.getAllTestimonies = async (req, res) => {
    try {
        const testimonies = await Testimony.find().sort({ createdAt: -1 });
        res.json(testimonies);
    } catch (error) {
        res.status(500).json({ message: "Erro ao buscar depoimentos" });
    }
};

// Criar um novo depoimento
exports.createTestimony = async (req, res) => {
    try {
        const { name, role, testimony } = req.body;
        if (!testimony || testimony.trim() === "") {
            return res.status(400).json({ message: "O depoimento não pode estar vazio!" });
        }
        const newTestimony = new Testimony({ name, role, testimony });
        await newTestimony.save();
        res.status(201).json(newTestimony);
    } catch (error) {
        res.status(500).json({ message: "Erro ao criar depoimento" });
    }
};

// Deletar um depoimento por ID
exports.deleteTestimony = async (req, res) => {
    try {
        await Testimony.findByIdAndDelete(req.params.id);
        res.status(200).json({ message: "Depoimento removido com sucesso!" });
    } catch (error) {
        res.status(500).json({ message: "Erro ao excluir depoimento" });
    }
};

