const pool = require("../config/db");

const obtenerMascotas = async () => {
  const resultado = await pool.query("SELECT * FROM mascotas ORDER BY id_mascota");
  return resultado.rows;
};

const obtenerMascotaPorId = async (id) => {
  const resultado = await pool.query(
    "SELECT * FROM mascotas WHERE id_mascota = $1",
    [id]
  );
  return resultado.rows[0];
};

const crearMascota = async (mascota) => {
  const { nombre, id_especie, raza, edad_meses, genero, estado, id_refugio } = mascota;
  const resultado = await pool.query(
    `INSERT INTO mascotas (nombre, id_especie, raza, edad_meses, genero, estado, id_refugio)
     VALUES ($1, $2, $3, $4, $5, $6, $7)
     RETURNING *`,
    [nombre, id_especie, raza, edad_meses, genero, estado, id_refugio]
  );
  return resultado.rows[0];
};

const actualizarMascota = async (id, mascota) => {
  const { nombre, id_especie, raza, edad_meses, genero, estado, id_refugio } = mascota;
  const resultado = await pool.query(
    `UPDATE mascotas
     SET nombre = $1, id_especie = $2, raza = $3, edad_meses = $4, genero = $5, estado = $6, id_refugio = $7
     WHERE id_mascota = $8
     RETURNING *`,
    [nombre, id_especie, raza, edad_meses, genero, estado, id_refugio, id]
  );
  return resultado.rows[0];
};

const eliminarMascota = async (id) => {
  const resultado = await pool.query(
    "DELETE FROM mascotas WHERE id_mascota = $1 RETURNING *",
    [id]
  );
  return resultado.rows[0];
};

module.exports = {
  obtenerMascotas,
  obtenerMascotaPorId,
  crearMascota,
  actualizarMascota,
  eliminarMascota,
};