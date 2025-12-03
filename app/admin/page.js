
// 'use client';

// import React, { useState, useEffect } from 'react';
// import {
//   Users,
//   TrendingUp,
//   Wallet,
//   DollarSign,
//   CreditCard,
//   ArrowRight,
//   X,
//   Check,
//   Eye
// } from 'lucide-react';
// import Link from 'next/link';
// import StatusBadge from '../../components/ui/StatusBadge';
// import { Skeleton } from '@/components/ui/skeleton';
// import UserDetailsPopup from '@/components/UserDetailsPopup';
// import { mockUserDetails } from '@/utils/mockUserData';

// const Dashboard = () => {
//   const [loading, setLoading] = useState(true);
//   const [mainStats, setMainStats] = useState([]);
//   const [recentWithdrawals, setRecentWithdrawals] = useState([]);
//   const [pendingLoans, setPendingLoans] = useState([]);
//   const [toasts, setToasts] = useState([]);
//   const [showUserDetails, setShowUserDetails] = useState(false);
// const [selectedUser, setSelectedUser] = useState(null);
// const [recentDeposits, setRecentDeposits] = useState([]);

// useEffect(() => {
//   // Simulate data loading
//   const timer = setTimeout(() => {
//     setMainStats([
//       { title: 'Total Users', value: '1,483', icon: Users, trend: { value: '12%', isUp: true } },
//       { title: 'Active Traders', value: '652', icon: TrendingUp, trend: { value: '8%', isUp: true } },
//       { title: 'Pending Withdrawals', value: '$24,583', icon: Wallet, trend: { value: '5%', isUp: false } },
//       { title: 'Pending Deposits', value: '$56,000', icon: CreditCard, trend: { value: '22%', isUp: true } }, // Changed from Pending Loans to Pending Deposits
//     ]);
//     setRecentWithdrawals([
//       { id: 'W-3928', user: 'John Smith', amount: '$1,200', date: '2023-04-10', status: 'pending' },
//       { id: 'W-3927', user: 'Sarah Johnson', amount: '$850', date: '2023-04-09', status: 'pending' },
//       { id: 'W-3926', user: 'Michael Brown', amount: '$3,500', date: '2023-04-09', status: 'pending' },
//       { id: 'W-3925', user: 'Emily Davis', amount: '$750', date: '2023-04-08', status: 'completed' },
//     ]);
//     // Replace pendingLoans with recentDeposits
//     setRecentDeposits([
//       { id: 'D-7829', user: 'Robert Wilson', amount: '$5,000', method: 'Bitcoin', date: '2023-04-11', status: 'pending' },
//       { id: 'D-7828', user: 'Jennifer Lee', amount: '$10,000', method: 'Bank Transfer', date: '2023-04-10', status: 'pending' },
//       { id: 'D-7827', user: 'David Martinez', amount: '$2,500', method: 'Ethereum', date: '2023-04-09', status: 'pending' },
//       { id: 'D-7826', user: 'Jessica Taylor', amount: '$7,500', method: 'Credit Card', date: '2023-04-08', status: 'completed' },
//     ]);
//     setLoading(false);
//   }, 2000);

//   return () => clearTimeout(timer);
// }, []);

//   // Toast notification component
//   const Toast = ({ id, type, message }) => {
//     const toastStyles = {
//       success: 'bg-green-600 border-green-700 text-white',
//       error: 'bg-red-600 border-red-700 text-white',
//       info: 'bg-blue-600 border-blue-700 text-white'
//     };

//     const toastIcons = {
//       success: <Check className="w-4 h-4" />,
//       error: <X className="w-4 h-4" />,
//       info: <Eye className="w-4 h-4" />
//     };

//     return (
//       <div
//         className={`flex items-center gap-3 px-4 py-3 rounded-md border ${toastStyles[type]} shadow-lg animate-fade-in max-w-xs sm:max-w-sm`}
//       >
//         <div className="flex-shrink-0">
//           {toastIcons[type]}
//         </div>
//         <div className="text-sm font-medium flex-1">{message}</div>
//         <button
//           onClick={() => removeToast(id)}
//           className="ml-2 opacity-70 hover:opacity-100"
//         >
//           <X className="w-4 h-4" />
//         </button>
//       </div>
//     );
//   };

//   // Add a new toast
//   const addToast = (type, message) => {
//     const id = Date.now();
//     setToasts((prev) => [...prev, { id, type, message }]);

//     // Auto remove after 5 seconds
//     setTimeout(() => {
//       removeToast(id);
//     }, 5000);
//   };

//   // Remove a toast
//   const removeToast = (id) => {
//     setToasts((prev) => prev.filter((toast) => toast.id !== id));
//   };

//   // Handle withdrawal actions
//   const handleWithdrawalAction = (id, action) => {
//     if (action === 'accept') {
//       // Update the withdrawal status in state
//       setRecentWithdrawals(prev =>
//         prev.map(w => w.id === id ? { ...w, status: 'completed' } : w)
//       );
//       addToast('success', 'Withdrawal request accepted successfully!');
//     } else if (action === 'reject') {
//       // Update the withdrawal status in state
//       setRecentWithdrawals(prev =>
//         prev.map(w => w.id === id ? { ...w, status: 'rejected' } : w)
//       );
//       addToast('error', 'Withdrawal request rejected successfully!');
//     } else if (action === 'view') {
//       const user = recentWithdrawals.find(w => w.id === id)?.user;
//       handleViewAction(id, user);
//     }
//   };
// // Handle deposit actions
// const handleDepositAction = (id, action) => {
//   if (action === 'accept') {
//     // Update the deposit status in state
//     setRecentDeposits(prev =>
//       prev.map(deposit => deposit.id === id ? { ...deposit, status: 'completed' } : deposit)
//     );
//     addToast('success', 'Deposit request accepted successfully!');
//   } else if (action === 'reject') {
//     // Update the deposit status in state
//     setRecentDeposits(prev =>
//       prev.map(deposit => deposit.id === id ? { ...deposit, status: 'rejected' } : deposit)
//     );
//     addToast('error', 'Deposit request rejected successfully!');
//   } else if (action === 'view') {
//     const user = recentDeposits.find(deposit => deposit.id === id)?.user;
//     handleViewAction(id, user);
//   }
// };

