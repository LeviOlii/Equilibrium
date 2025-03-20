const express = require('express');
const userRoutes = require('./routes/user.routes');
const cookieParser = require('cookie-parser');

const app = express();
const cors = require('cors');

app.use(cors({
    origin: "http://localhost:5173",
    credentials: true
}));

app.use(cookieParser());

app.use(express.json());
app.use("/api", userRoutes);



const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});