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
      className="min-h-screen flex relative overflow-hidden flex-col text-left md:flex-row max-w-full justify-evenly mx-auto items-center z-0 px-4 sm:px-6 md:px-10"
    >
      <h3 className="absolute top-20 uppercase tracking-[8px] sm:tracking-[15px] md:tracking-[20px] text-gray-500 text-lg sm:text-xl md:text-2xl text-center w-full">
        Real Nigerians. Real Results
      </h3>

      <div className="relative w-full flex overflow-x-scroll overflow-y-hidden snap-x snap-mandatory z-20 scrollbar-thin scrollbar-track-gray-400/20 scrollbar-thumb-[#7FAB0A] pt-32 sm:pt-36">
        {projects.map((project, i) => (
          <div
            key={i}
            className="w-screen flex-shrink-0 snap-center flex flex-col space-y-5 justify-center px-6 sm:px-10 md:px-20 lg:px-32 items-center"
          >
            <motion.img
              initial={{ y: -100, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              transition={{ duration: 1.2 }}
              viewport={{ once: true }}
              className="w-[160px] h-[160px] sm:w-[180px] sm:h-[180px] md:w-[220px] md:h-[220px] rounded-lg object-cover"
              src={project.displayImg}
              alt={project.title}
            />

            <div className="space-y-4 sm:space-y-6 max-w-3xl text-center">
              <h4 className="text-2xl sm:text-3xl md:text-4xl font-semibold">
                <span className="underline decoration-[#F7AB0A]/50 text-sm sm:text-base md:text-lg block mb-1">
                  Case study {i + 1} of {projects.length}:
                </span>
                {project.title}
              </h4>

              <p className="text-sm sm:text-base md:text-lg font-medium text-gray-300">
                {project.subtitle}
              </p>
              <p className="text-sm sm:text-base md:text-lg text-gray-400 leading-relaxed">
                {project.discription}
              </p>
            </div>
          </div>
        ))}
      </div>

      <div className="w-full absolute top-[30%] bg-[#A67C52]/10 left-0 h-[400px] sm:h-[500px] -skew-y-12"></div>
    </motion.div>
  )
}

export default Projects
