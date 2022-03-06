const {Movie, Cast } = require("./movieTable")
const { Sequelize } = require("sequelize")


        // database funtions.
        // run app:  node .\\src\\app.js --options="tasks"
        // Options:
        //     help menue: --helpMenue
        //     add actor: --cast --actor="<name here>"
        //     add movie: --add --title="<movie title>" --actor"<enter actor created in add actor>"
        //     list all cast: --listCast
        //     list actor: --list --key="actor" value="<actor name>"
        //     list all movies: --list
        //     list movie: --list --key="movie" value="<movie name>"
        //     update movie: --updateDb --param="title" --filterObj="<what your updating>" --update="<the update>"
        //     update movie: --updateDb --param="actor" --filterObj="<what your updating>" --update="<the update>"
        //     delete movie: --remove --title"<movie title>"


//  Create
exports.addActor = async (filterObj) => {
    console.log("!!!!!!!!!!!!!!!!!", filterObj)
    // Add actor to db first then run the add movie
    try {
      return await Cast.create({actor: filterObj});    
    } catch (error) {
        console.log(error)
    }
};

exports.addMovie = async (movieObj)=>{
    try {
        // this adds a movie to db and links it to actor through a FK
        const actor = await Cast.findOne({where: {actor: movieObj.actor}})
        await Movie.create({title: movieObj.title, actor_id: actor.id});
         
    } catch (error) {
        console.log(error);
    }
};

// read
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

exports.listActor = async (filterObj) => {
    try {
        if (filterObj){
            return await Cast.findOne({where: filterObj});
        } else {
            return await Cast.findAll();                 
        }

    } catch (error) {
        console.log(error);
    };
};

// Update
exports.updateMovie = async (param, filterObj, update) =>{
    try {
        if (param === "title"){
        await Movie.update({title: update}, {where: {title: filterObj}})
        } else if (param === "actor") {
            console.log("actor hit")
            const test =  await Cast.update({actor: update}, {where: {actor: filterObj}})
            console.log(test)
        }
    } catch (error) {
        console.log(error)
    }
};

// delete
exports.deleteMovie = async (filterObj) =>{
    try {
        await Movie.destroy({where: filterObj})
    } catch (error) {
        console.log(error)
    }
};

exports.deleteActor = async (filterObj) =>{
    try {
        await Cast.destroy({where: filterObj})
    } catch (error) {
        console.log(error)
    }
};