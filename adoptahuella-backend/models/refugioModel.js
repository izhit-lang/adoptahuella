const pool = require("../config/db");

const obtenerRefugios = async () => {
  const resultado = await pool.query("SELECT * FROM refugios ORDER BY id_refugio");
  return resultado.rows;
};

const obtenerRefugioPorId = async (id) => {
  const resultado = await pool.query(
    "SELECT * FROM refugios WHERE id_refugio = $1",
    [id]
  );
  return resultado.rows[0];
};

const crearRefugio = async (refugio) => {
  const { id_usuario, nombre_fundacion, direccion, ciudad, telefono_contacto } = refugio;
  const resultado = await pool.query(
    `INSERT INTO refugios (id_usuario, nombre_fundacion, direccion, ciudad, telefono_contacto)
     VALUES ($1, $2, $3, $4, $5)
     RETURNING *`,
    [id_usuario, nombre_fundacion, direccion, ciudad, telefono_contacto]
  );
  return resultado.rows[0];
};

const actualizarRefugio = async (id, refugio) => {
  const { id_usuario, nombre_fundacion, direccion, ciudad, telefono_contacto } = refugio;
  const resultado = await pool.query(
    `UPDATE refugios
     SET id_usuario = $1, nombre_fundacion = $2, direccion = $3, ciudad = $4, telefono_contacto = $5
     WHERE id_refugio = $6
     RETURNING *`,
    [id_usuario, nombre_fundacion, direccion, ciudad, telefono_contacto, id]
  );
  return resultado.rows[0];
};

const eliminarRefugio = async (id) => {
  const resultado = await pool.query(
    "DELETE FROM refugios WHERE id_refugio = $1 RETURNING *",
    [id]
  );
  return resultado.rows[0];
};

module.exports = {
  obtenerRefugios,
  obtenerRefugioPorId,
  crearRefugio,
  actualizarRefugio,
  eliminarRefugio,
};