const express = require("express");
const Disponibilidade = require("../controllers/disponibilidade.controller");

const router = express.Router();

//Definindo rotas
router.post("/disponibilidades", Disponibilidade.criarDisponibilidade);
router.post("/disponibilidades/multiplas", Disponibilidade.criarMultiplasDisponibilidades);
router.get("/disponibilidades/:id", Disponibilidade.buscarDisponibilidadesPorId); // Rota pra obter disponibilidade por id de disponibilidade
router.get("/profissionais/disponibilidades/:id", Disponibilidade.buscarDisponibilidadesPorIdProfissional);
router.put("/profissionais/disponibilidades/:id", Disponibilidade.atualizarDisponibilidade);
router.delete("/profissionais/disponibilidades/:id", Disponibilidade.deletarDisponibilidade);

module.exports = router;