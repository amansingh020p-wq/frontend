
'use client';

import { useState } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Eye, EyeOff, X } from 'lucide-react';
import axios from "utils/axios.js"


const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [showForgotPassword, setShowForgotPassword] = useState(false);
  const [email, setEmail] = useState('');
  const [otp, setOtp] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [step, setStep] = useState(1); // 1: email, 2: otp, 3: new password, 4: success
  const [otpError, setOtpError] = useState('');
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    // Hardcoded credentials
    // const correctUsername = 'admin@aditya';
    // const correctPassword = '11223344';
    // const response = axios.  


    try {
      
      // if (username === correctUsername && password === correctPassword) {
      //   // Use window.location for immediate redirect
      //   window.location.href = '/admin';
      // } else if (username !== correctUsername && password !== correctPassword) {
      //   setError('No registered user found');
      // } else if (username !== correctUsername) {
      //   setError('Username is incorrect');
      // } else {
      //   setError('Incorrect password');
      // }
      console.log(`Username is ${username} and password is ${password}`)
      const response = await axios.post('user/login', {
        email: username,
        password: password,
      });

      if (response.data.status === 'success') {
        const role = response.data?.data?.role;
        const isVerified = response.data?.data?.isVerified;
        if (isVerified === false) {
          setError('Your account is not verified yet.');
          return;
        }
        if (role === 'admin') {
          window.location.href = '/admin';
        } else {
          window.location.href = '/dashboard';
        }
      } else {
        // This else block might not be reached if the server returns non-2xx status codes for errors,
        // as axios throws an error in that case, which is caught by the catch block.
        // However, it's good practice to handle it in case the server sends 2xx with a fail status.
        setError(response.data.message || 'Login failed');
      }
    } catch (err) {
      console.error('Login error:', err);
      setError(err.response?.data?.message || 'Login failed. Please try again.');
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleForgotPassword = (e) => {
    e.preventDefault();
    setShowForgotPassword(true);
    setStep(1);
    setEmail('');
    setOtp('');
    setNewPassword('');
    setConfirmPassword('');
    setOtpError('');
  };

  const handleSendOtp = (e) => {
    e.preventDefault();
    // In a real app, you would send an OTP to the email here
    setStep(2);
  };

  const handleVerifyOtp = (e) => {
    e.preventDefault();
    // Mock verification - in real app, verify with backend
    if (otp === '123456') { // Mock OTP
      setStep(3);
      setOtpError('');
    } else {
      setOtpError('OTP not match. Try again.');
    }
  };

  const handleResetPassword = (e) => {
    e.preventDefault();
    // In a real app, you would verify passwords match and update in backend
    if (newPassword !== confirmPassword) {
      setOtpError('Passwords do not match');
      return;
    }
    setStep(4);
  };

  const closeForgotPassword = () => {
    setShowForgotPassword(false);
  };

  return (
    <div className="min-h-[calc(100vh-64px)] w-full bg-[#D0E2D2] flex items-center justify-center relative overflow-hidden pt-16 pb-8">
      <Head>
        <title>Sign In - ForexFlow</title>
        <meta name="description" content="Sign in to access your account" />
      </Head>

      {/* Background elements */}
      <div className="absolute inset-0 overflow-hidden opacity-20">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 md:w-96 md:h-96 bg-[#43B852] rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 right-1/4 w-56 h-56 md:w-80 md:h-80 bg-[#0E1F1B] rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/4 left-1/3 w-48 h-48 md:w-72 md:h-72 bg-[#43B852] rounded-full blur-3xl opacity-70"></div>
      </div>

      {/* Main container */}
      <div className="relative z-10 w-full max-w-5xl mx-4 my-4 bg-white bg-opacity-90 backdrop-blur-sm rounded-3xl shadow-2xl flex flex-col lg:flex-row overflow-hidden">
        {/* Left side - Welcome section */}
        <div className="w-full lg:w-1/2 p-6 md:p-8 lg:p-12 flex flex-col justify-center bg-[#0E1F1B] text-white">
          <div className="mb-4 md:mb-6">
            <div className="text-2xl md:text-3xl font-bold text-[#43B852]">ForexFlow</div>
          </div>
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 md:mb-6">Welcome Back!</h1>
          <div className="w-10 md:w-12 h-1 bg-[#43B852] mb-4 md:mb-6"></div>
          <p className="text-[#D0E2D2] text-sm md:text-base mb-6 md:mb-8">
            Access your trading dashboard and manage your forex portfolio with our secure platform.
          </p>
          <Link href="/about" className="bg-[#43B852] hover:bg-[#0E1F1B] text-white py-2 px-4 md:py-2 md:px-6 rounded-full w-fit text-xs md:text-sm font-medium transition-colors border border-[#43B852]">
            Learn More
          </Link>
        </div>

        {/* Right side - Sign in form */}
        <div className="w-full lg:w-1/2 p-4 md:p-6 lg:p-8 flex items-center justify-center bg-white">
          <div className="w-full max-w-md p-4 md:p-6 lg:p-8 rounded-xl">
            <h2 className="text-xl md:text-2xl font-bold mb-4 md:mb-6 text-center text-[#0E1F1B]">Sign In</h2>
            {error && (
              <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-lg text-sm">
                {error}
              </div>
            )}
            <form onSubmit={handleSubmit}>
              <div className="mb-3 md:mb-4">
                <label htmlFor="username" className="block text-[#0E1F1B] text-sm md:text-base mb-1 md:mb-2">Email</label>
                <input
                  type="text"
                  id="username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="w-full bg-[#D0E2D2]/20 text-[#0E1F1B] px-3 py-2 md:px-4 md:py-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#43B852] border border-[#D0E2D2] text-sm md:text-base"
                  placeholder="Enter your email"
                  required
                />
              </div>
              <div className="mb-4 md:mb-6 relative">
                <label htmlFor="password" className="block text-[#0E1F1B] text-sm md:text-base mb-1 md:mb-2">
                  Password
                </label>
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    id="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full bg-[#D0E2D2]/20 text-[#0E1F1B] px-3 py-2 md:px-4 md:py-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#43B852] border border-[#D0E2D2] text-sm md:text-base pr-10"
                    placeholder="••••••••"
                    required
                  />
                  <button
                    type="button"
                    onClick={togglePasswordVisibility}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-[#0E1F1B] hover:text-[#43B852]"
                    aria-label={showPassword ? "Hide password" : "Show password"}
                  >
                    {showPassword ? (
                      <EyeOff className="h-5 w-5" />
                    ) : (
                      <Eye className="h-5 w-5" />
                    )}
                  </button>
                </div>
              </div>

              <button
                type="submit"
                className="w-full bg-[#43B852] hover:bg-[#0E1F1B] text-white py-2 md:py-3 rounded-lg font-medium transition-colors text-sm md:text-base"
              >
                Sign In
              </button>
            </form>

            <div className="mt-4 md:mt-6 text-center">
              <button 
                onClick={handleForgotPassword}
                className="text-[#43B852] hover:text-[#0E1F1B] text-xs md:text-sm"
              >
                Forgot password?
              </button>
            </div>

            <div className="mt-4 md:mt-4 pt-4 md:pt-6 border-t border-[#D0E2D2]"></div>

            <div className="text-center text-xs md:text-sm text-[#0E1F1B]">
              Don't have an account? {' '}
              <Link href="/kyc-registration" className="text-[#43B852] hover:text-[#0E1F1B] font-medium">
                Register
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Forgot Password Popup */}
      {showForgotPassword && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-md relative overflow-hidden">
            <div className="absolute top-4 right-4">
              <button 
                onClick={closeForgotPassword}
                className="text-[#0E1F1B] hover:text-[#43B852] transition-colors"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
            
            <div className="p-6 md:p-8">
              <h3 className="text-xl md:text-2xl font-bold text-[#0E1F1B] mb-6 text-center">
                {step === 1 && 'Reset your password'}
                {step === 2 && 'Enter OTP'}
                {step === 3 && 'Set New Password'}
                {step === 4 && 'Password Reset Successful'}
              </h3>
              
              {step === 1 && (
                <form onSubmit={handleSendOtp}>
                  <div className="mb-4">
                    <label htmlFor="email" className="block text-[#0E1F1B] text-sm md:text-base mb-2">
                      Enter your email to reset password
                    </label>
                    <input
                      type="email"
                      id="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full bg-[#D0E2D2]/20 text-[#0E1F1B] px-4 py-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#43B852] border border-[#D0E2D2] text-sm md:text-base"
                      placeholder="your@email.com"
                      required
                    />
                  </div>
                  <button
                    type="submit"
                    className="w-full bg-[#43B852] hover:bg-[#0E1F1B] text-white py-3 rounded-lg font-medium transition-colors"
                  >
                    Next
                  </button>
                </form>
              )}
              
              {step === 2 && (
                <form onSubmit={handleVerifyOtp}>
                  <div className="mb-4">
                    <p className="text-[#0E1F1B] text-sm mb-4">
                      OTP sent to your email. Please enter it below.
                    </p>
                    <input
                      type="text"
                      value={otp}
                      onChange={(e) => setOtp(e.target.value)}
                      className="w-full bg-[#D0E2D2]/20 text-[#0E1F1B] px-4 py-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#43B852] border border-[#D0E2D2] text-sm md:text-base"
                      placeholder="Enter OTP"
                      required
                    />
                    {otpError && (
                      <p className="text-red-500 text-xs mt-2">{otpError}</p>
                    )}
                  </div>
                  <button
                    type="submit"
                    className="w-full bg-[#43B852] hover:bg-[#0E1F1B] text-white py-3 rounded-lg font-medium transition-colors"
                  >
                    Verify OTP
                  </button>
                </form>
              )}
              
              {step === 3 && (
                <form onSubmit={handleResetPassword}>
                  <div className="mb-4">
                    <label htmlFor="newPassword" className="block text-[#0E1F1B] text-sm md:text-base mb-2">
                      New Password
                    </label>
                    <div className="relative">
                      <input
                        type={showNewPassword ? "text" : "password"}
                        id="newPassword"
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                        className="w-full bg-[#D0E2D2]/20 text-[#0E1F1B] px-4 py-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#43B852] border border-[#D0E2D2] text-sm md:text-base pr-10"
                        placeholder="••••••••"
                        required
                      />
                      <button
                        type="button"
                        onClick={() => setShowNewPassword(!showNewPassword)}
                        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-[#0E1F1B] hover:text-[#43B852]"
                      >
                        {showNewPassword ? (
                          <EyeOff className="h-5 w-5" />
                        ) : (
                          <Eye className="h-5 w-5" />
                        )}
                      </button>
                    </div>
                  </div>
                  
                  <div className="mb-6">
                    <label htmlFor="confirmPassword" className="block text-[#0E1F1B] text-sm md:text-base mb-2">
                      Confirm New Password
                    </label>
                    <div className="relative">
                      <input
                        type={showConfirmPassword ? "text" : "password"}
                        id="confirmPassword"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        className="w-full bg-[#D0E2D2]/20 text-[#0E1F1B] px-4 py-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#43B852] border border-[#D0E2D2] text-sm md:text-base pr-10"
                        placeholder="••••••••"
                        required
                      />
                      <button
                        type="button"
                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-[#0E1F1B] hover:text-[#43B852]"
                      >
                        {showConfirmPassword ? (
                          <EyeOff className="h-5 w-5" />
                        ) : (
                          <Eye className="h-5 w-5" />
                        )}
                      </button>
                    </div>
                    {otpError && (
                      <p className="text-red-500 text-xs mt-2">{otpError}</p>
                    )}
                  </div>
                  
                  <button
                    type="submit"
                    className="w-full bg-[#43B852] hover:bg-[#0E1F1B] text-white py-3 rounded-lg font-medium transition-colors"
                  >
                    Submit
                  </button>
                </form>
              )}
              
              {step === 4 && (
                <div className="text-center">
                  <div className="mb-6">
                    <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                      <svg className="w-8 h-8 text-[#43B852]" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                      </svg>
                    </div>
                    <h4 className="text-lg font-bold text-[#0E1F1B] mb-2">Password Reset Successful</h4>
                    <p className="text-[#0E1F1B] text-sm">
                      Your password has been updated successfully. Now you can login with your new password.
                    </p>
                  </div>
                  <button
                    onClick={closeForgotPassword}
                    className="w-full bg-[#43B852] hover:bg-[#0E1F1B] text-white py-3 rounded-lg font-medium transition-colors"
                  >
                    Done
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Login;