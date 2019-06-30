# liri-node-app
##LIRI will search for songs, concerts and movies
This node app allows users to search for movies, songs, and concerts. To a search, the user should enter one of the following commands: *spotify-this-song* for a song search; *movie-this* for a movie search; *concert-this* for concert search; *do-what-it-says* for all searches. Except for *do-what-it-says* command, the user should follow the command with one of the following search term: song title for a song; movie title for a movie; artist/s name for a concert. The *do-what-it-says* command uses a text file, which includes the three other commands and a search term to complete the user input. After the user inputs the command and search terms, then the app queries Spotify, Bandsintown, and OMDb APIs and returns some data relevant to the search term. 

This app is designed to help users quickly search for basic information about songs, movies or concerts. For example, I can search for concerts for my favorite band, or I can listen to the preview of a newly-released song, or I access the plot of a movie to decide whether I wnat to watch the movie. Please see the App running in the terminal to access the features for each search.

*Please note that the program uses a axios and Node-Spotify-API packages to send requests*. Note that the app uses default search terms for *spotify-this-song* and *movie-this*, if the user does not provide their search terms. Please see how the app runs in node below. 

### App Running in terminal
[consoleLogA.jpg]
[consoleLogB.jpg]

### Contact me about Liri Node App
[maafadina@gmail.com]


### Contributors 
Modupe Fadina
