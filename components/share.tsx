import { Button } from '@/components/ui/button';
import { PlusCircledIcon } from '@radix-ui/react-icons';
import QRCodeStyling from 'qr-code-styling';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { useEffect, useRef, useState } from 'react';

export function Share({ channelId }: { channelId: string }) {
  const [url, setUrl] = useState('https://qr-code-styling.com');
  const qrcodeRef = useRef<HTMLDivElement | null>(null);
  const [qrCode] = useState<QRCodeStyling>(
    new QRCodeStyling({
      width: 300,
      height: 300,
      dotsOptions: {
        color: '#4267b2',
        type: 'rounded',
      },
      imageOptions: {
        crossOrigin: 'anonymous',
        margin: 20,
      },
    })
  );
  useEffect(() => {
    setUrl(`http://localhost:3000/channel/${channelId}`);
  }, [channelId, url]);

  useEffect(() => {
    qrCode.update({
      data: url,
    });
  }, [qrCode, url]);

  useEffect(() => {
    if (qrcodeRef.current) {
      qrCode.append(qrcodeRef.current);
    }
  }, [qrCode]);

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button size={'icon'} className='text-orange-500 text-xl font-medium'>
          <PlusCircledIcon className='w-4 h-4' />
        </Button>
      </DialogTrigger>
      <DialogContent className='sm:max-w-[425px]'>
        <DialogHeader>
          <DialogTitle>Share current channel</DialogTitle>
          <DialogDescription>
            Make changes to your profile here. Click save when youre done.
          </DialogDescription>
        </DialogHeader>
        <div ref={qrcodeRef} className='w-52 h-52' />
        <DialogFooter>
          <Button type='submit'>Save changes</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
