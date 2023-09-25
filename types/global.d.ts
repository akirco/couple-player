import GoEasy from 'goeasy';
import { Peer } from 'peerjs';

declare global {
  namespace globalThis {
    var goEasy: GoEasy;
  }
}
