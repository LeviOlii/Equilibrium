const prisma = require('../prisma');

const listarTestimonies = async (req, res) => {
  try {
    const testimonies = await prisma.testimony.findMany();
    res.status(200).json(testimonies);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erro ao buscar depoimentos' });
  }
};

const criarTestimony = async (req, res) => {
  const { name, role, testimony } = req.body;

  if (!testimony) {
    return res.status(400).json({ error: 'Depoimento é obrigatório' });
  }

  try {
    const newTestimony = await prisma.testimony.create({
      data: {
        name,
        role,
        testimony,
      },
    });
    res.status(201).json(newTestimony);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erro ao criar depoimento' });
  }
};

module.exports = { listarTestimonies, criarTestimony };

