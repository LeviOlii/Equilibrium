const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const Testimony = sequelize.define("Testimony", {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    role: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    testimony: {
        type: DataTypes.TEXT,
        allowNull: false,
    },
});

module.exports = Testimony;
