'use client';

import React, { useState, useEffect } from 'react';
import {
  Wallet,
  DollarSign,
  TrendingUp,
  ArrowUp,
  ArrowDown,
  CreditCard,
  BarChart2,
  PieChart,
  Clock,
  ArrowRight
} from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Skeleton } from '@/components/ui/skeleton';
import api from '@/utils/axios';
import { formatError } from '@/utils/errorHandler';

const UserDashboard = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const [loading, setLoading] = useState(true);
  const [mainStats, setMainStats] = useState([]);
  const [overviewStats, setOverviewStats] = useState([]);
  const [financialActivities, setFinancialActivities] = useState([]);
  const [transactions, setTransactions] = useState([]);
  const [data, setData] = useState({});
  const router = useRouter();

  // useEffect(() => {
  //   setLoading(true);
  //   api.get('/dashboard/user')
  //     .then(res => {
  //       const data = res.data;
  //       setData(data);
  //       setMainStats([
  //         { title: 'Account Balance', value: `$${Number(data.accountBalance).toLocaleString(undefined, {minimumFractionDigits: 2})}`, icon: Wallet, trend: { value: '0%', isUp: true } },
  //         { title: 'Total Deposit', value: `$${Number(data.totalDeposit).toLocaleString(undefined, {minimumFractionDigits: 2})}`, icon: DollarSign, trend: { value: '0%', isUp: true } },
  //         { title: 'Total Withdrawals', value: `$${Number(data.totalWithdrawals).toLocaleString(undefined, {minimumFractionDigits: 2})}`, icon: ArrowDown, trend: { value: '0%', isUp: false } },
  //         { title: 'Profit/Loss', value: `${data.profitLoss >= 0 ? '+' : '-'}$${Math.abs(Number(data.profitLoss)).toLocaleString(undefined, {minimumFractionDigits: 2})}`, icon: TrendingUp, trend: { value: '0%', isUp: data.profitLoss >= 0 } },
  //         { title: 'Order Investment', value: `$${Number(data.orderInvestment).toLocaleString(undefined, {minimumFractionDigits: 2})}`, icon: CreditCard, trend: { value: '0%', isUp: true } },
  //       ]);
  //       setFinancialActivities([
  //         { title: 'Base Balance (Deposit - Withdraw)', value: `$${Number(data.accountBalance).toLocaleString(undefined, {minimumFractionDigits: 2})}` },
  //         { title: 'Profit/Loss', value: `${data.profitLoss >= 0 ? '+' : '-'}$${Math.abs(Number(data.profitLoss)).toLocaleString(undefined, {minimumFractionDigits: 2})}` },
  //         { title: 'Order Investment', value: `$${Number(data.orderInvestment).toLocaleString(undefined, {minimumFractionDigits: 2})}` },
  //       ]);
  //       setLoading(false);
  //     })
  //     .catch(() => setLoading(false));
  // }, [data,overviewStats, transactions    ]);
  
  useEffect(() => {
    let isMounted = true;
    setLoading(true);
    
    // Fetch dashboard data and transactions in parallel
    Promise.all([
      api.get('/dashboard/user'),
      api.get('/user/transaction-history?limit=5')
    ])
      .then(([dashboardRes, transactionsRes]) => {
        if (!isMounted) return;

        // Handle dashboard data
        const rawData = dashboardRes.data || {};

        // Normalize numeric values from backend (fallback to 0)
        const totalDeposit = Number(rawData.totalDeposit || 0);
        const totalWithdrawals = Number(rawData.totalWithdrawals || 0);
        const orderInvestment = Number(rawData.orderInvestment || 0); // amount currently in open trades
        const profitLoss = Number(rawData.profitLoss || 0); // realized P&L from closed trades

        // Base balance is simply deposits - withdrawals
        const baseBalance = totalDeposit - totalWithdrawals;

        /**
         * Trading-style account balance calculation (user side):
         * - When you OPEN a trade for X, that amount is locked as "order investment"
         *   and is no longer available in your free balance.
         * - When you CLOSE a trade with profit/loss P, that P is added to the balance
         *   and the invested amount is released.
         *
         * So at any time:
         *   availableAccountBalance = baseBalance - orderInvestment + profitLoss
         *
         * Example from user:
         *   Deposit = 1000, Withdrawals = 0, Open trade = 500, ProfitLoss = 0
         *   => baseBalance = 1000
         *   => accountBalance = 1000 - 500 + 0 = 500  (shows 500 while trade is open)
         *
         *   After closing trade with +300 profit, orderInvestment = 0, profitLoss = 300
         *   => accountBalance = 1000 - 0 + 300 = 1300
         */
        const accountBalance = baseBalance - orderInvestment + profitLoss;

        const data = {
          ...rawData,
          totalDeposit,
          totalWithdrawals,
          orderInvestment,
          profitLoss,
          baseBalance,
          accountBalance
        };

        setData(data);

        // Main cards on top
        setMainStats([
          {
            title: 'Account Balance',
            value: `$${Number(accountBalance).toLocaleString(undefined, { minimumFractionDigits: 2 })}`,
            icon: Wallet,
            trend: { value: '0%', isUp: accountBalance >= 0 }
          },
          {
            title: 'Total Deposit',
            value: `$${totalDeposit.toLocaleString(undefined, { minimumFractionDigits: 2 })}`,
            icon: DollarSign,
            trend: { value: '0%', isUp: true }
          },
          {
            title: 'Total Withdrawals',
            value: `$${totalWithdrawals.toLocaleString(undefined, { minimumFractionDigits: 2 })}`,
            icon: ArrowDown,
            trend: { value: '0%', isUp: false }
          },
          {
            title: 'Profit/Loss',
            value: `${profitLoss >= 0 ? '+' : '-'}$${Math.abs(profitLoss).toLocaleString(undefined, {
              minimumFractionDigits: 2
            })}`,
            icon: TrendingUp,
            trend: { value: '0%', isUp: profitLoss >= 0 }
          },
          {
            title: 'Order Investment',
            value: `$${orderInvestment.toLocaleString(undefined, { minimumFractionDigits: 2 })}`,
            icon: CreditCard,
            trend: { value: '0%', isUp: true }
          }
        ]);

        // Overview stats (below main cards)
        setOverviewStats([
          {
            title: 'Available Balance',
            value: `$${Number(accountBalance).toLocaleString(undefined, { minimumFractionDigits: 2 })}`,
            icon: Wallet
          },
          {
            title: 'Open Trades (Investment)',
            value: `$${orderInvestment.toLocaleString(undefined, { minimumFractionDigits: 2 })}`,
            icon: BarChart2
          },
          {
            title: 'Base Balance (Deposits - Withdrawals)',
            value: `$${Number(baseBalance).toLocaleString(undefined, { minimumFractionDigits: 2 })}`,
            icon: PieChart
          }
        ]);

        // Financial activities section
        setFinancialActivities([
          {
            title: 'Base Balance (Deposits - Withdrawals)',
            value: `$${Number(baseBalance).toLocaleString(undefined, { minimumFractionDigits: 2 })}`
          },
          {
            title: 'Open Order Investment',
            value: `$${orderInvestment.toLocaleString(undefined, { minimumFractionDigits: 2 })}`
          },
          {
            title: 'Realized Profit/Loss',
            value: `${profitLoss >= 0 ? '+' : '-'}$${Math.abs(profitLoss).toLocaleString(undefined, {
              minimumFractionDigits: 2
            })}`
          },
          {
            title: 'Current Account Balance',
            value: `$${Number(accountBalance).toLocaleString(undefined, { minimumFractionDigits: 2 })}`
          }
        ]);
        
        // Handle transactions data
        if (transactionsRes.data?.data?.transactions) {
          setTransactions(transactionsRes.data.data.transactions);
        }
      })
      .catch(err => {
        if (!isMounted) return;
        console.error('Error fetching dashboard data:', err);
        // Set empty transactions on error to prevent undefined errors
        setTransactions([]);
        // Log rate limit errors specifically
        if (err.response?.status === 429) {
          console.warn(formatError(err, 'loading dashboard data'));
        }
      })
      .finally(() => {
        if (isMounted) {
          setLoading(false);
        }
      });
    
    // Cleanup function to prevent state updates if component unmounts
    return () => {
      isMounted = false;
    };
  }, []);

  // Status badge component
  const StatusBadge = ({ status }) => {
    const statusColors = {
      pending: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-400',
      completed: 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400',
      failed: 'bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400'
    };
    
    return (
      <span className={`px-2 py-1 rounded-full text-xs font-medium ${statusColors[status] || 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300'}`}>
        {status}
      </span>
    );
  };

  // Handle deposit button click
  const handleDeposit = () => {
    router.push('/dashboard/deposit-money');
  };

  // Handle withdraw button click
  const handleWithdraw = () => {
    router.push('/dashboard/withdraw-money');
  };

  return (
    <div className="space-y-6 p-4">
      {/* Header with buttons */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <h1 className="text-2xl font-bold dark:text-[#F2F2F2]">Dashboard</h1>
        <div className="flex gap-2 sm:gap-4 w-full sm:w-auto">
          <button 
            onClick={handleDeposit}
            className="px-3 py-2 sm:px-4 sm:py-2 bg-green-600/20 text-green-400 border border-green-500/30 rounded-lg flex items-center gap-2 text-sm sm:text-base w-1/2 sm:w-auto justify-center"
          >
            <ArrowUp className="w-4 h-4" />
            Deposit
          </button>
          <button 
            onClick={handleWithdraw}
            className="px-3 py-2 sm:px-4 sm:py-2 bg-red-600/20 text-red-400 border border-red-500/30 rounded-lg flex items-center gap-2 text-sm sm:text-base w-1/2 sm:w-auto justify-center"
          >
            <ArrowDown className="w-4 h-4" />
            Withdraw
          </button>
        </div>
      </div>

      {/* Main stats cards - Skeleton Loading */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3 sm:gap-4">
        {loading ? (
          Array.from({ length: 5 }).map((_, index) => (
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

      {/* Tabs for Overview and Transaction */}
      <div className="border-b dark:border-[#2A3F3A]">
        <nav className="-mb-px flex space-x-8">
          <button 
            onClick={() => setActiveTab('overview')}
            className={`border-b-2 py-4 px-1 text-sm font-medium ${activeTab === 'overview' ? 'border-blue-500 dark:text-[#F2F2F2]' : 'border-transparent dark:text-[#ABBAB6]'}`}
          >
            Overview
          </button>
          <button 
            onClick={() => setActiveTab('transactions')}
            className={`border-b-2 py-4 px-1 text-sm font-medium ${activeTab === 'transactions' ? 'border-blue-500 dark:text-[#F2F2F2]' : 'border-transparent dark:text-[#ABBAB6]'}`}
          >
            Transaction History
          </button>
        </nav>
      </div>

      {/* Overview Content - Skeleton Loading */}
      {activeTab === 'overview' && (
        <div className="space-y-6">
          {/* Overview stats */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
            {loading ? (
              Array.from({ length: 3 }).map((_, index) => (
                <div key={index} className="dark:bg-[#142924] rounded-lg dark:border-[#2A3F3A] border shadow-sm p-3 sm:p-4">
                  <div className="flex justify-between items-start">
                    <div className="w-full">
                      <Skeleton className="h-4 w-3/4 mb-2" />
                      <Skeleton className="h-6 w-full mt-1" />
                    </div>
                    <Skeleton className="w-5 h-5 rounded-full" />
                  </div>
                </div>
              ))
            ) : (
              overviewStats.map((stat) => (
                <div key={stat.title} className="dark:bg-[#142924] rounded-lg dark:border-[#2A3F3A] border shadow-sm p-3 sm:p-4">
                  <div className="flex justify-between items-start">
                    <div>
                      <p className="text-xs sm:text-sm text-gray-500 dark:text-[#ABBAB6]">{stat.title}</p>
                      <p className="text-lg sm:text-xl font-bold mt-1 dark:text-[#F2F2F2]">{stat.value}</p>
                    </div>
                    <div className="p-1 sm:p-2 rounded-full">
                      <stat.icon className="w-4 h-4 sm:w-5 sm:h-5 text-gray-600 dark:text-[#ABBAB6]" />
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Deposit/Withdraw meter */}
          <div className="dark:bg-[#142924] rounded-lg dark:border-[#2A3F3A] border shadow-sm p-4 sm:p-6">
            <h2 className="text-lg font-semibold dark:text-[#F2F2F2] mb-4">
            Deposit & Withdraw Overview
            </h2>
            {loading ? (
              <div className="space-y-4">
                <div>
                  <Skeleton className="h-4 w-1/4 mb-2" />
                  <Skeleton className="h-2.5 w-full rounded-full" />
                </div>
                <div>
                  <Skeleton className="h-4 w-1/4 mb-2" />
                  <Skeleton className="h-2.5 w-full rounded-full" />
                </div>
              </div>
            ) : (
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between mb-1">
                    <span className="text-sm font-medium text-gray-500 dark:text-[#ABBAB6]">Deposits</span>
                    <span className="text-sm font-medium dark:text-[#F2F2F2]">${Number(data.totalDeposit).toLocaleString(undefined, {minimumFractionDigits: 2})}</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2.5 dark:bg-gray-700">
                    <div className="bg-green-600 h-2.5 rounded-full" style={{ width: `${Number(data.totalDeposit).toLocaleString(undefined, {minimumFractionDigits: 2})}` }}></div>
                  </div>
                </div>
                <div>
                  <div className="flex justify-between mb-1">
                    <span className="text-sm font-medium text-gray-500 dark:text-[#ABBAB6]">Withdrawals</span>
                    <span className="text-sm font-medium dark:text-[#F2F2F2]">${Number(data.totalWithdrawals).toLocaleString(undefined, {minimumFractionDigits: 2})}</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2.5 dark:bg-gray-700">
                    <div className="bg-red-600 h-2.5 rounded-full" style={{ width: `${Number(data.totalWithdrawals).toLocaleString(undefined, {minimumFractionDigits: 2})}` }}></div>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Financial activities */}
          <div className="dark:bg-[#142924] rounded-lg dark:border-[#2A3F3A] border shadow-sm">
            <div className="p-4 sm:p-6 border-b dark:border-[#2A3F3A]">
              <h2 className="text-lg font-semibold dark:text-[#F2F2F2]">
              Financial Activities
              </h2>
            </div>
            <div className="p-3 sm:p-4">
              {loading ? (
                Array.from({ length: 4 }).map((_, index) => (
                  <div key={index} className={`flex justify-between items-center py-3 ${index !== 3 ? 'border-b dark:border-[#2A3F3A]' : ''}`}>
                    <Skeleton className="h-4 w-1/2" />
                    <Skeleton className="h-4 w-1/4" />
                  </div>
                ))
              ) : (
                financialActivities.map((activity, index) => (
                  <div key={index} className={`flex justify-between items-center py-3 ${index !== financialActivities.length - 1 ? 'border-b dark:border-[#2A3F3A]' : ''}`}>
                    <p className="text-xs sm:text-sm text-gray-500 dark:text-[#ABBAB6]">{activity.title}</p>
                    <p className="text-xs sm:text-sm font-medium dark:text-[#F2F2F2]">{activity.value}</p>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      )}

      {/* Transaction History Content - Skeleton Loading */}
      {activeTab === 'transactions' && (
        <div className="dark:bg-[#142924] rounded-lg border dark:border-[#2A3F3A] shadow-sm">
          <div className="p-4 sm:p-6 flex justify-between items-center border-b dark:border-[#2A3F3A]">
            <h2 className="text-lg font-semibold dark:text-[#F2F2F2]">
              {loading ? <Skeleton className="h-6 w-1/3" /> : 'Transaction History'}
            </h2>
            {!loading && (
              <Link href="/dashboard/transactions" className="text-sm text-blue-600 flex items-center gap-1 hover:underline">
                View All <ArrowRight size={16} />
              </Link>
            )}
          </div>
          <div className="p-3 sm:p-4 overflow-x-auto">
            {loading ? (
              <div className="space-y-4">
                <div className="flex gap-4">
                  <Skeleton className="h-4 w-1/4" />
                  <Skeleton className="h-4 w-1/4" />
                  <Skeleton className="h-4 w-1/4" />
                  <Skeleton className="h-4 w-1/4" />
                </div>
                {Array.from({ length: 4 }).map((_, index) => (
                  <div key={index} className="flex gap-4 items-center py-3">
                    <Skeleton className="h-4 w-1/4" />
                    <Skeleton className="h-4 w-1/4" />
                    <Skeleton className="h-4 w-1/4" />
                    <Skeleton className="h-4 w-1/4" />
                  </div>
                ))}
              </div>
            ) : (
              <table className="w-full">
                <thead>
                  <tr className="border-b dark:border-[#2A3F3A]">
                    <th className="px-3 py-2 text-left font-medium text-gray-500 dark:text-[#ABBAB6] text-xs sm:text-sm">Date</th>
                    <th className="px-3 py-2 text-left font-medium text-gray-500 dark:text-[#ABBAB6] text-xs sm:text-sm">Type</th>
                    <th className="px-3 py-2 text-left font-medium text-gray-500 dark:text-[#ABBAB6] text-xs sm:text-sm">Amount</th>
                    <th className="px-3 py-2 text-left font-medium text-gray-500 dark:text-[#ABBAB6] text-xs sm:text-sm">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {transactions.map((transaction) => (
                    <tr key={transaction.id} className="border-b dark:border-[#2A3F3A] hover:bg-muted/50">
                      <td className="px-3 py-3 text-xs sm:text-sm dark:text-[#F2F2F2]">{transaction.date}</td>
                      <td className="px-3 py-3 text-xs sm:text-sm dark:text-[#F2F2F2]">{transaction.type}</td>
                      <td className={`px-3 py-3 text-xs sm:text-sm font-medium ${transaction.type === 'Deposit' ? 'text-green-500' : 'text-red-500'}`}>
                        {transaction.amount}
                      </td>
                      <td className="px-3 py-3 text-xs sm:text-sm">
                        <StatusBadge status={transaction.status} />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default UserDashboard;
