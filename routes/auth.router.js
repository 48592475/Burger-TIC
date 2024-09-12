import Router from "express";
import AuthController from "../controllers/auth.controller.js";
import bcrypt from"bcryptjs";
import jwt from "jsonwebtoken";
import authController from "../controllers/auth.controller.js";

const router = Router();

// ------------- COMPLETAR LAS RUTAS DE LOGIN Y REGISTER -------------

router.post("/register", authController.register);
router.post("/login", authController.login);



export default router;
