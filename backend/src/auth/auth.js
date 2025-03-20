const jwt = require('jsonwebtoken')
const prisma = require("../prisma");
const bcrypt = require('bcrypt');

const login = async (req, res) => {

    const { email, senha } = req.body;

    const usuario = await prisma.usuario.findUnique({
        where: { email },
    });

    if(!usuario) {
        throw new Error('Email não cadastrado');
    }

    console.log(usuario);

    const success = await bcrypt.compare(senha, usuario.senha ); 

    if (success) {
        
        const token = jwt.sign(
            {tipo: usuario.tipo},
            "abc",
            {expiresIn : "24h"} // add option for 30 days
        )

        res.cookie("token", token, {
            httpOnly: true,
            //secure: true
            sameSite: "Strict",
            maxAge: 24 * 60 * 60 * 1000 // 24h
        })

        return res.status(200).json({"message":"Login realizado com sucesso"})
    }

    else {
        return res.status(400).json({ message: "Dados invállidos" })
    }

}

module.exports = {login}

/*
const jwt = require("jsonwebtoken");

function authPaciente(req, res, next) {
    const token = req.headers.authorization?.split(" ")[1]; // Pega o token do header

    if (!token) {
        return res.status(401).json({ message: "Acesso negado. Token ausente." });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET); // Verifica o token

        if (decoded.role !== "paciente") {
            return res.status(403).json({ message: "Acesso negado. Apenas pacientes podem acessar." });
        }

        req.user = decoded; // Adiciona os dados do usuário ao request
        next(); // Permite continuar
    } catch (err) {
        return res.status(401).json({ message: "Token inválido." });
    }
}

// Exemplo de uso na rota protegida:
app.get("/area-do-paciente", authPaciente, (req, res) => {
    res.json({ message: "Bem-vindo à área do paciente!" });
});

*/