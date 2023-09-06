'use client';
import { Settings } from '@/components/settings';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { GitHubLogoIcon, MagnifyingGlassIcon } from '@radix-ui/react-icons';
import { useState } from 'react';
import type { VideoList } from '@/types/video';
import { Video } from '@/components/video';
import Loading from '@/components/loading';

export default function Home() {
  const [vname, setVname] = useState('');
  const [videoList, setVideoList] = useState<VideoList[]>();
  const [isLoading, setIsLoading] = useState(false);
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
        <Button variant={'ghost'} size={'icon'}>
          <GitHubLogoIcon className='w-4 h-4' />
        </Button>
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
        ) : null}
      </div>
    </main>
  );
}
