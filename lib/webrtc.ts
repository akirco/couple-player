import Peer from 'peerjs';

export function createPeer() {
  const userId = Math.random().toString(36).slice(7);
  const peer = new Peer(userId);
  peer.on('connection', (connection) => {
    // Receive messages from the connected peer
  });

  peer.on('error', (err) => {
    // Handle errors
    console.error(err);
  });

  peer.on('open', () => {
    //send
  });

  const connection = peer.connect(''); // Connect to the peer

  connection.on('open', () => {
    // Send the message
    console.log(peer.id);
    connection.send(peer.id);
  });

  connection.on('data', (data) => {
    // Receive messages from the connected peer
  });
}
