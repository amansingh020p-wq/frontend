'use client';

import React, { useState, useEffect } from 'react';
import { 
  Users, UserCheck, Clock, Check, X, Eye, Edit, Trash2 
} from 'lucide-react';
import StatCard from '../../../components/ui/StatCard';
import StatusBadge from '../../../components/ui/StatusBadge';
import { Skeleton } from '@/components/ui/skeleton';
import UserDetailsPopup from '@/components/UserDetailsPopup.jsx';
import api from '../../../utils/axios'; // Adjust the import path as necessary

const NewUserRequest = () => {
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState([]);
  const [userRequests, setUserRequests] = useState([]);
  const [toasts, setToasts] = useState([]);
  const [showUserDetails, setShowUserDetails] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [apiError, setApiError] = useState(null);

  // Toast notification system
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

  // Fetch all users from API
  const fetchUsers = async () => {
    try {
      setLoading(true);
      const response = await api.get('/admin/get-all-users');
      
      if (response.data.status === 'success') {
        const users = response.data.data;
        
        // Transform API data to match component structure
        const transformedUsers = users.map(user => ({
          id: user._id,
          name: user.name || 'Unknown User',
          username: `@${user.email?.split('@')[0] || 'unknown'}`,
          phone: user.phone || 'No phone provided',
          email: user.email || 'No email provided',
          status: user.isVerified ? 'verified' : 'pending',
          joinedDate: new Date(user.createdAt).toLocaleDateString('en-US', {
            year: 'numeric',
            month: '2-digit',
            day: '2-digit'
          }),
          aadharNo: user.aadharNo,
          pan: user.pan,
          bankName: user.bankName,
          accountNumber: user.accountNumber,
          accountHolder: user.accountHolder,
          ifscCode: user.ifscCode
        }));

        setUserRequests(transformedUsers);

        // Calculate stats from actual data - ensure no negative values
        // Handle undefined/null values properly
        const totalUsers = users.length;
        const verifiedUsers = users.filter(user => user.isVerified === true || user.isVerified === 'true').length;
        const pendingUsers = users.filter(user => user.isVerified === false || user.isVerified === null || user.isVerified === undefined).length;

        setStats([
          { title: 'Total Users', value: Math.max(0, totalUsers).toString(), icon: Users },
          { title: 'Pending Verifications', value: Math.max(0, pendingUsers).toString(), icon: Clock },
          { title: 'Verified Users', value: Math.max(0, verifiedUsers).toString(), icon: UserCheck },
        ]);

        setApiError(null);
      } else {
        throw new Error(response.data.message || 'Failed to fetch users');
      }
    } catch (error) {
      console.error('Error fetching users:', error);
      setApiError(error.response?.data?.message || error.message || 'Failed to fetch users');
      addToast('error', 'Failed to load user data');
    } finally {
      setLoading(false);
    }
  };

  // Handle verification actions
  const handleVerificationAction = async (userId, action) => {
    try {
      const endpoint = action === 'accept' ? '/admin/approve-user' : '/admin/reject-user';
      const response = await api.post(endpoint, { userId });

      if (response.data.status === 'success') {
        // Update local state
        setUserRequests(prev => {
          const updated = prev.map(user =>
            user.id === userId 
              ? { ...user, status: action === 'accept' ? 'verified' : 'pending' } 
              : user
          );
          
          // Recalculate stats from actual data to ensure accuracy
          const totalUsers = updated.length;
          const verifiedUsers = updated.filter(user => user.status === 'verified').length;
          const pendingUsers = updated.filter(user => user.status === 'pending').length;
          
          setStats([
            { title: 'Total Users', value: Math.max(0, totalUsers).toString(), icon: Users },
            { title: 'Pending Verifications', value: Math.max(0, pendingUsers).toString(), icon: Clock },
            { title: 'Verified Users', value: Math.max(0, verifiedUsers).toString(), icon: UserCheck },
          ]);
          
          return updated;
        });

        addToast(
          'success',
          action === 'accept' 
            ? 'User verification accepted successfully!' 
            : 'User verification rejected successfully!'
        );
      } else {
        throw new Error(response.data.message || 'Operation failed');
      }
    } catch (error) {
      console.error('Error updating user verification:', error);
      addToast('error', error.response?.data?.message || 'Failed to update user verification');
    }
  };

  // Handle view action - fetch detailed user info
  const handleViewAction = async (userId) => {
    try {
      const response = await api.get(`/admin/get-user?userId=${userId}`);
      
      if (response.data.status === 'success') {
        const userData = response.data.data;
        const userFromList = userRequests.find(u => u.id === userId);
        
        // Structure data to match UserDetailsPopup component expectations
        setSelectedUser({
          name: userData.name || 'Unknown User',
          personalInfo: {
            name: userData.name || 'Unknown User',
            email: userData.email || 'No email provided',
            phone: userData.phone || 'No phone provided',
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
            accountBalance: (userData.balanceInfo?.accountBalance !== undefined && userData.balanceInfo?.accountBalance !== null)
              ? `$${Number(userData.balanceInfo.accountBalance).toLocaleString()}` 
              : '$0',
            totalDeposit: (userData.balanceInfo?.totalDeposit !== undefined && userData.balanceInfo?.totalDeposit !== null)
              ? `$${Number(userData.balanceInfo.totalDeposit).toLocaleString()}` 
              : '$0',
            totalWithdrawals: (userData.balanceInfo?.totalWithdrawals !== undefined && userData.balanceInfo?.totalWithdrawals !== null)
              ? `$${Number(userData.balanceInfo.totalWithdrawals).toLocaleString()}` 
              : '$0',
            orderInvestment: (userData.balanceInfo?.orderInvestment !== undefined && userData.balanceInfo?.orderInvestment !== null)
              ? `$${Number(userData.balanceInfo.orderInvestment).toLocaleString()}` 
              : '$0',
            profitLoss: (userData.balanceInfo?.profitLoss !== undefined && userData.balanceInfo?.profitLoss !== null)
              ? (Number(userData.balanceInfo.profitLoss) >= 0 
                  ? `+$${Number(userData.balanceInfo.profitLoss).toLocaleString()}` 
                  : `-$${Math.abs(Number(userData.balanceInfo.profitLoss)).toLocaleString()}`)
              : '$0'
          },
          isVerified: userData.isVerified,
          joinedDate: userFromList?.joinedDate || userData.createdAt 
            ? new Date(userData.createdAt).toLocaleDateString('en-US', {
                year: 'numeric',
                month: '2-digit',
                day: '2-digit'
              })
            : 'Unknown',
          status: userData.isVerified ? 'verified' : 'pending'
        });
        setShowUserDetails(true);
      } else {
        throw new Error(response.data.message || 'Failed to fetch user details');
      }
    } catch (error) {
      console.error('Error fetching user details:', error);
      addToast('error', error.response?.data?.message || 'Failed to load user details');
    }
  };

  // Handle delete user
  const handleDeleteUser = async (userId) => {
    if (!window.confirm('Are you sure you want to delete this user? This action cannot be undone.')) {
      return;
    }

    try {
      const response = await api.delete('/admin/delete-user', { 
        data: { userId } // For DELETE requests, data goes in the data property
      });

      if (response.data.status === 'success') {
        // Remove user from local state and recalculate stats
        setUserRequests(prev => {
          const updated = prev.filter(user => user.id !== userId);
          
          // Recalculate stats from actual data to ensure accuracy
          const totalUsers = updated.length;
          const verifiedUsers = updated.filter(user => user.status === 'verified').length;
          const pendingUsers = updated.filter(user => user.status === 'pending').length;
          
          setStats([
            { title: 'Total Users', value: Math.max(0, totalUsers).toString(), icon: Users },
            { title: 'Pending Verifications', value: Math.max(0, pendingUsers).toString(), icon: Clock },
            { title: 'Verified Users', value: Math.max(0, verifiedUsers).toString(), icon: UserCheck },
          ]);
          
          return updated;
        });

        addToast('success', 'User deleted successfully');
      } else {
        throw new Error(response.data.message || 'Failed to delete user');
      }
    } catch (error) {
      console.error('Error deleting user:', error);
      addToast('error', error.response?.data?.message || 'Failed to delete user');
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  // Retry function for error state
  const handleRetry = () => {
    setApiError(null);
    fetchUsers();
  };

  // Error state
  if (apiError && !loading) {
    return (
      <div className="space-y-6 py-4 sm:py-6 -mt-10 md:-mt-12">
        <h1 className="text-2xl font-bold dark:text-[#F2F2F2]">New User Requests</h1>
        <div className="flex flex-col items-center justify-center h-64 space-y-4">
          <div className="text-center">
            <p className="text-destructive text-lg font-medium">Error Loading Data</p>
            <p className="text-muted-foreground">{apiError}</p>
          </div>
          <button
            onClick={handleRetry}
            className="px-4 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6 py-4 sm:py-6 -mt-10 md:-mt-12">
      {/* Toast Notifications */}
      <div className="fixed top-4 mt-16 mr-4 md:mr-0 right-4 z-50 space-y-3">
        {toasts.map((toast) => (
          <Toast key={toast.id} {...toast} />
        ))}
      </div>

      {/* User Details Popup */}
      {showUserDetails && (
        <UserDetailsPopup 
          user={selectedUser} 
          onClose={() => setShowUserDetails(false)}
          showImages={true}
          showForex={false}
        />
      )}

      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold dark:text-[#F2F2F2]">New User Requests</h1>
        <button
          onClick={fetchUsers}
          disabled={loading}
          className="px-4 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90 disabled:opacity-50"
        >
          {loading ? 'Refreshing...' : 'Refresh'}
        </button>
      </div>

      {/* Stats Cards with Skeleton */}
      <div className="grid grid-cols-2 gap-3 sm:gap-4 md:grid-cols-4">
        {loading ? (
          Array.from({ length: 3 }).map((_, index) => (
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

      {/* User Requests Table with Skeleton */}
      <div className="bg-card rounded-lg border dark:border-[#2A3F3A] shadow-sm">
        <div className="p-6 border-b dark:border-[#2A3F3A]">
          <h2 className="text-xl font-semibold dark:text-[#F2F2F2]">User Verification Requests</h2>
        </div>
        <div className="p-4 overflow-x-auto">
          <div className="min-w-[600px]">
            <table className="w-full text-xs sm:text-sm">
              <thead>
                <tr className="border-b dark:border-[#2A3F3A]">
                  <th className="px-2 py-2 text-left font-medium text-muted-foreground whitespace-nowrap sm:px-4">Name & Username</th>
                  <th className="px-2 py-2 text-left font-medium text-muted-foreground whitespace-nowrap sm:px-4">Phone No.</th>
                  <th className="px-2 py-2 text-left font-medium text-muted-foreground whitespace-nowrap sm:px-4">Email</th>
                  <th className="px-2 py-2 text-left font-medium text-muted-foreground whitespace-nowrap sm:px-4">Status</th>
                  <th className="px-2 py-2 text-left font-medium text-muted-foreground whitespace-nowrap sm:px-4">Joined Date</th>
                  <th className="px-2 py-2 text-left font-medium text-muted-foreground whitespace-nowrap sm:px-4">Actions</th>
                </tr>
              </thead>
              <tbody>
                {loading ? (
                  Array.from({ length: 5 }).map((_, index) => (
                    <tr key={index} className="border-b dark:border-[#2A3F3A]">
                      <td className="px-2 py-3 sm:px-4">
                        <div className="space-y-2">
                          <Skeleton className="h-4 w-[120px]" />
                          <Skeleton className="h-3 w-[80px]" />
                        </div>
                      </td>
                      <td className="px-2 py-3 sm:px-4">
                        <Skeleton className="h-4 w-[120px]" />
                      </td>
                      <td className="px-2 py-3 sm:px-4">
                        <Skeleton className="h-4 w-[140px]" />
                      </td>
                      <td className="px-2 py-3 sm:px-4">
                        <Skeleton className="h-6 w-[70px] rounded-full" />
                      </td>
                      <td className="px-2 py-3 sm:px-4">
                        <Skeleton className="h-4 w-[80px]" />
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
                ) : userRequests.length === 0 ? (
                  <tr>
                    <td colSpan="6" className="px-4 py-8 text-center text-muted-foreground">
                      No user requests found
                    </td>
                  </tr>
                ) : (
                  userRequests.map((user) => (
                    <tr key={user.id} className="border-b dark:border-[#2A3F3A] hover:bg-muted/50">
                      <td className="px-2 py-3 sm:px-4">
                        <div>
                          <div className="font-medium dark:text-[#F2F2F2] whitespace-nowrap">{user.name}</div>
                          <div className="text-sm text-muted-foreground dark:text-[#F2F2F2] whitespace-nowrap">{user.username}</div>
                        </div>
                      </td>
                      <td className="px-2 py-3 dark:text-[#F2F2F2] whitespace-nowrap sm:px-4">{user.phone}</td>
                      <td className="px-2 py-3 dark:text-[#F2F2F2] whitespace-nowrap sm:px-4">{user.email}</td>
                      <td className="px-2 py-3 sm:px-4">
                        <StatusBadge status={user.status} />
                      </td>
                      <td className="px-2 py-3 dark:text-[#F2F2F2] whitespace-nowrap sm:px-4">{user.joinedDate}</td>
                      <td className="px-2 py-3 sm:px-4">
                        <div className="flex gap-1">
                          {user.status === 'pending' ? (
                            <>
                              <button
                                onClick={() => handleVerificationAction(user.id, 'accept')}
                                className="p-1.5 rounded-md border bg-green-500/20 text-green-400 border-green-500/30 hover:bg-green-500/30"
                                title="Approve user"
                              >
                                <Check className="w-3 h-3" />
                              </button>
                              <button
                                onClick={() => handleVerificationAction(user.id, 'reject')}
                                className="p-1.5 rounded-md border bg-red-500/20 text-red-400 border-red-500/30 hover:bg-red-500/30"
                                title="Reject user"
                              >
                                <X className="w-3 h-3" />
                              </button>
                            </>
                          ) : user.status === 'verified' ? (
                            <button
                              onClick={() => handleVerificationAction(user.id, 'reject')}
                              className="p-1.5 rounded-md border bg-red-500/20 text-red-400 border-red-500/30 hover:bg-red-500/30"
                              title="Reject user"
                            >
                              <X className="w-3 h-3" />
                            </button>
                          ) : null}
                          <button
                            onClick={() => handleViewAction(user.id)}
                            className="p-1.5 rounded-md border bg-blue-500/20 text-blue-400 border-blue-500/30 hover:bg-blue-500/30"
                            title="View details"
                          >
                            <Eye className="w-3 h-3" />
                          </button>
                          <button
                            onClick={() => handleDeleteUser(user.id)}
                            className="p-1.5 rounded-md border bg-red-500/20 text-red-400 border-red-500/30 hover:bg-red-500/30"
                            title="Delete user"
                          >
                            <Trash2 className="w-3 h-3" />
                          </button>
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

export default NewUserRequest;