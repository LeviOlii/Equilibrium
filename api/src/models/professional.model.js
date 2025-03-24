const prisma = require("../prisma");

const getAllProfissionais = async () => {
  try {
    return await prisma.profissional.findMany({
      include: {
        usuario: true,
      },
    });
  } catch (error) {
    throw new Error(`Erro ao buscar profissionais: ${error.message}`);
  }
};

const getProfissionalById = async (id) => {
  try {
    return await prisma.profissional.findUnique({
      where: { id: parseInt(id) },
      include: {
        usuario: true,
      },
    });
  } catch (error) {
    throw new Error(`Erro ao buscar profissional: ${error.message}`);
  }
};

module.exports = { getAllProfissionais, getProfissionalById };
