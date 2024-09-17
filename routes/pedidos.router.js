import Router from "express";
import PedidosController from "../controllers/pedidos.controller.js";
import { verifyAdmin, verifyToken } from "../middlewares/auth.middleware.js";

const router = Router();

// ------------- COMPLETAR LAS RUTAS DE PEDIDOS -------------
// IMPORTANTE: La ruta /usuario debe ir antes que la ruta /:id
// Si no, Express interpretará "usuario" como un id y no funcionará correctamente

// Recordar utilizar los middleware verifyToken y/o verifyAdmin en las rutas que correspondan
router.get("/", verifyToken, pedidosController.getPedidos); // Obtener todos los pedidos (requiere autenticación)
router.get("/usuario/:usId", verifyToken, pedidosController.getPedidosByUser); 
router.get("/:id", verifyToken, pedidosController.getPedidoById); 
router.post("/", verifyToken, pedidosController.createPedido); 
router.put("/:id/aceptar", verifyAdmin, pedidosController.aceptarPedido); 
router.put("/:id/comenzar", verifyAdmin, pedidosController.comenzarPedido); 
router.put("/:id/entregar", verifyAdmin, pedidosController.entregarPedido); 
router.delete("/:id", verifyAdmin, pedidosController.deletePedido);

export default router;
