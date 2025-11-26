"use client";

import React, { useState } from "react";
import { db } from "../lib/firebase"; // Fixed import from exported db
import { collection, addDoc, serverTimestamp } from "firebase/firestore";

// Detect mobile devices
const isMobile = (): boolean => /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);

// WhatsApp redirect function
const openWhatsApp = (phone: string, message: string) => {
  const encodedMessage = encodeURIComponent(message);
  const url = isMobile()
    ? `https://wa.me/${phone}?text=${encodedMessage}`
    : `https://web.whatsapp.com/send?phone=${phone}&text=${encodedMessage}`;
  window.open(url, "_blank");
};

// Form data type
interface OrderFormData {
  name: string;
  phone: string;
  location: string;
  livestockType: string;
  quantity: number;
}

const Contact: React.FC = () => {
  const [formData, setFormData] = useState<OrderFormData>({
    name: "",
    phone: "",
    location: "",
    livestockType: "",
    quantity: 0,
  });

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  // Handle input change
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === "quantity" ? Number(value) : value,
    }));
  };

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Save order to Firestore
      await addDoc(collection(db, "orders"), {
        ...formData,
        createdAt: serverTimestamp(),
      });

      // Track lead with Meta Pixel
      if (typeof window !== "undefined" && window.fbq) {
        window.fbq("track", "Lead", {
          content_name: formData.livestockType,
          value: formData.quantity,
          currency: "NGN",
        });
      }

      // Open WhatsApp to confirm order
      openWhatsApp(
        "09128264140",
        `Hello, I want to place an order: ${formData.quantity} ${formData.livestockType}. Name: ${formData.name}, Phone: ${formData.phone}, Location: ${formData.location}`
      );

      setSuccess(true);
      setFormData({
        name: "",
        phone: "",
        location: "",
        livestockType: "",
        quantity: 0,
      });
    } catch (err) {
      console.error("Error submitting order:", err);
      alert("Failed to submit order. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-white shadow rounded">
      <h2 className="text-2xl font-bold mb-4">Place Your Livestock Order</h2>
      {success && <p className="text-green-600 mb-4">Order submitted successfully!</p>}
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          placeholder="Full Name"
          required
          className="w-full p-2 border rounded"
        />
        <input
          type="tel"
          name="phone"
          value={formData.phone}
          onChange={handleChange}
          placeholder="Phone Number"
          required
          className="w-full p-2 border rounded"
        />
        <input
          type="text"
          name="location"
          value={formData.location}
          onChange={handleChange}
          placeholder="Location"
          required
          className="w-full p-2 border rounded"
        />
        <select
          name="livestockType"
          value={formData.livestockType}
          onChange={handleChange}
          required
          className="w-full p-2 border rounded"
        >
          <option value="">Select Livestock Type</option>
          <option value="Cattle">Cattle</option>
          <option value="Goat">Goat</option>
          <option value="Sheep">Sheep</option>
          <option value="Chicken">Chicken</option>
        </select>
        <input
          type="number"
          name="quantity"
          value={formData.quantity || ""}
          onChange={handleChange}
          placeholder="Quantity"
          min={1}
          required
          className="w-full p-2 border rounded"
        />
        <button
          type="submit"
          disabled={loading}
          className="w-full bg-green-600 text-white py-2 px-4 rounded hover:bg-green-700 transition"
        >
          {loading ? "Submitting..." : "Place Order"}
        </button>
      </form>
    </div>
  );
};

export default Contact;
