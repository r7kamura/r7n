import type { NextApiRequest, NextApiResponse } from "next";
import { generateFeed } from "../../lib/feed";

export default async function handler(
  request: NextApiRequest,
  response: NextApiResponse
) {
  const responseBody = await generateFeed();

  response
    .status(200)
    .setHeader("Content-Type", "application/xml")
    .send(responseBody);
}
