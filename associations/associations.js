import { Usuario } from "../models/usuarios.model.js";
import { Plato } from "../models/platos.model.js";
import { Pedido } from "../models/pedidos.model.js";
import { PedidosPlatos } from "../models/pedidos.platos.model.js";
import { sequelize } from "../db.js";

export const definirModelos = async () => {
  Pedido.belongsToMany(Plato, { through: PedidosPlatos });
  Plato.belongsToMany(Pedido, { through: PedidosPlatos});

  Usuario.hasMany(Pedido);
  Pedido.belongsTo(Usuario);

  await sequelize.sync({ force: false, alter: false });
};
