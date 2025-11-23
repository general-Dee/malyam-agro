"use client";

import React, { useEffect } from "react";
import Pixel from "../../../../components/Pixel";
import { db } from "../../../../firebase";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const TrackPage: React.FC = () => {
  useEffect(() => {
    // Example: Track custom event when page loads
    if (typeof window !== "undefined" && window.fbq) {
      window.fbq("track", "ViewContent", {
        content_name: "Events Tracking Page",
        content_category: "Events",
      });
    }

    // Example: Send a dummy lead to Firestore
    const sendDummyLead = async () => {
      try {
        await addDoc(collection(db, "leads"), {
          fullName: "Dummy User",
          whatsapp: "0000000000",
          timestamp: serverTimestamp(),
          page: "events/track",
        });
      } catch (error) {
        console.error("Firestore error:", error);
      }
    };

    sendDummyLead();
  }, []);

  return (
    <div className="min-h-screen bg-gray-900 text-green-500 flex flex-col items-center justify-center">
      <Pixel />
      <h1 className="text-3xl font-bold mb-4">Events Tracking Page</h1>
      <p className="text-center">
        This page is fully client-side and reports to Pixel & Firestore safely.
      </p>
    </div>
  );
};

export default TrackPage;
