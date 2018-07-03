require("dotenv").config();
var request = require("request");

var fs = require("fs");
var nodeArgs = process.argv;
var Spotify = require('node-spotify-api');
var Twitter = require("twitter");
var keys = require("./keys.js");
var command = process.argv[2]

if (command === "my-tweets") {
    tweet();
} else if (command === "spotify-this-song") {
    spotify();
} else if (command === "movie-this") {
    movie();
} else if (command === "do-what-it-says") {
    doFile();
} else {
    console.log("I'm sorry, I don't understand.");
}

function tweet() {
    var client = new Twitter(keys.twitter);
    var params = { screen_name: 'n_kelby', count: 10 };
    client.get('statuses/user_timeline', params, function (error, tweets) {
        if (!error) {
            for (var i = 0; i < tweets.length; i++) {
                console.log(tweets[i].created_at);
                console.log(tweets[i].text);

            }
        }
    });
}

function spotify() {
    var spotify = new Spotify(keys.spotify);
    var song = "";
    for (var i = 3; i < nodeArgs.length; i++) {
        song = song + " " + nodeArgs[i];
    }
    spotify.search({ type: 'track', query: song }, function (error, data) {
        if (!error) {
            for (var i = 0; i < data.tracks.items.length; i++) {
                var songData = data.tracks.items[i];

                console.log("Artist: " + songData.artists[0].name);
                console.log("Song: " + songData.name);
                console.log("Preview URL: " + songData.preview_url);
                console.log("Album: " + songData.album.name);


            }
        } else {
            console.log('Error occurred.');
        }
    });
}

function movie() {
    var movie = "";
    for (var i = 3; i < nodeArgs.length; i++) {
        movie = movie + " " + nodeArgs[i];
    }
    var omdbURL = "http://www.omdbapi.com/?t=" + movie + "=&plot=short&apikey=8931952e";
    request(omdbURL, function (error, response, body) {
        if (!error && response.statusCode == 200) {
            var body = JSON.parse(body);
            console.log("Title: " + body.Title);
            console.log("Release Year: " + body.Year);
            console.log("IMdB Rating: " + body.imdbRating);
            console.log("Country: " + body.Country);
            console.log("Language: " + body.Language);
            console.log("Plot: " + body.Plot);
            console.log("Actors: " + body.Actors);
        } else {
            console.log('Error occurred.')
        }
        if (movie === " ") {
            console.log("-----------------------");
            console.log("If you haven't watched 'Mr. Nobody,' then you should: http://www.imdb.com/title/tt0485947/");
            console.log("It's on Netflix!");
        }
    });
}

function doFile(){
    fs.readFile('random.txt', "utf8", function(error, data){
        console.log(data);
      var dataResult = data.split(',');
      console.log(dataResult);
      console.log(dataResult[1]);
      spotify(dataResult[1]);
    });
}
