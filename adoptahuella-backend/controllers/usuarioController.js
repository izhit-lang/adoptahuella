const usuarioModel = require("../models/usuarioModel");

const listarUsuarios = async (req, res) => {
  try {
    const usuarios = await usuarioModel.obtenerUsuarios();
    res.status(200).json({ data: usuarios });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const obtenerUsuario = async (req, res) => {
  try {
    const usuario = await usuarioModel.obtenerUsuarioPorId(req.params.id);

    if (!usuario) {
      return res.status(404).json({ message: "Usuario no encontrado" });
    }

    res.status(200).json({ data: usuario });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const crearUsuario = async (req, res) => {
  try {
    const { nombre, correo, rol } = req.body;

    if (!nombre || !correo || !rol) {
      return res.status(400).json({
        message: "Los campos nombre, correo y rol son obligatorios",
      });
    }

    const usuario = await usuarioModel.crearUsuario(req.body);
    res.status(201).json({ data: usuario });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const actualizarUsuario = async (req, res) => {
  try {
    const { nombre, correo, rol } = req.body;

    if (!nombre || !correo || !rol) {
      return res.status(400).json({
        message: "Los campos nombre, correo y rol son obligatorios",
      });
    }

    const usuario = await usuarioModel.actualizarUsuario(req.params.id, req.body);

    if (!usuario) {
      return res.status(404).json({ message: "Usuario no encontrado" });
    }

    res.status(200).json({ data: usuario });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const eliminarUsuario = async (req, res) => {
  try {
    const usuario = await usuarioModel.eliminarUsuario(req.params.id);

    if (!usuario) {
      return res.status(404).json({ message: "Usuario no encontrado" });
    }

    res.status(200).json({ message: "Usuario eliminado correctamente" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  listarUsuarios,
  obtenerUsuario,
  crearUsuario,
  actualizarUsuario,
  eliminarUsuario,
};