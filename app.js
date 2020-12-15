const express = require("express");
const app = express();
const session = require("express-session");
const configRoutes = require("./routes");
const path = require("path");
const static = express.static(__dirname + "/public");
const cookieParser = require("cookie-parser");

const exphbs = require("express-handlebars");

app.use("/public", static); // when static use /public directory
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use(express.static("./public/images"));

app.engine("handlebars", exphbs({ defaultLayout: "main" })); // master page
app.set("view engine", "handlebars");

configRoutes(app);

app.listen(3000, () => {
  console.log("We've now got a server! Woo");
  console.log("Your routes will be running on http://localhost:3000");
});
