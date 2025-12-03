'use client';
import React from 'react';
import { cn } from '@/lib/utils';

export type StatusType =
  | 'pending' | 'verified' | 'completed' | 'rejected' | 'approved' | 'active' | 'suspended' | 'open' | 'closed' | 'deposit' | 'withdraw' | 'long' | 'short';

interface StatusBadgeProps {
  status: StatusType;
  className?: string;
}

const StatusBadge = ({ status, className }: StatusBadgeProps) => {
  const getStatusClasses = (status: StatusType) => {
    switch (status) {
      case 'pending':
        return 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30';
      case 'verified':
      case 'completed':
      case 'approved':
      case 'active':
      case 'open':
      case 'deposit':
      case 'long':
        return 'bg-green-500/20 text-green-400 border-green-500/30';
      case 'rejected':
      case 'suspended':
      case 'closed':
      case 'withdraw':
        return 'bg-red-500/20 text-red-400 border-red-500/30';
      default:
        return 'bg-gray-500/20 text-gray-400 border-gray-500/30';
    }
  };

  return (
    <span className={cn(
      'inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border',
      getStatusClasses(status),
      className
    )}>
      {status.charAt(0).toUpperCase() + status.slice(1)}
    </span>
  );
};

export default StatusBadge;