import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") return res.status(405).json({ error: "Method not allowed" });

  const { event_name, event_id, event_data } = req.body;

  if (!event_name || !event_id || !event_data) {
    return res.status(400).json({ error: "Missing required parameters" });
  }

  try {
    const response = await fetch(
      `https://graph.facebook.com/v18.0/${process.env.FB_PIXEL_ID}/events`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          data: [
            {
              event_name,
              event_time: Math.floor(Date.now() / 1000),
              action_source: "website",
              event_id,
              user_data: {
                client_ip_address: req.headers["x-forwarded-for"] || req.socket.remoteAddress,
                client_user_agent: req.headers["user-agent"],
              },
              custom_data: event_data,
            },
          ],
          access_token: process.env.FB_ACCESS_TOKEN,
        }),
      }
    );

    const result = await response.json();
    res.status(200).json(result);
  } catch (err) {
    console.error("CAPI error:", err);
    res.status(500).json({ error: "Failed to send event to Meta" });
  }
}
