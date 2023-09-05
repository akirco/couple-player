import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  const { video } = await req.json();
  const api = `https://cj.lziapi.com/api.php/provide/vod/?wd=${video}&ac=detail`;
  const response = await fetch(api);
  const json = await response.json();
  return NextResponse.json(json);
}
