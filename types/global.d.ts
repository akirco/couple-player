import GoEasy from '@/lib/goeasy';
import { DataConnection } from 'peerjs';
import XGPlayer from 'xgplayer';

declare global {
  namespace globalThis {
    var peerConnection: DataConnection | undefined;
    var xgplayer: XGPlayer | undefined;
  }
}
