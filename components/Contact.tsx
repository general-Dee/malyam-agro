"use client";

import React, { useState } from "react";
import { db } from "../firebase";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// ---- TRACK LEAD EVENT (Pixel + CAPI) ----
async function trackLeadEvent(data: any, eventId: string) {
  try {
    // Client-side Pixel
    if (typeof window !== "undefined" && (window as any).fbq) {
      (window as any).fbq("track", "Lead", {
        ...data,
        event_id: eventId,
      });
    }

    // Server-side CAPI
    await fetch("/api/events/track", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        event_name: "Lead",
        event_id: eventId,
        event_data: data,
      }),
    });
  } catch (error) {
    console.warn("CAPI tracking failed:", error);
  }
}

// ---- WHATSAPP REDIRECT ----
function redirectToWhatsApp(fullName: string, animalType: string, order: string) {
  const salesNumber = "2349128264140";

  const message = encodeURIComponent(
    `Hello, my name is ${fullName}. I’m interested in ${animalType} (${order} units).`
  );

  const waMobile = `whatsapp://send?phone=${salesNumber}&text=${message}`;
  const waWeb = `https://wa.me/${salesNumber}?text=${message}`;

  const isMobile = /Android|iPhone|iPad|iPod|webOS|BlackBerry|IEMobile|Opera Mini/i.test(
    navigator.userAgent
  );

  if (isMobile) {
    window.location.href = waMobile;
  } else {
    window.open(waWeb, "_blank");
  }
}

// --------------------------------------------------

const Contact: React.FC = () => {
  const [formData, setFormData] = useState({
    fullName: "",
    whatsapp: "",
    location: "",
    animalType: "Cow",
    order: "",
  });

  const [loading, setLoading] = useState(false);

  const isValidNigeriaNumber = (num: string) => {
    const cleaned = num.replace(/\D/g, "");
    return /^0\d{10}$/.test(cleaned); // must start with 0 + 10 digits
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const { fullName, whatsapp, location, animalType, order } = formData;

    // ---- Validation ----
    if (!fullName || !whatsapp || !location || !animalType || !order) {
      toast.error("Please fill out all fields!");
      setLoading(false);
      return;
    }

    if (!isValidNigeriaNumber(whatsapp)) {
      toast.error("Enter a valid Nigerian number (11 digits starting with 0)");
      setLoading(false);
      return;
    }

    const whatsappIntl = whatsapp.replace(/\D/g, "").replace(/^0/, "234");

    // ---- Save lead to Firestore ----
    try {
      await addDoc(collection(db, "livestockLeads"), {
        fullName: fullName.trim(),
        whatsapp: whatsappIntl,
        location: location.trim(),
        animalType,
        order: order.trim(),
        createdAt: serverTimestamp(),
      });

      toast.success("Submission successful! Redirecting to WhatsApp...");

      // ---- Trigger Tracking (non-blocking) ----
      const eventId = self.crypto?.randomUUID?.() || Math.random().toString(36);
      trackLeadEvent(
        {
          fullName,
          whatsapp: whatsappIntl,
          location,
          animalType,
          order,
        },
        eventId
      );
    } catch (error) {
      console.error("Firestore error:", error);
      toast.error("Error submitting your details. Please try again.");
      setLoading(false);
      return; // ⛔ Do not redirect if Firestore failed
    }

    // ---- Clear form ----
    setFormData({
      fullName: "",
      whatsapp: "",
      location: "",
      animalType: "Cow",
      order: "",
    });

    // ---- Redirect after success ----
    setTimeout(() => {
      redirectToWhatsApp(fullName, animalType, order);
    }, 1000);

    setLoading(false);
  };

  return (
    <div className="flex flex-col items-center justify-center px-4 py-16 text-center bg-[rgb(36,36,36)]">
      <h2 className="text-3xl font-bold mb-8 text-[#8CC63F]">Get in Touch with Us</h2>

      <form
        onSubmit={handleSubmit}
        className="w-full max-w-md bg-white rounded-2xl shadow-lg p-6 space-y-4"
      >
        <input
          name="fullName"
          type="text"
          placeholder="Full Name"
          value={formData.fullName}
          onChange={handleChange}
          required
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-[#8CC63F]"
        />

        <input
          name="whatsapp"
          type="tel"
          placeholder="WhatsApp Number (e.g., 08012345678)"
          value={formData.whatsapp}
          onChange={handleChange}
          required
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-[#8CC63F]"
        />

        <input
          name="location"
          type="text"
          placeholder="Location"
          value={formData.location}
          onChange={handleChange}
          required
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-[#8CC63F]"
        />

        <select
          name="animalType"
          value={formData.animalType}
          onChange={handleChange}
          required
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-[#8CC63F]"
        >
          <option value="Cow">Cow</option>
          <option value="Goat">Goat</option>
          <option value="Ram">Ram</option>
        </select>

        <input
          name="order"
          type="text"
          placeholder="Order Quantity"
          value={formData.order}
          onChange={handleChange}
          required
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-[#8CC63F]"
        />

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-[#8CC63F] text-white font-semibold py-2 rounded-lg hover:bg-[#7AB034] transition-colors"
        >
          {loading ? "Submitting..." : "Submit"}
        </button>
      </form>
    </div>
  );
};

export default Contact;
