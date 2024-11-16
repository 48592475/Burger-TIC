import { Usuario } from './models/usuario.model.js';
import { Plato } from './models/plato.model.js';
import { Pedido } from './models/pedido.model.js';



Pedido.belongsToMany(Plato, { through: PlatosPedido});
Plato.belongsToMany(Pedido, { through: PlatosPedido});

Usuario.hasMany(Pedido);
Pedido.belongsTo(Usuario);