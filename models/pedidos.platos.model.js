import { DataTypes, Model } from "sequelize";
import { sequelize } from "../db.js";

export class PedidosPlatos extends Model{}

PedidosPlatos.init(
    {
        id:{
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        id_pedido:{
            type: DataTypes.INTEGER,
        },
        id_plato:{
            type: DataTypes.INTEGER,
        },
        cantidad:{
            type: DataTypes.INTEGER,
        },        
},
{sequelize}
);
 await sequelize.sync({alter:"true"});