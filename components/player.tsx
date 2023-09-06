'use client';
import { useEffect, FC } from 'react';
import XGPlayer from 'xgplayer';
import 'xgplayer/dist/index.min.css';
import { ArrowLeftIcon } from '@radix-ui/react-icons';
import HlsPlayer from 'xgplayer-hls';
import '@/styles/player.css';

interface PlayerProps {
  url: string;
}

const Player: FC<PlayerProps> = ({ url }) => {
  useEffect(() => {
    const xgplayer = new XGPlayer({
      id: 'xgplayer',
      url,
      plugins: [HlsPlayer],
      width: '100%',
      height: '100%',
      fluid: true,
    });
    return () => xgplayer.destroy();
  }, [url]);
  const backIconClick = () => {};
  return <div id='xgplayer'></div>;
};

export default Player;
