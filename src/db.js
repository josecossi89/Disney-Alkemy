require("dotenv").config();
const { Sequelize } = require("sequelize");
const fs = require("fs");
const path = require("path");
const { DB_USER, DB_PASSWORD, DB_HOST, DB_DATABASE, DB_PORT } = process.env;

//1. Modelo de conexion de sequelize (Doc Oficial- `Esta conexion sirve correctamente para trabajar de manera local)
// const sequelize = new Sequelize(
//   `postgres://${DB_USER}:${DB_PASSWORD}@${DB_HOST}/countries`,
//   {
//     logging: false, // set to console.log to see the raw SQL queries
//     native: false, // lets Sequelize know we can use pg-native for ~30% more speed
//   }
// );

//2. Modelo de conexion de sequelize (Doc Oficial- `Esta conexion sirve correctamente para trabajar de manera local, ademas de servir para hacer el deploy en Heroku)
let connectionUrl = `postgres://${process.env.DB_USER}:${process.env.DB_PASSWORD}@${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_DATABASE}`;
let data = {};
if (process.env.NODE_ENV === "production") {
  connectionUrl = process.env.DATABASE_URL;
  data = {
    dialectOptions: {
      ssl: {
        require: process.env.NODE_ENV === "production",
        rejectUnauthorized: false,
      },
    },
  };
} else {
  data = {
    logging: false, // set to console.log to see the raw SQL queries
    native: false, // lets Sequelize know we can use pg-native for ~30% more speed
  };
}

const sequelize = new Sequelize(connectionUrl, data);
const basename = path.basename(__filename);

const modelDefiners = [];

// Leemos todos los archivos de la carpeta Models, los requerimos y agregamos al arreglo modelDefiners
fs.readdirSync(path.join(__dirname, "/models"))
  .filter(
    (file) =>
      file.indexOf(".") !== 0 && file !== basename && file.slice(-3) === ".js"
  )
  .forEach((file) => {
    modelDefiners.push(require(path.join(__dirname, "/models", file)));
  });

// Injectamos la conexion (sequelize) a todos los modelos
modelDefiners.forEach((model) => model(sequelize));
// Capitalizamos los nombres de los modelos ie: product => Product
let entries = Object.entries(sequelize.models);
let capsEntries = entries.map((entry) => [
  entry[0][0].toUpperCase() + entry[0].slice(1),
  entry[1],
]);
sequelize.models = Object.fromEntries(capsEntries);

// En sequelize.models están todos los modelos importados como propiedades
// Para relacionarlos hacemos un destructuring
const { Character, Gender, Movie } = sequelize.models;

// Aca vendrian las relaciones
// Product.hasMany(Reviews);
Character.belongsToMany(Movie, { through: "characters_movies" }); //tableIntermedie:"characters_movies"
Movie.belongsToMany(Character, { through: "characters_movies" }); //tableIntermedie:"characters_movies"
Movie.belongsToMany(Gender, { through: "movies_genders" }); //tableIntermedie:"movies_genders"
Gender.belongsToMany(Movie, { through: "movies_genders" });
//tableIntermedie:"movies_genders"
module.exports = {
  ...sequelize.models, // para poder importar los modelos así: const { Product, User } = require('./db.js');
  conn: sequelize, // para importart la conexión { conn } = require('./db.js');
};
