const yargs = require("yargs");
const { sequelize } = require("./db/connection");
const { addMovie, listMovies, deleteMovie, updateMovie, addActor } = require("./movie/movieFunction");
const Movie = require("./movie/movieTable");

const app = async (yargsObj) => {
    try {
        await sequelize.sync({alter: true});
        if (yargsObj.cast){
           console.log(JSON.stringify(await addActor(yargsObj.actor), null, 2));
        } else if (yargsObj.add){ // adds to database
            await addMovie({title: yargsObj.title, actor: yargsObj.actor});
            console.log(JSON.stringify(await listMovies(), null, 2));
        } else if (yargsObj.list){ // read database
            if (yargs.key){
                console.log(JSON.stringify(await listMovies({[yargs.key]: yargsObj.value}), null, 2));
            } else {
                console.log(JSON.stringify(await listMovies(), null, 2));
            }
        } else if (yargsObj.updateDb){
            console.log("yargsPbj.update hit")
            await updateMovie(yargsObj.param, yargsObj.filterObj, yargsObj.update);
        } else if (yargsObj.remove) { // removes movie from db
            console.log(await deleteMovie({title: yargsObj.title}), null, 2);
        } else {
            console.log("incorrect command");
        }
        await sequelize.close();
    } catch (error) {
        console.log(error);
    }
};

app(yargs.argv);