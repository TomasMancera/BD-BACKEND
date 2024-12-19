const { Router } = require('express');
const {validarJWT} = require('../middlewares/validarJwt')


const { usuariosGet,
        usuarioByIdGet,
        usuarioscomoGet,
        usuarios1Get,
        usuariosPost,
        usuariosDelete,
        usuarioPut,
        usuarios1Post,
        verificarContra,
        loginPost
    //pruebaPost,
    //pruebaPut,
    //pruebaDelete,
    //pruebaPatch
} = require('../controllers/usuarios');




const router = Router();


router.get('/',validarJWT,usuariosGet);
router.get('/:id',validarJWT,usuarioByIdGet);
router.get('/como/:termino', usuarioscomoGet);
router.get('/como1/:termino', usuarios1Get);
router.get('/validation/:id', verificarContra);

//Para insertar un registro de Persona
router.post('/', usuariosPost);
router.post('/login',loginPost)

//Para eliminar un registro de Persona
router.delete('/:id',validarJWT, usuariosDelete);

//Para actualizar un registro de Persona
router.put('/:id', validarJWT,usuarioPut);


//router.post('/', usuariosPost);

//router.put('/:id', usuariosPut);

//router.delete('/:id', usuariosDelete);

//router.patch('/', usuariosPatch);


module.exports = router;