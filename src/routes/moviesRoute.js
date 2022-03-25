const express = require("express");
const { Character, Movie, Gender } = require("../db");
const router = express.Router();

//Get all movies or Series
router.get("/", async (req, res) => {
  try {
    const movieOrSerie = await Movie.findAll({
      attributes: ["photo", "title", "date"],
    });
    res.status(200).json(movieOrSerie);
    console.log(movieOrSerie);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "This is one big problem" });
  }
});

//Create new Movie or Serie
router.post("/", async (req, res) => {
  const { photo, title, date, ratting, character } = req.body;
  try {
    const [movieOrSerie] = await Movie.findOrCreate({
      where: {
        photo,
        title,
        date,
        ratting,
      },
    });
    await movieOrSerie.addCharacters(character);
    res.status(200).json("Character created successfully");
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "This is one big problem" });
  }
});
module.exports = router;
