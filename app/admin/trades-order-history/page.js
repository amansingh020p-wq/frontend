'use client';

import React, { useState, useEffect } from 'react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../../../components/ui/select";
import StatusBadge from '../../../components/ui/StatusBadge';
import ActionButton from '../../../components/ui/ActionButton';
import { Skeleton } from '@/components/ui/skeleton';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Check, X, Eye, Edit } from 'lucide-react';
import api from '@/utils/axios'; // Make sure this path is correct

const currencyPairs = [
  { value: 'EUR/USD', label: 'EUR/USD – Euro / US Dollar' },
  { value: 'USD/JPY', label: 'USD/JPY – US Dollar / Japanese Yen' },
  { value: 'GBP/USD', label: 'GBP/USD – British Pound / US Dollar' },
  { value: 'USD/CHF', label: 'USD/CHF – US Dollar / Swiss Franc' },
  { value: 'AUD/USD', label: 'AUD/USD – Australian Dollar / US Dollar' },
  { value: 'USD/CAD', label: 'USD/CAD – US Dollar / Canadian Dollar' },
  { value: 'NZD/USD', label: 'NZD/USD – New Zealand Dollar / US Dollar' },
  // Add more currency pairs as needed...
];

const TradesOrderHistory = () => {
  const [loading, setLoading] = useState(false);
  const [usersLoading, setUsersLoading] = useState(true);
  const [users, setUsers] = useState([]);
  const [tradingHistory, setTradingHistory] = useState([]);
  const [selectedUser, setSelectedUser] = useState('');
  const [showBuyTradeModal, setShowBuyTradeModal] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [tradeData, setTradeData] = useState({
    symbol: '',
    tradeType: 'long',
    quantity: '',
    buyPrice: '',
    priceRangeLow: '',
    priceRangeHigh: ''
  });
  const [toasts, setToasts] = useState([]);
  const [showEditModal, setShowEditModal] = useState(false);
  const [currentTrade, setCurrentTrade] = useState(null);
  const [editFormData, setEditFormData] = useState({
    symbol: '',
    quantity: '',
    buyPrice: '',
    sellPrice: '',
    type: 'long',
    status: 'open',
    priceRangeLow: '',
    priceRangeHigh: ''
  });

  // Fetch all users on component mount
  useEffect(() => {
    fetchUsers();
  }, []);

  // Fetch trade history when user is selected
  useEffect(() => {
    if (selectedUser) {
      fetchTradeHistory(selectedUser);
    } else {
      setTradingHistory([]);
    }
  }, [selectedUser]);

  const fetchUsers = async () => {
    try {
      setUsersLoading(true);
      const response = await api.get('/admin/get-all-users');
      
      if (response.data.status === 'success') {
        // Map the data to match frontend expectations
        const formattedUsers = response.data.data.map(user => ({
          id: user._id,
          name: user.name,
          email: user.email
        }));
        setUsers(formattedUsers);
      }
    } catch (error) {
      console.error('Error fetching users:', error);
      addToast('error', 'Failed to fetch users');
    } finally {
      setUsersLoading(false);
    }
  };

  const fetchTradeHistory = async (userId) => {
    try {
      setLoading(true);
      const response = await api.get(`/admin/get-user-trade-history/${userId}`);
      
      if (response.data.status === 'success') {
        setTradingHistory(response.data.data);
      }
    } catch (error) {
      console.error('Error fetching trade history:', error);
      addToast('error', 'Failed to fetch trade history');
      setTradingHistory([]);
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setTradeData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const calculateTotal = () => {
    const quantity = parseFloat(tradeData.quantity) || 0;
    const price = parseFloat(tradeData.buyPrice) || 0;
    return (quantity * price).toFixed(2);
  };

  const handleBuyTrade = async () => {
    try {
      const tradePayload = {
        userId: selectedUser,
        symbol: tradeData.symbol,
        tradeType: tradeData.tradeType,
        quantity: parseFloat(tradeData.quantity),
        buyPrice: parseFloat(tradeData.buyPrice),
        priceRangeLow: tradeData.priceRangeLow ? parseFloat(tradeData.priceRangeLow) : null,
        priceRangeHigh: tradeData.priceRangeHigh ? parseFloat(tradeData.priceRangeHigh) : null
      };

      const response = await api.post('/admin/create-trade', tradePayload);

      if (response.data.status === 'success') {
        // Refresh trade history
        await fetchTradeHistory(selectedUser);
        
        // Show success modal
        setShowBuyTradeModal(false);
        setShowSuccessModal(true);
        addToast('success', 'Trade created successfully!');

        // Reset form
        setTradeData({
          symbol: '',
          tradeType: 'long',
          quantity: '',
          buyPrice: '',
          priceRangeLow: '',
          priceRangeHigh: ''
        });
      }
    } catch (error) {
      console.error('Error creating trade:', error);
      addToast('error', 'Failed to create trade');
    }
  };

  const handleEditClick = (trade) => {
    setCurrentTrade(trade);
    setEditFormData({
      symbol: trade.symbol,
      quantity: trade.quantity.toString(),
      buyPrice: trade.buyPrice.toString(),
      sellPrice: trade.sellPrice ? trade.sellPrice.toString() : '',
      type: trade.type.toLowerCase(),
      status: trade.status,
      priceRangeLow: trade.priceRange?.low ? trade.priceRange.low.toString() : '',
      priceRangeHigh: trade.priceRange?.high ? trade.priceRange.high.toString() : ''
    });
    setShowEditModal(true);
  };

  const handleEditInputChange = (e) => {
    const { name, value } = e.target;
    setEditFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSaveChanges = async () => {
    try {
      const updatePayload = {
        symbol: editFormData.symbol,
        quantity: parseFloat(editFormData.quantity),
        buyPrice: parseFloat(editFormData.buyPrice),
        sellPrice: editFormData.sellPrice ? parseFloat(editFormData.sellPrice) : null,
        type: editFormData.type.toUpperCase(),
        status: editFormData.status.toUpperCase(),
        priceRangeLow: editFormData.priceRangeLow ? parseFloat(editFormData.priceRangeLow) : null,
        priceRangeHigh: editFormData.priceRangeHigh ? parseFloat(editFormData.priceRangeHigh) : null
      };

      const response = await api.put(`/admin/update-trade/${currentTrade.id}`, updatePayload);

      if (response.data.status === 'success') {
        // Refresh trade history
        await fetchTradeHistory(selectedUser);
        setShowEditModal(false);
        addToast('success', 'Trade updated successfully!');
      }
    } catch (error) {
      console.error('Error updating trade:', error);
      addToast('error', 'Failed to update trade');
    }
  };

  const selectedUserName = users.find(u => u.id === selectedUser)?.name || '';

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

  return (
    <div className="space-y-6">
      <div className="fixed top-4 mt-16 mr-4 md:mr-0 right-4 z-50 space-y-3">
        {toasts.map((toast) => (
          <Toast key={toast.id} {...toast} />
        ))}
      </div>
      
      <h1 className="text-2xl font-bold dark:text-[#F2F2F2]">Trade Order History</h1>

      <div className="flex items-center gap-4 dark:text-[#F2F2F2]">
        <div className="w-64">
          <Select value={selectedUser} onValueChange={setSelectedUser} disabled={usersLoading}>
            <SelectTrigger>
              <SelectValue placeholder={usersLoading ? "Loading users..." : "Select a user"} />
            </SelectTrigger>
            <SelectContent>
              {users.map((user) => (
                <SelectItem key={user.id} value={user.id}>
                  {user.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {selectedUser && (
          <Button
            variant="default"
            onClick={() => setShowBuyTradeModal(true)}
            className="transition-all duration-200 ease-in-out hover:scale-[1.02]"
          >
            Buy Trade
          </Button>
        )}
      </div>

      {selectedUser && (
        <div className="bg-card rounded-lg border dark:border-[#2A3F3A] shadow-sm">
          <div className="p-6 border-b dark:border-[#2A3F3A]">
            <h2 className="text-xl font-semibold dark:text-[#F2F2F2]">Trading History</h2>
            {loading ? (
              <Skeleton className="h-4 w-64 mt-1" />
            ) : (
              <p className="text-sm text-muted-foreground mt-1">
                Viewing trade history for {selectedUserName}
              </p>
            )}
          </div>
          <div className="p-4 overflow-x-auto">
            <div className="min-w-[800px]">
              <table className="w-full text-xs sm:text-sm">
                <thead>
                  <tr className="border-b dark:border-[#2A3F3A]">
                    <th className="px-2 py-2 text-left font-medium text-muted-foreground whitespace-nowrap dark:text-[#ABBAB6] sm:px-4">Date</th>
                    <th className="px-2 py-2 text-left font-medium text-muted-foreground whitespace-nowrap dark:text-[#ABBAB6] sm:px-4">Symbol</th>
                    <th className="px-2 py-2 text-left font-medium text-muted-foreground whitespace-nowrap dark:text-[#ABBAB6] sm:px-4">Quantity</th>
                    <th className="px-2 py-2 text-left font-medium text-muted-foreground whitespace-nowrap dark:text-[#ABBAB6] sm:px-4">Buy Price</th>
                    <th className="px-2 py-2 text-left font-medium text-muted-foreground whitespace-nowrap dark:text-[#ABBAB6] sm:px-4">Sell Price</th>
                    <th className="px-2 py-2 text-left font-medium text-muted-foreground whitespace-nowrap dark:text-[#ABBAB6] sm:px-4">Type</th>
                    <th className="px-2 py-2 text-left font-medium text-muted-foreground whitespace-nowrap dark:text-[#ABBAB6] sm:px-4">P/L</th>
                    <th className="px-2 py-2 text-left font-medium text-muted-foreground whitespace-nowrap dark:text-[#ABBAB6] sm:px-4">Status</th>
                    <th className="px-2 py-2 text-left font-medium text-muted-foreground whitespace-nowrap dark:text-[#ABBAB6] sm:px-4">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {loading ? (
                    Array.from({ length: 5 }).map((_, index) => (
                      <tr key={index} className="border-b dark:border-[#2A3F3A]">
                        <td className="px-2 py-3 sm:px-4"><Skeleton className="h-4 w-[80px]" /></td>
                        <td className="px-2 py-3 sm:px-4"><Skeleton className="h-4 w-[60px]" /></td>
                        <td className="px-2 py-3 sm:px-4"><Skeleton className="h-4 w-[50px]" /></td>
                        <td className="px-2 py-3 sm:px-4"><Skeleton className="h-4 w-[80px]" /></td>
                        <td className="px-2 py-3 sm:px-4"><Skeleton className="h-4 w-[80px]" /></td>
                        <td className="px-2 py-3 sm:px-4"><Skeleton className="h-4 w-[90px]" /></td>
                        <td className="px-2 py-3 sm:px-4"><Skeleton className="h-4 w-[70px]" /></td>
                        <td className="px-2 py-3 sm:px-4"><Skeleton className="h-6 w-[70px] rounded-full" /></td>
                        <td className="px-2 py-3 sm:px-4"><Skeleton className="h-8 w-8 rounded" /></td>
                      </tr>
                    ))
                  ) : tradingHistory.length > 0 ? (
                    tradingHistory.map((trade) => (
                      <tr key={trade.id} className="border-b dark:border-[#2A3F3A] hover:bg-muted/50">
                        <td className="px-2 py-3 text-sm dark:text-[#F2F2F2] whitespace-nowrap sm:px-4">{trade.date}</td>
                        <td className="px-2 py-3 font-medium dark:text-[#F2F2F2] whitespace-nowrap sm:px-4">{trade.symbol}</td>
                        <td className="px-2 py-3 text-sm dark:text-[#F2F2F2] whitespace-nowrap sm:px-4">{trade.quantity}</td>
                        <td className="px-2 py-3 text-sm dark:text-[#F2F2F2] whitespace-nowrap sm:px-4">${trade.buyPrice}</td>
                        <td className="px-2 py-3 text-sm dark:text-[#F2F2F2] whitespace-nowrap sm:px-4">{trade.sellPrice ? `$${trade.sellPrice}` : '-'}</td>
                        <td className="px-2 py-3 text-sm dark:text-[#F2F2F2] whitespace-nowrap sm:px-4">{trade.type}</td>
                        <td className="px-2 py-3 text-sm font-medium whitespace-nowrap sm:px-4">
                          <span className={trade.profitLoss.startsWith('+') ? 'text-green-500' : trade.profitLoss.startsWith('-') ? 'text-red-500' : 'text-gray-500'}>
                            {trade.profitLoss}
                          </span>
                        </td>
                        <td className="px-2 py-3 text-sm whitespace-nowrap sm:px-4">
                          <StatusBadge status={trade.status} />
                        </td>
                        <td className="px-2 py-3 whitespace-nowrap sm:px-4">
                          <ActionButton
                            type="edit"
                            onClick={() => handleEditClick(trade)}
                          />
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="9" className="px-4 py-8 text-center text-muted-foreground">
                        No trade history found for this user.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {!selectedUser && !usersLoading && (
        <div className="bg-card rounded-lg border dark:border-[#2A3F3A] shadow-sm p-16 flex flex-col items-center justify-center">
          <h2 className="text-xl font-medium text-muted-foreground">Select a User</h2>
          <p className="text-center text-muted-foreground mt-2">
            Please select a user from the dropdown to view their trading history.
          </p>
        </div>
      )}

      {/* Buy Trade Modal */}
      <Dialog open={showBuyTradeModal} onOpenChange={setShowBuyTradeModal}>
        <DialogContent className="sm:max-w-[450px] p-6 dark:text-white transition-all duration-300 ease-in-out max-h-[80vh] flex flex-col">
          <DialogHeader>
            <DialogTitle className="dark:text-[#F2F2F2]">Buy Trade</DialogTitle>
            <DialogDescription className="dark:text-[#ABBAB6]">
              Create a new trade for {selectedUserName}
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4 overflow-y-auto flex-1 pr-2">
            <div className="space-y-2">
              <Label htmlFor="user" className="dark:text-[#F2F2F2]">
                User
              </Label>
              <Input
                id="user"
                value={selectedUserName}
                disabled
                className="dark:text-white"
              />
            </div>
            <div className="space-y-2 dark:text-white">
              <Label htmlFor="symbol" className="dark:text-[#F2F2F2]">
                Symbol
              </Label>
              <Select
                value={tradeData.symbol}
                onValueChange={(value) => setTradeData({ ...tradeData, symbol: value })}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select a symbol" />
                </SelectTrigger>
                <SelectContent className="max-h-[300px] overflow-y-auto">
                  {currencyPairs.map((pair) => (
                    <SelectItem key={pair.value} value={pair.value}>
                      {pair.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="tradeType" className="dark:text-[#F2F2F2]">
                Trade Type
              </Label>
              <Select
                value={tradeData.tradeType}
                onValueChange={(value) => setTradeData({ ...tradeData, tradeType: value })}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select trade type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="long">Long</SelectItem>
                  <SelectItem value="short">Short</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="quantity" className="dark:text-[#F2F2F2]">
                Quantity
              </Label>
              <Input
                id="quantity"
                name="quantity"
                type="number"
                value={tradeData.quantity}
                onChange={handleInputChange}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="buyPrice" className="dark:text-[#F2F2F2]">
                Buy Price
              </Label>
              <Input
                id="buyPrice"
                name="buyPrice"
                type="number"
                step="0.01"
                value={tradeData.buyPrice}
                onChange={handleInputChange}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="total" className="dark:text-[#F2F2F2]">
                Total Amount
              </Label>
              <Input
                id="total"
                value={`$${calculateTotal()}`}
                disabled
                className="font-medium"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="priceRangeLow" className="dark:text-[#F2F2F2]">
                Price Range (Low)
              </Label>
              <Input
                id="priceRangeLow"
                name="priceRangeLow"
                type="number"
                step="0.01"
                value={tradeData.priceRangeLow}
                onChange={handleInputChange}
                placeholder="Minimum price for simulation"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="priceRangeHigh" className="dark:text-[#F2F2F2]">
                Price Range (High)
              </Label>
              <Input
                id="priceRangeHigh"
                name="priceRangeHigh"
                type="number"
                step="0.01"
                value={tradeData.priceRangeHigh}
                onChange={handleInputChange}
                placeholder="Maximum price for simulation"
              />
            </div>
            
          </div>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setShowBuyTradeModal(false)}
              className="transition-all duration-200 ease-in-out hover:scale-[1.02] mt-4 md:mt-0"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              onClick={handleBuyTrade}
              disabled={!tradeData.symbol || !tradeData.quantity || !tradeData.buyPrice}
              className="transition-all duration-200 ease-in-out hover:scale-[1.02]"
            >
              Buy
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Success Modal */}
      <Dialog open={showSuccessModal} onOpenChange={setShowSuccessModal}>
        <DialogContent className="sm:max-w-[425px] transition-all duration-300 ease-in-out">
          <DialogHeader>
            <DialogTitle className="dark:text-[#F2F2F2]">Trade Successful</DialogTitle>
            <DialogDescription className="dark:text-[#ABBAB6]">
              The trade has been successfully created for {selectedUserName}
            </DialogDescription>
          </DialogHeader>
          <div className="py-4">
            <p className="text-center dark:text-[#F2F2F2]">
              Trade details have been recorded successfully.
            </p>
          </div>
          <DialogFooter>
            <Button
              onClick={() => setShowSuccessModal(false)}
              className="w-full transition-all duration-200 ease-in-out hover:scale-[1.02]"
            >
              Close
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Edit Trade Modal */}
      <Dialog open={showEditModal} onOpenChange={setShowEditModal}>
        <DialogContent className="sm:max-w-[500px] dark:text-white transition-all duration-300 ease-in-out max-h-[90vh] flex flex-col">
          <DialogHeader>
            <DialogTitle className="dark:text-[#F2F2F2]">Edit Trade</DialogTitle>
            <DialogDescription className="dark:text-[#ABBAB6]">
              Edit trade details for {selectedUserName}
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4 overflow-y-auto flex-1 pr-2">
            <div className="space-y-2 dark:text-white">
              <Label htmlFor="edit-symbol" className="dark:text-[#F2F2F2]">
                Symbol
              </Label>
              <Select
                value={editFormData.symbol}
                onValueChange={(value) => setEditFormData({ ...editFormData, symbol: value })}
              >
                <SelectTrigger>
                  <SelectValue placeholder={editFormData.symbol || "Select a symbol"} />
                </SelectTrigger>
                <SelectContent className="max-h-[300px] overflow-y-auto">
                  {currencyPairs.map((pair) => (
                    <SelectItem key={pair.value} value={pair.value}>
                      {pair.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="edit-quantity" className="dark:text-[#F2F2F2]">
                Quantity
              </Label>
              <Input
                id="edit-quantity"
                name="quantity"
                type="number"
                value={editFormData.quantity}
                onChange={handleEditInputChange}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="edit-buyPrice" className="dark:text-[#F2F2F2]">
                Buy Price
              </Label>
              <Input
                id="edit-buyPrice"
                name="buyPrice"
                type="number"
                step="0.01"
                value={editFormData.buyPrice}
                onChange={handleEditInputChange}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="edit-sellPrice" className="dark:text-[#F2F2F2]">
                Sell Price
              </Label>
              <Input
                id="edit-sellPrice"
                name="sellPrice"
                type="number"
                step="0.01"
                value={editFormData.sellPrice}
                onChange={handleEditInputChange}
                placeholder="Leave empty if not sold"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="edit-type" className="dark:text-[#F2F2F2]">
                Trade Type
              </Label>
              <Select
                value={editFormData.type}
                onValueChange={(value) => setEditFormData({ ...editFormData, type: value })}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select trade type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="long">Long</SelectItem>
                  <SelectItem value="short">Short</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="edit-status" className="dark:text-[#F2F2F2]">
                Status
              </Label>
              <Select
                value={editFormData.status}
                onValueChange={(value) => setEditFormData({ ...editFormData, status: value })}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="open">Open</SelectItem>
                  <SelectItem value="closed">Closed</SelectItem>
                  <SelectItem value="pending">Pending</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="edit-priceRangeLow" className="dark:text-[#F2F2F2]">
                Price Range (Low)
              </Label>
              <Input
                id="edit-priceRangeLow"
                name="priceRangeLow"
                type="number"
                step="0.01"
                value={editFormData.priceRangeLow}
                onChange={handleEditInputChange}
                placeholder="Minimum price for simulation"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="edit-priceRangeHigh" className="dark:text-[#F2F2F2]">
                Price Range (High)
              </Label>
              <Input
                id="edit-priceRangeHigh"
                name="priceRangeHigh"
                type="number"
                step="0.01"
                value={editFormData.priceRangeHigh}
                onChange={handleEditInputChange}
                placeholder="Maximum price for simulation"
              />
            </div>
            
          </div>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setShowEditModal(false)}
              className="transition-all duration-200 ease-in-out hover:scale-[1.02] mt-4 md:mt-0"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              onClick={handleSaveChanges}
              className="transition-all duration-200 ease-in-out hover:scale-[1.02]"
            >
              Save Changes
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default TradesOrderHistory;