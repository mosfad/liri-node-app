//require and config dotenv package
require("dotenv").config();
var keys = require("./keys.js");
var Spotify = require("node-spotify-api");
var axios = require("axios")
var moment = require("moment");
var inquirer = require("inquirer");
var fs = require("fs");


var spotify = new Spotify(keys.spotify);
var commandByUser = process.argv[2];
var searchParameter = "";
var queryArray = [];

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

function readText() {
    fs.readFile("random.txt", "utf8", function(error, data) {

        // If the code experiences any errors it will log the error to the console.
        if (error) {
          return console.log(error);
        }
      
        // We will then print the contents of data
        console.log(data);
        // Then split it by commas (to make it more readable)
        var dataArr = data.split(",");
      
        // We will then re-display the content as an array for later use.
        //console.log(dataArr);
        //console.log(dataArr[1].trim());
        searchParameter = dataArr[1].trim();
        searchParameter = searchParameter.substring(1, searchParameter.length - 1);
        //console.log("The length of the search parameter is " + searchParameter.length);
        commandByUser = dataArr[0];
        console.log(searchParameter);
        console.log(commandByUser);
        //dataArr[0] = commandByUser;
        //dataArr[1] = searchParameter;
        allSearches();
      });
}

var allSearches = function () {
    if (commandByUser === "spotify-this-song") {
        if (searchParameter === "") {
            //build search parameters from user input. Note that user may or may not enter a song name.
            createSearchParameter(process.argv);
        }
        //if user doesn't enter a song, use The Sign by Aces of Base.
        if (searchParameter === "") {
            searchParameter = "The Sign";
        }
        //If user requested a song, then use spotify API to get song info.
        spotify.search({ type: 'track', query: searchParameter})
        .then(function(response) {
            var targetItem;
            //loop to pick the correct song from the options
            for (var i = 0; i < response.tracks.items.length; i++) {
                //SET THE VALUE OF TEST VARIABLES TO LOWERCASE TO FACILITATE TEST CONDITIONS.
                if (searchParameter.toLowerCase() === response.tracks.items[i].name.toLowerCase()) { 
                    targetItem = response.tracks.items[i];
                    break;           
                }
            }
            var showString = "Artist(s): " + targetItem.artists[0].name + "\n" + "Song: " + targetItem.name + "\n" + "Preview of song: " + targetItem.preview_url + "\n"
            + "Song's album: " + targetItem.album.name;
            //append and store output in log.txt
            fs.appendFile('log.txt', showString, function (err) {
                if (err) throw err;
                console.log('Saved!');
            });
            //log to the terminal.
            console.log(showString);
        })
        .catch(function(err) {
            console.log(err);
        });
    }
    else if (commandByUser === "movie-this") {
        createSearchParameter(process.argv);
        //if user doesn't enter a movie, use Mr. Nobody
        if (searchParameter === "") {
            searchParameter = "Mr. Nobody";
        }
        //if user requested a movie, then use OMDB API to get movie info
        axios.get("https://www.omdbapi.com/?t=" + searchParameter + "&apikey=" + keys.omdb.secret)
        .then(function (response) {
            //handle success
            var showString = "Movie Title: " + response.data.Title + "\n" + "Release Year: " + response.data.Year + "\n" + "IMDB Rating: " + response.data.imdbRating + "\n"
            + "Rotten Tomatoes Rating: " + response.data.Ratings[1].Value + "\n" + "Country Produced: " + response.data.Country + "\n" + "Language: " + response.data.Language 
            + "\n" + "Plot: " + response.data.Plot + "\n" + "Actors: " + response.data.Actors; 
            //append and store output in log.txt
            fs.appendFile('log.txt', showString, function (err) {
                if (err) throw err;
                console.log('Saved!');
            });
            //log to the terminal.
            console.log(showString);
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
            var showString = "Name of Venue: " + response.data[0].venue.name + "\n" ;
            //console.log("Name of Venue: " + response.data[0].venue.name);
            if (response.data[0].venue.region === "") {           
                showString += "Location of Venue: " + response.data[0].venue.city + ", " +  response.data[0].venue.country + "\n";
            }
            else {
                showString += "Location of Venue: " + response.data[0].venue.city + ", " +  response.data[0].venue.region + ", " +  response.data[0].venue.country + "\n";
            }
            var convDate = moment(response.data[0].datetime, moment.ISO_8601);
            showString += "Date of Event(MM/DD/YYYY): " + convDate.format("MM/DD/YYYY");
            //append and store output in log.txt
            fs.appendFile('log.txt', showString, function (err) {
                if (err) throw err;
                console.log('Saved!');
            });
            //log to the terminal.
            console.log(showString);
        })
        .catch(function (error) {
            // handle error
            console.log(error);
        })
   
    }
}

//call program if to perform searches
if (commandByUser === "do-what-it-says") {
    readText();
}
else {
    allSearches();
}



//Desktop/UCRX/projects/liri-node-app