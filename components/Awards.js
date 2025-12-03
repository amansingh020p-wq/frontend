

'use client';

import { Award } from 'lucide-react';

const awards = [
  '/assets/award1.png',
  '/assets/award2.png',
  '/assets/award3.png',
  '/assets/award4.webp',
  '/assets/award5.webp',
  '/assets/award6.webp',
  '/assets/award7.webp',
];

const Awards = () => {
  return (
    <section className="pb-12 md:pb-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Heading */}
        <div className="text-center mb-8 md:mb-12">
          <div className="flex items-center justify-center mb-4">
            <Award className="h-8 w-8 md:h-10 md:w-10 text-[#43b852] mr-3 animate-pulse" />
            <h2 className="text-3xl md:text-4xl font-bold text-[#0e1f1b]">
              Awards
            </h2>
          </div>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Recognized by industry leaders for our excellence in trading services
          </p>
        </div>

        {/* Desktop Grid */}
        <div className="hidden md:grid grid-cols-7 gap-6 md:gap-8">
          {awards.map((award, index) => (
            <div key={index} className="flex items-center justify-center">
              <div className="w-[134px] h-[134px] rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-300">
                <img
                  src={award}
                  alt={`Award ${index + 1}`}
                  className="w-full h-full object-contain p-2"
                  loading="lazy"
                />
              </div>
            </div>
          ))}
        </div>

        {/* Mobile Continuous Auto-scrolling */}
        <div className="md:hidden overflow-hidden relative">
          <div className="flex items-center space-x-6 animate-marquee">
            {awards.concat(awards).map((award, index) => (
              <div
                key={index}
                className="flex-shrink-0 w-[120px] h-[120px] rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-300"
              >
                <img
                  src={award}
                  alt={`Award ${index + 1}`}
                  className="w-full h-full object-contain p-2"
                  loading="lazy"
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Awards;