const express = require("express");
const router = express.Router();
const controller = require("../controllers/clientesController.js");

router.get("/", controller.getAll);
router.get("/compradores", controller.getCompradores);
router.get("/:cpf", controller.getByCpf);
router.post("/", controller.postCliente);
router.delete("/", controller.deleteClienteComprou)
router.put("/:cpf", controller.putCliente )


module.exports = router;
