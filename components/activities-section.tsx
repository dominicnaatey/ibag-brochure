export function ActivitiesSection() {
  return (
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
  );
}