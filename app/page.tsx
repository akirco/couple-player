'use client';
import { useLocalForage } from '@/app/provider';
import History from '@/components/history';
import { isWebRTCSupported } from '@/lib/utils';
import type { StoragedVideo } from '@/types/video';
import { useEffect, useState } from 'react';

export default function Home() {
  const [historyList, setHistoryList] = useState<StoragedVideo[]>();
  const localforage = useLocalForage();
  const [isRTCSupported, setIsRTCSupported] = useState(false);
  useEffect(() => {
    if (isWebRTCSupported()) {
      setIsRTCSupported(true);
    }
  }, [isWebRTCSupported]);

  const handleRemoveRecord = (storageId: string) => {
    console.log('storageId:', storageId);
    setHistoryList((prevVideos) =>
      prevVideos?.filter((video) => video.storageId !== storageId)
    );
  };

  useEffect(() => {
    const loadHistory = async () => {
      try {
        await localforage?.iterate<StoragedVideo, void>(function (value) {
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
        });
        console.log('Iteration has completed');
      } catch (err) {
        console.error(err);
      }
    };

    loadHistory();
    return () => setHistoryList([]);
  }, [localforage]);

  return (
    <div className="m-auto flex flex-col gap-2">
      {historyList && historyList?.length > 0 ? (
        <History
          historyList={historyList}
          handleRemoveRecord={handleRemoveRecord}
        />
      ) : (
        <span className="text-center dark:text-white/20 text-black/20  pt-14 bottom-8">
          WebRTCSupported:{isRTCSupported ? 'true' : 'false'}
          <br />
          If you want to syncing video, your browser must be support WebRTC.
        </span>
      )}
    </div>
  );
}
