// // 'use client';

// // import { useEffect, useRef } from 'react';
// // import { Shield, LineChart, Headphones, Wallet } from 'lucide-react';

// // const features = [
// //   {
// //     icon: Shield,
// //     title: 'Regulated & Trusted Broker',
// //     description: 'Licensed and regulated by top-tier financial authorities ensuring your funds are safe and secure.'
// //   },
// //   {
// //     icon: LineChart,
// //     title: 'Advanced Trading Platforms',
// //     description: 'State-of-the-art platforms with powerful tools and real-time market analysis.'
// //   },
// //   {
// //     icon: Headphones,
// //     title: 'Dedicated Customer Support',
// //     description: '24/7 multilingual support team ready to assist you with any questions or concerns.'
// //   },
// //   {
// //     icon: Wallet,
// //     title: 'Transparent Fees',
// //     description: 'Competitive spreads and clear fee structure with no hidden charges.'
// //   }
// // ];

// // export default function WhyChooseUs() {
// //   const sectionRef = useRef();

// //   useEffect(() => {
// //     const observer = new IntersectionObserver(
// //       ([entry]) => {
// //         if (entry.isIntersecting) {
// //           entry.target.classList.add('visible');
// //         }
// //       },
// //       { threshold: 0.1 }
// //     );

// //     if (sectionRef.current) {
// //       observer.observe(sectionRef.current);
// //     }

// //     return () => observer.disconnect();
// //   }, []);

// //   return (
// //     <section className="py-20 bg-[#d0e2d2]/20">
// //       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
// //         <div ref={sectionRef} className="text-center section-transition">
// //           <h2 className="text-3xl sm:text-4xl font-bold text-[#0e1f1b] mb-16">
// //             Why Choose Us?
// //           </h2>
          
// //           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
// //             {features.map((feature, index) => (
// //               <div
// //                 key={index}
// //                 className="glassmorphism rounded-xl p-6 transform transition-all duration-300 hover:scale-105 hover:shadow-xl"
// //               >
// //                 <div className="flex justify-center mb-4">
// //                   <feature.icon className="h-12 w-12 text-[#43b852]" />
// //                 </div>
// //                 <h3 className="text-xl font-semibold text-[#0e1f1b] mb-3">
// //                   {feature.title}
// //                 </h3>
// //                 <p className="text-gray-600">
// //                   {feature.description}
// //                 </p>
// //               </div>
// //             ))}
// //           </div>
// //         </div>
// //       </div>
// //     </section>
// //   );
// // }


// 'use client';

// import { useEffect, useRef } from 'react';
// import { Shield, LineChart, Headphones, Wallet } from 'lucide-react';

// const features = [
//   {
//     icon: Shield,
//     title: 'Regulated & Trusted Broker',
//     description: 'Licensed and regulated by top-tier financial authorities ensuring your funds are safe and secure.'
//   },
//   {
//     icon: LineChart,
//     title: 'Advanced Trading Platforms',
//     description: 'State-of-the-art platforms with powerful tools and real-time market analysis.'
//   },
//   {
//     icon: Headphones,
//     title: 'Dedicated Customer Support',
//     description: '24/7 multilingual support team ready to assist you with any questions or concerns.'
//   },
//   {
//     icon: Wallet,
//     title: 'Transparent Fees',
//     description: 'Competitive spreads and clear fee structure with no hidden charges.'
//   }
// ];

// export default function WhyChooseUs() {
//   const sectionRef = useRef();

//   useEffect(() => {
//     const observer = new IntersectionObserver(
//       ([entry]) => {
//         if (entry.isIntersecting) {
//           entry.target.classList.add('visible');
//         }
//       },
//       { threshold: 0.1 }
//     );

//     if (sectionRef.current) {
//       observer.observe(sectionRef.current);
//     }

//     return () => observer.disconnect();
//   }, []);

