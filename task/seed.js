const dbConnection = require("../config/mongoConnection");
const data = require("../data/");
const users = data.user;
const movies = data.movies;

const main = async () => {
  const db = await dbConnection();
  await db.dropDatabase();

  const username1 = await users.addUser("Jasper", "Daniel", "JackD", "Password", "Jack_Daniel@gmail.com");
  const id = username1._id;

  const firstPost = await movies.addMovie(
    "John Wick : Chapter 3 - Parabellum"
  );

  console.log("Done seeding database");
  await db.serverConfig.close();
};

main().catch(console.log);
