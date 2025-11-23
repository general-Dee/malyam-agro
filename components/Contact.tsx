"use client";

import React, { useState } from "react";
import { db } from "../firebase";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Contact: React.FC = () => {
  const [formData, setFormData] = useState({
    fullName: "",
    whatsapp: "",
    location: "",
    animal: "cow",
    quantity: 1,
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const isMobile = () => {
    if (typeof window === "undefined") return false;
    return /Android|iPhone|iPad|iPod/i.test(navigator.userAgent);
  };

  const redirectToWhatsApp = () => {
    const phoneNumber = "2349128264140"; // business number
    const message = `Hello, my name is ${formData.fullName}. I want to order ${formData.quantity} ${formData.animal}(s).`;
    const url = isMobile()
      ? `whatsapp://send?phone=${phoneNumber}&text=${encodeURIComponent(message)}`
      : `https://web.whatsapp.com/send?phone=${phoneNumber}&text=${encodeURIComponent(message)}`;
    window.location.href = url;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.fullName || !formData.whatsapp || !formData.location) {
      toast.error("Please fill all fields");
      return;
    }

    setLoading(true);
    try {
      await addDoc(collection(db, "leads"), {
        ...formData,
        timestamp: serverTimestamp(),
      });
      toast.success("Submitted successfully!");
      setTimeout(redirectToWhatsApp, 800);
    } catch (err) {
      console.error(err);
      toast.error("Submission failed. Try again.");
    }
    setLoading(false);
  };

  return (
    <div className="w-full max-w-md mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4 text-[#8CC63F] text-center">
        Contact / Place Your Order
      </h2>
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
          name="animal"
          value={formData.animal}
          onChange={handleChange}
          className="border p-3 rounded"
        >
          <option value="cow">Cow</option>
          <option value="goat">Goat</option>
          <option value="ram">Ram</option>
        </select>
        <input
          type="number"
          name="quantity"
          min={1}
          value={formData.quantity}
          onChange={handleChange}
          className="border p-3 rounded"
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
