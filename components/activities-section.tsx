export function ActivitiesSection() {
  return (
    <section className="py-20 rounded-4xl bg-gradient-to-br from-green-500 to-green-600">
      <div className="container mx-auto px-4 md:px-8 lg:px-16">
        <div className="text-center mb-12">
          <span className="inline-flex items-center rounded-full border border-gray-100 px-4 py-1 text-sm font-medium mb-4 text-gray-100">
            <span className="w-2 h-2 bg-gray-100 rounded-full mr-2"></span>
            Our Activities
          </span>
          <h2 className="text-4xl md:text-5xl font-extrabold text-gray-100 leading-tight">
            Discover Our Community Engagement
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {/*  */}
          <div className="text-center p-8 bg-white rounded-2xl border border-gray-200 shadow-sm group hover:shadow-md transition-all duration-300">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
              </svg>
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-4">
              MONTHLY BUSINESS TALKS
            </h3>
            <p className="text-gray-600 leading-relaxed">
              Every month, we invite resource persons and experts across various business fields to educate our members on specific issues pertaining to their business's. This event doubles as a networking opportunity for interactions.
            </p>
          </div>
          {/*  */}
          <div className="text-center p-8 bg-white rounded-2xl border border-gray-200 shadow-sm group hover:shadow-md transition-all duration-300">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 15.546c-.523 0-1.046.151-1.5.454a2.704 2.704 0 01-3 0 2.704 2.704 0 00-3 0 2.704 2.704 0 01-3 0 2.704 2.704 0 00-3 0 2.704 2.704 0 01-3 0A2.704 2.704 0 003 15.546V6.454c.523 0 1.046-.151 1.5-.454a2.704 2.704 0 013 0 2.704 2.704 0 003 0 2.704 2.704 0 013 0 2.704 2.704 0 003 0 2.704 2.704 0 013 0c.454.303.977.454 1.5.454v9.092zM9 12l2 2 4-4" />
              </svg>
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-4">
              ITALIAN CULTURAL CELEBRATIONS
            </h3>
            <p className="text-gray-600 leading-relaxed">
              We celebrate Italian culture periodically to create local awareness of Italian festivities and customs as well as to provide a sense of belonging to home-sick Italians living in Ghana.
            </p>
          </div>
          {/*  */}
          <div className="text-center p-8 bg-white rounded-2xl border border-gray-200 shadow-sm group hover:shadow-md transition-all duration-300">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
              </svg>
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-4">
              SOCIAL ENGAGEMENTS
            </h3>
            <p className="text-gray-600 leading-relaxed">
              From time to time, we bring our members together informally by hosting 'Aperitivo' sessions and dinners to build and harness stronger inter-member connections and business relations.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}