import Router from "express";
import PedidosController from "../controllers/pedidos.controller.js";
import { verifyAdmin, verifyToken } from "../middlewares/auth.middleware.js";
import pedidosController from "../controllers/pedidos.controller.js";

const router = Router();

// ------------- COMPLETAR LAS RUTAS DE PEDIDOS -------------
// IMPORTANTE: La ruta /usuario debe ir antes que la ruta /:id
// Si no, Express interpretará "usuario" como un id y no funcionará correctamente

// Recordar utilizar los middleware verifyToken y/o verifyAdmin en las rutas que correspondan
router.get("/", verifyToken, verifyAdmin, pedidosController.getPedidos); // Obtener todos los pedidos (requiere autenticación)
router.get("/usuario", verifyToken, pedidosController.getPedidosByUser); 
router.get("/:id", verifyToken, verifyAdmin, pedidosController.getPedidoById); 
router.post("", verifyToken, pedidosController.createPedido); 
router.put("/:id/aceptar",verifyToken, verifyAdmin, pedidosController.aceptarPedido); 
router.put("/:id/comenzar",verifyToken, verifyAdmin, pedidosController.comenzarPedido); 
router.put("/:id/entregar", verifyToken,verifyAdmin, pedidosController.entregarPedido); 
router.delete("/:id",verifyToken, verifyAdmin, pedidosController.deletePedido);

export default router;
