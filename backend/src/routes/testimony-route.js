const express = require("express");
const router = express.Router();
const Testimony = require("../models/Testimony");

router.get("/", async (req, res) => {
    try {
        const testimonies = await Testimony.findAll();
        res.json(testimonies);
    } catch (error) {
        res.status(500).json({ error: "Erro ao buscar depoimentos" });
    }
});

router.post("/", async (req, res) => {
    try {
        const { name, role, testimony } = req.body;
        if (!testimony) return res.status(400).json({ error: "O depoimento é obrigatório" });

        const newTestimony = await Testimony.create({ name, role, testimony });
        res.status(201).json(newTestimony);
    } catch (error) {
        res.status(500).json({ error: "Erro ao criar depoimento" });
    }
});

module.exports = router;
