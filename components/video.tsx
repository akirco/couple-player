import type { VideoList } from '@/types/video';
import { genStorageId } from '@/lib/utils';
import Image from 'next/image';
import localforage from 'localforage';
import { useRouter } from 'next/navigation';
import {
  Card,
  CardContent,
  CardDescription,
  CardTitle,
} from '@/components/ui/card';

export function Video({ video }: { video: VideoList }) {
  console.log(video);
  const urls = video.vod_play_url.split('$$$')[1].split('#');
  const playUrls = urls.map((url) => url.split('$')[1]);
  const storageId = genStorageId();
  const router = useRouter();
  const playVideo = () => {
    const storageInfo = {
      playUrls,
      ...video,
    };
    localforage
      .setItem(storageId, storageInfo)
      .then(function (value) {
        router.push(`/channel/${storageId}`);
      })
      .catch(function (err) {
        console.log(err);
      });
  };
  return (
    <Card
      className='hover:shadow-2xl cursor-pointer m-auto'
      onClick={playVideo}
    >
      <CardContent className='py-5 flex flex-col gap-2 items-center min-h-[375px] min-w-[248px] h-[375px] w-[248px]'>
        <Image
          src={video.vod_pic}
          alt='vod_cover'
          className='rounded-lg object-cover w-auto h-auto transition-opacity opacity-0 duration-1000'
          width='200'
          height='300'
          onLoadingComplete={(img) => img.classList.remove('opacity-0')}
        />
        <CardTitle className='text-center'>{video.vod_name}</CardTitle>
        <div className='flex justify-between w-full'>
          <CardDescription>{video.vod_lang}</CardDescription>
          <CardDescription>{playUrls.length}集</CardDescription>
        </div>
      </CardContent>
    </Card>
  );
}
