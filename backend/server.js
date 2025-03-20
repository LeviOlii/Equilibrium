const express = require("express");
const cors = require("cors");
const connectDB = require("./database");
const testimonyRoutes = require("./routes/testimonyRoutes");

const app = express();
app.use(express.json());
app.use(cors());

// Conectar ao banco de dados
connectDB();

// Rotas
app.use("/api/depoimentos", testimonyRoutes);

app.listen(3001, () => console.log("Servidor rodando na porta 3001"));
