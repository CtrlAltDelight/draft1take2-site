import { PrismaClient } from "@prisma/client";
import { NextApiRequest, NextApiResponse } from "next";
import { NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function GET(req: NextApiRequest, res: NextApiResponse) {
  // Fetch your podcast episodes data
  const episodes = await prisma.post.findMany({
    where: { published: true },
  });

  // Generate RSS feed content
  const feed = `<?xml version="1.0" encoding="UTF-8"?>
    <rss version="2.0">
      <channel>
        <title>Your Podcast Title</title>
        <link>Your Website URL</link>
        <description>Your Podcast Description</description>
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