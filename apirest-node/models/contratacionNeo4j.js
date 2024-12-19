const { getSession } = require('../database/neoDbConnection');

class Contratacion {
    constructor(id_contratacion, id_deportista,id_equipo,finContrato, InicioContrato, valorContrato) {
        this.id_contratacion = id_contratacion;
        this.inicio_contrato = inicio_contrato;
        this.id_deportista = id_deportista;
        this.id_equipo = id_equipo;
        this.finContrato = finContrato;
        this.InicioContrato = InicioContrato;
        this.valorContrato = valorContrato;
    }

    // Crear una contratación
    static async crear({ id_contratacion, id_deportista,id_equipo,finContrato, InicioContrato, valorContrato }) {
        const session = getSession();
        try {
            const result = await session.run(
                `CREATE (c:Contratacion { 
                    Id_Contratacion: $id_contratacion, 
                    Id_Deportista: $id_deportista,
                    inicioContrato: $InicioContrato, 
                    finContrato: $finContrato, 
                    valorContrato: $valorContrato 
                }) RETURN c`,
                { id_contratacion, id_deportista,id_equipo,finContrato, InicioContrato, valorContrato}
            );
            return result.records[0].get('c').properties;
        } catch (error) {
            console.error('Error creando contratación:', error);
            throw new Error('Error creando contratación');
        } finally {
            await session.close();
        }
    }

    // Obtener todas las contrataciones
    static async obtenerTodas() {
        const session = getSession();
        try {
            const result = await session.run('MATCH (c:Contratacion) RETURN c');
            return result.records.map(record => record.get('c').properties);
        } catch (error) {
            console.error('Error obteniendo contrataciones:', error);
            throw new Error('Error obteniendo contrataciones');
        } finally {
            await session.close();
        }
    }

    // Obtener una contratación por ID
    static async obtenerPorId(id_contratacion) {
        const session = getSession();
        try {
            const result = await session.run(
                'MATCH (c:Contratacion {Id_Contratacion: $id_contratacion}) RETURN c',
                { id_contratacion }
            );

            if (result.records.length === 0) return null;
            return result.records[0].get('c').properties;
        } catch (error) {
            console.error('Error obteniendo contratación por ID:', error);
            throw new Error('Error obteniendo contratación');
        } finally {
            await session.close();
        }
    }

    // Actualizar una contratación
    static async actualizar(id_contratacion, { InicioContrato, finContrato, valorContrato }) {
        const session = getSession();
        try {
            const result = await session.run(
                `MATCH (c:Contratacion {Id_Contratacion: $id_contratacion})
                SET c.inicioContrato = $InicioContrato, 
                    c.finContrato = $finContrato, 
                    c.valorContrato = $ValorContrato
                RETURN c`,
                { id_contratacion, InicioContrato, finContrato, valorContrato }
            );

            if (result.records.length === 0) return null;
            return result.records[0].get('c').properties;
        } catch (error) {
            console.error('Error actualizando contratación:', error);
            throw new Error('Error actualizando contratación');
        } finally {
            await session.close();
        }
    }

    // Eliminar una contratación
    static async eliminar(id_contratacion) {
        const session = getSession();
        try {
            await session.run(
                'MATCH (c:Contratacion {Id_Contratacion: $id_contratacion}) DETACH DELETE c',
                { id_contratacion }
            );
            return { message: 'Contratación eliminada correctamente' };
        } catch (error) {
            console.error('Error eliminando contratación:', error);
            throw new Error('Error eliminando contratación');
        } finally {
            await session.close();
        }
    }

    // Relacionar una contratación con un deportista
    static async relacionarConDeportista(id_contratacion, id_deportista) {
        const session = getSession();
        try {
            await session.run(
                `MATCH (c:Contratacion {Id_Contratacion: $id_contratacion}), 
                       (d:Deportista {Id_Deportista: $id_deportista})
                CREATE (c)-[:PARA]->(d)`,
                { id_contratacion, id_deportista }
            );
            return { message: 'Relación con deportista creada correctamente' };
        } catch (error) {
            console.error('Error relacionando contratación con deportista:', error);
            throw new Error('Error al relacionar contratación con deportista');
        } finally {
            await session.close();
        }
    }

    // Relacionar una contratación con un equipo
    static async relacionarConEquipo(id_contratacion, id_equipo) {
        const session = getSession();
        try {
            await session.run(
                `MATCH (c:Contratacion {Id_Contratacion: $id_contratacion}), 
                       (e:Equipo {Id_Equipo: $id_equipo})
                CREATE (c)-[:REALIZADA_POR]->(e)`,
                { id_contratacion, id_equipo }
            );
            return { message: 'Relación con equipo creada correctamente' };
        } catch (error) {
            console.error('Error relacionando contratación con equipo:', error);
            throw new Error('Error al relacionar contratación con equipo');
        } finally {
            await session.close();
        }
    }
}

module.exports = Contratacion;
