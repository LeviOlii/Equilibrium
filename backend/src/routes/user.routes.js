const express = require('express');
const userController = require('../controllers/user.controller');

const router = express.Router();

//Definindo rotas
router.get("/usuarios", userController.listarUsuarios);
router.get("/usuarios/:id", userController.buscarUsuarioPorId);
router.post("/usuarios", userController.criarUsuario);
router.put("/usuarios/:id", userController.atualizarUsuario);
router.delete("/usuarios:id", userController.excluirUsuario);

module.exports = router;