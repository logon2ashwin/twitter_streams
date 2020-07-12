var Twitter = require('node-tweet-stream');

module.exports = (app, io) => {
    // Twitter OAuth Credintials
    let twitter = new Twitter({
      consumer_key: app.locals.config.API_KEY,
      consumer_secret: app.locals.config.API_SECRET_KEY,
      token: app.locals.config.ACCESS_TOKEN,
      token_secret: app.locals.config.ACCESS_TOKEN_SECRET 
    });

    let socketConnection;
    app.locals.searchTerm = 'Tony';
    app.locals.showRetweets = false;
    
    twitter.on('tweet', function (tweet) {
        console.log('tweet received for', app.locals.searchTerm);
        sendMessage(tweet);
    });

    twitter.on('error', function (err) {
        console.log(err.message);
    });

    //Establishes socket connection.
    io.on("connection", socket => {
        socketConnection = socket;
        socket.on("connection", () => {
            console.log("client connected");
            twitter.track(app.locals.searchTerm);
        });
        socket.on("disconnect", () => {
            console.log("client disconnected");
            twitter.untrack(app.locals.searchTerm);
        });
        socket.on("updateSearchTerm", (data, fn) => {
            twitter.untrack(app.locals.searchTerm);
            app.locals.searchTerm = data.term;
            console.log("search term changed to", app.locals.searchTerm);
            twitter.track(app.locals.searchTerm);
            fn('success');
        });
    });

    

    const sendMessage = (msg) => {
        if (msg.text.includes('RT')) {
            return;
        }
        if(socketConnection) {
            socketConnection.emit("tweets", msg);
        }
    }
};