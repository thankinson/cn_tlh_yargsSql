const { DataTypes, Sequelize } = require("sequelize");
const { sequelize } = require("../db/connection");

const Movie = sequelize.define("Movie", {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    title: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    actor_id:{
        type: DataTypes.INTEGER,
        allowNull: true,
        references:{
            model: 'Casts',
            key: 'id'
        }
    }
});


const Cast = sequelize.define("Cast", {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    actor: {
        type: DataTypes.STRING,
        allowNull: false,
    },
});



// Movie.belongsTo(Cast);

// Cast.belongsTo(Movie, { foreignKey: {
//     name: 'actorid',
//     type: DataTypes.INTEGER,
   
  
// }});

// Movie.belongsTo(Cast, {foreignKey: 'actorId'});
// Movie.belongsTo(Cast);

module.exports = { Movie, Cast };