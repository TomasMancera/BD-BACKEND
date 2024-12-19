const { DataTypes } = require('sequelize');
const { bdmysql } = require('../database/MariaDbConnection');
const { Personas } = require('./personas')
const Usuarios = bdmysql.define('usuario',
    {
        // Model attributes are defined here
        'id_usuario': {
            type: DataTypes.INTEGER,
            //allowNull: false,
            primaryKey: true
        },

        'email': {
            type: DataTypes.STRING,
            allowNull: false
            // allowNull defaults to true
        },
        'contraseña': {
            type: DataTypes.STRING,
            allowNull: false
            // allowNull defaults to true
        },
        'numero_telefono': {
            type: DataTypes.INTEGER,
            // allowNull defaults to true
            allowNull: false
        },
        'minibiografia': {
            type: DataTypes.STRING,
            // allowNull defaults to true
            allowNull: false

        },
        id_persona: {
            type: DataTypes.INTEGER,
            references: {
              model: Personas, // Nombre del modelo al que se hace referencia
              key: 'id_persona', // Columna en la tabla Persona que será referenciada
            },
            onUpdate: 'CASCADE',
            onDelete: 'CASCADE'
          }
    },

    {
        //Maintain table name don't plurilize
        freezeTableName: true,

        // I don't want createdAt
        createdAt: false,

        // I don't want updatedAt
        updatedAt: false
    },
    {
        tableName: 'usuario', // Nombre de la tabla en la base de datos
        timestamps: false // Asume que no hay campos de timestamps en la tabla
      
    }
    
);
Usuarios.belongsTo(Personas, { foreignKey: 'id_persona' });
Personas.hasMany(Usuarios, { foreignKey: 'id_persona' });




module.exports = {
    Usuarios
}
