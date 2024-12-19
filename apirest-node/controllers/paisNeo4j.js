const Pais = require('../models/paisNeo4j');

// Crear un nuevo país
const crearPais = async (req, res) => {
    try {
        const { id_pais, nombre } = req.body;
        const pais = await Pais.crear({ id_pais, nombre });
        res.status(201).json(pais);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Obtener todos los países
const obtenerPaises = async (req, res) => {
    try {
        const paises = await Pais.obtenerTodos();
        res.status(200).json(paises);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Obtener un país por ID
const obtenerPaisPorId = async (req, res) => {
    try {
        const { id } = req.params;
        const pais = await Pais.obtenerPorId(parseInt(id));
        if (!pais) return res.status(404).json({ error: 'País no encontrado' });
        res.status(200).json(pais);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Actualizar un país
const actualizarPais = async (req, res) => {
    try {
        const { id } = req.params;
        const { nombre } = req.body;
        const pais = await Pais.actualizar(parseInt(id), { nombre });
        if (!pais) return res.status(404).json({ error: 'País no encontrado' });
        res.status(200).json(pais);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Eliminar un país
const eliminarPais = async (req, res) => {
    try {
        const { id } = req.params;
        const result = await Pais.eliminar(parseInt(id));
        res.status(200).json(result);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};



module.exports = {
    crearPais,
    obtenerPaises,
    obtenerPaisPorId,
    actualizarPais,
    eliminarPais,
    
};
