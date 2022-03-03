const { DataTypes } = require("sequelize");
const { sequelize } = require("../db/connection");


const Movie = sequelize.define("Movie", {
    title: {
        type: DataTypes.STRING,
        primaryKey: true,
        allowNull: false,
        unique: true
    },
    actor: {
        type: DataTypes.STRING,
        defaultValue: "Not Specified"
    }
});



module.exports = Movie;