const { PrismaClient } = require("@prisma/client"); 
const prisma = new PrismaClient();

// Função para buscar todos os profissionais
const getAllProfissionais = async () => {
  try {
    return await prisma.profissional.findMany({
      include: {
        usuario: true, // Inclui os dados do usuário relacionado
      },
    });
  } catch (error) {
    throw new Error(`Erro ao buscar profissionais: ${error.message}`);
  }
};

const getProfissionalById = async (id) => {
  try {
    return await prisma.profissional.findUnique({
      where: { id: parseInt(id) }, // Importante fazer parseInt pra garantir número
      include: {
        usuario: true, // Inclui o usuário relacionado
      },
    });
  } catch (error) {
    throw new Error(`Erro ao buscar profissional: ${error.message}`);
  }
};


module.exports = { getAllProfissionais, getProfissionalById };
