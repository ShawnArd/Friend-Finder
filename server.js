// Dependencies
// =============================================================
const express = require("express");
const path = require("path");
var app = express();
app.use(express.static("public"))

// Sets up the Express App
// =============================================================

const PORT = process.env.PORT || 3000;

// Sets up the Express app to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(path.join(__dirname, './app/public')));

const apiRoute = app.use(require("./app/routing/apiRoutes"));
apiRoute;
const htmlRoute = app.use(require("./app/routing/htmlRoutes"));
htmlRoute;


app.listen(PORT, function() {
  console.log("App listening on PORT: " + PORT);
});


