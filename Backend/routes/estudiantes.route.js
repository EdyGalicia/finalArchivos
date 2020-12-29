const express = require("express")
const router = express.Router()
const estudiantesController = require("../controllers/estudiantes.controller")

router.get("/getUsuarios", estudiantesController.getUsuarios)
router.get("/login", estudiantesController.login)
router.post("/registro", estudiantesController.addUsuario)
router.post("/verCliente", estudiantesController.verCliente)
router.get("/factura", estudiantesController.getFac)
module.exports = router