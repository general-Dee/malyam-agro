import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const { eventName, eventData } = req.body;

    // You can integrate with Meta Pixel server-side or just log for now
    console.log("Tracking event:", eventName, eventData);

    return res.status(200).json({ status: "ok" });
  } catch (error) {
    console.error("Error tracking event:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
}
