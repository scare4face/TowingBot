// App.js-A bot that likes post with a search query
// Require twitter and config.js dependencies 
var Twitter = require('twitter');
var config = require('./config.js');

// Pass configuration(config.js) files to twitter dependency
var T = new Twitter(config);

// Basically what we seek to do here is to search for tweets from a search query and like every 10th tweet


// setting up a variable to hold parameters to search on twitter
var params = {   // All info is here are explained detailed here "https://dev.twitter.com/rest/reference/get/search/tweets"
    q: '#nodejs',
    count: 3,
    result_type: 'popular',
    lang: 'en'
}

// We plug the params variable into a "get request" to request info from twitter using the Twitter API
T.get('search/tweets', params, function(err, data, response){
    if (!err){                                                // If no error
        // The get request above returns data as 'data.statuses' and we will need a for loop to loop through all the tweets and favorite them
        for (let i = 0; i < data.statuses.length; i++){
            // For every tweet above we require the tweet Id from the returned data
            let id = { id: data.statuses[i].id_str} //[i] means every looped tweet
            // We will favorite every tweet looped
            T.post ('favorites/create', id, function (err, response){
                if (err){                                             // If the task fails (favoriting)
                    console.log(err[0].message);                      // Log the default error message retured from twitter
                }
                else {
                    let username = response.user.screen_name;         // Grab "screen_name" and put into a variable
                    let tweetId = response.id_str;                    // Grab "id" and put into a variable
                    console.log(`Favorited this tweetId "${tweetId}" from "${username}" with url:"https://twitter/${username}/status/${tweetId}"`);
                }
            });
        }
    }
    else {
        console.log(err);
    }
});
