var Router = require('express');
const { check } = require("express-validator");
const { validarCampos } = require("../middlewares/validar-campos")
const { existeFutbolistaPorId, existeContratoPorIdFutbolista }= require("../helpers/db-validators")
const {obtenerContrataciones, obtenerContratacionId, crearContratacionPost, actualizarContratacionPut, borrarContratacionDelete } = require('../controllers/contrataciones')

const router = Router();

router.get('/', obtenerContrataciones)
router.get('/:id', obtenerContratacionId)
router.put('/:id', actualizarContratacionPut)
router.post('/', crearContratacionPost)
router.delete('/:id', borrarContratacionDelete)

module.exports = router