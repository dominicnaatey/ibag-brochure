import React from 'react';
import { Button } from "@/components/ui/button"

interface TimelineItemProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  isLast?: boolean;
}

const TimelineItem: React.FC<TimelineItemProps> = ({ icon, title, description, isLast = false }) => {
  return (
    <div className="flex gap-4">
      <div className="flex flex-col items-center">
        <div className="w-8 h-8 bg-red-500 text-white rounded-full flex items-center justify-center">
          {icon}
        </div>
        {!isLast && <div className="w-px h-16 bg-gray-300 mt-2"></div>}
      </div>
      <div className="pb-8">
        <h3 className="text-gray-700 font-semibold text-xl md:text-2xl md:leading-tight mb-2">
          {title}
        </h3>
        <p className="text-sm lg:text-base text-neutral-600">
          {description}
        </p>
      </div>
    </div>
  );
};

export default function FeaturesGrid2() {
  return (
    <section className="shadow-lg rounded-3xl md:rounded-4xl bg-white">
      {/* Approach */}
      <div className="max-w-7xl px-4 xl:px-0 py-10 lg:pt-20 lg:pb-20 mx-auto">
        {/* Title */}
        {/* <div className="mb-10 lg:mb-14">
          <h2 className="text-4xl text-center md:text-5xl w-3xl mx-auto font-extrabold text-gray-50 leading-tight">
            Join Our International Business Community
          </h2>
          <p className="mt-1 text-neutral-400">
            This profound insight guides our comprehensive strategy — from
            meticulous research and strategic planning to the seamless execution
            of business development and community building between Italy and
            Ghana.
          </p>
        </div> */}
        {/* End Title */}

        {/* Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 lg:items-center">
          <div className="aspect-w-16 aspect-h-9 lg:aspect-none">
            <img
              loading="lazy"
              className="relative h-96 lg:h-[650px] w-full object-cover rounded-2xl"
              src="/features-image.jpg"
              alt="IBAG Business Approach"
            />
          </div>
          {/* End Col */}

          {/* Timeline */}

          <div>
            <span className="inline-flex items-center rounded-full border border-gray-300 px-4 py-1 text-sm font-medium mb-4 text-gray-600">
              <span className="w-2 h-2 bg-gray-600 rounded-full mr-2"></span>
             Why Join Us
            </span>
            <div className="mb-8">
              <h2 className="text-3xl md:text-4xl mx-auto font-extrabold text-gray-800 leading-tight">
                Join Our International Business Community
              </h2>
            </div>

            {/* Heading */}
            {/* <div className="mb-4">
              <h3 className="text-[#ff0] text-xs font-medium uppercase">
                Steps
              </h3>
            </div> */}
            {/* End Heading */}

            <TimelineItem
               icon={<svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20"><path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3zM6 8a2 2 0 11-4 0 2 2 0 014 0zM16 18v-3a5.972 5.972 0 00-.75-2.906A3.005 3.005 0 0119 15v3h-3zM4.75 12.094A5.973 5.973 0 004 15v3H1v-3a3 3 0 013.75-2.906z"/></svg>}
               title="Network"
               description="Land your next contract or expand your clientele base during our social and business events. IBAG is strategically positioned to advance your business's network and net worth."
             />

             <TimelineItem
               icon={<svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20"><path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>}
               title="Collaborate"
               description="We celebrate Italian culture periodically to create local awareness of Italian festivities and customs as well as to provide a sense of belonging to home-sick Italians living in Ghana."
             />

             <TimelineItem
               icon={<svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd"/></svg>}
               title="Support"
               description="From time to time, we bring our members together informally by hosting 'Aperitivo' sessions and dinners to build and harness stronger inter-member connections and business relations."
               isLast={true}
             />

            <Button className="bg-gray-800 hover:bg-red-500 text-white transition-colors duration-200">
              Join Us Today
            </Button>
          </div>
          {/* End Timeline */}
        </div>
        {/* End Grid */}
      </div>
    </section>
  );
}
