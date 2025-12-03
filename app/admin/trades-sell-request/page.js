
'use client';

import React, { useState, useEffect } from 'react';
import {
  ArrowUp,
  ArrowDown,
  Check,
  Loader2
} from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';

const mockTradeSells = [
  {
    id: 1,
    symbol: 'AAPL',
    type: 'long',
    quantity: 10,
    buyPrice: 175.50,
    username: 'john_doe'
  },
  {
    id: 2,
    symbol: 'MSFT',
    type: 'short',
    quantity: 5,
    buyPrice: 345.75,
    username: 'jane_smith'
  },
  {
    id: 3,
    symbol: 'TSLA',
    type: 'long',
    quantity: 3,
    buyPrice: 560.20,
    username: 'mike_johnson'
  }
];

const TradesSellRequest = () => {
  const [trades, setTrades] = useState([]);
  const [sellPrices, setSellPrices] = useState({});
  const [loading, setLoading] = useState(true);
  const [approvingId, setApprovingId] = useState(null);
  const [successId, setSuccessId] = useState(null);

  useEffect(() => {
    // Simulate loading delay
    const timer = setTimeout(() => {
      setTrades(mockTradeSells);
      setLoading(false);
    }, 1500);
    return () => clearTimeout(timer);
  }, []);

  const handleSellPriceChange = (id, value) => {
    const numValue = parseFloat(value) || 0;
    setSellPrices(prev => ({
      ...prev,
      [id]: numValue
    }));
  };

  const calculateTotalTradeAmount = (buyPrice, quantity) => {
    return (buyPrice * quantity).toFixed(2);
  };

  const calculateProfitLoss = (buyPrice, sellPrice, quantity, type) => {
    if (!sellPrice) return { amount: '0.00', percentage: '0.00' };

    const multiplier = type === 'long' ? 1 : -1;
    const totalAmount = buyPrice * quantity;
    const profitLossAmount = (sellPrice - buyPrice) * quantity * multiplier;
    const profitLossPercentage = ((profitLossAmount / totalAmount) * 100) * multiplier;

    return {
      amount: profitLossAmount.toFixed(2),
      percentage: profitLossPercentage.toFixed(2)
    };
  };

  const handleSell = (id) => {
    setApprovingId(id);
    // Simulate API call
    setTimeout(() => {
      setSuccessId(id);
      setTimeout(() => {
        // Remove the approved trade from the list
        setTrades(prev => prev.filter(trade => trade.id !== id));
        setSuccessId(null);
      }, 2000);
      setApprovingId(null);
    }, 1000);
  };

  return (
    <div className="space-y-6 p-4">
      <h1 className="text-2xl font-bold dark:text-[#F2F2F2]">Trade Sell Request</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {loading ? (
          // Skeleton loading state
          Array.from({ length: 3 }).map((_, index) => (
            <div key={index} className="dark:bg-[#142924] rounded-lg dark:border-[#2A3F3A] border shadow-sm p-4">
              <div className="space-y-4">
                <Skeleton className="h-6 w-3/4 rounded" />
                <div className="space-y-2">
                  <Skeleton className="h-4 w-full rounded" />
                  <Skeleton className="h-4 w-5/6 rounded" />
                  <Skeleton className="h-4 w-4/5 rounded" />
                  <Skeleton className="h-4 w-3/4 rounded" />
                </div>
                <div className="flex gap-2">
                  <Skeleton className="h-10 w-32 rounded" />
                  <Skeleton className="h-10 w-24 rounded" />
                </div>
              </div>
            </div>
          ))
        ) : (
          // Actual trade cards
          trades.map((trade) => {
            const sellPrice = sellPrices[trade.id] || 0;
            const totalAmount = calculateTotalTradeAmount(trade.buyPrice, trade.quantity);
            const { amount: profitLossAmount, percentage: profitLossPercentage } = calculateProfitLoss(
              trade.buyPrice,
              sellPrice,
              trade.quantity,
              trade.type
            );
            const isProfitable = parseFloat(profitLossAmount) > 0;
            const isLong = trade.type === 'long';
            const isApproving = approvingId === trade.id;
            const isSuccess = successId === trade.id;

            return (
              <div 
                key={trade.id} 
                className="dark:bg-[#142924] rounded-lg dark:border-[#2A3F3A] border shadow-sm p-4 relative overflow-hidden"
              >
                {isSuccess && (
                  <div className="absolute inset-0 bg-green-900/20 dark:bg-green-900/30 flex items-center justify-center z-10">
                    <div className="bg-[#142924] dark:bg-[#1E3730] p-3 rounded-lg border dark:border-[#2A3F3A] shadow-sm flex items-center">
                      <Check className="w-5 h-5 text-green-500 mr-2" />
                      <span className="dark:text-[#F2F2F2]">Trade sell request approved</span>
                    </div>
                  </div>
                )}

                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="text-lg font-semibold dark:text-[#F2F2F2]">{trade.symbol}</h3>
                    <p className="text-sm text-gray-500 dark:text-[#ABBAB6]">@{trade.username}</p>
                  </div>
                  <div className={`flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                    isLong 
                      ? 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400' 
                      : 'bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400'
                  }`}>
                    {isLong ? (
                      <ArrowUp className="w-3 h-3 mr-1" />
                    ) : (
                      <ArrowDown className="w-3 h-3 mr-1" />
                    )}
                    {trade.type}
                  </div>
                </div>

                <div className="mt-4 space-y-2">
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-500 dark:text-[#ABBAB6]">Quantity:</span>
                    <span className="text-sm font-medium dark:text-[#F2F2F2]">{trade.quantity}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-500 dark:text-[#ABBAB6]">Buy Price:</span>
                    <span className="text-sm font-medium dark:text-[#F2F2F2]">${trade.buyPrice.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-500 dark:text-[#ABBAB6]">Total Trade Amount:</span>
                    <span className="text-sm font-medium dark:text-[#F2F2F2]">${totalAmount}</span>
                  </div>
                </div>

                <div className="mt-4 space-y-3">
                  <div>
                    <label className="text-sm text-gray-500 dark:text-[#ABBAB6] mb-1 block">Sell Price:</label>
                    <Input
                      type="number"
                      placeholder="Enter sell price"
                      value={sellPrices[trade.id] || ''}
                      onChange={(e) => handleSellPriceChange(trade.id, e.target.value)}
                      className="w-full dark:bg-[#1E3730] dark:border-[#2A3F3A] dark:text-white"
                    />
                  </div>
                  {sellPrice > 0 && (
                    <div className={`p-2 rounded-md ${
                      isProfitable 
                        ? 'bg-green-100/50 dark:bg-green-900/20 text-green-700 dark:text-green-400' 
                        : 'bg-red-100/50 dark:bg-red-900/20 text-red-700 dark:text-red-400'
                    }`}>
                      <div className="flex justify-between text-sm">
                        <span>P&L Amount:</span>
                        <span>${profitLossAmount}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span>P&L Percentage:</span>
                        <span>{profitLossPercentage}%</span>
                      </div>
                    </div>
                  )}
                </div>

                <Button
                  onClick={() => handleSell(trade.id)}
                  disabled={!sellPrices[trade.id] || isApproving || isSuccess}
                  className="w-full mt-4"
                >
                  {isApproving ? (
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  ) : (
                    <Check className="w-4 h-4 mr-2" />
                  )}
                  {isApproving ? 'Approving...' : 'Approve'}
                </Button>
              </div>
            );
          })
        )}
      </div>

      {!loading && trades.length === 0 && (
        <div className="dark:bg-[#142924] rounded-lg dark:border-[#2A3F3A] border shadow-sm p-8 text-center">
          <p className="dark:text-[#F2F2F2]">No trade sell requests available</p>
        </div>
      )}
    </div>
  );
};

export default TradesSellRequest;