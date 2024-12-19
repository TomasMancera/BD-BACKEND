const { getSession } = require('../database/neoDbConnection');

class Deportista {
    constructor(id_deportista, nombre, fecha_nacimiento, genero) {
        this.id_deportista = id_deportista;
        this.nombre = nombre;
        this.fecha_nacimiento = fecha_nacimiento;
        this.genero = genero;
    }

    // Crear un deportista
    static async crear({ id_deportista, nombre, fecha_nacimiento, genero }) {
        const session = getSession();
        try {
            const result = await session.run(
                `CREATE (d:Deportista { 
                    Id_Deportista: $id_deportista, 
                    Nombre: $nombre, 
                    Fecha_Nacimiento: $fecha_nacimiento, 
                    genero: $genero 
                }) RETURN d`,
                { id_deportista, nombre, fecha_nacimiento, genero }
            );

            return result.records[0].get('d').properties;
        } catch (error) {
            console.error('Error creando deportista:', error);
            throw new Error('Error creando deportista');
        } finally {
            await session.close();
        }
    }

    // Obtener todos los deportistas
    static async obtenerTodos() {
        const session = getSession();
        try {
            const result = await session.run('MATCH (d:Deportista) RETURN d');
            return result.records.map(record => record.get('d').properties);
        } catch (error) {
            console.error('Error obteniendo deportistas:', error);
            throw new Error('Error obteniendo deportistas');
        } finally {
            await session.close();
        }
    }

    // Obtener un deportista por ID
    static async obtenerPorId(id_deportista) {
        const session = getSession();
        try {
            const result = await session.run(
                'MATCH (d:Deportista {Id_Deportista: $id_deportista}) RETURN d',
                { id_deportista }
            );

            if (result.records.length === 0) return null;
            return result.records[0].get('d').properties;
        } catch (error) {
            console.error('Error obteniendo deportista por ID:', error);
            throw new Error('Error obteniendo deportista');
        } finally {
            await session.close();
        }
    }

    // Actualizar un deportista
    static async actualizar(id_deportista, { nombre, fecha_nacimiento, genero }) {
        const session = getSession();
        try {
            const result = await session.run(
                `MATCH (d:Deportista {Id_Deportista: $id_deportista})
                SET d.Nombre = $nombre, 
                    d.Fecha_Nacimiento = $fecha_nacimiento, 
                    d.genero = $genero
                RETURN d`,
                { id_deportista, nombre, fecha_nacimiento, genero }
            );

            if (result.records.length === 0) return null;
            return result.records[0].get('d').properties;
        } catch (error) {
            console.error('Error actualizando deportista:', error);
            throw new Error('Error actualizando deportista');
        } finally {
            await session.close();
        }
    }

    // Eliminar un deportista
    static async eliminar(id_deportista) {
        const session = getSession();
        try {
            await session.run(
                'MATCH (d:Deportista {Id_Deportista: $id_deportista}) DETACH DELETE d',
                { id_deportista }
            );
            return { message: 'Deportista eliminado correctamente' };
        } catch (error) {
            console.error('Error eliminando deportista:', error);
            throw new Error('Error eliminando deportista');
        } finally {
            await session.close();
        }
    }
    // Relacionar un deportista con un equipo
    static async relacionarConEquipo(id_deportista, id_equipo) {
        const session = getSession();
        try {
            await session.run(
                `MATCH (d:Deportista {Id_Deportista: $id_deportista}), 
                       (e:Equipo {Id_Equipo: $id_equipo})
                CREATE (d)-[:ASIGNADO_A]->(e)`,
                { id_deportista, id_equipo }
            );
            return { message: 'Relación con equipo creada correctamente' };
        } catch (error) {
            console.error('Error relacionando deportista con equipo:', error);
            throw new Error('Error al relacionar deportista con equipo');
        } finally {
            await session.close();
        }
    }
}

module.exports = Deportista;
