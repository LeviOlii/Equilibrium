const express = require("express");
const router = express.Router();
const EvolucaoClinicaController = require("../controllers/evolucaoClinica.controller");

router.post("/", EvolucaoClinicaController.criarEvolucaoClinica);
router.get("/", EvolucaoClinicaController.listarEvolucoes);
router.get("/:id", EvolucaoClinicaController.buscarEvolucaoPorId);
router.put("/:id", EvolucaoClinicaController.atualizarEvolucao);
router.delete("/:id", EvolucaoClinicaController.deletarEvolucao);

module.exports = router;
