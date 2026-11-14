const refugioModel = require("../models/refugioModel");

const listarRefugios = async (req, res) => {
  try {
    const refugios = await refugioModel.obtenerRefugios();
    res.status(200).json({ data: refugios });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const obtenerRefugio = async (req, res) => {
  try {
    const refugio = await refugioModel.obtenerRefugioPorId(req.params.id);

    if (!refugio) {
      return res.status(404).json({ message: "Refugio no encontrado" });
    }

    res.status(200).json({ data: refugio });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const crearRefugio = async (req, res) => {
  try {
    const { id_usuario, nombre_fundacion, direccion, ciudad } = req.body;

    if (!id_usuario || !nombre_fundacion || !direccion || !ciudad) {
      return res.status(400).json({
        message: "Los campos id_usuario, nombre_fundacion, direccion y ciudad son obligatorios",
      });
    }

    const refugio = await refugioModel.crearRefugio(req.body);
    res.status(201).json({ data: refugio });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const actualizarRefugio = async (req, res) => {
  try {
    const { id_usuario, nombre_fundacion, direccion, ciudad } = req.body;

    if (!id_usuario || !nombre_fundacion || !direccion || !ciudad) {
      return res.status(400).json({
        message: "Los campos id_usuario, nombre_fundacion, direccion y ciudad son obligatorios",
      });
    }

    const refugio = await refugioModel.actualizarRefugio(req.params.id, req.body);

    if (!refugio) {
      return res.status(404).json({ message: "Refugio no encontrado" });
    }

    res.status(200).json({ data: refugio });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const eliminarRefugio = async (req, res) => {
  try {
    const refugio = await refugioModel.eliminarRefugio(req.params.id);

    if (!refugio) {
      return res.status(404).json({ message: "Refugio no encontrado" });
    }

    res.status(200).json({ message: "Refugio eliminado correctamente" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  listarRefugios,
  obtenerRefugio,
  crearRefugio,
  actualizarRefugio,
  eliminarRefugio,
};