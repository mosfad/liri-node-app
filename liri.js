//require and config dotenv package
require("dotenv").config();
var keys = require("./keys.js");
var Spotify = require("node-spotify-api");
var axios = require("axios")
var moment = require("moment");
var inquirer = require("inquirer");



var spotify = new Spotify(keys.spotify);


//key id should be spotify.id(see keys.js)
//key secret should be spotify.secret(also see keys.js)
//Get key from Bandsintown to create queryURL
//----------------------var bandsInTown = new BandsInTown(keys.bandsInTown);
//Get key from OMDb to create queryURL
//----------------------var omdb = new Omdb(keys.omdb);
// console.log(keys.bandsInTown.secret);
// axios.get("https://rest.bandsintown.com/artists/" + artist + "/events?app_id=" + keys.bandsInTown.secret)

function queryTerm(userInput) {
    //Look for index of first space
    var indFirstSpace = userInput.indexOf(" ");
    return userInput.substring(indFirstSpace + 1);
}

inquirer.prompt([
    {
        type: "input",
        name: "searchRequest",
        message: "Please enter appropriate request for your search preference "
    }
    
]).then(function(user) {
    if (user.searchRequest.includes("spotify-this-song")) {
        //If user requested a song, then use spotify API to get song info.
        spotify.search({ type: 'track', query: queryTerm(user.searchRequest) })
        .then(function(response) {
            var data = response.tracks.items[0];
            //console.log(data.artists);
            console.log("Artist(s): " + data.artists[0].name);
            console.log("Song: " + data.name);
            console.log("Preview of song: " + data.preview_url);
            console.log("Song's album: " + data.album.name);


        })
        .catch(function(err) {
            console.log(err);
        });
    }
    else if (user.searchRequest.includes("movie-this")) {
        //if user requested a movie, then use OMDB API to get movie info
        axios.get("https://www.omdbapi.com/?t=" + queryTerm(user.searchRequest) + "&apikey=" + keys.omdb.secret)
        .then(function (response) {
            //handle success
            console.log(response.data);
            console.log("Movie Title: " + response.data.Title);
            console.log("Release Year: " + response.data.Year);
            console.log("IMDB Rating: " + response.data.imdbRating);
            console.log("Rotten Tomatoes Rating: " + response.data.Ratings[0].Source); //NEED TO FIGURE OUT HOW TO EXTRACT ROTTEN TOMATOES RATINGS!!!
            console.log("Country Produced: " + response.data.Country);
            console.log("Language: " + response.data.Language);
            console.log("Plot: " + response.data.Plot);
            console.log("Actors: " + response.data.Actors);
        }) 
        .catch(function (error) {
            //handle error
            console.log("error");
        })                                                                                                                                     
    }
    else if (user.searchRequest.includes("concert-this")) {
        //if user requested concert-this, then use Bandsintown API to get concert info
        axios.get("https://rest.bandsintown.com/artists/" + queryTerm(user.searchRequest) + "/events?app_id=" + keys.bandsInTown.secret)
        .then(function (response) {
            // handle success
            console.log(response);
            console.log("Name of Venue");
            console.log("Location of Venue: ");
            console.log("Date of Event(MM/DD/YYYY): ");   //use moment.js for this
        })
        .catch(function (error) {
            // handle error
            console.log(error);
        })
       
    }


})

//Desktop/UCRX/projects/liri-node-app