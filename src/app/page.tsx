import Image from 'next/image'
import { PrismaClient } from "@prisma/client";
import art from '../../public/images/show_artwork.png'
import callieImage from '../../public/images/callieImage.jpg'
import lukeImage from '../../public/images/lukeImage.jpg'

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
		<div className="bg-sas-black">
			<div className="bg-sas-brown md:w-5/6 w-auto m-auto">
				<header className='bg-sas-maroon text-sas-tan h-32 flex rounded-b-3xl'>
					<h2 className='font-serif ml-2 md:ml-5 self-center text-6xl'>Draft 1, Take 2</h2>
				</header>
				<main className="flex text-sas-orange items-center min-h-screen flex-col mt-20 gap-y-10">
					<Image
						className="mx-auto"
						src={art}
						alt="An image of beer and film reels"
						width={900}
					/>
					<section className="w-5/6 bg-sas-black rounded-2xl p-4 shadow-black fbg-gradient-to-tan from-black flex flex-col gap-8">
						<h2 className="text-center text-2xl font-bold">Meet your hosts!</h2>
						<div className='grid grid-rows-3 grid-cols-3 gap-4'>
							<div className='rounded row-span-3'> 
								<Image
									className="rounded object-cover w-full"
									src={callieImage}
									alt="A picture of Callie J. Waligora"
								/>
							</div>
							<div className='rounded col-span-2 bg-sas-maroon p-2 text-black flex items-center justify-center'>Callie J. Waligora</div>
							<div className='rounded row-span-2 col-span-2 bg-sas-tan p-2 text-black flex items-center justify-center'>Here is where I would put her description... IF I HAD ONE!</div>
						</div>
						<div className='grid grid-rows-3 grid-cols-3 gap-4'>
							<div className='rounded col-span-2 bg-sas-maroon p-2 text-black flex items-center justify-center'>
								<p>Coming in from stage right... Luke Chigges!</p>
							</div>
							<div className='row-span-3'>
								<Image
									className="object-cover w-full rounded"
									src={lukeImage}
									alt="A picture of Luke Chigges"
								/>
							</div>
							<div className='rounded col-span-2 row-span-2 bg-sas-tan p-2 text-black flex items-center justify-center'>
								<p>From the deserts of Tatooine to the mountains of Mordor, this IPA loving everyman is ready to talk about all things film. 
								I believe every movie has a lesson, and every beer has a story.</p>
							</div>
						</div>
					</section>
					<section className="w-5/6 bg-sas-black rounded-2xl p-4 mb-8">
						<h2 className="text-center text-2xl mb-4 font-bold">Listen to our episodes!</h2>
						<div className="grid-cols-1 grid-flow-row gap-4">
							{episodes.map((episode: any) => (
									<div key={episode.id}>{episode.title} - {episode.content}</div>
								)
							)}
						</div>
					</section>
				</main>
				<footer className="p-4 bg-sas-maroon rounded-t-2xl">
					<p className='font-serif'>Questions? Email us at pod@draft1take2.com</p>
				</footer>
			</div>
		</div>
	)
}
