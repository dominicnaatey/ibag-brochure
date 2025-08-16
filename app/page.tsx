"use client";

import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { NewsletterSignup } from "@/components/newsletter-signup";
import { ScrollToTop } from "@/components/scroll-to-top";
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
                Fostering collaboration, innovation, and growth among businesses
                rooted in Italian culture.
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
              <h2 className="text-3xl font-bold text-gray-800 mb-6">
                Welcome to IBAG
              </h2>
              <p className="text-lg text-gray-600 leading-relaxed">
                Registered in June 2015, The Italian Business Association of
                Ghana continuously aspires to create a platform which yields
                cultural, economic and trading partnerships between Italy and
                Ghana, but not limited to Ghanaian or Italian members. IBAG’s
                members constitute leading industry players whose business
                activities span across varied disciplines; from shipping and
                construction to hospitality and food service.
              </p>
            </div>
          </div>
        </section>

        {/* Features Grid */}
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-800 mb-4">
                JOIN OUR INTERNATIONAL BUSINESS COMMUNITY
              </h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="text-center p-6 group hover:transform hover:scale-105 transition-all duration-300">
                <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-purple-200 transition-colors">
                  <div className="w-8 h-8 bg-purple-600 rounded-full"></div>
                </div>
                <h3 className="text-xl font-semibold text-gray-800 mb-3">
                  Network
                </h3>
                <p className="text-gray-600">
                  Land your next contract or expand your clientele base during
                  our social and business events. IBAG is strategically
                  positioned to advance your business’s network and net worth.
                </p>
              </div>

              <div className="text-center p-6 group hover:transform hover:scale-105 transition-all duration-300">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-green-200 transition-colors">
                  <div className="w-8 h-8 bg-green-600 rounded-full"></div>
                </div>
                <h3 className="text-xl font-semibold text-gray-800 mb-3">
                  COLLABORATE
                </h3>
                <p className="text-gray-600">
                  Want to partner with us for your next project or event? IBAG
                  has garnered a reputation as a formidable and reliable partner
                  for collaborations with other entities.
                </p>
              </div>

              <div className="text-center p-6 group hover:transform hover:scale-105 transition-all duration-300">
                <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-red-200 transition-colors">
                  <div className="w-8 h-8 bg-red-600 rounded-full"></div>
                </div>
                <h3 className="text-xl font-semibold text-gray-800 mb-3">
                  SUPPORT
                </h3>
                <p className="text-gray-600">
                  We boast of a strong and experienced business community who
                  can provide reliable insights into trends as well as insider
                  information on job openings and happenings within the country.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* IBAG Activities Section */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-800 mb-4">Our Activities</h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                Discover the various ways IBAG brings together the Italian and Ghanaian business communities.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="text-center p-6 bg-white rounded-lg shadow-sm border border-gray-200 group hover:transform hover:scale-105 transition-all duration-300">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-blue-200 transition-colors">
                  <div className="w-8 h-8 bg-blue-600 rounded-full"></div>
                </div>
                <h3 className="text-xl font-semibold text-gray-800 mb-3">MONTHLY BUSINESS TALKS</h3>
                <p className="text-gray-600">
                  Every month, we invite resource persons and experts across various business fields to educate our members on specific issues pertaining to their business's. This event doubles as a networking opportunity for interactions.
                </p>
              </div>

              <div className="text-center p-6 bg-white rounded-lg shadow-sm border border-gray-200 group hover:transform hover:scale-105 transition-all duration-300">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-green-200 transition-colors">
                  <div className="w-8 h-8 bg-green-600 rounded-full"></div>
                </div>
                <h3 className="text-xl font-semibold text-gray-800 mb-3">ITALIAN CULTURAL CELEBRATIONS</h3>
                <p className="text-gray-600">
                  We celebrate Italian culture periodically to create local awareness of Italian festivities and customs as well as to provide a sense of belonging to home-sick Italians living in Ghana.
                </p>
              </div>

              <div className="text-center p-6 bg-white rounded-lg shadow-sm border border-gray-200 group hover:transform hover:scale-105 transition-all duration-300">
                <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-purple-200 transition-colors">
                  <div className="w-8 h-8 bg-purple-600 rounded-full"></div>
                </div>
                <h3 className="text-xl font-semibold text-gray-800 mb-3">SOCIAL ENGAGEMENTS</h3>
                <p className="text-gray-600">
                  From time to time, we bring our members together informally by hosting 'Aperitivo' sessions and dinners to build and harness stronger inter-member connections and business relations.
                </p>
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
  );
}
