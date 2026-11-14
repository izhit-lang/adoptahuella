const mascotaModel = require("../models/mascotaModel");

const listarMascotas = async (req, res) => {
  try {
    const mascotas = await mascotaModel.obtenerMascotas();
    res.status(200).json({ data: mascotas });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const obtenerMascota = async (req, res) => {
  try {
    const mascota = await mascotaModel.obtenerMascotaPorId(req.params.id);

    if (!mascota) {
      return res.status(404).json({ message: "Mascota no encontrada" });
    }

    res.status(200).json({ data: mascota });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const crearMascota = async (req, res) => {
  try {
    const { nombre, id_especie, raza, genero, id_refugio } = req.body;

    if (!nombre || !id_especie || !raza || !genero || !id_refugio) {
      return res.status(400).json({
        message: "Los campos nombre, id_especie, raza, genero e id_refugio son obligatorios",
      });
    }

    const mascota = await mascotaModel.crearMascota(req.body);
    res.status(201).json({ data: mascota });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const actualizarMascota = async (req, res) => {
  try {
    const { nombre, id_especie, raza, genero, id_refugio } = req.body;

    if (!nombre || !id_especie || !raza || !genero || !id_refugio) {
      return res.status(400).json({
        message: "Los campos nombre, id_especie, raza, genero e id_refugio son obligatorios",
      });
    }

    const mascota = await mascotaModel.actualizarMascota(req.params.id, req.body);

    if (!mascota) {
      return res.status(404).json({ message: "Mascota no encontrada" });
    }

    res.status(200).json({ data: mascota });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const eliminarMascota = async (req, res) => {
  try {
    const mascota = await mascotaModel.eliminarMascota(req.params.id);

    if (!mascota) {
      return res.status(404).json({ message: "Mascota no encontrada" });
    }

    res.status(200).json({ message: "Mascota eliminada correctamente" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  listarMascotas,
  obtenerMascota,
  crearMascota,
  actualizarMascota,
  eliminarMascota,
};