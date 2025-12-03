'use client';

import React, { useEffect, useState } from 'react';
import { ArrowDownCircle, ArrowUpCircle, TrendingUp } from 'lucide-react';
import StatCard from '../../../components/ui/StatCard';
import StatusBadge from '../../../components/ui/StatusBadge';
import { Skeleton } from '@/components/ui/skeleton';
import fetch from "@/utils/axios";
import { formatError, isRateLimit } from "@/utils/errorHandler";


const TransactionsPage = () => {
  const [loading, setLoading] = useState(true);
  const [transactions, setTransactions] = useState([]);
  const [stats, setStats] = useState([]);

  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        const res = await fetch.get('/user/transaction-history');
        console.log('Response:', res);
        if (res.status === 200) {
          const transactions = res.data?.data?.transactions || [];

          console.log('Fetched Transactions:', transactions);

          // Calculate stats
          let depositTotal = 0;
          let withdrawTotal = 0;

          transactions.forEach(tx => {
            const amt = parseFloat(String(tx.amount).replace(/[^0-9.-]+/g, ""));
            if (tx.type === 'deposit') depositTotal += amt;
            else if (tx.type === 'withdraw') withdrawTotal += amt;
          });

          const net = depositTotal - withdrawTotal;

          setStats([
            { title: 'Total Deposit', value: `$${depositTotal.toLocaleString()}`, icon: ArrowDownCircle, trend: 'up' },
            { title: 'Total Withdraw', value: `$${withdrawTotal.toLocaleString()}`, icon: ArrowUpCircle, trend: 'down' },
            { title: 'Net Cash Flow', value: `$${net.toLocaleString()}`, icon: TrendingUp, trend: net >= 0 ? 'up' : 'down' },
          ]);

          setTransactions(transactions);
        }
      } catch (err) {
        console.error('Failed to fetch transactions', err);
        if (isRateLimit(err)) {
          console.warn(formatError(err, 'fetching transactions'));
        }
      } finally {
        setLoading(false);
      }
    };

    fetchTransactions();
  }, []);

  return (
    <div className="space-y-6 p-4 sm:p-6">
      <h1 className="text-2xl font-bold dark:text-[#F2F2F2]">Transactions</h1>

      {/* Responsive Stat Cards */}
      <div className="grid grid-cols-2 gap-3 sm:gap-4 md:grid-cols-3">
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
        stats.map((stats) => (
          <StatCard 
            key={stats.title}
            title={stats.title}
            value={stats.value}
            icon={stats.icon}
            className="text-xs sm:text-sm" // Smaller text on mobile
          />
        ))
        )}
      </div>

      {/* Transaction History Table */}
      <div className="bg-card rounded-lg border dark:border-[#2A3F3A] shadow-sm overflow-hidden">
        <div className="p-4 sm:p-6 border-b dark:border-[#2A3F3A]">
          <h2 className="text-lg sm:text-xl font-semibold dark:text-[#F2F2F2]">Transaction History</h2>
        </div>
        <div className="p-2 sm:p-4 overflow-x-auto">
          <table className="w-full min-w-[600px]">
            <thead>
              <tr className="border-b dark:border-[#2A3F3A]">
                <th className="px-3 py-2 text-left text-xs sm:text-sm font-medium text-muted-foreground">Date</th>
                <th className="px-3 py-2 text-left text-xs sm:text-sm font-medium text-muted-foreground">Type</th>
                <th className="px-3 py-2 text-left text-xs sm:text-sm font-medium text-muted-foreground">Amount</th>
                <th className="px-3 py-2 text-left text-xs sm:text-sm font-medium text-muted-foreground">Status</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                // Skeleton loading with responsive sizing
                Array.from({ length: 5 }).map((_, index) => (
                  <tr key={index} className="border-b dark:border-[#2A3F3A]">
                    <td className="px-3 py-2">
                      <div className="h-3 sm:h-4 bg-muted rounded w-3/4 animate-pulse"></div>
                    </td>
                    <td className="px-3 py-2">
                      <div className="h-3 sm:h-4 bg-muted rounded w-1/2 animate-pulse"></div>
                    </td>
                    <td className="px-3 py-2">
                      <div className="h-3 sm:h-4 bg-muted rounded w-1/2 animate-pulse"></div>
                    </td>
                    <td className="px-3 py-2">
                      <div className="h-3 sm:h-4 bg-muted rounded w-1/2 animate-pulse"></div>
                    </td>
                  </tr>
                ))
              ) : (
                transactions.map((transaction) => (
                  <tr key={transaction.id} className="border-b dark:border-[#2A3F3A] hover:bg-muted/50">
                    <td className="px-3 py-2 text-xs sm:text-sm dark:text-[#F2F2F2]">{transaction.date}</td>
                    <td className="px-3 py-2">
                      <StatusBadge 
                        status={transaction.type} 
                        variant={transaction.type === 'deposit' ? 'success' : 'destructive'}
                        className="text-xs sm:text-sm"
                      />
                    </td>
                    <td className="px-3 py-2 text-xs sm:text-sm dark:text-[#F2F2F2]">{transaction.amount}</td>
                    <td className="px-3 py-2">
                      <StatusBadge 
                        status={transaction.status} 
                        variant={transaction.status === 'completed' ? 'success' : 'warning'}
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

export default TransactionsPage;