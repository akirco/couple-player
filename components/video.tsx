import type { StoragedVideo, VideoList } from '@/types/video';
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

export function Video({
  video,
  isStoraged,
}: {
  video: VideoList | StoragedVideo;
  isStoraged?: boolean;
}) {
  const regex = /https:\/\/[^#]+/g;
  const playUrls = video.vod_play_url.match(regex);
  // console.log(playUrls);

  const storageId = genStorageId();
  const router = useRouter();
  let playVideo: () => void;
  if (isStoraged) {
    playVideo = () => {
      router.push(`/channel/${(video as StoragedVideo).storageId}`);
    };
  } else {
    playVideo = () => {
      const storageInfo = {
        playUrls,
        storageId,
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
  }

  return (
    <Card
      className='hover:shadow-2xl cursor-pointer m-auto'
      onClick={playVideo}
    >
      <CardContent className='py-5 flex flex-col gap-2 items-center min-h-[375px] min-w-[248px] h-[375px] w-[248px]'>
        <Image
          src={video.vod_pic}
          alt='vod_cover'
          className='rounded-lg object-cover w-[200px] h-[300px] transition-opacity opacity-0 duration-1000'
          width='200'
          height='300'
          priority
          onLoadingComplete={(img) => img.classList.remove('opacity-0')}
        />
        <CardTitle className='text-center'>{video.vod_name}</CardTitle>
        <div className='flex justify-between w-full'>
          <CardDescription>{video.vod_lang}</CardDescription>
          <CardDescription>{playUrls?.length}集</CardDescription>
        </div>
      </CardContent>
    </Card>
  );
}
