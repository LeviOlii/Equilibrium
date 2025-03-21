const express = require("express");
const cors = require("cors");
const sequelize = require("./config/database");
const testimonyRoutes = require("./routes/testimonies");

const app = express();
app.use(cors());
app.use(express.json());

app.use("/api/depoimentos", testimonyRoutes);

const startServer = async () => {
    try {
        await sequelize.sync();
        console.log("Banco de dados sincronizado");

        app.listen(3001, () => {
            console.log("Servidor rodando na porta 3001");
        });
    } catch (error) {
        console.error("Erro ao conectar ao banco de dados:", error);
    }
};

startServer();
