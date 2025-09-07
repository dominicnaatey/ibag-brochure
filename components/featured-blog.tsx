import React, { useState, useEffect } from "react";
import Image from "next/image";
import { Card } from "@/components/ui/card";

const blogPosts = [
  {
    id: 1,
    title:
      "Facebook is creating a news section in Watch to feature breaking news",
    excerpt: "Facebook launched the Watch platform in August",
    author: "Gloria",
    date: "Jan 09, 2021",
    image:
      "https://images.unsplash.com/photo-1669828230990-9b8583a877ab?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=560&q=80",
    avatar:
      "https://images.unsplash.com/photo-1669837401587-f9a4cfe3126e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=facearea&facepad=2&w=320&h=320&q=80",
  },
  {
    id: 2,
    title: "What CFR (Conversations, Feedback, Recognition) really is about",
    excerpt: "For a lot of people these days, Measure What Matters.",
    author: "Gloria",
    date: "May 30, 2021",
    image:
      "https://images.unsplash.com/photo-1611625618313-68b87aaa0626?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=560&q=80",
    avatar:
      "https://images.unsplash.com/photo-1669837401587-f9a4cfe3126e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=facearea&facepad=2&w=320&h=320&q=80",
  },
  {
    id: 3,
    title: "The Future of Digital Marketing: Trends to Watch in 2024",
    excerpt: "Discover the latest trends shaping the digital marketing landscape.",
    author: "Marcus",
    date: "Dec 15, 2023",
    image:
      "https://images.unsplash.com/photo-1460925895917-afdab827c52f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=560&q=80",
    avatar:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=facearea&facepad=2&w=320&h=320&q=80",
  },
  {
    id: 4,
    title: "Building Sustainable Business Practices for Modern Companies",
    excerpt: "Learn how to implement eco-friendly strategies in your business.",
    author: "Sarah",
    date: "Nov 22, 2023",
    image:
      "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=560&q=80",
    avatar:
      "https://images.unsplash.com/photo-1494790108755-2616b612b786?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=facearea&facepad=2&w=320&h=320&q=80",
  },
];

export default function FeaturedBlog() {
  const [currentSlide, setCurrentSlide] = useState(1); // Start at 1 to account for duplicate
  const [isTransitioning, setIsTransitioning] = useState(true);
  const totalSlides = 4;
  const totalSlidesWithDuplicates = totalSlides + 2; // Add duplicates at start and end

  useEffect(() => {
    const interval = setInterval(() => {
      setIsTransitioning(true);
      setCurrentSlide((prev) => prev + 1);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (currentSlide === totalSlidesWithDuplicates - 1) {
      // At the last duplicate slide, reset to first real slide
      setTimeout(() => {
         setIsTransitioning(false);
         setCurrentSlide(1);
         setTimeout(() => setIsTransitioning(true), 50);
       }, 1000);
    } else if (currentSlide === 0) {
      // At the first duplicate slide, reset to last real slide
      setTimeout(() => {
         setIsTransitioning(false);
         setCurrentSlide(totalSlides);
         setTimeout(() => setIsTransitioning(true), 50);
       }, 1000);
    }
  }, [currentSlide, totalSlides, totalSlidesWithDuplicates]);





  return (
    <section className="py-20 rounded-4xl">
      <div className="max-w-7xl lg:pt-20 mx-auto">
        <div className="text-center mb-12">
          <span className="inline-flex items-center rounded-full border border-gray-300 px-4 py-1 text-sm font-medium mb-4 text-gray-600">
            <span className="w-2 h-2 bg-gray-600 rounded-full mr-2"></span>
            Our Blog
          </span>
          <h2 className="text-4xl md:text-5xl font-extrabold text-gray-900 leading-tight">
            Read Our Latest Blog Posts
          </h2>
        </div>
        
        <div className="relative overflow-hidden">
          <div 
            className={`flex ${isTransitioning ? 'transition-transform duration-1000 ease-in-out' : ''}`}
            style={{ transform: `translateX(-${currentSlide * 50}%)` }}
          >
            {Array.from({ length: totalSlidesWithDuplicates }).map((_, slideIndex) => {
              const slidePost = (() => {
                const posts = [blogPosts[0], blogPosts[1], blogPosts[2], blogPosts[3]];
                
                let actualSlideIndex;
                if (slideIndex === 0) {
                  // First slide is duplicate of last slide
                  actualSlideIndex = totalSlides - 1;
                } else if (slideIndex === totalSlidesWithDuplicates - 1) {
                  // Last slide is duplicate of first slide
                  actualSlideIndex = 0;
                } else {
                  // Regular slides
                  actualSlideIndex = slideIndex - 1;
                }
                
                return posts[actualSlideIndex];
              })();
              
              return (
                <div key={slideIndex} className="w-1/2 flex-shrink-0 px-4">
                  <div key={`${slideIndex}-${slidePost.id}`}>
            <Card className="group relative overflow-hidden border-0 bg-transparent p-0 shadow-lg transition-all duration-300 hover:shadow-xl">
              <a
                href="#"
                className="block focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 rounded-xl"
              >
              <div className="relative h-[350px] w-full overflow-hidden rounded-xl">
                <Image
                  src={slidePost.image}
                  alt={slidePost.title}
                  fill
                  className="object-cover transition-transform duration-300 group-hover:scale-105"
                />

                {/* Gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

                {/* Author info */}
                <div className="absolute left-0 right-0 top-0 z-10 p-4 sm:p-6">
                  <div className="flex items-center space-x-3">
                    <div className="relative h-11 w-11 overflow-hidden rounded-full border-2 border-white shadow-sm">
                      <Image
                        src={slidePost.avatar}
                        alt={slidePost.author}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div className="min-w-0 flex-1">
                      <h4 className="truncate font-semibold text-white">
                        {slidePost.author}
                      </h4>
                      <p className="text-xs text-white/80">{slidePost.date}</p>
                    </div>
                  </div>
                </div>

                {/* Post content */}
                <div className="absolute bottom-0 left-0 right-0 z-10 p-4 sm:p-6">
                  <div className="space-y-2">
                    <h3 className="line-clamp-3 text-lg font-semibold leading-tight text-white transition-colors group-hover:text-white/90 group-focus:text-white/90 sm:text-2xl lg:text-3xl">
                      {slidePost.title}
                    </h3>
                    <p className="line-clamp-2 text-sm text-white/80 sm:text-base">
                      {slidePost.excerpt}
                    </p>
                  </div>
                </div>
                  </div>
                </a>
              </Card>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Carousel dots */}
        <div className="flex justify-center mt-8 space-x-2">
          {Array.from({ length: totalSlides }).map((_, index) => {
            const isActive = (currentSlide === index + 1) || 
                           (currentSlide === 0 && index === totalSlides - 1) || 
                           (currentSlide === totalSlidesWithDuplicates - 1 && index === 0);
            
            return (
              <button
                key={index}
                onClick={() => {
                  setIsTransitioning(true);
                  setCurrentSlide(index + 1);
                }}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  isActive
                    ? "bg-gray-800 scale-110"
                    : "bg-gray-300 hover:bg-gray-500"
                }`}
                aria-label={`Go to slide ${index + 1}`}
              />
            );
          })}
        </div>
      </div>
    </section>
  );
}
