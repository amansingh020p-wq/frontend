


'use client';

import React, { useState, useEffect } from 'react';
import { TabsContent, Tabs, TabsList, TabsTrigger } from "../../../components/ui/tabs";
import StatusBadge from '../../../components/ui/StatusBadge';
import { Input } from '../../../components/ui/input';
import { Button } from '../../../components/ui/button';
import { QrCode, Loader2, CreditCard } from 'lucide-react';
import fetch from '@/utils/axios';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "../../../components/ui/dialog";
import { Skeleton } from '@/components/ui/skeleton';

const UserDepositPage = () => {
  const [activeTab, setActiveTab] = useState("deposit");
  const [amount, setAmount] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [qrCodeUrl, setQrCodeUrl] = useState("");
  const [upiLink, setUpiLink] = useState("");
  const [showSuccessDialog, setShowSuccessDialog] = useState(false);
  const [selectedMethod, setSelectedMethod] = useState("");
  const [showBankDetails, setShowBankDetails] = useState(false);
  const [loading, setLoading] = useState(true);
  const [userDepositHistory, setUserDepositHistory] = useState([]);
  const [bankDetailsVisible, setBankDetailsVisible] = useState(false); // Default to false (hide bank details)
  
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        // Fetch bank details visibility setting
        try {
          const visibilityRes = await fetch.get('/user/bank-details-visibility');
          // Handle ApiResponse format (statusCode, success, data)
          if (visibilityRes.data.success === true || visibilityRes.data.statusCode === 200) {
            setBankDetailsVisible(visibilityRes.data.data?.showBankDetails ?? false);
          } else {
            // If response format is unexpected, default to hiding bank details
            setBankDetailsVisible(false);
          }
        } catch (error) {
          console.error("Failed to fetch bank details visibility:", error);
          // Default to hiding bank details if API fails (safer)
          setBankDetailsVisible(false);
        }

        const res = await fetch.get('/user/deposit-history'); 
        const { deposits } = res.data.data;

        const formattedDeposits = deposits.map((deposit) => ({
          id: deposit.transactionId,
          amount: `₹${deposit.amount.toLocaleString('en-IN')}`,
          date: new Date(deposit.timestamp).toLocaleDateString('en-GB'),
          method: deposit.paymentMethod === 'UPI' ? 'UPI' : 'Bank Transfer',
          status: deposit.status.toLowerCase(), // lowercase to match `StatusBadge` component props
        }));

        setUserDepositHistory(formattedDeposits);
      } catch (error) {
        console.error("Failed to fetch deposit history:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const generateQR = () => {
    if (!amount || parseFloat(amount) <= 0) {
      alert('Please enter a valid amount');
      return;
    }

    setIsLoading(true);
    setQrCodeUrl('');

    const upiId = "developer.aditya09@oksbi";
    const businessName = "Aditya Patel";
    const upiLinkData = `upi://pay?pa=${upiId}&pn=${encodeURIComponent(businessName)}&am=${amount}&cu=INR&mc=0000&tn=Payment+for+order`;

    setUpiLink(upiLinkData);

    // Simulate API delay
    setTimeout(() => {
      const qrAPI = `https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${encodeURIComponent(upiLinkData)}`;
      setQrCodeUrl(qrAPI);
      setIsLoading(false);
    }, 1500);
  };

  const handlePayment = () => {
    // cann't see that is coming
    if (upiLink) {
      window.location.href = upiLink;
    }
  };

  const submitDepositRequest = async () => {
  try {
    // const token = localStorage.getItem('token'); // Or get it from auth context

    const res = await fetch.post('/user/deposit', {
      amount,
      paymentMethod: "UPI", // or "bank" based on selected method
      upiId: "developer.aditya09@oksbi", // Only if UPI
    });
    console.log("Deposit response:", res.data);

    setShowSuccessDialog(true);
  } catch (err) {
    alert(err.response?.data?.message || 'Deposit failed');
  }
};

  const handleMethodSelect = (method) => {
    setSelectedMethod(method);
    setQrCodeUrl("");
    setShowBankDetails(false);
  };

  const handleShowBankDetails = () => {
    setShowBankDetails(true);
  };

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold dark:text-[#F2F2F2]">Deposit Funds</h1>
      
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full md:w-80 grid-cols-2">
          <TabsTrigger value="deposit">Make Deposit</TabsTrigger>
          <TabsTrigger value="history">Deposit History</TabsTrigger>
        </TabsList>
        
        <TabsContent value="deposit" className="mt-4">
          <div className="bg-card rounded-lg border dark:border-[#2A3F3A] shadow-sm">
            <div className="p-6 border-b dark:border-[#2A3F3A]">
              <h2 className="text-xl font-semibold dark:text-[#F2F2F2]">Deposit Funds</h2>
              <p className="text-sm text-muted-foreground mt-1 dark:text-[#ABBAB6]">
                Enter the amount you want to deposit and choose your payment method
              </p>
            </div>
            
            <div className="p-6 space-y-6">
              <div className="space-y-2">
                <label className="block text-sm font-medium dark:text-[#F2F2F2]" htmlFor="amount">
                  Amount ($)
                </label>
                {loading ? (
                  <Skeleton className="h-10 w-full rounded-md" />
                ) : (
                  <Input
                    id="amount"
                    type="number"
                    placeholder="Enter amount"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    className="dark:border-[#2A3F3A] dark:bg-[#142924] dark:text-[#F2F2F2]"
                  />
                )}
              </div>
              
              <div className="space-y-2">
                <label className="block text-sm font-medium dark:text-[#F2F2F2]">
                  Payment Method
                </label>
                {loading ? (
                  <div className="grid grid-cols-2 gap-4">
                    <Skeleton className="h-20 rounded-lg" />
                    <Skeleton className="h-20 rounded-lg" />
                  </div>
                ) : (
                  <div className={`grid gap-4 ${bankDetailsVisible ? 'grid-cols-2' : 'grid-cols-1'}`}>
                    <button 
                      className={`p-4 border rounded-lg dark:border-[#2A3F3A] hover:bg-muted/50 dark:hover:bg-[#1A2E24] transition-colors ${selectedMethod === 'upi' ? 'bg-muted/30 dark:bg-[#1A2E24] ring-2 ring-blue-500' : ''}`}
                      onClick={() => handleMethodSelect('upi')}
                    >
                      <div className="flex flex-col items-center">
                        <CreditCard className="w-5 h-5 mb-1 dark:text-[#F2F2F2]" />
                        <span className="dark:text-[#F2F2F2]">UPI Payment</span>
                      </div>
                    </button>
                    {bankDetailsVisible && (
                      <button 
                        className={`p-4 border rounded-lg dark:border-[#2A3F3A] hover:bg-muted/50 dark:hover:bg-[#1A2E24] transition-colors ${selectedMethod === 'bank' ? 'bg-muted/30 dark:bg-[#1A2E24] ring-2 ring-blue-500' : ''}`}
                        onClick={() => handleMethodSelect('bank')}
                      >
                        <div className="flex flex-col items-center">
                          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mb-1 dark:text-[#F2F2F2]">
                            <rect x="2" y="4" width="20" height="16" rx="2"></rect>
                            <path d="M2 10h20"></path>
                            <path d="M2 14h20"></path>
                            <path d="M6 18h2"></path>
                            <path d="M12 18h6"></path>
                          </svg>
                          <span className="dark:text-[#F2F2F2]">Bank Transfer</span>
                        </div>
                      </button>
                    )}
                  </div>
                )}
              </div>
              
              {/* UPI Payment Flow */}
              {selectedMethod === 'upi' && !qrCodeUrl && (
                loading ? (
                  <Skeleton className="h-10 w-full rounded-md" />
                ) : (
                  <Button 
                    className="w-full" 
                    onClick={generateQR}
                    disabled={!amount || isLoading}
                  >
                    {isLoading ? (
                      <>
                        <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                        Generating QR...
                      </>
                    ) : (
                      <>
                        <QrCode className="w-5 h-5 mr-2" />
                        Generate UPI QR Code
                      </>
                    )}
                  </Button>
                )
              )}

              {selectedMethod === 'upi' && qrCodeUrl && (
                loading ? (
                  <div className="space-y-4 p-4 border rounded-lg dark:border-[#2A3F3A] bg-muted/20 dark:bg-[#1A2E24]/50">
                    <Skeleton className="w-48 h-48 mx-auto" />
                    <div className="space-y-2">
                      <Skeleton className="h-4 w-full" />
                      <Skeleton className="h-4 w-full" />
                      <Skeleton className="h-4 w-full" />
                    </div>
                    <div className="flex flex-col w-full space-y-2">
                      <Skeleton className="h-10 w-full rounded-md" />
                      <Skeleton className="h-10 w-full rounded-md" />
                    </div>
                  </div>
                ) : (
                  <div className="space-y-4 p-4 border rounded-lg dark:border-[#2A3F3A] bg-muted/20 dark:bg-[#1A2E24]/50">
                    <div className="flex flex-col items-center space-y-4">
                      <div className="flex justify-center p-4 bg-white rounded-lg">
                        <img
                          src={qrCodeUrl}
                          alt="Payment QR Code"
                          className="w-48 h-48 object-contain"
                        />
                      </div>
                      
                      <div className="w-full space-y-2 text-sm dark:text-[#ABBAB6]">
                        <div className="flex justify-center gap-2">
                          <span>UPI ID :</span>
                          <span className="font-medium dark:text-[#F2F2F2]">developer.aditya09@oksbi</span>
                        </div>
                        <div className="flex justify-center gap-2">
                          <span>Business Name:</span>
                          <span className="font-medium dark:text-[#F2F2F2]">Aditya Patel</span>
                        </div>
                        <div className="flex justify-center gap-2">
                          <span>Amount:</span>
                          <span className="font-medium dark:text-[#F2F2F2]">₹{amount}</span>
                        </div>
                        <div className="flex justify-center gap-2">
                          <span className='text-red-600'>Caption: Please Click on the button "  I've Completed Payment  ", after payment</span>
                        </div>
                      </div>

                      <div className="flex flex-col w-full space-y-2">
                        <Button 
                          className="w-full bg-green-600 hover:bg-green-700 dark:bg-green-700 dark:hover:bg-green-800"
                          onClick={handlePayment}
                        >
                          <CreditCard className="w-5 h-5 mr-2" />
                          Make Payment via UPI
                        </Button>
                        <Button 
                          variant="outline"
                          className="w-full dark:border-[#2A3F3A] dark:text-white dark:hover:bg-[#1A2E24]"
                          onClick={submitDepositRequest}
                        >
                          I've Completed Payment
                        </Button>
                      </div>
                    </div>
                  </div>
                )
              )}

              {/* Bank Transfer Flow */}
              {selectedMethod === 'bank' && !showBankDetails && (
                loading ? (
                  <Skeleton className="h-10 w-full rounded-md" />
                ) : (
                  <Button 
                    className="w-full" 
                    onClick={handleShowBankDetails}
                    disabled={!amount}
                  >
                    Show Bank Details
                  </Button>
                )
              )}

              {selectedMethod === 'bank' && showBankDetails && (
                loading ? (
                  <div className="space-y-4 p-4 border rounded-lg dark:border-[#2A3F3A] bg-muted/20 dark:bg-[#1A2E24]/50">
                    <Skeleton className="h-6 w-1/3" />
                    <div className="space-y-2">
                      <Skeleton className="h-4 w-full" />
                      <Skeleton className="h-4 w-full" />
                      <Skeleton className="h-4 w-full" />
                      <Skeleton className="h-4 w-full" />
                    </div>
                    <Skeleton className="h-4 w-full" />
                    <Skeleton className="h-10 w-full rounded-md" />
                  </div>
                ) : (
                  <div className="space-y-4 p-4 border rounded-lg dark:border-[#2A3F3A] bg-muted/20 dark:bg-[#1A2E24]/50">
                    <div className="space-y-2">
                      <h3 className="font-medium dark:text-[#F2F2F2]">Bank Transfer Details</h3>
                      <div className="space-y-1 text-sm dark:text-[#ABBAB6]">
                        <div className="flex justify-left gap-2">
                          <span>Bank Name :</span>
                          <span className="font-medium dark:text-[#F2F2F2]">State Bank Of India</span>
                        </div>
                        <div className="flex justify-left gap-2">
                          <span>Account Number:</span>
                          <span className="font-medium dark:text-[#F2F2F2]">98656565323</span>
                        </div>
                        <div className="flex justify-left gap-2">
                          <span>IFSC Code:</span>
                          <span className="font-medium dark:text-[#F2F2F2]">SBIN8965432</span>
                        </div>
                        <div className="flex justify-left gap-2">
                          <span>Account Name:</span>
                          <span className="font-medium dark:text-[#F2F2F2]">Aditya Patel</span>
                        </div>
                      </div>
                      <p className="text-sm mt-2 dark:text-[#ABBAB6]">
                        Please transfer ₹{amount} to the above account and submit your transaction details.
                      </p>
                    </div>
                    <Button 
                      className="w-full"
                      onClick={submitDepositRequest}
                    >
                      I've Completed Transfer
                    </Button>
                  </div>
                )
              )}
            </div>
          </div>
        </TabsContent>
        
        <TabsContent value="history" className="mt-4">
          <div className="bg-card rounded-lg border dark:border-[#2A3F3A] shadow-sm">
            <div className="p-4 sm:p-6 border-b dark:border-[#2A3F3A]">
              <h2 className="text-lg sm:text-xl font-semibold dark:text-[#F2F2F2]">Deposit History</h2>
              <p className="text-xs sm:text-sm text-muted-foreground mt-1 dark:text-[#ABBAB6]">
                View your deposit transaction history
              </p>
            </div>
            <div className="p-2 sm:p-4 overflow-x-auto">
              <table className="w-full min-w-[600px]">
                <thead>
                  <tr className="border-b dark:border-[#2A3F3A]">
                    <th className="px-2 py-1 sm:px-3 sm:py-2 text-left text-xs sm:text-sm font-medium text-muted-foreground dark:text-[#ABBAB6] whitespace-nowrap">Transaction ID</th>
                    <th className="px-2 py-1 sm:px-3 sm:py-2 text-left text-xs sm:text-sm font-medium text-muted-foreground dark:text-[#ABBAB6] whitespace-nowrap">Amount</th>
                    <th className="px-2 py-1 sm:px-3 sm:py-2 text-left text-xs sm:text-sm font-medium text-muted-foreground dark:text-[#ABBAB6] whitespace-nowrap">Date</th>
                    <th className="px-2 py-1 sm:px-3 sm:py-2 text-left text-xs sm:text-sm font-medium text-muted-foreground dark:text-[#ABBAB6] whitespace-nowrap">Method</th>
                    <th className="px-2 py-1 sm:px-3 sm:py-2 text-left text-xs sm:text-sm font-medium text-muted-foreground dark:text-[#ABBAB6] whitespace-nowrap">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {loading ? (
                    Array.from({ length: 3 }).map((_, index) => (
                      <tr key={index} className="border-b dark:border-[#2A3F3A]">
                        <td className="px-2 py-1 sm:px-3 sm:py-2"><Skeleton className="h-4 w-[100px]" /></td>
                        <td className="px-2 py-1 sm:px-3 sm:py-2"><Skeleton className="h-4 w-[80px]" /></td>
                        <td className="px-2 py-1 sm:px-3 sm:py-2"><Skeleton className="h-4 w-[80px]" /></td>
                        <td className="px-2 py-1 sm:px-3 sm:py-2"><Skeleton className="h-4 w-[100px]" /></td>
                        <td className="px-2 py-1 sm:px-3 sm:py-2"><Skeleton className="h-6 w-[70px] rounded-full" /></td>
                      </tr>
                    ))
                  ) : (
                    userDepositHistory.map((deposit) => (
                      <tr key={deposit.id} className="border-b dark:border-[#2A3F3A] hover:bg-muted/50">
                        <td className="px-2 py-1 sm:px-3 sm:py-2 text-xs sm:text-sm dark:text-[#F2F2F2] whitespace-nowrap">{deposit.id}</td>
                        <td className="px-2 py-1 sm:px-3 sm:py-2 text-xs sm:text-sm font-medium dark:text-[#F2F2F2] whitespace-nowrap">{deposit.amount}</td>
                        <td className="px-2 py-1 sm:px-3 sm:py-2 text-xs sm:text-sm dark:text-[#F2F2F2] whitespace-nowrap">{deposit.date}</td>
                        <td className="px-2 py-1 sm:px-3 sm:py-2 text-xs sm:text-sm dark:text-[#F2F2F2] whitespace-nowrap">{deposit.method}</td>
                        <td className="px-2 py-1 sm:px-3 sm:py-2 text-xs sm:text-sm whitespace-nowrap">
                          <StatusBadge status={deposit.status} className="text-xs sm:text-sm" />
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </TabsContent>
      </Tabs>
      
      <Dialog open={showSuccessDialog} onOpenChange={setShowSuccessDialog}>
        <DialogContent className="sm:max-w-[425px] dark:bg-[#1A2E24] dark:border-[#2A3F3A]">
          <DialogHeader>
            <DialogTitle className="dark:text-[#F2F2F2]">Deposit Successful</DialogTitle>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="flex flex-col items-center space-y-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="48"
                height="48"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="text-green-500"
              >
                <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                <polyline points="22 4 12 14.01 9 11.01"></polyline>
              </svg>
              <p className="text-center dark:text-[#F2F2F2]">
                Your deposit request of ₹{amount} has been submitted successfully!
              </p>
              <p className="text-center text-sm text-muted-foreground dark:text-[#ABBAB6]">
                The amount will be added to your account after verification.
              </p>
            </div>
          </div>
          <div className="flex justify-end">
            <Button onClick={() => {
              setShowSuccessDialog(false);
              setAmount("");
              setQrCodeUrl("");
              setSelectedMethod("");
              setShowBankDetails(false);
            }}>
              Close
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default UserDepositPage;