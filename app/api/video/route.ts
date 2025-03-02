import { NextResponse } from 'next/server';

const flatten = (array: any[]) => {
  let result: any[] = [];
  array.forEach((item) => {
    if (Array.isArray(item)) {
      result = result.concat(flatten(item));
    } else {
      result.push(item);
    }
  });
  return result;
};

export async function POST(req: Request) {
  // const apihost = "https://upxgo.deno.dev"
  // const routs = ["vod_heimuer", "vod_wl"];
  // const apis = routs.map((route) => `${apihost}/${route}`);
  const apis = [
    // 'https://api.wujinapi.me/api.php/provide/vod/?ac=detail&wd=',
    // 'https://collect.wolongzyw.com/api.php/provide/vod/?ac=detail&wd=',
    // 'https://json.heimuer.xyz/api.php/provide/vod/?ac=detail&wd=',
    "https://wolongzy.cc/api.php/provide/vod/?ac=detail&wd=",
    "https://heimuer.tv/api.php/provide/vod/?ac=detail&wd="
  ];

  const { video } = await req.json();
  try {
    const requestPromises = apis.map(async (api) => {
      const res = await fetch(`${api}${video}`);
      const data = await res.json();
      return data.list;
    });
    const results = await Promise.all(requestPromises);

    return NextResponse.json({
      list: flatten(results),
    });
  } catch (error) {
    return NextResponse.json({ error: 'Video not found' });
  }
}
