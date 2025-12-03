'use client';

import React, { useState, useEffect } from 'react';
import {
  ArrowUp,
  ArrowDown,
  Check,
  X,
  Loader2
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';

const mockTrades = [
  {
    id: 1,
    symbol: 'AAPL',
    type: 'long',
    quantity: 10,
    buyPrice: 175.50,
  },
  {
    id: 2,
    symbol: 'MSFT',
    type: 'short',
    quantity: 5,
    buyPrice: 345.75,
  },
  {
    id: 3,
    symbol: 'TSLA',
    type: 'long',
    quantity: 3,
    buyPrice: 560.20,
  }
];

const SellTradesPage = () => {
  const [trades, setTrades] = useState([]);
  const [loading, setLoading] = useState(true);
  const [sellingId, setSellingId] = useState(null);
  const [successId, setSuccessId] = useState(null);

  useEffect(() => {
    // Simulate loading delay
    const timer = setTimeout(() => {
      setTrades(mockTrades);
      setLoading(false);
    }, 1500);
    return () => clearTimeout(timer);
  }, []);

  const handleSell = (id) => {
    setSellingId(id);
    // Simulate API call
    setTimeout(() => {
      setSuccessId(id);
      setTimeout(() => {
        setTrades(prev => prev.filter(trade => trade.id !== id));
        setSuccessId(null);
      }, 2000);
      setSellingId(null);
    }, 1000);
  };



  const calculateTotalTradeAmount = (buyPrice, quantity) => {
    return (buyPrice * quantity).toFixed(2);
  };

  return (
    <div className="space-y-6 p-4">
      <h1 className="text-2xl font-bold dark:text-[#F2F2F2]">Your Open Trades</h1>

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
                </div>
                <Skeleton className="h-10 w-full rounded" />
              </div>
            </div>
          ))
        ) : (
          // Actual trade cards
          trades.map((trade) => {
            const isLong = trade.type === 'long';
            const totalAmount = calculateTotalTradeAmount(trade.buyPrice, trade.quantity);
            const isSelling = sellingId === trade.id;
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
                      <span className="dark:text-[#F2F2F2] text-white">Trade sold successfully</span>
                    </div>
                  </div>
                )}

                <div className="flex justify-between items-center">
                  <h3 className="text-lg font-semibold dark:text-[#F2F2F2]">{trade.symbol}</h3>
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

                <div className="mt-3 space-y-1">
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

                <Button
                  onClick={() => handleSell(trade.id)}
                  disabled={isSelling || isSuccess}
                  className='w-full mt-3 bg-primary text-primary-foreground rounded-md hover:bg-primary/90 transition-colors' 
                >
                  {isSelling ? (
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  ) : (
                    <Check className="w-4 h-4 mr-2" />
                  )}
                  {isSelling ? 'Selling...' : 'Sell Trade'}
                </Button>
              </div>
            );
          })
        )}
      </div>

      {!loading && trades.length === 0 && (
        <div className="dark:bg-[#142924] rounded-lg dark:border-[#2A3F3A] border shadow-sm p-8 text-center">
          <p className="dark:text-[#F2F2F2]">No open trades available to sell</p>
        </div>
      )}
    </div>
  );
};

export default SellTradesPage;