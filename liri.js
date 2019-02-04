// Includes the FS package for reading and writing packages
var fs = require("fs");
// Running the readFile module that's inside of fs.
// Stores the read information into the variable "data"
fs.readFile("random.txt", "utf8", function (err, data) {
    if (err) {
        return console.log(err);
    }
});

    require("dotenv").config();

    var axios = require("axios");

    var Spotify = require('node-spotify-api');

    var keys = require("./keys.js");

    var inquirer = require("inquirer");





    var spotify = new Spotify(keys.spotify);



    let userSong = process.argv[2];
    spotify.search({ type: 'track', query: userSong }, function (err, data) {
        if (err) {
            return console.log('Error occurred: ' + err);
        }

        console.log(data);
    });



     //OMDB 
     let userMovie = process.argv[2]; 
     axios.get("http://www.omdbapi.com/?t="+userMovie+"&y=&plot=short&apikey=trilogy").then(
        function (response) {
            // Then we print out the imdbRating
            console.log(data);
        }
    );


       



