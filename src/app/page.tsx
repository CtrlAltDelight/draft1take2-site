import Image from 'next/image'
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function getEpisodes() {
	// Fetch your podcast episodes data
	const episodes = await prisma.episode.findMany({
	where: { published: true },
	});

	return episodes;
}

export default async function Home() {
	const episodes = await getEpisodes();
	return (
		<div className="bg-gray-400">
			<div className="bg-gray-600 md:w-5/6 w-auto m-auto">
				<header className='bg-gray-800 h-32 flex'>
					<h2 className='font-serif ml-5 self-center text-6xl'>Draft 1, Take 2</h2>
				</header>
				<main className="flex items-center min-h-screen flex-col pt-20 gap-y-14">
					<section className="w-5/6">
						<h2 className="text-center text-2xl font-bold">Meet the hosts!</h2>
						<div className='flex justify-around'>
							<div className='flex flex-col items-center'>
								<h3 className='text-xl'>Callie</h3>
								<p>A Hollywood script supervisor.</p>
							</div>
							<div className='flex flex-col items-center'>
								<h3 className='text-xl'>Luke</h3>
								<p>A web designer...</p>
							</div>
						</div>
					</section>
					<section className='w-5/6'>
						<h2 className="text-center text-2xl font-bold">Listen to our episodes!</h2>
						<div className="">
							{episodes.map((episode: any) => 
								<div key={episode.id}>{episode.title} - {episode.content}</div>
							)}
						</div>
					</section>
				</main>
				<footer className="p-4 bg-gray-800">
					<p className='font-serif'>Questions? Email us at pod@chigges.com</p>
				</footer>
			</div>
		</div>
	)
}
