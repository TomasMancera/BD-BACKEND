const Deportista = require('../models/deportistas');

const crearDeportista = async (req, res) => {
    try {
        const { id_deportista, nombre, fecha_nacimiento, genero } = req.body;
        const deportista = await Deportista.crear({ id_deportista, nombre, fecha_nacimiento, genero });
        res.status(201).json(deportista);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const obtenerDeportistas = async (req, res) => {
    try {
        const deportistas = await Deportista.obtenerTodos();
        res.status(200).json(deportistas);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const obtenerDeportistaPorId = async (req, res) => {
    try {
        const { id } = req.params;
        const deportista = await Deportista.obtenerPorId(parseInt(id));
        if (!deportista) return res.status(404).json({ error: 'Deportista no encontrado' });
        res.status(200).json(deportista);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const actualizarDeportista = async (req, res) => {
    try {
        const { id } = req.params;
        const { nombre, fecha_nacimiento, genero } = req.body;
        const deportista = await Deportista.actualizar(parseInt(id), { nombre, fecha_nacimiento, genero });
        if (!deportista) return res.status(404).json({ error: 'Deportista no encontrado' });
        res.status(200).json(deportista);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const eliminarDeportista = async (req, res) => {
    try {
        const { id } = req.params;
        const result = await Deportista.eliminar(parseInt(id));
        res.status(200).json(result);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};


const relacionarConEquipo = async (req, res) => {
    try {
        const { id_deportista, id_equipo } = req.body;
        const result = await Deportista.relacionarConEquipo(id_deportista, id_equipo);
        res.status(200).json(result);
    } catch (error) {
        console.error('Error relacionando deportista con equipo:', error.message);
        res.status(500).json({ error: 'Error relacionando deportista con equipo' });
    }
};

module.exports = {
    crearDeportista,
    obtenerDeportistas,
    obtenerDeportistaPorId,
    actualizarDeportista,
    eliminarDeportista,
    relacionarConEquipo
};
