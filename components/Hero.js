// import { ChevronDown } from 'lucide-react';

// export default function Hero() {
//   return (
//     <div className="relative min-h-screen flex flex-col items-center justify-start overflow-hidden pt-36 md:pt-0 md:justify-center">
//       {/* Background elements */}
//       <div 
//         className="absolute inset-0 bg-cover bg-center"
//         style={{
//           backgroundImage: "url('https://images.pexels.com/photos/30596248/pexels-photo-30596248/free-photo-of-stunning-view-of-earth-from-space-at-night.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1')",
//         }}
//       />
//       <div className="absolute inset-0 bg-gradient-to-b from-black/50 to-transparent" />
      
//       {/* Left side glass boxes - desktop only */}
//       <div className="hidden lg:flex flex-col space-y-6 absolute left-8 xl:left-16 top-1/2 transform -translate-y-1/2">
//         <div className="glass-box group">
//           <p className="text-3xl font-bold text-white">23M+</p>
//           <p className="text-base text-white/80">Users</p>
//           <div className="glass-box-hover-effect" />
//         </div>
//         <div className="glass-box group">
//           <p className="text-3xl font-bold text-white">1K+</p>
//           <p className="text-base text-white/80">Awards</p>
//           <div className="glass-box-hover-effect" />
//         </div>
//       </div>

//       {/* Main centered content */}
//       <div className="relative z-10 text-center px-4 sm:px-6 lg:px-8 w-full">
//         <div className="md:mb-0">
//           <p className="text-sm sm:text-base md:text-lg text-white/90 mb-4 animate-fade-in">
//             Trusted by over <span className='bg-[#43b852] pl-[7px]  text-black rounded-full'> 15 Million </span> Traders
//           </p>
//           <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-white mb-6">
//             The Most Awarded Broker<br />for a <span className='text-[#43b852]'> Reason</span>
//           </h1>
//           <p className="text-lg sm:text-xl md:text-2xl text-white/90 mb-8 max-w-2xl mx-auto">
//             We offer a superior trading environment that puts traders in the best position to profit.
//           </p>
//           <button className="bg-[#43b852] text-black px-6 py-2 rounded-full text-lg font-semibold hover:bg-[#0e1f1b] transition-all transform hover:scale-105 mb-6 md:mb-0">
//             Get Started Now
//           </button>
//         </div>

//         {/* Mobile version - boxes below button */}
//         <div className="lg:hidden w-full flex justify-center space-x-4 mt-6">
//           <div className="glass-box-mobile">
//             <p className="text-lg font-bold text-white">23M+</p>
//             <p className="text-xs text-white/80">Users</p>
//           </div>
//           <div className="glass-box-mobile">
//             <p className="text-lg font-bold text-white">1K+</p>
//             <p className="text-xs text-white/80">Awards</p>
//           </div>
//           <div className="glass-box-mobile">
//             <p className="text-lg font-bold text-white">21K+</p>
//             <p className="text-xs text-white/80">Investors</p>
//           </div>
//           <div className="glass-box-mobile">
//             <p className="text-lg font-bold text-white">24/7</p>
//             <p className="text-xs text-white/80">Support</p>
//           </div>
//         </div>
//       </div>


//       {/* Right side glass boxes - desktop only */}
//       <div className="hidden lg:flex flex-col space-y-6 absolute right-8 xl:right-16 top-1/2 transform -translate-y-1/2">
//         <div className="glass-box group">
//           <p className="text-3xl font-bold text-white">21K+</p>
//           <p className="text-base text-white/80">Investors</p>
//           <div className="glass-box-hover-effect" />
//         </div>
//         <div className="glass-box group">
//           <p className="text-3xl font-bold text-white">24/7</p>
//           <p className="text-base text-white/80">Support</p>
//           <div className="glass-box-hover-effect" />
//         </div>
//       </div>

//       <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce hidden md:block">
//         <ChevronDown className="h-8 w-8 text-white" />
//       </div>

//       {/* Glass box styles */}
//       <style jsx>{`
//         .glass-box {
//           backdrop-filter: blur(12px);
//           background: rgba(255, 255, 255, 0.08);
//           border: 1px solid rgba(255, 255, 255, 0.15);
//           border-radius: 16px;
//           padding: 1.5rem 2rem;
//           text-align: center;
//           min-width: 140px;
//           transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
//           position: relative;
//           overflow: hidden;
//         }
//         .glass-box:hover {
//           transform: translateY(-5px) scale(1.03);
//           box-shadow: 0 10px 25px rgba(0, 0, 0, 0.2);
//           background: rgba(255, 255, 255, 0.12);
//           border-color: rgba(255, 255, 255, 0.25);
//         }
//         .glass-box-hover-effect {
//           position: absolute;
//           top: 0;
//           left: -100%;
//           width: 100%;
//           height: 100%;
//           background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.1), transparent);
//           transition: 0.6s;
//         }
//         .glass-box:hover .glass-box-hover-effect {
//           left: 100%;
//         }
//         .glass-box-mobile {
//           backdrop-filter: blur(5px);
//           background: rgba(255, 255, 255, 0.1);
//           border: 1px solid rgba(255, 255, 255, 0.2);
//           border-radius: 10px;
//           padding: 0.75rem 1rem;
//           text-align: center;
//           min-width: 80px;
//           flex: 1;
//           max-width: 100px;
//         }
//       `}</style>
//     </div>
//   );
// }


