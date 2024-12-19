const { getSession } = require('../database/neoDbConnection');

class Pais {
    constructor(id_pais, nombre) {
        this.id_pais = id_pais;
        this.nombre = nombre;
       
    }

    // Crear un país
    static async crear({ id_pais, nombre }) {
        const session = getSession();
        try {
            const result = await session.run(
                `CREATE (p:Pais { 
                    Id_Pais: $id_pais, 
                    Nombre: $nombre 
                }) RETURN p`,
                { id_pais, nombre }
            );
            return result.records[0].get('p').properties;
        } catch (error) {
            console.error('Error creando país:', error);
            throw new Error('Error creando país');
        } finally {
            await session.close();
        }
    }

    // Obtener todos los países
    static async obtenerTodos() {
        const session = getSession();
        try {
            const result = await session.run('MATCH (p:Pais) RETURN p');
            return result.records.map(record => record.get('p').properties);
        } catch (error) {
            console.error('Error obteniendo países:', error);
            throw new Error('Error obteniendo países');
        } finally {
            await session.close();
        }
    }

    // Obtener un país por ID
    static async obtenerPorId(id_pais) {
        const session = getSession();
        try {
            const result = await session.run(
                'MATCH (p:Pais {Id_Pais: $id_pais}) RETURN p',
                { id_pais }
            );

            if (result.records.length === 0) return null;
            return result.records[0].get('p').properties;
        } catch (error) {
            console.error('Error obteniendo país por ID:', error);
            throw new Error('Error obteniendo país');
        } finally {
            await session.close();
        }
    }

    // Actualizar un país
    static async actualizar(id_pais, { nombre }) {
        const session = getSession();
        try {
            const result = await session.run(
                `MATCH (p:Pais {Id_Pais: $id_pais})
                SET p.Nombre = $nombre, 
                RETURN p`,
                { id_pais, nombre, continente }
            );

            if (result.records.length === 0) return null;
            return result.records[0].get('p').properties;
        } catch (error) {
            console.error('Error actualizando país:', error);
            throw new Error('Error actualizando país');
        } finally {
            await session.close();
        }
    }

    // Eliminar un país
    static async eliminar(id_pais) {
        const session = getSession();
        try {
            await session.run(
                'MATCH (p:Pais {Id_Pais: $id_pais}) DETACH DELETE p',
                { id_pais }
            );
            return { message: 'País eliminado correctamente' };
        } catch (error) {
            console.error('Error eliminando país:', error);
            throw new Error('Error eliminando país');
        } finally {
            await session.close();
        }
    }

}

module.exports = Pais;
