const { DataTypes } = require('sequelize');
const { bdmysql } = require('../database/MariaDbConnection');
const Ciudad = bdmysql.define('ciudad',
    {
        // Model attributes are defined here
        'id_ciudad': {
            type: DataTypes.INTEGER,
            //allowNull: false,
            primaryKey: true
        },

        'nombre': {
            type: DataTypes.STRING,
            allowNull: false
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
)




module.exports = {
    Ciudad
}
