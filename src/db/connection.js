require("dotenv").config();
const { Sequelize } = require("sequelize");

exports.sequelize = new Sequelize(process.env.MYSQL_URI);

// const connection = async () => {
//     try {
//         await mongoose.connect(process.env.MYSQL_URI);
//         console.log("connected sucess")
//     } catch (error) {
//         console.log(error);
//     }
// };

// connection();