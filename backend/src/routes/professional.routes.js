const express = require("express");
const { getProfissionais } = require("../controllers/professional.controller");

const router = express.Router();

// Rota para obter todos os profissionais
router.get("/profissionais", getProfissionais);

module.exports = router;
