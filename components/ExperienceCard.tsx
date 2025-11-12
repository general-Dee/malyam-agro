import React from "react"
import { motion } from "framer-motion"

type Props = {
  title: string
  imageUrl: string
  heading: string
  description: string
}

function ExperienceCard({ title, imageUrl, heading, description }: Props) {
  return (
    <article className="flex flex-col rounded-lg items-center space-y-4 flex-shrink-0 w-[85%] xs:w-[80%] sm:w-[70%] md:w-[500px] lg:w-[600px] snap-center bg-[#292929] p-4 sm:p-6 md:p-10 hover:opacity-100 opacity-90 cursor-pointer transition-opacity duration-200 overflow-hidden">
      <motion.img
        initial={{ y: -100, opacity: 0 }}
        whileInView={{ y: 0, opacity: 1 }}
        transition={{ duration: 1.2 }}
        viewport={{ once: true }}
        className="w-[160px] h-[160px] sm:w-[200px] sm:h-[200px] object-cover rounded-lg"
        src={imageUrl}
        alt={title}
      />

      <div className="px-2 sm:px-4 md:px-6 text-center space-y-3">
        <h4 className="text-base xs:text-lg sm:text-xl md:text-2xl font-semibold text-white">
          {title}
        </h4>
        <p className="text-xs xs:text-sm sm:text-base md:text-lg text-[#F7AB0A] font-medium">
          {heading}
        </p>
        <p className="text-xs xs:text-sm sm:text-base md:text-lg text-gray-300 leading-relaxed">
          {description}
        </p>
      </div>
    </article>
  )
}

export default ExperienceCard
