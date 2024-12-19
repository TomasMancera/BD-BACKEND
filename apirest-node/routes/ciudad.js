const { Router } = require('express');
const { validarJWT } = require("../middlewares/validarJwt")


const { 
    getCiudad,
    postCiudad,
    putCiudad,
    deleteCiudad,
    ciudadByidGet,
    ciudadComoGet
} = require('../controllers/ciudad');


const router = Router();


router.get('/',validarJWT, getCiudad);
router.get('/:id', validarJWT,ciudadByidGet);
router.get('/como/:termino', ciudadComoGet);


//Para insertar un registro de Persona
router.post('/', postCiudad);

//Para eliminar un registro de Persona
router.delete('/:id', validarJWT,deleteCiudad);

//Para actualizar un registro de Persona
router.put('/:id', validarJWT,putCiudad);


//router.post('/', usuariosPost);

//router.put('/:id', usuariosPut);

//router.delete('/:id', usuariosDelete);

//router.patch('/', usuariosPatch);


module.exports = router;