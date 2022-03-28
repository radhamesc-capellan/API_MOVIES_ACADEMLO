const { DataTypes } = require('sequelize');
const { sequelize } = require('../utils/database');

const Actor = sequelize.define('actors', {
  id: {
    primaryKey: true,
    autoIncrement: true,
    type: DataTypes.INTEGER,
    allowNull: false
  },
  name: {
    type: DataTypes.STRING(100),
    allowNull: false
  },
  age: {
    type: DataTypes.STRING(5),
    allowNull: false
  },
  gender: {
    type: DataTypes.STRING(10),
    allowNull: false
  },
  country: {
    type: DataTypes.STRING(20),
    allowNull: false
  },
  adwars: {
    type: DataTypes.STRING(100),
    allowNull: false
  },
  rating: {
    type: DataTypes.INTEGER,
    allowNull: false,
    defaultValue: 1
  },
  profilePic: {
    type: DataTypes.STRING(255),
    allowNull: true
  },
  status: {
    type: DataTypes.STRING(10),
    allowNull: false,
    defaultValue: 'active'
  }
});

module.exports = { Actor };
