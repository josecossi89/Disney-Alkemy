const express = require("express");
//const { getCharactersDb } = require("../controller/controller.js");
const { Character, Movie, Gender } = require("../db.js");

const router = express.Router();

//Get all characters
router.get("/", async (req, res) => {
  try {
    const characters = await Character.findAll({
      attributes: ["photo", "name"],
    });
    res.status(200).json(characters);
    console.log(characters);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "This is one big problem" });
  }
});

//Create new character
router.post("/", async (req, res) => {
  const { photo, name, age, weight, history } = req.body;
  try {
    const [character] = await Character.findOrCreate({
      where: {
        photo,
        name,
        age,
        weight,
        history,
      },
    });
    // await character.addMovies(movieId);
    res
      .status(200)
      .json({ message: "Character created successfully", data: character });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "This is one big problem" });
  }
});

router.post("/:id/add-movie/:movieId", async (req, res) => {
  try {
    const { movieId, id } = req.params;
    const character = await Character.findOne({
      where: {
        id,
      },
    });
    if (!character) {
      return res
        .status(404)
        .json({ message: "This character does not exist." });
    }
    await character.addMovies(movieId);

    // const [movie] = await characters_movies.findOrCreate({
    //   where: {
    //     movieId,
    //     id,
    //   },
    // });
    return res.send("todo fino");
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "This is one big problem" });
  }
});
module.exports = router;
