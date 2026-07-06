import jwt from "jsonwebtoken";
import BlacklistedToken from "../src/login/blacklist.model.js"

export const validateJWT = async (req, res, next) => {

    let token = req.header("x-token");
    
    if (!token) {
        const authHeader = req.header("Authorization");
        if (authHeader && authHeader.startsWith("Bearer ")) {
            token = authHeader.split(" ")[1];
        }
    }

    if (!token) {
        return res.status(401).json({
            success: false,
            message: "Debes iniciar sesión primero"
        });
    }

    try {

        const blacklisted = await BlacklistedToken.findOne({ token });

        if (blacklisted) {
            return res.status(401).json({
                success: false,
                message: "Token inválido (sesión cerrada)"
            });
        }

        const payload = jwt.verify(token, process.env.JWT_SECRET);
        
        req.uid = payload.uid || payload.sub;

        next();

    } catch (error) {
        return res.status(401).json({
            success: false,
            message: "Token inválido"
        });
    }
};