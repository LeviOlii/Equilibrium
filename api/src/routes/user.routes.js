const express = require('express');
const userController = require('../controllers/user.controller');
const auth = require('../auth/auth')
const middleware = require('../auth/authMiddleware');
const router = express.Router();

//Definindo rotas

router.get("/usuarios", userController.listarUsuarios);
router.get("/usuarios/:id", userController.buscarUsuarioPorId);
router.post("/usuarios", userController.criarUsuario);
router.put("/usuarios/:id", middleware.userPutDeleteMiddleware ,userController.atualizarUsuario);
router.delete("/usuarios/:id", middleware.userPutDeleteMiddleware, userController.deletarUsuario);
// EU NÃO TESTEI ESSE DELETE COM MIDDLEWARE, DEVE ESTAR PRESTANDO

router.get("/check-auth", auth.checkAuth);

router.post("/logout", auth.logout);
router.post("/login", auth.login);

module.exports = router;