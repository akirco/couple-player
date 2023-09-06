import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  const { video } = await req.json();
  const api = `https://api.wujinapi.me/api.php/provide/vod/?ac=detail&wd=${video}`;
  const response = await fetch(api);
  const json = await response.json();
  return NextResponse.json(json);
}
