const express = require('express');
const http = require('http');
const socketio = require('socket.io');
const path = require('path');
const bodyParser = require('body-parser');
const app = express();

app.locals.isDev = process.env.ENV === "dev";
  if(app.locals.isDev) {
    app.locals.config = {
      ...require('./config.js'),
      ...require('./apiconfig')
    };
  }
  else {
    app.locals.config = {
      port : process.env.PORT,
      API_Key : process.env.API_KEY,
      API_SECRET_KEY : process.env.API_SECRET_KEY,
      ACCESS_TOKEN : process.env.ACCESS_TOKEN,
      ACCESS_TOKEN_SECRET : process.env.ACCESS_TOKEN_SECRET
    };
  }
  
const port = app.locals.config.port;
const server = http.createServer(app);
const io = socketio(server);

app.use(bodyParser.json());

if(!app.locals.isDev) {
  app.use(express.static('dist'));
}


app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader(
    'Access-Control-Allow-Methods',
    'OPTIONS, GET, POST, PUT, PATCH, DELETE'
  );
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  next();
});


require('./modules/twitterAPI.js')(app, io);

server.listen(port, () => {
    console.log('server is up on port');
});