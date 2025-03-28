const express = require("express");
const router = express.Router();
const SessaoAtendimentoController = require("../controllers/sessaoAtendimento.controller");

router.post("/sessoes", SessaoAtendimentoController.criarSessaoAtendimento);
router.get("/sessoes", SessaoAtendimentoController.listarSessoes);
router.get("/sessoes/:id", SessaoAtendimentoController.buscarSessaoPorId);
router.put("/sessoes/:id", SessaoAtendimentoController.atualizarSessao);
router.delete("/sessoes/:id", SessaoAtendimentoController.deletarSessao);

module.exports = router;
