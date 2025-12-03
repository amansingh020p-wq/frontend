// 'use client';

// import Link from 'next/link';
// import { usePathname } from 'next/navigation';
// import { TrendingUp, Mail, Phone, MessageSquare, ChevronRight } from 'lucide-react';

// export default function Footer() {
//   const pathname = usePathname();

//   // Hide footer on /admin or any route under /admin/*
//   if (pathname.startsWith('/admin')) return null;
//   if (pathname.startsWith('/dashboard')) return null;

//   return (
//     <footer className="bg-white pt-16 pb-8 relative overflow-hidden">
//       <div className="absolute inset-0 bg-[#d0e2d2]/5" />
//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
//         <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-12">
//           {/* Company Info */}
//           <div className="col-span-2 md:col-span-1">
//             <div className="flex items-center space-x-2 mb-6 group">
//               <TrendingUp className="h-8 w-8 text-[#43b852] transform group-hover:scale-110 transition-transform" />
//               <span className="font-bold text-xl text-[#0e1f1b]">ForexFlow</span>
//             </div>
//             <p className="text-gray-600 mb-6 leading-relaxed">
//               Your trusted partner in the global financial markets, providing superior trading conditions since 2010.
//             </p>
//           </div>

//           {/* Quick Links */}
//           <div className="mt-6 md:mt-0 flex flex-col items-center">
//             <h3 className="text-lg font-semibold text-[#0e1f1b] mb-6">Quick Links</h3>
//             <ul className="space-y-3">
//               {['Home', 'About Us', 'Contact Us', 'Market Analysis'].map((link) => (
//                 <li key={link} className="flex justify-center">
//                   <Link 
//                     href="/"
//                     className="text-gray-600 hover:text-[#43b852] transition-colors flex items-center group"
//                   >
//                     <ChevronRight className="h-4 w-4 opacity-0 -ml-4 group-hover:opacity-100 group-hover:ml-0 transition-all mr-2" />
//                     <span className="whitespace-nowrap">{link}</span>
//                   </Link>
//                 </li>
//               ))}
//             </ul>
//           </div>

//           {/* Legal */}
//           <div className="mt-6 md:mt-0 flex flex-col items-center">
//             <h3 className="text-lg font-semibold text-[#0e1f1b] mb-6">Legal</h3>
//             <ul className="space-y-3">
//               {['Risk & Warning', 'Privacy Policy', 'Terms of Service'].map((link) => (
//                 <li key={link} className="flex justify-center">
//                   <Link 
//                     href="/"
//                     className="text-gray-600 hover:text-[#43b852] transition-colors flex items-center group"
//                   >
//                     <ChevronRight className="h-4 w-4 opacity-0 -ml-4 group-hover:opacity-100 group-hover:ml-0 transition-all mr-2" />
//                     <span className="whitespace-nowrap">{link}</span>
//                   </Link>
//                 </li>
//               ))}
//             </ul>
//           </div>

//           {/* Contact */}
//           <div className="col-span-2 md:col-span-1 mt-6 md:mt-0 flex flex-col items-center">
//             <h3 className="text-lg font-semibold text-[#0e1f1b] mb-4">Get in Touch</h3>
//             <ul className="w-full max-w-[200px]">
//               <li className="flex justify-center">
//                 <Link
//                   href="mailto:contact@forexflow.com"
//                   className="flex items-center p-2 rounded-lg hover:bg-[#d0e2d2]/20 transition-colors group w-full justify-center"
//                 >
//                   <Mail className="h-5 w-5 text-[#43b852] mr-3 transform group-hover:scale-110 transition-transform flex-shrink-0" />
//                   <span className="text-gray-600 group-hover:text-[#0e1f1b] transition-colors break-words">contact@forexflow.com</span>
//                 </Link>
//               </li>
//               <li className="flex justify-center">
//                 <Link
//                   href="tel:+15551234567"
//                   className="flex items-center p-2 rounded-lg hover:bg-[#d0e2d2]/20 transition-colors group w-full justify-center"
//                 >
//                   <Phone className="h-5 w-5 text-[#43b852] mr-3 transform group-hover:scale-110 transition-transform flex-shrink-0" />
//                   <span className="text-gray-600 group-hover:text-[#0e1f1b] transition-colors">+1 (555) 123-4567</span>
//                 </Link>
//               </li>
//               <li className="flex justify-center">
//                 <Link 
//                   href="/"
//                   className="flex items-center p-2 rounded-lg hover:bg-[#d0e2d2]/20 transition-colors group w-full justify-center"
//                 >
//                   <MessageSquare className="h-5 w-5 text-[#43b852] mr-3 transform group-hover:scale-110 transition-transform flex-shrink-0" />
//                   <span className="text-gray-600 group-hover:text-[#0e1f1b] transition-colors">Live Chat</span>
//                 </Link>
//               </li>
//             </ul>
//           </div>
//         </div>
//       </div>
//     </footer>
//   );
// }




