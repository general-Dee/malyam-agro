import React from 'react'
import { motion } from 'framer-motion'

type Props = {}

function Projects({}: Props) {
  const projects = [
    {
      title: "Alhaji Musa B., Kano",
      subtitle: "Best Price I’ve Seen This Season!",
      displayImg: "./projects/tes02.jpg",
      discription:
        "Their direct farm pricing is real. I saved ₦60,000 on two rams for our mosque event. Smooth from start to finish.",
    },
    {
      title: "Chika N., Livestock Vendor, Enugu",
      subtitle: "Reliable Partner for My Meat Business",
      displayImg: "./projects/tes01.jpg",
      discription:
        "Reliable partner. Every goat was healthy, correctly weighed, and delivered on time. My customers were happy — I made solid profits.",
    },
    {
      title: "Mrs. Rebecca O., Port Harcourt",
      subtitle: "They Made My Party a Success!",
      displayImg: "./projects/tes04.jpg",
      discription:
        "We ordered 3 cows for a family event. Delivery was perfectly timed and stress-free. They made our party a success!",
    },
    {
      title: "Mrs. Adewale A., Lagos",
      subtitle: "Professional From Start to Finish!",
      displayImg: "./projects/tes06.jpg",
      discription:
        "Customer service was professional and responsive. I got exactly what I ordered — no excuses, no surprises.",
    },
  ]

  return (
    <motion.div
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 1.5 }}
      className="min-h-screen flex relative overflow-hidden flex-col text-left max-w-full justify-evenly mx-auto items-center z-0 px-3 sm:px-6 md:px-10"
    >
      <h3 className="absolute top-16 sm:top-20 uppercase tracking-[5px] sm:tracking-[10px] md:tracking-[20px] text-gray-500 text-base sm:text-lg md:text-2xl text-center w-full">
        Real Nigerians. Real Results
      </h3>

      <div className="relative w-full flex overflow-x-scroll overflow-y-hidden snap-x snap-mandatory z-20 scrollbar-thin scrollbar-track-gray-400/20 scrollbar-thumb-[#7FAB0A] pt-28 sm:pt-32">
        {projects.map((project, i) => (
          <div
            key={i}
            className="w-screen flex-shrink-0 snap-center flex flex-col space-y-4 sm:space-y-6 justify-center px-4 sm:px-8 md:px-20 items-center"
          >
            <motion.img
              initial={{ y: -100, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              transition={{ duration: 1.2 }}
              viewport={{ once: true }}
              className="w-[120px] h-[120px] xs:w-[140px] xs:h-[140px] sm:w-[180px] sm:h-[180px] md:w-[220px] md:h-[220px] rounded-lg object-cover"
              src={project.displayImg}
              alt={project.title}
            />

            <div className="space-y-3 sm:space-y-5 max-w-xs xs:max-w-sm sm:max-w-md md:max-w-3xl text-center">
              <h4 className="text-lg xs:text-xl sm:text-2xl md:text-4xl font-semibold leading-snug">
                <span className="block underline decoration-[#F7AB0A]/50 text-xs xs:text-sm sm:text-base md:text-lg mb-1">
                  Case study {i + 1} of {projects.length}:
                </span>
                {project.title}
              </h4>

              <p className="text-xs xs:text-sm sm:text-base md:text-lg font-medium text-gray-300">
                {project.subtitle}
              </p>
              <p className="text-xs xs:text-sm sm:text-base md:text-lg text-gray-400 leading-relaxed">
                {project.discription}
              </p>
            </div>
          </div>
        ))}
      </div>

      <div className="w-full absolute top-[35%] bg-[#A67C52]/10 left-0 h-[300px] sm:h-[400px] md:h-[500px] -skew-y-12"></div>
    </motion.div>
  )
}

export default Projects
