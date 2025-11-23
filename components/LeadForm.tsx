import { useState } from "react";

const whatsappLink = process.env.NEXT_PUBLIC_WHATSAPP_REDIRECT;

export default function LeadForm() {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      // send lead to your Nest.js backend
      await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, phone }),
      });

      // small delay to ensure DB write before redirect
      setTimeout(() => {
        if (typeof window !== "undefined" && whatsappLink) {
          window.location.href = whatsappLink;
        }
      }, 500);
    } catch (err) {
      console.error("Error submitting lead:", err);
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-3 max-w-md mx-auto">
      <input
        type="text"
        placeholder="Your Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        required
        className="border p-2 rounded"
      />
      <input
        type="tel"
        placeholder="Phone Number"
        value={phone}
        onChange={(e) => setPhone(e.target.value)}
        required
        className="border p-2 rounded"
      />
      <button
        type="submit"
        disabled={loading}
        className="bg-green-500 text-white p-2 rounded"
      >
        {loading ? "Submitting..." : "Book Now via WhatsApp"}
      </button>
    </form>
  );
}
