'use client';
import Player from '@/components/player';
import localforage from 'localforage';
import { useEffect, useState } from 'react';
import type { StoragedVideo } from '@/types/video';

export default function Channel({ params }: { params: { id: string } }) {
  const [playUrl, setPLayUrl] = useState('');
  useEffect(() => {
    if (params.id) {
      localforage
        .getItem<StoragedVideo>(params.id)
        .then((res) => {
          if (res) {
            setPLayUrl(res?.playUrls[0]);
          }
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [params.id]);
  return (
    <main className='flex gap-5 w-full xl:h-[80%] h-full xl:flex-row flex-col pb-16'>
      <Player url={playUrl} />
      <div className='flex flex-col'>
        <h1 className='text-3xl font-medium px-48 py-10'>Chatbox</h1>
      </div>
    </main>
  );
}
