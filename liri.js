require("dotenv").config();

var fs = require("fs"); 
var Twitter = require("twitter");
var keys = require("./keys.js");
// var spotify = new Spotify(keys.spotify);

var command = process.argv[2]

if(command === "my-tweets"){
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

function tweet (){
    var client = new Twitter(keys.twitter);

    var params = {screen_name:'n_kelby' , count: 10};

    client.get('statuses/user_timeline', params, function(error, tweets, response) {
        if (!error) {
          console.log(tweets);

          for (var i = 0; i < tweets.statuses.length; i++) {
            var tweetText = tweets.statuses[i].text;
            console.log("Text of Tweet: " + tweetText);
            var tweetCreationDate = tweets.statuses[i].created_at;
            console.log("Creation Date of tweet: " + tweetCreationDate);
        }
    } else {
        console.log(error);
        }
      });
}


