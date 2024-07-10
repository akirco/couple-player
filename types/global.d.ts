import type Peer from 'peerjs';
import type { DataConnection } from 'peerjs';
import { Dispatch, SetStateAction } from 'react';
import type XGPlayer from 'xgplayer';
import { CurrentEpisode } from './channel';
import { StoragedVideo } from './video';

declare global {
  namespace globalThis {
    var peerConnection: DataConnection | undefined;
    var xgplayer: XGPlayer | undefined;
    var peer: Peer | undefined;
    var setCurrentEpisode: Dispatch<SetStateAction<CurrentEpisode | null>>;
    var setCurrentPlay: Dispatch<SetStateAction<StoragedVideo | undefined>>;
  }
}
