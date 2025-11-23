// /pages/api/track.ts
import type { NextApiRequest, NextApiResponse } from "next";
import { db } from "../../firebase";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "POST") {
    const { fullName, whatsapp, animal, quantity } = req.body;
    try {
      await addDoc(collection(db, "leads"), {
        fullName,
        whatsapp,
        animal,
        quantity,
        timestamp: serverTimestamp(),
      });
      res.status(200).json({ message: "Tracked successfully" });
    } catch (err) {
      res.status(500).json({ error: "Tracking failed" });
    }
  } else {
    res.status(405).json({ error: "Method not allowed" });
  }
}