//   // Action button component
//   const ActionButton = ({ type, onClick }) => {
//     const buttonStyles = {
//       accept: 'bg-green-500/20 text-green-400 border-green-500/30 hover:bg-green-500/30',
//       reject: 'bg-red-500/20 text-red-400 border-red-500/30 hover:bg-red-500/30',
//       view: 'bg-blue-500/20 text-blue-400 border-blue-500/30 hover:bg-blue-500/30'
//     };

//     const buttonIcons = {
//       accept: <Check className="w-3 h-3" />,
//       reject: <X className="w-3 h-3" />,
//       view: <Eye className="w-3 h-3" />
//     };

//     return (
//       <button
//         onClick={onClick}
//         className={`p-1.5 rounded-md border ${buttonStyles[type]} transition-colors`}
//         aria-label={type}
//       >
//         {buttonIcons[type]}
//       </button>
//     );
//   };



//   const handleViewAction = (userId, userName) => {
//     const user = {
//       name: userName,
//       ...mockUserDetails
//     };
//     setSelectedUser(user);
//     setShowUserDetails(true);
//   };

//   return (
//     <div className="space-y-6 py-4 sm:py-6 -mt-10 md:-mt-12">
//       {/* Toast Notifications Container */}
//       <div className="fixed top-4 mt-16 mr-4 md:mr-0 right-4 z-50 space-y-3">
//         {toasts.map((toast) => (
//           <Toast key={toast.id} {...toast} />
//         ))}
//       </div>



//       {showUserDetails && (
//         <UserDetailsPopup 
//         user={selectedUser} 
//         onClose={() => setShowUserDetails(false)}
//         showImages={false}
//         showForex={true}
//       />
//       )}

//       <h1 className="text-2xl font-bold dark:text-[#F2F2F2]">Dashboard Overview</h1>

//       {/* Stats Cards - Skeleton Loading */}
//       <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4">
//         {loading ? (
//           Array.from({ length: 4 }).map((_, index) => (
//             <div key={index} className="dark:bg-[#142924] rounded-lg dark:border-[#2A3F3A] border shadow-sm p-3 sm:p-4">
//               <div className="flex justify-between items-start">
//                 <div className="w-full">
//                   <Skeleton className="h-4 w-3/4 mb-2" />
//                   <Skeleton className="h-6 w-full mt-1" />
//                 </div>
//                 <Skeleton className="w-5 h-5 rounded-full" />
//               </div>
//               <Skeleton className="h-4 w-1/2 mt-3" />
//             </div>
//           ))
//         ) : (
//           mainStats.map((stat) => (
//             <div key={stat.title} className="dark:bg-[#142924] rounded-lg dark:border-[#2A3F3A] border shadow-sm p-3 sm:p-4">
//               <div className="flex justify-between items-start">
//                 <div>
//                   <p className="text-xs sm:text-sm text-gray-500 dark:text-[#ABBAB6]">{stat.title}</p>
//                   <p className="text-lg sm:text-xl md:text-2xl font-bold mt-1 dark:text-[#F2F2F2]">{stat.value}</p>
//                 </div>
//                 <div className="p-1 sm:p-2 rounded-full">
//                   <stat.icon className="w-4 h-4 sm:w-5 sm:h-5 text-gray-600 dark:text-[#ABBAB6]" />
//                 </div>
//               </div>
//               {stat.trend && (
//                 <div className={`flex items-center mt-2 sm:mt-4 text-xs sm:text-sm ${stat.trend.isUp ? 'text-green-500' : 'text-red-500'}`}>
//                   {stat.trend.isUp ? '↑' : '↓'} {stat.trend.value}
//                   <span className="ml-1 text-gray-500 dark:text-[#ABBAB6] hidden sm:inline">vs last month</span>
//                 </div>
//               )}
//             </div>
//           ))
//         )}
//       </div>

