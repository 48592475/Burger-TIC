import { DataTypes, Model } from "sequelize";
import { sequelize } from "../db.js";
export class Usuario extends Model{}
Usuario.init(
    {
        nombre:{
            type: DataTypes.STRING,
            allowNull: false,  
        },
        apellido:{
            type: DataTypes.STRING,
        },
        email:{
            type: DataTypes.STRING,
            unique: true,
        },
        password:{
            type:DataTypes.STRING,
        },
        admin:{
            type: DataTypes.BOOLEAN,
            defaultValue: false,
        },
        
},
{
    sequelize
}
);
await sequelize.sync({alter:"true"})