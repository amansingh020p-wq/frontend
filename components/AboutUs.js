// 'use client';

// import { useEffect, useRef } from 'react';

// export default function AboutUs() {
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
//     <section className="py-20 bg-white">
//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//         <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
//           <div ref={sectionRef} className="section-transition">
//             <h2 className="text-3xl sm:text-4xl font-bold text-[#0e1f1b] mb-6">
//               Your Trusted Partner in the Financial Markets
//             </h2>
//             <p className="text-gray-600 mb-6 leading-relaxed">
//               ForexFlow has been at the forefront of online trading since 2010, providing traders worldwide with access to global financial markets. Our commitment to innovation, transparency, and customer success has made us one of the most trusted names in the industry.
//             </p>
//             <p className="text-gray-600 mb-8 leading-relaxed">
//               With state-of-the-art technology, competitive spreads, and comprehensive educational resources, we empower traders of all levels to achieve their financial goals.
//             </p>
//             <button className="bg-[#43b852] text-white px-8 py-3 rounded-full hover:bg-[#0e1f1b] transition-all transform hover:scale-105">
//               Start Trading
//             </button>
//           </div>
          
//           <div className="relative group">
//             <div className="absolute inset-0 bg-[#43b852] rounded-lg transform group-hover:translate-x-3 group-hover:translate-y-3 transition-transform"></div>
//             <img
//               src="https://images.unsplash.com/photo-1590283603385-17ffb3a7f29f?auto=format&fit=crop&q=80"
//               alt="Trading Platform"
//               className="relative z-10 rounded-lg shadow-xl transform transition-transform group-hover:-translate-x-3 group-hover:-translate-y-3"
//             />
//           </div>
//         </div>
//       </div>
//     </section>
//   );
// }


export default function AboutUs() {
  return (
    <section className="py-16 bg-white dark:bg-[#0F1F1B]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          {/* Left side heading */}
          <div className="lg:col-span-1">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-[#F2F2F2] mb-4">
              About Us
            </h2>
            <div className="w-20 h-1 bg-[#43B852] mb-6"></div>
          </div>

          {/* Right side two columns */}
          <div className="lg:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* First column */}
            <div className="space-y-4">
              <p className="text-gray-600 dark:text-[#ABBAB6] leading-relaxed">
                Can be swift and dramatic, posing the risk of rapid, significant loss. 
                Lastly, past performance is not indicative of future results - forex trading 
                is always changing, emphasizing the need for sound strategy and strong risk management.
              </p>
            </div>

            {/* Second column */}
            <div className="">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-[#F2F2F2]">
                Forex Trading Platforms?
              </h3>
              <p className="text-gray-600 dark:text-[#ABBAB6] leading-relaxed">
                The forex trading platform is the trader's window to the world's currency marketplace. 
                To be effective, it's imperative that your trading platform is up to the many 
                challenges of the live market.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
