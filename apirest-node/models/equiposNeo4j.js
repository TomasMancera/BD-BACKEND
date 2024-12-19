const { getSession } = require('../database/neoDbConnection');

class Equipo {
    constructor(id_equipo, nombre, pais_origen) {
        this.id_equipo = id_equipo;
        this.nombre = nombre;
        this.pais_origen = pais_origen;
    }

    // Crear un equipo
    static async crear({ id_equipo, nombre, pais_origen }) {
        const session = getSession();
        try {
            const result = await session.run(
                `CREATE (e:Equipo { 
                    Id_Equipo: $id_equipo, 
                    Id_Pais: $pais_origen,
                    Nombre: $nombre
                }) RETURN e`,
                { id_equipo, nombre, pais_origen }
            );
            return result.records[0].get('e').properties;
        } catch (error) {
            console.error('Error creando equipo:', error);
            throw new Error('Error creando equipo');
        } finally {
            await session.close();
        }
    }

    // Obtener todos los equipos
    static async obtenerTodos() {
        const session = getSession();
        try {
            const result = await session.run('MATCH (e:Equipo) RETURN e');
            return result.records.map(record => record.get('e').properties);
        } catch (error) {
            console.error('Error obteniendo equipos:', error);
            throw new Error('Error obteniendo equipos');
        } finally {
            await session.close();
        }
    }

    // Obtener un equipo por ID
    static async obtenerPorId(id_equipo) {
        const session = getSession();
        try {
            const result = await session.run(
                'MATCH (e:Equipo {Id_Equipo: $id_equipo}) RETURN e',
                { id_equipo }
            );

            if (result.records.length === 0) return null;
            return result.records[0].get('e').properties;
        } catch (error) {
            console.error('Error obteniendo equipo por ID:', error);
            throw new Error('Error obteniendo equipo');
        } finally {
            await session.close();
        }
    }

    // Actualizar un equipo
    static async actualizar(id_equipo, { nombre, pais_origen }) {
        const session = getSession();
        try {
            const result = await session.run(
                `MATCH (e:Equipo {Id_Equipo: $id_equipo})
                SET e.Nombre = $nombre, 
                    e.Id_Pais = $pais_origen
                RETURN e`,
                { id_equipo, nombre, pais_origen }
            );

            if (result.records.length === 0) return null;
            return result.records[0].get('e').properties;
        } catch (error) {
            console.error('Error actualizando equipo:', error);
            throw new Error('Error actualizando equipo');
        } finally {
            await session.close();
        }
    }

    // Eliminar un equipo
    static async eliminar(id_equipo) {
        const session = getSession();
        try {
            await session.run(
                'MATCH (e:Equipo {Id_Equipo: $id_equipo}) DETACH DELETE e',
                { id_equipo }
            );
            return { message: 'Equipo eliminado correctamente' };
        } catch (error) {
            console.error('Error eliminando equipo:', error);
            throw new Error('Error eliminando equipo');
        } finally {
            await session.close();
        }
    }

    // Relacionar un equipo con un país
    static async relacionarConPais(id_equipo, id_pais) {
        const session = getSession();
        try {
            await session.run(
                `MATCH (e:Equipo {Id_Equipo: $id_equipo}), (p:Pais {Id_Pais: $id_pais})
                CREATE (e)-[:ORIGEN_EQUIPO]->(p)`,
                { id_equipo, id_pais }
            );
            return { message: 'Relación con país creada correctamente' };
        } catch (error) {
            console.error('Error relacionando equipo con país:', error);
            throw new Error('Error al relacionar equipo con país');
        } finally {
            await session.close();
        }
    }
      // Relacionar un equipo con un deporte
      static async relacionarConDeporte(id_equipo, id_deporte) {
        const session = getSession();
        try {
            await session.run(
                `MATCH (e:Equipo {Id_Equipo: $id_equipo}), 
                       (d:Deporte {Id_Deporte: $id_deporte})
                CREATE (e)-[:LA_RAZON_DE]->(d)`,
                { id_equipo, id_deporte }
            );
            return { message: 'Relación con deporte creada correctamente' };
        } catch (error) {
            console.error('Error relacionando equipo con deporte:', error);
            throw new Error('Error al relacionar equipo con deporte');
        } finally {
            await session.close();
        }
    }
}

module.exports = Equipo;
