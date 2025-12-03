'use client';

import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { CheckCircle } from 'lucide-react';
import { Skeleton } from '@/components/ui/skeleton';

const currencyPairs = [
  { value: 'EUR/USD', label: 'EUR/USD – Euro / US Dollar' },
  { value: 'USD/JPY', label: 'USD/JPY – US Dollar / Japanese Yen' },
  { value: 'GBP/USD', label: 'GBP/USD – British Pound / US Dollar' },
  { value: 'USD/CHF', label: 'USD/CHF – US Dollar / Swiss Franc' },
  { value: 'AUD/USD', label: 'AUD/USD – Australian Dollar / US Dollar' },
  { value: 'USD/CAD', label: 'USD/CAD – US Dollar / Canadian Dollar' },
  { value: 'NZD/USD', label: 'NZD/USD – New Zealand Dollar / US Dollar' },
  // EUR Crosses
  { value: 'EUR/GBP', label: 'EUR/GBP' },
  { value: 'EUR/JPY', label: 'EUR/JPY' },
  { value: 'EUR/CHF', label: 'EUR/CHF' },
  { value: 'EUR/AUD', label: 'EUR/AUD' },
  { value: 'EUR/CAD', label: 'EUR/CAD' },
  { value: 'EUR/NZD', label: 'EUR/NZD' },
  { value: 'EUR/SEK', label: 'EUR/SEK' },
  { value: 'EUR/NOK', label: 'EUR/NOK' },
  { value: 'EUR/TRY', label: 'EUR/TRY' },
  // GBP Crosses
  { value: 'GBP/JPY', label: 'GBP/JPY' },
  { value: 'GBP/CHF', label: 'GBP/CHF' },
  { value: 'GBP/AUD', label: 'GBP/AUD' },
  { value: 'GBP/CAD', label: 'GBP/CAD' },
  { value: 'GBP/NZD', label: 'GBP/NZD' },
  { value: 'GBP/SGD', label: 'GBP/SGD' },
  // Other Crosses
  { value: 'AUD/JPY', label: 'AUD/JPY' },
  { value: 'AUD/NZD', label: 'AUD/NZD' },
  { value: 'AUD/CHF', label: 'AUD/CHF' },
  { value: 'AUD/CAD', label: 'AUD/CAD' },
  { value: 'NZD/JPY', label: 'NZD/JPY' },
  { value: 'NZD/CHF', label: 'NZD/CHF' },
  { value: 'CAD/JPY', label: 'CAD/JPY' },
  { value: 'CHF/JPY', label: 'CHF/JPY' },
  // Exotic Pairs
  { value: 'USD/TRY', label: 'USD/TRY – Turkish Lira' },
  { value: 'USD/SEK', label: 'USD/SEK – Swedish Krona' },
  { value: 'USD/NOK', label: 'USD/NOK – Norwegian Krone' },
  { value: 'USD/DKK', label: 'USD/DKK – Danish Krone' },
  { value: 'USD/ZAR', label: 'USD/ZAR – South African Rand' },
  { value: 'USD/HKD', label: 'USD/HKD – Hong Kong Dollar' },
  { value: 'USD/SGD', label: 'USD/SGD – Singapore Dollar' },
  { value: 'USD/THB', label: 'USD/THB – Thai Baht' },
  { value: 'USD/MXN', label: 'USD/MXN – Mexican Peso' },
  { value: 'USD/CNY', label: 'USD/CNY – Chinese Yuan' },
  { value: 'USD/PLN', label: 'USD/PLN – Polish Zloty' },
  { value: 'USD/RUB', label: 'USD/RUB – Russian Ruble' },
  { value: 'USD/INR', label: 'USD/INR – Indian Rupee' },
  { value: 'USD/BRL', label: 'USD/BRL – Brazilian Real' },
  { value: 'USD/KRW', label: 'USD/KRW – South Korean Won' },
  { value: 'EUR/ZAR', label: 'EUR/ZAR' },
  { value: 'GBP/ZAR', label: 'GBP/ZAR' },
  { value: 'AUD/SGD', label: 'AUD/SGD' },
  { value: 'EUR/SGD', label: 'EUR/SGD' },
];

