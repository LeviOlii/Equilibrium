const Testimony = require("../models/Testimony");

exports.getAllTestimonies = async (req, res) => {
    try {
        const testimonies = await Testimony.find();
        res.json(testimonies);
    } catch (error) {
        res.status(500).json({ message: "Erro ao buscar depoimentos" });
    }
};

exports.createTestimony = async (req, res) => {
    try {
        const { name, role, testimony } = req.body;
        const newTestimony = new Testimony({ name, role, testimony });
        await newTestimony.save();
        res.status(201).json(newTestimony);
    } catch (error) {
        res.status(500).json({ message: "Erro ao criar depoimento" });
    }
};
