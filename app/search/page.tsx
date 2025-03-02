"use client";
import Loading from "@/components/loading";
import { Video } from "@/components/video";
import { VideoList } from "@/types/video";
import { MagnifyingGlassIcon } from "@radix-ui/react-icons";
import { useSearchParams } from "next/navigation";
import { Suspense, useCallback, useEffect, useState } from "react";

function SearchResults() {
  const searchParams = useSearchParams().get("query");
  const [videoList, setVideoList] = useState<VideoList[]>();
  const [isLoading, setIsLoading] = useState(false);

  const fetchVideos = useCallback(() => {
    setIsLoading(true);
    if (searchParams) {
      fetch("/api/video", {
        method: "POST",
        body: JSON.stringify({
          video: searchParams,
        }),
      }).then((response) => {
        response.json().then((res) => {
          console.log("res.list:", res);
          setIsLoading(false);
          setVideoList(res.list);
        });
      });
    }
  }, [searchParams]);

  useEffect(() => {
    fetchVideos();
  }, [fetchVideos, searchParams]);

  return isLoading ? (
    <Loading />
  ) : videoList && videoList.length > 0 ? (
    <div className="m-auto flex flex-col p-5 gap-5 sm:items-start items-center">
      <span className="max-w-[230px] px-3 py-2 select-none rounded-full inline-flex items-center gap-2 bg-secondary">
        <h1 className="inline-flex items-center gap-1 text-2xl font-semibold">
          <MagnifyingGlassIcon className="w-8 h-8" />
          Search results
        </h1>
      </span>
      <div className="flex flex-wrap gap-2">
        {videoList?.map((video) => (
          <Video key={video.vod_id} video={video} />
        ))}
      </div>
    </div>
  ) : (
    <Loading />
  );
}

export default function Search() {
  return (
    <Suspense>
      <div className="flex">
        <SearchResults />
      </div>
    </Suspense>
  );
}
