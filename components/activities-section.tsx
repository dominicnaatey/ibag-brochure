import React from 'react';
import { motion } from 'framer-motion';
import {MicVocal, BriefcaseBusiness, Presentation, Drama, Wine, MessageCircle, Award, Heart } from 'lucide-react';

export function ActivitiesSection() {
  return (
    <section className="pt-20 rounded-4xl">
      <div className="container mx-auto px-4 md:px-8 lg:px-16">
        <div className="text-center mb-12">
          <span className="inline-flex items-center rounded-full border border-gray-300 px-4 py-1 text-sm font-medium mb-4 text-gray-600">
            <span className="w-2 h-2 bg-gray-600 rounded-full mr-2"></span>
            Our Activities
          </span>
          <h2 className="text-4xl md:text-5xl font-extrabold text-gray-900 leading-tight">
            Discover Our Community <br/> Engagement
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {/*  */}
          <div className="text-start p-8 bg-white rounded-md border border-gray-100 group hover:shadow-lg transition-all duration-300">
            <div className="w-16 h-16 rounded-full flex items-center justify-center mb-6">
              <MicVocal className="w-16 h-16 text-gray-500" />
            </div>
            <h3 className="text-xl font-bold text-gray-700 mb-4">
              MONTHLY BUSINESS TALKS
            </h3>
            <p className="text-gray-600 leading-relaxed">
              Every month, we invite resource persons and experts across various business fields to educate our members on specific issues pertaining to their business's. This event doubles as a networking opportunity for interactions.
            </p>
          </div>
          {/*  */}
          <div className=" p-8 bg-white rounded-2xl border group hover:shadow-lg transition-all duration-300">
            <div className="w-16 h-16 rounded-full flex items-center justify-center mb-6">
              <Drama className="w-16 h-16 text-gray-600" />
            </div>
            <h3 className="text-xl font-bold text-gray-700 mb-4">
              ITALIAN CULTURAL CELEBRATIONS
            </h3>
            <p className="text-gray-600 leading-relaxed">
              We celebrate Italian culture periodically to create local awareness of Italian festivities and customs as well as to provide a sense of belonging to home-sick Italians living in Ghana.
            </p>
          </div>
          {/*  */}
          <div className="text-start p-8 bg-white rounded-2xl border group hover:shadow-lg transition-all duration-300">
            <div className="w-16 h-16 rounded-full flex items-center justify-center mb-6">
              <Wine className="w-16 h-16 text-gray-600" />
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