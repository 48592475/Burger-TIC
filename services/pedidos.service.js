import { config } from "../db.js";
import pkg from "pg";
const { Client } = pkg;

const getPlatosByPedido = async (idPedido) => {
    
    const client = new Client(config);
    await client.connect();

    try {
        const { rows: platosPedido } = await client.query(
            "SELECT * FROM pedidos_platos WHERE id_pedido = $1",
            [idPedido]
        );
        if (platosPedido.length < 1) throw new Error("Pedido no encontrado");

        const result = await Promise.all(
            platosPedido.map(async (platoPedido) => {
                const { rows: plato } = await client.query(
                    "SELECT * FROM platos WHERE id = $1",
                    [platoPedido.id_plato]
                );
                if (plato.length < 1) throw new Error("Plato no encontrado");

                return {
                    ...plato[0],
                    cantidad: platoPedido.cantidad,
                };
            })
        );

        return result;
    } catch (error) {
        throw error;
    } finally {
        await client.end();
    }
};

const getPedidos = async () => {
    const client = new Client(config);
    await client.connect();

    try {
        const { rows } = await client.query("SELECT * FROM pedidos");

        if (rows.length < 1) return [];

        const result = await Promise.all(
            rows.map(async (pedido) => {
                const platos = await getPlatosByPedido(pedido.id);
                return {
                    ...pedido,
                    platos,
                };
            })
        );

        await client.end();
        return result;
    } catch (error) {
        await client.end();
        throw error;
    }
};

const getPedidoById = async (id) => {
    const client = new Client(config);
    await client.connect();

    try {
        const { rows: pedido } = await client.query(
            "SELECT * FROM pedidos WHERE id = $1",
            [id]
        );
        if (pedido.length < 1) return null;

        const platos = await getPlatosByPedido(id);
        return {
            ...pedido[0],
            platos,
        };
    } catch (error) {
        throw error;
    } finally {
        await client.end();
    }
};

const getPedidosByUser = async (idUsuario) => {
    const client = new Client(config);
    await client.connect();

    try {
        const { rows: pedidos } = await client.query(
            "SELECT * FROM pedidos WHERE id_usuario = $1",
            [idUsuario]
        );
        if (pedidos.length < 1) return [];

        const result = await Promise.all(
            pedidos.map(async (pedido) => {
                const platos = await getPlatosByPedido(pedido.id);
                return {
                    ...pedido,
                    platos,
                };
            })
        );

        return result;
    } catch (error) {
        throw error;
    } finally {
        await client.end();
    }
};

const createPedido = async (idUsuario, platos) => {
    
    const client = new Client(config);
    await client.connect();

    try {
        const { rows: pedidoInsertado } = await client.query(
            "INSERT INTO pedidos (id_usuario, fecha, estado) VALUES ($1, $2, 'pendiente') RETURNING id",
            [idUsuario, new Date()]
        );
        const idPedido = pedidoInsertado[0].id;

        for (let plato of platos) {
            const { rows: platoExiste } = await client.query(
                "SELECT * FROM platos WHERE id = $1",
                [plato.id]
            );
            if (platoExiste.length < 1) {
                await client.query("DELETE FROM pedidos WHERE id = $1", [
                    idPedido,
                ]);
                throw new Error("Plato no encontrado");
            }

            await client.query(
                "INSERT INTO pedidos_platos (id_pedido, id_plato, cantidad) VALUES ($1, $2, $3)",
                [idPedido, plato.id, plato.cantidad]
            );
        }

        return pedidoInsertado;
    } catch (error) {
        throw error;
    } finally {
        await client.end();
    }
};

const updatePedido = async (id, estado) => { 
    const estadosValidos = ["aceptado", "en camino", "entregado"];
    if (!estadosValidos.includes(estado)) throw new Error("Estado inválido");

    const client = new Client(config);
    await client.connect();

    try {
        const { rows } = await client.query(
            "UPDATE pedidos SET estado = $1 WHERE id = $2 RETURNING *",
            [estado, id]
        );
        if (rows.length < 1) throw new Error("Pedido no encontrado");

        return rows[0];
    } catch (error) {
        throw error;
    } finally {
        await client.end();
    }
};

const deletePedido = async (id) => {
    const client = new Client(config);
    await client.connect();

    try {
        const { rows } = await client.query(
            "DELETE FROM pedidos WHERE id = $1 RETURNING *",
            [id]
        );
        if (rows.length < 1) throw new Error("Pedido no encontrado");

        return rows[0];
    } catch (error) {
        throw error;
    } finally {
        await client.end();
    }
};

export default {
    getPedidos,
    getPedidoById,
    getPedidosByUser,
    createPedido,
    updatePedido,
    deletePedido,
};
