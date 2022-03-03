const Movie = require("./movieTable")

exports.addMovie = async (movieObj)=>{
    try {
        await Movie.create(movieObj);
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



// module.exports = {
//  look into this
// };