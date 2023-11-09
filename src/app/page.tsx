import Image from 'next/image'
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function getEpisodes() {
  // Fetch your podcast episodes data
  const episodes = await prisma.post.findMany({
    where: { published: true },
  });

  return episodes;
}

export default async function Home() {
  const episodes = await getEpisodes();
  return (
    <main className="flex min-h-screen flex-col  items-center justify-between p-24">
      <div className="z-10 max-w-5xl w-full items-center justify-between font-mono text-sm lg:flex">
		{episodes.map((episode: any) => 
			<div key={episode.id}>{episode.title}</div>
		)}
      </div>
    </main>
  )
}
