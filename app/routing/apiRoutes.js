//posting to friends api, but having trouble pulling up image
//set up dependencies and mysql
var mysql = require("mysql");
var express = require("express");
var router = express.Router();

//connect to MySQL
var connection;
if (process.env.JAWSDB_URL) {
    connection = mysql.createConnection(process.env.JAWSDB_URL);
} else {
    connection = mysql.createConnection({
        host: "localhost",
        port: 3307,
        user: "root",
        password: "root",
        database: "friends_db"
    });
}

connection.connect(function (err) {
    if (err) {
        console.error("error connecting: " + err.stack);
        return;
    }

    console.log("connected as id " + connection.threadId);
});

router.get("/api/friends", function (req, res) {

    connection.query("SELECT * FROM characters", function (err, results) {
        res.json(results);
    })
});

router.post("/api/friends", function (req, res) {

    //converts score to be added into a stringified array in the database
    var value = "";
    for (let i = 0; i < req.body.scores.length; i++) {
        value += req.body.scores[i] + ",";
    }
    score= "["+ value.slice(0,-1) + "]"

    //inserts the object into the SET (the ? is a place holder value)
    connection.query("INSERT INTO characters SET ?",
        {
            name: req.body.name,
            photo: req.body.photo,
            scores: score
        },
        function (err, results) {
            if (err) throw err;
            console.log("New Character added!");
        }
    );

    //connects to dataabase and Selects all the current and premade characters
    connection.query(
        "SELECT * FROM characters",
        function (err, results) {
            if (err) throw err;

            let data = JSON.stringify(results);
            characters = JSON.parse(data);
           

            let currentChar = characters[characters.length - 1];
            let minDiff = 40;
            let charIndex;
            
            //iterates over characters and grabs closest one to your compared score
            for (let i = 0; i < characters.length - 1; i++) {
                let diff = compare(currentChar, characters[i]);
                if (diff < minDiff) {
                    minDifference = diff;
                    charIndex = i;
                }
            }
            results.characters[charIndex];
        });
});

//sets up difference used to calculate which character your scores are closest to.
function compare(user, char) {
    userScores = JSON.parse(user.scores);
    charScores = JSON.parse(char.scores);
    var totalDiff = 0;
    for (let i = 0; i < userScores.length; i++) {
        totalDiff += Math.abs(userScores[i] - charScores[i]);
    }
    return totalDiff;
}

module.exports = router;