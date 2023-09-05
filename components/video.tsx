import type { VideoList } from '@/types/video';
import Image from 'next/image';
import {
  Card,
  CardContent,
  CardDescription,
  CardTitle,
} from '@/components/ui/card';

export function Video({ video }: { video: VideoList }) {
  const playVideo = () => {
    const urls = video.vod_play_url.split('$$$')[1].split('#');
    const fin_urls = urls.map((url) => url.split('$')[1]);
  };
  return (
    <Card
      className='hover:shadow-2xl cursor-pointer m-auto'
      onClick={playVideo}
    >
      <CardContent className='py-5 flex flex-col gap-2 items-center'>
        <Image
          src={video.vod_pic}
          alt='vod_cover'
          className='rounded-lg'
          width='200'
          height='300'
        />
        <CardTitle className='text-center'>{video.vod_name}</CardTitle>
        <div className='flex justify-between w-full'>
          <CardDescription>{video.vod_lang}</CardDescription>
          <CardDescription>{video.vod_total}集</CardDescription>
        </div>
      </CardContent>
    </Card>
  );
}
