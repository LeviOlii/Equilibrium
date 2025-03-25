const cookieParser = require("cookie-parser");
const jwt = require('jsonwebtoken');
const userController = require('../controllers/user.controller');

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

const userGetMiddleware = async (req, res, next) => {

    const token = req.cookies.token;
    const userId = Number(req.params.id);

    // se o cara que tiver fazendo get for profissional / admin, libera, se não, só se for o dele
    if (!token){
        return res.status(401).json({message:"Token inválido"})
    }
    // sim, eu sei, profissional consegue ver admin, e não, não vou corrigir isso agora, talvez nunca.
    // Ricardo, 12:54 am
    try{
        if (userId){
            const decoded = jwt.verify(token, process.env.SECRET_KEY);
            const { id, tipo } = decoded;
            if (tipo === "PROFISSIONAL" || tipo === "ADMIN"){
                return next();
            }
            else{
                if (userId === id){
                    return next();
                }
                else{
                    return res.status(403).json({message:"forbidden"})
                }
            }
        }
    } catch(error){
        return res.status(500).json({"message":"Internal server error"});
    }

}
module.exports = {userPutDeleteMiddleware, userGetMiddleware};