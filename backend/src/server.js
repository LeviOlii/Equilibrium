const express = require('express');
const userRoutes = require('./routes/user.routes');

const app = express();
const cors = require('cors');

app.use(cors());

app.use(cors({
    origin: "http://localhost:5173"
}));

app.use(express.json());
app.use("/api", userRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});