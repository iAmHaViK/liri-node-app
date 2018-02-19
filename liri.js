var keys = require('./keys.js')
var Spotify = require('node-spotify-api');
var Twitter = require('twitter');
var request = require('request') 
var spotify = new Spotify(keys.spotify);

switch(process.argv[2]){
		case "my-tweets":
			getMyTweets();
			break;
		case "spotify-this-song":
			getMeSpotify(process.argv[3]);
			break;
		case "movie-this":
			getMovie(process.argv[3]);
			break;
		default:
		console.log("LIRI does not know that")
}

function getMyTweets(){
	var client = new Twitter(keys.twitter);
	var params = {screen_name: '@hassan00388953'};
	client.get('statuses/user_timeline', params, function(error, tweets, response) {
	  if (!error) {
	  	for(var i = 0; i < tweets.length; i++){
	  		console.log(tweets[i].created_at);
	  		console.log('  ');
	  		console.log(tweets[i].text)
	  	}
	  }
	});
}

function getMovie(movieName){
	request("http://www.omdbapi.com/?=" + movieName + "&y=&plot=short&r=json", function(error, response, body){
		if(!error && response.statusCode == 200){
			console.log(body)
		}
	})
}

function getMeSpotify(songName){
spotify.search({ type: 'track', query: songName, limit: 10 }, function(err, data) {
  if (err) {
    return console.log('Error occurred: ' + err);
  }
  	var songs = data.tracks.items;
  	for(var i=0; i < songs.length; i++){
  		console.log(i)
  		console.log('artist(s): ' + songs[i].artists.map)
  		console.log('song name: ' + songs[i].name)
  		console.log('preview song: ' + songs[i].preview_url);
  		console.log('album: ' + songs[i].album.name);
  		console.log('-----------------------------------')
  	}
});
}


// request('http://www.omdbapi.com/?t=matrix&y=plot=short&r=json', function (error, response, body) {
//   console.log('error:', error); // Print the error if one occurred
//   console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received
// });

// request('')

// var pick = function(caseData, functionData){
	
// 	}
// }

// var runThis = function(argOne, argTwo){
// 	pick(argOne, argTwo)
// }

// runThis(process.argv[2], process.argv[3])