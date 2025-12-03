'use client';

import React, { useState, useEffect } from 'react';
import { PlusCircle, Edit, CheckCircle, XCircle, Banknote, CreditCard } from 'lucide-react';
import { Skeleton } from '@/components/ui/skeleton';
import { Switch } from '@/components/ui/switch';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import api from '../../../utils/axios';

const AddAccount = () => {
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState({
    upiId: '',
    businessName: '',
    bankName: '',
    accountNumber: '',
    ifscCode: '',
    accountName: ''
  });
  const [accounts, setAccounts] = useState([]);
  const [activeAccount, setActiveAccount] = useState(null);
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [accountToEdit, setAccountToEdit] = useState(null);
  const [isFormDirty, setIsFormDirty] = useState(false);
  const [showBankDetails, setShowBankDetails] = useState(true);
  const [loadingSetting, setLoadingSetting] = useState(true);

  useEffect(() => {
    // Fetch bank details visibility setting
    const fetchBankDetailsSetting = async () => {
      try {
        const response = await api.get('/admin/get-bank-details-visibility');
        // Handle ApiResponse format (statusCode, success, data)
        if (response.data.success === true || response.data.statusCode === 200) {
          setShowBankDetails(response.data.data?.showBankDetails ?? true);
        }
      } catch (error) {
        console.error('Failed to fetch bank details visibility setting:', error);
      } finally {
        setLoadingSetting(false);
      }
    };

    // Simulate API fetch
    const fetchData = async () => {
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      const mockAccounts = [
        {
          id: 1,
          upiId: 'developer.aditya09@oksbi',
          businessName: 'Aditya Patel',
          bankName: 'State Bank Of India',
          accountNumber: '98656565323',
          ifscCode: 'SBIN8965432',
          accountName: 'Aditya Patel',
          isActive: true,
          createdAt: '2023-05-15'
        },
        {
          id: 2,
          upiId: 'business.old@oksbi',
          businessName: 'Old Business',
          bankName: 'HDFC Bank',
          accountNumber: '1234567890',
          ifscCode: 'HDFC0001234',
          accountName: 'Old Business',
          isActive: false,
          createdAt: '2023-01-10'
        }
      ];
      
      setAccounts(mockAccounts);
      setActiveAccount(mockAccounts.find(acc => acc.isActive) || null);
      setLoading(false);
    };

    fetchData();
    fetchBankDetailsSetting();
  }, []);

  const handleToggleBankDetails = async (checked) => {
    // Optimistically update the UI
    const previousValue = showBankDetails;
    setShowBankDetails(checked);
    
    try {
      const response = await api.post('/admin/update-bank-details-visibility', {
        showBankDetails: checked
      });
      // Handle ApiResponse format (statusCode, success, data)
      if (response.data.success === true || response.data.statusCode === 200) {
        // State already updated optimistically, just confirm
        console.log('Bank details visibility updated successfully');
      } else {
        // Revert on unexpected response
        setShowBankDetails(previousValue);
        alert('Failed to update setting. Please try again.');
      }
    } catch (error) {
      console.error('Failed to update bank details visibility setting:', error);
      // Revert on error
      setShowBankDetails(previousValue);
      const errorMessage = error.response?.data?.message || error.message || 'Failed to update setting. Please try again.';
      alert(errorMessage);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    setIsFormDirty(true);
  };

  const handleAddAccount = () => {
    if (!formData.upiId || !formData.bankName) return;
    
    const newAccount = {
      id: accounts.length + 1,
      ...formData,
      isActive: false,
      createdAt: new Date().toISOString().split('T')[0]
    };
    
    setAccounts(prev => [...prev, newAccount]);
    setFormData({
      upiId: '',
      businessName: '',
      bankName: '',
      accountNumber: '',
      ifscCode: '',
      accountName: ''
    });
    setIsFormDirty(false);
  };

  const handleEditAccount = (account) => {
    setAccountToEdit(account);
    setEditDialogOpen(true);
  };

  const handleSaveEdit = () => {
    setAccounts(prev => 
      prev.map(acc => 
        acc.id === accountToEdit.id ? { ...accountToEdit } : acc
      )
    );
    
    if (activeAccount?.id === accountToEdit.id) {
      setActiveAccount(accountToEdit);
    }
    
    setEditDialogOpen(false);
    setAccountToEdit(null);
  };

  const handleActivateAccount = (accountId) => {
    setAccounts(prev => 
      prev.map(acc => ({
        ...acc,
        isActive: acc.id === accountId
      }))
    );
    setActiveAccount(accounts.find(acc => acc.id === accountId));
  };

  const handleDeactivateAccount = () => {
    setAccounts(prev => 
      prev.map(acc => ({
        ...acc,
        isActive: false
      }))
    );
    setActiveAccount(null);
  };

  return (
    <div className="space-y-8">
      {/* Heading */}
      <h1 className="text-2xl font-bold dark:text-[#F2F2F2]">Add Bank Account</h1>
      
      {/* Add UPI & Bank Details Form */}
      <div className="bg-card rounded-lg border dark:border-[#2A3F3A] shadow-sm p-6">
        <h2 className="text-xl font-semibold mb-4 dark:text-[#F2F2F2]">Add UPI & Bank Details</h2>
        
        {loading ? (
          <div className="space-y-4">
            <Skeleton className="h-10 w-full" />
            <Skeleton className="h-10 w-full" />
            <Skeleton className="h-10 w-full" />
            <Skeleton className="h-10 w-full" />
            <Skeleton className="h-10 w-full" />
            <Skeleton className="h-10 w-full" />
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-sm font-medium dark:text-[#F2F2F2]">UPI ID</label>
              <input
                type="text"
                required
                name="upiId"
                value={formData.upiId}
                onChange={handleInputChange}
                className="w-full p-2 border rounded dark:bg-[#1E3730] dark:border-[#2A3F3A] dark:text-[#F2F2F2]"
                placeholder="demoupi@oksbi"
              />
            </div>
            
            <div className="space-y-2">
              <label className="text-sm font-medium dark:text-[#F2F2F2]">Business Name</label>
              <input
                type="text"
                name="businessName"
                value={formData.businessName}
                onChange={handleInputChange}
                className="w-full p-2 border rounded dark:bg-[#1E3730] dark:border-[#2A3F3A] dark:text-[#F2F2F2]"
                placeholder="Forex Flow"
              />
            </div>
            
            <div className="space-y-2">
              <label className="text-sm font-medium dark:text-[#F2F2F2]">Bank Name</label>
              <input
                type="text"
                name="bankName"
                value={formData.bankName}
                onChange={handleInputChange}
                className="w-full p-2 border rounded dark:bg-[#1E3730] dark:border-[#2A3F3A] dark:text-[#F2F2F2]"
                placeholder="Name of bank"
              />
            </div>
            
            <div className="space-y-2">
              <label className="text-sm font-medium dark:text-[#F2F2F2]">Account Number</label>
              <input
                type="text"
                name="accountNumber"
                value={formData.accountNumber}
                onChange={handleInputChange}
                className="w-full p-2 border rounded dark:bg-[#1E3730] dark:border-[#2A3F3A] dark:text-[#F2F2F2]"
                placeholder="1234XXXXXXXX"
              />
            </div>
            
            <div className="space-y-2">
              <label className="text-sm font-medium dark:text-[#F2F2F2]">IFSC Code</label>
              <input
                type="text"
                name="ifscCode"
                value={formData.ifscCode}
                onChange={handleInputChange}
                className="w-full p-2 border rounded dark:bg-[#1E3730] dark:border-[#2A3F3A] dark:text-[#F2F2F2]"
                placeholder="SBINXXXXXXX"
              />
            </div>
            
            <div className="space-y-2">
              <label className="text-sm font-medium dark:text-[#F2F2F2]">Account Name</label>
              <input
                type="text"
                name="accountName"
                value={formData.accountName}
                onChange={handleInputChange}
                className="w-full p-2 border rounded dark:bg-[#1E3730] dark:border-[#2A3F3A] dark:text-[#F2F2F2]"
                placeholder="XYZ"
              />
            </div>
            
            {isFormDirty && (
              <div className="flex gap-2 md:col-span-2 justify-end">
                <button
                  onClick={() => {
                    setFormData({
                      upiId: '',
                      businessName: '',
                      bankName: '',
                      accountNumber: '',
                      ifscCode: '',
                      accountName: ''
                    });
                    setIsFormDirty(false);
                  }}
                  className="px-4 py-2 border rounded dark:border-[#2A3F3A] dark:text-[#F2F2F2] hover:bg-gray-100 dark:hover:bg-[#1E3730]"
                >
                  Cancel
                </button>
                <button
                  onClick={handleAddAccount}
                  className="px-4 py-2 bg-[#43B852] text-white rounded hover:bg-[#0E1F1B]"
                >
                  <PlusCircle className="inline mr-2 w-4 h-4" />
                  Add Account
                </button>
              </div>
            )}
          </div>
        )}
      </div>
      
      {/* Currently Activated Account - Enhanced Design */}
      <div className="bg-card rounded-lg border dark:border-[#2A3F3A] shadow-sm p-6">
        <h2 className="text-xl font-semibold mb-4 dark:text-[#F2F2F2]">Currently Activated Account</h2>
        
        {loading ? (
          <div className="space-y-4">
            <Skeleton className="h-20 w-full" />
          </div>
        ) : activeAccount ? (
          <div className="border rounded-lg p-6 dark:border-[#2A3F3A] bg-gradient-to-r from-[#f0f9ff] to-[#e0f2fe] dark:from-[#0F1F1B] dark:to-[#0F1F1B]">
            <div className="flex flex-col md:flex-row gap-6">
              {/* UPI Details Card */}
              <div className="flex-1 bg-white dark:bg-[#142924] p-4 rounded-lg shadow-sm border dark:border-[#2A3F3A]">
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-2 bg-blue-100 dark:bg-blue-900 rounded-full">
                    <CreditCard className="w-5 h-5 text-blue-600 dark:text-blue-300" />
                  </div>
                  <h3 className="font-medium text-lg dark:text-[#F2F2F2]">UPI Details</h3>
                </div>
                <div className="space-y-2 pl-2">
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-medium w-24 dark:text-[#ABBAB6]">UPI ID:</span>
                    <span className="text-sm dark:text-[#F2F2F2]">{activeAccount.upiId}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-medium w-24 dark:text-[#ABBAB6]">Business:</span>
                    <span className="text-sm dark:text-[#F2F2F2]">{activeAccount.businessName}</span>
                  </div>
                </div>
              </div>
              
              {/* Bank Details Card */}
              <div className="flex-1 bg-white dark:bg-[#142924] p-4 rounded-lg shadow-sm border dark:border-[#2A3F3A]">
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-2 bg-green-100 dark:bg-green-900 rounded-full">
                    <Banknote className="w-5 h-5 text-green-600 dark:text-green-300" />
                  </div>
                  <h3 className="font-medium text-lg dark:text-[#F2F2F2]">Bank Details</h3>
                </div>
                <div className="space-y-2 pl-2">
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-medium w-24 dark:text-[#ABBAB6]">Bank:</span>
                    <span className="text-sm dark:text-[#F2F2F2]">{activeAccount.bankName}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-medium w-24 dark:text-[#ABBAB6]">Account:</span>
                    <span className="text-sm dark:text-[#F2F2F2]">{activeAccount.accountNumber}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-medium w-24 dark:text-[#ABBAB6]">IFSC:</span>
                    <span className="text-sm dark:text-[#F2F2F2]">{activeAccount.ifscCode}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-medium w-24 dark:text-[#ABBAB6]">Name:</span>
                    <span className="text-sm dark:text-[#F2F2F2]">{activeAccount.accountName}</span>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Bank Details Visibility Toggle */}
            <div className="mt-6 p-4 bg-white dark:bg-[#142924] rounded-lg border dark:border-[#2A3F3A]">
              <div className="flex items-center justify-between">
                <div className="flex-1">
                  <h4 className="font-medium text-sm dark:text-[#F2F2F2] mb-1">Show Bank Details to Users</h4>
                  <p className="text-xs text-muted-foreground dark:text-[#ABBAB6]">
                    {showBankDetails 
                      ? 'Users will see both UPI and Bank Transfer options during deposit'
                      : 'Users will only see UPI option during deposit'}
                  </p>
                </div>
                {loadingSetting ? (
                  <Skeleton className="h-6 w-11 rounded-full" />
                ) : (
                  <Switch
                    checked={showBankDetails}
                    onCheckedChange={handleToggleBankDetails}
                  />
                )}
              </div>
            </div>
            
            <div className="mt-4 flex justify-end">
              <button
                onClick={handleDeactivateAccount}
                className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 flex items-center gap-2"
              >
                <XCircle className="w-5 h-5" />
                Deactivate Account
              </button>
            </div>
          </div>
        ) : (
          <div className="text-center py-8 dark:text-[#F2F2F2] bg-gray-50 dark:bg-[#1E3730] rounded-lg border dark:border-[#2A3F3A]">
            <div className="flex flex-col items-center justify-center space-y-2">
              <XCircle className="w-10 h-10 text-gray-400 dark:text-gray-500" />
              <p className="text-lg font-medium">No account currently activated</p>
              <p className="text-sm text-gray-500 dark:text-gray-400">Add and activate an account to see details here</p>
            </div>
          </div>
        )}
      </div>
      
      {/* Accounts Table */}
      <div className="bg-card rounded-lg border dark:border-[#2A3F3A] shadow-sm">
        <div className="p-6 border-b dark:border-[#2A3F3A]">
          <h2 className="text-xl font-semibold dark:text-[#F2F2F2]">Bank Accounts</h2>
          <p className="text-sm text-muted-foreground mt-1 dark:text-[#ABBAB6]">Manage your bank accounts</p>
        </div>
        <div className="p-4 overflow-x-auto">
          <div className="min-w-[800px]">
            <table className="w-full text-xs sm:text-sm">
              <thead>
                <tr className="border-b dark:border-[#2A3F3A]">
                  <th className="px-2 py-2 text-left font-medium text-muted-foreground whitespace-nowrap dark:text-[#ABBAB6] sm:px-4">UPI ID</th>
                  <th className="px-2 py-2 text-left font-medium text-muted-foreground whitespace-nowrap dark:text-[#ABBAB6] sm:px-4">Business Name</th>
                  <th className="px-2 py-2 text-left font-medium text-muted-foreground whitespace-nowrap dark:text-[#ABBAB6] sm:px-4">Bank Name</th>
                  <th className="px-2 py-2 text-left font-medium text-muted-foreground whitespace-nowrap dark:text-[#ABBAB6] sm:px-4">Account Number</th>
                  <th className="px-2 py-2 text-left font-medium text-muted-foreground whitespace-nowrap dark:text-[#ABBAB6] sm:px-4">IFSC Code</th>
                  <th className="px-2 py-2 text-left font-medium text-muted-foreground whitespace-nowrap dark:text-[#ABBAB6] sm:px-4">Status</th>
                  <th className="px-2 py-2 text-left font-medium text-muted-foreground whitespace-nowrap dark:text-[#ABBAB6] sm:px-4">Actions</th>
                </tr>
              </thead>
              <tbody>
                {loading ? (
                  Array.from({ length: 2 }).map((_, index) => (
                    <tr key={index} className="border-b dark:border-[#2A3F3A]">
                      <td className="px-2 py-3 sm:px-4"><Skeleton className="h-4 w-[120px]" /></td>
                      <td className="px-2 py-3 sm:px-4"><Skeleton className="h-4 w-[100px]" /></td>
                      <td className="px-2 py-3 sm:px-4"><Skeleton className="h-4 w-[120px]" /></td>
                      <td className="px-2 py-3 sm:px-4"><Skeleton className="h-4 w-[100px]" /></td>
                      <td className="px-2 py-3 sm:px-4"><Skeleton className="h-4 w-[80px]" /></td>
                      <td className="px-2 py-3 sm:px-4"><Skeleton className="h-6 w-[70px] rounded-full" /></td>
                      <td className="px-2 py-3 sm:px-4">
                        <div className="flex gap-1">
                          <Skeleton className="h-8 w-8 rounded" />
                          <Skeleton className="h-8 w-8 rounded" />
                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  accounts.map((account) => (
                    <tr key={account.id} className="border-b dark:border-[#2A3F3A] hover:bg-muted/50">
                      <td className="px-2 py-3 text-sm dark:text-[#F2F2F2] whitespace-nowrap sm:px-4">{account.upiId}</td>
                      <td className="px-2 py-3 text-sm dark:text-[#F2F2F2] whitespace-nowrap sm:px-4">{account.businessName}</td>
                      <td className="px-2 py-3 text-sm dark:text-[#F2F2F2] whitespace-nowrap sm:px-4">{account.bankName}</td>
                      <td className="px-2 py-3 text-sm dark:text-[#F2F2F2] whitespace-nowrap sm:px-4">{account.accountNumber}</td>
                      <td className="px-2 py-3 text-sm dark:text-[#F2F2F2] whitespace-nowrap sm:px-4">{account.ifscCode}</td>
                      <td className="px-2 py-3 sm:px-4">
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                          account.isActive 
                            ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300'
                            : 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300'
                        }`}>
                          {account.isActive ? 'Active' : 'Inactive'}
                        </span>
                      </td>
                      <td className="px-2 py-3 whitespace-nowrap sm:px-4">
                        <div className="flex gap-1">
                          <button
                            onClick={() => handleEditAccount(account)}
                            className="p-1.5 rounded-md border bg-blue-500/20 text-blue-400 border-blue-500/30 hover:bg-blue-500/30"
                          >
                            <Edit className="w-3 h-3" />
                          </button>
                          {account.isActive ? (
                            <button
                              onClick={handleDeactivateAccount}
                              className="p-1.5 rounded-md border bg-red-500/20 text-red-400 border-red-500/30 hover:bg-red-500/30"
                            >
                              <XCircle className="w-3 h-3" />
                            </button>
                          ) : (
                            <button
                              onClick={() => handleActivateAccount(account.id)}
                              className="p-1.5 rounded-md border bg-green-500/20 text-green-400 border-green-500/30 hover:bg-green-500/30"
                            >
                              <CheckCircle className="w-3 h-3" />
                            </button>
                          )}
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
      
      {/* Edit Dialog */}
      <Dialog open={editDialogOpen} onOpenChange={setEditDialogOpen}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle className='dark:text-white'>Edit Account Details</DialogTitle>
          </DialogHeader>
          {accountToEdit && (
            <div className="grid grid-cols-1 dark:text-white md:grid-cols-2 gap-4 py-4">
              <div className="space-y-2">
                <label className="text-sm font-medium dark:text-[#ABBAB6]">UPI ID</label>
                <input
                  type="text"
                  value={accountToEdit.upiId}
                  onChange={(e) => setAccountToEdit({...accountToEdit, upiId: e.target.value})}
                  className="w-full bg-transparent p-2 border rounded"
                />
              </div>
              
              <div className="space-y-2">
                <label className="text-sm font-medium dark:text-[#ABBAB6]">Business Name</label>
                <input
                  type="text"
                  value={accountToEdit.businessName}
                  onChange={(e) => setAccountToEdit({...accountToEdit, businessName: e.target.value})}
                  className="w-full p-2 bg-transparent border rounded"
                />
              </div>
              
              <div className="space-y-2">
                <label className="text-sm font-medium dark:text-[#ABBAB6]">Bank Name</label>
                <input
                  type="text"
                  value={accountToEdit.bankName}
                  onChange={(e) => setAccountToEdit({...accountToEdit, bankName: e.target.value})}
                  className="w-full p-2 bg-transparent border rounded"
                />
              </div>
              
              <div className="space-y-2">
                <label className="text-sm font-medium dark:text-[#ABBAB6]">Account Number</label>
                <input
                  type="text"
                  value={accountToEdit.accountNumber}
                  onChange={(e) => setAccountToEdit({...accountToEdit, accountNumber: e.target.value})}
                  className="w-full p-2 bg-transparent border rounded"
                />
              </div>
              
              <div className="space-y-2">
                <label className="text-sm font-medium dark:text-[#ABBAB6]">IFSC Code</label>
                <input
                  type="text"
                  value={accountToEdit.ifscCode}
                  onChange={(e) => setAccountToEdit({...accountToEdit, ifscCode: e.target.value})}
                  className="w-full p-2 bg-transparent border rounded"
                />
              </div>
              
              <div className="space-y-2">
                <label className="text-sm font-medium dark:text-[#ABBAB6]">Account Name</label>
                <input
                  type="text"
                  value={accountToEdit.accountName}
                  onChange={(e) => setAccountToEdit({...accountToEdit, accountName: e.target.value})}
                  className="w-full p-2 bg-transparent border rounded"
                />
              </div>
              
              <div className="md:col-span-2 flex justify-end gap-2 pt-4">
                <button
                  onClick={() => setEditDialogOpen(false)}
                  className="px-4 py-2 border rounded"
                >
                  Cancel
                </button>
                <button
                  onClick={handleSaveEdit}
                  className="px-4 py-2 bg-[#43B852] text-white rounded hover:bg-[#0E1F1B]"
                >
                  Save Changes
                </button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AddAccount;