//   return (
//     <section className="py-12 md:py-20 bg-[#d0e2d2]/20">
//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//         <div ref={sectionRef} className="text-center section-transition">
//           <h2 className="text-3xl sm:text-4xl font-bold text-[#0e1f1b] mb-8 md:mb-16">
//             Why Choose Us?
//           </h2>
          
//           <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-8">
//             {features.map((feature, index) => (
//               <div
//                 key={index}
//                 className="glassmorphism rounded-xl p-4 md:p-6 transform transition-all duration-300 hover:scale-105 hover:shadow-xl"
//               >
//                 <div className="flex justify-center mb-3 md:mb-4">
//                   <feature.icon className="h-8 w-8 md:h-12 md:w-12 text-[#43b852]" />
//                 </div>
//                 <h3 className="text-base md:text-xl font-semibold text-[#0e1f1b] mb-2 md:mb-3">
//                   {feature.title}
//                 </h3>
//                 <p className="text-sm md:text-base text-gray-600">
//                   {feature.description}
//                 </p>
//               </div>
//             ))}
//           </div>
//         </div>
//       </div>

//       <style jsx>{`
//         .glassmorphism {
//           backdrop-filter: blur(10px);
//           background: rgba(255, 255, 255, 0.7);
//           border: 1px solid rgba(255, 255, 255, 0.3);
//           box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);
//         }
//         .section-transition {
//           opacity: 0;
//           transform: translateY(20px);
//           transition: opacity 0.6s ease-out, transform 0.6s ease-out;
//         }
//         .section-transition.visible {
//           opacity: 1;
//           transform: translateY(0);
//         }
//       `}</style>
//     </section>
//   );
// }



'use client';

import { useEffect, useRef } from 'react';
import { Shield, LineChart, Headphones, Wallet } from 'lucide-react';

const features = [
  {
    icon: Shield,
    title: 'Regulated & Trusted Broker',
    description: 'Licensed and regulated by top-tier financial authorities ensuring your funds are safe and secure.'
  },
  {
    icon: LineChart,
    title: 'Advanced Trading Platforms',
    description: 'State-of-the-art platforms with powerful tools and real-time market analysis.'
  },
  {
    icon: Headphones,
    title: 'Dedicated Customer Support',
    description: '24/7 multilingual support team ready to assist you with any questions or concerns.'
  },
  {
    icon: Wallet,
    title: 'Transparent Fees',
    description: 'Competitive spreads and clear fee structure with no hidden charges.'
  }
];

export default function WhyChooseUs() {
  const sectionRef = useRef();

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
        }
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section className="py-10 md:py-18 bg-[#d0e2d2]/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div ref={sectionRef} className="text-center section-transition">
          <h2 className="text-3xl sm:text-4xl font-bold text-[#0e1f1b] mb-8 md:mb-16">
            Why Choose Us?
          </h2>
          
          <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-8">
            {features.map((feature, index) => (
              <div
                key={index}
                className="glassmorphism rounded-xl p-4 md:p-6 transform transition-all duration-300 hover:scale-105 hover:shadow-xl"
              >
                <div className="flex justify-center mb-3 md:mb-4">
                  <feature.icon className="h-8 w-8 md:h-12 md:w-12 text-[#43b852]" />
                </div>
                <h3 className="text-base md:text-xl font-semibold text-[#0e1f1b] mb-2 md:mb-3">
                  {feature.title}
                </h3>
                <p className="text-sm md:text-base text-gray-600">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      <style jsx>{`
        .glassmorphism {
          backdrop-filter: blur(10px);
          background: rgba(255, 255, 255, 0.7);
          border: 1px solid rgba(255, 255, 255, 0.3);
          box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);
        }
        .section-transition {
          opacity: 0;
          transform: translateY(20px);
          transition: opacity 0.6s ease-out, transform 0.6s ease-out;
        }
        .section-transition.visible {
          opacity: 1;
          transform: translateY(0);
        }
      `}</style>
    </section>
  );
}