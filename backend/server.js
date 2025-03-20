const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const testimonyRoutes = require("./routes/testimonyRoutes");

const app = express();
app.use(express.json());
app.use(cors());

mongoose.connect("mongodb://localhost:27017/equilibrium", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(() => console.log("MongoDB conectado"))
.catch((err) => console.error("Erro ao conectar no MongoDB", err));

app.use("/api/depoimentos", testimonyRoutes);

app.listen(3001, () => console.log("Servidor rodando na porta 3001"));
