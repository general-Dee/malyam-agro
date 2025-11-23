"use client";

import React, { useState } from "react";
import { db } from "../firebase";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// Access WhatsApp number from environment variable
const WHATSAPP_NUMBER = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "2349128264140";

const Contact: React.FC = () => {
  const [formData, setFormData] = useState({
    fullName: "",
    whatsapp: "",
    location: "",
    cowType: "",
    quantity: "",
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const isMobile = () => {
    if (typeof window === "undefined") return false;
    return /Android|iPhone|iPad|iPod/i.test(navigator.userAgent);
  };

  const redirectToWhatsApp = () => {
    const message = `Hello, my name is ${formData.fullName}. I want to order ${formData.quantity} ${formData.cowType}(s) from ${formData.location}. My WhatsApp number is ${formData.whatsapp}.`;

    const url = isMobile()
      ? `whatsapp://send?phone=${WHATSAPP_NUMBER}&text=${encodeURIComponent(message)}`
      : `https://web.whatsapp.com/send?phone=${WHATSAPP_NUMBER}&text=${encodeURIComponent(message)}`;

    window.location.href = url;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const { fullName, whatsapp, location, cowType, quantity } = formData;
    if (!fullName || !whatsapp || !location || !cowType || !quantity) {
      toast.error("Please fill all fields");
      return;
    }

    setLoading(true);

    try {
      // Save lead to Firestore
      await addDoc(collection(db, "leads"), {
        ...formData,
        timestamp: serverTimestamp(),
      });

      // Fire Meta Pixel Lead event
      if (typeof window !== "undefined" && window.fbq) {
        window.fbq("track", "Lead", {
          content_name: "Livestock Landing Page",
        });
      }

      toast.success("Submitted successfully!");

      // Redirect to WhatsApp after short delay
      setTimeout(() => {
        redirectToWhatsApp();
      }, 800);
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong. Try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full max-w-md mx-auto p-4">
      <form onSubmit={handleSubmit} className="flex flex-col space-y-4">
        <input
          type="text"
          name="fullName"
          placeholder="Full Name"
          value={formData.fullName}
          onChange={handleChange}
          className="border p-3 rounded"
        />

        <input
          type="text"
          name="whatsapp"
          placeholder="WhatsApp Number (e.g., 08012345678)"
          value={formData.whatsapp}
          onChange={handleChange}
          className="border p-3 rounded"
        />

        <input
          type="text"
          name="location"
          placeholder="Location"
          value={formData.location}
          onChange={handleChange}
          className="border p-3 rounded"
        />

        <select
          name="cowType"
          value={formData.cowType}
          onChange={handleChange}
          className="border p-3 rounded"
        >
          <option value="">Select Cow Type</option>
          <option value="Local">Local</option>
          <option value="Exotic">Exotic</option>
          <option value="Crossbreed">Crossbreed</option>
        </select>

        <input
          type="number"
          name="quantity"
          placeholder="Order Quantity"
          value={formData.quantity}
          onChange={handleChange}
          className="border p-3 rounded"
          min={1}
        />

        <button
          type="submit"
          disabled={loading}
          className="bg-green-600 text-white p-3 rounded"
        >
          {loading ? "Submitting..." : "Submit & Chat on WhatsApp"}
        </button>
      </form>
    </div>
  );
};

export default Contact;
