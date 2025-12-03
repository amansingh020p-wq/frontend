'use client';
import React from 'react';
import { cn } from '@/lib/utils';

interface StatCardProps {
  title: string;
  value: string | number;
  icon: React.ElementType;
  trend?: {
    value: string | number;
    isUp: boolean;
  };
  className?: string;
  valueClassName?: string; // ✔ added
}

const StatCard = ({ title, value, icon: Icon, trend, className, valueClassName }: StatCardProps) => {
  return (
    <div
      className={cn(
        'p-4 sm:p-6 rounded-lg border dark:border-[#1e3730] dark:bg-[#142924] shadow-sm',
        className
      )}
    >
      <div className="flex items-center justify-between">
        <h3 className="text-xs sm:text-sm font-medium dark:text-gray-300">{title}</h3>
        <Icon className="text-gray-600 dark:text-[#ABBAB6] w-4 h-4 sm:w-5 sm:h-5" />
      </div>

      <div className="mt-1 sm:mt-2">
        <p className={cn("text-lg sm:text-xl md:text-3xl font-bold dark:text-white", valueClassName)}>
          {value}
        </p>

        {trend && (
          <div className="flex items-center mt-1 sm:mt-2 text-xs">
            <span className={`${trend.isUp ? 'text-green-400' : 'text-red-400'} font-medium`}>
              {trend.isUp ? '↑' : '↓'} {trend.value}
            </span>
            <span className="ml-1 dark:text-gray-400 hidden sm:inline">from last month</span>
            <span className="ml-1 dark:text-gray-400 sm:hidden">vs last month</span>
          </div>
        )}
      </div>
    </div>
  );
};

export default StatCard;