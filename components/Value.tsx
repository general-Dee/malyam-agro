"use client"
import React from "react"
import { motion } from "framer-motion"
import { ShieldCheck, Truck, DollarSign, Clock } from "lucide-react"

type Props = {}

export default function Value({}: Props) {
  const values = [
    {
      icon: <ShieldCheck className="w-8 h-8 text-[#C49A6C]" />,
      title: "Vet-Checked & Healthy",
      description:
        "Every animal is inspected, fed, and certified fit before dispatch — ensuring you get only strong, disease-free livestock.",
    },
    {
      icon: <DollarSign className="w-8 h-8 text-[#C49A6C]" />,
      title: "Direct Farm Pricing",
      description:
        "No middlemen or inflated costs. Get honest farm-to-you pricing that helps you save up to 40% compared to open markets.",
    },
    {
      icon: <Truck className="w-8 h-8 text-[#C49A6C]" />,
      title: "Nationwide Delivery",
      description:
        "From Lagos to Kano, Abuja to Port Harcourt — we deliver safely, quickly, and stress-free to your doorstep.",
    },
    {
      icon: <Clock className="w-8 h-8 text-[#C49A6C]" />,
      title: "On-Time Supply",
      description:
        "Whether for festive seasons or large-scale orders, we ensure your livestock arrives when you need it — no excuses.",
    },
  ]

  return (
    <motion.section
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 1.2 }}
      viewport={{ once: true }}
      className="relative w-full bg-gradient-to-b from-[#1b1b1b] via-[#2d1f14] to-[#1a120a] py-16 sm:py-20 md:py-28 px-4 sm:px-6 md:px-12 lg:px-20 overflow-hidden text-white"
    >
      {/* Header */}
      <div className="text-center mb-12 sm:mb-16">
        <h3 className="uppercase tracking-[4px] sm:tracking-[8px] text-[#C49A6C] text-sm sm:text-base font-semibold">
          Why Nigerians Trust Malyam Agro
        </h3>
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mt-2 leading-snug text-[#f5f3f0]">
          Integrity. Quality. Reliability.
        </h2>
        <p className="text-gray-400 mt-3 sm:mt-4 max-w-2xl mx-auto text-xs sm:text-sm md:text-base leading-relaxed">
          Our promise is simple — healthy livestock, honest pricing, and
          dependable service for every Nigerian buyer.
        </p>
      </div>

      {/* Content Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center max-w-6xl mx-auto">
        {/* Image Section */}
        <motion.div
          initial={{ x: -50, opacity: 0 }}
          whileInView={{ x: 0, opacity: 1 }}
          transition={{ duration: 1 }}
          className="flex justify-center"
        >
          <img
            src="./hero/cow02.jpg"
            alt="Healthy livestock"
            className="w-[95%] sm:w-[80%] lg:w-[90%] rounded-2xl object-cover shadow-xl shadow-[#C49A6C]/20 border border-[#C49A6C]/10"
          />
        </motion.div>

        {/* Value Cards Section */}
        <motion.div
          initial={{ x: 50, opacity: 0 }}
          whileInView={{ x: 0, opacity: 1 }}
          transition={{ duration: 1 }}
          className="grid grid-cols-1 sm:grid-cols-2 gap-5 sm:gap-6"
        >
          {values.map((item, i) => (
            <motion.div
              key={i}
              whileHover={{ scale: 1.03 }}
              className="bg-[#241a13]/80 border border-[#C49A6C]/20 p-5 sm:p-6 rounded-2xl shadow-md hover:shadow-lg hover:shadow-[#C49A6C]/30 transition-all duration-300"
            >
              <div className="flex items-center gap-3 mb-3">{item.icon}</div>
              <h4 className="text-lg sm:text-xl font-semibold mb-2 text-[#f5f3f0]">
                {item.title}
              </h4>
              <p className="text-xs sm:text-sm md:text-base text-gray-400 leading-relaxed">
                {item.description}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </motion.section>
  )
}
