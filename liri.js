// Load the fs package to read and write
var fs = require("fs");


//requirements and variables 

require("dotenv").config();

var moment = require("moment"); 

var axios = require("axios");

var Spotify = require("node-spotify-api");

var keys = require("./keys.js");


var timeFormat = moment().format("ddd, MM/DD/YYYY");


//vars for taking in commands 
let command = process.argv[2];
let userSong = process.argv[3];
let userMovie = process.argv.slice(3).join(" ");
let userConcert = process.argv.slice(3).join(" ");


spotifySearch = ()=>{
    var spotify = new Spotify(keys.spotify);
    spotify.search({ type: 'track', query: userSong }, function (err, data) {
        if (err) {
            return console.log('Error occurred: ' + err);
        }
        //for (let i = 0; i < data.tracks.items.length; i++) {
            console.log("Artist: " + data.tracks.items[0].artists[0].name)
            console.log("Track: " + data.tracks.items[0].name); 
            console.log("Preview URL: " + data.tracks.items[0].preview_url);
            console.log("Album: "+ data.tracks.items[0].album.name);
            
           
        //}
           
    });
}

//movie search function
movieSearch = () => {
    axios.get("http://www.omdbapi.com/?t=" + userMovie + "&y=&plot=short&apikey=trilogy").then(
        function (response) {

            console.log("Title: " + response.data.Title);
            console.log("Year Released: " + response.data.Year);
            console.log("IMDB Rating: " + response.data.imdbRating);
            console.log("Country Produced: " + response.data.Country);
            console.log("Language: " + response.data.Language);
            console.log("Plot: " + response.data.Plot);
            console.log("Actors: " + response.data.Actors);

        }

    );
}
//concert search function
concertSearch = () => {

    axios.get("https://rest.bandsintown.com/artists/" + userConcert + "/events?app_id=codingbootcamp").then(
        function (response) {
            //loop through response to get ALL upcoming concert info from bandisintown
            for (let i = 0; i < response.data.length; i++) {
                console.log("Venue: "+response.data[i].venue.name);
                console.log("City: "+ response.data[i].venue.city);
               // var convertedDate = moment(response.data.datetime, timeFormats); 
                console.log("Date: " + response.data[i].datetime);
                //console.log("Date: "+ convertedDate);           
            }
            
        }

    );

}


//switch case for determing the proper API to call 

switch (command) {
    //Spotify
    case 'spotify-this-song':
        spotifySearch(); 
        break;

    //OMDB 
    case 'movie-this':
        movieSearch(userMovie);
        //if user enters no title, it will default to "Mr. Nobody"
        if (userMovie === "") {
            axios.get("http://www.omdbapi.com/?t=Mr.Nobody&y=&plot=short&apikey=trilogy").then(
                function (response) {

                    console.log(response.data);


                }

            );
        }

        break;

        
    //Band is in town
    case 'concert-this':
        concertSearch(userConcert);
        break;
        
    case 'do-what-it-says':
        fs.readFile("random.txt", "utf8", function(err, data) {
            console.log(data);
            if (err) {
            return console.log(err);
            }});
       
        break;     
        
        
    }    





