const jwt = require('jsonwebtoken');
const prisma = require("../prisma");
const bcrypt = require('bcrypt');

const login = async (req, res) => {


    const { email, senha } = req.body;

    const usuario = await prisma.usuario.findUnique({
        where: { email },
    });

    if (!usuario) {
        return res.status(404).json({ "message": "Dados inválidos" });
    }

    const success = await bcrypt.compare(senha, usuario.senha);

    if (success) {
        const token = jwt.sign(
            { tipo: usuario.tipo, id: usuario.id },
            process.env.SECRET_KEY,
            { expiresIn: "24h" }
        );

        res.cookie("token", token, {
            httpOnly: true,
            sameSite: "Lax",
            maxAge: 1 * 60 * 60 * 1000
        });

        return res.status(200).json({ "message": "Login realizado com sucesso" });
    } else {
        return res.status(404).json({ message: "Dados inválidos" });
    }
};

const logout = async (req, res) => {
    res.clearCookie('token', { path: "/" });
    res.status(200).json({ "message": "Logout concluido" });
};

const checkAuth = async (req, res) => {

    const token = req.cookies.token;

    if (!token) {
        return res.json({ isLoggedIn: false });
    }

    try {
        const decoded = jwt.verify(token, process.env.SECRET_KEY);
        const { id, tipo } = decoded;
        return res.json({ isLoggedIn: true, user: { id, tipo } });
    } catch (err) {
        return res.json({ isLoggedIn: false });
    }
};

module.exports = {
    login,
    logout,
    checkAuth
};
