import { PrismaClient } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function GET(req: NextRequest, res: NextResponse) {
  // Fetch your podcast episodes data
  const episodes = await prisma.episode.findMany({
    where: { published: true },
  });

  // Generate RSS feed content
  const feed = `<?xml version="1.0" encoding="UTF-8"?>
    <rss version="2.0" xmlns:itunes="http://www.itunes.com/dtds/podcast-1.0.dtd" xmlns:content="http://purl.org/rss/1.0/modules/content/">
      <channel>
        <title>Draft 1, Take 2</title>
        <description>Movies, movies, movies. Let's talk about them!</description>
		<itunes:image>https://draft1take2.com/images/show_artwork.jpg</itunes:image>
		<language>en-us</language>
		<itunes:category text="TV &amp; Film"> <itunes:category text="Film Reviews" /></itunes:category>
		<itunes:explicit>false</itunes:explicit>
		<itunes:author>Luke Chigges and Callie Waligora</itunes:author>
        <link>https://draft1take2.com</link>
		<itunes:owner><itunes:email>pod@chigges.com</itunes:email><itunes:name>Luke Chigges</itunes:name></itunes:owner>
        ${episodes
          .map(
            (episode: any) => `
          <item>
            <title>${episode.title}</title>
            <description>${episode.description}</description>
            <enclosure url="${episode.audioUrl}" type="audio/mpeg"/>
            <pubDate>${new Date(episode.createdAt).toUTCString()}</pubDate>
          </item>
        `,
          )
          .join("")}
      </channel>
    </rss>
  `;
  const response = new NextResponse(feed);
  response.headers.set("Content-Type", "application/rss+xml");
  response.headers.set(
    "Content-Disposition",
    'attachment; filename="feed.xml"',
  );
  return response;
}
