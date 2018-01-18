require('dotenv').config();


var fs = require('fs');
var Twitter = require('twitter');
var spotify = require('node-spotify-api');
var request = require('request');
var Argv = process.argv;
var command = process.argv[2];
var valueEntered = process.argv[3];

// load user twitter
var keys = require('./keys.js');
var client = new Twitter(keys.twitter);



var myTweets = 'my-tweets';
var songs = 'spotify-this-song';
var movies = 'movie-this';
var doWhat = 'do-what-it-says';

switch (command){
  case "my-tweets":
  getTweets();
  break;

  case "spotify-this-song":
  if(valueEntered){
    spotifyThis(valueEntered);
  } else {
    spotifySong("The Sign")
  }
  break;

  case "movie-this":
  if(valueEntered){
    getMovie(valueEntered);
  } else {
    getMovie("Mr. Nobody")
  }
  break;

  case "do-what-it-says":
  dooWhat();
  break;

  default:
  console.log("Please enter only: my-tweets, spotify-this-song, movie-this, do-what-it-says");
  break;
  }


// running function to display the last 20 tweets
function getTweets(){

  var params = {screen_name: 'hassan00388953'};
  client.get('statuses/user_timeline', params, function(error, tweets, response){
    if(!error){
      for(var i = 0; i<tweets.length; i++){
        var date = tweets[i].created_at;
        console.log("@hassan00388953: " + tweets[i].text + " Created: " + date.substring(0, 19));
        console.log("-----------------------");
      }
    }else{
      console.log('Error occurred');
    }
  });
}

function getMovie(movie){
  var omdbURL = 'http://www.omdbapi.com/?t=' + movie + '&y=&plot=short&apikey=18f14c81'
  

  request(omdbURL, function (error, response, body){
    if(!error && response.statusCode == 200){
      var body = JSON.parse(body);

      console.log("Title: " + body.Title);
      console.log("Release Year: " + body.Year);
      console.log("IMdB Rating: " + body.imdbRating);
      console.log("Rotten Tomatoes Rating: " + body.Metascore);
      console.log("Country: " + body.Country);
      console.log("Language: " + body.Language);
      console.log("Plot: " + body.Plot);
      console.log("Actors: " + body.Actors);

    } else {
      console.log('Error occurred.')
    }
    if(movie === "Mr. Nobody"){
      console.log("-----------------------");
      console.log("If you haven't watched 'Mr. Nobody,' then you should: http://www.imdb.com/title/tt0485947/");
      console.log("It's on Netflix!");
      }
    });
}

function spotifyThis(song){
	spotify.search({ type: 'track', query: song }, function(err, data) {
	  if (err) {
	    return console.log('Error occurred: ' + err)
	  }
	  // console.log(data.tracks.items[0])
	  for (var i = 0; i < data.tracks.items.length; i++) {
	  console.log('Artist(s): '+data.tracks.items[i].artists[0].name)
	  console.log('Song Name: '+data.tracks.items[i].name)
	  console.log('Preview Link: '+data.tracks.items[i].preview_url)
	  console.log('Album: '+data.tracks.items[i].album.name)
	  console.log('------------------------------')
	}
	})
}


  function dooWhat(){
  fs.readFile('random.txt', "utf8", function(error, data){
    var txt = data.split(',');

    spotifyThis(txt[1]);
  });
}