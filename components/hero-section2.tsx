"use client";

import { motion } from "framer-motion";
import Image from "next/image";

export function HeroSection2() {
  return (
    <section className="relative w-full h-[70vh] lg:h-[80vh] overflow-hidden rounded-4xl">
      {/* Background Image */}
      <Image
        src="/italian-business-meeting.jpg"
        alt="IBAG Hero Background"
        fill
        className="object-cover"
        priority
      />

      {/* Overlay */}
      <div className="absolute inset-0 bg-black/50"></div>

      {/* Content */}
      <div className="absolute bottom-16 left-0 right-0 text-white">
        <div className="container max-w-7xl mx-auto px-4">
          <motion.div
            className="max-w-7xl mx-auto"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
        <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold leading-tight mb-6">
          Building Bridges Between <br/> Italy and Ghana
        </h1>
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6 md:gap-8">
          <p className="text-xl md:text-2xl text-gray-100 max-w-2xl flex-1">
            Driving partnerships and opportunities between Italy and Ghana.
          </p>

          {/* CTA Button */}
          <motion.button
            className="inline-flex items-center gap-3 bg-red-600 text-white px-8 py-4 rounded-full font-semibold text-lg shadow-xl hover:bg-red-700 transition-all flex-shrink-0"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <span>Join Us Today</span>
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 17L17 7M17 7H7M17 7V17" />
            </svg>
          </motion.button>
        </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
