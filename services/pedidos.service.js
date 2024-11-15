
import {Pedido} from '../models/pedidos.model.js';

const getPedidos = async () =>
    await Pedido.findAll({
        include: [PedidoPlato],
    });

const getPedidoById = async (id) =>
    await Pedido.findOne({
        where: { id: id },
        include: [PedidoPlato],
    });

const getPedidosByUser = async (idUsuario) =>
    await Pedido.findAll({
        where: { idUsuario: idUsuario },
        include: [PedidoPlato],
    });

const createPedido = async (idUsuario, platos) => {
    const pedido = await Pedido.create({
        idUsuario: idUsuario,
        fecha: new Date(),
        estado: 'pendiente',
    });

    const platosData = platos.map((plato) => ({
        idPedido: pedido.id,
        idPlato: plato.id,
        cantidad: plato.cantidad,
    }));

    await PedidoPlato.bulkCreate(platosData);

    return pedido;
};

const updatePedido = async (id, estado) => {
    const pedido = await Pedido.findByPk(id);

    if (!pedido) throw new Error("Pedido no encontrado");

    pedido.estado = estado;
    await pedido.save();

    return pedido;
};

const deletePedido = async (id) => {
    const pedido = await Pedido.findByPk(id);

    if (!pedido) throw new Error("Pedido no encontrado");

    await pedido.destroy();
};

export default {
    getPedidos,
    getPedidoById,
    getPedidosByUser,
    createPedido,
    updatePedido,
    deletePedido,
};