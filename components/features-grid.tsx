export function FeaturesGrid() {
  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4 md:px-8 lg:px-16">
        <div className="text-center mb-12">
          <span className="inline-flex items-center rounded-full border border-gray-300 px-4 py-1 text-sm font-medium mb-4 text-gray-600">
            <span className="w-2 h-2 bg-gray-900 rounded-full mr-2"></span>
            Why Choose Us
          </span>
          <h2 className="text-4xl md:text-5xl w-3xl mx-auto font-extrabold text-gray-900 leading-tight">
            Join Our International Business Community
          </h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {/*  */}
          <div className="text-center p-8 bg-green-600 rounded-2xl border border-gray-200 shadow-sm group hover:shadow-md transition-all duration-300">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
               <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
               </svg>
             </div>
            <h3 className="text-xl font-bold text-gray-50 mb-4">
              Network
            </h3>
            <p className="text-gray-100 leading-relaxed">
              Land your next contract or expand your clientele base during our social and business events. IBAG is strategically positioned to advance your business's network and net worth.
            </p>
          </div>

          {/*  */}
          <div className="text-center p-8 bg-green-600 rounded-2xl border border-gray-200 shadow-sm group hover:shadow-md transition-all duration-300">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
               <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z" />
               </svg>
             </div>
            <h3 className="text-xl font-bold text-gray-50 mb-4">
              COLLABORATE
            </h3>
            <p className="text-gray-100 leading-relaxed">
              We celebrate Italian culture periodically to create local awareness of Italian festivities and customs as well as to provide a sense of belonging to home-sick Italians living in Ghana.
            </p>
          </div>

          {/*  */}
          <div className="text-center p-8 bg-green-600 rounded-2xl border border-gray-200 shadow-sm group hover:shadow-md transition-all duration-300">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
               <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192L5.636 18.364M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z" />
               </svg>
             </div>
            <h3 className="text-xl font-bold text-gray-50 mb-4">
              SUPPORT
            </h3>
            <p className="text-gray-100 leading-relaxed">
              From time to time, we bring our members together informally by hosting 'Aperitivo' sessions and dinners to build and harness stronger inter-member connections and business relations.
            </p>
          </div>

        </div>
      </div>
    </section>
  );
}