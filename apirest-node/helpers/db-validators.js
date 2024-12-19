const { Equipo } = require("../models");
const { Futbolista } = require("../models")
const {Contratacion}  = require("../models")

const existeEquipoPorId = async (id) => {
    /*
    const existeEquipo = await Equipo.findById(id);
    if (!existeEquipo) {
        throw new Error(`El id del Equipo no existe ${id}`);
    }
        */
    const equipo = await Equipo.findById(id);
    if (!equipo){
        throw new Error(`El id del Equipo no existe ${id}`);
    
    }
};

const existeFutbolistaPorId = async (id) => {
    const existeFutbolista = await Futbolista.findById(id);
    if (!existeFutbolista) {
        throw new Error(`El id del futbolista no existe  ${id}`);
    }
};

const existeFutbolistaPorIdEquipo = async (id) => {
    const [total, equipos] = await Promise.all([
        Futbolista.countDocuments({id_equipo:id}),
        Futbolista.find({id_equipo:id})]);
    if (total>0) {
        throw new Error(`No se puede borrar el equipo, el equipo tiene ${total} jugadores activos`);
    }
};

const existeContratoPorIdFutbolista = async (id) => {
        const [total, futbolistas] = await Promise.all([
            Contratacion.countDocuments({ id_futbolista: id }),
            Contratacion.find({ id_futbolista: id })
        ]);

        if (total > 0) {
            throw new Error(`No se puede borrar el jugador, el jugador tiene contrato activo`);
        }
};

const existeContratoPorIdEquipo = async (id) => {
    const [total, equipos] = await Promise.all([
        Contratacion.countDocuments({ id_equipo: id }),
        Contratacion.find({ id_equipo: id })
    ]);

    if (total > 0) {
        throw new Error(`No se puede borrar el equipo, tienes contratos activos`);
    }
};




module.exports = {
    existeEquipoPorId, existeFutbolistaPorId,existeContratoPorIdFutbolista,existeContratoPorIdEquipo,existeFutbolistaPorIdEquipo
};