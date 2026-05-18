// LoginPage.jsx
import React, { useState } from 'react';
import {
  Mail,
  Lock,
  Eye,
  EyeOff,
  ArrowRight,
  Shield,
  AlertCircle,
  CheckCircle,
  Home,
  ArrowLeft
} from 'lucide-react';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const validateForm = () => {
    const newErrors = {};
    if (!email) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = 'Please enter a valid email';
    }
    if (!password) {
      newErrors.password = 'Password is required';
    } else if (password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;
    
    setIsLoading(true);
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      setShowSuccess(true);
      setTimeout(() => {
        window.location.href = '/dashboard';
      }, 1500);
    }, 1500);
  };

  const navigateToHome = () => {
    window.location.href = '/';
  };

  return (
    <div className="min-h-screen bg-[#0A0B0D] flex items-center justify-center px-4 py-12 sm:px-6 lg:px-8">
      {/* Background Elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-72 h-72 bg-[#F0B90B] rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-pulse-slow"></div>
        <div className="absolute bottom-20 right-10 w-72 h-72 bg-[#F0B90B] rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-pulse-slow animation-delay-2000"></div>
      </div>

      <div className="relative w-full max-w-md">
        {/* Back to Home Button */}
        <button
          onClick={navigateToHome}
          className="absolute top-0 left-0 flex items-center gap-2 text-[#A0A5AA] hover:text-white transition-colors group mb-8"
        >
          <ArrowLeft size={18} className="group-hover:-translate-x-1 transition-transform" />
          <span className="text-sm">Back to Home</span>
        </button>

        {/* Logo - Clickable to Home */}
        <div className="text-center mb-8 pt-8">
          <div 
            onClick={navigateToHome}
            className="flex justify-center mb-4 cursor-pointer"
          >
            <div className="relative group">
              <div className="absolute inset-0 bg-[#F0B90B] rounded-lg blur-xl opacity-50 group-hover:opacity-100 transition-opacity duration-500"></div>
              <div className="relative w-12 h-12 bg-linear-to-br from-[#F0B90B] to-[#F0B90B]/80 rounded-lg flex items-center justify-center transform group-hover:scale-110 transition-transform duration-300">
                <span className="text-[#0A0B0D] font-bold text-xl">C</span>
              </div>
            </div>
          </div>
          <h2 className="text-3xl font-bold text-white mb-2">Welcome Back</h2>
          <p className="text-[#A0A5AA]">Sign in to continue to CryptHub</p>
        </div>

        {/* Success Message */}
        {showSuccess && (
          <div className="mb-4 p-4 bg-[#0ECB81]/10 border border-[#0ECB81]/20 rounded-xl animate-fade-in-up">
            <div className="flex items-center gap-3">
              <CheckCircle size={20} className="text-[#0ECB81]" />
              <div>
                <p className="text-[#0ECB81] font-medium">Login Successful!</p>
                <p className="text-[#A0A5AA] text-sm">Redirecting to dashboard...</p>
              </div>
            </div>
          </div>
        )}

        {/* Login Form */}
        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Email Field */}
          <div>
            <label className="block text-white text-sm font-medium mb-2">Email Address</label>
            <div className="relative">
              <Mail size={18} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[#A0A5AA]" />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className={`w-full pl-10 pr-4 py-3 bg-[#1E2329] border ${errors.email ? 'border-red-500' : 'border-[#2B3139]'} rounded-xl text-white placeholder-[#A0A5AA] focus:outline-none focus:border-[#F0B90B] transition-all`}
                placeholder="Enter your email"
              />
            </div>
            {errors.email && (
              <p className="mt-1 text-red-500 text-xs flex items-center gap-1">
                <AlertCircle size={12} /> {errors.email}
              </p>
            )}
          </div>

          {/* Password Field */}
          <div>
            <label className="block text-white text-sm font-medium mb-2">Password</label>
            <div className="relative">
              <Lock size={18} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[#A0A5AA]" />
              <input
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className={`w-full pl-10 pr-12 py-3 bg-[#1E2329] border ${errors.password ? 'border-red-500' : 'border-[#2B3139]'} rounded-xl text-white placeholder-[#A0A5AA] focus:outline-none focus:border-[#F0B90B] transition-all`}
                placeholder="Enter your password"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-[#A0A5AA] hover:text-white transition-colors"
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
            {errors.password && (
              <p className="mt-1 text-red-500 text-xs flex items-center gap-1">
                <AlertCircle size={12} /> {errors.password}
              </p>
            )}
          </div>

          {/* Remember Me & Forgot Password */}
          <div className="flex items-center justify-between">
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
                className="w-4 h-4 rounded border-[#2B3139] bg-[#1E2329] text-[#F0B90B] focus:ring-[#F0B90B] focus:ring-offset-0"
              />
              <span className="text-[#A0A5AA] text-sm">Remember me</span>
            </label>
            <a href="/forgot-password" className="text-[#F0B90B] text-sm hover:opacity-80 transition-opacity">
              Forgot password?
            </a>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isLoading}
            className="w-full py-3 bg-linear-to-r from-[#F0B90B] to-[#F0B90B]/90 text-[#0A0B0D] rounded-xl font-semibold hover:shadow-lg hover:shadow-[#F0B90B]/25 transition-all duration-300 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLoading ? (
              <div className="w-5 h-5 border-2 border-[#0A0B0D] border-t-transparent rounded-full animate-spin"></div>
            ) : (
              <>
                Sign In
                <ArrowRight size={18} />
              </>
            )}
          </button>
        </form>

        {/* Sign Up Link */}
        <p className="text-center text-[#A0A5AA] text-sm mt-6">
          Don't have an account?{' '}
          <a href="/signup" className="text-[#F0B90B] font-semibold hover:opacity-80 transition-opacity">
            Create Account
          </a>
        </p>

        {/* Home Link */}
        <p className="text-center text-[#A0A5AA] text-sm mt-2">
          <a href="/" className="text-[#A0A5AA] hover:text-white transition-colors flex items-center justify-center gap-1">
            <Home size={14} />
            Return to Home
          </a>
        </p>

        {/* Security Note */}
        <div className="mt-6 p-3 bg-[#1E2329] rounded-lg flex items-center justify-center gap-2">
          <Shield size={14} className="text-[#0ECB81]" />
          <p className="text-[#A0A5AA] text-xs">Your data is protected with bank-grade encryption</p>
        </div>
      </div>

      <style>{`
        @keyframes pulse-slow {
          0%, 100% { opacity: 0.1; transform: scale(1); }
          50% { opacity: 0.2; transform: scale(1.05); }
        }
        
        .animate-pulse-slow {
          animation: pulse-slow 8s ease-in-out infinite;
        }
        
        .animation-delay-2000 {
          animation-delay: 2s;
        }
        
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        .animate-fade-in-up {
          animation: fadeInUp 0.5s ease-out forwards;
        }
        
        input:-webkit-autofill {
          -webkit-box-shadow: 0 0 0px 1000px #1E2329 inset;
          -webkit-text-fill-color: white;
        }
      `}</style>
    </div>
  );
};

export default LoginPage;