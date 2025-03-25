const express = require('express');
const cors = require("cors");
const cookieParser = require("cookie-parser");
const userRoutes = require('./routes/user.routes');
const professionalRoutes = require("./routes/professional.routes");
const disponibilidadeRoutes = require("./routes/disponibilidade.routes");

const app = express();

app.use(cors({
    origin: "http://localhost:5173",
    credentials: true
}));

app.use(cookieParser());
app.use(express.json());
app.use("/api", userRoutes);
app.use("/api", professionalRoutes);
app.use("/api", disponibilidadeRoutes);


const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});
