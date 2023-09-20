import { Server, Socket } from 'socket.io';
import { NextApiRequest } from 'next';
import { Server as NetServer } from 'http';
import type { NextApiResponseServerIO } from '@/types/channel';

export const config = {
  api: {
    bodyParser: false,
  },
};

const onSocketConnection = (io: Server, socket: Socket) => {
  const createdMessage = (msg: any) => {
    console.log('New message', msg);
    socket.broadcast.emit('newIncomingMessage', msg);
  };

  socket.on('createdMessage', createdMessage);
};

export default function handler(
  req: NextApiRequest,
  res: NextApiResponseServerIO
) {
  if (res.socket.server.io) {
    console.log('Server already started!');
    res.end();
    return;
  }
  const httpServer: NetServer = res.socket.server as any;

  const io = new Server(httpServer, {
    path: '/api/socketio',
  });

  res.socket.server.io = io;

  const onConnection = (socket: Socket) => {
    console.log('New connection', socket.id);
    onSocketConnection(io, socket);
  };

  io.on('connection', onConnection);

  console.log('Socket server started successfully!');

  res.end();
}
