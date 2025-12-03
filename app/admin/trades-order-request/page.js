'use client';

import React, { useState, useEffect } from 'react';
import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell
} from '@/components/ui/table';
import StatusBadge from '@/components/ui/StatusBadge';
import ActionButton from '@/components/ui/ActionButton';
import { Skeleton } from '@/components/ui/skeleton';
import { Check, X, Eye } from 'lucide-react';


const TradesOrderRequest = () => {
  const [loading, setLoading] = useState(true);
  const [tradeOrders, setTradeOrders] = useState([]);
  const [tradeOrderRequests, setTradeOrderRequests] = useState([]);
  const [toasts, setToasts] = useState([]);

  useEffect(() => {
    // Simulate data loading
    const timer = setTimeout(() => {
      setTradeOrders([
        {
          id: 1,
          date: '2025-04-10',
          user: 'John Doe',
          balance: '$5,200',
          symbol: 'AAPL',
          quantity: 10,
          buyPrice: '$175.50',
          sellPrice: '$185.20',
          type: 'long',
          amount: '$1,852',
          status: 'pending'
        },
        {
          id: 2,
          date: '2025-04-11',
          user: 'Jane Smith',
          balance: '$8,500',
          symbol: 'MSFT',
          quantity: 5,
          buyPrice: '$345.75',
          sellPrice: '$355.30',
          type: 'short',
          amount: '$1,776.50',
          status: 'pending'
        },
        {
          id: 3,
          date: '2025-04-12',
          user: 'Robert Johnson',
          balance: '$12,300',
          symbol: 'TSLA',
          quantity: 3,
          buyPrice: '$560.20',
          sellPrice: '$575.60',
          type: 'long',
          amount: '$1,726.80',
          status: 'pending'
        }
      ]);
      setLoading(false);
    }, 1500);

    return () => clearTimeout(timer);
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

  const handletradeOrderAction = (id, action) => {
    if (action === 'accept') {
      // setTradeOrders(prev => prev.map(order =>
      //     order.id === id ? { ...order, status: 'completed' } : order
      //   )
      // );
      setTradeOrders(prev => prev.filter(order => order.id !== id));
      addToast('success', 'Trade Order request accepted successfully!');
    } else if (action === 'reject') {
      setTradeOrders(prev => prev.filter(order => order.id !== id));
      addToast('error', 'Trade Order request rejected successfully!');
    }
  };

  return (
    <div className="space-y-6 py-4 sm:py-6 -mt-10 md:-mt-12">


      <div className="fixed top-4 mt-16 mr-4 md:mr-0 right-4 z-50 space-y-3">
        {toasts.map((toast) => (
          <Toast key={toast.id} {...toast} />
        ))}
      </div>
      <h1 className="text-2xl font-bold dark:text-[#F2F2F2]">Trade Order Requests</h1>

      <div className="rounded-lg border dark:border-[#2A3F3A] shadow-sm overflow-x-auto">
        <div className="min-w-[1000px]">
          <Table className='text-xs sm:text-sm dark:bg-[#142924]'>
            <TableHeader>
              <TableRow className='dark:border-[#2A3F3A]'>
                <TableHead className="whitespace-nowrap px-2 sm:px-4">Date</TableHead>
                <TableHead className="whitespace-nowrap px-2 sm:px-4">User</TableHead>
                <TableHead className="whitespace-nowrap px-2 sm:px-4">Balance</TableHead>
                <TableHead className="whitespace-nowrap px-2 sm:px-4">Symbol</TableHead>
                <TableHead className="whitespace-nowrap px-2 sm:px-4">Quantity</TableHead>
                <TableHead className="whitespace-nowrap px-2 sm:px-4">Buy Price</TableHead>
                <TableHead className="whitespace-nowrap px-2 sm:px-4">Type</TableHead>
                <TableHead className="whitespace-nowrap px-2 sm:px-4">Amount</TableHead>
                <TableHead className="whitespace-nowrap px-2 sm:px-4">Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {loading ? (
                Array.from({ length: 3 }).map((_, index) => (
                  <TableRow key={index} className='dark:border-[#2A3F3A]'>
                    <TableCell className="whitespace-nowrap px-2 sm:px-4"><Skeleton className="h-4 w-20" /></TableCell>
                    <TableCell className="whitespace-nowrap px-2 sm:px-4"><Skeleton className="h-4 w-24" /></TableCell>
                    <TableCell className="whitespace-nowrap px-2 sm:px-4"><Skeleton className="h-4 w-20" /></TableCell>
                    <TableCell className="whitespace-nowrap px-2 sm:px-4"><Skeleton className="h-4 w-12" /></TableCell>
                    <TableCell className="whitespace-nowrap px-2 sm:px-4"><Skeleton className="h-4 w-8" /></TableCell>
                    <TableCell className="whitespace-nowrap px-2 sm:px-4"><Skeleton className="h-4 w-20" /></TableCell>
                    <TableCell className="whitespace-nowrap px-2 sm:px-4"><Skeleton className="h-4 w-12" /></TableCell>
                    <TableCell className="whitespace-nowrap px-2 sm:px-4"><Skeleton className="h-4 w-16" /></TableCell>
                    <TableCell className="whitespace-nowrap px-2 sm:px-4">
                      <div className="flex gap-1 sm:gap-2">
                        <Skeleton className="h-6 w-6" />
                        <Skeleton className="h-6 w-6" />
                      </div>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                tradeOrders.map((order) => (
                  <TableRow key={order.id} className='dark:text-[#F2F2F2] dark:border-[#2A3F3A]'>
                    <TableCell className="whitespace-nowrap px-2 sm:px-4">{order.date}</TableCell>
                    <TableCell className="whitespace-nowrap px-2 sm:px-4">{order.user}</TableCell>
                    <TableCell className="whitespace-nowrap px-2 sm:px-4">{order.balance}</TableCell>
                    <TableCell className="whitespace-nowrap px-2 sm:px-4 font-medium">{order.symbol}</TableCell>
                    <TableCell className="whitespace-nowrap px-2 sm:px-4">{order.quantity}</TableCell>
                    <TableCell className="whitespace-nowrap px-2 sm:px-4">{order.buyPrice}</TableCell>
                    <TableCell className="whitespace-nowrap px-2 sm:px-4 capitalize">{order.type}</TableCell>
                    <TableCell className="whitespace-nowrap px-2 sm:px-4">{order.amount}</TableCell>
                    <TableCell className="whitespace-nowrap px-2 sm:px-4">
                      <div className="flex gap-1 sm:gap-2">
                        <ActionButton
                          type="accept"
                          onClick={() => handletradeOrderAction(order.id, 'accept')}
                        />
                        <ActionButton
                          type="reject"
                          onClick={() => handletradeOrderAction(order.id, 'reject')}
                        />
                      </div>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </div>
      </div>
    </div>
  );
};

export default TradesOrderRequest;