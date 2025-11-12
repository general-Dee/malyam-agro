import React from "react"
import { motion } from "framer-motion"
import ExperienceCard from "./ExperienceCard"

type Props = {}

function Experience({}: Props) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 1.5 }}
      className="min-h-screen flex relative overflow-hidden flex-col text-left max-w-full justify-evenly mx-auto items-center px-3 sm:px-6 md:px-10"
    >
      {/* Section Title */}
      <h3 className="absolute top-16 sm:top-20 uppercase tracking-[5px] sm:tracking-[10px] md:tracking-[20px] text-gray-500 text-base sm:text-lg md:text-2xl text-center w-full">
        Gains
      </h3>

      {/* Horizontal Scroll Cards */}
      <div className="w-full flex space-x-4 sm:space-x-6 md:space-x-8 overflow-x-scroll snap-x snap-mandatory scrollbar-thin scrollbar-track-gray-400/20 scrollbar-thumb-[#7FAB0A] pt-28 sm:pt-32 pb-10">
        <ExperienceCard
          title="Healthy, Vet-Certified Livestock"
          imageUrl="./hero/cow03.jpg"
          heading="Get Strong, Disease-Free Animals — Guaranteed by Professional Vets"
          description="Every cow, ram, and goat is inspected, dewormed, and properly fed before delivery. You receive healthy livestock ready for resale or immediate use — no surprises, no sick animals, and no extra vet costs."
        />

        <ExperienceCard
          title="Direct Farm Pricing (No Middlemen)"
          imageUrl="./perks/perks.jpg"
          heading="Save 25–40% Instantly — Buy Straight From the Source"
          description="We remove market middlemen who inflate prices. Buying directly from Malyam Agro means you get farm-to-you pricing — honest, transparent, and always more affordable than local markets."
        />

        <ExperienceCard
          title="Fast Nationwide Delivery"
          imageUrl="./perks/perks02.jpg"
          heading="Get Your Livestock Anywhere in Nigeria Within 3–5 Days"
          description="Whether you’re in Lagos, Abuja, or Kano, we deliver safely and on time. No transport headaches, no excuses — just healthy livestock arriving exactly when you need them."
        />

        <ExperienceCard
          title="Flexible Order Sizes"
          imageUrl="./perks/perks04.jpg"
          heading="Order 1 or 100 — Every Customer Is a Priority"
          description="We serve both individuals and bulk buyers. Whether you need one ram for the family or a truckload for resale, we handle every order with equal care and professional logistics."
        />
      </div>
    </motion.div>
  )
}

export default Experience
