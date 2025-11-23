import type { NextApiRequest, NextApiResponse } from "next";

// This route will receive tracking events from the frontend
export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const { eventName, eventData } = req.body;

    // Example: log it to console (or save to Firestore / analytics)
    console.log("Tracking event:", eventName, eventData);

    // TODO: You can integrate Firebase, Meta Pixel server-side events, or any other tracking here

    return res.status(200).json({ status: "ok" });
  } catch (error) {
    console.error("Error tracking event:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
}
