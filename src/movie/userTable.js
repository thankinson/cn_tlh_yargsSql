const { DataTypes, DATE } = require("sequelize");
const { sequelize } = require("../db/connection");

const User = sequelize.define("Users", {
    user_name: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    updated_on: {
        type: 
    } 

})