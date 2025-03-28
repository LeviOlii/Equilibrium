const prisma = require("../prisma");
const express = require("express");

const criarDisponibilidade = async ({ profissional_id, dataHora, disponivel }) => {
    const profissionalExistente = await prisma.profissional.findUnique({
      where: { id: profissional_id },
    });
  
    if (!profissionalExistente) {
      throw new Error("Id informado não é referente a um profissional registrado.");
    }
    
    const disponibilidade = await prisma.disponibilidade.create({
      data: {
        profissional_id,
        dataHora,
        disponivel,
      },         
    });
  
    return disponibilidade;
  };
  
  const criarMultiplasDisponibilidades = async (disponibilidades) => {
    // Verifica se há disponibilidades
    if (!disponibilidades || disponibilidades.length === 0) {
      throw new Error("Nenhuma disponibilidade fornecida.");
    }
  
    // Verifica se o profissional existe (usando o primeiro item como referência)
    const profissionalId = disponibilidades[0].profissional_id;
    const profissionalExistente = await prisma.profissional.findUnique({
      where: { id: profissionalId },
    });
  
    if (!profissionalExistente) {
      throw new Error("Profissional não encontrado.");
    }
  
    // Cria todas as disponibilidades em uma transação
    const createdAvailabilities = await prisma.$transaction(
      disponibilidades.map(disponibilidade => 
        prisma.disponibilidade.create({
          data: {
            profissional_id: disponibilidade.profissional_id,
            dataHora: disponibilidade.dataHora,
            disponivel: disponibilidade.disponivel
          }
        })
      )
    );
  
    return createdAvailabilities;
  };

const buscarDisponibilidadesPorIdProfissional = async (profissional_id) => {
    const idInt = parseInt(profissional_id, 10); // Converte para número inteiro

    if (isNaN(idInt)) {
        throw new Error('ID do profissional inválido.');
    }

    const disponibilidades = await prisma.disponibilidade.findMany({
        where: {
            profissional_id: idInt, // Agora é um número inteiro
        },
    });

    if (disponibilidades.length === 0) {
        throw new Error('Nenhuma disponibilidade encontrada para esse profissional');
    }

    return disponibilidades; // Retorna apenas as disponibilidades
}

const buscarDisponibilidadesPorId = async (id) => {
    const idInt = parseInt(id, 10); // Converte para número inteiro

    if (isNaN(idInt)) {
        throw new Error('ID do profissional inválido.');
    }

    const disponibilidade = await prisma.disponibilidade.findMany({
        where: {
            id: idInt, // Agora é um número inteiro
        },
    });

    if (disponibilidade.length === 0) {
        throw new Error('Nenhuma disponibilidade encontrada para esse profissional');
    }

    return disponibilidade; // Retorna apenas as disponibilidades
}


const atualizarDisponibilidade = async (id, { dataHora, disponivel }) => {
    const idInt = parseInt(id, 10); // Converte para número inteiro

    if (isNaN(idInt)) {
        throw new Error('ID do profissional inválido.');
    }

    // Verifica se a disponibilidade existe
    const disponibilidadeExistente = await prisma.disponibilidade.findUnique({
        where: { id: idInt },
    });

    if (!disponibilidadeExistente) {
        throw new Error("Disponibilidade não encontrada.");
    }

    // Atualiza apenas os campos permitidos
    const disponibilidadeAtualizada = await prisma.disponibilidade.update({
        where: { id: idInt },
        data: {
            dataHora,
            disponivel,
        },
    });

    return disponibilidadeAtualizada;
};

const deletarDisponibilidade = async (id) => {
    // Verifica se existe o usuário
    const disponibilidade = await prisma.disponibilidade.findUnique({
        where: { id },
    });

    if (!disponibilidade) {
        throw new Error('Disponibilidade não encontrada!');
    }

    await prisma.disponibilidade.delete({
        where: { id },
    });
};

module.exports = {
    criarDisponibilidade,
    criarMultiplasDisponibilidades,
    buscarDisponibilidadesPorIdProfissional,
    buscarDisponibilidadesPorId,
    atualizarDisponibilidade,
    deletarDisponibilidade,
};