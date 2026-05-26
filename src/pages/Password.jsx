import React, { useState } from 'react';
import { 
  Mail,  
  Key, 
  Lock, 
  CheckCircle, 
  AlertCircle, 
  ArrowLeft,
  Send,
  Shield,
  Eye,
  EyeOff,
  X
} from 'lucide-react';

const ForgotPassword = () => {
  // Step management: 'request' | 'verify' | 'success'
  const [step, setStep] = useState('request');
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  
  // Form states
  const [email, setEmail] = useState('');
  const [token, setToken] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  
  // Error states
  const [error, setError] = useState('');
  const [fieldErrors, setFieldErrors] = useState({});
  
  // Success message
  const [successMessage, setSuccessMessage] = useState('');
  
  // User email for success screen
  const [userEmail, setUserEmail] = useState('');

  // API Configuration
  const API_BASE_URL ='https://bitnex-production.up.railway.app/api';

  // Helper function to handle API errors
  const handleApiError = (error) => {
    if (error.response) {
      // Server responded with error status
      const { status, data } = error.response;
      switch (status) {
        case 400:
          return data.message || 'Invalid request. Please check your input.';
        case 401:
          return 'Invalid or expired token. Please request a new one.';
        case 404:
          return 'Account not found. Please check your email.';
        case 429:
          return 'Too many requests. Please wait a few minutes.';
        case 500:
          return 'Server error. Please try again later.';
        default:
          return data.message || 'An error occurred. Please try again.';
      }
    } else if (error.request) {
      // Request made but no response
      return 'Network error. Please check your internet connection.';
    } else {
      // Something else happened
      return error.message || 'An unexpected error occurred.';
    }
  };

  // Validate email
  const validateEmail = () => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    
    if (!email.trim()) {
      return 'Please enter your email address';
    }
    if (!emailRegex.test(email)) {
      return 'Please enter a valid email address';
    }
    return '';
  };

  const validateToken = () => {
    if (!token.trim()) {
      return 'Please enter the verification token';
    }
    if (token.length < 6) {
      return 'Token must be at least 6 characters';
    }
    if (!/^\d+$/.test(token)) {
      return 'Token should contain only numbers';
    }
    return '';
  };

  const validatePassword = () => {
    const errors = {};
    
    if (!newPassword) {
      errors.newPassword = 'Please enter a new password';
    } else if (newPassword.length < 8) {
      errors.newPassword = 'Password must be at least 8 characters';
    } else if (!/(?=.*[a-z])/.test(newPassword)) {
      errors.newPassword = 'Password must contain at least one lowercase letter';
    } else if (!/(?=.*[A-Z])/.test(newPassword)) {
      errors.newPassword = 'Password must contain at least one uppercase letter';
    } else if (!/(?=.*\d)/.test(newPassword)) {
      errors.newPassword = 'Password must contain at least one number';
    } else if (!/(?=.*[@$!%*?&])/.test(newPassword)) {
      errors.newPassword = 'Password must contain at least one special character (@$!%*?&)';
    }
    
    if (!confirmPassword) {
      errors.confirmPassword = 'Please confirm your password';
    } else if (confirmPassword !== newPassword) {
      errors.confirmPassword = 'Passwords do not match';
    }
    
    setFieldErrors(errors);
    return Object.keys(errors).length === 0;
  };

  // Handle request password reset - sends email to server
  const handleRequestReset = async (e) => {
    e.preventDefault();
    
    const emailError = validateEmail();
    if (emailError) {
      setError(emailError);
      return;
    }
    
    setIsLoading(true);
    setError('');
    setSuccessMessage('');
    
    try {
      // API call to request password reset
      const response = await fetch(`${API_BASE_URL}/auth/forgot-password`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        body: JSON.stringify({ email: email.toLowerCase().trim() }),
      });
      
      const data = await response.json();
      console.log(data)
      
      if (!response.ok) {
        throw { response: { status: response.status, data } };
      }
      
      // Success - token sent to email
      setUserEmail(email);
      setSuccessMessage(data.message || `Password reset token has been sent to ${email}`);
      setStep('verify');
      setError('');
      
    } catch (err) {
      const errorMessage = handleApiError(err);
      setError(errorMessage);
      
      // Don't reveal if email exists for security, but show generic message
      if (errorMessage.includes('not found')) {
        setError('If an account exists with this email, you will receive a reset token.');
        // Still proceed to verify step for security (don't reveal user existence)
        setTimeout(() => {
          setUserEmail(email);
          setSuccessMessage('If an account exists, a reset token has been sent to your email.');
          setStep('verify');
          setError('');
        }, 2000);
      }
    } finally {
      setIsLoading(false);
    }
  };

  // Handle token verification and password reset
  const handleResetPassword = async (e) => {
    e.preventDefault();
    
    const tokenError = validateToken();
    if (tokenError) {
      setError(tokenError);
      return;
    }
    
    if (!validatePassword()) {
      setError('Please fix the errors above');
      return;
    }
    
    setIsLoading(true);
    setError('');
    
    try {
      // API call to reset password with token
      const response = await fetch(`${API_BASE_URL}/auth/reset-password`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        body: JSON.stringify({
          email: userEmail.toLowerCase().trim(),
          token: token.trim(),
          newPassword: newPassword,
          confirmPassword: confirmPassword,
        }),
      });
      
      const data = await response.json();
      
      if (!response.ok) {
        throw { response: { status: response.status, data } };
      }
      
      // Success - password changed
      setStep('success');
      setSuccessMessage(data.message || 'Your password has been successfully reset');
      
    } catch (err) {
      const errorMessage = handleApiError(err);
      setError(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  // Resend verification token
  const handleResendToken = async () => {
    setIsLoading(true);
    setError('');
    setSuccessMessage('');
    
    try {
      const response = await fetch(`${API_BASE_URL}/auth/resend`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        body: JSON.stringify({ email: userEmail.toLowerCase().trim() }),
      });
      
      const data = await response.json();
      
      if (!response.ok) {
        throw { response: { status: response.status, data } };
      }
      
      setSuccessMessage(data.message || 'A new verification token has been sent to your email');
      
    } catch (err) {
      const errorMessage = handleApiError(err);
      setError(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  // Go back to previous step
  const goBack = () => {
    setStep('request');
    setError('');
    setSuccessMessage('');
    setToken('');
    setNewPassword('');
    setConfirmPassword('');
    setFieldErrors({});
    setEmail('');
  };

  // Render request step
  const renderRequestStep = () => (
    <div className="animate-fade-in">
      {/* Header */}
      <div className="text-center mb-8">
        <div className="w-16 h-16 bg-[#F0B90B]/20 rounded-2xl flex items-center justify-center mx-auto mb-4">
          <Key size={32} className="text-[#F0B90B]" />
        </div>
        <h1 className="text-2xl font-bold text-white mb-2">Forgot Password?</h1>
        <p className="text-[#A0A5AA] text-sm">
          Enter your email address and we'll send you a verification token to reset your password.
        </p>
      </div>

      {/* Form */}
      <form onSubmit={handleRequestReset} className="space-y-6">
        <div>
          <label className="block text-white text-sm font-medium mb-2">
            Email Address
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Mail size={18} className="text-[#A0A5AA]" />
            </div>
            <input
              type="email"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                setError('');
              }}
              placeholder="Enter your registered email"
              className="w-full pl-10 pr-4 py-3 bg-[#2B3139] border border-[#363D45] rounded-xl text-white placeholder-[#A0A5AA] focus:outline-none focus:border-[#F0B90B] transition-all duration-200"
              autoComplete="email"
            />
          </div>
          <p className="text-[#A0A5AA] text-xs mt-1">
            We'll send a 6-digit verification code to this email
          </p>
        </div>

        {error && (
          <div className="flex items-center justify-between gap-2 p-3 bg-[#F6465D]/10 border border-[#F6465D]/30 rounded-xl">
            <div className="flex items-center gap-2">
              <AlertCircle size={16} className="text-[#F6465D]" />
              <p className="text-[#F6465D] text-xs">{error}</p>
            </div>
            <button onClick={() => setError('')} className="text-[#F6465D]">
              <X size={14} />
            </button>
          </div>
        )}

        {successMessage && (
          <div className="flex items-center justify-between gap-2 p-3 bg-[#0ECB81]/10 border border-[#0ECB81]/30 rounded-xl">
            <div className="flex items-center gap-2">
              <CheckCircle size={16} className="text-[#0ECB81]" />
              <p className="text-[#0ECB81] text-xs">{successMessage}</p>
            </div>
            <button onClick={() => setSuccessMessage('')} className="text-[#0ECB81]">
              <X size={14} />
            </button>
          </div>
        )}

        <button
          type="submit"
          disabled={isLoading}
          className="w-full py-3 bg-[#F0B90B] hover:bg-[#F0B90B]/90 rounded-xl text-[#0A0B0D] font-semibold transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
        >
          {isLoading ? (
            <>
              <div className="w-4 h-4 border-2 border-[#0A0B0D] border-t-transparent rounded-full animate-spin"></div>
              Sending...
            </>
          ) : (
            <>
              <Send size={16} />
              Send Reset Token
            </>
          )}
        </button>
      </form>

      {/* Back to login */}
      <div className="mt-6 text-center">
        <button
          onClick={() => window.location.href = '/login'}
          className="text-[#A0A5AA] text-sm hover:text-white transition-colors duration-200 flex items-center justify-center gap-1"
        >
          <ArrowLeft size={14} />
          Back to Login
        </button>
      </div>
    </div>
  );

  // Render verify step
  const renderVerifyStep = () => (
    <div className="animate-fade-in">
      {/* Header */}
      <div className="text-center mb-8">
        <div className="w-16 h-16 bg-[#0ECB81]/20 rounded-2xl flex items-center justify-center mx-auto mb-4">
          <Shield size={32} className="text-[#0ECB81]" />
        </div>
        <h1 className="text-2xl font-bold text-white mb-2">Reset Password</h1>
        <p className="text-[#A0A5AA] text-sm">
          We've sent a verification token to <span className="text-[#F0B90B]">{userEmail}</span>
        </p>
      </div>

      {/* Success message */}
      {successMessage && (
        <div className="mb-6 p-3 bg-[#0ECB81]/10 border border-[#0ECB81]/30 rounded-xl flex items-center justify-between">
          <div className="flex items-center gap-2">
            <CheckCircle size={16} className="text-[#0ECB81]" />
            <p className="text-[#0ECB81] text-xs">{successMessage}</p>
          </div>
          <button onClick={() => setSuccessMessage('')} className="text-[#0ECB81]">
            <X size={14} />
          </button>
        </div>
      )}

      {/* Error message */}
      {error && (
        <div className="mb-6 p-3 bg-[#F6465D]/10 border border-[#F6465D]/30 rounded-xl flex items-center justify-between">
          <div className="flex items-center gap-2">
            <AlertCircle size={16} className="text-[#F6465D]" />
            <p className="text-[#F6465D] text-xs">{error}</p>
          </div>
          <button onClick={() => setError('')} className="text-[#F6465D]">
            <X size={14} />
          </button>
        </div>
      )}

      {/* Form */}
      <form onSubmit={handleResetPassword} className="space-y-5">
        {/* Token field */}
        <div>
          <label className="block text-white text-sm font-medium mb-2">
            Verification Token
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Key size={18} className="text-[#A0A5AA]" />
            </div>
            <input
              type="text"
              value={token}
              onChange={(e) => {
                // Only allow numbers
                const value = e.target.value.replace(/\D/g, '');
                setToken(value);
                setError('');
              }}
              placeholder="Enter 6-digit code"
              maxLength="6"
              className="w-full pl-10 pr-4 py-3 bg-[#2B3139] border border-[#363D45] rounded-xl text-white text-center text-lg tracking-wider font-mono placeholder-[#A0A5AA] focus:outline-none focus:border-[#F0B90B] transition-all duration-200"
            />
          </div>
          <p className="text-[#A0A5AA] text-xs mt-1 text-center">
            Enter the 6-digit code sent to your email
          </p>
        </div>

        {/* New Password field */}
        <div>
          <label className="block text-white text-sm font-medium mb-2">
            New Password
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Lock size={18} className="text-[#A0A5AA]" />
            </div>
            <input
              type={showPassword ? "text" : "password"}
              value={newPassword}
              onChange={(e) => {
                setNewPassword(e.target.value);
                setFieldErrors({ ...fieldErrors, newPassword: '' });
                setError('');
              }}
              placeholder="Enter new password"
              className="w-full pl-10 pr-10 py-3 bg-[#2B3139] border border-[#363D45] rounded-xl text-white placeholder-[#A0A5AA] focus:outline-none focus:border-[#F0B90B] transition-all duration-200"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute inset-y-0 right-0 pr-3 flex items-center"
            >
              {showPassword ? (
                <EyeOff size={18} className="text-[#A0A5AA] hover:text-white" />
              ) : (
                <Eye size={18} className="text-[#A0A5AA] hover:text-white" />
              )}
            </button>
          </div>
          {fieldErrors.newPassword && (
            <p className="text-[#F6465D] text-xs mt-1">{fieldErrors.newPassword}</p>
          )}
          <div className="mt-2 flex flex-wrap gap-2 text-[10px]">
            <span className={`px-2 py-0.5 rounded ${newPassword.length >= 8 ? 'bg-[#0ECB81]/20 text-[#0ECB81]' : 'bg-[#2B3139] text-[#A0A5AA]'}`}>
              ✓ 8+ chars
            </span>
            <span className={`px-2 py-0.5 rounded ${/[A-Z]/.test(newPassword) ? 'bg-[#0ECB81]/20 text-[#0ECB81]' : 'bg-[#2B3139] text-[#A0A5AA]'}`}>
              ✓ Uppercase
            </span>
            <span className={`px-2 py-0.5 rounded ${/[a-z]/.test(newPassword) ? 'bg-[#0ECB81]/20 text-[#0ECB81]' : 'bg-[#2B3139] text-[#A0A5AA]'}`}>
              ✓ Lowercase
            </span>
            <span className={`px-2 py-0.5 rounded ${/\d/.test(newPassword) ? 'bg-[#0ECB81]/20 text-[#0ECB81]' : 'bg-[#2B3139] text-[#A0A5AA]'}`}>
              ✓ Number
            </span>
            <span className={`px-2 py-0.5 rounded ${/[@$!%*?&]/.test(newPassword) ? 'bg-[#0ECB81]/20 text-[#0ECB81]' : 'bg-[#2B3139] text-[#A0A5AA]'}`}>
              ✓ Special char
            </span>
          </div>
        </div>

        {/* Confirm Password field */}
        <div>
          <label className="block text-white text-sm font-medium mb-2">
            Confirm New Password
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Lock size={18} className="text-[#A0A5AA]" />
            </div>
            <input
              type={showConfirmPassword ? "text" : "password"}
              value={confirmPassword}
              onChange={(e) => {
                setConfirmPassword(e.target.value);
                setFieldErrors({ ...fieldErrors, confirmPassword: '' });
                setError('');
              }}
              placeholder="Confirm your new password"
              className="w-full pl-10 pr-10 py-3 bg-[#2B3139] border border-[#363D45] rounded-xl text-white placeholder-[#A0A5AA] focus:outline-none focus:border-[#F0B90B] transition-all duration-200"
            />
            <button
              type="button"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              className="absolute inset-y-0 right-0 pr-3 flex items-center"
            >
              {showConfirmPassword ? (
                <EyeOff size={18} className="text-[#A0A5AA] hover:text-white" />
              ) : (
                <Eye size={18} className="text-[#A0A5AA] hover:text-white" />
              )}
            </button>
          </div>
          {fieldErrors.confirmPassword && (
            <p className="text-[#F6465D] text-xs mt-1">{fieldErrors.confirmPassword}</p>
          )}
        </div>

        <button
          type="submit"
          disabled={isLoading}
          className="w-full py-3 bg-[#F0B90B] hover:bg-[#F0B90B]/90 rounded-xl text-[#0A0B0D] font-semibold transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
        >
          {isLoading ? (
            <>
              <div className="w-4 h-4 border-2 border-[#0A0B0D] border-t-transparent rounded-full animate-spin"></div>
              Resetting Password...
            </>
          ) : (
            <>
              <Key size={16} />
              Reset Password
            </>
          )}
        </button>
      </form>

      {/* Footer actions */}
      <div className="mt-6 flex flex-col gap-3 text-center">
        <button
          onClick={handleResendToken}
          disabled={isLoading}
          className="text-[#F0B90B] text-sm hover:text-[#F0B90B]/80 transition-colors duration-200 disabled:opacity-50"
        >
          Didn't receive the token? Resend
        </button>
        <button
          onClick={goBack}
          className="text-[#A0A5AA] text-sm hover:text-white transition-colors duration-200 flex items-center justify-center gap-1"
        >
          <ArrowLeft size={14} />
          Use different email
        </button>
      </div>
    </div>
  );

  // Render success step
  const renderSuccessStep = () => (
    <div className="animate-fade-in text-center">
      {/* Success Animation */}
      <div className="mb-6">
        <div className="w-20 h-20 bg-[#0ECB81]/20 rounded-full flex items-center justify-center mx-auto mb-4 animate-bounce">
          <CheckCircle size={40} className="text-[#0ECB81]" />
        </div>
        <h1 className="text-2xl font-bold text-white mb-2">Congratulations! 🎉</h1>
        <p className="text-[#A0A5AA] text-sm">
          Your password has been successfully reset
        </p>
      </div>

      {/* Success Message Card */}
      <div className="bg-[#1E2329] rounded-xl p-6 mb-6">
        <div className="flex items-center justify-center gap-2 mb-3">
          <Shield size={20} className="text-[#0ECB81]" />
          <p className="text-white font-medium">Password Updated Successfully</p>
        </div>
        <p className="text-[#A0A5AA] text-xs">
          You can now log in to your Bitnex account with your new password.
        </p>
      </div>

      {/* Security Tips */}
      <div className="bg-[#2B3139]/50 rounded-xl p-4 mb-6">
        <h3 className="text-white text-sm font-semibold mb-2">Security Tips</h3>
        <div className="space-y-2 text-left">
          <div className="flex items-start gap-2">
            <CheckCircle size={12} className="text-[#0ECB81] mt-0.5" />
            <p className="text-[#A0A5AA] text-xs">Use a unique password you haven't used before</p>
          </div>
          {/* <div className="flex items-start gap-2">
            <CheckCircle size={12} className="text-[#0ECB81] mt-0.5" />
            <p className="text-[#A0A5AA] text-xs">Enable 2FA for additional security</p>
          </div> */}
          <div className="flex items-start gap-2">
            <CheckCircle size={12} className="text-[#0ECB81] mt-0.5" />
            <p className="text-[#A0A5AA] text-xs">Never share your password with anyone</p>
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="space-y-3">
        <button
          onClick={() => window.location.href = '/login'}
          className="w-full py-3 bg-[#F0B90B] hover:bg-[#F0B90B]/90 rounded-xl text-[#0A0B0D] font-semibold transition-all duration-200 flex items-center justify-center gap-2"
        >
          <ArrowLeft size={16} />
          Go to Login
        </button>
        <button
          onClick={() => window.location.href = '/'}
          className="w-full py-3 bg-[#2B3139] hover:bg-[#363D45] rounded-xl text-white font-semibold transition-all duration-200"
        >
          Return to Home
        </button>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-[#0A0B0D] flex items-center justify-center p-4">
      {/* Background decoration */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-72 h-72 bg-[#F0B90B]/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-[#0ECB81]/5 rounded-full blur-3xl"></div>
      </div>

      {/* Main Card */}
      <div className="relative z-10 w-full max-w-md">
        <div className="bg-[#1E2329] rounded-2xl p-6 shadow-2xl border border-[#2B3139]">
          {/* Logo */}
          <div className="flex items-center justify-center gap-2 mb-6">
            <div className="w-8 h-8 bg-[#F0B90B] rounded-lg flex items-center justify-center">
              <span className="text-[#0A0B0D] font-bold text-lg">B</span>
            </div>
            <span className="text-white font-bold text-xl">Bitnex</span>
          </div>

          {/* Step Content */}
          {step === 'request' && renderRequestStep()}
          {step === 'verify' && renderVerifyStep()}
          {step === 'success' && renderSuccessStep()}
        </div>

        {/* Footer */}
        <div className="text-center mt-6">
          <p className="text-[#A0A5AA] text-xs">
            © 2026 Bitnex. All rights reserved.
          </p>
        </div>
      </div>

      <style>{`
        @keyframes fade-in {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        @keyframes bounce {
          0%, 100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-10px);
          }
        }
        
        .animate-fade-in {
          animation: fade-in 0.4s ease-out;
        }
        
        .animate-bounce {
          animation: bounce 0.6s ease-in-out;
        }
        
        @keyframes spin {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(360deg);
          }
        }
        
        .animate-spin {
          animation: spin 1s linear infinite;
        }
      `}</style>
    </div>
  );
};

export default ForgotPassword;