//       {/* Recent Withdrawals */}
//       <div className="dark:bg-[#142924] rounded-lg border dark:border-[#2A3F3A] shadow-sm overflow-hidden">
//         <div className="p-4 sm:p-6 flex justify-between items-center border-b dark:border-[#2A3F3A]">
//           <h2 className="text-lg sm:text-xl font-semibold dark:text-[#F2F2F2]">Recent Withdrawal Requests</h2>
//           <Link href="/admin/withdrawal-request" className="text-xs sm:text-sm text-blue-600 flex items-center gap-1 hover:underline">
//             View All <ArrowRight size={16} />
//           </Link>
//         </div>
//         <div className="p-2 sm:p-4 overflow-x-auto">
//           <table className="w-full min-w-[600px] sm:min-w-0">
//             <thead>
//               <tr className="border-b dark:border-[#2A3F3A]">
//                 <th className="px-3 py-2 text-left text-xs sm:text-sm font-medium text-gray-500 dark:text-[#ABBAB6] whitespace-nowrap">ID</th>
//                 <th className="px-3 py-2 text-left text-xs sm:text-sm font-medium text-gray-500 dark:text-[#ABBAB6] whitespace-nowrap">User</th>
//                 <th className="px-3 py-2 text-left text-xs sm:text-sm font-medium text-gray-500 dark:text-[#ABBAB6] whitespace-nowrap">Amount</th>
//                 <th className="px-3 py-2 text-left text-xs sm:text-sm font-medium text-gray-500 dark:text-[#ABBAB6] whitespace-nowrap">Date</th>
//                 <th className="px-3 py-2 text-left text-xs sm:text-sm font-medium text-gray-500 dark:text-[#ABBAB6] whitespace-nowrap">Status</th>
//                 <th className="px-3 py-2 text-left text-xs sm:text-sm font-medium text-gray-500 dark:text-[#ABBAB6] whitespace-nowrap">Actions</th>
//               </tr>
//             </thead>
//             <tbody>
//               {loading ? (
//                 Array.from({ length: 4 }).map((_, index) => (
//                   <tr key={index} className="border-b dark:border-[#2A3F3A] hover:bg-muted/50">
//                     <td className="px-3 py-2 whitespace-nowrap"><Skeleton className="h-4 w-16" /></td>
//                     <td className="px-3 py-2 whitespace-nowrap"><Skeleton className="h-4 w-24" /></td>
//                     <td className="px-3 py-2 whitespace-nowrap"><Skeleton className="h-4 w-20" /></td>
//                     <td className="px-3 py-2 whitespace-nowrap"><Skeleton className="h-4 w-24" /></td>
//                     <td className="px-3 py-2 whitespace-nowrap"><Skeleton className="h-6 w-16" /></td>
//                     <td className="px-3 py-2 whitespace-nowrap">
//                       <div className="flex gap-1">
//                         <Skeleton className="h-6 w-6" />
//                         <Skeleton className="h-6 w-6" />
//                         <Skeleton className="h-6 w-6" />
//                       </div>
//                     </td>
//                   </tr>
//                 ))
//               ) : (
//                 recentWithdrawals.map((withdrawal) => (
//                   <tr key={withdrawal.id} className="border-b dark:border-[#2A3F3A] hover:bg-muted/50">
//                     <td className="px-3 py-2 text-xs sm:text-sm dark:text-[#F2F2F2] whitespace-nowrap">{withdrawal.id}</td>
//                     <td className="px-3 py-2 text-xs sm:text-sm dark:text-[#F2F2F2] whitespace-nowrap">{withdrawal.user}</td>
//                     <td className="px-3 py-2 text-xs sm:text-sm font-medium dark:text-[#F2F2F2] whitespace-nowrap">{withdrawal.amount}</td>
//                     <td className="px-3 py-2 text-xs sm:text-sm dark:text-[#F2F2F2] whitespace-nowrap">{withdrawal.date}</td>
//                     <td className="px-3 py-2 text-xs sm:text-sm whitespace-nowrap">
//                       <StatusBadge
//                         status={withdrawal.status}
//                         variant={
//                           withdrawal.status === 'completed' ? 'success' :
//                             withdrawal.status === 'rejected' ? 'destructive' :
//                               'warning'
//                         }
//                         className="text-xs sm:text-sm"
//                       />
//                     </td>
//                     <td className="px-3 py-2 text-xs sm:text-sm whitespace-nowrap">
//                       <div className="flex gap-1">
//                         {withdrawal.status === 'pending' ? (
//                           <>
//                             <ActionButton
//                               type="accept"
//                               onClick={() => handleWithdrawalAction(withdrawal.id, 'accept')}
//                             />
//                             <ActionButton
//                               type="reject"
//                               onClick={() => handleWithdrawalAction(withdrawal.id, 'reject')}
//                             />
//                             <ActionButton
//                               type="view"
//                               onClick={() => handleWithdrawalAction(withdrawal.id, 'view')}
//                             />
//                           </>
//                         ) : (
//                           <ActionButton
//                             type="view"
//                             onClick={() => handleWithdrawalAction(withdrawal.id, 'view')}
//                           />
//                         )}
//                       </div>
//                     </td>
//                   </tr>
//                 ))
//               )}
//             </tbody>
//           </table>
//         </div>
//       </div>

