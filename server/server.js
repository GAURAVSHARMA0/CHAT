const webSocketsServerPort = 8000;
const webSocketServer = require('websocket').server;
const http = require('http');
// Spinning the http server and the websocket server.
const server = http.createServer();
server.listen(webSocketsServerPort);
const wsServer = new webSocketServer({
  httpServer: server
});

// I'm maintaining all active connections in this object
const clients = {};

const remove = (arr, key) =>{
  let arrCopy = Array.from(arr);
  let keyIndex = arrCopy.findIndex(e => e === key);
  arrCopy.splice(keyIndex,1);
  return arrCopy;
}


wsServer.on('request', function(request) {
  var userID = request.resourceURL.query.USERID;
  console.log( 'Recieved a new connection of '+request.resourceURL.query.USERID);
  // You can rewrite this part of the code to accept only the requests from allowed origin
  const connection = request.accept(null, request.origin);
  clients[userID] = connection;
  //SEND ACTIVE USER LIST
  const PACKET = {};
  PACKET.type = "USERLIST";
  clientArr= Object.keys(clients);

  for(key in clients){
    let arr = clientArr;
    PACKET.users = remove(arr,key);
    conn = clients[key];
    conn.sendUTF(JSON.stringify(PACKET)); 
  }

    connection.on('message', function(message) {

        if (message.type === 'utf8') {
            console.log('Received Message: ' + message.utf8Data);
            const { userid , msg, to } = JSON.parse(message.utf8Data);
            const PACKET = {};
            PACKET.type = "MSG";
            PACKET.msg = `USER Not Available`;
            if(clients[to]){
              PACKET.msg = msg;
              clients[to].sendUTF(JSON.stringify(PACKET));
            }
            else{
              clients[userid].sendUTF(JSON.stringify(PACKET));
            }
            // connection.sendUTF(message.utf8Data);
        }
        else if (message.type === 'binary') {
            console.log('Received Binary Message of ' + message.binaryData.length + ' bytes');
            connection.sendBytes(message.binaryData);
        }
    });
    connection.on('close', function(reasonCode, description) {
        console.log((new Date()) + ' Peer ' + connection.remoteAddress + ' disconnected.');
    });

  console.log('connected: ' + userID + ' in ' + Object.getOwnPropertyNames(clients))
});

