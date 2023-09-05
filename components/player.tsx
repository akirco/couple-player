'use client';
import { useEffect } from 'react';
import XGPlayer from 'xgplayer';
import 'xgplayer/dist/index.min.css';
import { ArrowLeftIcon } from '@radix-ui/react-icons';

const Player = () => {
  useEffect(() => {
    const xgplayer = new XGPlayer({
      id: 'xgplayer',
      download: true,
      rotate: true,
    });
    return () => xgplayer.destroy();
  }, []);
  const backIconClick = () => {};
  return (
    <div className='bg-black'>
      <div className='hover:bg-opacity-40 flex absolute p-4 flex-row w-full z-40 items-center gap-8 bg-black bg-opacity-0'>
        <ArrowLeftIcon
          onClick={backIconClick}
          className='text-white cursor-pointer w-6 h-6'
        />
        <p className='text-white text-1xl md:text-3xl font-bold'>
          <span className='font-light'>watching : </span>
          {/* {title} */}
        </p>
      </div>
      <div id='xgplayer'></div>
    </div>
  );
};

export default Player;
