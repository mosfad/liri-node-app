//require and config dotenv package
require("dotenv").config();
var keys = require("./keys.js");
var Spotify = require("node-spotify-api");
var axios = require("axios")
var moment = require("moment");
var inquirer = require("inquirer");


var spotify = new Spotify(keys.spotify);
var commandByUser = process.argv[2];
var searchParameter = "";

//function creates search parameter from process.argv elements for the API queries
function createSearchParameter(searchArgs) {
    for (var i = 3; i < searchArgs.length; i++) {
        searchParameter += searchArgs[i] + " ";
        //console.log("Inside for loop Search Parameter = " + searchParameter);
    }

    searchParameter = searchParameter.trim();
    //console.log("Outside for loop, Search Parameter = " + searchParameter);
}


//API keys should only be visible in my local environment.
//console.log("Bandsintown secret is: " + keys.bandsInTown.secret);



if (commandByUser === "spotify-this-song") {
    createSearchParameter(process.argv);
    console.log("My search parameter is: **" + searchParameter + "**");
    //If user requested a song, then use spotify API to get song info.
    spotify.search({ type: 'track', query: searchParameter})
    .then(function(response) {
        //console.log(response.tracks);
        var data = response.tracks.items[0];
        //console.log(data.artists);
        console.log("==================================================================================================================");
        console.log("Artist(s): " + data.artists[0].name);
        console.log("Song: " + data.name);
        console.log("Preview of song: " + data.preview_url);
        console.log("Song's album: " + data.album.name);
        console.log("==================================================================================================================");


    })
    .catch(function(err) {
        console.log(err);
    });
}
else if (commandByUser === "movie-this") {
    createSearchParameter(process.argv);
    //if user requested a movie, then use OMDB API to get movie info
    axios.get("https://www.omdbapi.com/?t=" + searchParameter + "&apikey=" + keys.omdb.secret)
    .then(function (response) {
        //handle success
        //console.log(response.data);
        console.log("==================================================================================================================");
        console.log("Movie Title: " + response.data.Title);
        console.log("Release Year: " + response.data.Year);
        console.log("IMDB Rating: " + response.data.imdbRating);
        console.log("Rotten Tomatoes Rating: " + response.data.Ratings[1].Value); //NEED TO FIGURE OUT HOW TO EXTRACT ROTTEN TOMATOES RATINGS!!!
        console.log("Country Produced: " + response.data.Country);
        console.log("Language: " + response.data.Language);
        console.log("Plot: " + response.data.Plot);
        console.log("Actors: " + response.data.Actors);
        console.log("==================================================================================================================");
    }) 
    .catch(function (error) {
        //handle error
        console.log("error");
    })                                                                                                                                     
}
else if (commandByUser === "concert-this") {
    createSearchParameter(process.argv);
    //if user requested concert-this, then use Bandsintown API to get concert info
    axios.get("https://rest.bandsintown.com/artists/" + searchParameter + "/events?app_id=" + keys.bandsInTown.secret)
    .then(function (response) {
        // handle success
        //console.log(response.data);
        console.log("==================================================================================================================");
        console.log("Name of Venue: " + response.data[0].venue.name);
        if (response.data[0].venue.region === "") {
            console.log("Location of Venue: " + response.data[0].venue.city + ", " +  response.data[0].venue.country );
        }
        else {
            console.log("Location of Venue: " + response.data[0].venue.city + ", " +  response.data[0].venue.region + ", " +  response.data[0].venue.country );
        }
        var convDate = moment(response.data[0].datetime, moment.ISO_8601);
        console.log("Date of Event(MM/DD/YYYY): " + convDate.format("MM/DD/YYYY"));   //use moment.js for this
        console.log("==================================================================================================================");
    })
    .catch(function (error) {
        // handle error
        console.log(error);
    })
   
}





//Desktop/UCRX/projects/liri-node-app