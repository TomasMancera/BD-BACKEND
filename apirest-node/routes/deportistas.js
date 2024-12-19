const { Router } = require('express');
const {
    crearDeportista,
    obtenerDeportistas,
    obtenerDeportistaPorId,
    actualizarDeportista,
    eliminarDeportista,
    relacionarConEquipo
} = require('../controllers/deportistas');

const router = Router();

router.post('/', crearDeportista);
router.get('/', obtenerDeportistas);
router.get('/:id', obtenerDeportistaPorId);
router.put('/:id', actualizarDeportista);
router.delete('/:id', eliminarDeportista);
router.post('/relacionar-equipo',relacionarConEquipo)

module.exports = router;
