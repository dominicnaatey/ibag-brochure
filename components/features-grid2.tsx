import React from "react";
import { Button } from "@/components/ui/button";
import { Users, Handshake, MessagesSquare } from "lucide-react";

interface TimelineItemProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  isLast?: boolean;
}

const TimelineItem: React.FC<TimelineItemProps> = ({
  icon,
  title,
  description,
  isLast = false,
}) => {
  return (
    <div className="flex gap-4 group cursor-pointer transition-all duration-300 hover:transform hover:translate-x-2">
      <div className="flex flex-col items-center">
        <div className="w-10 h-10 bg-gray-100 text-gray-600 rounded-full flex items-center justify-center transition-all duration-300 group-hover:bg-red-600 group-hover:text-white group-hover:scale-110">
          {icon}
        </div>
        {!isLast && <div className="w-px h-16 bg-gray-300 mt-2 transition-colors duration-300 group-hover:bg-red-300"></div>}
      </div>
      <div className="pb-8">
        <h3 className="text-gray-700 font-semibold text-xl md:text-2xl md:leading-tight mb-2 transition-colors duration-300 group-hover:text-red-600">
          {title}
        </h3>
        <p className="text-sm lg:text-base text-neutral-600 transition-colors duration-300 group-hover:text-gray-800">{description}</p>
      </div>
    </div>
  );
};

export default function FeaturesGrid2() {
  return (
    <section className="shadow-md rounded-3xl md:rounded-4xl bg-white">
      {/* Approach */}
      <div className="max-w-7xl px-4 xl:px-0 py-10 lg:py-20 mx-auto">
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
            <span className="inline-flex items-center  border shadow-inner border-gray-300 rounded-full px-4 py-1 text-sm font-medium mb-4 text-gray-700">
              <span className="w-2 h-2 bg-gray-700 rounded-full mr-2"></span>
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
              icon={<Users className="w-6 h-6" />}
              title="Network"
              description="Land your next contract or expand your clientele base during our social and business events. IBAG is strategically positioned to advance your business's network and net worth."
            />

            <TimelineItem
              icon={<Handshake className="w-6 h-6" />}
              title="Collaborate"
              description="We celebrate Italian culture periodically to create local awareness of Italian festivities and customs as well as to provide a sense of belonging to home-sick Italians living in Ghana."
            />

            <TimelineItem
              icon={<MessagesSquare className="w-6 h-6" />}
              title="Support"
              description="From time to time, we bring our members together informally by hosting 'Aperitivo' sessions and dinners to build and harness stronger inter-member connections and business relations."
              isLast={true}
            />

            {/* <LiquidButton className="text-gray-900 hover:text-red-500 h-10 w-30 hover:scale-100 hover:[&>div:first-child]:shadow-[inset_3px_3px_0.5px_-3px_rgba(239,68,68,0.9),inset_-3px_-3px_0.5px_-3px_rgba(239,68,68,0.85),inset_1px_1px_1px_-0.5px_rgba(239,68,68,0.6),inset_-1px_-1px_1px_-0.5px_rgba(239,68,68,0.6),inset_0_0_6px_6px_rgba(239,68,68,0.12),inset_0_0_2px_2px_rgba(239,68,68,0.06)] transition-all duration-300">
              Join Us Today
            </LiquidButton> */}
            <Button className="bg-gray-800 hover:bg-red-600 text-white h-10 w-30">
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
