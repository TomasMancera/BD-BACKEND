const { Usuarios } = require('../models/usuarios') 
const jwt = require('jsonwebtoken');

const validarJWT = async (req = request, res = response, next) => {
    const token = req.header('x-token');
    console.log('Token recibido en el servidor:', token);

    const decoded = jwt.decode(token);
    console.log('Contenido del token:', decoded);

    


    if (!token) {
        return res.status(401).json({
            msg: ' No hay token en la peticion...'
        })
    }


    try {
        //Valida el token
        const {id} = jwt.verify(token, process.env.SECRETORPRIVATEKEY);
        console.log('ID decodificado del token:', id);


        
        const usuario = await Usuarios.findByPk(id)
        console.log('Usuario encontrado:', usuario);


        if(!usuario){
            return res.status(401).json({
                msg: 'Token no valido - usuario no existe en BD'
            })


        }

        req.usuario = usuario;


        next();


    } catch (error) {
        console.log(error);
        return res.status(401).json({
            msg: ' El token no es valido...'
        })


    }




    //console.log(token);


    //next();
}

module.exports = {
    validarJWT
}

