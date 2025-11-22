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
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const isMobile = () => {
    if (typeof window === "undefined") return false;
    return /Android|iPhone|iPad|iPod/i.test(navigator.userAgent);
  };

  const redirectToWhatsApp = () => {
    const phoneNumber = "2349128264140"; // <- replace with your business WhatsApp number

    const message = `Hello, my name is ${formData.fullName}. I just filled the form.`;

    if (isMobile()) {
      // Mobile App
      window.location.href = `whatsapp://send?phone=${phoneNumber}&text=${encodeURIComponent(
        message
      )}`;
    } else {
      // Desktop / Laptop
      window.location.href = `https://web.whatsapp.com/send?phone=${phoneNumber}&text=${encodeURIComponent(
        message
      )}`;
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.fullName || !formData.whatsapp) {
      toast.error("Please fill all fields");
      return;
    }

    setLoading(true);

    try {
      await addDoc(collection(db, "leads"), {
        fullName: formData.fullName,
        whatsapp: formData.whatsapp,
        timestamp: serverTimestamp(),
      });

      toast.success("Submitted successfully!");

      // redirect after submitting
      setTimeout(() => {
        redirectToWhatsApp();
      }, 800);
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong. Try again.");
    }

    setLoading(false);
  };

  return (
    <div className="w-full max-w-md mx-auto p-4">
      <form onSubmit={handleSubmit} className="flex flex-col space-y-4">

        <input
          type="text"
          name="fullName"
          placeholder="Enter your full name"
          value={formData.fullName}
          onChange={handleChange}
          className="border p-3 rounded"
        />

        <input
          type="text"
          name="whatsapp"
          placeholder="Enter your WhatsApp number"
          value={formData.whatsapp}
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
