"use client";
import { useEffect, FC, useState } from "react";
import XGPlayer from "xgplayer";
import "xgplayer/dist/index.min.css";
import { ArrowLeftIcon } from "@radix-ui/react-icons";
import HlsPlayer from "xgplayer-hls.js";
import "@/styles/player.css";
import { useRouter } from "next/navigation";

interface PlayerProps {
  url?: string;
  title?: string;
}

const Player: FC<PlayerProps> = ({ url, title }) => {
  const router = useRouter();
  const [xgplayer, setXgplayer] = useState<XGPlayer | null>(null);

  useEffect(() => {
    const xgplayer = new XGPlayer({
      id: "xgplayer",
      url,
      plugins: [HlsPlayer],
      width: "100%",
      height: "100%",
      fluid: true,
      autoplay: false,
      rotateFullscreen: true,
      videoFillMode: "contain",
      "x5-video-player-fullscreen": true,
      "x5-video-orientation": "landscape",
      playsinline: true,
      useHls: true,
    });
    setXgplayer(xgplayer);
    return () => xgplayer.destroy();
  }, [url]);

  useEffect(() => {
    if (xgplayer) {
      xgplayer.on("canplay", () => {
        xgplayer.play();
      });
      xgplayer.on("timeupdate", (data) => {
        console.log(data);
      });
    }
  }, [xgplayer]);
  return (
    <>
      <div className="hover:bg-opacity-40 flex absolute p-4 flex-row opacity-0 hover:opacity-100 z-40 items-center gap-8 bg-black bg-opacity-0">
        <ArrowLeftIcon
          onClick={() => router.push("/")}
          className="text-white cursor-pointer w-8 h-8"
        />
        <p className="text-white text-1xl md:text-3xl font-bold">
          <span className="font-light">watching : </span>
          {title}
        </p>
      </div>
      <div id="xgplayer"></div>
    </>
  );
};

export default Player;
