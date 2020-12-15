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

// helper for handlebar if criteria
var hbs = exphbs.create({});

hbs.handlebars.registerHelper("ifCond", function (v1, v2, options) {
    if (v1 == v2)
      return options.fn(this);

  return options.inverse(this);
});

configRoutes(app);

app.listen(3000, () => {
  console.log("We've now got a server! Woo");
  console.log("Your routes will be running on http://localhost:3000");
});
