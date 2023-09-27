'use client';
import { Button } from '@/components/ui/button';
import { PlusCircledIcon } from '@radix-ui/react-icons';
import QrCode from './qrcode';
import { useEffect, useRef, useState } from 'react';
import { baseUrl } from '@/lib/utils';
import Peer from 'peerjs';
import { useSessionStorage } from 'react-use';
// import Socket from '@/lib/goeasy';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { PeerData } from '@/types/channel';
import localforage from 'localforage';
import { StoragedVideo } from '@/types/video';
import { peerDataHandler, peerSend } from '@/lib/peerEventListener';
import { useSearchParams } from 'next/navigation';

export default function Share({ channelId }: { channelId: string }) {
  const [isCopied, setIsCopied] = useState(false);
  const peerRef = useRef<Peer>();
  const userId = Math.random().toString(36).substring(7);
  const [peerId, _setPeerId] = useSessionStorage('peerId', userId);
  const [connPeerId, setConnPeerId] = useState<string | null>(null);
  const params = useSearchParams();

  const copy = async () => {
    await navigator.clipboard.writeText(
      `${baseUrl()}/channel/${channelId}?from=${peerId}`
    );
    setIsCopied(true);
    setTimeout(() => {
      setIsCopied(false);
    }, 1000);
  };

  useEffect(() => {
    if (peerRef.current === undefined) {
      if (typeof navigator !== 'undefined') {
        const Peer = require('peerjs').default;
        peerRef.current = new Peer(peerId);
      }
    } else {
      peerRef.current.on('open', (id) => {
        const connectId = params.get('from');
        alert(connectId);
        if (connectId) {
          setConnPeerId(connectId);
        }
        // const io = new Socket(channelId);
        // io.connectGoEasy(id);
        // io.subscribe();
        // io.subscribePresence((e: Presence) => {
        //   if (
        //     e.action === 'join' &&
        //     e.channel === channelId &&
        //     e.amount > 1 &&
        //     e.member.data.peerId !== peerId
        //   ) {
        //     setConnPeerId(e.member.data.peerId);
        //   }
        // });
      });
      peerRef.current.on('connection', (connection) => {
        console.log('收到新连接：' + connection.peer);
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
      peerRef.current.on('error', (err) => {
        console.error(err);
      });
      if (connPeerId !== null) {
        alert(connPeerId);
        const connection = peerRef.current.connect(connPeerId);
        window.peerConnection = connection;
        connection.on('open', () => {
          console.log('已连接到Peer：' + connection.peer);
          localforage.getItem<StoragedVideo>(channelId).then((value) => {
            if (value) {
              peerSend({
                type: 'vstorage',
                value: value,
              });
            }
          });
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
    }
    return () => {
      // peerRef.current?.disconnect();
    };
  }, [channelId, connPeerId, params, peerId]);

  return (
    <Dialog open={isCopied} onOpenChange={setIsCopied}>
      <DialogTrigger asChild>
        <Button size={'icon'} className='text-orange-500 text-xl font-medium'>
          <PlusCircledIcon className='w-4 h-4' />
        </Button>
      </DialogTrigger>
      <DialogContent className='!max-w-[24rem]'>
        <DialogHeader>
          <DialogTitle>Share current channel</DialogTitle>
          <DialogDescription>
            Copy provided address and send it to the other person...
          </DialogDescription>
        </DialogHeader>
        <QrCode channelId={channelId} peerId={peerId} />
        <DialogFooter className='!flex !justify-center !items-center'>
          <Button onClick={copy}>Copy channel link</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
