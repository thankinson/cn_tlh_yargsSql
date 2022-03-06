const {Movie, Cast } = require("./movieTable")
const { Sequelize } = require("sequelize")
// Movie.belongsTo(Cast)

exports.addActor = async (filterObj) => {
    console.log("!!!!!!!!!!!!!!!!!", filterObj)
    try {
      return await Cast.create({actor: filterObj});    
    } catch (error) {
        console.log(error)
    }
};

exports.addMovie = async (movieObj)=>{
    try {
        // await Cast.create({actor: movieObj.actor});
        const actor = await Cast.findOne({where: {actor: movieObj.actor}})
        await Movie.create({title: movieObj.title, actor_id: actor.id});
    } catch (error) {
        console.log(error);
    }
};

exports.listMovies= async (filterObj) =>{
    try {
        console.log("hit list")
        if (filterObj){
            return await Movie.findOne({where: filterObj});
        } else {
            return await Movie.findAll();                 
        }
    } catch (error) {
        console.log(error)
    }
};

exports.updateMovie = async (param, filterObj, update) =>{
    try {
        if (param === "title"){
        await Movie.update({title: update}, {where: {title: filterObj}})
        } else if (param === "actor") {
            console.log("actor hit")
            const test =  await Movie.update({actor: update}, {where: {actor: filterObj}})
            console.log(test)
        }
    } catch (error) {
        console.log(error)
    }
};

exports.deleteMovie = async (filterObj) =>{
    try {
        await Movie.destroy({where: filterObj})
    } catch (error) {
        console.log(error)
    }
};