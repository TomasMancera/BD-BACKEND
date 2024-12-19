const { Router } = require("express");
const { check } = require("express-validator");
const { validarCampos } = require("../middlewares/validar-campos")
const { existeEquipoPorId,existeFutbolistaPorIdEquipo,existeContratoPorIdEquipo}= require("../helpers/db-validators")
const { obtenerEquiposGet, obtenerEquipoGet, crearEquipoPost,actualizarEquipoPut,borrarEquipoDelete } = require("../controllers/equipoController")


const router = Router();

router.get('/', obtenerEquiposGet)

router.get('/:id',
    [
    check('id', 'No es un ID válido').isMongoId(),
    check('id').custom( existeEquipoPorId ),
    validarCampos,
    ],
    obtenerEquipoGet );

router.post('/', [
        //validarJWT,
        //check('nombre','El nombre del heroe es obligatorio').not().isEmpty(),
        validarCampos
    ], crearEquipoPost );

// Actualizar Role- privado - cualquiera con token válido
router.put('/:id',[
    //validarJWT,
    check('id', 'No es un id de Mongo válido').isMongoId(),
    //check('id').custom( existeHeroePorId ),
    validarCampos
],actualizarEquipoPut );

// Borrar un Equipo - Admin
router.delete('/:id',[
    //validarJWT,
    //esAdminRole,
    check('id', 'No es un id de Mongo válido').isMongoId(),
    check('id').custom( existeEquipoPorId ),
    check('id').custom( existeFutbolistaPorIdEquipo ),
    check('id').custom( existeContratoPorIdEquipo ),

    validarCampos,
],borrarEquipoDelete);


module.exports = router;