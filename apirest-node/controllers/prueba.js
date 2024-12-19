const { response, request } = require('express')
const { Personas, Personas1 } = require('../models/personas');

const { bdmysql } = require('../database/MariaDbConnection');
const { QueryTypes } = require('sequelize');

const { Op } = require("sequelize");

const bcryptjs = require('bcryptjs');


const personasGet = async (req, res = response) => {

    const query = req.query;

    //Desestructuracion de argumentos
    const { q, nombre = 'No name', apikey, page = 1, limit = 10 } = req.query;


    //console.log("Datos",q,nombre);
    try {
        const unasPersonas = await Personas.findAll();
        res.json({
            ok: true,
            msg: 'get API - Controller Funciono',
            query,
            q,
            nombre,
            apikey,
            page,
            limit,
            data: unasPersonas
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

const personaByIdGet = async (req = request, res = response) => {

    const { id } = req.params;
    //const { _id, password, google, correo, ...resto } = req.body;

    try {

        const unaPersona = await Personas.findByPk(id);

        if (!unaPersona) {
            return res.status(404).json({
                ok: false,
                msg: 'No existe una Persona con el id: ' + id
            })
        }

        res.json({
            ok: true,
            data: unaPersona
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

const personasComoGet = async (req = request, res = response) => {

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
            "SELECT * FROM persona WHERE nombres LIKE :searchTerm OR apellidos LIKE :searchTerm ORDER BY nombres",
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

const personas1Get = async (req, res = response) => {

    const query = req.query;

    const { termino } = req.params;

    console.log("TERMINO", termino)


    //Desestructuracion de argumentos
    const { q, nombre = 'No name', apikey, page = 1, limit = 10 } = req.query;


    //console.log("Datos",q,nombre);
    try {
        const unasPersonas = await Personas.findAll(
            {
                where: {
                    [Op.or]: [{
                        nombres: {
                            [Op.like]: `%${termino}%`
                        }
                    },
                    {
                        apellidos: {
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
            data: unasPersonas
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

const personaPost = async (req, res = response) => {

    const { id_persona, nombres, apellidos, fecha_nacimiento } = req.body;

    const datos = req.body;

    console.log("Datos", datos);

    let password = 'KaliLinux2024$';
    // Encriptar la contraseña
    const salt = bcryptjs.genSaltSync();
    let nuevoPassword = bcryptjs.hashSync(password, salt);

    console.log(nuevoPassword);

    let match = bcryptjs.compareSync("not_bacon", nuevoPassword); // false
    let match1 = bcryptjs.compareSync("KaliLinux2024$", nuevoPassword); // true

    console.log(match,match1);


    const persona = new Personas({ id_persona, nombres, apellidos, fecha_nacimiento });

    try {

        const newPersona = await Personas.create(datos);

        //Aqui asigna el id del nuevo registro a la newPersona
        newPersona.id_persona = newPersona.null;

        res.json({
            ok: true,
            data: newPersona
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

const persona1Post = async (req, res = response) => {

    const { id_persona, nombres, apellidos, fecha_nacimiento } = req.body;

    const datos = req.body;

    console.log("Datos", datos);


    const persona = new Personas({ nombres, apellidos, fecha_nacimiento });

    try {


        const newPersona = await persona.save();

        persona.id_persona = newPersona.null;

        res.json({
            ok: true,
            data: persona
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



const personaDelete = async (req, res = response) => {
    const { id } = req.params;

    console.log(id);

    try {

        const persona = await Personas.findByPk(id);
        //const usuarioAutenticado = req.usuario;

        if (!persona) {
            return res.status(404).json({
                ok: false,
                msg: 'No existe una persona con el id: ' + id
            })
        }

        //Borrado Logico.
        //await heroe.update({estado:false});

        //Borrado de la BD
        await persona.destroy();

        res.json({
            ok: true,
            persona: persona,
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

const personaPut = async (req, res = response) => {

    const { id } = req.params;
    const { body } = req;

    console.log(id);
    console.log(body);


    try {

        const persona = await Personas.findByPk(id);

        if (!persona) {
            return res.status(404).json({
                ok: false,
                msg: 'No existe una Persona con el id: ' + id
            })
        }

        await persona.update(body);

        res.json({ ok: true, data: persona });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Hable con el Administrador',
            err: error
        })

    }

}



module.exports = {
    personasGet,
    personaByIdGet,
    personasComoGet,
    personas1Get,
    personaPost,
    persona1Post,
    personaDelete,
    personaPut
}


