// Dependencies
// =============================================================
var express = require("express");
var path = require("path");

// Sets up the Express App
// =============================================================
var app = express();
var PORT = process.env.PORT || 3000;

// Sets up the Express app to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(path.join(__dirname, './app/public')));

var apiRoute = app.use(require("./app/routing/apiRoutes"));
apiRoute;
var htmlRoute = app.use(require("./app/routing/htmlRoutes"));
htmlRoute;


app.listen(PORT, function() {
  console.log("App listening on PORT: " + PORT);
});


