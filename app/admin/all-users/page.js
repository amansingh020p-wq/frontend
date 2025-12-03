'use client';

import React, { useState, useEffect } from 'react';
import { Users, UserPlus, UserCheck, UserX } from 'lucide-react';
import { useRouter } from 'next/navigation';
import StatCard from '../../../components/ui/StatCard';
import StatusBadge from '../../../components/ui/StatusBadge';
import ActionButton from '../../../components/ui/ActionButton';
import { Skeleton } from '@/components/ui/skeleton';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import api from '../../../utils/axios'; // Import your axios instance

const AllUsers = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState([]);
  const [users, setUsers] = useState([]);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [userToDelete, setUserToDelete] = useState(null);
  const [error, setError] = useState(null);

  // API call functions using your axios instance
  const fetchAllUsers = async () => {
    try {
      const response = await api.get('/admin/get-all-users');
      console.log('Users data received:', response.data);
      return response.data;
    } catch (error) {
      console.error('Error fetching users:', error);
      throw error;
    }
  };

  const fetchUserStats = async () => {
    try {
      // Try to fetch KPIs first
      const response = await api.get('/admin/get-all-user-kpis');
      return response.data;
    } catch (error) {
      console.error('KPIs endpoint not available, will calculate from users data:', error);
      return null;
    }
  };

  const deleteUser = async (userId) => {
    try {
      const response = await api.delete('/admin/delete-user', {
        data: { userId }
      });
      return response.data;
    } catch (error) {
      console.error('Error deleting user:', error);
      throw error;
    }
  };

  const approveUser = async (userId) => {
    try {
      const response = await api.post('/admin/approve-user', { userId });
      return response.data;
    } catch (error) {
      console.error('Error approving user:', error);
      throw error;
    }
  };

  const rejectUser = async (userId) => {
    try {
      const response = await api.post('/admin/reject-user', { userId });
      return response.data;
    } catch (error) {
      console.error('Error rejecting user:', error);
      throw error;
    }
  };

  // Calculate stats from users data if KPIs endpoint is not available
  const calculateStatsFromUsers = (usersData) => {
    const totalUsers = usersData.length;
    // Handle undefined/null values properly - only count explicitly true as verified
    const verifiedUsers = usersData.filter(user => user.isVerified === true || user.isVerified === 'true').length;
    // Count false, null, or undefined as unverified
    const unverifiedUsers = usersData.filter(user => user.isVerified === false || user.isVerified === null || user.isVerified === undefined).length;
    
    // Calculate new users (last 30 days)
    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
    
    const newUsers = usersData.filter(user => {
      if (!user.createdAt) return false;
      const userDate = new Date(user.createdAt);
      return userDate >= thirtyDaysAgo;
    }).length;

    return {
      totalUsers: Math.max(0, totalUsers),
      activeUsers: Math.max(0, verifiedUsers),
      suspendedUsers: Math.max(0, unverifiedUsers),
      newUsers: Math.max(0, newUsers)
    };
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        setError(null);

        // Fetch users data first
        const usersResponse = await fetchAllUsers();
        
        if (usersResponse && usersResponse.status === 'success') {
          const rawUsers = usersResponse.data || usersResponse.users || [];
          
          // Format users data
          const formattedUsers = rawUsers.map(user => ({
            id: user._id,
            name: user.name || 'Unknown User',
            username: user.username || user.email || 'No username',
            email: user.email || 'No email',
            phone: user.phone || 'No phone',
            generatedPassword: user.generatedPassword || 'Not generated yet',
            status: user.isVerified ? 'verified' : 'unverified',
            joinedDate: user.createdAt ? new Date(user.createdAt).toLocaleDateString() : 'Unknown',
            lastTransaction: user.lastTransaction || 'N/A',
            aadharNo: user.aadharNo || 'Not provided',
            pan: user.pan || 'Not provided',
            bankDetails: {
              bankName: user.bankName || 'Not provided',
              accountNumber: user.accountNumber || 'Not provided',
              accountHolder: user.accountHolder || 'Not provided',
              ifscCode: user.ifscCode || 'Not provided'
            }
          }));
          
          setUsers(formattedUsers);

          // Try to fetch stats, fallback to calculation
          let statsData;
          try {
            const statsResponse = await fetchUserStats();
            if (statsResponse && statsResponse.status === 'success') {
              statsData = statsResponse.data;
            } else {
              statsData = calculateStatsFromUsers(rawUsers);
            }
          } catch {
            statsData = calculateStatsFromUsers(rawUsers);
          }

          // Set stats
          const processedStats = [
            { 
              title: 'Total Users', 
              value: statsData.totalUsers?.toString() || '0', 
              icon: Users 
            },
            { 
              title: 'New Users', 
              value: statsData.newUsers?.toString() || '0', 
              icon: UserPlus 
            },
            { 
              title: 'Active Users', 
              value: statsData.activeUsers?.toString() || '0', 
              icon: UserCheck 
            },
            { 
              title: 'Suspended Users', 
              value: statsData.suspendedUsers?.toString() || '0', 
              icon: UserX 
            },
          ];
          setStats(processedStats);
        }

      } catch (error) {
        console.error('Error fetching data:', error);
        if (error.response?.status === 401) {
          setError('Authentication failed. Please login again.');
          // Optionally redirect to login
          // router.push('/login');
        } else if (error.response?.status === 403) {
          setError('Access denied. Admin privileges required.');
        } else {
          setError('Failed to load data. Please try again.');
        }
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleViewUser = (userId) => {
    router.push(`/admin/user-profile/${userId}`);
  };

  const handleDeleteClick = (userId) => {
    setUserToDelete(userId);
    setDeleteDialogOpen(true);
  };

  const handleDeleteUser = async () => {
    if (userToDelete) {
      try {
        await deleteUser(userToDelete);
        setUsers(prevUsers => prevUsers.filter(user => user.id !== userToDelete));
        setDeleteDialogOpen(false);
        setUserToDelete(null);
        
        // Update stats after deletion
        const updatedStats = [...stats];
        updatedStats[0].value = (parseInt(updatedStats[0].value) - 1).toString();
        setStats(updatedStats);
        
      } catch (error) {
        console.error('Error deleting user:', error);
        if (error.response?.data?.message) {
          setError(`Failed to delete user: ${error.response.data.message}`);
        } else {
          setError('Failed to delete user. Please try again.');
        }
      }
    }
  };

  const handleApproveUser = async (userId) => {
    try {
      await approveUser(userId);
      setUsers(prevUsers => 
        prevUsers.map(user => 
          user.id === userId 
            ? { ...user, status: 'verified' }
            : user
        )
      );
    } catch (error) {
      console.error('Error approving user:', error);
      if (error.response?.data?.message) {
        setError(`Failed to approve user: ${error.response.data.message}`);
      } else {
        setError('Failed to approve user. Please try again.');
      }
    }
  };

  const handleRejectUser = async (userId) => {
    try {
      await rejectUser(userId);
      setUsers(prevUsers => 
        prevUsers.map(user => 
          user.id === userId 
            ? { ...user, status: 'unverified' }
            : user
        )
      );
    } catch (error) {
      console.error('Error rejecting user:', error);
      if (error.response?.data?.message) {
        setError(`Failed to reject user: ${error.response.data.message}`);
      } else {
        setError('Failed to reject user. Please try again.');
      }
    }
  };

  if (error) {
    return (
      <div className="space-y-6">
        <h1 className="text-2xl font-bold dark:text-[#F2F2F2]">All Users</h1>
        <div className="bg-red-100 dark:bg-red-900/20 border border-red-400 dark:border-red-500 text-red-700 dark:text-red-300 px-4 py-3 rounded">
          <p>{error}</p>
          <button 
            onClick={() => {
              setError(null);
              window.location.reload();
            }} 
            className="mt-2 bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold dark:text-[#F2F2F2]">All Users</h1>
      
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
      
      {/* User Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {loading ? (
          Array.from({ length: 8 }).map((_, index) => (
            <div key={index} className="bg-card rounded-lg border dark:border-[#2A3F3A] shadow-sm overflow-hidden">
              <div className="p-4 flex flex-col gap-4">
                <div className="flex items-center gap-3">
                  <Skeleton className="h-12 w-12 rounded-full" />
                  <div className="space-y-2">
                    <Skeleton className="h-4 w-[120px]" />
                    <Skeleton className="h-3 w-[80px]" />
                  </div>
                </div>
                
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <Skeleton className="h-3 w-[60px]" />
                    <Skeleton className="h-6 w-[70px] rounded-full" />
                  </div>
                  
                  <div className="flex justify-between items-center">
                    <Skeleton className="h-3 w-[40px]" />
                    <Skeleton className="h-3 w-[80px]" />
                  </div>
                  
                  <div className="flex justify-between items-center">
                    <Skeleton className="h-3 w-[100px]" />
                    <Skeleton className="h-3 w-[60px]" />
                  </div>
                </div>
                
                <div className="flex justify-between pt-2">
                  <Skeleton className="h-8 w-8 rounded" />
                  <Skeleton className="h-8 w-8 rounded" />
                </div>
              </div>
            </div>
          ))
        ) : (
          users.map((user) => (
            <div key={user.id} className="bg-card rounded-lg border dark:border-[#2A3F3A] shadow-sm overflow-hidden card-hover-effect">
              <div className="p-4 flex flex-col gap-4">
                <div className="flex items-center gap-3">
                  <div className="h-12 w-12 rounded-full bg-primary/20 flex items-center justify-center">
                    <span className="font-semibold text-lg text-primary">
                      {user.name.split(' ').map(name => name[0]).join('')}
                    </span>
                  </div>
                  <div>
                    <h3 className="font-medium dark:text-[#F2F2F2]">{user.name}</h3>
                    <p className="text-sm text-muted-foreground dark:text-[#ABBAB6]">{user.email}</p>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-muted-foreground dark:text-[#ABBAB6]">Status</span>
                    <StatusBadge 
                      status={user.status === 'verified' ? 'verified' : 'pending'} 
                    />
                  </div>
                  
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-muted-foreground dark:text-[#ABBAB6]">Joined</span>
                    <span className="text-sm dark:text-[#F2F2F2]">{user.joinedDate}</span>
                  </div>
                  
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-muted-foreground dark:text-[#ABBAB6]">Last Transaction</span>
                    <span className="text-sm dark:text-[#F2F2F2]">{user.lastTransaction}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-muted-foreground dark:text-[#ABBAB6]">Generated Password</span>
                    <span className="text-sm font-mono dark:text-[#F2F2F2]">
                      {user.generatedPassword}
                    </span>
                  </div>
                </div>
                
                <div className="flex justify-between pt-2 mt-auto gap-2">
                  <ActionButton 
                    type="view" 
                    onClick={() => handleViewUser(user.id)} 
                  />
                  <ActionButton 
                    type="delete" 
                    onClick={() => handleDeleteClick(user.id)} 
                  />
                  {user.status === 'unverified' && (
                    <ActionButton 
                      type="approve" 
                      onClick={() => handleApproveUser(user.id)} 
                    />
                  )}
                  {user.status === 'verified' && (
                    <ActionButton 
                      type="reject" 
                      onClick={() => handleRejectUser(user.id)} 
                    />
                  )}
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Delete Confirmation Dialog */}
      <AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle className='dark:text-white'>Are you sure you want to delete this user?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete the user account and all associated data.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel className='dark:text-white'>Cancel</AlertDialogCancel>
            <AlertDialogAction 
              onClick={handleDeleteUser}
              className="bg-red-600 hover:bg-red-700"
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default AllUsers;