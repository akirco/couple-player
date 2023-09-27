import { PeerData } from '@/types/channel';
import localforage from 'localforage';
import { Events } from 'xgplayer';

export const peerSend = (data: PeerData) => {
  if (window.peerConnection !== undefined) {
    window.peerConnection.send(data);
  }
};

export const xgplayerListener = () => {
  window.xgplayer?.on(Events.PLAY, () => {
    peerSend({ type: 'vplay', value: Events.PLAY });
  });
  window.xgplayer?.on(Events.PAUSE, () => {
    peerSend({ type: 'vpause', value: Events.PAUSE });
  });
  window.xgplayer?.on(Events.USER_ACTION, (data) => {
    console.log(data);

    if (data.action === 'click' || data.action === 'dragend') {
      peerSend({ type: 'vtimeupdate', value: data.currentTime });
    }
  });
};

export const peerDataHandler = (data: PeerData) => {
  switch (data.type) {
    case 'message':
      // @ts-ignore
      window.xgplayer.danmu.sendComment({
        duration: 15000,
        id: Math.random().toString(36).substring(3),
        txt: data.value,
        style: {
          color: '#F97316',
          fontSize: '25px',
          border: '1px solid #F97316',
          borderRadius: '6px',
          padding: '5px',
          backgroundColor: 'rgba(255,255,255,0.4)',
        },
      });
      break;
    case 'vplay':
      window.xgplayer?.play();
      break;
    case 'vpause':
      window.xgplayer?.pause();
      break;
    case 'vstorage':
      // @ts-ignore
      window.setCurrentPlay(data.value);
      localforage.setItem(data.value.storageId, data.value);
      break;
    case 'vtimeupdate':
      window.xgplayer!.currentTime = data.value;
      break;
    case 'episodeChange':
      // @ts-ignore
      window.setCurrentEpisode(data.value);
    default:
      break;
  }
};
