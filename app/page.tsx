"use client";

import { Footer } from "@/components/footer";
import { NewsletterSignup } from "@/components/newsletter-signup";
import { ScrollToTop } from "@/components/scroll-to-top";
import { HeroSection } from "@/components/hero-section";
import { HeroSection2 } from "@/components/hero-section2";
import { WelcomeSection } from "@/components/welcome-section";
import { FeaturesGrid } from "@/components/features-grid";
import FeaturesGrid2 from "@/components/features-grid2";
import { ActivitiesSection } from "@/components/activities-section";
import { motion } from "framer-motion";

export default function HomePage() {
  const fadeInUp = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6 },
  };

  const staggerContainer = {
    animate: {
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-100">
      <main className="flex-1">
        {/* Hero Section */}
        <section className="">
          <div className=" mx-auto px-6 pt-6">
            <HeroSection2 />
          </div>
        </section>

        {/* Welcome Section */}
        <section>
          <div className="mx-auto px-4">
            <WelcomeSection />
          </div>
        </section>

        {/* Features Grid */}
        <section>
          <div className="mx-auto px-8">
            <FeaturesGrid2 />
          </div>
        </section>

        {/* IBAG Activities Section */}
        <section className="">
          <div className=" mx-auto px-4">
            <ActivitiesSection />
          </div>
        </section>
        

        {/* Newsletter Section */}
        <section className="py-16">
          <div className="mx-auto px-4">
            <NewsletterSignup />
          </div>
        </section>
      </main>

      <Footer />
      <ScrollToTop />
    </div>
  );
}
