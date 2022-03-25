const { DataTypes } = require("sequelize");
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define("characters_movies", {
    characterId: {
      allowNull: false,
      primaryKey: true,
      type: DataTypes.INTEGER,
    },
    movieId: {
      allowNull: false,
      primaryKey: true,
      type: DataTypes.INTEGER,
    },
  });
};
