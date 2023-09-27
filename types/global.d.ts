import type { DataConnection } from 'peerjs';
import type XGPlayer from 'xgplayer';

declare global {
  namespace globalThis {
    var peerConnection: DataConnection | undefined;
    var xgplayer: XGPlayer | undefined;
  }
}
