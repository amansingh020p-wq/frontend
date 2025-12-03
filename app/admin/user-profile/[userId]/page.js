'use client';
import React, { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../../../../components/ui/tabs';
import { Users, CreditCard, UserCheck, FileCheck, ArrowLeft } from 'lucide-react';
import StatusBadge from '../../../../components/ui/StatusBadge';
import { Skeleton } from '@/components/ui/skeleton';
import api from '../../../../utils/axios';

const UserProfile = () => {
  const params = useParams();
  const router = useRouter();
  const userId = params?.userId;
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);
  const [transactions, setTransactions] = useState([]);
  const [trades, setTrades] = useState([]);
  const [activeTab, setActiveTab] = useState("personal");
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!userId) return;

    const fetchUserData = async () => {
      try {
        setLoading(true);
        setError(null);

        // Fetch user details
        const userResponse = await api.get(`/admin/get-user/${userId}`);
        
        if (userResponse.data.status === 'success' && userResponse.data.data) {
          const userData = userResponse.data.data;
          const balanceInfo = userData.balanceInfo || {};

          // Format user data
          const formattedUser = {
            name: userData.name || 'Unknown User',
            username: `@${(userData.email || 'user').split('@')[0]}`,
            phone: userData.phone || 'Not provided',
            email: userData.email || 'Not provided',
            generatedPassword: userData.generatedPassword || 'Not generated yet',
            status: userData.isVerified ? 'verified' : 'pending',
            joinedDate: userData.createdAt 
              ? new Date(userData.createdAt).toLocaleDateString('en-US', { 
                  year: 'numeric', 
                  month: '2-digit', 
                  day: '2-digit' 
                })
              : 'Unknown',
            userPhoto: userData.userPhoto || '',
            kyc: {
              aadharNumber: userData.aadharNo || 'Not provided',
              panNumber: userData.pan || 'Not provided',
              aadharPhoto: userData.aadharPhoto || '',
              panPhoto: userData.panPhoto || '',
              profilePhoto: userData.userPhoto || '',
              passbookPhoto: userData.passbookPhoto || ''
            },
            bank: {
              name: userData.bankName || 'Not provided',
              accountHolder: userData.accountHolder || 'Not provided',
              accountNumber: userData.accountNumber ? `****${userData.accountNumber.slice(-4)}` : 'Not provided',
              ifsc: userData.ifscCode || 'Not provided',
              branch: userData.address || 'Not provided'
            },
            balanceInfo: {
              accountBalance: balanceInfo.accountBalance || 0,
              totalDeposit: balanceInfo.totalDeposit || 0,
              totalWithdrawals: balanceInfo.totalWithdrawals || 0,
              orderInvestment: balanceInfo.orderInvestment || 0,
              profitLoss: balanceInfo.profitLoss || 0
            }
          };

          setUser(formattedUser);

          // Fetch transaction history - use admin endpoint
          try {
            console.log('Fetching transactions for userId:', userId);
            const transactionsResponse = await api.get(`/admin/get-user-transactions/${userId}`);
            console.log('Transactions response:', transactionsResponse.data);
            
            // Handle both ApiResponse format (statusCode, data, success) and custom format (status, data)
            const isApiResponse = transactionsResponse.data?.statusCode !== undefined || transactionsResponse.data?.success !== undefined;
            const isSuccess = isApiResponse 
              ? (transactionsResponse.data?.success === true || transactionsResponse.data?.statusCode === 200)
              : (transactionsResponse.data?.status === 'success');
            
            if (isSuccess) {
              const transactionsData = isApiResponse 
                ? (transactionsResponse.data.data || [])
                : (transactionsResponse.data.data || []);
              console.log('Transactions data:', transactionsData);
              
              const userTransactions = transactionsData.map(t => ({
                id: t._id?.toString() || t.transactionId || 'N/A',
                type: t.type || 'Unknown',
                amount: `$${(t.amount || 0).toLocaleString()}`,
                date: t.timestamp 
                  ? new Date(t.timestamp).toLocaleDateString('en-US', { 
                      year: 'numeric', 
                      month: '2-digit', 
                      day: '2-digit' 
                    })
                  : t.createdAt
                  ? new Date(t.createdAt).toLocaleDateString('en-US', { 
                      year: 'numeric', 
                      month: '2-digit', 
                      day: '2-digit' 
                    })
                  : 'N/A',
                status: (t.status || 'pending').toLowerCase()
              }));
              
              console.log('Formatted transactions:', userTransactions);
              setTransactions(userTransactions);
            } else {
              console.warn('Unexpected response format:', transactionsResponse.data);
              setTransactions([]);
            }
          } catch (transError) {
            console.error('Error fetching transactions:', transError);
            console.error('Error details:', {
              message: transError.message,
              response: transError.response?.data,
              status: transError.response?.status
            });
            setTransactions([]);
          }

          // Fetch trading/order history - use admin endpoint
          try {
            const tradesResponse = await api.get(`/admin/get-user-trade-history/${userId}`);
            if (tradesResponse.data?.status === 'success') {
              const tradesData = tradesResponse.data.data || [];
              const userTrades = tradesData.map(t => ({
                id: t.id || t._id || 'N/A',
                symbol: t.symbol || 'N/A',
                quantity: t.quantity || 0,
                buyPrice: t.buyPrice || 0,
                sellPrice: t.sellPrice || 0,
                date: t.date 
                  ? new Date(t.date).toLocaleDateString('en-US', { 
                      year: 'numeric', 
                      month: '2-digit', 
                      day: '2-digit' 
                    })
                  : t.createdAt
                  ? new Date(t.createdAt).toLocaleDateString('en-US', { 
                      year: 'numeric', 
                      month: '2-digit', 
                      day: '2-digit' 
                    })
                  : 'N/A',
                profitLoss: t.profitLoss || '$0'
              }));
              setTrades(userTrades);
            }
          } catch (tradesError) {
            console.error('Error fetching trades:', tradesError);
            // If admin endpoint doesn't exist, trades will remain empty
            setTrades([]);
          }
        } else {
          setError('User not found');
        }
      } catch (err) {
        console.error('Error fetching user data:', err);
        setError(err.response?.data?.message || 'Failed to load user data');
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, [userId]);

  if (error && !loading) {
    return (
      <div className="space-y-6">
        <div className="flex items-center gap-4">
          <button
            onClick={() => router.back()}
            className="p-2 rounded-md border dark:border-[#2A3F3A] hover:bg-muted"
          >
            <ArrowLeft className="w-5 h-5 text-white" />
          </button>
          <h1 className="text-2xl font-bold dark:text-[#F2F2F2]">User Profile</h1>
        </div>
        <div className="bg-red-100 dark:bg-red-900/20 border border-red-400 dark:border-red-500 text-red-700 dark:text-red-300 px-4 py-3 rounded">
          <p>{error}</p>
        </div>
      </div>
    );
  }

  if (loading && !user) {
    return (
      <div className="space-y-6">
        <div className="flex items-center gap-4">
          <button
            onClick={() => router.back()}
            className="p-2 rounded-md border dark:border-[#2A3F3A] hover:bg-muted"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <h1 className="text-2xl font-bold dark:text-[#F2F2F2]">User Profile</h1>
        </div>
        <div className="space-y-4">
          <Skeleton className="h-32 w-full rounded-lg" />
          <Skeleton className="h-10 w-full rounded-lg" />
          <Skeleton className="h-96 w-full rounded-lg" />
        </div>
      </div>
    );
  }

  if (!user) {
    return null;
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <button
          onClick={() => router.back()}
          className="p-2 rounded-md border dark:border-[#2A3F3A] hover:bg-muted"
        >
          <ArrowLeft className="w-5 h-5 text-white" />
        </button>
        <h1 className="text-2xl font-bold dark:text-[#F2F2F2]">User Profile</h1>
      </div>

      {/* User Summary Card */}
      <div className="bg-card rounded-lg border dark:border-[#2A3F3A] shadow-sm overflow-hidden">
        <div className="p-6 flex flex-col md:flex-row gap-6 items-start md:items-center">
          <div className="h-20 w-20 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0">
            {user.userPhoto ? (
              <img 
                src={user.userPhoto} 
                alt={user.name}
                className="h-full w-full rounded-full object-cover"
              />
            ) : (
              <span className="font-semibold text-3xl text-primary">
                {user.name.split(' ').map(name => name[0]).join('')}
              </span>
            )}
          </div>

          <div className="flex-1 w-full">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-2">
              <div>
                <h2 className="text-2xl font-semibold dark:text-[#F2F2F2]">{user.name}</h2>
                <p className="text-muted-foreground dark:text-[#ABBAB6]">{user.username}</p>
              </div>
              <StatusBadge status={user.status} className="px-3 py-1 text-sm" />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
              <div>
                <p className="text-sm text-muted-foreground dark:text-[#ABBAB6]">Email</p>
                <p className='dark:text-[#F2F2F2] text-sm'>{user.email}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground dark:text-[#ABBAB6]">Phone</p>
                <p className='dark:text-[#F2F2F2] text-sm'>{user.phone}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground dark:text-[#ABBAB6]">Generated Password</p>
                <p className='dark:text-[#F2F2F2] text-sm font-mono'>{user.generatedPassword}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground dark:text-[#ABBAB6]">Joined</p>
                <p className='dark:text-[#F2F2F2] text-sm'>{user.joinedDate}</p>
              </div>
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
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <p className="text-sm text-muted-foreground dark:text-[#ABBAB6]">Full Name</p>
                  <p className="font-medium dark:text-[#F2F2F2]">{user.name}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground dark:text-[#ABBAB6]">Username</p>
                  <p className="font-medium dark:text-[#F2F2F2]">{user.username}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground dark:text-[#ABBAB6]">Contact no.</p>
                  <p className="font-medium dark:text-[#F2F2F2]">{user.phone}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground dark:text-[#ABBAB6]">Email</p>
                  <p className="font-medium dark:text-[#F2F2F2]">{user.email}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground dark:text-[#ABBAB6]">Generated Password</p>
                  <p className="font-medium dark:text-[#F2F2F2] font-mono">{user.generatedPassword}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground dark:text-[#ABBAB6]">Status</p>
                  <p className="font-medium dark:text-[#F2F2F2]">
                    <StatusBadge status={user.status} />
                  </p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground dark:text-[#ABBAB6]">Joined Date</p>
                  <p className="font-medium dark:text-[#F2F2F2]">{user.joinedDate}</p>
                </div>
              </div>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="kyc" className="space-y-6">
          <div className="bg-card rounded-lg border dark:border-[#2A3F3A] shadow-sm">
            <div className="p-6 border-b dark:border-[#2A3F3A]">
              <h3 className="text-xl font-semibold dark:text-[#F2F2F2]">KYC Information</h3>
            </div>
            <div className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <p className="text-sm text-muted-foreground dark:text-[#ABBAB6]">Aadhar Number</p>
                  <p className="font-medium dark:text-[#F2F2F2]">{user.kyc.aadharNumber}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground dark:text-[#ABBAB6]">Pan Number</p>
                  <p className="font-medium dark:text-[#F2F2F2]">{user.kyc.panNumber}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground dark:text-[#ABBAB6]">Aadhar Photo</p>
                  <p className="font-medium dark:text-[#F2F2F2]">
                    {user.kyc.aadharPhoto ? (
                      <span className="text-green-500">Uploaded</span>
                    ) : (
                      <span className="text-gray-500">Not uploaded</span>
                    )}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground dark:text-[#ABBAB6]">Pan Photo</p>
                  <p className="font-medium dark:text-[#F2F2F2]">
                    {user.kyc.panPhoto ? (
                      <span className="text-green-500">Uploaded</span>
                    ) : (
                      <span className="text-gray-500">Not uploaded</span>
                    )}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground dark:text-[#ABBAB6]">Passbook Photo</p>
                  <p className="font-medium dark:text-[#F2F2F2]">
                    {user.kyc.passbookPhoto ? (
                      <span className="text-green-500">Uploaded</span>
                    ) : (
                      <span className="text-gray-500">Not uploaded</span>
                    )}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="bank" className="space-y-6">
          <div className="bg-card rounded-lg border dark:border-[#2A3F3A] shadow-sm">
            <div className="p-6 border-b dark:border-[#2A3F3A]">
              <h3 className="text-xl font-semibold dark:text-[#F2F2F2]">Bank Details</h3>
            </div>
            <div className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <p className="text-sm text-muted-foreground dark:text-[#ABBAB6]">Bank Name</p>
                  <p className="font-medium dark:text-[#F2F2F2]">{user.bank.name}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground dark:text-[#ABBAB6]">Account Holder</p>
                  <p className="font-medium dark:text-[#F2F2F2]">{user.bank.accountHolder}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground dark:text-[#ABBAB6]">Account Number</p>
                  <p className="font-medium dark:text-[#F2F2F2]">{user.bank.accountNumber}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground dark:text-[#ABBAB6]">IFSC Code</p>
                  <p className="font-medium dark:text-[#F2F2F2]">{user.bank.ifsc}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground dark:text-[#ABBAB6]">Branch</p>
                  <p className="font-medium dark:text-[#F2F2F2]">{user.bank.branch}</p>
                </div>
              </div>
            </div>
          </div>
        </TabsContent>

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
                    {transactions.length === 0 ? (
                      <tr>
                        <td colSpan={5} className="px-4 py-8 text-center text-muted-foreground">
                          No transactions found
                        </td>
                      </tr>
                    ) : (
                      transactions.map((transaction) => (
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
                    {trades.length === 0 ? (
                      <tr>
                        <td colSpan={7} className="px-4 py-8 text-center text-muted-foreground">
                          No trading history found
                        </td>
                      </tr>
                    ) : (
                      trades.map((trade) => (
                        <tr key={trade.id} className="border-b dark:border-[#2A3F3A] hover:bg-muted/50">
                          <td className="px-2 py-3 text-sm dark:text-[#F2F2F2] whitespace-nowrap sm:px-4">{trade.id}</td>
                          <td className="px-2 py-3 font-medium dark:text-[#F2F2F2] whitespace-nowrap sm:px-4">{trade.symbol}</td>
                          <td className="px-2 py-3 text-sm dark:text-[#F2F2F2] whitespace-nowrap sm:px-4">{trade.quantity}</td>
                          <td className="px-2 py-3 text-sm dark:text-[#F2F2F2] whitespace-nowrap sm:px-4">${trade.buyPrice}</td>
                          <td className="px-2 py-3 text-sm dark:text-[#F2F2F2] whitespace-nowrap sm:px-4">${trade.sellPrice}</td>
                          <td className="px-2 py-3 text-sm dark:text-[#F2F2F2] whitespace-nowrap sm:px-4">{trade.date}</td>
                          <td className="px-2 py-3 text-sm font-medium whitespace-nowrap sm:px-4">
                            <span className={trade.profitLoss.startsWith('+') ? 'text-green-500' : 'text-red-500'}>
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
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default UserProfile;

