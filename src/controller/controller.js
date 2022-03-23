// var axios = require("axios").default;
const { Character, Movie, Gender } = require("../db.js");

const getCharactersDb = async () => {
  let characters = await Character.findAll({
    include: {
      model: Movie,
      attributes: ["name"],
      through: {
        attributes: [],
      },
    },
  });
  // console.log(restaurants);
  return characters;
};

module.exports = {
  getCharactersDb,
};
