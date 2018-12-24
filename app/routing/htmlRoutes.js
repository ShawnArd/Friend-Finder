//dependencies
var path = require("path");

// A GET Route to /survey which should display the survey page.
router.get("/survey", function (req, res) {
    res.sendFile(path.join(__dirname, "../public/survey.html"));
});

// A default, catch-all route that leads to home.html which displays the home page.
router.get("*", function (req, res) {
    res.sendFile(path.join(__dirname, "../public/home.html"));
});
