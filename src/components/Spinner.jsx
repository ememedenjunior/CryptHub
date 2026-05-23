// LoadingSpinner.jsx
import React from 'react';

const LoadingSpinner = () => {
  return (
    <div className="min-h-screen bg-[#0A0B0D] flex items-center justify-center px-4">
      {/* Background Elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-72 h-72 bg-[#F0B90B] rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-pulse-slow"></div>
        <div className="absolute bottom-20 right-10 w-72 h-72 bg-[#F0B90B] rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-pulse-slow animation-delay-2000"></div>
      </div>

      <div className="relative text-center">
        {/* Animated Logo */}
        <div className="flex justify-center mb-6">
          <div className="relative group">
            <div className="absolute inset-0 bg-[#F0B90B] rounded-full blur-xl opacity-50 animate-pulse"></div>
            <div className="relative w-20 h-20 bg-linear-to-br from-[#F0B90B] to-[#F0B90B]/80 rounded-full flex items-center justify-center animate-bounce-slow">
              <span className="text-[#0A0B0D] font-bold text-3xl">B</span>
            </div>
          </div>
        </div>

        {/* Brand Name */}
        <h1 className="text-4xl font-bold text-white mb-3 animate-fade-in-up">
          Bitnex
        </h1>
        
        {/* Loading Animation */}
        <div className="flex justify-center gap-2 mt-4">
          <div className="w-3 h-3 bg-[#F0B90B] rounded-full animate-pulse-slow" style={{ animationDelay: '0s' }}></div>
          <div className="w-3 h-3 bg-[#F0B90B] rounded-full animate-pulse-slow" style={{ animationDelay: '0.2s' }}></div>
          <div className="w-3 h-3 bg-[#F0B90B] rounded-full animate-pulse-slow" style={{ animationDelay: '0.4s' }}></div>
        </div>

        {/* Loading Text */}
        <p className="text-[#A0A5AA] mt-4 text-sm animate-pulse">
          Loading...
        </p>
      </div>

      <style>{`
        @keyframes pulse-slow {
          0%, 100% {
            opacity: 0.3;
            transform: scale(1);
          }
          50% {
            opacity: 1;
            transform: scale(1.2);
          }
        }
        
        @keyframes bounce-slow {
          0%, 100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-10px);
          }
        }
        
        .animate-pulse-slow {
          animation: pulse-slow 1.5s ease-in-out infinite;
        }
        
        .animate-bounce-slow {
          animation: bounce-slow 2s ease-in-out infinite;
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
        
        @keyframes pulse {
          0%, 100% {
            opacity: 0.5;
          }
          50% {
            opacity: 1;
          }
        }
        
        .animate-pulse {
          animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
        }
      `}</style>
    </div>
  );
};

export default LoadingSpinner;