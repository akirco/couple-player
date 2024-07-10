import { useLocalForage } from '@/app/provider';
import {
  Card,
  CardContent,
  CardDescription,
  CardTitle,
} from '@/components/ui/card';
import blurImageUrl from '@/public/logo/sv_white.png';
import type { StoragedVideo, VideoList } from '@/types/video';
import { TrashIcon } from '@radix-ui/react-icons';
import { nanoid } from 'nanoid';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { FC, useCallback, useMemo } from 'react';

interface VideoProps {
  video: VideoList | StoragedVideo;
  isStoraged?: boolean;
  isEdit?: boolean;
  onRemove?: (storageId: string) => void;
}

const useVideoLogic = (
  video: VideoList | StoragedVideo,
  isStoraged: boolean,
  onRemove?: (storageId: string) => void
) => {
  const localforage = useLocalForage();
  const router = useRouter();
  const storageId = useMemo(() => nanoid(16), []);

  const playUrls = useMemo(() => {
    const regex = /https:\/\/[^#]+\.m3u8/g;
    return video.vod_play_url.match(regex);
  }, [video.vod_play_url]);

  const removeRecord = useCallback(() => {
    if (isStoraged && (video as StoragedVideo).storageId) {
      localforage
        ?.removeItem((video as StoragedVideo).storageId)
        .then(() => {
          console.log('remove success');
          onRemove && onRemove((video as StoragedVideo).storageId);
        })
        .catch((err) => {
          console.error('Failed to remove item:', err);
          alert('Failed to remove the video.');
        });
    }
  }, [isStoraged, localforage, video, onRemove]);

  const playVideo = useCallback(() => {
    if (isStoraged) {
      router.push(`/channel/${(video as StoragedVideo).storageId}`);
    } else {
      const storageInfo = {
        playUrls,
        storageId,
        ...video,
      };
      localforage
        ?.setItem(storageId, storageInfo)
        .then(() => {
          router.push(`/channel/${storageId}`);
        })
        .catch((err) => {
          console.error('Failed to store item:', err);
          alert('Failed to save the video.');
        });
    }
  }, [isStoraged, playUrls, storageId, video, localforage, router]);

  return { playUrls, playVideo, removeRecord };
};

export const Video: FC<VideoProps> = ({
  video,
  isStoraged = false,
  isEdit = false,
  onRemove,
}) => {
  const { playVideo, removeRecord, playUrls } = useVideoLogic(
    video,
    isStoraged,
    onRemove
  );

  return (
    <Card className="relative hover:shadow-2xl hover:shadow-primary border-none cursor-pointer m-auto">
      <CardContent
        className="py-5 flex flex-col gap-2 items-center w-[248px] h-[392px]"
        onClick={playVideo}
        role="button"
        tabIndex={0}
        aria-label={`Play ${video.vod_name}`}
      >
        <Image
          src={video.vod_pic}
          alt={`${video.vod_name} cover`}
          className="select-none rounded-lg object-cover w-[200px] h-[300px] transition-opacity opacity-0 duration-1000"
          width="220"
          height="320"
          sizes="(max-width: 600px) 100vw, (max-width: 1200px) 50vw, 33vw"
          priority
          placeholder="blur"
          blurDataURL={blurImageUrl.blurDataURL}
          onLoad={(img) => img.currentTarget.classList.remove('opacity-0')}
        />
        <CardTitle className="text-center !text-wrap">
          {video.vod_name}
        </CardTitle>
        <div className="flex justify-between w-full">
          <CardDescription>{video.vod_lang}</CardDescription>
          <CardDescription>{playUrls?.length}集</CardDescription>
        </div>
      </CardContent>
      {isEdit && (
        <div className="rounded-xl absolute w-[248px] h-[392px] z-50 inset-0 bg-black/80 bg-opacity-50 flex items-center justify-center">
          <span
            className="-z-10 text-white bg-red-500 rounded-full p-2 hover:bg-red-700 transition-colors"
            onClick={removeRecord}
            role="button"
            tabIndex={0}
            aria-label="Delete video"
          >
            <TrashIcon className="w-8 h-8" />
          </span>
        </div>
      )}
    </Card>
  );
};
