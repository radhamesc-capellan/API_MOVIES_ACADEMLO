const { DataTypes } = require('sequelize');
const { sequelize } = require('../utils/database');

const Review = sequelize.define ( 'reviews', {
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
    comment: {
        type: DataTypes.STRING(255),
        allowNull: false,
    },
    rating: {
        type:DataTypes.STRING(100),
        allowNull:false,
    },
    userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    movieId: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    status: {
        type: DataTypes.STRING(10),
        allowNull: false,
    }
});

module.exports = { Review };