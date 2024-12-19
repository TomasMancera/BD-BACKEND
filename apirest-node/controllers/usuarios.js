const { response, request } = require('express')
const { Usuarios } = require('../models/usuarios');
const { Personas } = require('../models/personas')
const { bdmysql } = require('../database/MariaDbConnection');
const { QueryTypes } = require('sequelize');

const { Op } = require("sequelize");

const bcryptjs = require('bcrypt');
const { generarJWT } = require('../helpers/generarJwt');


const usuariosGet = async (req, res = response) => {

    const query = req.query;

    //Desestructuracion de argumentos
    const { q, nombre = 'No name', apikey, page = 1, limit = 10 } = req.query;


    //console.log("Datos",q,nombre);
    try {
        const unosUsuarios = await Usuarios.findAll();
        res.json({
            ok: true,
            msg: 'get API - Controller Funciono',
            query,
            q,
            nombre,
            apikey,
            page,
            limit,
            data: unosUsuarios
        })

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Hable con el Administrador',
            err: error
        })

    }

}

const usuarioByIdGet = async (req = request, res = response) => {

    const { id } = req.params;
    //const { _id, password, google, correo, ...resto } = req.body;

    try {

        const unUsuario = await Usuarios.findByPk(id);

        if (!unUsuario) {
            return res.status(404).json({
                ok: false,
                msg: 'No existe un usuario con el id: ' + id
            })
        }

        res.json({
            ok: true,
            data: unUsuario
        });


    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Hable con el Administrador',
            err: error
        })

    }
}

const usuarioscomoGet = async (req = request, res = response) => {

    const { termino } = req.params;

    console.log("TERMINO", termino)

    try {

        /*
        const results = await bdmysql.query(
            "SELECT *" +
            " FROM persona" +
            " WHERE nombres LIKE '%" + termino + "%'" +
            " OR apellidos LIKE '%" + termino + "%'" +
            " ORDER BY nombres"
            , { type: QueryTypes.SELECT }


        );
        */


        const results = await bdmysql.query(
            "SELECT * FROM usuario WHERE email LIKE :searchTerm OR numero_telefono LIKE :searchTerm ORDER BY email",
            {
                replacements: { searchTerm: `%${termino}%` },
                type: bdmysql.QueryTypes.SELECT
            }



        );





        res.json({
            ok: true,
            data: results,
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Hable con el Administrador',
            err: error
        });
    }
};

const usuarios1Get = async (req, res = response) => {

    const query = req.query;

    const { termino } = req.params;

    console.log("TERMINO", termino)


    //Desestructuracion de argumentos
    const { q, nombre = 'No name', apikey, page = 1, limit = 10 } = req.query;


    //console.log("Datos",q,nombre);
    try {
        const unosUsuarios = await Usuarios.findAll(
            {
                where: {
                    [Op.or]: [{
                        email: {
                            [Op.like]: `%${termino}%`
                        }
                    },
                    {
                        numero_telefono: {
                            [Op.like]: `%${termino}%`
                        }
                    }],
                },
            }
        );
        res.json({
            ok: true,
            msg: 'get API - Controller Funciono',
            query,
            q,
            nombre,
            apikey,
            page,
            limit,
            data: unosUsuarios
        })

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Hable con el Administrador',
            err: error
        })

    }

}

const loginPost = async (req, res = response) => {
    const { email, contraseña } = req.body;

    try {
        console.log("Correo recibido:", email);

        const emailTrimmed = email.trim();
        const usuario = await Usuarios.findOne({ where: { email: emailTrimmed } });

        if (!usuario) {
            console.log("No se encontró un usuario con ese correo:", emailTrimmed);
            return res.status(400).json({
                ok: false,
                msg: 'Usuario no es correcto para el email ingresado: ' + emailTrimmed
            });
        }

        // Verifica si la contraseña existe en el usuario
        if (!usuario.contraseña) {
            console.log("El usuario no tiene una contraseña definida.");
            return res.status(500).json({
                ok: false,
                msg: 'No hay contraseña definida para este usuario'
            });
        }

        const validarContra = bcryptjs.compareSync(contraseña, usuario.contraseña);
        if (!validarContra) {
            return res.status(400).json({
                ok: false,
                msg: 'El password no es correcto para este correo: ' + emailTrimmed
            });
        }

        const token = await generarJWT(usuario.id_usuario);

        res.json({
            ok: true,
            msg: 'Login OK',
            token
        });

    } catch (error) {
        console.log('Error en login:', error);
        return res.status(500).json({
            ok: false,
            msg: 'Hable con el Administrador'
        });
    }
};



