"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Image from "next/image";

interface HorizontalImageCarouselProps {
  images: string[];
  autoPlay?: boolean;
  interval?: number;
  height?: string;
}

export function HorizontalImageCarousel({ 
  images, 
  autoPlay = true, 
  interval = 4000,
  height = "400px"
}: HorizontalImageCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (!autoPlay) return;

    const timer = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, interval);

    return () => clearInterval(timer);
  }, [autoPlay, interval, images.length]);

  const getVisibleImages = () => {
    const visibleCount = 3; // Show 3 images at once
    const result = [];
    
    for (let i = 0; i < visibleCount; i++) {
      const index = (currentIndex + i) % images.length;
      result.push({ src: images[index], index });
    }
    
    return result;
  };

  return (
    <div 
      className="relative w-full overflow-hidden rounded-2xl"
      style={{ height }}
    >
      {/* Main container with horizontal layout */}
      <div className="flex h-full gap-4 p-4">
        {getVisibleImages().map((image, displayIndex) => {
          const isCenter = displayIndex === 1; // Middle image is the main focus
          
          return (
            <motion.div
              key={`${image.src}-${image.index}`}
              className={`relative rounded-xl overflow-hidden shadow-lg ${
                isCenter ? 'flex-1' : 'w-32 md:w-40'
              }`}
              initial={false}
              animate={{
                opacity: isCenter ? 1 : 0.7,
                scale: isCenter ? 1 : 0.9,
              }}
              transition={{
                duration: 0.6,
                ease: "easeInOut",
              }}
            >
              <div className="w-full h-full bg-gray-200 relative">
                <Image
                  src={image.src}
                  alt={`Slide ${image.index + 1}`}
                  fill
                  className="object-cover"
                  priority={isCenter}
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
                
                {/* Overlay for non-center images */}
                {!isCenter && (
                  <div className="absolute inset-0 bg-black/20" />
                )}
              </div>
            </motion.div>
          );
        })}
      </div>
      
      {/* Navigation dots */}
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2 z-30">
        {images.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentIndex(index)}
            className={`w-2 h-2 rounded-full transition-all duration-300 ${
              index === currentIndex 
                ? 'bg-white scale-125 shadow-lg' 
                : 'bg-white/50 hover:bg-white/75'
            }`}
          />
        ))}
      </div>
      
      {/* Navigation arrows */}
      <button
        onClick={() => setCurrentIndex((prev) => (prev - 1 + images.length) % images.length)}
        className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-white/20 hover:bg-white/30 text-white p-2 rounded-full transition-all duration-200 z-30"
      >
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
      </button>
      
      <button
        onClick={() => setCurrentIndex((prev) => (prev + 1) % images.length)}
        className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-white/20 hover:bg-white/30 text-white p-2 rounded-full transition-all duration-200 z-30"
      >
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </svg>
      </button>
    </div>
  );
}