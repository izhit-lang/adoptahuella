const express = require("express");
const router = express.Router();
const mascotaController = require("../controllers/mascotaController");

router.get("/", mascotaController.listarMascotas);
router.get("/:id", mascotaController.obtenerMascota);
router.post("/", mascotaController.crearMascota);
router.put("/:id", mascotaController.actualizarMascota);
router.delete("/:id", mascotaController.eliminarMascota);

module.exports = router;