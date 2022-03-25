const server = require("./src/app.js");
const { conn } = require("./src/db.js");

const PORT = process.env.PORT || 8080;

// Syncing all the models at once.
conn.sync({ force: false }).then(() => {
  server.listen(PORT, async () => {
    console.log(`%s listening at ${PORT}`);
  });
});
