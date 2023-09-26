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

export interface Presence {
  channel: string;
  action: 'join' | 'timeout';
  member: {
    id: string;
    data: {
      avatar: string;
      peerId: string;
    };
  };
  time: number;
  amount: number;
  members: [
    {
      id: string;
      data: {
        avatar: string;
        peerId: string;
      };
    }
  ];
}

export interface PeerData {
  type:
    | 'vplay'
    | 'vpause'
    | 'vstorage'
    | 'vtimeupdate'
    | 'message'
    | 'episodeChange'
    | 'storagedReload';
  value: any;
}
