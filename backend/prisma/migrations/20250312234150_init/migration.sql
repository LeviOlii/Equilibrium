/*
  Warnings:

  - You are about to drop the `Anamnese` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `historico_familiar` to the `Paciente` table without a default value. This is not possible if the table is not empty.
  - Added the required column `objetivo_terapia` to the `Paciente` table without a default value. This is not possible if the table is not empty.
  - Added the required column `queixas` to the `Paciente` table without a default value. This is not possible if the table is not empty.
  - Added the required column `uso_medicamentos` to the `Paciente` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Anamnese" DROP CONSTRAINT "Anamnese_paciente_id_fkey";

-- AlterTable
ALTER TABLE "Paciente" ADD COLUMN     "historico_familiar" TEXT NOT NULL,
ADD COLUMN     "objetivo_terapia" TEXT NOT NULL,
ADD COLUMN     "queixas" TEXT NOT NULL,
ADD COLUMN     "uso_medicamentos" TEXT NOT NULL;

-- DropTable
DROP TABLE "Anamnese";

-- CreateTable
CREATE TABLE "EvolucaoClinica" (
    "id" SERIAL NOT NULL,
    "pacienteId" INTEGER NOT NULL,
    "profissionalId" INTEGER NOT NULL,
    "data" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "relatoAtendimento" TEXT NOT NULL,
    "ajustesNoTratamento" TEXT NOT NULL,

    CONSTRAINT "EvolucaoClinica_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "EvolucaoClinica" ADD CONSTRAINT "EvolucaoClinica_pacienteId_fkey" FOREIGN KEY ("pacienteId") REFERENCES "Paciente"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "EvolucaoClinica" ADD CONSTRAINT "EvolucaoClinica_profissionalId_fkey" FOREIGN KEY ("profissionalId") REFERENCES "Profissional"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
