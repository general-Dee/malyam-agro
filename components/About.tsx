import React from 'react'
import { motion } from 'framer-motion'

type Props = {}

const About = ({}: Props) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 1.5 }}
      viewport={{ once: true }}
      className="flex flex-col relative min-h-screen text-center md:text-left md:flex-row max-w-7xl px-4 sm:px-6 lg:px-10 justify-center items-center mx-auto space-y-12 md:space-y-0 md:space-x-10 py-20"
    >
      {/* Section Title */}
      <h3 className="absolute top-10 sm:top-16 uppercase tracking-[10px] sm:tracking-[20px] text-gray-400 text-xl sm:text-2xl">
        About
      </h3>

      {/* Image */}
      <motion.img
        initial={{ x: -200, opacity: 0 }}
        transition={{ duration: 1.2 }}
        whileInView={{ x: 0, opacity: 1 }}
        viewport={{ once: true }}
        src="./hero/cow02.jpg"
        alt="About Malyam Agro"
        className="w-40 h-40 sm:w-52 sm:h-52 md:w-64 md:h-72 xl:w-[450px] xl:h-[550px] rounded-full md:rounded-2xl object-cover flex-shrink-0 shadow-lg"
      />

      {/* Text Section */}
      <div className="text-gray-100 text-sm sm:text-base md:text-lg space-y-4 sm:space-y-6 px-2 sm:px-6 md:px-10">
        <h4 className="text-2xl sm:text-3xl md:text-4xl font-semibold text-white leading-snug">
          Why Nigerians{' '}
          <span className="underline decoration-[#F7AB0A]/50">Trust</span>{' '}
          Malyam Agro
        </h4>

        <p className="text-gray-200 leading-relaxed">
          We’re not just sellers — we’re partners to farmers, traders, and families across Nigeria.
        </p>

        <p className="text-gray-200 leading-relaxed">
          Here’s why customers love buying from us <span className="font-semibold">Direct From Farm</span>:
        </p>

        <ul className="text-left space-y-3 text-gray-100">
          <li>
            <span className="text-[#F7AB0A] font-bold pr-2">&bull;</span>
            <span>Direct From Farm – You buy straight from source. No inflated market prices.</span>
          </li>
          <li>
            <span className="text-[#F7AB0A] font-bold pr-2">&bull;</span>
            <span>Vet-Checked & Healthy – Every animal is fed, dewormed, and certified before dispatch.</span>
          </li>
          <li>
            <span className="text-[#F7AB0A] font-bold pr-2">&bull;</span>
            <span>Nationwide Delivery – Logistics handled by trusted transport partners.</span>
          </li>
          <li>
            <span className="text-[#F7AB0A] font-bold pr-2">&bull;</span>
            <span>Affordable Pricing – Retail or bulk, we match your budget.</span>
          </li>
          <li>
            <span className="text-[#F7AB0A] font-bold pr-2">&bull;</span>
            <span>Timely Supply – Especially during festive periods, when others delay.</span>
          </li>
        </ul>
      </div>
    </motion.div>
  )
}

export default About
