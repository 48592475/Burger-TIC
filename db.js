import "dotenv/config";

export const config = {
    user: "burgertic_owner",
    host: "ep-plain-glitter-a5sfpbbd.us-east-2.aws.neon.tech",
    database:"burgertic",
    password: "9FlpR3iumbkB",
    port: 5432,
    ssl: true,
};


import { Sequelize } from "sequelize";

export const sequelize = new Sequelize(
    process.env.DB_URL
);