

'use client';
import React, { useState, useEffect } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../../../components/ui/tabs';
import { Users, CreditCard, UserCheck, DollarSign, FileCheck } from 'lucide-react';
import StatusBadge from '../../../components/ui/StatusBadge';
import { Skeleton } from '@/components/ui/skeleton';

const UserProfile = () => {
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);
  const [activeTab, setActiveTab] = useState("personal");

  useEffect(() => {
    // Simulate API fetch
    const fetchData = async () => {
      // Simulate network delay
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Set the actual data
      setUser({
        name: 'John Smith',
        username: '@johnsmith',
        phone: '+1 (555) 123-4567',
        email: 'john.smith@example.in',
        status: 'verified',
        joinedDate: '2023-01-15',
        kyc: {
          aadharNumber: '1234 5678 9012',
          panNumber: 'ABCDE1234F',
          aadharPhoto: 'Uploaded',
          panPhoto: 'Uploaded',
          profilePhoto: 'Uploaded'
        },
        bank: {
          name: 'Chase',
          accountHolder: 'John Smith',
          accountNumber: '****1234',
          ifsc: 'CHAS0012345',
          branch: 'New York City, NY'
        },
        transactions: [
          { id: 'TRX-1234', type: 'Deposit', amount: '$1,500', date: '2023-04-10', status: 'completed' },
          // ... other transactions
        ],
        trades: [
          { id: 'TRD-542', symbol: 'AAPL', quantity: 10, buyPrice: 185.92, sellPrice: 190.5, date: '2023-04-01', profitLoss: '-$45.80' },
          // ... other trades
        ],
        loans: [
          { id: 'LN-112', amount: '$5,000', duration: '12 months', date: '2023-02-15', status: 'active', remaining: '$3,750' },
          // ... other loans
        ]
      });

      setLoading(false);
    };

    fetchData();
  }, []);

  if (!user) {
    return (
      <div className="space-y-6">
        <h1 className="text-2xl font-bold dark:text-[#F2F2F2]">User Profile</h1>
        <div className="space-y-4">
          <Skeleton className="h-20 w-full rounded-lg" />
          <Skeleton className="h-10 w-full rounded-lg" />
          <Skeleton className="h-96 w-full rounded-lg" />
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold dark:text-[#F2F2F2]">User Profile</h1>
      </div>

      <div className="bg-card rounded-lg border dark:border-[#2A3F3A] shadow-sm overflow-hidden">
        <div className="p-6 flex flex-col md:flex-row gap-6 items-start md:items-center">
          {loading ? (
            <Skeleton className="h-20 w-20 rounded-full" />
          ) : (
            <div className="h-20 w-20 rounded-full bg-primary/20 flex items-center justify-center">
              <span className="font-semibold text-3xl text-primary">
                {user.name.split(' ').map(name => name[0]).join('')}
              </span>
            </div>
          )}

          <div className="flex-1">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-2">
              <div>
                {loading ? (
                  <div className="space-y-2">
                    <Skeleton className="h-6 w-48" />
                    <Skeleton className="h-4 w-32" />
                  </div>
                ) : (
                  <>
                    <h2 className="text-2xl font-semibold dark:text-[#F2F2F2]">{user.name}</h2>
                    <p className="text-muted-foreground dark:text-[#ABBAB6]">{user.username}</p>
                  </>
                )}
              </div>
              {loading ? (
                <Skeleton className="h-6 w-24 rounded-full" />
              ) : (
                <StatusBadge status={user.status} className="px-3 py-1 text-sm" />
              )}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
              {loading ? (
                Array.from({ length: 3 }).map((_, i) => (
                  <div key={i} className="space-y-1">
                    <Skeleton className="h-4 w-16" />
                    <Skeleton className="h-4 w-32" />
                  </div>
                ))
              ) : (
                <>
                  <div>
                    <p className="text-sm text-muted-foreground dark:text-[#ABBAB6]">Email</p>
                    <p className='dark:text-[#F2F2F2] text-sm'>{user.email}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Phone</p>
                    <p className='dark:text-[#F2F2F2] text-sm'>{user.phone}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Joined</p>
                    <p className='dark:text-[#F2F2F2] text-sm'>{user.joinedDate}</p>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid h-20 md:h-10 grid-cols-2 md:grid-cols-4 mb-6 w-full overflow-x-auto">
          <TabsTrigger value="personal" className="flex gap-2 items-center whitespace-nowrap">
            <Users size={16} />
            <span>Personal</span>
          </TabsTrigger>
          <TabsTrigger value="kyc" className="flex gap-2 items-center whitespace-nowrap">
            <UserCheck size={16} />
            <span>KYC</span>
          </TabsTrigger>
          <TabsTrigger value="bank" className="flex gap-2 items-center whitespace-nowrap">
            <CreditCard size={16} />
            <span>Bank</span>
          </TabsTrigger>
          <TabsTrigger value="history" className="flex gap-2 items-center whitespace-nowrap">
            <FileCheck size={16} />
            <span>History</span>
          </TabsTrigger>
        </TabsList>

        <TabsContent value="personal" className="space-y-6">
          <div className="bg-card rounded-lg border dark:border-[#2A3F3A] shadow-sm">
            <div className="p-6 border-b dark:border-[#2A3F3A]">
              <h3 className="text-xl font-semibold dark:text-[#F2F2F2]">Personal Information</h3>
            </div>
            <div className="p-6">
              {loading ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {Array.from({ length: 6 }).map((_, i) => (
                    <div key={i} className="space-y-2">
                      <Skeleton className="h-4 w-24" />
                      <Skeleton className="h-4 w-48" />
                    </div>
                  ))}
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <p className="text-sm text-muted-foreground">Full Name</p>
                    <p className="font-medium dark:text-[#F2F2F2]">{user.name}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Username</p>
                    <p className="font-medium dark:text-[#F2F2F2]">{user.username}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Contact no.</p>
                    <p className="font-medium dark:text-[#F2F2F2]">{user.phone}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Email</p>
                    <p className="font-medium dark:text-[#F2F2F2]">{user.email}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Status</p>
                    <p className="font-medium dark:text-[#F2F2F2]"><StatusBadge status={user.status} /></p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Joined Date</p>
                    <p className="font-medium dark:text-[#F2F2F2]">{user.joinedDate}</p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </TabsContent>

        {/* KYC Tab Content */}
        <TabsContent value="kyc" className="space-y-6">
          <div className="bg-card rounded-lg border dark:border-[#2A3F3A] shadow-sm">
            <div className="p-6 border-b dark:border-[#2A3F3A]">
              <h3 className="text-xl font-semibold dark:text-[#F2F2F2]">KYC Information</h3>
            </div>
            <div className="p-6">
              {loading ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <div key={i} className="space-y-2">
                      <Skeleton className="h-4 w-24" />
                      <Skeleton className="h-4 w-48" />
                    </div>
                  ))}
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <p className="text-sm text-muted-foreground">Aadhar Number</p>
                    <p className="font-medium dark:text-[#F2F2F2]">{user.kyc.aadharNumber}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Pan Number</p>
                    <p className="font-medium dark:text-[#F2F2F2]">{user.kyc.panNumber}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Aadhar Photo</p>
                    <p className="font-medium dark:text-[#F2F2F2]">{user.kyc.aadharPhoto}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Pan Photo</p>
                    <p className="font-medium dark:text-[#F2F2F2]">{user.kyc.panPhoto}</p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </TabsContent>

        {/* Bank Tab Content */}
        <TabsContent value="bank" className="space-y-6">
          <div className="bg-card rounded-lg border dark:border-[#2A3F3A] shadow-sm">
            <div className="p-6 border-b dark:border-[#2A3F3A]">
              <h3 className="text-xl font-semibold dark:text-[#F2F2F2]">Bank Details</h3>
            </div>
            <div className="p-6">
              {loading ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <div key={i} className="space-y-2">
                      <Skeleton className="h-4 w-24" />
                      <Skeleton className="h-4 w-48" />
                    </div>
                  ))}
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <p className="text-sm text-muted-foreground">Bank Name</p>
                    <p className="font-medium dark:text-[#F2F2F2]">{user.bank.name}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Account Holder</p>
                    <p className="font-medium dark:text-[#F2F2F2]">{user.bank.accountHolder}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Account Number</p>
                    <p className="font-medium dark:text-[#F2F2F2]">{user.bank.accountNumber}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">IFSC Code</p>
                    <p className="font-medium dark:text-[#F2F2F2]">{user.bank.ifsc}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Branch</p>
                    <p className="font-medium dark:text-[#F2F2F2]">{user.bank.branch}</p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </TabsContent>

        {/* History Tab Content */}
        <TabsContent value="history" className="space-y-6">
          {/* Transaction History */}
          <div className="bg-card rounded-lg border dark:border-[#2A3F3A] shadow-sm">
            <div className="p-6 border-b dark:border-[#2A3F3A]">
              <h3 className="text-xl font-semibold dark:text-[#F2F2F2]">Transaction History</h3>
            </div>
            <div className="p-4 overflow-x-auto">
              <div className="min-w-[600px]">
                <table className="w-full text-xs sm:text-sm">
                  <thead>
                    <tr className="border-b dark:border-[#2A3F3A]">
                      <th className="px-2 py-2 text-left font-medium text-muted-foreground whitespace-nowrap sm:px-4">ID</th>
                      <th className="px-2 py-2 text-left font-medium text-muted-foreground whitespace-nowrap sm:px-4">Type</th>
                      <th className="px-2 py-2 text-left font-medium text-muted-foreground whitespace-nowrap sm:px-4">Amount</th>
                      <th className="px-2 py-2 text-left font-medium text-muted-foreground whitespace-nowrap sm:px-4">Date</th>
                      <th className="px-2 py-2 text-left font-medium text-muted-foreground whitespace-nowrap sm:px-4">Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {loading ? (
                      Array.from({ length: 4 }).map((_, i) => (
                        <tr key={i} className="border-b dark:border-[#2A3F3A]">
                          <td className="px-2 py-3 sm:px-4"><Skeleton className="h-4 w-[80px]" /></td>
                          <td className="px-2 py-3 sm:px-4"><Skeleton className="h-4 w-[60px]" /></td>
                          <td className="px-2 py-3 sm:px-4"><Skeleton className="h-4 w-[70px]" /></td>
                          <td className="px-2 py-3 sm:px-4"><Skeleton className="h-4 w-[80px]" /></td>
                          <td className="px-2 py-3 sm:px-4"><Skeleton className="h-6 w-[70px] rounded-full" /></td>
                        </tr>
                      ))
                    ) : (
                      user.transactions.map((transaction) => (
                        <tr key={transaction.id} className="border-b dark:border-[#2A3F3A] hover:bg-muted/50">
                          <td className="px-2 py-3 text-sm dark:text-[#F2F2F2] whitespace-nowrap sm:px-4">{transaction.id}</td>
                          <td className="px-2 py-3 dark:text-[#F2F2F2] whitespace-nowrap sm:px-4">{transaction.type}</td>
                          <td className="px-2 py-3 font-medium dark:text-[#F2F2F2] whitespace-nowrap sm:px-4">{transaction.amount}</td>
                          <td className="px-2 py-3 text-sm dark:text-[#F2F2F2] whitespace-nowrap sm:px-4">{transaction.date}</td>
                          <td className="px-2 py-3 text-sm whitespace-nowrap sm:px-4">
                            <StatusBadge status={transaction.status} />
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          {/* Trading History */}
          <div className="bg-card rounded-lg border dark:border-[#2A3F3A] shadow-sm">
            <div className="p-6 border-b dark:border-[#2A3F3A]">
              <h3 className="text-xl font-semibold dark:text-[#F2F2F2]">Trading History</h3>
            </div>
            <div className="p-4 overflow-x-auto">
              <div className="min-w-[800px]">
                <table className="w-full text-xs sm:text-sm">
                  <thead>
                    <tr className="border-b dark:border-[#2A3F3A]">
                      <th className="px-2 py-2 text-left font-medium text-muted-foreground whitespace-nowrap sm:px-4">ID</th>
                      <th className="px-2 py-2 text-left font-medium text-muted-foreground whitespace-nowrap sm:px-4">Symbol</th>
                      <th className="px-2 py-2 text-left font-medium text-muted-foreground whitespace-nowrap sm:px-4">Quantity</th>
                      <th className="px-2 py-2 text-left font-medium text-muted-foreground whitespace-nowrap sm:px-4">Buy Price</th>
                      <th className="px-2 py-2 text-left font-medium text-muted-foreground whitespace-nowrap sm:px-4">Sell Price</th>
                      <th className="px-2 py-2 text-left font-medium text-muted-foreground whitespace-nowrap sm:px-4">Date</th>
                      <th className="px-2 py-2 text-left font-medium text-muted-foreground whitespace-nowrap sm:px-4">P/L</th>
                    </tr>
                  </thead>
                  <tbody>
                    {loading ? (
                      Array.from({ length: 3 }).map((_, i) => (
                        <tr key={i} className="border-b dark:border-[#2A3F3A]">
                          <td className="px-2 py-3 sm:px-4"><Skeleton className="h-4 w-[80px]" /></td>
                          <td className="px-2 py-3 sm:px-4"><Skeleton className="h-4 w-[60px]" /></td>
                          <td className="px-2 py-3 sm:px-4"><Skeleton className="h-4 w-[50px]" /></td>
                          <td className="px-2 py-3 sm:px-4"><Skeleton className="h-4 w-[80px]" /></td>
                          <td className="px-2 py-3 sm:px-4"><Skeleton className="h-4 w-[80px]" /></td>
                          <td className="px-2 py-3 sm:px-4"><Skeleton className="h-4 w-[80px]" /></td>
                          <td className="px-2 py-3 sm:px-4"><Skeleton className="h-4 w-[60px]" /></td>
                        </tr>
                      ))
                    ) : (
                      user.trades.map((trade) => (
                        <tr key={trade.id} className="border-b dark:border-[#2A3F3A] hover:bg-muted/50">
                          <td className="px-2 py-3 text-sm dark:text-[#F2F2F2] whitespace-nowrap sm:px-4">{trade.id}</td>
                          <td className="px-2 py-3 font-medium dark:text-[#F2F2F2] whitespace-nowrap sm:px-4">{trade.symbol}</td>
                          <td className="px-2 py-3 text-sm dark:text-[#F2F2F2] whitespace-nowrap sm:px-4">{trade.quantity}</td>
                          <td className="px-2 py-3 text-sm dark:text-[#F2F2F2] whitespace-nowrap sm:px-4">${trade.buyPrice}</td>
                          <td className="px-2 py-3 text-sm dark:text-[#F2F2F2] whitespace-nowrap sm:px-4">${trade.sellPrice}</td>
                          <td className="px-2 py-3 text-sm dark:text-[#F2F2F2] whitespace-nowrap sm:px-4">{trade.date}</td>
                          <td className="px-2 py-3 text-sm text-[#42cf70] font-medium whitespace-nowrap sm:px-4">
                            <span className={trade.profitLoss.startsWith('+') ? 'text-success' : 'text-destructive'}>
                              {trade.profitLoss}
                            </span>
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          {/* Loan Information */}
          <div className="bg-card rounded-lg border dark:border-[#2A3F3A] shadow-sm">
            <div className="p-6 border-b dark:border-[#2A3F3A]">
              <h3 className="text-xl font-semibold dark:text-[#F2F2F2]">Loan Information</h3>
            </div>
            <div className="p-4 overflow-x-auto">
              <div className="min-w-[600px]">
                <table className="w-full text-xs sm:text-sm">
                  <thead>
                    <tr className="border-b dark:border-[#2A3F3A]">
                      <th className="px-2 py-2 text-left font-medium text-muted-foreground whitespace-nowrap sm:px-4">ID</th>
                      <th className="px-2 py-2 text-left font-medium text-muted-foreground whitespace-nowrap sm:px-4">Amount</th>
                      <th className="px-2 py-2 text-left font-medium text-muted-foreground whitespace-nowrap sm:px-4">Duration</th>
                      <th className="px-2 py-2 text-left font-medium text-muted-foreground whitespace-nowrap sm:px-4">Date</th>
                      <th className="px-2 py-2 text-left font-medium text-muted-foreground whitespace-nowrap sm:px-4">Status</th>
                      <th className="px-2 py-2 text-left font-medium text-muted-foreground whitespace-nowrap sm:px-4">Remaining</th>
                    </tr>
                  </thead>
                  <tbody>
                    {loading ? (
                      Array.from({ length: 2 }).map((_, i) => (
                        <tr key={i} className="border-b dark:border-[#2A3F3A]">
                          <td className="px-2 py-3 sm:px-4"><Skeleton className="h-4 w-[60px]" /></td>
                          <td className="px-2 py-3 sm:px-4"><Skeleton className="h-4 w-[80px]" /></td>
                          <td className="px-2 py-3 sm:px-4"><Skeleton className="h-4 w-[70px]" /></td>
                          <td className="px-2 py-3 sm:px-4"><Skeleton className="h-4 w-[80px]" /></td>
                          <td className="px-2 py-3 sm:px-4"><Skeleton className="h-6 w-[70px] rounded-full" /></td>
                          <td className="px-2 py-3 sm:px-4"><Skeleton className="h-4 w-[60px]" /></td>
                        </tr>
                      ))
                    ) : (
                      user.loans.map((loan) => (
                        <tr key={loan.id} className="border-b dark:border-[#2A3F3A] hover:bg-muted/50">
                          <td className="px-2 py-3 text-sm dark:text-[#F2F2F2] whitespace-nowrap sm:px-4">{loan.id}</td>
                          <td className="px-2 py-3 font-medium dark:text-[#F2F2F2] whitespace-nowrap sm:px-4">{loan.amount}</td>
                          <td className="px-2 py-3 text-sm dark:text-[#F2F2F2] whitespace-nowrap sm:px-4">{loan.duration}</td>
                          <td className="px-2 py-3 text-sm dark:text-[#F2F2F2] whitespace-nowrap sm:px-4">{loan.date}</td>
                          <td className="px-2 py-3 text-sm whitespace-nowrap sm:px-4">
                            <StatusBadge status={loan.status} />
                          </td>
                          <td className="px-2 py-3 text-sm dark:text-[#F2F2F2] whitespace-nowrap sm:px-4">{loan.remaining}</td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default UserProfile;