'use client';
import { Button } from '@/components/ui/button';
import { PlusCircledIcon } from '@radix-ui/react-icons';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import QrCode from './qrcode';
import { useEffect, useRef, useState } from 'react';
import { baseUrl } from '@/lib/utils';
import Peer from 'peerjs';
import { nanoid } from 'nanoid';
import { useSessionStorage } from 'react-use';

const usePeer = (id: string): Peer | undefined => {
  if (typeof navigator !== 'undefined') {
    const Peer = require('peerjs').default;
    const peer = new Peer(id);
    return peer;
  }
  return undefined;
};

export function Share({ channelId }: { channelId: string }) {
  const [isCopied, setIsCopied] = useState(false);
  const peerRef = useRef<Peer>();
  const [peerId, _setPeerId] = useSessionStorage('peerId', nanoid(8));

  const copy = async () => {
    await navigator.clipboard.writeText(`${baseUrl()}/channel/${channelId}`);
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
        console.log('peerId:', id);
      });
    }
  }, [peerId]);

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
        <QrCode channelId={channelId} />
        <DialogFooter className='!flex !justify-center !items-center'>
          <Button onClick={copy}>Copy channel link</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
