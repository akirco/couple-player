'use client';
import Player from '@/components/player';
import localforage from 'localforage';
import { useEffect, useState } from 'react';
import type { StoragedVideo } from '@/types/video';
import type { CurrentEpisode, PeerChannel } from '@/types/channel';
import { Button } from '@/components/ui/button';
import { ThickArrowRightIcon, PlusCircledIcon } from '@radix-ui/react-icons';
import { Room } from '@/components/room';
import { useRouter } from 'next/router';
import '@/styles/global.css';
import {
  Card,
  CardContent,
  CardDescription,
  CardTitle,
} from '@/components/ui/card';
import io, { Socket } from 'socket.io-client';
let socket: Socket;

export default function Channel() {
  const [currentPlay, setCurrentPlay] = useState<StoragedVideo>();
  const [channel, setChannel] = useState<PeerChannel | null>(null);
  const [currentEpisode, setCurrentEpisode] = useState<CurrentEpisode | null>(
    null
  );
  const router = useRouter();
  const channelId = router.query.id as string;

  const socketInitializer = async () => {
    await fetch('/api/socket');
    socket = io('http://localhost:3000', {
      path: '/api/socketio',
    });

    socket.on('connect', () => {
      const transportAtConnect = socket.io.engine.transport.name;
      console.log(`Connected ${socket.id} with ${transportAtConnect}`);
      socket.io.engine.on('upgrade', () => {
        const upgradedTransport = socket.io.engine.transport.name;
        console.log(
          `Upgraded from ${transportAtConnect} to ${upgradedTransport}`
        );
      });
    });

    socket.on('newIncomingMessage', (msg) => {
      console.log('New message in client', msg);
    });
  };

  useEffect(() => {
    socketInitializer();
  }, []);

  useEffect(() => {
    if (channelId) {
      localforage
        .getItem<StoragedVideo>(channelId)
        .then((res) => {
          if (res) {
            setCurrentPlay(res);
            setCurrentEpisode({
              url: res.playUrls[0],
              episode: 1,
            });
            setChannel({
              peerCode: channelId,
              peerName: 'akirco',
              peerPlaying: res,
              CurrentEpisode: {
                url: res.playUrls[0],
                episode: 1,
              },
            });
          }
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [channelId]);

  const handleInvite = () => {
    if (channel) {
      console.log(channel);
    }
  };

  return (
    <div className='flex flex-col xl:p-6 p-0'>
      <main className='flex xl:gap-5 gap-0 w-full h-full xl:flex-row flex-col pb-16'>
        <Player
          url={currentEpisode?.url}
          title={currentPlay?.vod_name + '-' + currentEpisode?.episode}
        />
        <Card className='flex flex-col xl:rounded-xl rounded-tl-none rounded-tr-none'>
          <CardContent className='py-5 flex flex-col gap-5 justify-between h-full items-center'>
            <div className='justify-end px-2 flex w-full text-xl font-medium gap-2'>
              <h1 className='xl:text-2xl text-xl font-medium px-20 text-center'>
                ChatRoom
              </h1>
              <Button
                size={'icon'}
                className={'text-orange-500 text-xl font-medium'}
                onClick={handleInvite}
              >
                <PlusCircledIcon />
              </Button>
              <Button
                size={'icon'}
                className={'text-orange-500 text-xl font-medium'}
              >
                <ThickArrowRightIcon />
              </Button>
            </div>
            <Room />
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
                    onClick={() =>
                      setCurrentEpisode({
                        url,
                        episode: index + 1,
                      })
                    }
                    className={
                      url === currentEpisode?.url
                        ? 'text-orange-500 text-xl font-medium'
                        : ''
                    }
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
