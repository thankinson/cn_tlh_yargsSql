const yargs = require("yargs");
const { sequelize } = require("./db/connection");
const { addMovie, listMovies, deleteMovie, updateMovie, addActor, listActor } = require("./movie/movieFunction");
const Movie = require("./movie/movieTable");

const app = async (yargsObj) => {
    try {
        await sequelize.sync({alter: true});
        if (yargsObj.cast){ // add cast member
           console.log(JSON.stringify(await addActor(yargsObj.actor), null, 2));
        } 
        else if (yargsObj.listCast){ // read database
            if (yargsObj.key){ // yargs.key is --key"actor" and yargsObj.value is --value"<actor name>"
                console.log(JSON.stringify(await listActor({[yargsObj.key]: yargsObj.value}), null, 2));
            } else {
                console.log(JSON.stringify(await listActor(), null, 2));
            }
        } 
        else if (yargsObj.add){ // add movie to db and link to cast memebr (cast member must be added first)
            await addMovie({title: yargsObj.title, actor: yargsObj.actor});
            console.log(JSON.stringify(await listMovies(), null, 2));
        } 
        else if (yargsObj.list){ // read database
            if (yargsObj.key){ // yargs.key is --key"actor" and yargsObj.value is --value"<actor name>"
                console.log(JSON.stringify(await listMovies({[yargsObj.key]: yargsObj.value}), null, 2));
            } else {
                console.log(JSON.stringify(await listMovies(), null, 2));
            }
        } 
        else if (yargsObj.updateDb){ // updates database 
            console.log("yargsPbj.update hit")
            await updateMovie(yargsObj.param, yargsObj.filterObj, yargsObj.update);
        } 
        else if (yargsObj.remove) { // removes movie from db
            console.log(await deleteMovie({title: yargsObj.title}), null, 2);
        } 
        else if (yargsObj.removeActor) { // removes movie from db
            console.log(await deleteActor({actor: yargsObj.title}), null, 2);
        } 
        else {
            console.log("incorrect command");
        }
        await sequelize.close();
    } catch (error) {
        console.log(error);
    }
};

app(yargs.argv);