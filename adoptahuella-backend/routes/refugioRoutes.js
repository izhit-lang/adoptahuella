const express = require("express");
const router = express.Router();
const refugioController = require("../controllers/refugioController");

router.get("/", refugioController.listarRefugios);
router.get("/:id", refugioController.obtenerRefugio);
router.post("/", refugioController.crearRefugio);
router.put("/:id", refugioController.actualizarRefugio);
router.delete("/:id", refugioController.eliminarRefugio);

module.exports = router;