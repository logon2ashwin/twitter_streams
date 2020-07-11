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

    app.locals.searchTerm = 'tony';
    app.locals.showRetweets = false;

    twitter.on('tweet', function (tweet) {
        console.log('tweet received for', app.locals.searchTerm);
        sendMessage(tweet);
    })
      
    twitter.on('error', function (err) {
        console.log(err.message);
    })

    twitter.track(app.locals.searchTerm);

    app.post('/setSearchTerm', (req, res) => {
        twitter.untrack(app.locals.searchTerm);
        let term = req.body.searchTerm;
        app.locals.searchTerm = term;
        console.log("search term changed to", app.locals.searchTerm);
        twitter.track(app.locals.searchTerm);
    });

    //Establishes socket connection.
    io.on("connection", socket => {
        socketConnection = socket;
        // stream();
        socket.on("connection", () => console.log("Client connected"));
        socket.on("disconnect", () => console.log("Client disconnected"));
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