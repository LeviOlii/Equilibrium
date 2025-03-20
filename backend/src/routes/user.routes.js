const express = require('express');
const userController = require('../controllers/user.controller');
const auth = require('../auth/auth')

const router = express.Router();

//Definindo rotas
router.get("/usuarios", userController.listarUsuarios);
router.get("/usuarios/:id", userController.buscarUsuarioPorId);
router.post("/usuarios", userController.criarUsuario);
router.put("/usuarios/:id", userController.atualizarUsuario);
router.delete("/usuarios:id", userController.excluirUsuario);

router.get("/check-auth", auth.checkAuth, (req, res) => {
    if (req.isLoggedIn) {
      res.json({ isLoggedIn: true });
    } else {
      res.json({ isLoggedIn: false });
    }
  });

router.post("/login", auth.login);

module.exports = router;