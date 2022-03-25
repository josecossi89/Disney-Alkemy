const express = require("express");
const { Character, Movie, CharactersMovies } = require("../db");
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
  const { photo, title, date, ratting } = req.body;
  try {
    const [movieOrSerie] = await Movie.findOrCreate({
      where: {
        photo,
        title,
        date,
        ratting,
      },
    });
    // await movieOrSerie.addCharacters(characterId);
    res
      .status(200)
      .json({ message: "Ok, created successfull", data: movieOrSerie });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "This is one big problem" });
  }
});
router.post("/:id/add-character/:characterId", async (req, res) => {
  try {
    const { characterId, id } = req.params;
    const movie = await Movie.findOne({
      where: {
        id,
      },
    });
    if (!movie) {
      return res.status(404).json({ message: "This movie does not exist." });
    }
    const character = await Character.findOne({
      where: {
        id: characterId,
      },
    });
    if (!character) {
      return res
        .status(404)
        .json({ message: "This character does not exist." });
    }

    const characterMovie = await CharactersMovies.findOne({
      where: {
        characterId: characterId,
        movieId: id,
      },
    });
    if (characterMovie) {
      return res
        .status(200)
        .json({ message: "This character already exist for this movie." });
    }
    await movie.addCharacters(characterId);

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
