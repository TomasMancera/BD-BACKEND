const Futbolista  = require("../models");
const Equipo = require("../models")

const obtenerFutbolistas = async (req, res = response) => {
  const {desde = 0 } = req.query;

  try {
    const [total, futbolistas] = await Promise.all([
      Futbolista.countDocuments(),
      Futbolista.find({})
        .skip(Number(desde))
        .sort({nombre:1})
    ]);
    
    res.json({ Ok: true, total: total, resp: futbolistas });
    
  } catch (error) {
    console.log("ERROR",error);
    res.json({ Ok: false, resp: error });
  }
};


const obtenerFutbolistaId = async (req, res = response) => {
    const { id } = req.params;
    try {
      const equipo = await Futbolista.findById(id);
       
      res.json({ Ok: true, resp: equipo });
    } catch (error) {
        res.json({ Ok: true});
    }  

  }
  const crearFutbolistaPost = async (req, res = response) => {
    const { id_equipo, nombre, apellidos, edad, internacional } = req.body;  // Desestructurar los campos principales
  
    try {
      // Verificar si el equipo existe
      const equipoDB = await Equipo.findById(id_equipo);
  
      if (!equipoDB) {
        return res.status(400).json({
          Ok: false,
          msg: `El equipo con ID ${id_equipo} no existe.`,
        });
      }
  
      // Crear una nueva instancia del modelo Futbolista
      const futbolista = new Futbolista({ nombre, apellidos, edad, internacional, id_equipo });
  
      // Guardar el nuevo futbolista en la base de datos
      await futbolista.save();
  
      res.status(201).json({
        Ok: true,
        msg: 'Futbolista insertado con éxito',
        resp: futbolista,
      });
  
    } catch (error) {
      // Capturamos el error y enviamos una respuesta adecuada
      console.error("Error al insertar futbolista:", error);
      res.status(500).json({
        Ok: false,
        msg: 'Error al insertar futbolista',
        resp: error.message,
      });
    }
  }
  const actualizarFutbolistaPut = async (req, res = response) => {
    const { id } = req.params;
  
    const data  = req.body;
  
  
    try { 
      if (data.nombre) {
          const equipoDB = await Futbolista.findOne({ nombre: data.nombre });
          if (equipoDB) {
            return res.status(400).json({
              msg: `El Equipo ${data.nombre}, ya existe en la BD`,
            });
          }
      }
     
      const futbolista = await Futbolista.findByIdAndUpdate(id, data, {
        new: true,
      });
  
      res.json({ Ok: true, msg: 'Futoblista actuaizado Actualizado', resp: futbolista });
    } catch (error) {
      console.log("ERROR_MODIFICAR",error);
      res.json({ Ok: false, resp: error });
    }
  };
  const borrarFutbolistaDelete = async (req, res = response) => {
    const { id } = req.params;
    try {
      const equipo = await Futbolista.findById(id);
      if (!equipo){
        return res.status(400).json({
          msg: `El futbolista con ${id}, no existe en la BD`,
        });
      }
      const futbolistaBorrado = await Futbolista.findByIdAndDelete(id);
      res.json({ Ok: true,msg:"Futbolista borrado" ,resp: futbolistaBorrado });
    } catch (error) {
      console.log("ERROR_BORRADO",error);
      res.json({ Ok: false, resp: error });
    }
  };


module.exports = {
    obtenerFutbolistas, obtenerFutbolistaId, crearFutbolistaPost,actualizarFutbolistaPut,borrarFutbolistaDelete
  };