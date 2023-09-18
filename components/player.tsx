import { useRef, useEffect, FC } from 'react';
import videojs from 'video.js';
import 'video.js/dist/video-js.css';
import '@/styles/player.css';
import type VPlayer from 'video.js/dist/types/player';

interface VideoJSProps {
  options: any;
  onReady: (player: VPlayer) => void;
}

const Player: FC<VideoJSProps> = ({ options, onReady }) => {
  const videoRef = useRef<HTMLDivElement | null>(null);
  const playerRef = useRef<VPlayer | null>(null);

  useEffect(() => {
    if (!playerRef.current) {
      const videoElement = document.createElement('video');
      videoElement.classList.add('vjs-big-play-centered');
      videoElement.classList.add('video-js');
      if (videoRef.current) {
        videoRef.current.appendChild(videoElement);
      }
      const player = (playerRef.current = videojs(videoElement, options, () => {
        onReady(player);
      }));
    } else {
      const player = playerRef.current;
      if (player) {
        player.autoplay(options.autoplay);
        player.src(options.sources);
      }
    }
  }, [options, videoRef, onReady]);

  useEffect(() => {
    const player = playerRef.current;
    return () => {
      if (player && !player.isDisposed()) {
        player.dispose();
        playerRef.current = null;
      }
    };
  }, []);

  return (
    <div data-vjs-player className='w-full'>
      <div ref={videoRef}></div>
    </div>
  );
};

export default Player;
