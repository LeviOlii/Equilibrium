-- CreateEnum
CREATE TYPE "TipoUsuario" AS ENUM ('PACIENTE', 'PROFISSIONAL');

-- CreateTable
CREATE TABLE "Usuario" (
    "id" SERIAL NOT NULL,
    "nome" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "senha" TEXT NOT NULL,
    "tipo" "TipoUsuario" NOT NULL,

    CONSTRAINT "Usuario_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Paciente" (
    "id" SERIAL NOT NULL,
    "usuario_id" INTEGER NOT NULL,
    "idade" INTEGER NOT NULL,
    "genero" TEXT NOT NULL,

    CONSTRAINT "Paciente_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Profissional" (
    "id" SERIAL NOT NULL,
    "usuario_id" INTEGER NOT NULL,
    "especialidade" TEXT NOT NULL,
    "localizacao" TEXT NOT NULL,
    "faixa_etaria" TEXT NOT NULL,
    "atendimentos_gratuitos" BOOLEAN NOT NULL,
    "foto" TEXT,

    CONSTRAINT "Profissional_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Anamnese" (
    "id" SERIAL NOT NULL,
    "paciente_id" INTEGER NOT NULL,
    "queixas" TEXT NOT NULL,
    "historico_familiar" TEXT NOT NULL,
    "uso_medicamentos" TEXT NOT NULL,
    "objetivo_terapia" TEXT NOT NULL,

    CONSTRAINT "Anamnese_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "SessaoAtendimento" (
    "id" SERIAL NOT NULL,
    "paciente_id" INTEGER NOT NULL,
    "profissional_id" INTEGER NOT NULL,
    "data" TIMESTAMP(3) NOT NULL,
    "status" TEXT NOT NULL,
    "avaliacao" TEXT,

    CONSTRAINT "SessaoAtendimento_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Usuario_email_key" ON "Usuario"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Paciente_usuario_id_key" ON "Paciente"("usuario_id");

-- CreateIndex
CREATE UNIQUE INDEX "Profissional_usuario_id_key" ON "Profissional"("usuario_id");

-- AddForeignKey
ALTER TABLE "Paciente" ADD CONSTRAINT "Paciente_usuario_id_fkey" FOREIGN KEY ("usuario_id") REFERENCES "Usuario"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Profissional" ADD CONSTRAINT "Profissional_usuario_id_fkey" FOREIGN KEY ("usuario_id") REFERENCES "Usuario"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Anamnese" ADD CONSTRAINT "Anamnese_paciente_id_fkey" FOREIGN KEY ("paciente_id") REFERENCES "Paciente"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SessaoAtendimento" ADD CONSTRAINT "SessaoAtendimento_paciente_id_fkey" FOREIGN KEY ("paciente_id") REFERENCES "Paciente"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SessaoAtendimento" ADD CONSTRAINT "SessaoAtendimento_profissional_id_fkey" FOREIGN KEY ("profissional_id") REFERENCES "Profissional"("id") ON DELETE CASCADE ON UPDATE CASCADE;
