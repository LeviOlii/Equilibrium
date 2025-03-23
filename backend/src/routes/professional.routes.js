const express = require("express");
const multer = require("multer");
const path = require("path");
const { getProfissionais } = require("../controllers/professional.controller");

const router = express.Router();

// Rota para obter todos os profissionais
router.get("/profissionais", getProfissionais);

// Configuração do Multer para armazenar os arquivos de imagem na pasta uploads
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'uploads')
    },
    filename: function (req, file, cb) {
      cb(null, file.originalname)
    }
  })
  
  const upload = multer({ storage: storage })

// Rota para fazer upload de uma imagem
router.post("/profissionais/upload", upload.single("photo"), (req, res) => {
    if(!req.file) {
        return res.status(400).json({ error: "Nenhum arquivo enviado" });
    }

    // URL pública da imagem
    const photoURL = `http://localhost:3000/uploads/${req.file.filename}`;

    res.json({ url: photoURL });
})

module.exports = router;