'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { TrendingUp, Mail, Phone, MessageSquare, ChevronRight } from 'lucide-react';

export default function Footer() {
  const pathname = usePathname();

  // Hide footer on /admin or any route under /admin/*
  if (pathname.startsWith('/admin')) return null;
  if (pathname.startsWith('/dashboard')) return null;

  return (
    <footer className="bg-white pt-16 pb-8 relative overflow-hidden">
      <div className="absolute inset-0 bg-[#d0e2d2]/5" />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-12">
          {/* Company Info */}
          <div className="col-span-2 md:col-span-1">
            <div className="flex items-center space-x-2 mb-6 group">
              <TrendingUp className="h-8 w-8 text-[#43b852] transform group-hover:scale-110 transition-transform" />
              <span className="font-bold text-xl text-[#0e1f1b]">ForexFlow</span>
            </div>
            <p className="text-gray-600 mb-6 leading-relaxed">
              Your trusted partner in the global financial markets, providing superior trading conditions since 2010.
            </p>
          </div>

          {/* Quick Links */}
          <div className="mt-6 md:mt-0 flex flex-col items-center">
            <h3 className="text-lg font-semibold text-[#0e1f1b] mb-6">Quick Links</h3>
            <ul className="space-y-3">
              {['Home', 'About Us', 'Contact Us', 'Market Analysis'].map((link) => (
                <li key={link} className="flex justify-center">
                  <Link 
                    href="/"
                    className="text-gray-600 hover:text-[#43b852] transition-colors flex items-center group"
                  >
                    <ChevronRight className="h-4 w-4 opacity-0 -ml-4 group-hover:opacity-100 group-hover:ml-0 transition-all mr-2" />
                    <span className="whitespace-nowrap">{link}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal */}
          <div className="mt-6 md:mt-0 flex flex-col items-center">
            <h3 className="text-lg font-semibold text-[#0e1f1b] mb-6">Legal</h3>
            <ul className="space-y-3">
              {['Risk & Warning', 'Privacy Policy', 'Terms of Service'].map((link) => (
                <li key={link} className="flex justify-center">
                  <Link 
                    href="/"
                    className="text-gray-600 hover:text-[#43b852] transition-colors flex items-center group"
                  >
                    <ChevronRight className="h-4 w-4 opacity-0 -ml-4 group-hover:opacity-100 group-hover:ml-0 transition-all mr-2" />
                    <span className="whitespace-nowrap">{link}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div className="col-span-2 md:col-span-1 mt-6 md:mt-0 flex flex-col items-center">
            <h3 className="text-lg font-semibold text-[#0e1f1b] mb-4">Get in Touch</h3>
            <ul className="w-full max-w-[200px]">
              <li className="flex justify-center">
                <Link
                  href="mailto:contact@forexflow.com"
                  className="flex items-center p-2 rounded-lg hover:bg-[#d0e2d2]/20 transition-colors group w-full justify-center"
                >
                  <Mail className="h-5 w-5 text-[#43b852] mr-3 transform group-hover:scale-110 transition-transform flex-shrink-0" />
                  <span className="text-gray-600 group-hover:text-[#0e1f1b] transition-colors break-words">contact@forexflow.com</span>
                </Link>
              </li>
              <li className="flex justify-center">
                <Link
                  href="tel:+15551234567"
                  className="flex items-center p-2 rounded-lg hover:bg-[#d0e2d2]/20 transition-colors group w-full justify-center"
                >
                  <Phone className="h-5 w-5 text-[#43b852] mr-3 transform group-hover:scale-110 transition-transform flex-shrink-0" />
                  <span className="text-gray-600 group-hover:text-[#0e1f1b] transition-colors">+1 (555) 123-4567</span>
                </Link>
              </li>
              <li className="flex justify-center">
                <Link 
                  href="/"
                  className="flex items-center p-2 rounded-lg hover:bg-[#d0e2d2]/20 transition-colors group w-full justify-center"
                >
                  <MessageSquare className="h-5 w-5 text-[#43b852] mr-3 transform group-hover:scale-110 transition-transform flex-shrink-0" />
                  <span className="text-gray-600 group-hover:text-[#0e1f1b] transition-colors">Live Chat</span>
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
}
