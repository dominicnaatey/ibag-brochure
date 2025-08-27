export function WelcomeSection() {
  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4 md:px-8 lg:px-16">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-start">
          {/* Left Column */}
          <div>
            <span className="inline-flex items-center rounded-full border border-gray-300 px-4 py-1 text-sm font-medium mb-4 text-gray-600">
              <span className="w-2 h-2 bg-gray-800 rounded-full mr-2"></span>
              Who we are
            </span>
            <h2 className="text-4xl md:text-7xl font-extrabold text-gray-900 leading-tight">
              About IBAG
            </h2>
          </div>

          {/* Right Column */}
          <div className="text-gray-700 leading-relaxed text-lg space-y-4">
            <p>
              Registered in June 2015, The Italian Business Association of Ghana 
              continuously aspires to create a platform which yields cultural, 
              economic and trading partnerships between Italy and Ghana, but not 
              limited to Ghanaian or Italian members.
              IBAG&apos;s members constitute leading industry players whose business 
              activities span across varied disciplines; from shipping and 
              construction to hospitality and food service.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}