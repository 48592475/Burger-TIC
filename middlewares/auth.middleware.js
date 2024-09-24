import jwt from "jsonwebtoken";
import UsuariosService from "../services/usuarios.service.js";

export const verifyToken = async (req, res, next) => {
    try {
        const authHeader = req.headers['authorization'];
        if (!authHeader || !authHeader.split("Bearer ")) {
            return res.status(401).json({ message: "No autorizado, token faltante o mal formado" });
        }
        const token = authHeader.split(" ")[1];
        const veryfi = jwt.verify(token, "Hola como estas");
        if (!veryfi.id) {
            return res.status(401).json({ message: "Token inválido, falta el id de usuario" });
        }
        req.userId = veryfi.id;
        next();
    } catch (error) {
        return res.status(401).json({ message: "Token inválido o expirado" });
    }
};

export const verifyAdmin = async (req, res, next) => {
    try{
        const usuario = await UsuariosService.getUsuarioById(req.userId);
        if(!usuario || usuario.admin === false){
            return res.status(403).json({error: 'No tenes el permiso para poder hacer esta acción1'})
        }
    } catch (error){
        return res.status(403).json({error: 'No tenes el permiso para poder hacer esta acción2'})
    }
    next();
};



//camino del login