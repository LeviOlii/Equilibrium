const express = require('express');
const { register, login } = require('./models/userModel.js');

const app = express();
const cors = require('cors');

app.use(cors());

app.use(cors({
    origin: "http://localhost:5173"
}));

app.use(express.json());

// Definir as rotas diretamente no app
app.post('/api/auth/signup', register);
app.post('/api/auth/login', login)
app.post('/api/util/checkEmail', )

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`🚀 Server running on port ${PORT}`);
});
