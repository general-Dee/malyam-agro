"use client";
import React from "react";
import { motion } from "framer-motion";

type Props = {};

function Value({}: Props) {
  return (
    <section className="text-gray-600 body-font bg-black">
      <div className="container px-4 sm:px-6 lg:px-8 py-16 sm:py-20 mx-auto">
        {/* Header Section */}
        <div className="text-center mb-12 sm:mb-20">
          <h1 className="text-2xl sm:text-3xl font-semibold title-font text-white mb-3">
            This Week's Festive Offer - Buy Direct, Save Big, Celebrate Better!
          </h1>
          <p className="text-sm sm:text-base leading-relaxed max-w-2xl mx-auto text-gray-300">
            Here’s what you get when you buy from Malyam Agro this week:
          </p>
        </div>

        {/* Features Grid */}
        <div className="flex flex-wrap -m-4 justify-center">
          {/* Column 1 */}
          <div className="p-4 w-full sm:w-1/2 lg:w-1/4">
            <h2 className="font-semibold text-base sm:text-lg mb-4 text-center sm:text-left text-white">
              Healthy, Vet-Certified Livestock
            </h2>
            <nav className="flex flex-col sm:items-start items-center text-center sm:text-left space-y-2.5">
              <Feature text="Strong, disease-free animals inspected and dewormed by licensed vets. No sick surprises. No extra vet bills." />
              <Feature text="Full Transparency You Can Trust" />
              <Feature text="Reliable Supply for Serious Buyers" />
              <Feature text="Healthy Livestock Made Accessible" />
            </nav>
          </div>

          {/* Column 2 */}
          <div className="p-4 w-full sm:w-1/2 lg:w-1/4">
            <h2 className="font-semibold text-base sm:text-lg mb-4 text-center sm:text-left text-white">
              Direct Farm Pricing (No Middlemen)
            </h2>
            <nav className="flex flex-col sm:items-start items-center text-center sm:text-left space-y-2.5">
              <Feature text="Save 25–40% instantly when you buy directly from us. Transparent, fair, and affordable — exactly what you pay for, nothing more." />
              <Feature text="Top-Quality Livestock at True Farm Value" />
              <Feature text="From Farm to You Without Delays" />
            </nav>
          </div>

          {/* Column 3 */}
          <div className="p-4 w-full sm:w-1/2 lg:w-1/4">
            <h2 className="font-semibold text-base sm:text-lg mb-4 text-center sm:text-left text-white">
              Fast Nationwide Delivery
            </h2>
            <nav className="flex flex-col sm:items-start items-center text-center sm:text-left space-y-2.5">
              <Feature text="From Lagos to Kano, Abuja to Port Harcourt — we deliver quickly, safely, and right to your doorstep." />
              <Feature text="Speed That Saves You Time" />
              <Feature text="Nationwide Coverage, Local Efficiency" />
              <Feature text="Reliable Delivery Partners" />
            </nav>
          </div>

          {/* Column 4 */}
          <div className="p-4 w-full sm:w-1/2 lg:w-1/4">
            <h2 className="font-semibold text-base sm:text-lg mb-4 text-center sm:text-left text-white">
              Flexible Order Sizes — Retail & Wholesale
            </h2>
            <nav className="flex flex-col sm:items-start items-center text-center sm:text-left space-y-2.5">
              <Feature text="Whether it’s 1 cow for your family or 100 rams for resale, we’ve got you covered with equal care and professional service." />
              <Feature text="The More You Buy, the More You Save" />
              <Feature text="No Hidden Charges, No Guesswork" />
              <Feature text="Healthy Livestock Within Your Budget" />
              <Feature text="Buy With Ease, Pay Conveniently" />
            </nav>
          </div>
        </div>
      </div>
    </section>
  );
}

const Feature = ({ text }: { text: string }) => (
  <div className="flex items-start sm:items-center space-x-2">
    <span className="bg-indigo-100 text-indigo-500 w-4 h-4 rounded-full inline-flex items-center justify-center mt-1 sm:mt-0">
      <svg
        fill="none"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="3"
        className="w-3 h-3"
        viewBox="0 0 24 24"
      >
        <path d="M20 6L9 17l-5-5" />
      </svg>
    </span>
    <p className="text-sm text-gray-300 leading-relaxed">{text}</p>
  </div>
);

export default Value;
