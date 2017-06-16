// App.js - A bot that follows everyone that tweets a query

// Require twitter and config.js dependencies 
var Twitter = require('twitter');
var config = require('./config.js');

// Pass configuration(config.js) files to twitter dependency
var T = new Twitter(config);

// Basically what we seek to do here is to search for tweets from a search query and like every 10th tweet


// setting up a variable to hold parameters to search on twitter
var params = {   // All info is here are explained detailed here "https://dev.twitter.com/rest/reference/get/search/tweets"
    q: '#nodejs',
    count: 10,
    result_type: 'popular',
    lang: 'en'
}

// We plug the params variable into a "get request" to request info from twitter using the Twitter API
T.get('search/tweets', params, function(err, data, response){
    if (!err){                                                // If no error
        // The get request above returns data as 'data.statuses' and we will need a for loop to loop through all the tweets and favorite them
        for (let i = 0; i < data.statuses.length; i++){
            // grab and save user screen_name
            let screenName = data.statuses[i].user.screen_name;
            // the create a 'follow' post request  method
            T.post('friendships/create', {screenName}, function(err, res){
                if (err){
                    console.log(err);
                } else {
                    // grab and save time stamp of following and output to console
                   // let timeStamp = res.status.created_at;
                    console.log(`FOLLOWED: screenName`);
                }
            });

        }
    }
    else {
        console.log(err);
    }
});
