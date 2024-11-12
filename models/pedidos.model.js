import { DataTypes, Model } from "sequelize";
import { sequelize } from "../db.js";

export class Pedido extends Model {}

class Pedido extends Model {}

Pedido.init({
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    idUsuario: {
        type: DataTypes.INTEGER,
    },
    fecha: {
        type: DataTypes.DATE,
    },
    estado: {
        type: DataTypes.STRING,
        defaultValue: 'pendiente',
    },
}, {
    sequelize,
    modelName: 'Pedido',
    tableName: 'pedidos',
});

