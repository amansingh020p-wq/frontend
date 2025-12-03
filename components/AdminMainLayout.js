// import React, { useState } from 'react';
// import Sidebar from './Sidebar';
// import Header from './Header';
// import { cn } from '@/lib/utils';

// const MainLayout = ({ children }) => {
//   const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);

//   const toggleMobileSidebar = () => {
//     setMobileSidebarOpen(!mobileSidebarOpen);
//   };

//   return (
//     <div className="flex h-screen w-full overflow-hidden">
//       {/* Desktop sidebar */}
//       <div className="hidden md:block">
//         <Sidebar />
//       </div>

//       {/* Mobile sidebar */}
//       <div className={cn(
//         "fixed inset-0 z-50 md:hidden",
//         mobileSidebarOpen ? "block" : "hidden"
//       )}>
//         <div 
//           className="fixed inset-0 bg-black/50"
//           onClick={toggleMobileSidebar}
//         />
//         <div className="relative h-full">
//           <Sidebar />
//         </div>
//       </div>

//       <div className="flex-1 flex flex-col overflow-hidden">
//         <Header toggleMobileSidebar={toggleMobileSidebar} />
//         <main className="flex-1 overflow-y-auto bg-background p-4 md:p-6">
//           <div className="mx-auto max-w-7xl animate-fade-in">
//             {children}
//           </div>
//         </main>
//       </div>
//     </div>
//   );
// };

// export default MainLayout;
