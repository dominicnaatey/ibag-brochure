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
              Building Bridges Between <br /> Italy and Ghana
            </h1>
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6 md:gap-8">
              <p className="text-xl md:text-2xl text-gray-100 max-w-2xl flex-1">
                Driving partnerships and opportunities between Italy and Ghana.
              </p>

              {/* CTA Button */}
              <motion.button
                className="inline-flex items-center gap-3 bg-white text-red-600 pl-[10px] pr-[15px] py-3 rounded-full font-semibold text-base shadow-lg hover:shadow-xl transition-shadow relative overflow-hidden"
                whileHover="hover"
                initial="initial"
                variants={{
                  initial: {},
                  hover: {}
                }}
              >
                {/* Sliding circular icon */}
                <motion.div 
                  className="w-[35px] h-[35px] bg-red-500 rounded-full flex items-center justify-center z-10 relative"
                  variants={{
                    initial: { x: 0 },
                    hover: { x: 120 }
                  }}
                  transition={{ type: "spring", stiffness: 200, damping: 25, duration: 0.6 }}
                >
                  <svg className="w-[18px] h-[18px] text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 17L17 7M17 7H7M17 7V17" />
                  </svg>
                </motion.div>
                
                {/* Text that fades out and reappears on the right */}
                  <div className="relative flex-1">
                    <motion.span
                       className="inline-block whitespace-nowrap"
                       variants={{
                         initial: { opacity: 1 },
                         hover: { opacity: 0 }
                       }}
                       transition={{ 
                         duration: 0.2, 
                         ease: "easeOut",
                         opacity: { duration: 0.3, ease: "easeIn" }
                       }}
                     >
                       Join Us Today
                     </motion.span>
                     
                     <motion.span
                         className="absolute left-0 top-0 whitespace-nowrap"
                         style={{ transform: 'translateX(-45px)' }}
                         variants={{
                           initial: { opacity: 0 },
                           hover: { opacity: 1 }
                         }}
                         transition={{ 
                           opacity: {
                             duration: 0.3,
                             delay: 0.3,
                             ease: "easeIn"
                           }
                         }}
                       >
                         Join Us Today
                       </motion.span>
                  </div>
              </motion.button>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
