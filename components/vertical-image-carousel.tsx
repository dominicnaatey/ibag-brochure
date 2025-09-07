"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";

interface VerticalImageCarouselProps {
  images: string[];
  autoPlay?: boolean;
  interval?: number;
  height?: string;
}

export function VerticalImageCarousel({ 
  images, 
  autoPlay = true, 
  interval = 4000,
  height = "500px"
}: VerticalImageCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isScrolling, setIsScrolling] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const scrollTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (!autoPlay || isScrolling) return;

    const timer = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, interval);

    return () => clearInterval(timer);
  }, [autoPlay, interval, images.length, isScrolling]);

  const handleScroll = (e: React.WheelEvent) => {
    e.preventDefault();
    
    if (isScrolling) return;
    
    setIsScrolling(true);
    
    if (e.deltaY > 0) {
      // Scroll down - next image
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    } else {
      // Scroll up - previous image
      setCurrentIndex((prevIndex) => (prevIndex - 1 + images.length) % images.length);
    }

    // Clear existing timeout
    if (scrollTimeoutRef.current) {
      clearTimeout(scrollTimeoutRef.current);
    }

    // Set new timeout to allow scrolling again
    scrollTimeoutRef.current = setTimeout(() => {
      setIsScrolling(false);
    }, 800);
  };

  const handleTouchStart = useRef({ y: 0 });
  const handleTouchMove = (e: React.TouchEvent) => {
    const touch = e.touches[0];
    const deltaY = handleTouchStart.current.y - touch.clientY;
    
    if (Math.abs(deltaY) > 50 && !isScrolling) {
      setIsScrolling(true);
      
      if (deltaY > 0) {
        // Swipe up - next image
        setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
      } else {
        // Swipe down - previous image
        setCurrentIndex((prevIndex) => (prevIndex - 1 + images.length) % images.length);
      }

      if (scrollTimeoutRef.current) {
        clearTimeout(scrollTimeoutRef.current);
      }

      scrollTimeoutRef.current = setTimeout(() => {
        setIsScrolling(false);
      }, 800);
    }
  };

  const handleTouchStartCapture = (e: React.TouchEvent) => {
    handleTouchStart.current.y = e.touches[0].clientY;
  };

  const getImageStyle = (index: number) => {
    const diff = index - currentIndex;
    const absIndex = Math.abs(diff);
    
    let opacity = 1;
    let zIndex = 10;
    let translateY = diff * 120; // Base spacing between images
    
    if (absIndex === 0) {
      // Center image - fully visible
      opacity = 1;
      zIndex = 20;
      translateY = 0;
    } else if (absIndex === 1) {
      // Adjacent images - partially visible
      opacity = 0.7;
      zIndex = 15;
      translateY = diff * 100;
    } else if (absIndex === 2) {
      // Further images - more faded
      opacity = 0.4;
      zIndex = 10;
      translateY = diff * 80;
    } else {
      // Hidden images
      opacity = 0;
      zIndex = 5;
      translateY = diff * 60;
    }

    return {
      opacity,
      zIndex,
      y: translateY,
    };
  };

  return (
    <div 
      ref={containerRef}
      className="relative w-full overflow-hidden rounded-2xl shadow-2xl cursor-grab active:cursor-grabbing"
      style={{ height }}
      onWheel={handleScroll}
      onTouchStart={handleTouchStartCapture}
      onTouchMove={handleTouchMove}
    >
      <div className="absolute inset-0 flex items-center justify-center">
        {images.map((image, index) => {
          const style = getImageStyle(index);
          const isVisible = Math.abs(index - currentIndex) <= 2;
          
          if (!isVisible) return null;
          
          return (
            <motion.div
              key={`${image}-${index}`}
              className="absolute w-full h-80 rounded-xl overflow-hidden shadow-lg"
              initial={false}
              animate={{
                opacity: style.opacity,
                y: style.y,
                zIndex: style.zIndex,
              }}
              transition={{
                duration: 0.8,
                ease: [0.25, 0.46, 0.45, 0.94], // Custom easing for smooth feel
              }}
              style={{
                transformOrigin: "center center",
              }}
            >
              <Image
                src={image}
                alt={`Slide ${index + 1}`}
                fill
                className="object-cover"
                priority={Math.abs(index - currentIndex) <= 1}
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              />
              
              {/* Overlay for non-center images */}
              {index !== currentIndex && (
                <div className="absolute inset-0 bg-black/20" />
              )}
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
      
      {/* Scroll hint */}
      <div className="absolute top-4 right-4 text-white/70 text-sm z-30 hidden md:block">
        <div className="flex items-center gap-1">
          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M10 3a1 1 0 01.707.293l3 3a1 1 0 01-1.414 1.414L10 5.414 7.707 7.707a1 1 0 01-1.414-1.414l3-3A1 1 0 0110 3zm-3.707 9.293a1 1 0 011.414 0L10 14.586l2.293-2.293a1 1 0 011.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z" clipRule="evenodd" />
          </svg>
          <span>Scroll</span>
        </div>
      </div>
    </div>
  );
}