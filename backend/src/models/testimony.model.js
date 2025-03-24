const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");
const Usuario = require("./Usuario"); // Importa o modelo de usuários

const Testimony = sequelize.define("Testimony", {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    usuario_id: {  // Associa depoimento a um usuário
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: Usuario,
            key: "id",
        },
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

// Define a relação entre Testimony e Usuario
Testimony.belongsTo(Usuario, { foreignKey: "usuario_id" });

module.exports = Testimony;
