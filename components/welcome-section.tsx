export function WelcomeSection() {
  return (
    <section className="py-20">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-12 items-start max-w-7xl mx-auto">
          {/* Left Column */}
          <div className="md:flex md:flex-col items-center md:items-start md:justify-between gap-6 md:gap-8">
            <span className="inline-flex items-center shadow-inner rounded-full border border-gray-300 px-4 py-1 text-sm font-medium mb-4 text-gray-600">
              <span className="w-2 h-2 bg-gray-600 rounded-full mr-2"></span>
              Who we are
            </span>
            <h2 className="text-4xl md:text-7xl font-extrabold text-gray-900 leading-tight">
              About IBAG
            </h2>
          </div>

          {/* Right Column */}
          <div className="text-gray-700 leading-relaxed text-base md:text-lg  space-y-4">
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