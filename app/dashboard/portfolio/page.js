'use client';

import React, { useEffect, useState } from 'react';
import { TrendingUp, TrendingDown, BarChart2 } from 'lucide-react';
import api from '@/utils/axios';
import { getAmountInUSD } from '@/utils/currency';
import { Skeleton } from '@/components/ui/skeleton';

const BROKERAGE_FEE_USD = 1; // flat fee per closed profitable trade
const BROKERAGE_FEE_INR = 90; // must match backend logic

const PortfolioPage = () => {
  const [loading, setLoading] = useState(true);
  const [trades, setTrades] = useState([]);
  const [dateLabel, setDateLabel] = useState('');

  useEffect(() => {
    const fetchPortfolio = async () => {
      setLoading(true);
      try {
        // Use order-history endpoint (only this user's trades)
        const res = await api.get('/user/order-history');
        const apiData = res.data?.data || {};
        const allTrades = apiData.trades || [];

        // Filter trades for "today" (based on tradeDate / createdAt)
        const today = new Date();
        const isSameDay = (d) => {
          const dt = new Date(d);
          return (
            dt.getFullYear() === today.getFullYear() &&
            dt.getMonth() === today.getMonth() &&
            dt.getDate() === today.getDate()
          );
        };

        const todayTrades = allTrades.filter((t) => {
          const baseDate = t.tradeDate || t.createdAt;
          return baseDate && isSameDay(baseDate);
        });

        // Map to UI format and compute USD amounts
        const mapped = todayTrades.map((trade) => {
          const qty = Number(trade.quantity || 0);
          const plInr = Number(trade.profitLoss || 0);

          const plUsd = getAmountInUSD(plInr);

          // Backend already deducts 90 INR brokerage on profitable exits; show $1 explicitly
          const wasProfitable = plInr > 0;

          return {
            id: trade._id || trade.id,
            symbol: trade.symbol || 'TRADE',
            qty,
            avgPrice: getAmountInUSD(trade.buyPrice || 0),
            plUsd,
            rawPlInr: plInr,
            feeUsd: wasProfitable ? BROKERAGE_FEE_USD : 0,
            side: (trade.type || '').toUpperCase(),
            status: (trade.status || '').toUpperCase(),
          };
        });

        setTrades(mapped);
        setDateLabel(
          today.toLocaleDateString('en-GB', {
            day: '2-digit',
            month: 'short',
            year: 'numeric',
          })
        );
      } catch (err) {
        console.error('Failed to load portfolio:', err);
        setTrades([]);
      } finally {
        setLoading(false);
      }
    };

    fetchPortfolio();
  }, []);

  // Aggregate daily P/L (after brokerage)
  const totalPlUsd = trades.reduce((sum, t) => sum + Number(t.plUsd || 0), 0);
  const isOverallProfit = totalPlUsd >= 0;

  return (
    <div className="space-y-6 p-4 sm:p-6">
      <div className="flex items-center justify-between">
        <h1 className="text-xl sm:text-2xl font-bold dark:text-[#F2F2F2]">Portfolio</h1>
        {dateLabel && (
          <span className="text-xs sm:text-sm text-muted-foreground dark:text-[#ABBAB6]">
            {dateLabel}
          </span>
        )}
      </div>

      {/* Overall P/L card (like screenshot) */}
      <div className="rounded-xl border dark:border-[#2A3F3A] bg-card shadow-sm p-4 sm:p-5">
        {loading ? (
          <div className="space-y-2">
            <Skeleton className="h-4 w-24" />
            <Skeleton className="h-8 w-40" />
          </div>
        ) : (
          <>
            <p className="text-xs sm:text-sm text-muted-foreground dark:text-[#ABBAB6]">
              Total P&amp;L (Today)
            </p>
            <div className="mt-2 flex items-center gap-2">
              {isOverallProfit ? (
                <TrendingUp className="w-5 h-5 text-green-500" />
              ) : (
                <TrendingDown className="w-5 h-5 text-red-500" />
              )}
              <span
                className={`text-2xl sm:text-3xl font-semibold ${
                  isOverallProfit ? 'text-green-500' : 'text-red-500'
                }`}
              >
                {isOverallProfit ? '+' : '-'}$
                {Math.abs(totalPlUsd).toLocaleString('en-US', {
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2,
                })}
              </span>
            </div>
          </>
        )}
      </div>

      {/* Positions / trades list */}
      <div className="rounded-xl border dark:border-[#2A3F3A] bg-card shadow-sm">
        <div className="flex items-center justify-between px-4 py-3 border-b dark:border-[#2A3F3A]">
          <div className="flex items-center gap-2">
            <BarChart2 className="w-4 h-4 text-muted-foreground" />
            <h2 className="text-sm sm:text-base font-semibold dark:text-[#F2F2F2]">
              Today&apos;s Trades
            </h2>
          </div>
          <span className="text-xs text-muted-foreground dark:text-[#ABBAB6]">
            {loading
              ? 'Loading...'
              : trades.length === 0
              ? 'No trades today'
              : `${trades.length} position${trades.length > 1 ? 's' : ''}`}
          </span>
        </div>

        <div className="divide-y dark:divide-[#2A3F3A]">
          {loading ? (
            Array.from({ length: 3 }).map((_, idx) => (
              <div key={idx} className="px-4 py-3 space-y-2">
                <Skeleton className="h-4 w-40" />
                <Skeleton className="h-3 w-24" />
                <Skeleton className="h-4 w-32" />
              </div>
            ))
          ) : trades.length === 0 ? (
            <div className="px-4 py-6 text-center text-sm text-muted-foreground dark:text-[#ABBAB6]">
              No trades recorded for today yet. New trades will appear here and reset each day.
            </div>
          ) : (
            trades.map((trade) => {
              const isProfit = trade.plUsd >= 0;
              return (
                <div key={trade.id} className="px-4 py-3 sm:py-4 flex flex-col gap-1">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm sm:text-base font-semibold dark:text-[#F2F2F2]">
                        {trade.symbol}
                      </p>
                      <p className="text-[11px] sm:text-xs text-muted-foreground dark:text-[#ABBAB6]">
                        Qty {trade.qty} • Avg ${trade.avgPrice.toFixed(2)} • {trade.side}
                      </p>
                    </div>
                    <div className="text-right">
                      <p
                        className={`text-sm sm:text-base font-semibold ${
                          isProfit ? 'text-green-500' : 'text-red-500'
                        }`}
                      >
                        {isProfit ? '+' : '-'}$
                        {Math.abs(trade.plUsd).toLocaleString('en-US', {
                          minimumFractionDigits: 2,
                          maximumFractionDigits: 2,
                        })}
                      </p>
                      {trade.feeUsd > 0 && (
                        <p className="text-[11px] sm:text-xs text-muted-foreground dark:text-[#ABBAB6]">
                          Deducted ${trade.feeUsd.toFixed(2)} brokerage
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              );
            })
          )}
        </div>
      </div>
    </div>
  );
};

export default PortfolioPage;


