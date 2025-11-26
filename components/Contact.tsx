"use client";

import React, { useState } from "react";
import { fbq } from "../lib/fbq"; // relative import
import { db } from "../lib/firebase"; // relative import
import { collection, addDoc, Timestamp } from "firebase/firestore";

export default function Contact() {
  const [form, setForm] = useState({ name: "", phone: "", message: "" });
  const [loading, setLoading] = useState(false);

  const isMobile = typeof window !== "undefined" && /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
  const whatsappBase = isMobile
    ? "https://api.whatsapp.com/send?phone=2347063596824&text="
    : "https://web.whatsapp.com/send?phone=2347063596824&text=";

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Save to Firestore
      await addDoc(collection(db, "leads"), {
        ...form,
        createdAt: Timestamp.now(),
      });

      // Pixel Track Lead
      fbq("track", "Lead", {
        name: form.name,
        phone: form.phone,
      });

      // Redirect to WhatsApp
      const encoded = encodeURIComponent(
        `Hello, my name is ${form.name}. ${form.message}. My phone number is ${form.phone}.`
      );
      window.location.href = whatsappBase + encoded;
    } catch (err) {
      console.error("Error submitting form", err);
      alert("Something went wrong. Try again.");
    }

    setLoading(false);
  };

  return (
    <div className="p-6 bg-white rounded-xl shadow-md max-w-lg mx-auto">
      <h2 className="text-2xl font-bold mb-4">Contact Us</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          name="name"
          type="text"
          placeholder="Enter your name"
          value={form.name}
          onChange={handleChange}
          className="w-full border p-3 rounded"
          required
        />

        <input
          name="phone"
          type="tel"
          placeholder="Phone number"
          value={form.phone}
          onChange={handleChange}
          className="w-full border p-3 rounded"
          required
        />

        <textarea
          name="message"
          placeholder="Message"
          value={form.message}
          onChange={handleChange}
          className="w-full border p-3 rounded"
          rows={4}
        />

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-green-600 text-white p-3 rounded font-bold hover:bg-green-700"
        >
          {loading ? "Processing..." : "Submit & Chat on WhatsApp"}
        </button>
      </form>
    </div>
  );
}