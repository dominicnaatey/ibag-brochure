"use client"

import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { NewsletterSignup } from "@/components/newsletter-signup"
import { ScrollToTop } from "@/components/scroll-to-top"
import { motion } from "framer-motion"

export default function HomePage() {
  const fadeInUp = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6 }
  }

  const staggerContainer = {
    animate: {
      transition: {
        staggerChildren: 0.2
      }
    }
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-1">
        {/* Hero Section */}
        <section className="bg-gradient-to-br from-gray-50 to-gray-100 py-20">
          <div className="container mx-auto px-4 text-center">
            <motion.div 
              className="max-w-4xl mx-auto"
              variants={staggerContainer}
              initial="initial"
              animate="animate"
            >
              <motion.h1 
                className="text-4xl md:text-6xl font-bold text-gray-800 mb-6"
                variants={fadeInUp}
              >
                Connecting Italian Heritage to Ghana's Business Landscape
              </motion.h1>
              <motion.p 
                className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto"
                variants={fadeInUp}
              >
                Fostering collaboration, innovation, and growth among businesses rooted in Italian culture.
              </motion.p>
              <motion.div 
                className="flex flex-col sm:flex-row gap-4 justify-center"
                variants={fadeInUp}
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
            </motion.div>
          </div>
        </section>

        {/* Welcome Section */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center">
              <h2 className="text-3xl font-bold text-gray-800 mb-6">Welcome to IBAG</h2>
              <p className="text-lg text-gray-600 leading-relaxed">
                The Italian Business Association of Ghana serves as a bridge between Italian heritage and Ghana's
                dynamic business environment. We bring together entrepreneurs, professionals, and organizations to
                create meaningful connections and drive economic growth.
              </p>
            </div>
          </div>
        </section>

        {/* Features Grid */}
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="text-center p-6 group hover:transform hover:scale-105 transition-all duration-300">
                <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-purple-200 transition-colors">
                  <div className="w-8 h-8 bg-purple-600 rounded-full"></div>
                </div>
                <h3 className="text-xl font-semibold text-gray-800 mb-3">Networking</h3>
                <p className="text-gray-600">
                  Connect with like-minded professionals and expand your business network.
                </p>
              </div>

              <div className="text-center p-6 group hover:transform hover:scale-105 transition-all duration-300">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-green-200 transition-colors">
                  <div className="w-8 h-8 bg-green-600 rounded-full"></div>
                </div>
                <h3 className="text-xl font-semibold text-gray-800 mb-3">Cultural Exchange</h3>
                <p className="text-gray-600">
                  Celebrate Italian culture while embracing Ghana's rich business traditions.
                </p>
              </div>

              <div className="text-center p-6 group hover:transform hover:scale-105 transition-all duration-300">
                <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-red-200 transition-colors">
                  <div className="w-8 h-8 bg-red-600 rounded-full"></div>
                </div>
                <h3 className="text-xl font-semibold text-gray-800 mb-3">Business Growth</h3>
                <p className="text-gray-600">Access resources and opportunities to grow your business in Ghana.</p>
              </div>
            </div>
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
      <NewsletterSignup />
      <ScrollToTop />
    </div>
  )
}
