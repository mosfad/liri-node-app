console.log('this is loaded');

exports.spotify = {
  id: process.env.SPOTIFY_ID,
  secret: process.env.SPOTIFY_SECRET
};

//do I also need to export keys for bandsInTown and OMDB, add them to .env file and require them in liri.js?