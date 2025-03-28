const express = require('express');
const cors = require("cors");
const cookieParser = require("cookie-parser");
const userRoutes = require('./routes/user.routes');
const professionalRoutes = require("./routes/professional.routes");
const disponibilidadeRoutes = require("./routes/disponibilidade.routes");
const sessaoAtendimento = require("./routes/sessaoAtendimento.routes");
const evolucaoClinica = require("./routes/evolucaoClinica.routes");

const app = express();

app.use(cors({
    origin: "http://localhost:5173",
    credentials: true
}));

app.use(cookieParser());
app.use(express.json({ limit: '50mb' })); 
app.use(express.urlencoded({ limit: '50mb', extended: true, parameterLimit: 100000 }));
//https://stackoverflow.com/questions/52016659/nodejs-router-payload-too-large




app.use("/api", userRoutes);
app.use("/api", professionalRoutes);
app.use("/api", disponibilidadeRoutes);
app.use("/api", sessaoAtendimento);
app.use("/api", evolucaoClinica);


const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});
