'use client';
import React, { useState, useEffect } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../../../components/ui/tabs";
import { Input } from "../../../components/ui/input";
import { Label } from '../../../components/ui/label';
import { Switch } from '../../../components/ui/switch';
import { Button } from '../../../components/ui/button';
import { Users, CreditCard, Shield, Sun, Moon } from 'lucide-react';
import { useTheme } from '../../../contexts/ThemeContext';
import { useToast } from '../../../hooks/use-toast';
import api from '../../../utils/axios'; // Adjust the import path as necessary

const AccountSetting = () => {
  const [activeTab, setActiveTab] = useState("profile");
  const [isEditing, setIsEditing] = useState(false);
  const { theme, toggleTheme } = useTheme();
  const { toast } = useToast();

  const [userInfo, setUserInfo] = useState(null);
  const [loading, setLoading] = useState(true);
  const [apiError, setApiError] = useState(null);

  // Fetch profile
  useEffect(() => {
    setLoading(true);
    api.get('/user/profile')
      .then(({ data }) => {
        setUserInfo(data.data); // Adjust if your API response structure is different
        setApiError(null);
      })
      .catch(err => {
        setApiError(err.response?.data?.message || err.message || 'Failed to fetch profile');
      })
      .finally(() => setLoading(false));
  }, []);

  const handleEditToggle = () => {
    if (isEditing) {
      api.put('/user/profile', userInfo)
        .then(() => {
          toast({
            title: "Changes saved",
            description: "Your account information has been updated.",
          });
        })
        .catch(err => {
          toast({
            title: "Save failed",
            description: err.response?.data?.message || err.message || "Failed to save.",
            variant: "destructive"
          });
        });
    }
    setIsEditing(!isEditing);
  };

  const handleInputChange = (section, field, value) => {
    setUserInfo(prev => ({
      ...prev,
      [section]: {
        ...prev[section],
        [field]: value
      }
    }));
  };

  if (loading) return <div>Loading...</div>;
  if (apiError) return <div>Error: {apiError}</div>;
  if (!userInfo) return null;

  return (
    <div className="space-y-6">
      {/* Header with responsive layout */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center justify-between gap-4 w-full sm:w-auto">
          <h1 className="text-xl font-bold dark:text-[#F2F2F2] sm:text-2xl">
            Account Settings
          </h1>
          <Button
            className="dark:text-[#F2F2F2] sm:hidden"
            onClick={handleEditToggle}
            variant={isEditing ? "default" : "outline"}
            size="sm"
          >
            {isEditing ? 'Save' : 'Edit'}
          </Button>
        </div>
        <div className="flex items-center justify-between gap-4 w-full sm:w-auto">
          <Button
            className="dark:text-[#F2F2F2] hidden sm:flex"
            onClick={handleEditToggle}
            variant={isEditing ? "default" : "outline"}
          >
            {isEditing ? 'Save Changes' : 'Edit Profile'}
          </Button>
          <div className="hidden sm:flex items-center space-x-2">
            <Switch
              checked={theme === 'dark'}
              onCheckedChange={toggleTheme}
              id="theme-mode"
            />
            <Label htmlFor="theme-mode" className="cursor-pointer">
              {theme === 'light' ? (
                <div className="flex items-center gap-1.5 dark:text-[#F2F2F2]">
                  <Sun size={16} /> Light Mode
                </div>
              ) : (
                <div className="flex items-center gap-1.5 dark:text-[#F2F2F2]">
                  <Moon size={16} /> Dark Mode
                </div>
              )}
            </Label>
          </div>
        </div>
      </div>
      {/* User Information Header */}
      <div className="bg-card rounded-lg border dark:border-[#2A3F3A] shadow-sm overflow-hidden">
        <div className="p-6 flex flex-col md:flex-row gap-6 items-start md:items-center">
          <div className="h-20 w-20 rounded-full bg-primary/20 flex items-center justify-center">
            <span className="font-semibold text-3xl text-primary">
              {userInfo.personal.name.split(' ').map(name => name[0]).join('')}
            </span>
          </div>
          <div className="flex-1">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-2">
              <div>
                <h2 className="text-2xl font-semibold dark:text-[#F2F2F2]">{userInfo.personal.name}</h2>
                <p className="text-muted-foreground">@{userInfo.personal.username}</p>
              </div>
              <div className="status-badge dark:text-[#F2F2F2] bg-success/20 text-success border-success/30 dark:border-[#2A3F3A] px-3 py-1 text-sm">
                Administrator
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
              <div>
                <p className="text-sm text-muted-foreground">Email</p>
                <p className='dark:text-[#F2F2F2] text-sm'>{userInfo.personal.email}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Phone</p>
                <p className='dark:text-[#F2F2F2] text-sm'>{userInfo.personal.phone}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Last Login</p>
                <p className='dark:text-[#F2F2F2] text-sm'>{userInfo.security.lastLogin}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Tabs for different user information */}
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid grid-cols-3 mb-6">
          <TabsTrigger value="profile" className="flex gap-2 items-center">
            <Users size={16} />
            <span>Profile</span>
          </TabsTrigger>
          <TabsTrigger value="bank" className="flex gap-2 items-center">
            <CreditCard size={16} />
            <span>Bank Details</span>
          </TabsTrigger>
          <TabsTrigger value="security" className="flex gap-2 items-center">
            <Shield size={16} />
            <span>setting</span>
          </TabsTrigger>
        </TabsList>
        <TabsContent value="profile" className="space-y-6">
          <div className="bg-card rounded-lg border dark:border-[#2A3F3A] shadow-sm">
            <div className="p-6 border-b dark:border-[#2A3F3A]">
              <h3 className="text-xl font-semibold dark:text-[#F2F2F2]">Personal Information</h3>
            </div>
            <div className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 dark:text-[#F2F2F2]">
                <div className="space-y-2">
                  <Label htmlFor="name">Full Name</Label>
                  <Input
                    id="name"
                    value={userInfo.personal.name}
                    onChange={(e) => handleInputChange('personal', 'name', e.target.value)}
                    disabled={!isEditing}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="username">Username</Label>
                  <Input
                    id="username"
                    value={userInfo.personal.username}
                    onChange={(e) => handleInputChange('personal', 'username', e.target.value)}
                    disabled={!isEditing}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email Address</Label>
                  <Input
                    id="email"
                    value={userInfo.personal.email}
                    onChange={(e) => handleInputChange('personal', 'email', e.target.value)}
                    disabled={!isEditing}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phone">Phone Number</Label>
                  <Input
                    id="phone"
                    value={userInfo.personal.phone}
                    onChange={(e) => handleInputChange('personal', 'phone', e.target.value)}
                    disabled={!isEditing}
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="bg-card rounded-lg border dark:border-[#2A3F3A] shadow-sm dark:text-[#F2F2F2]">
            <div className="p-6 border-b dark:border-[#2A3F3A]">
              <h3 className="text-xl font-semibold ">KYC Information</h3>
            </div>
            <div className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="aadhar">Aadhar Number</Label>
                  <Input
                    id="aadhar"
                    value={userInfo.kyc.aadharNumber}
                    onChange={(e) => handleInputChange('kyc', 'aadharNumber', e.target.value)}
                    disabled={!isEditing}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="pan">PAN Number</Label>
                  <Input
                    id="pan"
                    value={userInfo.kyc.panNumber}
                    onChange={(e) => handleInputChange('kyc', 'panNumber', e.target.value)}
                    disabled={!isEditing}
                  />
                </div>
                <div className="space-y-2">
                  <Label>Aadhar Photo</Label>
                  <div className="flex items-center justify-between rounded-md border dark:border-[#2A3F3A] p-3">
                    <span>
                      {userInfo.kyc.aadharPhoto && userInfo.kyc.aadharPhoto.startsWith('http')
                        ? <span className="text-green-600">Uploaded</span>
                        : <span className="text-yellow-600">{userInfo.kyc.aadharPhoto}</span>}
                    </span>
                    <div className="flex gap-2">
                      {userInfo.kyc.aadharPhoto && userInfo.kyc.aadharPhoto.startsWith('http') && (
                        <Button
                          variant="outline"
                          size="sm"
                          asChild
                        >
                          <a
                            href={userInfo.kyc.aadharPhoto}
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            View
                          </a>
                        </Button>
                      )}
                      {isEditing && (
                        <Button variant="outline" size="sm">Change</Button>
                      )}
                    </div>
                  </div>
                </div>
                <div className="space-y-2">
                  <Label>PAN Photo</Label>
                  <div className="flex items-center justify-between rounded-md border dark:border-[#2A3F3A] p-3">
                    <span>
                      {userInfo.kyc.panPhoto && userInfo.kyc.panPhoto.startsWith('http')
                        ? <span className="text-green-600">Uploaded</span>
                        : <span className="text-yellow-600">{userInfo.kyc.panPhoto}</span>}
                    </span>
                    <div className="flex gap-2">
                      {userInfo.kyc.panPhoto && userInfo.kyc.panPhoto.startsWith('http') && (
                        <Button
                          variant="outline"
                          size="sm"
                          asChild
                        >
                          <a
                            href={userInfo.kyc.panPhoto}
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            View
                          </a>
                        </Button>
                      )}
                      {isEditing && (
                        <Button variant="outline" size="sm">Change</Button>
                      )}
                    </div>
                  </div>
                </div>
                <div className="space-y-2">
                  <Label>Profile Photo</Label>
                  <div className="flex items-center justify-between rounded-md border dark:border-[#2A3F3A] p-3">
                    <span>
                      {userInfo.kyc.profilePhoto && userInfo.kyc.profilePhoto.startsWith('http')
                        ? <span className="text-green-600">Uploaded</span>
                        : <span className="text-yellow-600">{userInfo.kyc.profilePhoto}</span>}
                    </span>
                    <div className="flex gap-2">
                      {userInfo.kyc.profilePhoto && userInfo.kyc.profilePhoto.startsWith('http') && (
                        <Button
                          variant="outline"
                          size="sm"
                          asChild
                        >
                          <a
                            href={userInfo.kyc.profilePhoto}
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            View
                          </a>
                        </Button>
                      )}
                      {isEditing && (
                        <Button variant="outline" size="sm">Change</Button>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </TabsContent>
        <TabsContent value="bank" className="space-y-6">
          <div className="bg-card rounded-lg border dark:border-[#2A3F3A] shadow-sm dark:text-[#F2F2F2]">
            <div className="p-6 border-b dark:border-[#2A3F3A]">
              <h3 className="text-xl font-semibold ">Bank Details</h3>
            </div>
            <div className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="bank-name">Bank Name</Label>
                  <Input
                    id="bank-name"
                    value={userInfo.bank.name}
                    onChange={(e) => handleInputChange('bank', 'name', e.target.value)}
                    disabled={!isEditing}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="account-holder">Account Holder</Label>
                  <Input
                    id="account-holder"
                    value={userInfo.bank.accountHolder}
                    onChange={(e) => handleInputChange('bank', 'accountHolder', e.target.value)}
                    disabled={!isEditing}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="account-number">Account Number</Label>
                  <Input
                    id="account-number"
                    value={userInfo.bank.accountNumber}
                    onChange={(e) => handleInputChange('bank', 'accountNumber', e.target.value)}
                    disabled={!isEditing}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="ifsc">IFSC Code</Label>
                  <Input
                    id="ifsc"
                    value={userInfo.bank.ifsc}
                    onChange={(e) => handleInputChange('bank', 'ifsc', e.target.value)}
                    disabled={!isEditing}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="branch">Branch</Label>
                  <Input
                    id="branch"
                    value={userInfo.bank.branch}
                    onChange={(e) => handleInputChange('bank', 'branch', e.target.value)}
                    disabled={!isEditing}
                  />
                </div>
              </div>
            </div>
          </div>
        </TabsContent>
        <TabsContent value="security" className="space-y-6">
          <div className="bg-card rounded-lg border dark:border-[#2A3F3A] shadow-sm dark:text-[#F2F2F2]">
            <div className="p-6 border-b dark:border-[#2A3F3A]">
              <h3 className="text-xl font-semibold">Security Settings</h3>
            </div>
            <div className="p-6">
              <div className="space-y-6">
                {/* Show theme toggle on mobile before password section */}
                <div className="sm:hidden flex items-center justify-between">
                  <div>
                    <h4 className="font-medium">Theme Preference</h4>
                    <p className="text-sm text-muted-foreground">
                      Switch between light and dark mode
                    </p>
                  </div>
                  <Switch
                    checked={theme === 'dark'}
                    onCheckedChange={toggleTheme}
                    id="mobile-theme-mode"
                  />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-medium">Two-Factor Authentication</h4>
                    <p className="text-sm text-muted-foreground">
                      Add an extra layer of security to your account
                    </p>
                  </div>
                  <Switch
                    checked={userInfo.security.twoFactorEnabled}
                    onCheckedChange={(checked) => {
                      handleInputChange('security', 'twoFactorEnabled', checked.toString());
                    }}
                    disabled={!isEditing}
                  />
                </div>
                <div className="pt-2">
                  <h4 className="font-medium">Login Information</h4>
                  <div className="mt-2 space-y-2">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <p className="text-sm text-muted-foreground">Last Login</p>
                        <p className="font-medium">{userInfo.security.lastLogin}</p>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">IP Address</p>
                        <p className="font-medium">{userInfo.security.lastIp}</p>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="pt-2">
                  <h4 className="font-medium">Password</h4>
                  <div className="mt-2 space-y-4">
                    {isEditing ? (
                      <>
                        <div className="space-y-2">
                          <Label htmlFor="current-password">Current Password</Label>
                          <Input id="current-password" type="password" />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="new-password">New Password</Label>
                          <Input id="new-password" type="password" />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="confirm-password">Confirm New Password</Label>
                          <Input id="confirm-password" type="password" />
                        </div>
                        <Button>Update Password</Button>
                      </>
                    ) : (
                      <Button variant="outline" onClick={() => setIsEditing(true)}>
                        Change Password
                      </Button>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default AccountSetting;