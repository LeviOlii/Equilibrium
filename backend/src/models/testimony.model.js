import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// Define o modelo de depoimentos
async function createTestimony(data) {
    return await prisma.testimony.create({
        data,
    });
}

async function getTestimonies() {
    return await prisma.testimony.findMany({
        include: { usuario: true },
    });
}

export { createTestimony, getTestimonies };


// Define a relação entre Testimony e Usuario
Testimony.belongsTo(Usuario, { foreignKey: "usuario_id" });

module.exports = Testimony;
