
'use client';

import React, { useState, useEffect } from 'react';
import { Clock, CheckCircle, XCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Skeleton } from '@/components/ui/skeleton';

const LoanRequestPage = () => {
  const [loanAmount, setLoanAmount] = useState('');
  const [loanDuration, setLoanDuration] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [userLoans, setUserLoans] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate loading data
    const timer = setTimeout(() => {
      setUserLoans([
        { 
          id: 1,
          date: '2023-06-15', 
          amount: '$5,000', 
          duration: '12 months', 
          status: 'approved',
          description: 'Your loan has been approved and amount added to your account'
        },
        { 
          id: 2,
          date: '2023-07-22', 
          amount: '$10,000', 
          duration: '24 months', 
          status: 'pending',
          description: 'Your request is being processed'
        },
      ]);
      setIsLoading(false);
    }, 1500);

    return () => clearTimeout(timer);
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!loanAmount || !loanDuration) return;
    
    setIsSubmitting(true);
    
    // Simulate API call
    setTimeout(() => {
      const newLoan = {
        id: userLoans.length + 1,
        date: new Date().toISOString().split('T')[0],
        amount: `$${parseFloat(loanAmount).toLocaleString()}`,
        duration: `${loanDuration} months`,
        status: 'pending',
        description: 'Your request is being processed'
      };
      
      setUserLoans([newLoan, ...userLoans]);
      setIsSuccess(true);
      setIsSubmitting(false);
      setLoanAmount('');
      setLoanDuration('');
      
      // Hide success message after 3 seconds
      setTimeout(() => setIsSuccess(false), 3000);
    }, 1500);
  };

  const StatusBadge = ({ status }) => {
    return (
      <div className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
        status === 'approved' 
          ? 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400'
          : 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-400'
      }`}>
        {status === 'approved' ? (
          <CheckCircle className="w-3 h-3 mr-1" />
        ) : (
          <Clock className="w-3 h-3 mr-1" />
        )}
        {status}
      </div>
    );
  };

  return (
    <div className="space-y-6 p-4">
      <h1 className="text-xl sm:text-2xl font-bold dark:text-[#F2F2F2]">Loan Request</h1>
      
      {/* Loan Request Form */}
      <div className="dark:bg-[#142924] rounded-lg dark:border-[#2A3F3A] border shadow-sm p-4 sm:p-6">
        <h2 className="text-lg sm:text-xl font-semibold dark:text-[#F2F2F2] mb-3 sm:mb-4">Request a Loan</h2>
        
        {isSuccess && (
          <div className="mb-3 sm:mb-4 p-3 text-xs sm:text-sm bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400 rounded-md flex items-center">
            <CheckCircle className="w-4 h-4 mr-2" />
            Your loan request has been submitted successfully. It will be approved after verification.
          </div>
        )}
        
        <form onSubmit={handleSubmit} className="space-y-3 sm:space-y-4">
          <div>
            <label htmlFor="amount" className="block text-xs sm:text-sm font-medium text-gray-500 dark:text-[#ABBAB6] mb-1">
              Loan Amount ($)
            </label>
            {isLoading ? (
              <Skeleton className="h-9 w-full rounded-md" />
            ) : (
              <Input
                id="amount"
                type="number"
                placeholder="Enter amount"
                value={loanAmount}
                onChange={(e) => setLoanAmount(e.target.value)}
                className="text-xs sm:text-sm dark:bg-[#1E3730] dark:text-[#ABBAB6] dark:border-[#2A3F3A]"
                required
              />
            )}
          </div>
          
          <div>
            <label htmlFor="duration" className="block text-xs sm:text-sm font-medium text-gray-500 dark:text-[#ABBAB6] mb-1">
              Loan Duration
            </label>
            {isLoading ? (
              <Skeleton className="h-9 w-full rounded-md" />
            ) : (
              <Select value={loanDuration} onValueChange={setLoanDuration} required>
                <SelectTrigger className="w-full text-xs sm:text-sm dark:text-[#ABBAB6] dark:bg-[#1E3730] dark:border-[#2A3F3A]">
                  <SelectValue placeholder="Select duration" />
                </SelectTrigger>
                <SelectContent className="dark:bg-[#142924] dark:border-[#2A3F3A]">
                  <SelectItem value="3" className="text-xs sm:text-sm">3 months</SelectItem>
                  <SelectItem value="6" className="text-xs sm:text-sm">6 months</SelectItem>
                  <SelectItem value="12" className="text-xs sm:text-sm">12 months</SelectItem>
                  <SelectItem value="24" className="text-xs sm:text-sm">24 months</SelectItem>
                  <SelectItem value="36" className="text-xs sm:text-sm">36 months</SelectItem>
                </SelectContent>
              </Select>
            )}
          </div>
          
          {isLoading ? (
            <Skeleton className="h-9 w-full rounded-md" />
          ) : (
            <Button
              type="submit"
              disabled={isSubmitting || !loanAmount || !loanDuration}
              className={`w-full text-xs sm:text-sm ${
                isSubmitting 
                  ? 'bg-green-500/20 text-green-400 border-gray-500/30' 
                  : 'bg-primary text-primary-foreground rounded-md hover:bg-primary/90 transition-colors'
              }`}
            >
              {isSubmitting ? 'Submitting...' : 'Submit Loan Request'}
            </Button>
          )}
        </form>
      </div>
      
      {/* Loan History Table - Made Responsive */}
      <div className="dark:bg-[#142924] rounded-lg dark:border-[#2A3F3A] border shadow-sm">
        <div className="p-4 sm:p-6 border-b dark:border-[#2A3F3A]">
          <h2 className="text-lg sm:text-xl font-semibold dark:text-[#F2F2F2]">Your Loan History</h2>
        </div>
        <div className="p-2 sm:p-4 overflow-x-auto">
          <table className="w-full min-w-[600px]">
            <thead>
              <tr className="border-b dark:border-[#2A3F3A]">
                <th className="px-2 py-1 sm:px-4 sm:py-2 text-left text-xs sm:text-sm font-medium text-gray-500 dark:text-[#ABBAB6] whitespace-nowrap">Date</th>
                <th className="px-2 py-1 sm:px-4 sm:py-2 text-left text-xs sm:text-sm font-medium text-gray-500 dark:text-[#ABBAB6] whitespace-nowrap">Amount</th>
                <th className="px-2 py-1 sm:px-4 sm:py-2 text-left text-xs sm:text-sm font-medium text-gray-500 dark:text-[#ABBAB6] whitespace-nowrap">Duration</th>
                <th className="px-2 py-1 sm:px-4 sm:py-2 text-left text-xs sm:text-sm font-medium text-gray-500 dark:text-[#ABBAB6] whitespace-nowrap">Status</th>
                <th className="px-2 py-1 sm:px-4 sm:py-2 text-left text-xs sm:text-sm font-medium text-gray-500 dark:text-[#ABBAB6] whitespace-nowrap">Description</th>
              </tr>
            </thead>
            <tbody>
              {isLoading ? (
                Array.from({ length: 3 }).map((_, index) => (
                  <tr key={index} className="border-b dark:border-[#2A3F3A]">
                    <td className="px-2 py-1 sm:px-4 sm:py-2 whitespace-nowrap">
                      <Skeleton className="h-4 w-20" />
                    </td>
                    <td className="px-2 py-1 sm:px-4 sm:py-2 whitespace-nowrap">
                      <Skeleton className="h-4 w-16" />
                    </td>
                    <td className="px-2 py-1 sm:px-4 sm:py-2 whitespace-nowrap">
                      <Skeleton className="h-4 w-16" />
                    </td>
                    <td className="px-2 py-1 sm:px-4 sm:py-2 whitespace-nowrap">
                      <Skeleton className="h-4 w-20" />
                    </td>
                    <td className="px-2 py-1 sm:px-4 sm:py-2">
                      <Skeleton className="h-4 w-40" />
                    </td>
                  </tr>
                ))
              ) : userLoans.length > 0 ? (
                userLoans.map((loan) => (
                  <tr key={loan.id} className="border-b dark:border-[#2A3F3A] hover:bg-muted/50">
                    <td className="px-2 py-1 sm:px-4 sm:py-2 text-xs sm:text-sm dark:text-[#F2F2F2] whitespace-nowrap">{loan.date}</td>
                    <td className="px-2 py-1 sm:px-4 sm:py-2 text-xs sm:text-sm font-medium dark:text-[#F2F2F2] whitespace-nowrap">{loan.amount}</td>
                    <td className="px-2 py-1 sm:px-4 sm:py-2 text-xs sm:text-sm dark:text-[#F2F2F2] whitespace-nowrap">{loan.duration}</td>
                    <td className="px-2 py-1 sm:px-4 sm:py-2 text-xs sm:text-sm whitespace-nowrap">
                      <StatusBadge status={loan.status} />
                    </td>
                    <td className="px-2 py-1 sm:px-4 sm:py-2 text-xs sm:text-sm dark:text-[#F2F2F2]">{loan.description}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="5" className="px-4 py-6 text-center text-xs sm:text-sm text-gray-500 dark:text-[#ABBAB6]">
                    No loan history available
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default LoanRequestPage;