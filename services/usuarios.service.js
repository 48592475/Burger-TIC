import {Usuario} from '../models/usuarios.model.js';

const getUsuarios = async () => await Usuario.findAll();

const getUsuarioById = async (id) =>
    await Usuario.findOne({
        where: {
            id: id,
        },
    });

const getUsuarioByEmail = async (email) =>
    await Usuario.findOne({
        where: {
            email: email,
        },
    });

const createUsuario = async (usuario) =>
    Usuario.create({
        nombre: usuario.nombre,
        apellido: usuario.apellido,
        email: usuario.email,
        password: usuario.password,
    });

const updateUsuario = async (id, newData) => {
    const usuario = await Usuario.findByPk(id);

    if (!usuario) throw new Error("Usuario no encontrado");

    usuario.nombre = newData.nombre;
    usuario.apellido = newData.apellido;
    usuario.email = newData.email;
    usuario.password = newData.password;

    await usuario.save();
};

const deleteUsuario = async (id) => {
    const usuario = await Usuario.findByPk(id);

    if (!usuario) throw new Error("Usuario no encontrado");

    await usuario.destroy();
};

export default {
    getUsuarios,
    getUsuarioById,
    getUsuarioByEmail,
    createUsuario,
    updateUsuario,
    deleteUsuario,
};