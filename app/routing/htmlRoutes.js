// Dependencies
var path = require("path");

// Methods for export 
module.exports = function(app) {
 
   // Direct users to the "survey" HTML file
  app.get("/survey", function(req, res) {
    res.sendFile(path.join(__dirname, "../public/survey.html"));
  });

  //Default to the Home page
  app.get("/*", function(req, res) {
    res.sendFile(path.join(__dirname, "../public/home.html"));
  });
};