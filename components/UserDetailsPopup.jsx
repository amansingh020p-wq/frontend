'use client';

import { useState } from 'react';
import { 
  X, User, Phone, Mail, FileText, Banknote, BarChart2, 
  WalletCards, CreditCard, TrendingUp, Wallet, Image as ImageIcon
} from 'lucide-react';
import Image from 'next/image';

const UserDetailsPopup = ({ user, onClose, showImages = false, showForex = false }) => {
  const [viewImage, setViewImage] = useState(null);

  if (!user) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      {/* Main Popup */}
      <div className="bg-white dark:bg-[#142924] rounded-xl shadow-xl w-full max-w-4xl max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="sticky top-0 bg-white dark:bg-[#142924] p-4 border-b dark:border-[#2A3F3A] flex justify-between items-center">
          <h2 className="text-xl font-bold dark:text-[#F2F2F2]">User Details: {user.name}</h2>
          <button
            onClick={onClose}
            className="text-gray-500 dark:text-[#ABBAB6] hover:text-gray-700 dark:hover:text-white"
          >
            <X className="w-6 h-6" />
          </button>
        </div>
        
        {/* Content */}
        <div className="p-6 space-y-8">
          {/* Personal Info Section with Profile Image */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <User className="w-5 h-5 text-blue-500" />
              <h3 className="text-lg font-semibold dark:text-[#F2F2F2]">Personal Information</h3>
            </div>
            
            {/* Profile Image Circle - Only shown if showImages is true */}
            {showImages && (
              <div className="flex flex-col md:flex-row items-center gap-6">
                <div className="relative w-20 h-20 rounded-full overflow-hidden border-2 border-gray-300 dark:border-[#2A3F3A]">
                  <Image
                    src={user.personalInfo.profileImage}
                    alt="Profile"
                    fill
                    className="object-cover"
                  />
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 flex-1">
                  <div className="bg-gray-50 dark:bg-[#1E3730] p-4 rounded-lg">
                    <div className="flex items-center gap-2 mb-2">
                      <User className="w-4 h-4 text-gray-500 dark:text-[#ABBAB6]" />
                      <span className="text-sm text-gray-500 dark:text-[#ABBAB6]">Full Name</span>
                    </div>
                    <p className="font-medium dark:text-[#F2F2F2]">{user.personalInfo.name}</p>
                  </div>
                  <div className="bg-gray-50 dark:bg-[#1E3730] p-4 rounded-lg">
                    <div className="flex items-center gap-2 mb-2">
                      <Phone className="w-4 h-4 text-gray-500 dark:text-[#ABBAB6]" />
                      <span className="text-sm text-gray-500 dark:text-[#ABBAB6]">Phone Number</span>
                    </div>
                    <p className="font-medium dark:text-[#F2F2F2]">{user.personalInfo.phone}</p>
                  </div>
                  <div className="bg-gray-50 dark:bg-[#1E3730] p-4 rounded-lg md:col-span-2">
                    <div className="flex items-center gap-2 mb-2">
                      <Mail className="w-4 h-4 text-gray-500 dark:text-[#ABBAB6]" />
                      <span className="text-sm text-gray-500 dark:text-[#ABBAB6]">Email Address</span>
                    </div>
                    <p className="font-medium dark:text-[#F2F2F2]">{user.personalInfo.email}</p>
                  </div>
                </div>
              </div>
            )}
            
            {/* Personal Info without Profile Image */}
            {!showImages && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-gray-50 dark:bg-[#1E3730] p-4 rounded-lg">
                  <div className="flex items-center gap-2 mb-2">
                    <User className="w-4 h-4 text-gray-500 dark:text-[#ABBAB6]" />
                    <span className="text-sm text-gray-500 dark:text-[#ABBAB6]">Full Name</span>
                  </div>
                  <p className="font-medium dark:text-[#F2F2F2]">{user.personalInfo.name}</p>
                </div>
                <div className="bg-gray-50 dark:bg-[#1E3730] p-4 rounded-lg">
                  <div className="flex items-center gap-2 mb-2">
                    <Phone className="w-4 h-4 text-gray-500 dark:text-[#ABBAB6]" />
                    <span className="text-sm text-gray-500 dark:text-[#ABBAB6]">Phone Number</span>
                  </div>
                  <p className="font-medium dark:text-[#F2F2F2]">{user.personalInfo.phone}</p>
                </div>
                <div className="bg-gray-50 dark:bg-[#1E3730] p-4 rounded-lg md:col-span-2">
                  <div className="flex items-center gap-2 mb-2">
                    <Mail className="w-4 h-4 text-gray-500 dark:text-[#ABBAB6]" />
                    <span className="text-sm text-gray-500 dark:text-[#ABBAB6]">Email Address</span>
                  </div>
                  <p className="font-medium dark:text-[#F2F2F2]">{user.personalInfo.email}</p>
                </div>
              </div>
            )}
          </div>

          {/* KYC Info Section */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <FileText className="w-5 h-5 text-green-500" />
              <h3 className="text-lg font-semibold dark:text-[#F2F2F2]">KYC Information</h3>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Aadhar Card */}
              <div className="bg-gray-50 dark:bg-[#1E3730] p-4 rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <FileText className="w-4 h-4 text-gray-500 dark:text-[#ABBAB6]" />
                  <span className="text-sm text-gray-500 dark:text-[#ABBAB6]">Aadhar {showImages ? 'Photo' : 'Number'}</span>
                </div>
                <p className="font-medium dark:text-[#F2F2F2]">{user.kycInfo.aadharNumber}</p>
                {showImages && (
                  <button 
                    onClick={() => setViewImage(user.kycInfo.aadharPhoto)}
                    className="mt-2 text-sm text-blue-500 hover:text-blue-700 dark:hover:text-blue-400"
                  >
                    View Image
                  </button>
                )}
              </div>
              
              {/* PAN Card */}
              <div className="bg-gray-50 dark:bg-[#1E3730] p-4 rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <FileText className="w-4 h-4 text-gray-500 dark:text-[#ABBAB6]" />
                  <span className="text-sm text-gray-500 dark:text-[#ABBAB6]">PAN {showImages ? 'Photo' : 'Number'}</span>
                </div>
                <p className="font-medium dark:text-[#F2F2F2]">{user.kycInfo.panNumber}</p>
                {showImages && (
                  <button 
                    onClick={() => setViewImage(user.kycInfo.panPhoto)}
                    className="mt-2 text-sm text-blue-500 hover:text-blue-700 dark:hover:text-blue-400"
                  >
                    View Image
                  </button>
                )}
              </div>
              
              {/* Passbook Photo */}
              <div className="bg-gray-50 dark:bg-[#1E3730] p-4 rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <FileText className="w-4 h-4 text-gray-500 dark:text-[#ABBAB6]" />
                  <span className="text-sm text-gray-500 dark:text-[#ABBAB6]">Passbook {showImages ? 'Photo' : 'Number'}</span>
                </div>
                <p className="font-medium dark:text-[#F2F2F2]">
                  {user.kycInfo.passbookPhoto ? 'Available' : 'Not provided'}
                </p>
                {showImages && user.kycInfo.passbookPhoto && (
                  <button 
                    onClick={() => setViewImage(user.kycInfo.passbookPhoto)}
                    className="mt-2 text-sm text-blue-500 hover:text-blue-700 dark:hover:text-blue-400"
                  >
                    View Image
                  </button>
                )}
              </div>
            </div>
          </div>

          {/* Bank Details Section */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <Banknote className="w-5 h-5 text-purple-500" />
              <h3 className="text-lg font-semibold dark:text-[#F2F2F2]">Bank Details</h3>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-gray-50 dark:bg-[#1E3730] p-4 rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <Banknote className="w-4 h-4 text-gray-500 dark:text-[#ABBAB6]" />
                  <span className="text-sm text-gray-500 dark:text-[#ABBAB6]">Bank Name</span>
                </div>
                <p className="font-medium dark:text-[#F2F2F2]">{user.bankDetails.bankName}</p>
              </div>
              <div className="bg-gray-50 dark:bg-[#1E3730] p-4 rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <User className="w-4 h-4 text-gray-500 dark:text-[#ABBAB6]" />
                  <span className="text-sm text-gray-500 dark:text-[#ABBAB6]">Account Holder</span>
                </div>
                <p className="font-medium dark:text-[#F2F2F2]">{user.bankDetails.accountHolderName}</p>
              </div>
              <div className="bg-gray-50 dark:bg-[#1E3730] p-4 rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <CreditCard className="w-4 h-4 text-gray-500 dark:text-[#ABBAB6]" />
                  <span className="text-sm text-gray-500 dark:text-[#ABBAB6]">Account Number</span>
                </div>
                <p className="font-medium dark:text-[#F2F2F2]">{user.bankDetails.accountNumber}</p>
              </div>
              <div className="bg-gray-50 dark:bg-[#1E3730] p-4 rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <CreditCard className="w-4 h-4 text-gray-500 dark:text-[#ABBAB6]" />
                  <span className="text-sm text-gray-500 dark:text-[#ABBAB6]">IFSC Code</span>
                </div>
                <p className="font-medium dark:text-[#F2F2F2]">{user.bankDetails.ifscCode}</p>
              </div>
            </div>
          </div>

          {/* Forex Account Section - Only shown if showForex is true */}
          {showForex && (
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <BarChart2 className="w-5 h-5 text-orange-500" />
                <h3 className="text-lg font-semibold dark:text-[#F2F2F2]">Forex Account</h3>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                <div className="bg-gray-50 dark:bg-[#1E3730] p-4 rounded-lg">
                  <div className="flex items-center gap-2 mb-2">
                    <WalletCards className="w-4 h-4 text-gray-500 dark:text-[#ABBAB6]" />
                    <span className="text-sm text-gray-500 dark:text-[#ABBAB6]">Account Balance</span>
                  </div>
                  <p className="font-medium dark:text-[#F2F2F2]">{user.forexAccount.accountBalance}</p>
                </div>
                <div className="bg-gray-50 dark:bg-[#1E3730] p-4 rounded-lg">
                  <div className="flex items-center gap-2 mb-2">
                    <TrendingUp className="w-4 h-4 text-gray-500 dark:text-[#ABBAB6]" />
                    <span className="text-sm text-gray-500 dark:text-[#ABBAB6]">Total Deposit</span>
                  </div>
                  <p className="font-medium dark:text-[#F2F2F2]">{user.forexAccount.totalDeposit}</p>
                </div>
                <div className="bg-gray-50 dark:bg-[#1E3730] p-4 rounded-lg">
                  <div className="flex items-center gap-2 mb-2">
                    <TrendingUp className="w-4 h-4 text-gray-500 dark:text-[#ABBAB6]" />
                    <span className="text-sm text-gray-500 dark:text-[#ABBAB6]">Total Withdrawals</span>
                  </div>
                  <p className="font-medium dark:text-[#F2F2F2]">{user.forexAccount.totalWithdrawals}</p>
                </div>
                <div className="bg-gray-50 dark:bg-[#1E3730] p-4 rounded-lg">
                  <div className="flex items-center gap-2 mb-2">
                    <BarChart2 className="w-4 h-4 text-gray-500 dark:text-[#ABBAB6]" />
                    <span className="text-sm text-gray-500 dark:text-[#ABBAB6]">Profit/Loss</span>
                  </div>
                  <p className={`font-medium ${
                    user.forexAccount.profitLoss.startsWith('+') 
                      ? 'text-green-500' 
                      : 'text-red-500'
                  }`}>
                    {user.forexAccount.profitLoss}
                  </p>
                </div>
                <div className="bg-gray-50 dark:bg-[#1E3730] p-4 rounded-lg">
                  <div className="flex items-center gap-2 mb-2">
                    <Wallet className="w-4 h-4 text-gray-500 dark:text-[#ABBAB6]" />
                    <span className="text-sm text-gray-500 dark:text-[#ABBAB6]">Order Investment</span>
                  </div>
                  <p className="font-medium dark:text-[#F2F2F2]">{user.forexAccount.orderInvestment}</p>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="sticky bottom-0 bg-white dark:bg-[#142924] p-4 border-t dark:border-[#2A3F3A] flex justify-end">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-[#43B852] hover:bg-[#0E1F1B] text-white rounded-lg transition-colors"
          >
            Close
          </button>
        </div>
      </div>

      {/* Image Viewer Modal */}
      {viewImage && (
        <div className="fixed inset-0 bg-black bg-opacity-90 flex items-center justify-center z-50 p-4">
          <div className="relative w-full max-w-4xl max-h-[90vh]">
            <button
              onClick={() => setViewImage(null)}
              className="absolute -top-10 right-0 text-white hover:text-gray-300"
            >
              <X className="w-6 h-6" />
            </button>
            <div className="relative w-full h-full" style={{ paddingBottom: '75%' }}>
              <Image
                src={viewImage}
                alt="Document"
                fill
                className="object-contain"
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserDetailsPopup;