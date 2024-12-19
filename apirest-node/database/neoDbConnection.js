const neo4j = require('neo4j-driver');

let driver; // Declaramos la variable para reutilizar el driver

const connectNeo4j = async () => {
    try {
        // Inicializar el driver
        driver = neo4j.driver(
            'neo4j://localhost:7687', // Cambia esto si usas una instancia remota
            neo4j.auth.basic('neo4j', 'risbo009') // Credenciales de tu base de datos Neo4j
        );

        // Probar la conexión
        const session = driver.session();
        await session.run('RETURN 1'); // Ejecutamos una consulta simple
        session.close();

        console.log('Conexión a Neo4j establecida correctamente.');
    } catch (error) {
        console.error('Error conectando a Neo4j:', error);
        throw new Error('No se pudo conectar a Neo4j');
    }
};

// Obtener una sesión para ejecutar consultas
const getSession = () => {
    if (!driver) {
        throw new Error('Driver Neo4j no inicializado. Llama a connectNeo4j primero.');
    }
    return driver.session();
};

// Cerrar el driver
const closeNeo4j = async () => {
    if (driver) {
        await driver.close();
        console.log('Conexión a Neo4j cerrada.');
    }
};

module.exports = { connectNeo4j, getSession, closeNeo4j };
