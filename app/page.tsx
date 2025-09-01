"use client";

import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { NewsletterSignup } from "@/components/newsletter-signup";
import { ScrollToTop } from "@/components/scroll-to-top";
import { HeroSection } from "@/components/hero-section";
import { HeroSection2 } from "@/components/hero-section2";
import { WelcomeSection } from "@/components/welcome-section";
import { FeaturesGrid } from "@/components/features-grid";
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
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-1">
        {/* Hero Section */}
        <section className="py-16">
          <div className=" mx-auto px-4">
            <HeroSection2 />
          </div>
        </section>

        {/* Welcome Section */}
        <WelcomeSection />

        {/* Features Grid */}
        <FeaturesGrid />

        {/* IBAG Activities Section */}
        <section className="py-16">
          <div className=" mx-auto px-4">
            <ActivitiesSection />
          </div>
        </section>
        

        {/* Newsletter Section */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <NewsletterSignup />
          </div>
        </section>
      </main>

      <Footer />
      <ScrollToTop />
    </div>
  );
}
