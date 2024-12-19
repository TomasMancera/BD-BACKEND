const { DataTypes } = require('sequelize');
const { bdmysql } = require('../database/MariaDbConnection');

const Personas = bdmysql.define('persona',
    {
        // Model attributes are defined here
        'id_persona': {
            type: DataTypes.INTEGER,
            //allowNull: false,
            primaryKey: true
        },

        'nombres': {
            type: DataTypes.STRING,
            allowNull: false
            // allowNull defaults to true
        },
        'apellidos': {
            type: DataTypes.STRING,
            allowNull: false
            // allowNull defaults to true
        },
        'fecha_nacimiento': {
            type: DataTypes.DATE
            // allowNull defaults to true
        },
    },

    {
        //Maintain table name don't plurilize
        freezeTableName: true,

        // I don't want createdAt
        createdAt: false,

        // I don't want updatedAt
        updatedAt: false
    }
);

//Generado por ChatGPT
const Personas1 = bdmysql.define('Persona', {
  id_persona: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    field: 'id_persona'
  },
  nombres: {
    type: DataTypes.STRING,
    allowNull: false
  },
  apellidos: {
    type: DataTypes.STRING,
    allowNull: false
  },
  fecha_nacimiento: {
    type: DataTypes.STRING,
    allowNull: false,
    field: 'fecha_nacimiento'
  }
}, {
  tableName: 'persona', // Nombre de la tabla en la base de datos
  timestamps: false // Asume que no hay campos de timestamps en la tabla
});


module.exports = {
    Personas,
    Personas1
}
