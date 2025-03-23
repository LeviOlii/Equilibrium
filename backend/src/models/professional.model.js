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

module.exports = { getAllProfissionais };
