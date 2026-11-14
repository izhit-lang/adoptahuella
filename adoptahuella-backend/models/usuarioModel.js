const pool = require("../config/db");

const obtenerUsuarios = async () => {
  const resultado = await pool.query("SELECT * FROM usuarios ORDER BY id_usuario");
  return resultado.rows;
};

const obtenerUsuarioPorId = async (id) => {
  const resultado = await pool.query(
    "SELECT * FROM usuarios WHERE id_usuario = $1",
    [id]
  );
  return resultado.rows[0];
};

const crearUsuario = async (usuario) => {
  const { nombre, correo, telefono, rol } = usuario;
  const resultado = await pool.query(
    `INSERT INTO usuarios (nombre, correo, telefono, rol)
     VALUES ($1, $2, $3, $4)
     RETURNING *`,
    [nombre, correo, telefono, rol]
  );
  return resultado.rows[0];
};

const actualizarUsuario = async (id, usuario) => {
  const { nombre, correo, telefono, rol } = usuario;
  const resultado = await pool.query(
    `UPDATE usuarios
     SET nombre = $1, correo = $2, telefono = $3, rol = $4
     WHERE id_usuario = $5
     RETURNING *`,
    [nombre, correo, telefono, rol, id]
  );
  return resultado.rows[0];
};

const eliminarUsuario = async (id) => {
  const resultado = await pool.query(
    "DELETE FROM usuarios WHERE id_usuario = $1 RETURNING *",
    [id]
  );
  return resultado.rows[0];
};

module.exports = {
  obtenerUsuarios,
  obtenerUsuarioPorId,
  crearUsuario,
  actualizarUsuario,
  eliminarUsuario,
};