const especieModel = require("../models/especieModel");

const listarEspecies = async (req, res) => {
  try {
    const especies = await especieModel.obtenerEspecies();
    res.status(200).json({ data: especies });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const obtenerEspecie = async (req, res) => {
  try {
    const especie = await especieModel.obtenerEspeciePorId(req.params.id);

    if (!especie) {
      return res.status(404).json({ message: "Especie no encontrada" });
    }

    res.status(200).json({ data: especie });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const crearEspecie = async (req, res) => {
  try {
    const { nombre_especie } = req.body;

    if (!nombre_especie) {
      return res.status(400).json({
        message: "El campo nombre_especie es obligatorio",
      });
    }

    const especie = await especieModel.crearEspecie(req.body);
    res.status(201).json({ data: especie });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const actualizarEspecie = async (req, res) => {
  try {
    const { nombre_especie } = req.body;

    if (!nombre_especie) {
      return res.status(400).json({
        message: "El campo nombre_especie es obligatorio",
      });
    }

    const especie = await especieModel.actualizarEspecie(req.params.id, req.body);

    if (!especie) {
      return res.status(404).json({ message: "Especie no encontrada" });
    }

    res.status(200).json({ data: especie });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const eliminarEspecie = async (req, res) => {
  try {
    const especie = await especieModel.eliminarEspecie(req.params.id);

    if (!especie) {
      return res.status(404).json({ message: "Especie no encontrada" });
    }

    res.status(200).json({ message: "Especie eliminada correctamente" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  listarEspecies,
  obtenerEspecie,
  crearEspecie,
  actualizarEspecie,
  eliminarEspecie,
};