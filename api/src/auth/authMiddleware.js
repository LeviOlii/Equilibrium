const cookieParser = require("cookie-parser");
const jwt = require('jsonwebtoken');

const userPutDeleteMiddleware = async (req, res, next) => {
// isso daq significa que só a dona do perfil e o admin pode editar / deletar as informações
    const token = req.cookies.token;
    const userId = Number(req.params.id);

    if (!token){
        return res.status(401).json({message:"Token inválido"})
    }

    try {
        if (userId){
            const decoded = jwt.verify(token, process.env.SECRET_KEY);
            const { id, tipo } = decoded;

            if (userId !== id && tipo !== "ADMIN"){
                return res.status(403).json({message:"forbidden"})
            }
            return next();   
        }
        

    } catch (err) {
        return res.status(500).json({"message":"Internal server error"});
    }

}
module.exports = {userPutDeleteMiddleware}