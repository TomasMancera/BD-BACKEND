const { Router } = require('express');
const ContratacionController = require('../controllers/contratacionNeo4j');

const router = Router();

router.post('/', ContratacionController.crearContratacion);
router.get('/', ContratacionController.obtenerContrataciones);
router.get('/:id', ContratacionController.obtenerContratacionPorId);
router.put('/:id', ContratacionController.actualizarContratacion);
router.delete('/:id', ContratacionController.eliminarContratacion);
router.post('/relacionar-deportista', ContratacionController.relacionarConDeportista);
router.post('/relacionar-equipo', ContratacionController.relacionarConEquipo);

module.exports = router;
