const { getAllProfissionais } = require("../models/professional.model");

// Controller para buscar todos os profissionais
const getProfissionais = async (req, res) => {
  try {
    const profissionais = await getAllProfissionais();
    res.json(profissionais);
  } catch (error) {
    console.error("Erro ao buscar profissionais:", error.message);
    res.status(500).json({ message: "Erro ao buscar profissionais", error: error.message });
  }
};

module.exports = { getProfissionais };
