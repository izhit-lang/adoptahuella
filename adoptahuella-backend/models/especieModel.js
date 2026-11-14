const pool = require("../config/db");

const obtenerEspecies = async () => {
  const resultado = await pool.query("SELECT * FROM especies ORDER BY id_especie");
  return resultado.rows;
};

const obtenerEspeciePorId = async (id) => {
  const resultado = await pool.query(
    "SELECT * FROM especies WHERE id_especie = $1",
    [id]
  );
  return resultado.rows[0];
};

const crearEspecie = async (especie) => {
  const { nombre_especie, descripcion } = especie;
  const resultado = await pool.query(
    `INSERT INTO especies (nombre_especie, descripcion)
     VALUES ($1, $2)
     RETURNING *`,
    [nombre_especie, descripcion]
  );
  return resultado.rows[0];
};

const actualizarEspecie = async (id, especie) => {
  const { nombre_especie, descripcion } = especie;
  const resultado = await pool.query(
    `UPDATE especies
     SET nombre_especie = $1, descripcion = $2
     WHERE id_especie = $3
     RETURNING *`,
    [nombre_especie, descripcion, id]
  );
  return resultado.rows[0];
};

const eliminarEspecie = async (id) => {
  const resultado = await pool.query(
    "DELETE FROM especies WHERE id_especie = $1 RETURNING *",
    [id]
  );
  return resultado.rows[0];
};

module.exports = {
  obtenerEspecies,
  obtenerEspeciePorId,
  crearEspecie,
  actualizarEspecie,
  eliminarEspecie,
};