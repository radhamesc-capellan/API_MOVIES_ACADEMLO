const { DataTypes } = require('sequelize');
const { sequelize } = require('../utils/database');

const Movie  = sequelize.define ( 'movies', {
    id: {
        primaryKey: true,
        autoIncrement: true,
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    title: {
        type: DataTypes.STRING(100),
        allowNull: false,
    },
    description: {
        type: DataTypes.STRING(255),
        allowNull: false,
    },
    rating: {
        type: DataTypes.STRING(10),
        allowNull: false,
    },
    duration: {
        type: DataTypes.STRING(20),
        allowNull: false
    },
    filmPicUrl: {
        type: DataTypes.STRING(255),
        allowNull: true,
    },
    genere: {
        type: DataTypes.STRING(100),
        allowNull: false,
    },
    status: {
        type: DataTypes.STRING(10),
        allowNull: false,
    },
});

module.exports = { Movie };