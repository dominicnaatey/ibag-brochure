"use client";

import { motion } from "framer-motion";
import { ImageCarousel } from "./image-carousel";
import Image from "next/image";

export function HeroSection() {
  const fadeInLeft = {
    initial: { opacity: 0, x: -50 },
    animate: { opacity: 1, x: 0 },
    transition: { duration: 0.8 },
  };

  const fadeInRight = {
    initial: { opacity: 0, x: 50 },
    animate: { opacity: 1, x: 0 },
    transition: { duration: 0.8 },
  };

  const staggerContainer = {
    animate: {
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const carouselImages = [
    "/italian-business-meeting.jpg",
    "/italian-food-festival.jpg",
    "/italian-ghanaian-event.jpg",
    "/italian-wine-networking.jpg",
    "/business-workshop.jpg",
  ];

  return (
    <section className="bg-white py-20">
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-12 items-center max-w-7xl mx-auto">
          {/* Content - Left Side */}
          <motion.div
            className="text-center lg:text-left"
            variants={staggerContainer}
            initial="initial"
            animate="animate"
          >
            <motion.h1
              className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-800 mb-6"
              variants={fadeInLeft}
            >
              Connecting Italian Heritage to Ghana's Business Landscape
            </motion.h1>
            <motion.p
              className="text-xl text-gray-600 mb-8 max-w-2xl lg:max-w-none"
              variants={fadeInLeft}
            >
              Fostering collaboration, innovation, and growth among businesses
              rooted in Italian culture.
            </motion.p>
            <motion.div
              className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start"
              variants={fadeInLeft}
            >
              <motion.button
                className="bg-gray-800 hover:bg-purple-600 text-white px-8 py-3 rounded-lg font-semibold transition-all duration-300"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Join Us Today
              </motion.button>
              <motion.button
                className="border border-gray-800 text-gray-800 hover:bg-gray-800 hover:text-white px-8 py-3 rounded-lg font-semibold transition-all duration-300"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Learn More
              </motion.button>
            </motion.div>
            
            {/* EuroCham Membership */}
            <motion.div
              className="flex items-center gap-3 justify-center lg:justify-start mt-8"
              variants={fadeInLeft}
            >
              <span className="text-gray-700 font-medium text-sm">
                We are a member of EuroCham
              </span>
              <Image
                src="/eurocham_logo.png"
                alt="EuroCham Ghana Logo"
                width={110}
                height={0}
                className="object-contain h-auto"
              />
            </motion.div>
          </motion.div>

          {/* Image Carousel - Right Side */}
          <motion.div
            className="relative h-96 lg:h-[500px]"
            variants={fadeInRight}
            initial="initial"
            animate="animate"
          >
            <ImageCarousel images={carouselImages} />
          </motion.div>
        </div>
      </div>
    </section>
  );
}