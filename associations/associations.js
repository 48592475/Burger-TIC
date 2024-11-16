import { Usuario } from './models/usuario.model.js';
import { Plato } from './models/plato.model.js';
import { Pedido } from './models/pedido.model.js';

Usuario.hasMany(Pedido, { foreignKey: 'usuarioId' });
Pedido.belongsTo(Usuario, { foreignKey: 'usuarioId' });

Pedido.belongsToMany(Plato, { through: 'PedidoPlato', foreignKey: 'pedidoId' }); //preguntar lo de la foreignkey
Plato.belongsTo(Pedido, { through: 'PedidoPlato', foreignKey: 'pedidoId' });

Usuario.hasMany(Plato, { foreignKey: 'usuarioId' }); 
Plato.belongsTo(Usuario, { foreignKey: 'usuarioId' }); //preguntar si se relacionan y si estan bien las relaciones