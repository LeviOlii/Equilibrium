const jwt = require('jsonwebtoken')
const prisma = require("../prisma");
const bcrypt = require('bcrypt');


const login = async (req, res) => {
    const { email, senha } = req.body;

    const usuario = await prisma.usuario.findUnique({
        where: { email },
    });

    if (!usuario) {
        return res.status(404).json({"message":"Email não cadastrado"});
    }
    
    const success = await bcrypt.compare(senha, usuario.senha);

    if (success) {
        const token = jwt.sign(
            { tipo: usuario.tipo, id: usuario.id },
            process.env.SECRET_KEY,
            { expiresIn: "24h" } // add option for 30 days
        )

        res.cookie("token", token, {
            httpOnly: true,
            //secure: true
            sameSite: "Lax",
            maxAge: 1 * 60 * 60 * 1000 // 24h
        })


        return res.status(200).json({ "message": "Login realizado com sucesso" })
    }

    else {
        return res.status(400).json({ message: "Dados invállidos" })
    }
}

const logout = async(req,res) => {
    res.clearCookie('token', {path:"/"});
    res.status(200).json({"message":"Logout concluido"});
}



function checkAuth(req, res) {
    const token = req.cookies.token; // cookie-parser faz a mágica

    if (!token) {
       return res.json({ isLoggedIn: false });
    }

    try {

        const decoded = jwt.verify(token, process.env.SECRET_KEY);
        const { id, tipo } = decoded;
        return res.json({ isLoggedIn: true , user: {id}});

    } catch (err) {
        return res.json({ isLoggedIn: false });
    }
    
}



module.exports = { login, checkAuth, logout }



