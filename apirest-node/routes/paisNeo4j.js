const { Router } = require('express');
const {
    crearPais,
    obtenerPaises,
    obtenerPaisPorId,
    actualizarPais,
    eliminarPais,
} = require('../controllers/paisNeo4j');

const router = Router();

router.post('/', crearPais);
router.get('/', obtenerPaises);
router.get('/:id', obtenerPaisPorId);
router.put('/:id', actualizarPais);
router.delete('/:id', eliminarPais);

module.exports = router;
