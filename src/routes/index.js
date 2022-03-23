const { Router } = require("express");
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
const characterRoute = require("./characterRoute.js");
const moviesRoute = require("./moviesRoute.js");

const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);
router.use("/characters", characterRoute);
router.use("/movies", moviesRoute);
module.exports = router;
