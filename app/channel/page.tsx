import Player from '@/components/player';

export default function Channel() {
  return (
    <div className='flex flex-col'>
      <nav>nav</nav>
      <main className='flex md:flex-row flex-col gap-5'>
        <Player />
        <div></div>
      </main>
    </div>
  );
}
