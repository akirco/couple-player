'use client';
import type { VideoList, StoragedVideo } from '@/types/video';
import { Settings } from '@/components/settings';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useEffect, useState } from 'react';
import { Video } from '@/components/video';
import Loading from '@/components/loading';
import localforage from 'localforage';
import {
  GitHubLogoIcon,
  MagnifyingGlassIcon,
  TimerIcon,
  Pencil2Icon,
} from '@radix-ui/react-icons';
import Link from 'next/link';

export default function Home() {
  const [vname, setVname] = useState('');
  const [videoList, setVideoList] = useState<VideoList[]>();
  const [isLoading, setIsLoading] = useState(false);
  const [historyList, setHistoryList] = useState<StoragedVideo[]>();
  const [isEdit, setIsEdit] = useState(false);

  useEffect(() => {
    localforage
      .iterate<StoragedVideo, void>(function (value, key, iterationNumber) {
        setHistoryList((prev) => {
          if (prev) {
            if (prev.find((video) => video.storageId === value.storageId)) {
              return prev;
            }
            return [...prev, value];
          } else {
            return [value];
          }
        });
      })
      .then(function () {
        console.log('Iteration has completed');
      })
      .catch(function (err) {
        console.log(err);
      });
    return () => setHistoryList([]);
  }, []);
  const fetchVideos = () => {
    setIsLoading(true);
    if (vname) {
      fetch('/api/video', {
        method: 'POST',
        body: JSON.stringify({
          video: vname,
        }),
      }).then((response) => {
        response.json().then((res) => {
          setIsLoading(false);
          setVideoList(res.list);
        });
      });
    }
  };
  return (
    <main className='flex min-h-screen flex-col p-6'>
      <div className='flex justify-end items-center gap-5'>
        <Settings />
        <Link href={'https://github.com/akirco/couple-player'} target='_blank'>
          <Button variant={'ghost'} size={'icon'}>
            <GitHubLogoIcon className='w-4 h-4' />
          </Button>
        </Link>
      </div>
      <div className='m-auto flex flex-col gap-2'>
        <h1 className='text-4xl font-extrabold text-center pb-5'>
          What do you want to watch?
        </h1>
        <div className='flex w-full max-w-sm items-center space-x-2 m-auto'>
          <Input
            placeholder='What do you want to watch?'
            type='search'
            onChange={(e) => setVname(e.target.value)}
          />
          <Button onClick={fetchVideos}>Search</Button>
        </div>
        {isLoading ? (
          <div className='flex'>
            <Loading />
          </div>
        ) : videoList ? (
          <div className='flex flex-col p-5 gap-5'>
            <h1 className='inline-flex items-center gap-1 text-2xl font-semibold'>
              <MagnifyingGlassIcon className='w-8 h-8' />
              Search results
            </h1>
            <div className='flex flex-wrap gap-2'>
              {videoList.map((video) => (
                <Video key={video.vod_id} video={video} />
              ))}
            </div>
          </div>
        ) : historyList?.length ? (
          <div className='flex flex-col p-5 gap-5'>
            <h1 className='inline-flex items-center gap-1 text-2xl font-semibold justify-between'>
              <span className='inline-flex items-center gap-2'>
                <TimerIcon className='w-8 h-8' />
                Continue Watching
              </span>
              {isEdit ? (
                <span
                  className='px-3 py-2 rounded-full bg-neutral-100 cursor-pointer'
                  onClick={() => setIsEdit(false)}
                >
                  Stop editing
                </span>
              ) : (
                <span
                  className='p-2 rounded-full bg-neutral-100 cursor-pointer'
                  onClick={() => setIsEdit(true)}
                >
                  <Pencil2Icon className='w-8 h-8' />
                </span>
              )}
            </h1>
            <div className='flex flex-wrap gap-2'>
              {historyList?.map((video) => (
                <Video key={video.storageId} video={video} isStoraged />
              ))}
            </div>
          </div>
        ) : null}
      </div>
    </main>
  );
}
