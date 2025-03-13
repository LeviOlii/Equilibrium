-- CreateTable
CREATE TABLE "GrupodeApoio" (
    "id" SERIAL NOT NULL,
    "nome" TEXT NOT NULL,
    "descricao" TEXT NOT NULL,
    "regiao" TEXT NOT NULL,

    CONSTRAINT "GrupodeApoio_pkey" PRIMARY KEY ("id")
);
