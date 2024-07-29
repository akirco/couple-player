'use client';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { baseUrl } from '@/lib/utils';
import { PlusCircledIcon } from '@radix-ui/react-icons';
import { useState } from 'react';
import QrCode from '../qrcode/qrcode';

export default function Share({
  channelId,
  peerId,
}: {
  channelId: string;
  peerId: string;
}) {
  const [isCopied, setIsCopied] = useState(false);

  const copy = async () => {
    await navigator.clipboard.writeText(
      `${baseUrl()}/channel/${channelId}?from=${peerId}`
    );
    setIsCopied(true);
    setTimeout(() => {
      setIsCopied(false);
    }, 1000);
  };

  return (
    <Dialog open={isCopied} onOpenChange={setIsCopied}>
      <DialogTrigger asChild>
        <Button size={'icon'} className="text-white text-xl font-medium">
          <PlusCircledIcon className="w-4 h-4" />
        </Button>
      </DialogTrigger>
      <DialogContent className="!max-w-[24rem]">
        <DialogHeader>
          <DialogTitle>Share current channel</DialogTitle>
          <DialogDescription>
            Copy provided address and send it to the other person...
          </DialogDescription>
        </DialogHeader>
        <QrCode channelId={channelId} peerId={peerId} />
        <DialogFooter className="!flex !justify-center !items-center">
          <Button onClick={copy}>Copy channel link</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
