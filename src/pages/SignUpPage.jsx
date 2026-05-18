// SignUpPage.jsx
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
  User,
  Phone,
  Home,
  ArrowLeft
} from 'lucide-react';

const SignUpPage = () => {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [agreeTerms, setAgreeTerms] = useState(false);
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [passwordStrength, setPasswordStrength] = useState(0);

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.fullName) {
      newErrors.fullName = 'Full name is required';
    } else if (formData.fullName.length < 2) {
      newErrors.fullName = 'Name must be at least 2 characters';
    }
    
    if (!formData.email) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email';
    }
    
    if (formData.phone && !/^\+?[\d\s-]{10,}$/.test(formData.phone)) {
      newErrors.phone = 'Please enter a valid phone number';
    }
    
    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 8) {
      newErrors.password = 'Password must be at least 8 characters';
    } else if (!/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/.test(formData.password)) {
      newErrors.password = 'Password must contain uppercase, lowercase, and number';
    }
    
    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }
    
    if (!agreeTerms) {
      newErrors.terms = 'You must agree to the terms and conditions';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const calculatePasswordStrength = (password) => {
    let strength = 0;
    if (password.length >= 8) strength++;
    if (password.length >= 12) strength++;
    if (/[a-z]/.test(password)) strength++;
    if (/[A-Z]/.test(password)) strength++;
    if (/\d/.test(password)) strength++;
    if (/[^a-zA-Z\d]/.test(password)) strength++;
    return Math.min(100, (strength / 6) * 100);
  };

  const handlePasswordChange = (e) => {
    const newPassword = e.target.value;
    setFormData({ ...formData, password: newPassword });
    setPasswordStrength(calculatePasswordStrength(newPassword));
  };

  const getPasswordStrengthColor = () => {
    if (passwordStrength < 30) return 'bg-red-500';
    if (passwordStrength < 60) return 'bg-yellow-500';
    return 'bg-green-500';
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
        window.location.href = '/login';
      }, 2000);
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
          className="absolute -top-8 left-0 flex items-center gap-2 text-[#A0A5AA] hover:text-white transition-colors group"
        >
          <ArrowLeft size={18} className="group-hover:-translate-x-1 transition-transform" />
          <span className="text-sm">Back to Home</span>
        </button>

        {/* Logo - Clickable to Home */}
        <div className="text-center mb-8 pt-4">
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
          <h2 className="text-3xl font-bold text-white mb-2">Create Account</h2>
          <p className="text-[#A0A5AA]">Join CryptHub and start trading today</p>
        </div>

        {/* Success Message */}
        {showSuccess && (
          <div className="mb-4 p-4 bg-[#0ECB81]/10 border border-[#0ECB81]/20 rounded-xl animate-fade-in-up">
            <div className="flex items-center gap-3">
              <CheckCircle size={20} className="text-[#0ECB81]" />
              <div>
                <p className="text-[#0ECB81] font-medium">Account Created Successfully!</p>
                <p className="text-[#A0A5AA] text-sm">Redirecting to login...</p>
              </div>
            </div>
          </div>
        )}

        {/* Sign Up Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Full Name Field */}
          <div>
            <label className="block text-white text-sm font-medium mb-2">Full Name</label>
            <div className="relative">
              <User size={18} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[#A0A5AA]" />
              <input
                type="text"
                value={formData.fullName}
                onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                className={`w-full pl-10 pr-4 py-3 bg-[#1E2329] border ${errors.fullName ? 'border-red-500' : 'border-[#2B3139]'} rounded-xl text-white placeholder-[#A0A5AA] focus:outline-none focus:border-[#F0B90B] transition-all`}
                placeholder="John Doe"
              />
            </div>
            {errors.fullName && (
              <p className="mt-1 text-red-500 text-xs flex items-center gap-1">
                <AlertCircle size={12} /> {errors.fullName}
              </p>
            )}
          </div>

          {/* Email Field */}
          <div>
            <label className="block text-white text-sm font-medium mb-2">Email Address</label>
            <div className="relative">
              <Mail size={18} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[#A0A5AA]" />
              <input
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className={`w-full pl-10 pr-4 py-3 bg-[#1E2329] border ${errors.email ? 'border-red-500' : 'border-[#2B3139]'} rounded-xl text-white placeholder-[#A0A5AA] focus:outline-none focus:border-[#F0B90B] transition-all`}
                placeholder="john@example.com"
              />
            </div>
            {errors.email && (
              <p className="mt-1 text-red-500 text-xs flex items-center gap-1">
                <AlertCircle size={12} /> {errors.email}
              </p>
            )}
          </div>

          {/* Phone Field (Optional) */}
          <div>
            <label className="block text-white text-sm font-medium mb-2">Phone Number (Optional)</label>
            <div className="relative">
              <Phone size={18} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[#A0A5AA]" />
              <input
                type="tel"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                className="w-full pl-10 pr-4 py-3 bg-[#1E2329] border border-[#2B3139] rounded-xl text-white placeholder-[#A0A5AA] focus:outline-none focus:border-[#F0B90B] transition-all"
                placeholder="+1 234 567 8900"
              />
            </div>
            {errors.phone && (
              <p className="mt-1 text-red-500 text-xs flex items-center gap-1">
                <AlertCircle size={12} /> {errors.phone}
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
                value={formData.password}
                onChange={handlePasswordChange}
                className={`w-full pl-10 pr-12 py-3 bg-[#1E2329] border ${errors.password ? 'border-red-500' : 'border-[#2B3139]'} rounded-xl text-white placeholder-[#A0A5AA] focus:outline-none focus:border-[#F0B90B] transition-all`}
                placeholder="Create a strong password"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-[#A0A5AA] hover:text-white transition-colors"
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
            
            {/* Password Strength Indicator */}
            {formData.password && (
              <div className="mt-2 space-y-1">
                <div className="flex gap-1">
                  <div className={`h-1 flex-1 rounded-full ${passwordStrength >= 16 ? getPasswordStrengthColor() : 'bg-[#2B3139]'}`}></div>
                  <div className={`h-1 flex-1 rounded-full ${passwordStrength >= 32 ? getPasswordStrengthColor() : 'bg-[#2B3139]'}`}></div>
                  <div className={`h-1 flex-1 rounded-full ${passwordStrength >= 48 ? getPasswordStrengthColor() : 'bg-[#2B3139]'}`}></div>
                  <div className={`h-1 flex-1 rounded-full ${passwordStrength >= 64 ? getPasswordStrengthColor() : 'bg-[#2B3139]'}`}></div>
                </div>
                <p className="text-[#A0A5AA] text-xs">
                  {passwordStrength < 30 && 'Weak password'}
                  {passwordStrength >= 30 && passwordStrength < 60 && 'Medium password'}
                  {passwordStrength >= 60 && 'Strong password'}
                </p>
              </div>
            )}
            {errors.password && (
              <p className="mt-1 text-red-500 text-xs flex items-center gap-1">
                <AlertCircle size={12} /> {errors.password}
              </p>
            )}
          </div>

          {/* Confirm Password Field */}
          <div>
            <label className="block text-white text-sm font-medium mb-2">Confirm Password</label>
            <div className="relative">
              <Lock size={18} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[#A0A5AA]" />
              <input
                type={showConfirmPassword ? 'text' : 'password'}
                value={formData.confirmPassword}
                onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                className={`w-full pl-10 pr-12 py-3 bg-[#1E2329] border ${errors.confirmPassword ? 'border-red-500' : 'border-[#2B3139]'} rounded-xl text-white placeholder-[#A0A5AA] focus:outline-none focus:border-[#F0B90B] transition-all`}
                placeholder="Confirm your password"
              />
              <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-[#A0A5AA] hover:text-white transition-colors"
              >
                {showConfirmPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
            {errors.confirmPassword && (
              <p className="mt-1 text-red-500 text-xs flex items-center gap-1">
                <AlertCircle size={12} /> {errors.confirmPassword}
              </p>
            )}
          </div>

          {/* Terms and Conditions */}
          <div className="flex items-start gap-3">
            <input
              type="checkbox"
              checked={agreeTerms}
              onChange={(e) => setAgreeTerms(e.target.checked)}
              className="mt-1 w-4 h-4 rounded border-[#2B3139] bg-[#1E2329] text-[#F0B90B] focus:ring-[#F0B90B] focus:ring-offset-0"
            />
            <label className="text-[#A0A5AA] text-sm">
              I agree to the{' '}
              <a href="/terms" className="text-[#F0B90B] hover:opacity-80 transition-opacity">Terms of Service</a>
              {' '}and{' '}
              <a href="/privacy" className="text-[#F0B90B] hover:opacity-80 transition-opacity">Privacy Policy</a>
            </label>
          </div>
          {errors.terms && (
            <p className="text-red-500 text-xs flex items-center gap-1">
              <AlertCircle size={12} /> {errors.terms}
            </p>
          )}

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isLoading}
            className="w-full py-3 bg-linear-to-r from-[#F0B90B] to-[#F0B90B]/90 text-[#0A0B0D] rounded-xl font-semibold hover:shadow-lg hover:shadow-[#F0B90B]/25 transition-all duration-300 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed mt-6"
          >
            {isLoading ? (
              <div className="w-5 h-5 border-2 border-[#0A0B0D] border-t-transparent rounded-full animate-spin"></div>
            ) : (
              <>
                Create Account
                <ArrowRight size={18} />
              </>
            )}
          </button>
        </form>
        
        {/* Login Link */}
        <p className="text-center text-[#A0A5AA] text-sm mt-6">
          Already have an account?{' '}
          <a href="/login" className="text-[#F0B90B] font-semibold hover:opacity-80 transition-opacity">
            Sign In
          </a>
        </p>

        {/* Home Link */}
        <p className="text-center text-[#A0A5AA] text-sm mt-2">
          <a 
            href="/" 
            onClick={(e) => {
              e.preventDefault();
              navigateToHome();
            }}
            className="text-[#A0A5AA] hover:text-white transition-colors flex items-center justify-center gap-1 group"
          >
            <Home size={14} className="group-hover:-translate-y-0.5 transition-transform" />
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

export default SignUpPage;