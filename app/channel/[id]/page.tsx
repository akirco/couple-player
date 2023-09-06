'use client';
import Player from '@/components/player';
import localforage from 'localforage';
import { useEffect, useState } from 'react';
import type { StoragedVideo } from '@/types/video';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { PaperPlaneIcon } from '@radix-ui/react-icons';
import {
  Card,
  CardContent,
  CardDescription,
  CardTitle,
} from '@/components/ui/card';

export default function Channel({ params }: { params: { id: string } }) {
  const [currentPlay, setCurrentPlay] = useState<StoragedVideo>();
  const [currentUrl, setCurrentUrl] = useState('');
  useEffect(() => {
    if (params.id) {
      localforage
        .getItem<StoragedVideo>(params.id)
        .then((res) => {
          if (res) {
            setCurrentPlay(res);
            setCurrentUrl(res.playUrls[0]);
          }
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [params.id]);
  return (
    <div className='flex flex-col xl:p-6 p-0'>
      <main className='flex gap-5 w-full h-full xl:flex-row flex-col pb-16'>
        <Player url={currentUrl} title={currentPlay?.vod_name} />
        <Card className='flex flex-col'>
          <CardContent className='py-5 flex flex-col gap-5'>
            <h1 className='text-3xl font-medium px-36'>Chatbox</h1>
            <div className='flex w-full max-w-sm items-center space-x-2 m-auto'>
              <Input placeholder='What do you want to watch?' type='search' />
              <Button size={'icon'}>
                <PaperPlaneIcon />
              </Button>
            </div>
          </CardContent>
        </Card>
      </main>
      <Card>
        <CardContent className='py-5 flex flex-col gap-5'>
          <CardTitle>Video:</CardTitle>
          <div className='flex flex-wrap gap-5'>
            {currentPlay?.playUrls && currentPlay?.playUrls?.length > 0
              ? currentPlay?.playUrls.map((url, index) => (
                  <Button
                    key={index}
                    size={'icon'}
                    onClick={() => setCurrentUrl(url)}
                    className={url === currentUrl ? 'text-orange-500' : ''}
                  >
                    {index + 1}
                  </Button>
                ))
              : null}
          </div>
          <hr className='border-none w-full h-[2px] bg-neutral-100' />
          <CardTitle>{currentPlay?.vod_name}</CardTitle>
          <CardDescription>{currentPlay?.vod_director}</CardDescription>
          <CardDescription>
            {currentPlay?.type_name} {currentPlay?.vod_class}
          </CardDescription>
          <CardDescription>{currentPlay?.vod_actor}</CardDescription>
          <CardDescription>{currentPlay?.vod_blurb}</CardDescription>
        </CardContent>
      </Card>
    </div>
  );
}
