const cookieParser = require("cookie-parser");
const jwt = require('jsonwebtoken');


const userAuthMiddleware = async (req, res, next) => {

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
                return res.status(401).json({message:"forbidden"})
            }
        }
        next()
            
    } catch (err) {
        return res.status(500).json({"message":"Internal server error"});
    }

}

module.exports = {userAuthMiddleware};