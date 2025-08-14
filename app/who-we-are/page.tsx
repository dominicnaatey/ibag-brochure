import { Header } from "@/components/header"
import { Footer } from "@/components/footer"

export default function WhoWeArePage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-1">
        {/* Hero Section */}
        <section className="bg-gradient-to-br from-gray-50 to-gray-100 py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center">
              <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-6">Who We Are</h1>
              <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                Bridging Italian heritage with Ghana's vibrant business landscape through collaboration and innovation.
              </p>
            </div>
          </div>
        </section>

        {/* Mission & Vision */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-3xl font-bold text-gray-800 mb-6">Our Mission</h2>
                <p className="text-lg text-gray-600 leading-relaxed mb-6">
                  The Italian Business Association of Ghana (IBAG) serves as a dynamic platform that connects Italian
                  businesses, entrepreneurs, and professionals operating in Ghana. We foster meaningful relationships,
                  facilitate business opportunities, and promote cultural exchange between Italy and Ghana.
                </p>
                <p className="text-lg text-gray-600 leading-relaxed">
                  Our mission is to create a thriving ecosystem where Italian heritage meets Ghanaian innovation,
                  driving economic growth and mutual prosperity for all our members.
                </p>
              </div>
              <div className="bg-gray-50 p-8 rounded-lg">
                <h3 className="text-2xl font-bold text-gray-800 mb-4">Our Vision</h3>
                <p className="text-gray-600 leading-relaxed">
                  To be the premier business association that strengthens Italy-Ghana economic ties, promotes
                  sustainable business practices, and creates lasting partnerships that benefit both nations.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Values */}
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-800 mb-4">Our Values</h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                The principles that guide our work and define our commitment to our members and community.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="text-center p-6 bg-white rounded-lg shadow-sm">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <div className="w-8 h-8 bg-green-600 rounded-full"></div>
                </div>
                <h3 className="text-xl font-semibold text-gray-800 mb-3">Integrity</h3>
                <p className="text-gray-600">
                  We conduct all our activities with the highest ethical standards and transparency.
                </p>
              </div>

              <div className="text-center p-6 bg-white rounded-lg shadow-sm">
                <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <div className="w-8 h-8 bg-red-600 rounded-full"></div>
                </div>
                <h3 className="text-xl font-semibold text-gray-800 mb-3">Collaboration</h3>
                <p className="text-gray-600">
                  We believe in the power of working together to achieve common goals and shared success.
                </p>
              </div>

              <div className="text-center p-6 bg-white rounded-lg shadow-sm">
                <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <div className="w-8 h-8 bg-purple-600 rounded-full"></div>
                </div>
                <h3 className="text-xl font-semibold text-gray-800 mb-3">Innovation</h3>
                <p className="text-gray-600">
                  We embrace new ideas and technologies to drive business growth and development.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Leadership Team */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-800 mb-4">Leadership Team</h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                Meet the dedicated professionals leading IBAG towards a brighter future.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="w-32 h-32 bg-gray-200 rounded-full mx-auto mb-4"></div>
                <h3 className="text-xl font-semibold text-gray-800 mb-2">Marco Rossi</h3>
                <p className="text-purple-600 font-medium mb-2">President</p>
                <p className="text-gray-600 text-sm">
                  Leading strategic initiatives and fostering international partnerships.
                </p>
              </div>

              <div className="text-center">
                <div className="w-32 h-32 bg-gray-200 rounded-full mx-auto mb-4"></div>
                <h3 className="text-xl font-semibold text-gray-800 mb-2">Giulia Bianchi</h3>
                <p className="text-purple-600 font-medium mb-2">Vice President</p>
                <p className="text-gray-600 text-sm">Overseeing member relations and community engagement programs.</p>
              </div>

              <div className="text-center">
                <div className="w-32 h-32 bg-gray-200 rounded-full mx-auto mb-4"></div>
                <h3 className="text-xl font-semibold text-gray-800 mb-2">Alessandro Ferrari</h3>
                <p className="text-purple-600 font-medium mb-2">Secretary General</p>
                <p className="text-gray-600 text-sm">Managing operations and coordinating association activities.</p>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}
