export function FeaturesGrid() {
  return (
    <section className="py-16 bg-green-100">
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
            <h3 className="text-xl font-semibold text-white mb-3">
              Network
            </h3>
            <p className="text-gray-100">
              Land your next contract or expand your clientele base during
              our social and business events. IBAG is strategically
              positioned to advance your business's network and net worth.
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
  );
}