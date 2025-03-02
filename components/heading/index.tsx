"use client";
import ThemeSwitch from "@/components/theme-switch";
import { baseUrl } from "@/lib/utils";
import Logo from "@/public/logo/sv_white.png";
import { GitHubLogoIcon, MagnifyingGlassIcon } from "@radix-ui/react-icons";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";

const Heading = () => {
  const [vname, setVname] = useState("");
  const router = useRouter();
  const pathName = usePathname();
  // console.log('pathName:', pathName);
  const isChannel = pathName.startsWith("/channel");

  return (
    <>
      <div
        className={
          isChannel
            ? "hidden"
            : "w-full sticky top-0 z-10 py-5 bg-background/50 backdrop-blur-2xl"
        }
      >
        <div className="flex justify-between px-10">
          <Link href={baseUrl()}>
            <Image
              src={Logo}
              width="120"
              height="120"
              alt="logo"
              sizes=""
              priority
              className="opacity-0 transition-opacity duration-1000"
              onLoad={(img) => img.currentTarget.classList.remove("opacity-0")}
            />
          </Link>
          <div className="flex justify-end items-center gap-5 ">
            <ThemeSwitch />
            <Link href={"https://github.com/akirco"} target="_blank">
              <Button variant={"ghost"} size={"icon"}>
                <GitHubLogoIcon className="w-4 h-4" />
              </Button>
            </Link>
          </div>
        </div>
      </div>
      <h1
        className={
          isChannel ? "hidden" : "text-5xl font-extrabold text-center p-6"
        }
      >
        What do you want to watch?
      </h1>
      <div
        className={
          isChannel
            ? "m-auto py-2 px-6 w-full flex flex-col gap-2 fixed bg-transparent bottom-5 z-20 child:bg-transparent"
            : "m-auto py-2 px-6 max-w-screen-lg w-full flex flex-col gap-2 sticky top-0 z-20"
        }
      >
        <div className="hover:shadow-2xl hover:shadow-primary hover:ring-0 flex w-full max-w-md items-center space-x-2 m-auto h-14 rounded-full bg-white shadow-primary shadow-2xl">
          <Input
            placeholder="What do you want to watch?"
            className="pl-6 h-12 rounded-full !ring-0 !border-none !outline-none bg-transparent !shadow-none text-primary"
            value={vname}
            onChange={(e) => setVname(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter" && vname.length > 0) {
                router.push(`/search?query=${encodeURIComponent(vname)}`);
              }
            }}
          />
          <button
            className="py-2 px-2 rounded-full cursor-pointer bg-transparent"
            disabled={vname.length <= 0}
            onClick={(_e) =>
              router.push(`/search?query=${encodeURIComponent(vname)}`)
            }
          >
            <MagnifyingGlassIcon className="w-10 h-10 p-2 bg-secondary hover:bg-secondary/90 rounded-full" />
          </button>
        </div>
      </div>
    </>
  );
};

export default Heading;
