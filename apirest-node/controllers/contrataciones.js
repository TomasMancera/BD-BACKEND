const { Futbolista } = require("../models");
const { Equipo } = require("../models");
const { Contratacion } = require("../models");

const obtenerContrataciones = async (req, res = response) => {
    const {desde = 0 } = req.query;
  
    try {
      const [total, contrataciones] = await Promise.all([
        Contratacion.countDocuments(),
        Contratacion.find({})
          .skip(Number(desde))
          .sort({nombre:1})
      ]);
      
      res.json({ Ok: true, total: total, resp: contrataciones });
      
    } catch (error) {
      console.log("ERROR",error);
      res.json({ Ok: false, resp: error });
    }
  };
  
  
  const obtenerContratacionId = async (req, res = response) => {
      const { id } = req.params;
      try {
        const equipo = await Contratacion.findById(id);
         
        res.json({ Ok: true, resp: equipo });
      } catch (error) {
        res.json({ Ok: false, resp: error });
      }  
  };
  
  const crearContratacionPost = async (req, res = response) => {
    const body = req.body;
    errorEquipo = ""
    try {
      const equipoDB = await Equipo.findById(body.id_equipo);
      if (!equipoDB) {
        return res
        //.status(400)
        .json({
          Ok: false,
          msg: `El Equipo No existe`,
        });
      }
      const futbolistaDB = await Futbolista.findById(body.id_futbolista);
      if (!futbolistaDB) {
        return res
        //.status(400)
        .json({
          Ok: false,
          msg: `El futbolista No existe`,
        });
      }
  
  
      const contratacion = new Contratacion(body);
      // Guardar DB
      await contratacion.save();
      res
      //.status(201)
      .json({ Ok: true, msg: 'Contratacion Insertado', resp: contratacion});
    } catch (error) {
      //console.log("ERROR:INSERTAR",error);
      res.json({ Ok: false, msg: errorEquipo, resp: error });
    }
  };
  
  const actualizarContratacionPut = async (req, res = response) => {
    const { id } = req.params;
  
    const data  = req.body;
  
  
    try { 
      const contratacion = await Contratacion.findByIdAndUpdate(id, data, {
        new: true,
      });
  
      res.json({ Ok: true, msg: 'contratacion  Actualizado', resp: contratacion });
    } catch (error) {
      console.log("ERROR_MODIFICAR",error);
      res.json({ Ok: false, resp: error });
    }
  };
  
  const borrarContratacionDelete = async (req, res = response) => {
    const { id } = req.params;
    try {
      const equipo = await Contratacion.findById(id);
      if (!equipo){
        return res.status(400).json({
          msg: `El contratacion con ${id}, no existe en la BD`,
        });
      }
      const contratacionBorrado = await Contratacion.findByIdAndDelete(id);
      res.json({ Ok: true,msg:"Contratacion borrado" ,resp: contratacionBorrado });
    } catch (error) {
      console.log("ERROR_BORRADO",error);
      res.json({ Ok: false, resp: error });
    }
  };

  module.exports = {
    obtenerContrataciones, obtenerContratacionId, crearContratacionPost, actualizarContratacionPut, borrarContratacionDelete
  };    