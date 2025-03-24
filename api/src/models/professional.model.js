const prisma = require("../prisma");

// Função para buscar todos os profissionais
export default async function getAllProfissionais(){
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

export default async function getProfissionalById(id) {
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


