import pedidosService from "../services/pedidos.service.js";
import PedidosService from "../services/pedidos.service.js";

const getPedidos = async (req, res) => {
    try {
        const pedidos = await pedidosService.getPedidos();
        res.status(200).json(pedidos);
    } catch (error) {
        res.status(500).json({ error: "Error al obtener los pedidos" });
    }

};

const getPedidosByUser = async (req, res) => {
    const { usId } = req.params;
    try {
        const pedidos = await pedidosService.getPedidosByUser(usId);
        if (pedidos.length === 0) {
            return res.status(404).json({ error: "No se encontraron pedidos para el usuario" });
        }
        res.status(200).json(pedidos);
    } catch (error) {
        res.status(500).json({ error: "Error al obtener los pedidos del usuario" });
    }
};


const getPedidoById = async (req, res) => {
    // --------------- COMPLETAR ---------------
    /*
        Recordar que para cumplir con toda la funcionalidad deben:

            1. Utilizar el servicio de pedidos para obtener el pedido por id (utilizando el id recibido en los parámetros de la request)
            2. Si el pedido no existe, devolver un mensaje de error (status 404)
            3. Si el pedido existe, devolver un json con el pedido (status 200)
            4. Devolver un mensaje de error si algo falló (status 500)
        
    */
            
};

const createPedido = async (req, res) => {
    // --------------- COMPLETAR ---------------
    /*
        Recordar que para cumplir con toda la funcionalidad deben:

            1. Verificar que el body de la request tenga el campo platos
            2. Verificar que el campo productos sea un array
            3. Verificar que el array de productos tenga al menos un producto
            4. Verificar que todos los productos tengan un id y una cantidad
            5. Si algo de lo anterior no se cumple, devolver un mensaje de error (status 400)
            6. Crear un pedido con los productos recibidos y el id del usuario (utilizando el servicio de pedidos)
            7. Devolver un mensaje de éxito (status 201)
            8. Devolver un mensaje de error si algo falló (status 500)
        
    */
            const { platos } = req.body;
            const idUsuario = req.user?.id; 
            
            if (!idUsuario) {
                return res.status(400).json({ error: "ID de usuario no encontrado en el token" });
            }
        
            if (!platos || !Array.isArray(platos) || platos.length === 0 || !platos.every(plato => plato.id && plato.cantidad)) {
                return res.status(400).json({ error: "Platos inválidos" });
            }
        
            try {
                await pedidosService.createPedido(idUsuario, platos);
                res.status(201).json({ message: "Pedido creado con éxito" });
            } catch (error) {
                console.error('Error al crear el pedido:', error);
                res.status(500).json({ error: "Error al crear el pedido" });
            }
};

const aceptarPedido = async (req, res) => {
    const { id } = req.params;
    try {
        const pedido = await pedidosService.getPedidoById(id);
        if (!pedido) {
            return res.status(404).json({ error: "Pedido no encontrado" });
        }
        if (pedido.estado !== "pendiente") {
            return res.status(400).json({ error: "El pedido no esta pendiente" });
        }
        await pedidosService.updatePedido(id, "aceptado");
        res.status(200).json({ message: "Pedido aceptado" });
    } catch (error) {
        res.status(500).json({ error: "Error al aceptar el pedido" });
    }
};
const comenzarPedido = async (req, res) => {
    const { id } = req.params;
    try {
        const pedido = await pedidosService.getPedidoById(id);
        if (!pedido) {
            return res.status(404).json({ error: "Pedido no encontrado" });
        }
        if (pedido.estado !== "aceptado") {
            return res.status(400).json({ error: "El pedido no está  aceptado" });
        }
        await pedidosService.updatePedido(id, "en camino");
        res.status(200).json({ message: "Pedido en camino" });
    } catch (error) {
        res.status(500).json({ error: "Error al comenzar el pedido" });
    }
};


const entregarPedido = async (req, res) => {
    const { id } = req.params;
    try {
        const pedido = await pedidosService.getPedidoById(id);
        if (!pedido) {
            return res.status(404).json({ error: "Pedido no encontrado" });
        }
        if (pedido.estado !== "en camino") {
            return res.status(400).json({ error: "El pedido no está en camino" });
        }
        await pedidosService.updatePedido(id, "entregado");
        res.status(200).json({ message: "Pedido entregado" });
    } catch (error) {
        res.status(500).json({ error: "Error al entregar el pedido" });
    }
};
            

const deletePedido = async (req, res) => {
    const { id } = req.params;
    try {
        const pedido = await pedidosService.getPedidoById(id);
        if (!pedido) {
            return res.status(404).json({ error: "Pedido no encontrado" });
        }
        await pedidosService.deletePedido(id);
        res.status(200).json({ message: "Pedido eliminado con éxito" });
    } catch (error) {
        res.status(500).json({ error: "Error al eliminar el pedido" });
    }
};

export default {getPedidos,getPedidoById,getPedidosByUser,createPedido,aceptarPedido,comenzarPedido,entregarPedido,deletePedido};
