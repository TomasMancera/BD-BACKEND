const { response, request } = require('express')
const { Ciudad } = require('../models/ciudad')
const { bdmysql } = require('../database/MariaDbConnection');
const { QueryTypes } = require('sequelize');

const { Op } = require("sequelize");
const getCiudad = async (req, res = response) => {

    const query = req.query;

    //Desestructuracion de argumentos
    const { q, nombre = 'No name', apikey, page = 1, limit = 10 } = req.query;


    //console.log("Datos",q,nombre);
    try {
        const unasCiudades = await Ciudad.findAll();
        res.json({
            ok: true,
            msg: 'get API - Controller Funciono',
            query,
            q,
            nombre,
            apikey,
            page,
            limit,
            data: unasCiudades
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

const ciudadByidGet = async (req = request, res = response) => {

    const { id } = req.params;
    //const { _id, password, google, correo, ...resto } = req.body;

    try {

        const unaCiudad = await Ciudad.findByPk(id);

        if (!unaCiudad) {
            return res.status(404).json({
                ok: false,
                msg: 'No existe una ciudad con el id: ' + id
            })
        }

        res.json({
            ok: true,
            data: unaCiudad
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
const ciudadComoGet = async (req = request, res = response) => {

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
            "SELECT * FROM ciudad WHERE nombre LIKE :searchTerm LIKE :searchTerm ORDER BY nombre",
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

    const postCiudad = async (req, res = response) => {
            const { id_ciudad, nombre} = req.body;
        
            const datos = req.body;
        
            console.log("Datos", datos);
            const ciudad = new Ciudad({ id_ciudad,nombre });

            try {
        
                const newCiudad = await Ciudad.create(datos);
        
                //Aqui asigna el id del nuevo registro a la newPersona
                newCiudad.id_persona = newCiudad.null;
        
                res.json({
                    ok: true,
                    data: newCiudad
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

    const deleteCiudad = async (req, res = response) => {
        const { id } = req.params;
    
        console.log(id);
    
        try {
    
            const ciudad = await Ciudad.findByPk(id);
            //const usuarioAutenticado = req.usuario;
    
            if (!ciudad) {
                return res.status(404).json({
                    ok: false,
                    msg: 'No existe una ciudad con el id: ' + id
                })
            }
    
            await ciudad.destroy();
    
            res.json({
                ok: true,
                ciudad: ciudad,
                
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

    const putCiudad = async (req, res = response) => {

        const { id } = req.params;
        const { body } = req;
    
        console.log(id);
        console.log(body);
    
    
        try {
    
            const ciudad = await Ciudad.findByPk(id);
    
            if (!ciudad) {
                return res.status(404).json({
                    ok: false,
                    msg: 'No existe una ciudad con el id: ' + id
                })
            }
    
            await ciudad.update(body);
    
            res.json({ ok: true, data: ciudad });
    
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
    getCiudad,
    postCiudad,
    putCiudad,
    deleteCiudad,
    ciudadByidGet,
    ciudadComoGet


}
