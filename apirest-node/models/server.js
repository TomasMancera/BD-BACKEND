const express = require('express')

const cors = require('cors')
const app = express()

const { bdmysql } = require('../database/MariaDbConnection');
const {dbMongo} = require ('../database/MongoDbConnection')
const { connectNeo4j, closeNeo4j } = require('../database/neoDbConnection');

class Server {
    constructor() {
        this.app = express();
        this.port = process.env.PORT;

        this.pathsMySql = {
            auth: '/api/auth',
            personas: '/api/personas',
            usuarios: '/api/usuarios',
            ciudad: '/api/ciudad'
            
        }
        this.pathsMongo = {
            equipos: '/api/equipos',
            futbolistas: '/api/futbolistas',
            contrataciones:'/api/contrataciones'
        }

        this.pathsNeo4j = {
            deportistas: '/api/neo4j/deportistas',
            equipos: '/api/neo4j/equipos',
            paises: '/api/neo4j/paises',
            contrataciones: '/api/neo4j/contrataciones'
        };
        app.use(cors({
            origin: 'http://localhost:4200', // Permite sólo este origen
            methods: ['GET', 'POST', 'PUT', 'DELETE'], // Métodos permitidos
            allowedHeaders: ['Content-Type', 'Authorization'] // Cabeceras permitidas
          }));


        this.app.get('/', function (req, res) {
            res.send('Hola Mundo a todos...')
        })
        

        
        //Middlewares
        this.middlewares();
        //Aqui me conecto a la BD
        //this.dbConnection();
        this.dbConnectionNeo4j(); // Conexión a Neo4j
        //this.dbConnectionMongo();



        //Routes
        this.routes();

    }

    async dbConnection() {
        try {
            await bdmysql.authenticate();
            console.log('Connection OK a MySQL OK.');
        } catch (error) {
            console.error('No se pudo Conectar a la BD MySQL', error);
        }
    }

    async dbConnectionMongo(){
        await dbMongo();
    }

    async dbConnectionNeo4j() {
        try {
            await connectNeo4j();
        } catch (error) {
            console.error('Error conectando a Neo4j:', error);
        }
    }

    routes() {
        //this.app.use(this.pathsMySql.auth, require('../routes/MySqlAuth'));
        this.app.use(this.pathsMySql.personas, require('../routes/prueba'));
        this.app.use(this.pathsMySql.usuarios, require('../routes/usuarios'));
        this.app.use(this.pathsMySql.ciudad, require('../routes/ciudad'));
        this.app.use(this.pathsMongo.equipos, require('../routes/equipo'));
        this.app.use(this.pathsMongo.futbolistas, require('../routes/futbolista'));
        this.app.use(this.pathsMongo.contrataciones, require('../routes/contrataciones'));
        this.app.use(this.pathsNeo4j.deportistas, require('../routes/deportistas'));
        this.app.use(this.pathsNeo4j.equipos, require('../routes/equiposNeo4j'));
        this.app.use(this.pathsNeo4j.paises, require('../routes/paisNeo4j'));
        this.app.use(this.pathsNeo4j.contrataciones, require('../routes/contratacionNeo4j'));
        
    }

    middlewares() {
        //CORS
        //Evitar errores por Cors Domain Access
        //Usado para evitar errores.
        this.app.use(cors());

        //Lectura y Parseo del body
        //JSON
        /*
        JSON (JavaScript Object Notation) 
        es un formato ligero de intercambio de datos. 
        JSON es de fácil lectura y escritura para los usuarios. 
        JSON es fácil de analizar y generar por parte de las máquinas. 
        JSON se basa en un subconjunto del lenguaje de programación JavaScript, 
        Estándar ECMA-262 3a Edición - Diciembre de 1999.
        */
        this.app.use(express.json());

        //Directorio publico
        this.app.use(express.static('public'));
    }


    listen() {
        this.app.listen(this.port, () => {
            console.log('Servidor corriendo en puerto', this.port);
        });
        // Escuchar eventos de cierre para desconectar Neo4j
        process.on('SIGINT', async () => {
            await closeNeo4j();
            process.exit(0);
        });
    }

}

module.exports = Server;
