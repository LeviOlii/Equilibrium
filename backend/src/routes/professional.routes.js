const express = require("express");
const { getProfissionais, getProfissional } = require("../controllers/professional.controller");

const router = express.Router();

// Rota para obter todos os profissionais
router.get("/profissionais", getProfissionais);
router.get('/profissionais/:id', getProfissional);

module.exports = router;
