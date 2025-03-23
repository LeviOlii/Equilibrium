const { getAllProfissionais, getProfissionalById } = require("../models/professional.model");

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

const getProfissional = async (req, res) => {
  const { id } = req.params;
  try {
    const profissional = await getProfissionalById(id);
    if (!profissional) {
      return res.status(404).json({ message: `Profissional com ID ${id} não encontrado.` });
    }
    res.json(profissional);
  } catch (error) {
    console.error(`Erro ao buscar profissional com ID ${id}:`, error.message);
    res.status(500).json({ message: `Erro ao buscar profissional`, error: error.message });
  }
};


module.exports = { getProfissionais, getProfissional };