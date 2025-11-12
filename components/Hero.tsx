import React from 'react'
import { Cursor, useTypewriter } from "react-simple-typewriter"
import BackgroundCircles from "./BackgroundCircles"
import { motion } from 'framer-motion'
import Link from 'next/link'


type Props = {}

function Hero({}: Props) {
    const [text, count] = useTypewriter({
        // words: [
        //     "Hi, get ready to be amazed!", 
        //     "Welcome to Damau Milk Farm", 
        //     "Nature's Bounty Delivered Fresh"
        // ],
        words: [
            "Malyam Agro — The Smartest Way to Buy Livestock This Festive Season", 
            "Get Healthy, Vet-Certified Livestock Delivered to You — Fast, Affordable & Hassle-Free", 
            "From our farm in Kaduna straight to your city — guaranteed quality, fair pricing, and delivery in 3–5 days nationwide",  
            "Finally — a reliable way to buy strong, well-fed livestock directly from trusted Nigerian farms at the best possible prices.", 
            "No middleman wahala.", 
            "Are you buying one or in bulk?",
            "Malyam Agro supplies strong, clean, and well-fed livestock at pocket-friendly prices",
            "delivered anywhere in Nigeria."
        ],
        loop:true,
        delaySpeed: 2000,
    }) 
  return (
        <motion.div className="h-screen flex flex-col space-y-8 items-center justify-center text-center overflow-hidden pt-40">
          <BackgroundCircles />
          <img src="./hero/cow01.jpg" className="relative rounded-full h-32 w-32 mx-auto object-cover"/>
         <div className="z-20">
            {/* <h2 className="uppercase text-[#8CC63F] tracking-[15px]">Livestock</h2> */}
            <h2 className="uppercase text-[#FFF] tracking-[15px]">Livestock</h2>
            <h1 className="text-3xl lg:text-5xl font-semibold px-10">
                <span>{text}</span>
                <Cursor cursorColor="#F7AB0A" />
            </h1>

            <div className="my-4">
                <Link href="#about">
                    <button className="heroButton">About</button>
                </Link>
                <Link href="#experience">
                    <button className="heroButton">Experience</button>
                </Link>
                <Link href="#projects">
                    <button className="heroButton">Facilities</button>
                </Link>
                <Link href="#contact">
                    <button className="signupButton">Order now</button>
                </Link>
            </div>
         </div>
        </motion.div>
  )
}

export default Hero