'use client';

import React, { useState, useEffect } from 'react';
import { Wallet, TrendingUp, CheckCircle } from 'lucide-react';
import StatCard from '../../../components/ui/StatCard';
import StatusBadge from '../../../components/ui/StatusBadge';
import ActionButton from '../../../components/ui/ActionButton';
import { Skeleton } from '@/components/ui/skeleton';
import { Check, X, Eye } from 'lucide-react';

import UserDetailsPopup from '@/components/UserDetailsPopup';
import api from '@/utils/axios';
import { formatError, isRateLimit } from '@/utils/errorHandler';

const WithdrawRequest = () => {
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState([]);
  const [withdrawalRequests, setWithdrawalRequests] = useState([]);
  const [toasts, setToasts] = useState([]);
  const [showUserDetails, setShowUserDetails] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [updatingId, setUpdatingId] = useState(null); // Track which withdrawal is being updated

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        // Fetch withdrawal requests
        let withdrawals = [];
        try {
          const res = await api.get('/admin/get-all-pending-withdrawals');
          // Handle ApiResponse format: res.data.data contains { totalPending, withdrawals }
          withdrawals = res.data?.data?.withdrawals || [];
        } catch (err) {
          console.error('Error fetching pending withdrawals:', err);
          const errorMessage = isRateLimit(err) 
            ? formatError(err, 'loading withdrawal requests')
            : 'Failed to load withdrawal requests';
          addToast('error', errorMessage);
        }
        setWithdrawalRequests(
          withdrawals.map(w => {
            // Extract userId - handle both populated (object) and non-populated (string/ObjectId) cases
            let userId = null;
            if (w.userId) {
              if (typeof w.userId === 'object' && w.userId._id) {
                // Populated user object
                userId = w.userId._id.toString ? w.userId._id.toString() : String(w.userId._id);
              } else if (typeof w.userId === 'string') {
                // String ID
                userId = w.userId;
              } else if (w.userId.toString) {
                // ObjectId or other object with toString method
                userId = w.userId.toString();
              } else {
                // Fallback: convert to string
                userId = String(w.userId);
              }
            }

            return {
              id: w._id,
              userId: userId, // Store userId for fetching details
              name: w.userId?.name || 'Unknown',
              amount: `$${w.amount}`,
              bank: w.bank || '-',
              status: w.status?.toLowerCase() || 'pending',
              user: w.userId?.name || 'Unknown',
              userEmail: w.userId?.email,
              userPhone: w.userId?.phone,
            };
          })
        );

        // Fetch stats - endpoints now return 0 instead of 404
        const statResults = await Promise.all([
          (async () => {
            try {
              const res = await api.get('/admin/get-all-pending-withdrawals');
              return { res, isError: false };
            } catch (e) {
              console.error('Error fetching pending withdrawals stats:', e);
              if (isRateLimit(e)) {
                console.warn(formatError(e, 'fetching pending withdrawals stats'));
              }
              return { res: { data: { data: { totalPending: 0, withdrawals: [] } } }, isError: true };
            }
          })(),
          (async () => {
            try {
              const res = await api.get('/admin/get-all-completed-withdrawals');
              return { res, isError: false };
            } catch (e) {
              console.error('Error fetching completed withdrawals stats:', e);
              if (isRateLimit(e)) {
                console.warn(formatError(e, 'fetching completed withdrawals stats'));
              }
              return { res: { data: { data: { totalCompleted: 0 } } }, isError: true };
            }
          })(),
          (async () => {
            try {
              const res = await api.get('/admin/get-all-withdrawals');
              return { res, isError: false };
            } catch (e) {
              console.error('Error fetching all withdrawals stats:', e);
              if (isRateLimit(e)) {
                console.warn(formatError(e, 'fetching all withdrawals stats'));
              }
              return { res: { data: { data: { withdrawals: [], totalWithdrawals: 0, totalAmount: 0 } } }, isError: true };
            }
          })(),
        ]);
        const [pendingStat, completedStat, allStat] = statResults;
        // Only show error if ALL three stats fail
        if (statResults.every(stat => stat.isError)) {
          addToast('error', 'Failed to load withdrawal statistics');
        }
        
        // Handle ApiResponse format: res.data.data contains the actual data
        const allWithdrawals = allStat.res.data?.data?.withdrawals || [];
        const totalAmount = allStat.res.data?.data?.totalAmount || 
          (allWithdrawals.reduce((sum, w) => sum + (w.amount || 0), 0));
        
        setStats([
          { title: 'Total Requests', value: (allStat.res.data?.data?.totalWithdrawals || allWithdrawals.length || 0).toString(), icon: Wallet },
          { title: 'Pending', value: (pendingStat.res.data?.data?.totalPending || 0).toString(), icon: TrendingUp },
          { title: 'Total Amount', value: `$${totalAmount.toLocaleString()}`, icon: Wallet },
          { title: 'Completed', value: (completedStat.res.data?.data?.totalCompleted || 0).toString(), icon: CheckCircle },
        ]);
      } catch (err) {
        const errorMessage = isRateLimit(err)
          ? formatError(err, 'loading withdrawal requests')
          : 'Failed to load withdrawal requests';
        addToast('error', errorMessage);
      }
      setLoading(false);
    };
    fetchData();
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

  const addToast = (type, message) => {
    const id = Date.now();
    setToasts((prev) => [...prev, { id, type, message }]);

    setTimeout(() => {
      removeToast(id);
    }, 5000);
  };

  const removeToast = (id) => {
    setToasts((prev) => prev.filter((toast) => toast.id !== id));
  };


  const handleWithdrawalAction = async (id, action) => {
    setUpdatingId(id);
    if (action === 'accept') {
      try {
        await api.post(`/admin/approve-withdrawal/${id}`);
        // Remove from pending list
        setWithdrawalRequests(prev => prev.filter(request => request.id !== id));
        addToast('success', 'Withdrawal request accepted successfully!');
        // Refresh stats after approval
        setTimeout(() => {
          window.location.reload();
        }, 1000);
      } catch (err) {
        const errorMessage = isRateLimit(err)
          ? formatError(err, 'accepting withdrawal request')
          : 'Failed to accept withdrawal request';
        addToast('error', errorMessage);
      }
    } else if (action === 'reject') {
      try {
        await api.post(`/admin/reject-withdrawal/${id}`);
        setWithdrawalRequests(prev => prev.filter(request => request.id !== id));
        addToast('error', 'Withdrawal request rejected successfully!');
        // Refresh stats after rejection
        setTimeout(() => {
          window.location.reload();
        }, 1000);
      } catch (err) {
        const errorMessage = isRateLimit(err)
          ? formatError(err, 'rejecting withdrawal request')
          : 'Failed to reject withdrawal request';
        addToast('error', errorMessage);
      }
    } else if (action === 'view') {
      const user = withdrawalRequests.find(w => w.id === id)?.user;
      handleViewAction(id, user);
    }
    setUpdatingId(null);
  };


  const handleViewAction = async (withdrawalId, userObj) => {
    try {
      // Find the withdrawal request to get userId
      let withdrawal = withdrawalRequests.find(w => w.id === withdrawalId);
      
      // Extract userId with multiple fallback options
      let userId = withdrawal?.userId;
      
      // If userId is not available in local state, fetch the withdrawal from API
      if (!userId && withdrawal) {
        try {
          const withdrawalRes = await api.get(`/admin/get-pending-withdrawal/${withdrawalId}`);
          if (withdrawalRes.data?.data?.userId) {
            const apiUserId = withdrawalRes.data.data.userId;
            // Handle populated user object or direct ObjectId
            if (typeof apiUserId === 'object' && apiUserId._id) {
              userId = apiUserId._id.toString ? apiUserId._id.toString() : String(apiUserId._id);
            } else if (typeof apiUserId === 'string') {
              userId = apiUserId;
            } else if (apiUserId?.toString) {
              userId = apiUserId.toString();
            } else {
              userId = String(apiUserId);
            }
          }
        } catch (fetchError) {
          console.error('Error fetching withdrawal details:', fetchError);
        }
      }
      
      // If still no userId, show error
      if (!userId) {
        console.error('UserId not found. Withdrawal object:', withdrawal);
        addToast('error', 'User ID not found in withdrawal request');
        return;
      }

      // Ensure userId is a string
      if (typeof userId !== 'string') {
        userId = userId.toString ? userId.toString() : String(userId);
      }

      // Fetch full user details from API
      const response = await api.get(`/admin/get-user/${userId}`);
      
      if (response.data.status === 'success' && response.data.data) {
        const userData = response.data.data;
        const balanceInfo = userData.balanceInfo || {};
        
        // Format user data to match UserDetailsPopup component structure
        const formattedUser = {
          name: userData.name || withdrawal.user || 'Unknown User',
          personalInfo: {
            name: userData.name || withdrawal.user || 'Unknown User',
            email: userData.email || withdrawal.userEmail || 'No email provided',
            phone: userData.phone || withdrawal.userPhone || 'No phone provided',
            profileImage: userData.userPhoto || '/default-avatar.png'
          },
          kycInfo: {
            aadharNumber: userData.aadharNo || 'Not provided',
            panNumber: userData.pan || 'Not provided',
            aadharPhoto: userData.aadharPhoto || '',
            panPhoto: userData.panPhoto || '',
            profilePhoto: userData.userPhoto || '',
            passbookPhoto: userData.passbookPhoto || ''
          },
          bankDetails: {
            bankName: userData.bankName || 'Not provided',
            accountHolderName: userData.accountHolder || 'Not provided',
            accountNumber: userData.accountNumber || 'Not provided',
            ifscCode: userData.ifscCode || 'Not provided'
          },
          forexAccount: {
            accountBalance: (balanceInfo.accountBalance !== undefined && balanceInfo.accountBalance !== null)
              ? `$${Number(balanceInfo.accountBalance).toLocaleString()}` 
              : '$0',
            totalDeposit: (balanceInfo.totalDeposit !== undefined && balanceInfo.totalDeposit !== null)
              ? `$${Number(balanceInfo.totalDeposit).toLocaleString()}` 
              : '$0',
            totalWithdrawals: (balanceInfo.totalWithdrawals !== undefined && balanceInfo.totalWithdrawals !== null)
              ? `$${Number(balanceInfo.totalWithdrawals).toLocaleString()}` 
              : '$0',
            orderInvestment: (balanceInfo.orderInvestment !== undefined && balanceInfo.orderInvestment !== null)
              ? `$${Number(balanceInfo.orderInvestment).toLocaleString()}` 
              : '$0',
            profitLoss: (balanceInfo.profitLoss !== undefined && balanceInfo.profitLoss !== null)
              ? (Number(balanceInfo.profitLoss) >= 0 
                  ? `+$${Number(balanceInfo.profitLoss).toLocaleString()}` 
                  : `-$${Math.abs(Number(balanceInfo.profitLoss)).toLocaleString()}`)
              : '$0'
          }
        };
        
        setSelectedUser(formattedUser);
        setShowUserDetails(true);
      } else {
        addToast('error', 'Failed to fetch user details');
      }
    } catch (error) {
      console.error('Error fetching user details:', error);
      const errorMessage = isRateLimit(error)
        ? formatError(error, 'fetching user details')
        : (error.response?.data?.message || 'Failed to fetch user details');
      addToast('error', errorMessage);
    }
  };

  return (
    <div className="space-y-6  py-4 sm:py-6 -mt-10 md:-mt-12">

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

      <h1 className="text-2xl font-bold dark:text-[#F2F2F2]">Withdraw Requests</h1>

      {/* Stats Cards - Skeleton Loading */}
      <div className="grid grid-cols-2 gap-3 sm:gap-4 md:grid-cols-4">
        {loading ? (
          Array.from({ length: 4 }).map((_, index) => (
            <div key={index} className="dark:bg-[#142924] rounded-lg dark:border-[#2A3F3A] border shadow-sm p-4">
              <div className="flex justify-between items-start">
                <div className="w-full">
                  <Skeleton className="h-4 w-3/4 mb-2" />
                  <Skeleton className="h-6 w-full" />
                </div>
                <Skeleton className="w-5 h-5 rounded-full" />
              </div>
            </div>
          ))
        ) : (
          stats.map((stat) => (
            <StatCard
              key={stat.title}
              title={stat.title}
              value={stat.value}
              icon={stat.icon}
            />
          ))
        )}
      </div>

      {/* Withdrawal Requests Table - Skeleton Loading */}
      <div className="bg-card rounded-lg border dark:border-[#2A3F3A] shadow-sm">
        <div className="p-6 border-b dark:border-[#2A3F3A]">
          <h2 className="text-xl font-semibold dark:text-[#F2F2F2]">Withdrawal Requests</h2>
          <p className="text-sm text-muted-foreground mt-1 dark:text-[#ABBAB6]">Review and manage withdrawal requests</p>
        </div>
        <div className="p-4 overflow-x-auto">
          <div className="min-w-[600px]">
            <table className="w-full text-xs sm:text-sm">
              <thead>
                <tr className="border-b dark:border-[#2A3F3A]">
                  <th className="px-2 py-2 text-left font-medium text-muted-foreground whitespace-nowrap dark:text-[#ABBAB6] sm:px-4">Name</th>
                  <th className="px-2 py-2 text-left font-medium text-muted-foreground whitespace-nowrap dark:text-[#ABBAB6] sm:px-4">Withdrawal <br /> Amount</th>
                  <th className="px-2 py-2 text-left font-medium text-muted-foreground whitespace-nowrap dark:text-[#ABBAB6] sm:px-4">Bank</th>
                  <th className="px-2 py-2 text-left font-medium text-muted-foreground whitespace-nowrap dark:text-[#ABBAB6] sm:px-4">Status</th>
                  <th className="px-2 py-2 text-left font-medium text-muted-foreground whitespace-nowrap dark:text-[#ABBAB6] sm:px-4">Actions</th>
                </tr>
              </thead>
              <tbody>
                {loading ? (
                  // Only skeleton loading for table rows
                  Array.from({ length: 6 }).map((_, index) => (
                    <tr key={index} className="border-b dark:border-[#2A3F3A] hover:bg-muted/50">
                      <td className="px-2 py-3 whitespace-nowrap sm:px-4"><Skeleton className="h-4 w-3/4" /></td>
                      <td className="px-2 py-3 whitespace-nowrap sm:px-4"><Skeleton className="h-4 w-3/4" /></td>
                      <td className="px-2 py-3 whitespace-nowrap sm:px-4"><Skeleton className="h-4 w-3/4" /></td>
                      <td className="px-2 py-3 whitespace-nowrap sm:px-4"><Skeleton className="h-4 w-3/4" /></td>
                      <td className="px-2 py-3 whitespace-nowrap sm:px-4">
                        <div className="flex gap-1">
                          <Skeleton className="h-6 w-6" />
                          <Skeleton className="h-6 w-6" />
                          <Skeleton className="h-6 w-6" />
                        </div>
                      </td>
                    </tr>
                  ))
                ) : withdrawalRequests.length === 0 ? (
                  <tr>
                    <td colSpan={5} className="text-center py-8 text-muted-foreground dark:text-[#ABBAB6]">
                      No withdrawal requests
                    </td>
                  </tr>
                ) : (
                  // Actual data rows
                  withdrawalRequests.map((request) => (
                    <tr key={request.id} className="border-b dark:border-[#2A3F3A] hover:bg-muted/50">
                      <td className="px-2 py-3 dark:text-[#F2F2F2] whitespace-nowrap sm:px-4">{request.name}</td>
                      <td className="px-2 py-3 font-medium dark:text-[#F2F2F2] whitespace-nowrap sm:px-4">{request.amount}</td>
                      <td className="px-2 py-3 dark:text-[#F2F2F2] whitespace-nowrap sm:px-4">{request.bank}</td>
                      <td className="px-2 py-3 sm:px-4">
                        <StatusBadge status={request.status} />
                      </td>
                      <td className="px-2 py-3 whitespace-nowrap sm:px-4">
                        <div className="flex gap-1">
                          {request.status === 'pending' ? (
                            <>
                              <ActionButton
                                type="accept"
                                onClick={() => handleWithdrawalAction(request.id, 'accept')}
                                disabled={updatingId === request.id}
                              />
                              <ActionButton 
                                type="reject"
                                onClick={() => handleWithdrawalAction(request.id, 'reject')}
                                disabled={updatingId === request.id}
                              />
                              <ActionButton type="view" onClick={() => handleWithdrawalAction(request.id, 'view')} disabled={updatingId === request.id} />
                              {updatingId === request.id && (
                                <span className="ml-2 text-xs text-blue-500">Updating...</span>
                              )}
                            </>
                          ) : (
                            <ActionButton type="view" onClick={() => handleWithdrawalAction(request.id, 'view')} />
                          )}
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WithdrawRequest;

// 'use client';

// import React, { useState, useEffect } from 'react';
// import { TabsContent, Tabs, TabsList, TabsTrigger } from "../../../components/ui/tabs";
// import StatusBadge from '../../../components/ui/StatusBadge';
// import ActionButton from '../../../components/ui/ActionButton';
// import { Skeleton } from '@/components/ui/skeleton';
// import { Check, X, Eye } from 'lucide-react';
// import UserDetailsPopup from '@/components/UserDetailsPopup';
// import api from '@/utils/axios'; // Your axios instance

// const DepositeRequest = () => {
//   const [loading, setLoading] = useState(true);
//   const [pendingDeposits, setPendingDeposits] = useState([]);
//   const [verifiedDeposits, setVerifiedDeposits] = useState([]);
//   const [activeTab, setActiveTab] = useState("pending");
//   const [toasts, setToasts] = useState([]);
//   const [showUserDetails, setShowUserDetails] = useState(false);
//   const [selectedUser, setSelectedUser] = useState(null);

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

//   const addToast = (type, message) => {
//     const id = Date.now();
//     setToasts((prev) => [...prev, { id, type, message }]);
    
//     setTimeout(() => {
//       removeToast(id);
//     }, 5000);
//   };

//   const removeToast = (id) => {
//     setToasts((prev) => prev.filter((toast) => toast.id !== id));
//   };

//   // API Functions using your axios instance
//   const fetchPendingDeposits = async () => {
//     try {
//       const response = await api.get('/admin/get-all-pending-deposits');
//       return response.data.data.pendingDeposits || [];
//     } catch (error) {
//       console.error('Error fetching pending deposits:', error);
//       addToast('error', 'Failed to fetch pending deposits');
//       return [];
//     }
//   };

//   const fetchVerifiedDeposits = async () => {
//     try {
//       const response = await api.get('/admin/get-all-verified-deposits');
//       return response.data.data.verifiedDeposits || [];
//     } catch (error) {
//       console.error('Error fetching verified deposits:', error);
//       addToast('error', 'Failed to fetch verified deposits');
//       return [];
//     }
//   };

//   const approveDepositAPI = async (depositId) => {
//     try {
//       const response = await api.patch(`/admin/approve-deposit/${depositId}`);
//       return response.data;
//     } catch (error) {
//       console.error('Error approving deposit:', error);
//       throw error;
//     }
//   };

//   const rejectDepositAPI = async (depositId, reason = 'Rejected by admin') => {
//     try {
//       const response = await api.patch(`/admin/reject-deposit/${depositId}`, { reason });
//       return response.data;
//     } catch (error) {
//       console.error('Error rejecting deposit:', error);
//       throw error;
//     }
//   };

//   const fetchDepositById = async (depositId, type = 'pending') => {
//     try {
//       const endpoint = type === 'pending' 
//         ? `/admin/get-pending-deposit/${depositId}` 
//         : `/admin/get-verified-deposit/${depositId}`;
      
//       const response = await api.get(endpoint);
//       return response.data.data;
//     } catch (error) {
//       console.error(`Error fetching ${type} deposit:`, error);
//       throw error;
//     }
//   };

//   // Format date for display
//   const formatDate = (dateString) => {
//     return new Date(dateString).toLocaleDateString('en-US', {
//       year: 'numeric',
//       month: '2-digit',
//       day: '2-digit'
//     });
//   };

//   // Format amount for display
//   const formatAmount = (amount, currency = 'INR') => {
//     if (currency === 'INR') {
//       return `₹${amount.toLocaleString('en-IN')}`;
//     }
//     return `$${amount.toLocaleString('en-US')}`;
//   };

//   // Map backend status to frontend status
//   const mapStatus = (backendStatus) => {
//     const statusMap = {
//       'PENDING': 'pending',
//       'COMPLETED': 'verified',
//       'FAILED': 'failed',
//       'CANCELLED': 'rejected'
//     };
//     return statusMap[backendStatus] || backendStatus.toLowerCase();
//   };

//   // Map payment method to display format
//   const formatPaymentMethod = (method) => {
//     const methodMap = {
//       'CARD': 'Credit Card',
//       'UPI': 'UPI',
//       'NETBANKING': 'Net Banking',
//       'WALLET': 'Wallet'
//     };
//     return methodMap[method] || method || 'Not specified';
//   };

//   // Transform backend data to frontend format
//   const transformDepositData = (deposits) => {
//     return deposits.map(deposit => ({
//       id: deposit._id,
//       transactionId: deposit.transactionId,
//       user: deposit.userId?.name || 'Unknown User',
//       userEmail: deposit.userId?.email || '',
//       userPhone: deposit.userId?.phone || '',
//       amount: formatAmount(deposit.amount, deposit.currency),
//       date: formatDate(deposit.timestamp),
//       method: formatPaymentMethod(deposit.paymentMethod),
//       status: mapStatus(deposit.status),
//       rawAmount: deposit.amount,
//       currency: deposit.currency,
//       description: deposit.description,
//       failureReason: deposit.failureReason,
//       verified: deposit.verified
//     }));
//   };

//   const handleDepositAction = async (depositId, action) => {
//     if (action === 'accept') {
//       try {
//         await approveDepositAPI(depositId);
        
//         // Find the deposit to move
//         const depositToMove = pendingDeposits.find(d => d.id === depositId);
        
//         if (depositToMove) {
//           // Update status
//           const updatedDeposit = { ...depositToMove, status: 'verified' };
          
//           // Remove from pending and add to verified
//           setPendingDeposits(prev => prev.filter(d => d.id !== depositId));
//           setVerifiedDeposits(prev => [updatedDeposit, ...prev]);
          
//           addToast('success', 'Deposit request accepted successfully!');
//         }
//       } catch (error) {
//         const errorMessage = error.response?.data?.message || 'Failed to accept deposit request';
//         addToast('error', errorMessage);
//       }
//     } else if (action === 'reject') {
//       try {
//         await rejectDepositAPI(depositId);
        
//         // Remove from pending deposits
//         setPendingDeposits(prev => prev.filter(d => d.id !== depositId));
//         addToast('error', 'Deposit request rejected successfully!');
//       } catch (error) {
//         const errorMessage = error.response?.data?.message || 'Failed to reject deposit request';
//         addToast('error', errorMessage);
//       }
//     } else if (action === 'view') {
//       const deposit = verifiedDeposits.find(d => d.id === depositId);
//       if (deposit) {
//         handleViewAction(depositId, deposit.user, deposit.userEmail, deposit.userPhone);
//       }
//     }
//   };

//   const handleViewAction = (depositId, userName, userEmail, userPhone) => {
//     const user = {
//       name: userName,
//       email: userEmail,
//       phone: userPhone,
//       // Add other user details as needed
//     };
//     setSelectedUser(user);
//     setShowUserDetails(true);
//   };

//   useEffect(() => {
//     const fetchData = async () => {
//       setLoading(true);
      
//       try {
//         const [pendingData, verifiedData] = await Promise.all([
//           fetchPendingDeposits(),
//           fetchVerifiedDeposits()
//         ]);
        
//         setPendingDeposits(transformDepositData(pendingData));
//         setVerifiedDeposits(transformDepositData(verifiedData));
//       } catch (error) {
//         console.error('Error fetching data:', error);
//         addToast('error', 'Failed to load deposit data');
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchData();
//   }, []);

//   return (
//     <div className="space-y-6 py-4 sm:py-6 -mt-10 md:-mt-12">
//       {/* Toast Notifications */}
//       <div className="fixed top-4 mt-16 mr-4 md:mr-0 right-4 z-50 space-y-3">
//         {toasts.map((toast) => (
//           <Toast key={toast.id} {...toast} />
//         ))}
//       </div>

//       {showUserDetails && (
//         <UserDetailsPopup 
//           user={selectedUser} 
//           onClose={() => setShowUserDetails(false)}
//           showImages={false}
//           showForex={true}
//         />
//       )}

//       <h1 className="text-2xl font-bold dark:text-[#F2F2F2]">Deposit Requests</h1>
      
//       <Tabs value={activeTab} onValueChange={setActiveTab}>
//         <TabsList className="grid w-full md:w-80 grid-cols-2">
//           <TabsTrigger value="pending">Pending Deposits ({pendingDeposits.length})</TabsTrigger>
//           <TabsTrigger value="verified">Verified Deposits ({verifiedDeposits.length})</TabsTrigger>
//         </TabsList>
        
//         <TabsContent value="pending" className="mt-4">
//           <div className="bg-card rounded-lg border dark:border-[#2A3F3A] shadow-sm">
//             <div className="p-6 border-b dark:border-[#2A3F3A]">
//               <h2 className="text-xl font-semibold dark:text-[#F2F2F2]">Pending Deposits</h2>
//               <p className="text-sm text-muted-foreground mt-1 dark:text-[#ABBAB6]">Review and approve deposit requests</p>
//             </div>
//             <div className="p-4 overflow-x-auto">
//               <div className="min-w-[800px]">
//                 <table className="w-full text-xs sm:text-sm">
//                   <thead>
//                     <tr className="border-b dark:border-[#2A3F3A]">
//                       <th className="px-2 py-2 text-left font-medium text-muted-foreground whitespace-nowrap dark:text-[#ABBAB6] sm:px-4">Transaction ID</th>
//                       <th className="px-2 py-2 text-left font-medium text-muted-foreground whitespace-nowrap dark:text-[#ABBAB6] sm:px-4">User</th>
//                       <th className="px-2 py-2 text-left font-medium text-muted-foreground whitespace-nowrap dark:text-[#ABBAB6] sm:px-4">Amount</th>
//                       <th className="px-2 py-2 text-left font-medium text-muted-foreground whitespace-nowrap dark:text-[#ABBAB6] sm:px-4">Date</th>
//                       <th className="px-2 py-2 text-left font-medium text-muted-foreground whitespace-nowrap dark:text-[#ABBAB6] sm:px-4">Method</th>
//                       <th className="px-2 py-2 text-left font-medium text-muted-foreground whitespace-nowrap dark:text-[#ABBAB6] sm:px-4">Status</th>
//                       <th className="px-2 py-2 text-left font-medium text-muted-foreground whitespace-nowrap dark:text-[#ABBAB6] sm:px-4">Action</th>
//                     </tr>
//                   </thead>
//                   <tbody>
//                     {loading ? (
//                       Array.from({ length: 4 }).map((_, index) => (
//                         <tr key={index} className="border-b dark:border-[#2A3F3A]">
//                           <td className="px-2 py-3 sm:px-4"><Skeleton className="h-4 w-[100px]" /></td>
//                           <td className="px-2 py-3 sm:px-4"><Skeleton className="h-4 w-[120px]" /></td>
//                           <td className="px-2 py-3 sm:px-4"><Skeleton className="h-4 w-[80px]" /></td>
//                           <td className="px-2 py-3 sm:px-4"><Skeleton className="h-4 w-[90px]" /></td>
//                           <td className="px-2 py-3 sm:px-4"><Skeleton className="h-4 w-[110px]" /></td>
//                           <td className="px-2 py-3 sm:px-4"><Skeleton className="h-6 w-[70px] rounded-full" /></td>
//                           <td className="px-2 py-3 sm:px-4">
//                             <div className="flex gap-1">
//                               <Skeleton className="h-8 w-8 rounded" />
//                               <Skeleton className="h-8 w-8 rounded" />
//                             </div>
//                           </td>
//                         </tr>
//                       ))
//                     ) : pendingDeposits.length === 0 ? (
//                       <tr>
//                         <td colSpan="7" className="px-4 py-8 text-center text-muted-foreground">
//                           No pending deposits found
//                         </td>
//                       </tr>
//                     ) : (
//                       pendingDeposits.map((deposit) => (
//                         <tr key={deposit.id} className="border-b dark:border-[#2A3F3A] hover:bg-muted/50">
//                           <td className="px-2 py-3 text-sm dark:text-[#F2F2F2] whitespace-nowrap sm:px-4">{deposit.transactionId}</td>
//                           <td className="px-2 py-3 dark:text-[#F2F2F2] whitespace-nowrap sm:px-4">{deposit.user}</td>
//                           <td className="px-2 py-3 font-medium dark:text-[#F2F2F2] whitespace-nowrap sm:px-4">{deposit.amount}</td>
//                           <td className="px-2 py-3 text-sm dark:text-[#F2F2F2] whitespace-nowrap sm:px-4">{deposit.date}</td>
//                           <td className="px-2 py-3 text-sm dark:text-[#F2F2F2] whitespace-nowrap sm:px-4">{deposit.method}</td>
//                           <td className="px-2 py-3 text-sm sm:px-4">
//                             <StatusBadge status={deposit.status} />
//                           </td>
//                           <td className="px-2 py-3 whitespace-nowrap sm:px-4">
//                             <div className="flex gap-1">
//                               <ActionButton 
//                                 type="accept" 
//                                 onClick={() => handleDepositAction(deposit.id, 'accept')} 
//                               />
//                               <ActionButton 
//                                 type="reject" 
//                                 onClick={() => handleDepositAction(deposit.id, 'reject')} 
//                               />
//                             </div>
//                           </td>
//                         </tr>
//                       ))
//                     )}
//                   </tbody>
//                 </table>
//               </div>
//             </div>
//           </div>
//         </TabsContent>
        
//         <TabsContent value="verified" className="mt-4">
//           <div className="bg-card rounded-lg border dark:border-[#2A3F3A] shadow-sm">
//             <div className="p-6 border-b dark:border-[#2A3F3A]">
//               <h2 className="text-xl font-semibold dark:text-[#F2F2F2]">Verified Deposits</h2>
//               <p className="text-sm text-muted-foreground mt-1 dark:text-[#ABBAB6]">View completed deposit transactions</p>
//             </div>
//             <div className="p-4 overflow-x-auto">
//               <div className="min-w-[800px]">
//                 <table className="w-full text-xs sm:text-sm">
//                   <thead>
//                     <tr className="border-b dark:border-[#2A3F3A]">
//                       <th className="px-2 py-2 text-left font-medium text-muted-foreground whitespace-nowrap dark:text-[#ABBAB6] sm:px-4">Transaction ID</th>
//                       <th className="px-2 py-2 text-left font-medium text-muted-foreground whitespace-nowrap dark:text-[#ABBAB6] sm:px-4">User</th>
//                       <th className="px-2 py-2 text-left font-medium text-muted-foreground whitespace-nowrap dark:text-[#ABBAB6] sm:px-4">Amount</th>
//                       <th className="px-2 py-2 text-left font-medium text-muted-foreground whitespace-nowrap dark:text-[#ABBAB6] sm:px-4">Date</th>
//                       <th className="px-2 py-2 text-left font-medium text-muted-foreground whitespace-nowrap dark:text-[#ABBAB6] sm:px-4">Method</th>
//                       <th className="px-2 py-2 text-left font-medium text-muted-foreground whitespace-nowrap dark:text-[#ABBAB6] sm:px-4">Status</th>
//                       <th className="px-2 py-2 text-left font-medium text-muted-foreground whitespace-nowrap dark:text-[#ABBAB6] sm:px-4">Action</th>
//                     </tr>
//                   </thead>
//                   <tbody>
//                     {loading ? (
//                       Array.from({ length: 4 }).map((_, index) => (
//                         <tr key={index} className="border-b dark:border-[#2A3F3A]">
//                           <td className="px-2 py-3 sm:px-4"><Skeleton className="h-4 w-[100px]" /></td>
//                           <td className="px-2 py-3 sm:px-4"><Skeleton className="h-4 w-[120px]" /></td>
//                           <td className="px-2 py-3 sm:px-4"><Skeleton className="h-4 w-[80px]" /></td>
//                           <td className="px-2 py-3 sm:px-4"><Skeleton className="h-4 w-[90px]" /></td>
//                           <td className="px-2 py-3 sm:px-4"><Skeleton className="h-4 w-[110px]" /></td>
//                           <td className="px-2 py-3 sm:px-4"><Skeleton className="h-6 w-[70px] rounded-full" /></td>
//                           <td className="px-2 py-3 sm:px-4">
//                             <div className="flex gap-1">
//                               <Skeleton className="h-8 w-8 rounded" />
//                             </div>
//                           </td>
//                         </tr>
//                       ))
//                     ) : verifiedDeposits.length === 0 ? (
//                       <tr>
//                         <td colSpan="7" className="px-4 py-8 text-center text-muted-foreground">
          
//                           No verified deposits found
//                         </td>
//                       </tr>
//                     ) : (
//                       verifiedDeposits.map((deposit) => (
//                         <tr key={deposit.id} className="border-b dark:border-[#2A3F3A] hover:bg-muted/50">
//                           <td className="px-2 py-3 text-sm dark:text-[#F2F2F2] whitespace-nowrap sm:px-4">{deposit.transactionId}</td>
//                           <td className="px-2 py-3 dark:text-[#F2F2F2] whitespace-nowrap sm:px-4">{deposit.user}</td>
//                           <td className="px-2 py-3 font-medium dark:text-[#F2F2F2] whitespace-nowrap sm:px-4">{deposit.amount}</td>
//                           <td className="px-2 py-3 text-sm dark:text-[#F2F2F2] whitespace-nowrap sm:px-4">{deposit.date}</td>
//                           <td className="px-2 py-3 text-sm dark:text-[#F2F2F2] whitespace-nowrap sm:px-4">{deposit.method}</td>
//                           <td className="px-2 py-3 text-sm sm:px-4">
//                             <StatusBadge status={deposit.status} />
//                           </td>
//                           <td className="px-2 py-3 whitespace-nowrap sm:px-4">
//                             <div className="flex gap-1">
//                               <ActionButton 
//                                 type="view" 
//                                 onClick={() => handleDepositAction(deposit.id, 'view')} 
//                               />
//                             </div>
//                           </td>
//                         </tr>
//                       ))
//                     )}
//                   </tbody>
//                 </table>
//               </div>
//             </div>
//           </div>
//         </TabsContent>
//       </Tabs>
//     </div>
//   );
// };

// export default DepositeRequest;