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
      <main className='flex xl:gap-5 gap-0 w-full h-full xl:flex-row flex-col pb-16'>
        <Player url={currentUrl} title={currentPlay?.vod_name} />
        <Card className='flex flex-col xl:rounded-xl rounded-tl-none rounded-tr-none'>
          <CardContent className='py-5 flex flex-col gap-5 justify-between h-full items-center'>
            <h1 className='xl:text-2xl text-xl font-medium px-36 text-center'>
              Chatbox
            </h1>
            <div className='flex w-full max-w-sm items-center space-x-2'>
              <Input placeholder='Send a message?' type='search' />
              <Button size={'icon'}>
                <PaperPlaneIcon />
              </Button>
            </div>
          </CardContent>
        </Card>
      </main>
      <Card className='px-2 w-full'>
        <CardContent className='py-5 flex flex-col gap-5'>
          <CardTitle>Collections:</CardTitle>
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
          <CardTitle>Type:</CardTitle>
          <CardDescription>
            {currentPlay?.type_name} {currentPlay?.vod_class}
          </CardDescription>
          <CardTitle>Director:</CardTitle>
          <CardDescription>{currentPlay?.vod_director}</CardDescription>
          <CardTitle>Actor:</CardTitle>
          <CardDescription>{currentPlay?.vod_actor}</CardDescription>
          <CardTitle>Intro:</CardTitle>
          <CardDescription>{currentPlay?.vod_blurb}...</CardDescription>
        </CardContent>
      </Card>
    </div>
  );
}
