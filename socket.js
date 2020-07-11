import io from 'socket.io-client';

let socket;
let status = "DISCONNECTED";

const init = () => {
  socket = io('http://localhost:5001');
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

