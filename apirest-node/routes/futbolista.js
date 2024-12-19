const { Router } = require('express');
const { check } = require("express-validator");
const { obtenerFutbolistas, obtenerFutbolistaId,crearFutbolistaPost,actualizarFutbolistaPut,borrarFutbolistaDelete} = require('../controllers/futbolistas');
const { validarCampos } = require("../middlewares/validar-campos")
const { existeFutbolistaPorId, existeContratoPorIdFutbolista }= require("../helpers/db-validators")

const router = Router();

router.get('/', obtenerFutbolistas );

router.get('/:id',
    [
    check('id', 'No es un ID válido').isMongoId(),
    //check('id').custom(existeFutbolistaPorId),
    validarCampos,
    ],
    obtenerFutbolistaId);

router.post('/', [
        //validarJWT,
        //check('nombre','El nombre del heroe es obligatorio').not().isEmpty(),
        validarCampos
    ], crearFutbolistaPost );
    
// Actualizar Role- privado - cualquiera con token válido
router.put('/:id',[
    //validarJWT,
    check('id', 'No es un id de Mongo válido').isMongoId(),
    //check('id').custom( existeHeroePorId ),
    validarCampos
],actualizarFutbolistaPut );

// Borrar un Equipo - Admin
router.delete('/:id',[
    //validarJWT,
    //esAdminRole,
    check('id', 'No es un id de Mongo válido').isMongoId(),
    check('id').custom(existeFutbolistaPorId),
    check('id').custom(existeContratoPorIdFutbolista),
    validarCampos,
],borrarFutbolistaDelete);

module.exports = router;