/*
  Warnings:

  - You are about to drop the column `data` on the `SessaoAtendimento` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[sessaoId]` on the table `EvolucaoClinica` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[disponibilidade_id]` on the table `SessaoAtendimento` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[evolucao_id]` on the table `SessaoAtendimento` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `disponibilidade_id` to the `SessaoAtendimento` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "EvolucaoClinica" ADD COLUMN     "sessaoId" INTEGER;

-- AlterTable
ALTER TABLE "SessaoAtendimento" DROP COLUMN "data",
ADD COLUMN     "disponibilidade_id" INTEGER NOT NULL,
ADD COLUMN     "evolucao_id" INTEGER,
ALTER COLUMN "status" SET DEFAULT 'Agendado';

-- CreateTable
CREATE TABLE "Disponibilidade" (
    "id" SERIAL NOT NULL,
    "profissional_id" INTEGER NOT NULL,
    "dataHora" TIMESTAMP(3) NOT NULL,
    "disponivel" BOOLEAN NOT NULL DEFAULT true,

    CONSTRAINT "Disponibilidade_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "EvolucaoClinica_sessaoId_key" ON "EvolucaoClinica"("sessaoId");

-- CreateIndex
CREATE UNIQUE INDEX "SessaoAtendimento_disponibilidade_id_key" ON "SessaoAtendimento"("disponibilidade_id");

-- CreateIndex
CREATE UNIQUE INDEX "SessaoAtendimento_evolucao_id_key" ON "SessaoAtendimento"("evolucao_id");

-- AddForeignKey
ALTER TABLE "Disponibilidade" ADD CONSTRAINT "Disponibilidade_profissional_id_fkey" FOREIGN KEY ("profissional_id") REFERENCES "Profissional"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SessaoAtendimento" ADD CONSTRAINT "SessaoAtendimento_disponibilidade_id_fkey" FOREIGN KEY ("disponibilidade_id") REFERENCES "Disponibilidade"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SessaoAtendimento" ADD CONSTRAINT "SessaoAtendimento_evolucao_id_fkey" FOREIGN KEY ("evolucao_id") REFERENCES "EvolucaoClinica"("id") ON DELETE SET NULL ON UPDATE CASCADE;