//       {/* Recent Deposit Requests */}
// <div className="dark:bg-[#142924] rounded-lg border dark:border-[#2A3F3A] shadow-sm overflow-hidden">
//   <div className="p-4 sm:p-6 flex justify-between items-center border-b dark:border-[#2A3F3A]">
//     <h2 className="text-lg sm:text-xl font-semibold dark:text-[#F2F2F2]">Recent Deposit Requests</h2>
//     <Link href="/admin/deposit-request" className="text-xs sm:text-sm text-blue-600 flex items-center gap-1 hover:underline">
//       View All <ArrowRight size={16} />
//     </Link>
//   </div>
//   <div className="p-2 sm:p-4 overflow-x-auto">
//     <table className="w-full min-w-[700px] sm:min-w-0">
//       <thead>
//         <tr className="border-b dark:border-[#2A3F3A]">
//           <th className="px-3 py-2 text-left text-xs sm:text-sm font-medium text-gray-500 dark:text-[#ABBAB6] whitespace-nowrap">ID</th>
//           <th className="px-3 py-2 text-left text-xs sm:text-sm font-medium text-gray-500 dark:text-[#ABBAB6] whitespace-nowrap">User</th>
//           <th className="px-3 py-2 text-left text-xs sm:text-sm font-medium text-gray-500 dark:text-[#ABBAB6] whitespace-nowrap">Amount</th>
//           <th className="px-3 py-2 text-left text-xs sm:text-sm font-medium text-gray-500 dark:text-[#ABBAB6] whitespace-nowrap">Method</th>
//           <th className="px-3 py-2 text-left text-xs sm:text-sm font-medium text-gray-500 dark:text-[#ABBAB6] whitespace-nowrap">Date</th>
//           <th className="px-3 py-2 text-left text-xs sm:text-sm font-medium text-gray-500 dark:text-[#ABBAB6] whitespace-nowrap">Status</th>
//           <th className="px-3 py-2 text-left text-xs sm:text-sm font-medium text-gray-500 dark:text-[#ABBAB6] whitespace-nowrap">Actions</th>
//         </tr>
//       </thead>
//       <tbody>
//         {loading ? (
//           Array.from({ length: 4 }).map((_, index) => (
//             <tr key={index} className="border-b dark:border-[#2A3F3A] hover:bg-muted/50">
//               <td className="px-3 py-2 whitespace-nowrap"><Skeleton className="h-4 w-16" /></td>
//               <td className="px-3 py-2 whitespace-nowrap"><Skeleton className="h-4 w-24" /></td>
//               <td className="px-3 py-2 whitespace-nowrap"><Skeleton className="h-4 w-20" /></td>
//               <td className="px-3 py-2 whitespace-nowrap"><Skeleton className="h-4 w-20" /></td>
//               <td className="px-3 py-2 whitespace-nowrap"><Skeleton className="h-4 w-24" /></td>
//               <td className="px-3 py-2 whitespace-nowrap"><Skeleton className="h-6 w-16" /></td>
//               <td className="px-3 py-2 whitespace-nowrap">
//                 <div className="flex gap-1">
//                   <Skeleton className="h-6 w-6" />
//                   <Skeleton className="h-6 w-6" />
//                   <Skeleton className="h-6 w-6" />
//                 </div>
//               </td>
//             </tr>
//           ))
//         ) : (
//           recentDeposits.map((deposit) => (
//             <tr key={deposit.id} className="border-b dark:border-[#2A3F3A] hover:bg-muted/50">
//               <td className="px-3 py-2 text-xs sm:text-sm dark:text-[#F2F2F2] whitespace-nowrap">{deposit.id}</td>
//               <td className="px-3 py-2 text-xs sm:text-sm dark:text-[#F2F2F2] whitespace-nowrap">{deposit.user}</td>
//               <td className="px-3 py-2 text-xs sm:text-sm font-medium dark:text-[#F2F2F2] whitespace-nowrap">{deposit.amount}</td>
//               <td className="px-3 py-2 text-xs sm:text-sm dark:text-[#F2F2F2] whitespace-nowrap">{deposit.method}</td>
//               <td className="px-3 py-2 text-xs sm:text-sm dark:text-[#F2F2F2] whitespace-nowrap">{deposit.date}</td>
//               <td className="px-3 py-2 text-xs sm:text-sm whitespace-nowrap">
//                 <StatusBadge
//                   status={deposit.status}
//                   variant={
//                     deposit.status === 'completed' ? 'success' :
//                       deposit.status === 'rejected' ? 'destructive' :
//                         'warning'
//                   }
//                   className="text-xs sm:text-sm"
//                 />
//               </td>
//               <td className="px-3 py-2 text-xs sm:text-sm whitespace-nowrap">
//                 <div className="flex gap-1">
//                   {deposit.status === 'pending' ? (
//                     <>
//                       <ActionButton
//                         type="accept"
//                         onClick={() => handleDepositAction(deposit.id, 'accept')}
//                       />
//                       <ActionButton
//                         type="reject"
//                         onClick={() => handleDepositAction(deposit.id, 'reject')}
//                       />
//                       <ActionButton
//                         type="view"
//                         onClick={() => handleDepositAction(deposit.id, 'view')}
//                       />
//                     </>
//                   ) : (
//                     <ActionButton
//                       type="view"
//                       onClick={() => handleDepositAction(deposit.id, 'view')}
//                     />
//                   )}
//                 </div>
//               </td>
//             </tr>
//           ))
//         )}
//       </tbody>
//     </table>
//   </div>
// </div>
//     </div>
//   );
// };

// export default Dashboard;

'use client';

import React, { useState, useEffect } from 'react';
import {
  Users,
  TrendingUp,
  Wallet,
  DollarSign,
  CreditCard,
  ArrowRight,
  X,
  Check,
  Eye,
  RefreshCw
} from 'lucide-react';
import Link from 'next/link';
import StatusBadge from '../../components/ui/StatusBadge';
import { Skeleton } from '@/components/ui/skeleton';
import UserDetailsPopup from '@/components/UserDetailsPopup';
import api from '@/utils/axios';

