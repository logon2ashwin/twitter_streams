import io from 'socket.io-client';

let config = {
  host : "127.0.0.1",
  port: 5001
}
if(process.env.ENV && process.env.ENV !== "dev") {
  config.port = process.env.PORT;
}
let socket;
let status = "DISCONNECTED";

const init = () => {
  socket = io(`http://${config.host}:${config.port}`);
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

