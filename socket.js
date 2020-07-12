import io from 'socket.io-client';
import { useSelector } from "react-redux";

let config = {
  dev: {
    host : "127.0.0.1",
    port: 5001
  },
  prod: {
    host : "https://ashwin-twitter-streams.herokuapp.com/"
  }
}
if(process.env.ENV && process.env.ENV !== "dev") {
  config.port = process.env.PORT;
}
let socket;
let status = "DISCONNECTED";

const init = () => {
  // http://${config.dev.host}:${config.dev.port}
  // config.prod.host
  socket = io(config.prod.host);
  socket.on('connect', function(){ 
    status = "CONNECTED";
  });
  socket.on('disconnect', function(){
    status = "DISCONNECTED";
  });
  return socket;
};

const getConnection = () => {
  if(socket) {
    return socket;
  }
  else {
    return init();
  }
};

export default {
  init,
  status,
  getConnection
}