const initialFormData = {
  symbol: '',
  type: '',
  quantity: '',
  buyPrice: '',
};

const TradesOrderRequest = () => {
  const [formData, setFormData] = useState(initialFormData);
  const [showSuccessDialog, setShowSuccessDialog] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate loading delay
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1500);
    return () => clearTimeout(timer);
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSelectChange = (name, value) => {
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const calculateTotal = () => {
    const quantity = parseFloat(formData.quantity) || 0;
    const buyPrice = parseFloat(formData.buyPrice) || 0;
    return (quantity * buyPrice).toFixed(2);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.symbol || !formData.type || !formData.quantity || !formData.buyPrice) {
      return;
    }
    setShowSuccessDialog(true);
    setFormData(initialFormData);
  };

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold dark:text-[#F2F2F2]">Request to Buy</h1>

      <div className="rounded-lg border dark:border-[#2A3F3A] shadow-sm p-6 dark:bg-[#142924]">
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            {/* Symbol Select */}
            <div className="space-y-2">
              <Label htmlFor="symbol" className="dark:text-[#F2F2F2]">Symbol</Label>
              {loading ? (
                <Skeleton className="h-10 w-full rounded-md" />
              ) : (
                <Select
                  required
                  value={formData.symbol}
                  onValueChange={(value) => handleSelectChange('symbol', value)}
                >
                  <SelectTrigger className="dark:border-[#2A3F3A] dark:bg-[#142924] dark:text-[#F2F2F2]">
                    <SelectValue placeholder="Select currency pair" />
                  </SelectTrigger>
                  <SelectContent className="dark:bg-[#142924] dark:border-[#2A3F3A]">
                  <div className="px-2 py-1 text-sm font-bold dark:text-[#F2F2F2]">
                    Major Pairs
                  </div>
                  {currencyPairs.slice(0, 7).map(pair => (
                    <SelectItem 
                      key={pair.value} 
                      value={pair.value}
                      className="dark:hover:bg-[#2A3F3A] dark:focus:bg-[#2A3F3A]"
                    >
                      {pair.label}
                    </SelectItem>
                  ))}
                  <div className="px-2 py-1 text-sm font-bold dark:text-[#F2F2F2]">
                    Minor Pairs (Crosses)
                  </div>
                  <div className="pl-2 px-2 py-1 text-sm font-semibold dark:text-[#F2F2F2]">
                    EUR Crosses
                  </div>
                  {currencyPairs.slice(7, 16).map(pair => (
                    <SelectItem 
                      key={pair.value} 
                      value={pair.value}
                      className="pl-4 dark:hover:bg-[#2A3F3A] dark:focus:bg-[#2A3F3A]"
                    >
                      {pair.label}
                    </SelectItem>
                  ))}
                  <div className="pl-2 px-2 py-1 text-sm font-semibold dark:text-[#F2F2F2]">
                    GBP Crosses
                  </div>
                  {currencyPairs.slice(16, 22).map(pair => (
                    <SelectItem 
                      key={pair.value} 
                      value={pair.value}
                      className="pl-4 dark:hover:bg-[#2A3F3A] dark:focus:bg-[#2A3F3A]"
                    >
                      {pair.label}
                    </SelectItem>
                  ))}
                  <div className="pl-2 px-2 py-1 text-sm font-semibold dark:text-[#F2F2F2]">
                    Other Crosses
                  </div>
                  {currencyPairs.slice(22, 30).map(pair => (
                    <SelectItem 
                      key={pair.value} 
                      value={pair.value}
                      className="pl-4 dark:hover:bg-[#2A3F3A] dark:focus:bg-[#2A3F3A]"
                    >
                      {pair.label}
                    </SelectItem>
                  ))}
                  <div className="px-2 py-1 text-sm font-bold dark:text-[#F2F2F2]">
                    Exotic Pairs
                  </div>
                  {currencyPairs.slice(30).map(pair => (
                    <SelectItem 
                      key={pair.value} 
                      value={pair.value}
                      className="dark:hover:bg-[#2A3F3A] dark:focus:bg-[#2A3F3A]"
                    >
                      {pair.label}
                    </SelectItem>
                  ))}
                </SelectContent>
                </Select>
              )}
            </div>

            {/* Trade Type Select */}
            <div className="space-y-2">
              <Label htmlFor="type" className="dark:text-[#F2F2F2]">Trade Type</Label>
              {loading ? (
                <Skeleton className="h-10 w-full rounded-md" />
              ) : (
                <Select
                  required
                  value={formData.type}
                  onValueChange={(value) => handleSelectChange('type', value)}
                >
                  <SelectTrigger className="dark:border-[#2A3F3A] dark:bg-[#142924] dark:text-[#F2F2F2]">
                    <SelectValue placeholder="Select trade type" />
                  </SelectTrigger>
                  <SelectContent className="dark:bg-[#142924] dark:border-[#2A3F3A]">
                    <SelectItem value="long" className="dark:hover:bg-[#2A3F3A]">Long</SelectItem>
                    <SelectItem value="short" className="dark:hover:bg-[#2A3F3A]">Short</SelectItem>
                  </SelectContent>
                </Select>
              )}
            </div>

            {/* Quantity Input */}
            <div className="space-y-2">
              <Label htmlFor="quantity" className="dark:text-[#F2F2F2]">Quantity</Label>
              {loading ? (
                <Skeleton className="h-10 w-full rounded-md" />
              ) : (
                <Input
                  id="quantity"
                  name="quantity"
                  type="number"
                  value={formData.quantity}
                  onChange={handleChange}
                  className="dark:border-[#2A3F3A] dark:bg-[#142924] dark:text-[#F2F2F2]"
                  placeholder="Enter quantity"
                  required
                />
              )}
            </div>

            {/* Buy Price Input */}
            <div className="space-y-2">
              <Label htmlFor="buyPrice" className="dark:text-[#F2F2F2]">Buy Price</Label>
              {loading ? (
                <Skeleton className="h-10 w-full rounded-md" />
              ) : (
                <Input
                  id="buyPrice"
                  name="buyPrice"
                  type="number"
                  step="0.0001"
                  value={formData.buyPrice}
                  onChange={handleChange}
                  className="dark:border-[#2A3F3A] dark:bg-[#142924] dark:text-[#F2F2F2]"
                  placeholder="Enter buy price"
                  required
                />
              )}
            </div>
          </div>

          {/* Total Amount */}
          <div className="p-4 rounded-md bg-gray-100 dark:bg-[#2A3F3A]">
            {loading ? (
              <div className="flex justify-between items-center">
                <Skeleton className="h-4 w-24" />
                <Skeleton className="h-6 w-32" />
              </div>
            ) : (
              <div className="flex justify-between items-center">
                <span className="font-medium dark:text-[#F2F2F2]">Total Amount</span>
                <span className="text-lg font-bold dark:text-[#F2F2F2]">
                  ${calculateTotal()}
                </span>
              </div>
            )}
          </div>

          {/* Submit Button */}
          <div className="flex justify-end">
            {loading ? (
              <Skeleton className="h-10 w-40 rounded-md" />
            ) : (
              <Button 
                type="submit" 
                className="bg-primary text-primary-foreground rounded-md hover:bg-primary/90 transition-colors"
              >
                Submit Order Request
              </Button>
            )}
          </div>
        </form>
      </div>

      {/* Success Dialog */}
      <Dialog open={showSuccessDialog} onOpenChange={setShowSuccessDialog}>
        <DialogContent className="sm:max-w-[425px] dark:bg-[#1A2E24] dark:border-[#2A3F3A]">
          <DialogHeader>
            <DialogTitle className="dark:text-[#F2F2F2]">Order Successful</DialogTitle>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="flex flex-col items-center space-y-2">
              <CheckCircle className="w-12 h-12 text-green-500" />
              <p className="text-center dark:text-[#F2F2F2]">
                Your trade order has been placed successfully!
              </p>
            </div>
          </div>
          <div className="flex justify-end">
            <Button onClick={() => setShowSuccessDialog(false)}>
              Close
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default TradesOrderRequest;