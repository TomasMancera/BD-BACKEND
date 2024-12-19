const Contratacion = require('../models/contratacionNeo4j');

class ContratacionController {
    // Crear una nueva contratación
    static async crearContratacion(req, res) {
        try {
            const { id_contratacion, id_deportista, id_equipo, finContrato, InicioContrato, valorContrato } = req.body;
            const contratacion = await Contratacion.crear({ id_contratacion, id_deportista, id_equipo, finContrato, InicioContrato, valorContrato });
            res.status(201).json(contratacion);
        } catch (error) {
            console.error('Error creando contratación:', error.message);
            res.status(500).json({ error: 'Error creando contratación' });
        }
    }

    // Obtener todas las contrataciones
    static async obtenerContrataciones(req, res) {
        try {
            const contrataciones = await Contratacion.obtenerTodas();
            res.status(200).json(contrataciones);
        } catch (error) {
            console.error('Error obteniendo contrataciones:', error.message);
            res.status(500).json({ error: 'Error obteniendo contrataciones' });
        }
    }

    // Obtener una contratación por ID
    static async obtenerContratacionPorId(req, res) {
        try {
            const { id } = req.params;
            const contratacion = await Contratacion.obtenerPorId(parseInt(id));
            if (!contratacion) return res.status(404).json({ error: 'Contratación no encontrada' });
            res.status(200).json(contratacion);
        } catch (error) {
            console.error('Error obteniendo contratación por ID:', error.message);
            res.status(500).json({ error: 'Error obteniendo contratación' });
        }
    }

    // Actualizar una contratación
    static async actualizarContratacion(req, res) {
        try {
            const { id } = req.params;
            const { InicioContrato, finContrato, valorContrato } = req.body;
            const contratacion = await Contratacion.actualizar(parseInt(id), { InicioContrato, finContrato, valorContrato });
            if (!contratacion) return res.status(404).json({ error: 'Contratación no encontrada' });
            res.status(200).json(contratacion);
        } catch (error) {
            console.error('Error actualizando contratación:', error.message);
            res.status(500).json({ error: 'Error actualizando contratación' });
        }
    }

    // Eliminar una contratación
    static async eliminarContratacion(req, res) {
        try {
            const { id } = req.params;
            const result = await Contratacion.eliminar(parseInt(id));
            res.status(200).json(result);
        } catch (error) {
            console.error('Error eliminando contratación:', error.message);
            res.status(500).json({ error: 'Error eliminando contratación' });
        }
    }

    // Relacionar una contratación con un deportista
    static async relacionarConDeportista(req, res) {
        try {
            const { id_contratacion, id_deportista } = req.body;
            const result = await Contratacion.relacionarConDeportista(id_contratacion, id_deportista);
            res.status(200).json(result);
        } catch (error) {
            console.error('Error relacionando contratación con deportista:', error.message);
            res.status(500).json({ error: 'Error relacionando contratación con deportista' });
        }
    }

    // Relacionar una contratación con un equipo
    static async relacionarConEquipo(req, res) {
        try {
            const { id_contratacion, id_equipo } = req.body;
            const result = await Contratacion.relacionarConEquipo(id_contratacion, id_equipo);
            res.status(200).json(result);
        } catch (error) {
            console.error('Error relacionando contratación con equipo:', error.message);
            res.status(500).json({ error: 'Error relacionando contratación con equipo' });
        }
    }
}

module.exports = ContratacionController;
