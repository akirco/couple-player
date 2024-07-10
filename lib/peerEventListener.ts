import { PeerData } from '@/types/channel';
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
    if (data.action === 'change_rate') {
      peerSend({
        type: 'playbackRateChange',
        value: data.props[0].playbackRate.to,
      });
    }
    if (data.to === true && data.action === 'switch_play_pause') {
      peerSend({ type: 'vpause', value: Events.PAUSE });
    }
    if (data.to === false && data.action === 'switch_play_pause') {
      peerSend({ type: 'vplay', value: Events.PLAY });
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
          fontSize: '20px',
          border: '2px solid #7CA2E3',
          borderRadius: '50px',
          padding: '5px 11px',
          backgroundColor: 'rgba(0,0,0,0.3)',
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
      console.log(data.value);
      // @ts-ignore
      window.setCurrentPlay(data.value);
      // useLocalForage()?.setItem(data.value.storageId, data.value);
      break;
    case 'vtimeupdate':
      window.xgplayer!.currentTime = data.value;
      break;
    case 'episodeChange':
      // @ts-ignore
      window.setCurrentEpisode(data.value);
    case 'playbackRateChange':
      window.xgplayer!.playbackRate = data.value;
    default:
      break;
  }
};
