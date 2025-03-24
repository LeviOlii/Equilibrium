// routes/testimony.routes.js
const express = require('express');
const { listarTestimonies, criarTestimony } = require('../controllers/testimony.controller');

const router = express.Router();

router.get('/', listarTestimonies);
router.post('/', criarTestimony);

module.exports = router;

