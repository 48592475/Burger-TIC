import { Pedido } from "../models/pedidos.model.js";
import { PedidosPlatos } from "../models/pedidos.platos.model.js";

const getPlatosByPedido = async (idPedido) => {
  const pedido = await Pedido.findByPk(idPedido);
  if (!pedido) throw new Error("No se encontro pedido");

  const pedidosplato = await PedidosPlatos.findAll({
    where: { PedidoId: idPedido },
  });
  const resultado = [];
  pedidosplato.forEach((row) => {
    resultado.push({
      id: row.PlatoId,
      cantidad: row.cantidad,
    });
  });

  return resultado;
};

const getPedidos = async () => {
  const pedidosdb = await Pedido.findAll();

  const r = [];
  for (const p of pedidosdb) {
    r.push({
      id: p.id,
      idUsuario: p.UsuarioId,
      fecha: p.fecha,
      estado: p.estado,
      platos: await getPlatosByPedido(p.id),
    });
  }

  return r;
};

const getPedidoById = async (id) => {
  const pedido = await Pedido.findByPk(id);
  if (!pedido) throw new Error("No hay pedido");
  return {
    id: pedido.id,
    idUsuario: pedido.UsuarioId,
    fecha: pedido.fecha,
    estado: pedido.estado,
    platos: await getPlatosByPedido(pedido.id),
  };
};

const getPedidosByUser = async (idUsuario) => {
  const pedido = await Pedido.findOne({ where: { UsuarioId: idUsuario } });
  if (!pedido) throw new Error("No hay pedido");
  return {
    id: pedido.id,
    idUsuario: pedido.UsuarioId,
    fecha: pedido.fecha,
    estado: pedido.estado,
    platos: await getPlatosByPedido(pedido.id),
  };
};

const createPedido = async (idUsuario, platos) => {
  const pedido = await Pedido.create({
    UsuarioId: idUsuario,
    fecha: new Date(),
    estado: "pendiente",
  });

  const platosData = platos.map((plato) => ({
    idPedido: pedido.id,
    idPlato: plato.id,
    cantidad: plato.cantidad,
  }));

  await PedidosPlatos.bulkCreate(platosData);

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
