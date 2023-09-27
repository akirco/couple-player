'use client';
import localforage from 'localforage';
import { useCallback, useEffect, useState } from 'react';
import type { StoragedVideo } from '@/types/video';
import type { CurrentEpisode, PeerData } from '@/types/channel';
import { Button } from '@/components/ui/button';
import { ThickArrowRightIcon } from '@radix-ui/react-icons';
import { Room } from '@/components/room';
import '@/styles/global.css';
import { peerDataHandler, peerSend } from '@/lib/peerEventListener';
import dynamic from 'next/dynamic';
import { useSessionStorage, useSearchParam } from 'react-use';

import {
  Card,
  CardContent,
  CardDescription,
  CardTitle,
} from '@/components/ui/card';

export default function Channel({ params }: { params: { id: string } }) {
  const from = useSearchParam('from');
  const userId = Math.random().toString(36).substring(3);
  const [peerId, _setPeerId] = useSessionStorage('peerId', userId);
  const [connPeerId, setConnPeerId] = useState<string | null>(null);
  const [currentPlay, setCurrentPlay] = useState<StoragedVideo>();
  const [currentEpisode, setCurrentEpisode] = useState<CurrentEpisode | null>(
    null
  );
  const channelId = params.id;

  const XGPlayer = dynamic(() => import('@/components/player'), {
    ssr: false,
  });

  const Share = dynamic(() => import('@/components/share'), {
    ssr: false,
  });

  const peerListener = useCallback(() => {
    window.peer?.on('connection', (connection) => {
      console.log('收到新连接from：' + connection.peer);
      window.peerConnection = connection;
      // 接受连接
      connection.on('open', () => {
        console.log('已接受连接：' + connection.peer);
        // 监听接收到的消息
        connection.on('data', (data) => {
          peerDataHandler(data as PeerData);

          console.log(
            'response-get data from:',
            connection.peer,
            ' content:',
            data
          );
        });
      });
    });
    window.peer?.on('error', (err) => {
      console.error('peer error:', err);
    });
  }, []);

  const InitPeer = useCallback(() => {
    if (!typeof window !== undefined) {
      import('peerjs').then(({ default: Peer }) => {
        if (!window.peer) {
          window.peer = new Peer(peerId, {
            debug: 3,
          });
          window.peer.on('open', (id) => {
            if (from) {
              setConnPeerId(from);
            }
            peerListener();
          });
        }
      });
    }
  }, [from, peerId, peerListener]);

  useEffect(() => {
    InitPeer();
    if (connPeerId !== null) {
      const connection = window.peer?.connect(connPeerId);
      window.peerConnection = connection;
      connection?.on('open', () => {
        console.log('已连接到Peer to：' + connection.peer);
        connection.on('data', (data) => {
          peerDataHandler(data as PeerData);
          console.log(
            'request-get data from:',
            connection.peer,
            ' content:',
            data
          );
        });
      });
    }
  }, [InitPeer, connPeerId]);

  useEffect(() => {
    // @ts-ignore
    window.setCurrentEpisode = setCurrentEpisode;
    // @ts-ignore
    window.setCurrentPlay = setCurrentPlay;
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
          }
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [channelId]);

  return (
    <div className='flex flex-col xl:p-6 p-0'>
      <main className='flex xl:gap-5 gap-0 w-full h-full xl:flex-row flex-col pb-16'>
        <XGPlayer
          url={currentEpisode?.url}
          title={currentPlay?.vod_name + '-' + currentEpisode?.episode}
        />
        <Card className='flex flex-col xl:rounded-xl rounded-tl-none rounded-tr-none'>
          <CardContent className='py-5 flex flex-col gap-5 justify-between h-full items-center'>
            <div className='justify-end px-2 flex w-full text-xl font-medium gap-2'>
              <h1 className='xl:text-2xl text-xl font-medium px-20 text-center'>
                ChatRoom
              </h1>
              <Share channelId={channelId} peerId={peerId} />
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
                    onClick={() => {
                      setCurrentEpisode({
                        url,
                        episode: index + 1,
                      });
                      peerSend({
                        type: 'episodeChange',
                        value: { url, exisode: index + 1 },
                      });
                    }}
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