const usuariosPost = async (req, res = response) => {
    const { id_usuario, email, contraseña, numero_telefono, minibiografia } = req.body;
    
    const salt = bcryptjs.genSaltSync();
    const hashedPassword = bcryptjs.hashSync(contraseña,salt)

    

    try {
        // Verificar si existe una persona con el mismo id_usuario
        const personaExistente = await Personas.findOne({ where: { id_persona: id_usuario } });

        if (!personaExistente) {
            return res.status(404).json({
                ok: false,
                msg: 'No existe una persona con el id_usuario: ' + id_usuario
            });
        }

        // Si existe, crear el nuevo usuario
        const newUsuario = await Usuarios.create({
            id_usuario,
            email,
            contraseña: hashedPassword, // Utilizar la contraseña encriptada
            numero_telefono,
            minibiografia,
            id_persona: id_usuario // Asegurarse de que la clave foránea esté correctamente asignada
        });

        res.json({
            ok: true,
            data: newUsuario
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Hable con el Administrador',
            err: error
        });
    }
}

const verificarContra = async (req = request, res = response) => {

    const { id } = req.params;
    const { body } = req;
    //const { _id, password, google, correo, ...resto } = req.body;

    try {

        const unUsuario = await Usuarios.findByPk(id);

        if (!unUsuario) {
            return res.status(404).json({
                ok: false,
                msg: 'No existe un usuario con el id: ' + id
            })
        }
        contraUsuario = body.contraseña
        
        

        let match = bcryptjs.compareSync(contraUsuario,unUsuario.contraseña)
        if(match){
            console.log("---La contraseña es correcta!")
        }else{
            console.log("---La contraseña es incorrecta, ALERT!")
        }
        


        res.json({
            ok: true,
            data: unUsuario
        });


    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Hable con el Administrador',
            err: error
        })

    }
}

const usuarios1Post = async (req, res = response) => {

    const { id_usuario, email, contraseña, numero_telefono, minibiografia } = req.body;

    const datos = req.body;

    console.log("Datos", datos);


    const usuarios = new Usuarios({ nombres, apellidos, fecha_nacimiento });

    try {


        const newUsuario = await usuarios.save();

        usuarios.id_persona = newUsuario.null;

        res.json({
            ok: true,
            data: usuarios
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Hable con el Administrador',
            err: error
        })

    }

}



const usuariosDelete = async (req, res = response) => {
    const { id } = req.params;

    console.log(id);

    try {

        const usuario = await Usuarios.findByPk(id);
        //const usuarioAutenticado = req.usuario;

        if (!usuario) {
            return res.status(404).json({
                ok: false,
                msg: 'No existe un usuario con el id: ' + id
            })
        }

        //Borrado Logico.
        //await heroe.update({estado:false});

        //Borrado de la BD
        await usuario.destroy();

        res.json({
            ok: true,
            usuario: usuario,
            //autenticado:usuarioAutenticado
        });


    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Hable con el Administrador',
            err: error
        })

    }

}

const usuarioPut = async (req, res = response) => {
    const { id } = req.params;  // Tomar el id del usuario desde los parámetros de la URL
    const { email, contraseña, numero_telefono, minibiografia } = req.body;  // Los campos que esperas recibir

    try {
        // Buscar el usuario por su ID
        const usuario = await Usuarios.findByPk(id);

        if (!usuario) {
            return res.status(404).json({
                ok: false,
                msg: 'No existe un usuario con el id: ' + id
            });
        }

        // Solo encriptar la contraseña si se envía una nueva
        let updatedFields = {};
        if (email) updatedFields.email = email;
        if (numero_telefono) updatedFields.numero_telefono = numero_telefono;
        if (minibiografia) updatedFields.minibiografia = minibiografia;
        if (contraseña) {
            const salt = bcryptjs.genSaltSync();
            updatedFields.contraseña = bcryptjs.hashSync(contraseña, salt);
        }

        // Actualizar solo los campos presentes en el req.body
        await usuario.update(updatedFields);

        res.json({ ok: true, data: usuario });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Hable con el Administrador',
            err: error
        });
    }
};




module.exports = {
    usuariosGet,
    usuarioByIdGet,
    usuarioPut,
    usuarioscomoGet,
    usuariosPost,
    usuariosDelete,
    usuarios1Get,
    usuarios1Post,
    verificarContra,
    loginPost
    
}


