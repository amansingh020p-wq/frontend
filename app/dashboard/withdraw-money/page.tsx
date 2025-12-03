'use client';

import React, { useState, useEffect } from 'react';
import { Wallet, TrendingUp, CheckCircle, ArrowLeft } from 'lucide-react';
import StatCard from '../../../components/ui/StatCard';
import StatusBadge, { StatusType } from '../../../components/ui/StatusBadge';
import { Skeleton } from '@/components/ui/skeleton';
import api from '@/utils/axios';

interface WithdrawalData {
  accountBalance: number;
  totalWithdrawals: number;
  orderInvestment: number;
  totalDeposit?: number;
  profitLoss?: number;
}

interface Withdrawal {
  transactionId: string;
  timestamp: string;
  amount: number;
  paymentMethod: string;
  status: string;
}

interface FormattedWithdrawal {
  id: string;
  date: string;
  amount: string;
  bank: string;
  status: string;
}

interface StatItem {
  title: string;
  value: string;
  icon: React.ComponentType<any>;
}

const WithdrawPage: React.FC = () => {
  const [mounted, setMounted] = useState(false);
  const [loading, setLoading] = useState(true);
  const [amount, setAmount] = useState('');
  const [withdrawalRequested, setWithdrawalRequested] = useState(false);
  const [activeTab, setActiveTab] = useState('withdraw');
  const [stats, setStats] = useState<StatItem[]>([]);
  const [withdrawals, setWithdrawals] = useState<FormattedWithdrawal[]>([]);
  const [withdrawalDetails, setWithdrawalDetails] = useState<WithdrawalData>({
    accountBalance: 0,
    totalWithdrawals: 0,
    orderInvestment: 0
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted) return;

    const calculateStatsFromTransactions = async (): Promise<WithdrawalData> => {
      try {
        console.log('📊 Calculating stats from transactions...');
        
        // Get all deposits
        const depositsRes = await api.get('/user/deposit-history');
        const deposits = depositsRes.data.data.deposits || [];
        
        // Get all withdrawals
        const withdrawalsRes = await api.get('/user/withdraw-history');
        const withdrawals = withdrawalsRes.data.data.withdrawals || [];
        
        // Calculate totals
        const totalDeposit = deposits
          .filter((d: any) => d.status.toLowerCase() === 'completed')
          .reduce((sum: number, d: any) => sum + Number(d.amount || 0), 0);
        
        const totalWithdrawals = withdrawals
          .filter((w: any) => w.status.toLowerCase() === 'completed')
          .reduce((sum: number, w: any) => sum + Number(w.amount || 0), 0);
        
        const accountBalance = totalDeposit - totalWithdrawals;
        
        console.log('💰 Calculated from transactions:', {
          totalDeposit,
          totalWithdrawals,
          accountBalance
        });
        
        return {
          accountBalance,
          totalWithdrawals,
          totalDeposit,
          orderInvestment: 0, // This might need separate calculation based on your business logic
          profitLoss: 0 // This might need separate calculation based on your business logic
        };
      } catch (error) {
        console.error('❌ Failed to calculate from transactions:', error);
        throw error;
      }
    };

    const fetchWithdrawalData = async (): Promise<void> => {
      let details: WithdrawalData | null = null;
      
      try {
        console.log('🔍 Fetching withdrawal details from primary endpoint...');
        const detailsRes = await api.get('/user/withdraw-details');
        console.log('📋 Raw API Response:', detailsRes);
        console.log('📊 Response Data:', detailsRes.data);
        
        details = detailsRes.data.data;
        console.log('💰 Extracted Details:', details);
        
      } catch (error: any) {
        console.error('❌ Primary endpoint failed:', error);
        console.error('❌ Error Response:', error.response?.data);
        console.error('❌ Error Status:', error.response?.status);
        
        try {
          console.log('🔄 Trying alternative: calculating from transactions...');
          details = await calculateStatsFromTransactions();
        } catch (fallbackError) {
          console.error('❌ Fallback calculation also failed:', fallbackError);
          
          // Try dashboard endpoint as last resort
          try {
            console.log('🔄 Trying dashboard endpoint as last resort...');
            const dashboardRes = await api.get('/dashboard/user');
            const dashboardData = dashboardRes.data;
            
            details = {
              accountBalance: dashboardData.accountBalance || 0,
              totalWithdrawals: dashboardData.totalWithdrawals || 0,
              orderInvestment: dashboardData.orderInvestment || 0,
              totalDeposit: dashboardData.totalDeposit || 0,
              profitLoss: dashboardData.profitLoss || 0
            };
            console.log('💰 Got data from dashboard:', details);
          } catch (dashboardError) {
            console.error('❌ Dashboard endpoint also failed:', dashboardError);
            // Set truly empty state - let user know there's no data
            details = {
              accountBalance: 0,
              totalWithdrawals: 0,
              orderInvestment: 0
            };
          }
        }
      }
      
      if (details) {
        setWithdrawalDetails(details);

        // Set stats based on withdrawal details
        const newStats: StatItem[] = [
          { 
            title: 'Account Balance', 
            value: `$${Number(details.accountBalance || 0).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`, 
            icon: Wallet 
          },
          { 
            title: 'Available for Withdrawal', 
            value: `$${Number(details.accountBalance || 0).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`, 
            icon: TrendingUp 
          },
          { 
            title: 'Total Withdrawals', 
            value: `$${Number(details.totalWithdrawals || 0).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`, 
            icon: CheckCircle 
          },
          { 
            title: 'Total Deposits', 
            value: `$${Number(details.totalDeposit || 0).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`, 
            icon: TrendingUp 
          },
        ];
        
        console.log('📈 Generated Stats:', newStats);
        setStats(newStats);
      }
    };

    const fetchWithdrawalHistory = async (): Promise<void> => {
      try {
        console.log('📜 Fetching withdrawal history...');
        const historyRes = await api.get('/user/withdraw-history?limit=10');
        console.log('📜 Withdrawal History Response:', historyRes.data);
        
        const { withdrawals: withdrawalData }: { withdrawals: Withdrawal[] } = historyRes.data.data;
        console.log('📜 Withdrawal Data:', withdrawalData);

        // Format withdrawals to match the expected structure
        const formattedWithdrawals: FormattedWithdrawal[] = withdrawalData.map((withdrawal) => ({
          id: withdrawal.transactionId,
          date: new Date(withdrawal.timestamp).toLocaleDateString('en-GB', {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric'
          }),
          amount: `$${Number(withdrawal.amount).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`,
          bank: withdrawal.paymentMethod === 'UPI' ? 'UPI Transfer' : 'Bank Transfer',
          status: withdrawal.status.toLowerCase()
        }));

        console.log('📜 Formatted Withdrawals:', formattedWithdrawals);
        setWithdrawals(formattedWithdrawals);
      } catch (error: any) {
        console.error('❌ Failed to fetch withdrawal history:', error);
        console.error('❌ Error Response:', error.response?.data);
        setWithdrawals([]);
      }
    };

    // Fetch both withdrawal details and history
    const fetchAllData = async (): Promise<void> => {
      setLoading(true);
      await Promise.all([
        fetchWithdrawalData(),
        fetchWithdrawalHistory()
      ]);
      setLoading(false);
    };

    fetchAllData();
  }, [mounted]);

  const handleWithdraw = async (e: React.FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault();
    
    if (!amount || parseFloat(amount) < 100) {
      alert('Please enter a valid amount (minimum $100)');
      return;
    }

    if (parseFloat(amount) > (withdrawalDetails.accountBalance || 0)) {
      alert('Insufficient balance for withdrawal');
      return;
    }

    setIsSubmitting(true);
    
    try {
      const response = await api.post('/user/withdraw', {
        amount: parseFloat(amount),
        paymentMethod: 'BANK',
      });

      console.log('✅ Withdrawal response:', response.data);
      setWithdrawalRequested(true);
      
      // Refresh the data after successful withdrawal
      setTimeout(() => {
        // Instead of reloading, refetch the data
        window.location.reload();
      }, 2000);

    } catch (error: any) {
      console.error('❌ Withdrawal failed:', error);
      alert(error.response?.data?.message || 'Withdrawal failed. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleNewWithdrawal = (): void => {
    setWithdrawalRequested(false);
    setAmount('');
  };

  const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setAmount(e.target.value);
  };

  // Don't render anything until mounted to avoid hydration mismatch
  if (!mounted) {
    return null;
  }

  // Show a message if no data is available
  const hasData = stats.some(stat => stat.value !== '$0.00');

  return (
    <div className="space-y-6 p-4 sm:p-6">
      <h1 className="text-xl sm:text-2xl font-bold dark:text-[#F2F2F2]">Withdraw Funds</h1>
      
      {/* Show message if no data */}
      {!loading && !hasData && (
        <div className="bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg p-4">
          <div className="flex">
            <div className="ml-3">
              <h3 className="text-sm font-medium text-yellow-800 dark:text-yellow-200">
                No transaction data found
              </h3>
              <p className="mt-2 text-sm text-yellow-700 dark:text-yellow-300">
                It looks like you haven't made any deposits yet. Make a deposit first to see your account balance and enable withdrawals.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Responsive Stats Cards */}
      <div className="grid grid-cols-2 gap-3 sm:gap-4 md:grid-cols-4">
        {loading ? (
          Array.from({ length: 4 }).map((_, index) => (
            <div key={index} className="bg-card rounded-lg border dark:border-[#2A3F3A] shadow-sm p-4">
              <div className="flex items-center space-x-4">
                <Skeleton className="h-10 w-10 rounded-full" />
                <div className="space-y-2">
                  <Skeleton className="h-4 w-[80px]" />
                  <Skeleton className="h-6 w-[60px]" />
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
              className="text-xs sm:text-sm"
              valueClassName="text-base sm:text-lg"
            />
          ))
        )}
      </div>

      {/* Withdrawal Form */}
      <div className="bg-card rounded-lg border dark:border-[#2A3F3A] shadow-sm">
        <div className="p-4 sm:p-6 border-b dark:border-[#2A3F3A]">
          <h2 className="text-lg sm:text-xl font-semibold dark:text-[#F2F2F2]">Withdraw Money</h2>
          <p className="text-xs sm:text-sm text-muted-foreground mt-1 dark:text-[#ABBAB6]">
            Transfer funds to your registered bank account
          </p>
        </div>

        <div className="p-4 sm:p-6">
          {!withdrawalRequested ? (
            loading ? (
              <div className="space-y-4 max-w-md">
                <div>
                  <Skeleton className="h-4 w-[120px] mb-1" />
                  <Skeleton className="w-full h-8 rounded-md" />
                  <Skeleton className="h-3 w-[160px] mt-1" />
                </div>
                <Skeleton className="h-9 w-[140px] rounded-md" />
              </div>
            ) : (
              <form onSubmit={handleWithdraw} className="space-y-4 max-w-md">
                <div>
                  <label htmlFor="amount" className="block text-xs sm:text-sm font-medium mb-1 dark:text-[#F2F2F2]">
                    Withdrawal Amount ($)
                  </label>
                  <input
                    type="number"
                    id="amount"
                    value={amount}
                    onChange={handleAmountChange}
                    className="w-full px-3 py-2 text-sm rounded-md border dark:border-[#2A3F3A] bg-background dark:bg-[#142924] dark:text-[#F2F2F2] focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Enter amount"
                    required
                    min="100"
                    max={withdrawalDetails.accountBalance || 0}
                    disabled={isSubmitting || (withdrawalDetails.accountBalance || 0) < 100}
                    step="0.01"
                  />
                  <p className="mt-1 text-xs text-muted-foreground dark:text-[#ABBAB6]">
                    Minimum withdrawal: $100 | Available: ${Number(withdrawalDetails.accountBalance || 0).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                  </p>
                </div>

                <div className="pt-2">
                  <button
                    type="submit"
                    disabled={
                      isSubmitting || 
                      !amount || 
                      parseFloat(amount) < 100 || 
                      parseFloat(amount) > (withdrawalDetails.accountBalance || 0) ||
                      (withdrawalDetails.accountBalance || 0) < 100
                    }
                    className="px-4 py-2 text-sm sm:text-base bg-primary text-primary-foreground rounded-md hover:bg-primary/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isSubmitting ? 'Processing...' : 
                     (withdrawalDetails.accountBalance || 0) < 100 ? 'Insufficient Balance' : 
                     'Confirm Withdraw'}
                  </button>
                </div>
              </form>
            )
          ) : (
            <div className="text-center space-y-4 max-w-md mx-auto">
              <CheckCircle className="w-10 h-10 sm:w-12 sm:h-12 mx-auto text-green-500" />
              <h3 className="text-lg sm:text-xl font-semibold dark:text-[#F2F2F2]">Withdrawal Requested</h3>
              <p className="text-xs sm:text-sm text-muted-foreground dark:text-[#ABBAB6]">
                ${amount} will be transferred to your registered bank account after verification.
              </p>
              <button
                onClick={handleNewWithdrawal}
                className="mt-4 px-4 py-2 text-sm sm:text-base bg-primary text-primary-foreground rounded-md hover:bg-primary/90 transition-colors"
              >
                Make Another Withdrawal
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Withdrawal History Table */}
      <div className="bg-card rounded-lg border dark:border-[#2A3F3A] shadow-sm overflow-hidden">
        <div className="p-4 sm:p-6 border-b dark:border-[#2A3F3A]">
          <h2 className="text-lg sm:text-xl font-semibold dark:text-[#F2F2F2]">Recent Withdrawals</h2>
          <p className="text-xs sm:text-sm text-muted-foreground mt-1 dark:text-[#ABBAB6]">
            Your withdrawal history
          </p>
        </div>
        <div className="p-2 sm:p-4 overflow-x-auto">
          <table className="w-full min-w-[600px]">
            <thead>
              <tr className="border-b dark:border-[#2A3F3A]">
                <th className="px-3 py-2 text-left text-xs sm:text-sm font-medium text-muted-foreground dark:text-[#ABBAB6]">Date</th>
                <th className="px-3 py-2 text-left text-xs sm:text-sm font-medium text-muted-foreground dark:text-[#ABBAB6]">Amount</th>
                <th className="px-3 py-2 text-left text-xs sm:text-sm font-medium text-muted-foreground dark:text-[#ABBAB6]">Method</th>
                <th className="px-3 py-2 text-left text-xs sm:text-sm font-medium text-muted-foreground dark:text-[#ABBAB6]">Status</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                Array.from({ length: 5 }).map((_, index) => (
                  <tr key={`loading-${index}`} className="border-b dark:border-[#2A3F3A]">
                    <td className="px-3 py-2"><Skeleton className="h-4 w-[80px]" /></td>
                    <td className="px-3 py-2"><Skeleton className="h-4 w-[70px]" /></td>
                    <td className="px-3 py-2"><Skeleton className="h-4 w-[100px]" /></td>
                    <td className="px-3 py-2"><Skeleton className="h-6 w-[70px] rounded-full" /></td>
                  </tr>
                ))
              ) : withdrawals.length === 0 ? (
                <tr>
                  <td colSpan={4} className="px-3 py-6 text-center text-gray-500 dark:text-[#ABBAB6]">
                    No withdrawal history found
                  </td>
                </tr>
              ) : (
                withdrawals.map((withdrawal) => (
                  <tr key={withdrawal.id} className="border-b dark:border-[#2A3F3A] hover:bg-muted/50">
                    <td className="px-3 py-2 text-xs sm:text-sm dark:text-[#F2F2F2]">{withdrawal.date}</td>
                    <td className="px-3 py-2 text-xs sm:text-sm font-medium text-red-500">{withdrawal.amount}</td>
                    <td className="px-3 py-2 text-xs sm:text-sm dark:text-[#F2F2F2]">{withdrawal.bank}</td>
                    <td className="px-3 py-2">
                      <StatusBadge 
                        status={withdrawal.status as StatusType}
                        className="text-xs sm:text-sm"
                      />
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default WithdrawPage;