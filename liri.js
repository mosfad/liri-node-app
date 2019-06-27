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
        //If user requested a song, then use spotify to get info.
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


})

