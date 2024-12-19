const Equipo = require('../models/equiposNeo4j');

const crearEquipo = async (req, res) => {
    try {
        const { id_equipo, nombre, pais_origen } = req.body;
        const equipo = await Equipo.crear({ id_equipo, pais_origen,nombre });
        res.status(201).json(equipo);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const obtenerEquipos = async (req, res) => {
    try {
        const equipos = await Equipo.obtenerTodos();
        res.status(200).json(equipos);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const obtenerEquipoPorId = async (req, res) => {
    try {
        const { id } = req.params;
        const equipo = await Equipo.obtenerPorId(parseInt(id));
        if (!equipo) return res.status(404).json({ error: 'Equipo no encontrado' });
        res.status(200).json(equipo);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const actualizarEquipo = async (req, res) => {
    try {
        const { id } = req.params;
        const { nombre, pais_origen } = req.body;
        const equipo = await Equipo.actualizar(parseInt(id), { nombre, pais_origen });
        if (!equipo) return res.status(404).json({ error: 'Equipo no encontrado' });
        res.status(200).json(equipo);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const eliminarEquipo = async (req, res) => {
    try {
        const { id } = req.params;
        const result = await Equipo.eliminar(parseInt(id));
        res.status(200).json(result);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const relacionarConPais = async (req, res) => {
    try {
        const { id_equipo, id_pais } = req.body;
        const result = await Equipo.relacionarConPais(id_equipo, id_pais);
        res.status(200).json(result);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }

    
    
};

const relacionarConDeporte = async (req, res) => {
    try {
        const { id_equipo, id_deporte } = req.body;
        const result = await Equipo.relacionarConDeporte(id_equipo, id_deporte);
        res.status(200).json(result);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

module.exports = {
    crearEquipo,
    obtenerEquipos,
    obtenerEquipoPorId,
    actualizarEquipo,
    eliminarEquipo,
    relacionarConPais,
    relacionarConDeporte
};
