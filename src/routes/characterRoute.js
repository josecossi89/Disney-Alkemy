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
  const { photo, name, age, weight, history, moviesSeries } = req.body;
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
    await character.addMovies(moviesSeries);
    res.status(200).json("Character created successfully");
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "This is one big problem" });
  }
});
module.exports = router;
