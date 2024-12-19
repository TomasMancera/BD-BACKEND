const { Router } = require('express');
const {validarJWT} = require('../middlewares/validarJwt')


const { personasGet,
        personaByIdGet,
        personasComoGet,
        personas1Get,
        personaPost,
        persona1Post,
        personaDelete,
        personaPut
    //pruebaPost,
    //pruebaPut,
    //pruebaDelete,
    //pruebaPatch
} = require('../controllers/prueba');


const router = Router();


router.get('/', validarJWT,personasGet);
router.get('/:id', validarJWT,personaByIdGet);
router.get('/como/:termino', personasComoGet);
router.get('/como1/:termino', personas1Get);

//Para insertar un registro de Persona
router.post('/', personaPost);

//Para eliminar un registro de Persona
router.delete('/:id',validarJWT, personaDelete);

//Para actualizar un registro de Persona
router.put('/:id',personaPut);


//router.post('/', usuariosPost);

//router.put('/:id', usuariosPut);

//router.delete('/:id', usuariosDelete);

//router.patch('/', usuariosPatch);


module.exports = router;