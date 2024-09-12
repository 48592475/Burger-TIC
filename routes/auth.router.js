import Router from "express";
import AuthController from "../controllers/auth.controller.js";
import bcrypt from"bcryptjs";
import jwt from "jsonwebtoken";

const router = Router();

// ------------- COMPLETAR LAS RUTAS DE LOGIN Y REGISTER -------------


router.post("/registro", async (req, res)=>{
    const{nombre,apellido,email,password}=req.body;
    try{
        const queryEmail="SELECT * FROM usuario WHERE email=$1";
        const resultado=await bd.query(queryEmail,[email]);
        if(resultado.rows.length>0){
            res.status(400).send("El email ya existe, ingrese otro")
        }else{
            const hashedContraseña= await bcrypt.hash(password,10);
            const queryRegistrarse="INSERT INTO usuario (nombre, apellido, email, password) VALUES($1,$2,$3,$4)";
            const resultado1=await bd.query(queryRegistrarse,[nombre,apellido,email,hashedContraseña]);
            res.status(201).send("Usuario registrado correctamente");
        }
    }catch (error){
        console.log("Eror al registrar el usuario:", error.message);
        res.status(500).send(`Error al registrar el usuario: ${error.message}`);    
    }
})

router.post("/login", async(req,res)=>{
    const{email,password}=req.body;
    try{
        const queryInicioDeSesion="SELECT * FROM usuarios WHERE email=$1";
        const resultado2=await bd.query(queryInicioDeSesion, [email]);
        if(resultado2.rows.length>0){
            const email=resultado2.rows[0];
            const contraseñaHashed=email.password;
            const contraseñaCorrecta=await bcrypt.compare(password,contraseñaHashed);
            //if(contraseñaCorrecta)
        }

    }
    catch(e) {

    }
}
)

export default router;
