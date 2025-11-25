"use client";

import { useState, useEffect } from "react";
import { addDoc, collection, getFirestore } from "firebase/firestore";
import { app } from "../firebase";

declare global {
  var fbq: ((...args: any[]) => void) | undefined;
  interface Window {
    fbq?: typeof fbq;
  }
}

const db = getFirestore(app);

const Contact: React.FC = () => {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [livestock, setLivestock] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  // Fire Facebook PageView event
  useEffect(() => {
    if (window.fbq) {
      window.fbq("track", "PageView");
    }
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      await addDoc(collection(db, "orders"), {
        name,
        phone,
        livestock,
        message,
        createdAt: new Date(),
      });

      // Fire Facebook Lead event
      if (window.fbq) {
        window.fbq("track", "Lead", {
          name,
          phone,
          livestock,
        });
      }

      // WhatsApp redirect
      const baseUrl = /Mobi|Android/i.test(navigator.userAgent)
        ? "https://wa.me/2349128264140"
        : "https://web.whatsapp.com/send?phone=2349128264140";

      const text = `Hi, I would like to order: ${livestock}. Name: ${name}, Phone: ${phone}, Message: ${message}`;
      window.open(`${baseUrl}?text=${encodeURIComponent(text)}`, "_blank");

      // Reset form
      setName("");
      setPhone("");
      setLivestock("");
      setMessage("");
    } catch (err) {
      console.error("Error submitting order:", err);
      alert("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-lg mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">Place Your Livestock Order</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          placeholder="Full Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
          className="w-full border p-2 rounded"
        />
        <input
          type="tel"
          placeholder="Phone Number"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          required
          className="w-full border p-2 rounded"
        />
        <input
          type="text"
          placeholder="Livestock Order (e.g. 5 goats)"
          value={livestock}
          onChange={(e) => setLivestock(e.target.value)}
          required
          className="w-full border p-2 rounded"
        />
        <textarea
          placeholder="Additional Message"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          className="w-full border p-2 rounded"
        />
        <button
          type="submit"
          disabled={loading}
          className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
        >
          {loading ? "Submitting..." : "Submit Order"}
        </button>
      </form>
    </div>
  );
};

export default Contact;
