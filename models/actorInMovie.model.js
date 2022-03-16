const { DataTypes } = require('sequelize');
const { sequelize } = require('../utils/database');

const ActorInMovie = sequelize.define ( 'actorsInMovies', {
    id: {
        primaryKey: true,
        autoIncrement: true,
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    actorId: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    movieId: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
});

module.exports = { ActorInMovie };
