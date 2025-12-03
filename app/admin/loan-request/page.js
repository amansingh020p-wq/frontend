
'use client';
import React, { useState, useEffect } from 'react';
import { CreditCard, Clock, CheckCircle, DollarSign } from 'lucide-react';
import StatCard from '@../../../components/ui/StatCard';
import StatusBadge from '../../../components/ui/StatusBadge';
import ActionButton from '../../../components/ui/ActionButton';
import { Skeleton } from '@/components/ui/skeleton';
import { Check, X, Eye } from 'lucide-react';
import UserDetailsPopup from '@/components/UserDetailsPopup';
import { mockUserDetails } from '@/utils/mockUserData';

const LoanRequest = () => {
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState([]);
  const [loanRequests, setLoanRequests] = useState([]);
  const [toasts, setToasts] = useState([]);
  const [showUserDetails, setShowUserDetails] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);

  useEffect(() => {
    // Simulate API fetch
    const fetchData = async () => {
      // Simulate network delay
      await new Promise(resolve => setTimeout(resolve, 1500));

      // Set the actual data
      setStats([
        { title: 'Total Requests', value: '183', icon: CreditCard },
        { title: 'Pending', value: '26', icon: Clock },
        { title: 'Approved', value: '157', icon: CheckCircle },
        { title: 'Total Loan Amount', value: '$1.25M', icon: DollarSign },
      ]);

      setLoanRequests([
        {
          id: 1,
          name: 'John Smith',
          username: '@johnsmith',
          amount: '$5,000',
          duration: '12',
          status: 'pending',
        },
        {
          id: 2,
          name: 'John Smith',
          username: '@johnsmith',
          amount: '$5,000',
          duration: '12',
          status: 'pending',
        },
        {
          id: 3,
          name: 'John Smith',
          username: '@johnsmith',
          amount: '$5,000',
          duration: '12',
          status: 'pending',
        },
        // ... other loan requests
      ]);

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


  const handleLoanRequestAction = (id, action) => {
    if (action === 'accept') {
      setLoanRequests(prev =>
        prev.map(request =>
          request.id === id ? { ...request, status: 'completed' } : request
        )
      );
      addToast('success', 'Loan request accepted successfully!');
    } else if (action === 'reject') {
      setLoanRequests(prev => prev.filter(request => request.id !== id));
      addToast('error', 'Loan request rejected successfully!');
    } else if (action === 'view') {
      const user = loanRequests.find(w => w.id === id)?.user;
      handleViewAction(id, user);
    }
  };

  const handleViewAction = (userId, userName) => {
    const user = {
      name: userName,
      ...mockUserDetails
    };
    setSelectedUser(user);
    setShowUserDetails(true);
  };

  return (
    <div className="space-y-6 py-4 sm:py-6 -mt-10 md:-mt-12">
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
      <h1 className="text-2xl font-bold dark:text-[#F2F2F2]">Loan Requests</h1>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 gap-3 sm:gap-4 md:grid-cols-4">
        {loading ? (
          Array.from({ length: 4 }).map((_, index) => (
            <div key={index} className="bg-card rounded-lg border dark:border-[#2A3F3A] shadow-sm p-4">
              <div className="flex items-center space-x-4">
                <Skeleton className="h-10 w-10 rounded-full" />
                <div className="space-y-2">
                  <Skeleton className="h-4 w-[100px]" />
                  <Skeleton className="h-6 w-[80px]" />
                </div>
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

      {/* Loan Requests Table */}
      <div className="bg-card rounded-lg border dark:border-[#2A3F3A] shadow-sm">
        <div className="p-6 border-b dark:border-[#2A3F3A]">
          <h2 className="text-xl font-semibold dark:text-[#F2F2F2]">Loan Applications</h2>
          <p className="text-sm text-muted-foreground mt-1 dark:text-[#ABBAB6]">Review and manage loan requests</p>
        </div>
        <div className="p-4 overflow-x-auto">
          <div className="min-w-[600px]">
            <table className="w-full text-xs sm:text-sm">
              <thead>
                <tr className="border-b dark:border-[#2A3F3A]">
                  <th className="px-2 py-2 text-left font-medium text-muted-foreground whitespace-nowrap dark:text-[#ABBAB6] sm:px-4">Name & Username</th>
                  <th className="px-2 py-2 text-left font-medium text-muted-foreground whitespace-nowrap dark:text-[#ABBAB6] sm:px-4">Amount + Duration</th>
                  <th className="px-2 py-2 text-left font-medium text-muted-foreground whitespace-nowrap dark:text-[#ABBAB6] sm:px-4">Status</th>
                  <th className="px-2 py-2 text-left font-medium text-muted-foreground whitespace-nowrap dark:text-[#ABBAB6] sm:px-4">Actions</th>
                </tr>
              </thead>
              <tbody>
                {loading ? (
                  Array.from({ length: 4 }).map((_, index) => (
                    <tr key={index} className="border-b dark:border-[#2A3F3A]">
                      <td className="px-2 py-3 sm:px-4">
                        <div className="space-y-2">
                          <Skeleton className="h-4 w-[120px]" />
                          <Skeleton className="h-3 w-[80px]" />
                        </div>
                      </td>
                      <td className="px-2 py-3 sm:px-4">
                        <div className="space-y-2">
                          <Skeleton className="h-4 w-[80px]" />
                          <Skeleton className="h-3 w-[60px]" />
                        </div>
                      </td>
                      <td className="px-2 py-3 sm:px-4">
                        <Skeleton className="h-6 w-[70px] rounded-full" />
                      </td>
                      <td className="px-2 py-3 sm:px-4">
                        <div className="flex gap-1">
                          <Skeleton className="h-8 w-8 rounded" />
                          <Skeleton className="h-8 w-8 rounded" />
                          <Skeleton className="h-8 w-8 rounded" />
                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  loanRequests.map((request) => (
                    <tr key={request.id} className="border-b dark:border-[#2A3F3A] hover:bg-muted/50">
                      <td className="px-2 py-3 sm:px-4">
                        <div>
                          <div className="font-medium dark:text-[#F2F2F2] whitespace-nowrap">{request.name}</div>
                          <div className="text-sm text-muted-foreground dark:text-[#ABBAB6] whitespace-nowrap">{request.username}</div>
                        </div>
                      </td>
                      <td className="px-2 py-3 sm:px-4">
                        <div className="font-medium dark:text-[#F2F2F2] whitespace-nowrap">{request.amount}</div>
                        <div className="text-sm text-muted-foreground dark:text-[#ABBAB6] whitespace-nowrap">{request.duration} months</div>
                      </td>
                      <td className="px-2 py-3 sm:px-4">
                        <StatusBadge status={request.status} />
                      </td>
                      <td className="px-2 py-3 sm:px-4">
                        <div className="flex gap-1">
                          {request.status === 'pending' ? (
                            <>
                              <ActionButton
                                type="accept"
                                onClick={() => handleLoanRequestAction(request.id, 'accept')}
                              />
                              <ActionButton
                                type="reject"
                                onClick={() => handleLoanRequestAction(request.id, 'reject')}
                              />
                              <ActionButton
                                type="view"
                                onClick={() => handleLoanRequestAction(request.id, 'view')}
                              />
                            </>
                          ) : (
                            <ActionButton
                              type="view"
                              onClick={() => handleLoanRequestAction(request.id, 'view')}
                            />
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

export default LoanRequest;