// API Service for Dashboard
const dashboardApi = {
  // Fetch KPI data
  getKpiData: async () => {
    try {
      const response = await api.get('/admin/get-users-kpi');
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Failed to fetch KPI data');
    }
  },

  // Accept/Reject withdrawal using the same routes as WithdrawRequest
  approveWithdrawal: async (withdrawalId) => {
    try {
      const response = await api.post(`/admin/approve-withdrawal`, { id: withdrawalId });
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Failed to approve withdrawal');
    }
  },

  // Reject withdrawal using the same routes as WithdrawRequest
  rejectWithdrawal: async (withdrawalId) => {
    try {
      const response = await api.post(`/admin/reject-withdrawal`, { id: withdrawalId });
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Failed to reject withdrawal');
    }
  },

  // Accept/Reject deposit
  updateDepositStatus: async (transactionId, status, reason = '') => {
    try {
      const response = await api.patch(`/admin/transactions/${transactionId}/status`, {
        status: status.toUpperCase(),
        reason
      });
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Failed to update deposit status');
    }
  },

  // Fetch user details by ID
  getUserById: async (userId) => {
    try {
      const response = await api.get(`/admin/get-user/${userId}`);
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Failed to fetch user details');
    }
  }
};

const Dashboard = () => {
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState(null);
  const [mainStats, setMainStats] = useState([]);
  const [recentWithdrawals, setRecentWithdrawals] = useState([]);
  const [recentDeposits, setRecentDeposits] = useState([]);
  const [toasts, setToasts] = useState([]);
  const [showUserDetails, setShowUserDetails] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [actionLoading, setActionLoading] = useState({});

  // Fetch dashboard data
  const fetchDashboardData = async (isRefresh = false) => {
    try {
      if (isRefresh) {
        setRefreshing(true);
      } else {
        setLoading(true);
      }
      setError(null);

      const response = await dashboardApi.getKpiData();
      
      if (response.status === 'success') {
        const { mainStats, recentWithdrawals, recentDeposits } = response.data;
        
        // Add icons to main stats
        const statsWithIcons = mainStats.map((stat, index) => {
          const icons = [Users, TrendingUp, Wallet, CreditCard];
          return {
            ...stat,
            icon: icons[index] || DollarSign
          };
        });

        setMainStats(statsWithIcons);
        // Ensure arrays are set even if empty
        setRecentWithdrawals(recentWithdrawals || []);
        setRecentDeposits(recentDeposits || []);
        
        // Log for debugging
        console.log('Dashboard data loaded:', {
          withdrawalsCount: recentWithdrawals?.length || 0,
          depositsCount: recentDeposits?.length || 0
        });
      }
    } catch (err) {
      console.error('Dashboard fetch error:', err);
      setError(err.message);
      addToast('error', 'Failed to load dashboard data. Please try again.');
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    fetchDashboardData();
  }, []);

  // Toast notification component
  const Toast = ({ id, type, message }) => {
    const toastStyles = {
      success: 'bg-green-600 border-green-700 text-white',
      error: 'bg-red-600 border-red-700 text-white',
      info: 'bg-blue-600 border-blue-700 text-white'
    };

    const toastIcons = {
      success: <Check className="w-4 h-4" />,
      error: <X className="w-4 h-4" />,
      info: <Eye className="w-4 h-4" />
    };

    return (
      <div
        className={`flex items-center gap-3 px-4 py-3 rounded-md border ${toastStyles[type]} shadow-lg animate-fade-in max-w-xs sm:max-w-sm`}
      >
        <div className="flex-shrink-0">
          {toastIcons[type]}
        </div>
        <div className="text-sm font-medium flex-1">{message}</div>
        <button
          onClick={() => removeToast(id)}
          className="ml-2 opacity-70 hover:opacity-100"
        >
          <X className="w-4 h-4" />
        </button>
      </div>
    );
  };

  // Add a new toast
  const addToast = (type, message) => {
    const id = Date.now();
    setToasts((prev) => [...prev, { id, type, message }]);

    // Auto remove after 5 seconds
    setTimeout(() => {
      removeToast(id);
    }, 5000);
  };

  // Remove a toast
  const removeToast = (id) => {
    setToasts((prev) => prev.filter((toast) => toast.id !== id));
  };

  // Handle withdrawal actions - Updated to use same logic as WithdrawRequest
  const handleWithdrawalAction = async (id, action) => {
    if (action === 'view') {
      try {
        const withdrawal = recentWithdrawals.find(w => w.id === id);
        if (!withdrawal?.userId) {
          addToast('error', 'User ID not found');
          return;
        }

        // Fetch real user details from API
        const response = await dashboardApi.getUserById(withdrawal.userId);
        
        if (response.status === 'success' && response.data) {
          const userData = response.data;
          const balanceInfo = userData.balanceInfo || {};
          
          // Format user data to match UserDetailsPopup component structure
          const formattedUser = {
            name: userData.name || withdrawal.user,
            personalInfo: {
              name: userData.name || withdrawal.user,
              email: userData.email || withdrawal.userEmail,
              phone: userData.phone || withdrawal.userPhone,
              profileImage: userData.userPhoto || ''
            },
            kycInfo: {
              aadharNumber: userData.aadharNo || 'N/A',
              panNumber: userData.pan || 'N/A',
              aadharPhoto: userData.aadharPhoto || '',
              panPhoto: userData.panPhoto || '',
              passbookPhoto: userData.passbookPhoto || ''
            },
            bankDetails: {
              bankName: userData.bankName || 'N/A',
              accountHolderName: userData.accountHolder || 'N/A',
              accountNumber: userData.accountNumber || 'N/A',
              ifscCode: userData.ifscCode || 'N/A'
            },
            forexAccount: {
              accountBalance: `$${(balanceInfo.accountBalance || 0).toLocaleString()}`,
              totalDeposit: `$${(balanceInfo.totalDeposit || 0).toLocaleString()}`,
              totalWithdrawals: `$${(balanceInfo.totalWithdrawals || 0).toLocaleString()}`,
              orderInvestment: `$${(balanceInfo.orderInvestment || 0).toLocaleString()}`,
              profitLoss: balanceInfo.profitLoss >= 0 
                ? `+$${balanceInfo.profitLoss.toLocaleString()}` 
                : `-$${Math.abs(balanceInfo.profitLoss).toLocaleString()}`
            }
          };
          
          setSelectedUser(formattedUser);
          setShowUserDetails(true);
        } else {
          addToast('error', 'Failed to fetch user details');
        }
      } catch (error) {
        console.error('Error fetching user details:', error);
        addToast('error', `Failed to fetch user details: ${error.message}`);
      }
      return;
    }

    try {
      setActionLoading(prev => ({ ...prev, [id]: true }));

      if (action === 'accept') {
        await dashboardApi.approveWithdrawal(id);
        
        // Update local state to show as completed (don't remove)
        setRecentWithdrawals(prev =>
          prev.map(w => w.id === id ? { ...w, status: 'completed' } : w)
        );
        
        addToast('success', 'Withdrawal request approved successfully!');
      } else if (action === 'reject') {
        await dashboardApi.rejectWithdrawal(id);
        
        // Update local state to show as cancelled (don't remove)
        setRecentWithdrawals(prev =>
          prev.map(w => w.id === id ? { ...w, status: 'cancelled' } : w)
        );
        
        addToast('error', 'Withdrawal request rejected successfully!');
      }

      // Refresh data to get updated stats
      await fetchDashboardData(true);
      
    } catch (error) {
      console.error('Withdrawal action error:', error);
      addToast('error', `Failed to ${action} withdrawal: ${error.message}`);
    } finally {
      setActionLoading(prev => ({ ...prev, [id]: false }));
    }
  };

  // Handle deposit actions
  const handleDepositAction = async (id, action) => {
    if (action === 'view') {
      try {
        const deposit = recentDeposits.find(d => d.id === id);
        if (!deposit?.userId) {
          addToast('error', 'User ID not found');
          return;
        }

        // Fetch real user details from API
        const response = await dashboardApi.getUserById(deposit.userId);
        
        if (response.status === 'success' && response.data) {
          const userData = response.data;
          const balanceInfo = userData.balanceInfo || {};
          
          // Format user data to match UserDetailsPopup component structure
          const formattedUser = {
            name: userData.name || deposit.user,
            personalInfo: {
              name: userData.name || deposit.user,
              email: userData.email || deposit.userEmail,
              phone: userData.phone || deposit.userPhone,
              profileImage: userData.userPhoto || ''
            },
            kycInfo: {
              aadharNumber: userData.aadharNo || 'N/A',
              panNumber: userData.pan || 'N/A',
              aadharPhoto: userData.aadharPhoto || '',
              panPhoto: userData.panPhoto || '',
              passbookPhoto: userData.passbookPhoto || ''
            },
            bankDetails: {
              bankName: userData.bankName || 'N/A',
              accountHolderName: userData.accountHolder || 'N/A',
              accountNumber: userData.accountNumber || 'N/A',
              ifscCode: userData.ifscCode || 'N/A'
            },
            forexAccount: {
              accountBalance: `$${(balanceInfo.accountBalance || 0).toLocaleString()}`,
              totalDeposit: `$${(balanceInfo.totalDeposit || 0).toLocaleString()}`,
              totalWithdrawals: `$${(balanceInfo.totalWithdrawals || 0).toLocaleString()}`,
              orderInvestment: `$${(balanceInfo.orderInvestment || 0).toLocaleString()}`,
              profitLoss: balanceInfo.profitLoss >= 0 
                ? `+$${balanceInfo.profitLoss.toLocaleString()}` 
                : `-$${Math.abs(balanceInfo.profitLoss).toLocaleString()}`
            }
          };
          
          setSelectedUser(formattedUser);
          setShowUserDetails(true);
        } else {
          addToast('error', 'Failed to fetch user details');
        }
      } catch (error) {
        console.error('Error fetching user details:', error);
        addToast('error', `Failed to fetch user details: ${error.message}`);
      }
      return;
    }

    try {
      setActionLoading(prev => ({ ...prev, [id]: true }));
      
      const status = action === 'accept' ? 'COMPLETED' : 'REJECTED';
      await dashboardApi.updateDepositStatus(id, status);
      
      // Update local state
      setRecentDeposits(prev =>
        prev.map(d => d.id === id ? { ...d, status: status.toLowerCase() } : d)
      );
      
      const message = action === 'accept' 
        ? 'Deposit request accepted successfully!' 
        : 'Deposit request rejected successfully!';
      
      addToast('success', message);
      
      // Refresh data to get updated stats
      await fetchDashboardData(true);
      
    } catch (error) {
      console.error('Deposit action error:', error);
      addToast('error', `Failed to ${action} deposit: ${error.message}`);
    } finally {
      setActionLoading(prev => ({ ...prev, [id]: false }));
    }
  };

  // Action button component
  const ActionButton = ({ type, onClick, loading = false, disabled = false }) => {
    const buttonStyles = {
      accept: 'bg-green-500/20 text-green-400 border-green-500/30 hover:bg-green-500/30',
      reject: 'bg-red-500/20 text-red-400 border-red-500/30 hover:bg-red-500/30',
      view: 'bg-blue-500/20 text-blue-400 border-blue-500/30 hover:bg-blue-500/30'
    };

    const buttonIcons = {
      accept: <Check className="w-3 h-3" />,
      reject: <X className="w-3 h-3" />,
      view: <Eye className="w-3 h-3" />
    };

    return (
      <button
        onClick={onClick}
        disabled={disabled || loading}
        className={`p-1.5 rounded-md border ${buttonStyles[type]} transition-colors disabled:opacity-50 disabled:cursor-not-allowed`}
        aria-label={type}
      >
        {loading ? (
          <RefreshCw className="w-3 h-3 animate-spin" />
        ) : (
          buttonIcons[type]
        )}
      </button>
    );
  };

  // Retry function for error state
  const handleRetry = () => {
    fetchDashboardData();
  };

  // Error display component
  const ErrorDisplay = () => (
    <div className="text-center py-8">
      <div className="text-red-500 mb-4">
        <X className="w-12 h-12 mx-auto mb-2" />
        <p className="text-lg font-semibold">Failed to load dashboard</p>
        <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">{error}</p>
      </div>
      <button
        onClick={handleRetry}
        className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
      >
        <RefreshCw className="w-4 h-4 inline mr-2" />
        Retry
      </button>
    </div>
  );

  // Empty state component for withdrawals
  const WithdrawalEmptyState = () => (
    <div className="text-center py-8">
      <div className="flex flex-col items-center justify-center space-y-3">
        <Wallet className="w-8 h-8 text-gray-400 dark:text-gray-600" />
        <div>
          <p className="text-sm font-medium text-gray-500 dark:text-gray-400">No recent withdrawals</p>
          <p className="text-xs text-gray-400 dark:text-gray-500 mt-1">
            Withdrawal requests will appear here when users submit them.
          </p>
        </div>
      </div>
    </div>
  );

  // Empty state component for deposits
  const DepositEmptyState = () => (
    <div className="text-center py-8">
      <div className="flex flex-col items-center justify-center space-y-3">
        <CreditCard className="w-8 h-8 text-gray-400 dark:text-gray-600" />
        <div>
          <p className="text-sm font-medium text-gray-500 dark:text-gray-400">No recent deposits</p>
          <p className="text-xs text-gray-400 dark:text-gray-500 mt-1">
            Deposit requests will appear here when users submit them.
          </p>
        </div>
      </div>
    </div>
  );

  return (
    <div className="space-y-6 py-4 sm:py-6 -mt-10 md:-mt-12">
      {/* Toast Notifications Container */}
      <div className="fixed top-4 mt-16 mr-4 md:mr-0 right-4 z-50 space-y-3">
        {toasts.map((toast) => (
          <Toast key={toast.id} {...toast} />
        ))}
      </div>

      {showUserDetails && (
        <UserDetailsPopup 
          user={selectedUser} 
          onClose={() => setShowUserDetails(false)}
          showImages={false}
          showForex={true}
        />
      )}

      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold dark:text-[#F2F2F2]">Dashboard Overview</h1>
        <button
          onClick={() => fetchDashboardData(true)}
          disabled={refreshing}
          className="p-2 rounded-lg bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors disabled:opacity-50"
          title="Refresh data"
        >
          <RefreshCw className={`w-4 h-4 ${refreshing ? 'animate-spin' : ''}`} />
        </button>
      </div>

      {/* Error State */}
      {error && !loading && (
        <ErrorDisplay />
      )}

      {/* Stats Cards */}
      {!error && (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4">
          {loading ? (
            Array.from({ length: 4 }).map((_, index) => (
              <div key={index} className="dark:bg-[#142924] rounded-lg dark:border-[#2A3F3A] border shadow-sm p-3 sm:p-4">
                <div className="flex justify-between items-start">
                  <div className="w-full">
                    <Skeleton className="h-4 w-3/4 mb-2" />
                    <Skeleton className="h-6 w-full mt-1" />
                  </div>
                  <Skeleton className="w-5 h-5 rounded-full" />
                </div>
                <Skeleton className="h-4 w-1/2 mt-3" />
              </div>
            ))
          ) : (
            mainStats.map((stat) => (
              <div key={stat.title} className="dark:bg-[#142924] rounded-lg dark:border-[#2A3F3A] border shadow-sm p-3 sm:p-4">
                <div className="flex justify-between items-start">
                  <div>
                    <p className="text-xs sm:text-sm text-gray-500 dark:text-[#ABBAB6]">{stat.title}</p>
                    <p className="text-lg sm:text-xl md:text-2xl font-bold mt-1 dark:text-[#F2F2F2]">{stat.value}</p>
                  </div>
                  <div className="p-1 sm:p-2 rounded-full">
                    <stat.icon className="w-4 h-4 sm:w-5 sm:h-5 text-gray-600 dark:text-[#ABBAB6]" />
                  </div>
                </div>
                {stat.trend && (
                  <div className={`flex items-center mt-2 sm:mt-4 text-xs sm:text-sm ${stat.trend.isUp ? 'text-green-500' : 'text-red-500'}`}>
                    {stat.trend.isUp ? '↑' : '↓'} {stat.trend.value}
                    <span className="ml-1 text-gray-500 dark:text-[#ABBAB6] hidden sm:inline">vs last month</span>
                  </div>
                )}
              </div>
            ))
          )}
        </div>
      )}

      {/* Recent Withdrawals and Deposits Tables */}
      {!error && !loading && (
        <div className="space-y-6">
          {/* Recent Withdrawals Table */}
          <div className="dark:bg-[#142924] rounded-lg dark:border-[#2A3F3A] border shadow-sm">
            <div className="p-4 border-b dark:border-[#2A3F3A] flex items-center justify-between">
              <div>
                <h3 className="text-lg font-semibold dark:text-[#F2F2F2]">Recent Withdrawals</h3>
                <p className="text-sm text-gray-500 dark:text-[#ABBAB6]">Latest withdrawal requests</p>
              </div>
              <Link 
                href="/admin/withdrawal-request"
                className="text-blue-600 hover:text-blue-700 text-sm font-medium flex items-center gap-1"
              >
                View All <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
            <div className="p-4 overflow-x-auto">
              {recentWithdrawals.length === 0 ? (
                <WithdrawalEmptyState />
              ) : (
                <table className="w-full min-w-[600px] text-sm">
                  <thead>
                    <tr className="border-b dark:border-[#2A3F3A]">
                      <th className="px-3 py-2 text-left font-medium text-gray-500 dark:text-[#ABBAB6]">User</th>
                      <th className="px-3 py-2 text-left font-medium text-gray-500 dark:text-[#ABBAB6]">Amount</th>
                      <th className="px-3 py-2 text-left font-medium text-gray-500 dark:text-[#ABBAB6]">Date</th>
                      <th className="px-3 py-2 text-left font-medium text-gray-500 dark:text-[#ABBAB6]">Status</th>
                      <th className="px-3 py-2 text-left font-medium text-gray-500 dark:text-[#ABBAB6]">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {recentWithdrawals.slice(0, 5).map((withdrawal) => (
                      <tr key={withdrawal.id} className="border-b dark:border-[#2A3F3A] hover:bg-muted/50">
                        <td className="px-3 py-2 dark:text-[#F2F2F2]">{withdrawal.user}</td>
                        <td className="px-3 py-2 font-medium dark:text-[#F2F2F2]">{withdrawal.amount}</td>
                        <td className="px-3 py-2 dark:text-[#F2F2F2]">{withdrawal.date}</td>
                        <td className="px-3 py-2"><StatusBadge status={withdrawal.status} /></td>
                        <td className="px-3 py-2">
                          <div className="flex gap-1">
                            {withdrawal.status === 'pending' && (
                              <>
                                <ActionButton
                                  type="accept"
                                  onClick={() => handleWithdrawalAction(withdrawal.id, 'accept')}
                                  loading={actionLoading[withdrawal.id]}
                                />
                                <ActionButton
                                  type="reject"
                                  onClick={() => handleWithdrawalAction(withdrawal.id, 'reject')}
                                  loading={actionLoading[withdrawal.id]}
                                />
                              </>
                            )}
                            <ActionButton
                              type="view"
                              onClick={() => handleWithdrawalAction(withdrawal.id, 'view')}
                            />
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
            </div>
          </div>

          {/* Recent Deposits Table */}
          <div className="dark:bg-[#142924] rounded-lg dark:border-[#2A3F3A] border shadow-sm">
            <div className="p-4 border-b dark:border-[#2A3F3A] flex items-center justify-between">
              <div>
                <h3 className="text-lg font-semibold dark:text-[#F2F2F2]">Recent Deposits</h3>
                <p className="text-sm text-gray-500 dark:text-[#ABBAB6]">Latest deposit requests</p>
              </div>
              <Link 
                href="/admin/deposit-request"
                className="text-blue-600 hover:text-blue-700 text-sm font-medium flex items-center gap-1"
              >
                View All <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
            <div className="p-4 overflow-x-auto">
              {recentDeposits.length === 0 ? (
                <DepositEmptyState />
              ) : (
                <table className="w-full min-w-[700px] text-sm">
                  <thead>
                    <tr className="border-b dark:border-[#2A3F3A]">
                      <th className="px-3 py-2 text-left font-medium text-gray-500 dark:text-[#ABBAB6]">User</th>
                      <th className="px-3 py-2 text-left font-medium text-gray-500 dark:text-[#ABBAB6]">Amount</th>
                      <th className="px-3 py-2 text-left font-medium text-gray-500 dark:text-[#ABBAB6]">Method</th>
                      <th className="px-3 py-2 text-left font-medium text-gray-500 dark:text-[#ABBAB6]">Date</th>
                      <th className="px-3 py-2 text-left font-medium text-gray-500 dark:text-[#ABBAB6]">Status</th>
                      <th className="px-3 py-2 text-left font-medium text-gray-500 dark:text-[#ABBAB6]">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {recentDeposits.slice(0, 5).map((deposit) => (
                      <tr key={deposit.id} className="border-b dark:border-[#2A3F3A] hover:bg-muted/50">
                        <td className="px-3 py-2 dark:text-[#F2F2F2]">{deposit.user}</td>
                        <td className="px-3 py-2 font-medium dark:text-[#F2F2F2]">{deposit.amount}</td>
                        <td className="px-3 py-2 dark:text-[#F2F2F2]">{deposit.method}</td>
                        <td className="px-3 py-2 dark:text-[#F2F2F2]">{deposit.date}</td>
                        <td className="px-3 py-2"><StatusBadge status={deposit.status} /></td>
                        <td className="px-3 py-2">
                          <div className="flex gap-1">
                            {deposit.status === 'pending' && (
                              <>
                                <ActionButton
                                  type="accept"
                                  onClick={() => handleDepositAction(deposit.id, 'accept')}
                                  loading={actionLoading[deposit.id]}
                                />
                                <ActionButton
                                  type="reject"
                                  onClick={() => handleDepositAction(deposit.id, 'reject')}
                                  loading={actionLoading[deposit.id]}
                                />
                              </>
                            )}
                            <ActionButton
                              type="view"
                              onClick={() => handleDepositAction(deposit.id, 'view')}
                            />
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;