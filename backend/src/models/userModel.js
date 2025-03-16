const express = require('express')
const prisma = require('../prisma.js');
const app = express();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken')



const EmailExists = async (req) => { // can use it for both login and register

    const { email } = req.body;
    try {
        const emailExists = await prisma.usuario.findUnique({
            where: {
                email: email,
            },
        })

        if (emailExists) {
            return { code: 409 }
        } else {
            return { code: 404 }
        }
    } catch (error) {
        return { code: 500 }
    }

}

const register = async (req, res) => {

    console.log('acabei de receber uma req')

    const { nome, email, senha, tipo } = req.body;

    // check if email exists
    // return 409 if yes
    // ocorreu um erro pra 500
    // 200 navigate

    const result = await EmailExists(req);

    if (result.code == 409) {
        return res.status(result.code).json({ message: "Email já esta cadastrado" })
    }

    if (result.code == 500) {
        return res.status(result.code).json({ message: "Internal server error" })
    }

    const hashed_senha = await bcrypt.hash(senha, 14);

    // if tipo paciente
    if (tipo === "PACIENTE"){
        
    }

    try {
        const user = await prisma.usuario.create({
            data: {
                nome: nome,
                email: email,
                senha: hashed_senha,
                tipo: tipo,
            }

        // paciente.create
        })

    // else

        return res.status(201).json({ message: "User created" , id: user.id});

    } catch (error) {
        return res.status(500).json({ message: "Internal server error" });
    }

}

const login = async (req, res) => {

    const { email, senha } = req.body;
    const result = await EmailExists(req);
    if (result.code == 404) {
        return res.status(result.code).json({ message: "Email não cadastrado" })
    }
    if (result.code == 500) {
        return res.status(result.code).json({ message: "Internal server error" })
    }

    const user = await prisma.usuario.findUnique({
        where: {
            email: email
        }
    })

    const success = await bcrypt.compare(senha, user.senha); 

    if (success) {
        const token = jwt.sign(
            {tipo: user.tipo, },
            SECRET_KEY,
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


module.exports = { register, login}



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