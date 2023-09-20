import type { StoragedVideo } from './video';
import { Server as NetServer, Socket } from 'net';
import { NextApiResponse } from 'next';
import { Server as SocketIOServer } from 'socket.io';

export interface CurrentEpisode {
  url: string;
  episode: number;
}
export interface PeerChannel {
  peerCode: string;
  peerName: string;
  CurrentEpisode: CurrentEpisode;
  peerPlaying: StoragedVideo;
}

export type NextApiResponseServerIO = NextApiResponse & {
  socket: Socket & {
    server: NetServer & {
      io: SocketIOServer;
    };
  };
};
