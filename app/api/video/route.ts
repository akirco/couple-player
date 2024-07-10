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
  const apis = [
    'https://api.wujinapi.me/api.php/provide/vod/?ac=detail&wd=',
    'https://collect.wolongzyw.com/api.php/provide/vod/?ac=detail&wd=',
    // 'https://json.heimuer.xyz/api.php/provide/vod/?ac=detail&wd=',
  ];

  const { video } = await req.json();
  try {
    const requestPromises = apis.map(async (api) =>
      fetch(`${api}${video}`).then((res) =>
        res.json().then((data) => data.list)
      )
    );
    const results = await Promise.all(requestPromises);
    return NextResponse.json({
      list: flatten(results),
    });
  } catch (error) {
    return NextResponse.json({ error: 'Video not found' });
  }
}