import { ChevronDown } from 'lucide-react';

export default function Hero() {
  return (
    <div className="relative h-[44rem] md:min-h-screen flex flex-col items-center justify-start overflow-hidden pt-36 md:pt-0 md:justify-center">
      {/* Background elements */}
      <div 
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: "url('/assets/hero4.jpg')",
        }}
      />
      <div className="absolute inset-0 bg-gradient-to-b from-black/50 to-transparent" />
      
      {/* Left side glass boxes - desktop only */}
      <div className="hidden lg:flex flex-col space-y-6 absolute left-8 xl:left-16 top-1/2 transform -translate-y-1/2">
        <div className="glass-box group">
          <p className="text-3xl font-bold text-black">5M+</p>
          <p className="text-base text-black/80">Users</p>
          <div className="glass-box-hover-effect" />
        </div>
        <div className="glass-box group">
          <p className="text-3xl font-bold text-black">1K+</p>
          <p className="text-base text-black/80">Awards</p>
          <div className="glass-box-hover-effect" />
        </div>
      </div>

      {/* Main centered content */}
      <div className="relative z-10 text-center px-4 sm:px-6 lg:px-8 w-full">
        <div className="md:mb-0">
          <p className="text-sm sm:text-base md:text-lg text-black/90 mb-4 animate-fade-in">
            Trusted by over <span className='bg-[#43b852] pl-[7px]  text-black rounded-full'> 5 Million </span> Traders
          </p>
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-black mb-6">
            The Most Trusted Broker<br />for a <span className='text-black'>Reason</span>
          </h1>
          <p className="text-lg sm:text-xl md:text-2xl text-black/90 mb-8 max-w-2xl mx-auto">
            We offer a superior trading environment that puts traders in the best position to profit.
          </p>
          <button className="bg-[#43b852] text-black px-6 py-2 rounded-full text-lg font-semibold hover:bg-white hover:text-[#0e1f1b] transition-all transform hover:scale-105 mb-6 md:mb-0">
            Get Started Now
          </button>
        </div>

        {/* Mobile version - boxes below button */}
        <div className="lg:hidden w-full flex justify-center space-x-4 mt-6">
          <div className="glass-box-mobile">
            <p className="text-lg font-bold text-black">5M+</p>
            <p className="text-xs text-black/80">Users</p>
          </div>
          <div className="glass-box-mobile">
            <p className="text-lg font-bold text-black">1K+</p>
            <p className="text-xs text-black/80">Awards</p>
          </div>
          <div className="glass-box-mobile">
            <p className="text-lg font-bold text-black">1M+</p>
            <p className="text-xs text-black/80">Investors</p>
          </div>
          <div className="glass-box-mobile">
            <p className="text-lg font-bold text-black">24/7</p>
            <p className="text-xs text-black/80">Support</p>
          </div>
        </div>
      </div>


      {/* Right side glass boxes - desktop only */}
      <div className="hidden lg:flex flex-col space-y-6 absolute right-8 xl:right-16 top-1/2 transform -translate-y-1/2">
        <div className="glass-box group">
          <p className="text-3xl font-bold text-black">1M+</p>
          <p className="text-base text-black/80">Investors</p>
          <div className="glass-box-hover-effect" />
        </div>
        <div className="glass-box group">
          <p className="text-3xl font-bold text-black">24/7</p>
          <p className="text-base text-black/80">Support</p>
          <div className="glass-box-hover-effect" />
        </div>
      </div>

      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce hidden md:block">
        <ChevronDown className="h-8 w-8 text-black" />
      </div>

      {/* Glass box styles */}
      <style jsx>{`
        .glass-box {
          backdrop-filter: blur(12px);
          background: rgba(255, 255, 255, 0.08);
          border: 1px solid rgba(255, 255, 255, 0.15);
          border-radius: 16px;
          padding: 1.5rem 2rem;
          text-align: center;
          min-width: 140px;
          transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
          position: relative;
          overflow: hidden;
        }
        .glass-box:hover {
          transform: translateY(-5px) scale(1.03);
          box-shadow: 0 10px 25px rgba(0, 0, 0, 0.2);
          background: rgba(255, 255, 255, 0.12);
          border-color: rgba(255, 255, 255, 0.25);
        }
        .glass-box-hover-effect {
          position: absolute;
          top: 0;
          left: -100%;
          width: 100%;
          height: 100%;
          background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.1), transparent);
          transition: 0.6s;
        }
        .glass-box:hover .glass-box-hover-effect {
          left: 100%;
        }
        .glass-box-mobile {
          backdrop-filter: blur(5px);
          background: rgba(255, 255, 255, 0.1);
          border: 1px solid rgba(255, 255, 255, 0.2);
          border-radius: 10px;
          padding: 0.75rem 1rem;
          text-align: center;
          min-width: 80px;
          flex: 1;
          max-width: 100px;
        }
      `}</style>
    </div>
  );
}