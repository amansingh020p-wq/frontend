'use client';

import React, { useState, useEffect } from 'react';
import { TabsContent, Tabs, TabsList, TabsTrigger } from "../../../components/ui/tabs";
import StatusBadge from '../../../components/ui/StatusBadge';
import ActionButton from '../../../components/ui/ActionButton';
import { Skeleton } from '@/components/ui/skeleton';
import { Check, X, Eye } from 'lucide-react';
import UserDetailsPopup from '@/components/UserDetailsPopup';
import api from '@/utils/axios'; // Your axios instance

const DepositeRequest = () => {
  const [loading, setLoading] = useState(true);
  const [pendingDeposits, setPendingDeposits] = useState([]);
  const [verifiedDeposits, setVerifiedDeposits] = useState([]);
  const [activeTab, setActiveTab] = useState("pending");
  const [toasts, setToasts] = useState([]);
  const [showUserDetails, setShowUserDetails] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);

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

  // API Functions using your axios instance
  const fetchPendingDeposits = async () => {
    try {
      const response = await api.get('/admin/get-all-pending-deposits');
      return response.data.data.pendingDeposits || [];
    } catch (error) {
      console.error('Error fetching pending deposits:', error);
      addToast('error', 'Failed to fetch pending deposits');
      return [];
    }
  };

  const fetchVerifiedDeposits = async () => {
    try {
      const response = await api.get('/admin/get-all-verified-deposits');
      return response.data.data.verifiedDeposits || [];
    } catch (error) {
      console.error('Error fetching verified deposits:', error);
      addToast('error', 'Failed to fetch verified deposits');
      return [];
    }
  };

  const approveDepositAPI = async (depositId) => {
    try {
      const response = await api.patch(`/admin/approve-deposit/${depositId}`);
      return response.data;
    } catch (error) {
      console.error('Error approving deposit:', error);
      throw error;
    }
  };

  const rejectDepositAPI = async (depositId, reason = 'Rejected by admin') => {
    try {
      const response = await api.patch(`/admin/reject-deposit/${depositId}`, { reason });
      return response.data;
    } catch (error) {
      console.error('Error rejecting deposit:', error);
      throw error;
    }
  };

  // Format date for display
  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit'
    });
  };

  // Format amount for display
  const formatAmount = (amount, currency = 'INR') => {
    if (currency === 'INR') {
      return `₹${amount.toLocaleString('en-IN')}`;
    }
    return `$${amount.toLocaleString('en-US')}`;
  };

  // Map backend status to frontend status
  const mapStatus = (backendStatus) => {
    const statusMap = {
      'PENDING': 'pending',
      'COMPLETED': 'verified',
      'FAILED': 'failed',
      'CANCELLED': 'rejected'
    };
    return statusMap[backendStatus] || backendStatus.toLowerCase();
  };

  // Map payment method to display format
  const formatPaymentMethod = (method) => {
    const methodMap = {
      'CARD': 'Credit Card',
      'UPI': 'UPI',
      'NETBANKING': 'Net Banking',
      'WALLET': 'Wallet'
    };
    return methodMap[method] || method || 'Not specified';
  };

  // Transform backend data to frontend format
  const transformDepositData = (deposits) => {
    return deposits.map(deposit => {
      // Extract userId - handle both populated (object) and non-populated (string/ObjectId) cases
      let userId = null;
      if (deposit.userId) {
        if (typeof deposit.userId === 'object' && deposit.userId._id) {
          // Populated user object
          userId = deposit.userId._id.toString ? deposit.userId._id.toString() : String(deposit.userId._id);
        } else if (typeof deposit.userId === 'string') {
          // String ID
          userId = deposit.userId;
        } else if (deposit.userId.toString) {
          // ObjectId or other object with toString method
          userId = deposit.userId.toString();
        } else {
          // Fallback: convert to string
          userId = String(deposit.userId);
        }
      }

      // Log if userId extraction failed (for debugging)
      if (!userId && deposit.userId) {
        console.warn('Failed to extract userId from deposit:', deposit);
      }

      return {
        id: deposit._id,
        transactionId: deposit.transactionId,
        userId: userId, // Store userId for fetching full details
        user: deposit.userId?.name || 'Unknown User',
        userEmail: deposit.userId?.email || '',
        userPhone: deposit.userId?.phone || '',
        amount: formatAmount(deposit.amount, deposit.currency),
        date: formatDate(deposit.timestamp),
        method: formatPaymentMethod(deposit.paymentMethod),
        status: mapStatus(deposit.status),
        rawAmount: deposit.amount,
        currency: deposit.currency,
        description: deposit.description,
        failureReason: deposit.failureReason,
        verified: deposit.verified
      };
    });
  };

  const handleDepositAction = async (depositId, action) => {
    if (action === 'accept') {
      try {
        await approveDepositAPI(depositId);
        
        // Find the deposit to move
        const depositToMove = pendingDeposits.find(d => d.id === depositId);
        
        if (depositToMove) {
          // Update status
          const updatedDeposit = { ...depositToMove, status: 'verified' };
          
          // Remove from pending and add to verified
          setPendingDeposits(prev => prev.filter(d => d.id !== depositId));
          setVerifiedDeposits(prev => [updatedDeposit, ...prev]);
          
          addToast('success', 'Deposit request accepted successfully!');
        }
      } catch (error) {
        const errorMessage = error.response?.data?.message || 'Failed to accept deposit request';
        addToast('error', errorMessage);
      }
    } else if (action === 'reject') {
      try {
        await rejectDepositAPI(depositId);
        
        // Remove from pending deposits
        setPendingDeposits(prev => prev.filter(d => d.id !== depositId));
        addToast('error', 'Deposit request rejected successfully!');
      } catch (error) {
        const errorMessage = error.response?.data?.message || 'Failed to reject deposit request';
        addToast('error', errorMessage);
      }
    } else if (action === 'view') {
      const deposit = verifiedDeposits.find(d => d.id === depositId) || pendingDeposits.find(d => d.id === depositId);
      if (deposit) {
        if (!deposit.userId) {
          console.error('Deposit found but userId is missing:', deposit);
          addToast('error', 'User ID not found in deposit data');
          return;
        }
        handleViewAction(deposit);
      } else {
        console.error('Deposit not found with id:', depositId);
        console.error('Available verified deposits:', verifiedDeposits.map(d => d.id));
        console.error('Available pending deposits:', pendingDeposits.map(d => d.id));
        addToast('error', 'Deposit not found');
      }
    }
  };

  const handleViewAction = async (deposit) => {
    try {
      // Ensure userId is a string - handle all possible formats
      let userId = null;
      
      if (deposit?.userId) {
        if (typeof deposit.userId === 'string') {
          userId = deposit.userId;
        } else if (deposit.userId.toString) {
          userId = deposit.userId.toString();
        } else if (deposit.userId._id) {
          userId = deposit.userId._id.toString ? deposit.userId._id.toString() : deposit.userId._id;
        } else {
          userId = String(deposit.userId);
        }
      }
      
      if (!userId || userId === 'null' || userId === 'undefined') {
        console.error('Deposit data:', deposit);
        console.error('Extracted userId:', userId);
        addToast('error', 'User ID not found');
        return;
      }

      console.log('Fetching user details for userId:', userId);
      // Fetch full user details from API
      const response = await api.get(`/admin/get-user/${userId}`);
      
      if (response.data.status === 'success' && response.data.data) {
        const userData = response.data.data;
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
      const errorMessage = error.response?.data?.message || error.message || 'Failed to fetch user details';
      addToast('error', errorMessage);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      
      try {
        const [pendingData, verifiedData] = await Promise.all([
          fetchPendingDeposits(),
          fetchVerifiedDeposits()
        ]);
        
        // Debug: Log raw data to see structure
        if (verifiedData.length > 0) {
          console.log('Sample verified deposit raw data:', verifiedData[0]);
        }
        
        const transformedPending = transformDepositData(pendingData);
        const transformedVerified = transformDepositData(verifiedData);
        
        // Debug: Log transformed data
        if (transformedVerified.length > 0) {
          console.log('Sample verified deposit transformed:', transformedVerified[0]);
        }
        
        setPendingDeposits(transformedPending);
        setVerifiedDeposits(transformedVerified);
      } catch (error) {
        console.error('Error fetching data:', error);
        addToast('error', 'Failed to load deposit data');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="space-y-6 py-4 sm:py-6 -mt-10 md:-mt-12">
      {/* Toast Notifications */}
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

      <h1 className="text-2xl font-bold dark:text-[#F2F2F2]">Deposit Requests</h1>
      
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full md:w-80 grid-cols-2">
          <TabsTrigger value="pending">Pending Deposits ({pendingDeposits.length})</TabsTrigger>
          <TabsTrigger value="verified">Verified Deposits ({verifiedDeposits.length})</TabsTrigger>
        </TabsList>
        
        <TabsContent value="pending" className="mt-4">
          <div className="bg-card rounded-lg border dark:border-[#2A3F3A] shadow-sm">
            <div className="p-6 border-b dark:border-[#2A3F3A]">
              <h2 className="text-xl font-semibold dark:text-[#F2F2F2]">Pending Deposits</h2>
              <p className="text-sm text-muted-foreground mt-1 dark:text-[#ABBAB6]">Review and approve deposit requests</p>
            </div>
            <div className="p-4 overflow-x-auto">
              <div className="min-w-[800px]">
                <table className="w-full text-xs sm:text-sm">
                  <thead>
                    <tr className="border-b dark:border-[#2A3F3A]">
                      <th className="px-2 py-2 text-left font-medium text-muted-foreground whitespace-nowrap dark:text-[#ABBAB6] sm:px-4">Transaction ID</th>
                      <th className="px-2 py-2 text-left font-medium text-muted-foreground whitespace-nowrap dark:text-[#ABBAB6] sm:px-4">User</th>
                      <th className="px-2 py-2 text-left font-medium text-muted-foreground whitespace-nowrap dark:text-[#ABBAB6] sm:px-4">Amount</th>
                      <th className="px-2 py-2 text-left font-medium text-muted-foreground whitespace-nowrap dark:text-[#ABBAB6] sm:px-4">Date</th>
                      <th className="px-2 py-2 text-left font-medium text-muted-foreground whitespace-nowrap dark:text-[#ABBAB6] sm:px-4">Method</th>
                      <th className="px-2 py-2 text-left font-medium text-muted-foreground whitespace-nowrap dark:text-[#ABBAB6] sm:px-4">Status</th>
                      <th className="px-2 py-2 text-left font-medium text-muted-foreground whitespace-nowrap dark:text-[#ABBAB6] sm:px-4">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {loading ? (
                      Array.from({ length: 4 }).map((_, index) => (
                        <tr key={index} className="border-b dark:border-[#2A3F3A]">
                          <td className="px-2 py-3 sm:px-4"><Skeleton className="h-4 w-[100px]" /></td>
                          <td className="px-2 py-3 sm:px-4"><Skeleton className="h-4 w-[120px]" /></td>
                          <td className="px-2 py-3 sm:px-4"><Skeleton className="h-4 w-[80px]" /></td>
                          <td className="px-2 py-3 sm:px-4"><Skeleton className="h-4 w-[90px]" /></td>
                          <td className="px-2 py-3 sm:px-4"><Skeleton className="h-4 w-[110px]" /></td>
                          <td className="px-2 py-3 sm:px-4"><Skeleton className="h-6 w-[70px] rounded-full" /></td>
                          <td className="px-2 py-3 sm:px-4">
                            <div className="flex gap-1">
                              <Skeleton className="h-8 w-8 rounded" />
                              <Skeleton className="h-8 w-8 rounded" />
                            </div>
                          </td>
                        </tr>
                      ))
                    ) : pendingDeposits.length === 0 ? (
                      <tr>
                        <td colSpan="7" className="px-4 py-8 text-center text-muted-foreground">
                          No pending deposits found
                        </td>
                      </tr>
                    ) : (
                      pendingDeposits.map((deposit) => (
                        <tr key={deposit.id} className="border-b dark:border-[#2A3F3A] hover:bg-muted/50">
                          <td className="px-2 py-3 text-sm dark:text-[#F2F2F2] whitespace-nowrap sm:px-4">{deposit.transactionId}</td>
                          <td className="px-2 py-3 dark:text-[#F2F2F2] whitespace-nowrap sm:px-4">{deposit.user}</td>
                          <td className="px-2 py-3 font-medium dark:text-[#F2F2F2] whitespace-nowrap sm:px-4">{deposit.amount}</td>
                          <td className="px-2 py-3 text-sm dark:text-[#F2F2F2] whitespace-nowrap sm:px-4">{deposit.date}</td>
                          <td className="px-2 py-3 text-sm dark:text-[#F2F2F2] whitespace-nowrap sm:px-4">{deposit.method}</td>
                          <td className="px-2 py-3 text-sm sm:px-4">
                            <StatusBadge status={deposit.status} />
                          </td>
                          <td className="px-2 py-3 whitespace-nowrap sm:px-4">
                            <div className="flex gap-1">
                              <ActionButton 
                                type="accept" 
                                onClick={() => handleDepositAction(deposit.id, 'accept')} 
                              />
                              <ActionButton 
                                type="reject" 
                                onClick={() => handleDepositAction(deposit.id, 'reject')} 
                              />
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
        </TabsContent>
        
        <TabsContent value="verified" className="mt-4">
          <div className="bg-card rounded-lg border dark:border-[#2A3F3A] shadow-sm">
            <div className="p-6 border-b dark:border-[#2A3F3A]">
              <h2 className="text-xl font-semibold dark:text-[#F2F2F2]">Verified Deposits</h2>
              <p className="text-sm text-muted-foreground mt-1 dark:text-[#ABBAB6]">View completed deposit transactions</p>
            </div>
            <div className="p-4 overflow-x-auto">
              <div className="min-w-[800px]">
                <table className="w-full text-xs sm:text-sm">
                  <thead>
                    <tr className="border-b dark:border-[#2A3F3A]">
                      <th className="px-2 py-2 text-left font-medium text-muted-foreground whitespace-nowrap dark:text-[#ABBAB6] sm:px-4">Transaction ID</th>
                      <th className="px-2 py-2 text-left font-medium text-muted-foreground whitespace-nowrap dark:text-[#ABBAB6] sm:px-4">User</th>
                      <th className="px-2 py-2 text-left font-medium text-muted-foreground whitespace-nowrap dark:text-[#ABBAB6] sm:px-4">Amount</th>
                      <th className="px-2 py-2 text-left font-medium text-muted-foreground whitespace-nowrap dark:text-[#ABBAB6] sm:px-4">Date</th>
                      <th className="px-2 py-2 text-left font-medium text-muted-foreground whitespace-nowrap dark:text-[#ABBAB6] sm:px-4">Method</th>
                      <th className="px-2 py-2 text-left font-medium text-muted-foreground whitespace-nowrap dark:text-[#ABBAB6] sm:px-4">Status</th>
                      <th className="px-2 py-2 text-left font-medium text-muted-foreground whitespace-nowrap dark:text-[#ABBAB6] sm:px-4">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {loading ? (
                      Array.from({ length: 4 }).map((_, index) => (
                        <tr key={index} className="border-b dark:border-[#2A3F3A]">
                          <td className="px-2 py-3 sm:px-4"><Skeleton className="h-4 w-[100px]" /></td>
                          <td className="px-2 py-3 sm:px-4"><Skeleton className="h-4 w-[120px]" /></td>
                          <td className="px-2 py-3 sm:px-4"><Skeleton className="h-4 w-[80px]" /></td>
                          <td className="px-2 py-3 sm:px-4"><Skeleton className="h-4 w-[90px]" /></td>
                          <td className="px-2 py-3 sm:px-4"><Skeleton className="h-4 w-[110px]" /></td>
                          <td className="px-2 py-3 sm:px-4"><Skeleton className="h-6 w-[70px] rounded-full" /></td>
                          <td className="px-2 py-3 sm:px-4">
                            <div className="flex gap-1">
                              <Skeleton className="h-8 w-8 rounded" />
                            </div>
                          </td>
                        </tr>
                      ))
                    ) : verifiedDeposits.length === 0 ? (
                      <tr>
                        <td colSpan="7" className="px-4 py-8 text-center text-muted-foreground">
                          No verified deposits found
                        </td>
                      </tr>
                    ) : (
                      verifiedDeposits.map((deposit) => (
                        <tr key={deposit.id} className="border-b dark:border-[#2A3F3A] hover:bg-muted/50">
                          <td className="px-2 py-3 text-sm dark:text-[#F2F2F2] whitespace-nowrap sm:px-4">{deposit.transactionId}</td>
                          <td className="px-2 py-3 dark:text-[#F2F2F2] whitespace-nowrap sm:px-4">{deposit.user}</td>
                          <td className="px-2 py-3 font-medium dark:text-[#F2F2F2] whitespace-nowrap sm:px-4">{deposit.amount}</td>
                          <td className="px-2 py-3 text-sm dark:text-[#F2F2F2] whitespace-nowrap sm:px-4">{deposit.date}</td>
                          <td className="px-2 py-3 text-sm dark:text-[#F2F2F2] whitespace-nowrap sm:px-4">{deposit.method}</td>
                          <td className="px-2 py-3 text-sm sm:px-4">
                            <StatusBadge status={deposit.status} />
                          </td>
                          <td className="px-2 py-3 whitespace-nowrap sm:px-4">
                            <div className="flex gap-1">
                              <ActionButton 
                                type="view" 
                                onClick={() => handleDepositAction(deposit.id, 'view')} 
                              />
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
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default DepositeRequest;