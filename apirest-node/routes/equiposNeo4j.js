const { Router } = require('express');
const {
    crearEquipo,
    obtenerEquipos,
    obtenerEquipoPorId,
    actualizarEquipo,
    eliminarEquipo,
    relacionarConPais,
    relacionarConDeporte
} = require('../controllers/equiposNeo4j');

const router = Router();

router.post('/', crearEquipo);
router.get('/', obtenerEquipos);
router.get('/:id', obtenerEquipoPorId);
router.put('/:id', actualizarEquipo);
router.delete('/:id', eliminarEquipo);
router.post('/relacionar-pais', relacionarConPais);
router.post('/relacionar-deporte', relacionarConDeporte);

module.exports = router;
