"use client";

import { useEffect } from "react";

const Contact: React.FC = () => {
  useEffect(() => {
    // Helper function to track events
    const trackEvent = (eventName: string) => {
      if (typeof window.fbq === "function") {
        window.fbq("track", eventName);
      }
    };

    // Detect WhatsApp links
    const whatsappLinks = Array.from(
      document.querySelectorAll<HTMLAnchorElement>(
        'a[href^="https://wa.me/"], a[href^="https://api.whatsapp.com/"]'
      )
    );

    // Attach click listeners
    whatsappLinks.forEach((link) => {
      link.addEventListener("click", () => trackEvent("Contact"));
    });

    // Cleanup event listeners on unmount
    return () => {
      whatsappLinks.forEach((link) => {
        link.removeEventListener("click", () => trackEvent("Contact"));
      });
    };
  }, []);

  return (
    <section className="contact-section p-4 md:p-8">
      <h2 className="text-2xl font-bold mb-4">Contact Us</h2>
      <p className="mb-4">
        Have questions or want to place an order? Click the WhatsApp button below to chat with us directly.
      </p>
      <a
        href="https://wa.me/1234567890"
        target="_blank"
        rel="noopener noreferrer"
        className="inline-block bg-green-500 text-white px-6 py-3 rounded-lg hover:bg-green-600 transition"
      >
        Chat on WhatsApp
      </a>
    </section>
  );
};

export default Contact;
