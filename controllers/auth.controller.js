import UsuariosService from "../services/usuarios.service.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import usuariosService from "../services/usuarios.service.js";


const register = async (req, res) => {
    const user = req.body;
    if (!user) {
        return res.status(400).json({ message: "No hay ningun usuario" });
    }
    if (!user.nombre || !user.apellido || !user.email || !user.password) {
        return res.status(400).json({ message: "Hay 1 campo o más sin completar" });
    }
    try {
        const usuarioMail = await usuariosService.getUsuarioByEmail(user.email);
        if (usuarioMail) {
            return res.status(400).json({ message: "El usuario ya existe con ese email" });
        }

        const hashedPassword = await bcrypt.hash(user.password, 10);
        user.password = hashedPassword;

        const UsuarioNew = await usuariosService.createUsuario(user);

        return res.status(201).json({ message: "Usuario creado de forma exitosa" });

    } catch (error) {
        console.error("Error al registrar usuario:", error);
        return res.status(500).json({ message: error.message });
    }
};
const login = async (req, res) => {
    const { email,password } = req.body;
    if (!email||!password){
        return res.status(400).json({ message: "Hay campos sin completar" });
    }
    try{
        const user=await usuariosService.getUsuarioByEmail(email);
        if(!user){
            return res.status(400).json({ message: "No hay ningun usuario, con ese email" });
        }
        const contraValida=await bcrypt.compare(password,user.password);
        if(!contraValida){
            return res.status(400).json({message:"Contraseña incorrecta, intente nuevamente"});
        }
        const token=jwt.sign({id:user.id},"Hola como estas",{expiresIn:"1h"});
        return res.status(200).json({user, token})
    }catch(e){
        return res.status(500).json({message:error.message});
    } 
};

export default { register, login };
