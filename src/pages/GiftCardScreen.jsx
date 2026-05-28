import React, { useState } from 'react';
import {
  Gift,
  Search,
  ChevronDown,
  ArrowRightLeft,
  Shield,
  Star,
  Sparkles,
  Clock,
  TrendingUp,
  AlertCircle,
  CheckCircle,
  Copy,
  Eye,
  EyeOff
} from 'lucide-react';

// Gift card data - matches your platform's data structure
const GIFT_CARDS = [
  { id: 'amazon', name: 'Amazon', logo: '🛒', minAmount: 10, maxAmount: 2000, buyRate: 0.92, sellRate: 0.88, processingTime: '2-5 min', popular: true, volume: '1.2M' },
  { id: 'google', name: 'Google Play', logo: '🎮', minAmount: 5, maxAmount: 500, buyRate: 0.85, sellRate: 0.81, processingTime: '1-3 min', popular: true, volume: '890K' },
  { id: 'itunes', name: 'iTunes', logo: '🎵', minAmount: 10, maxAmount: 500, buyRate: 0.82, sellRate: 0.78, processingTime: '2-4 min', popular: false, volume: '450K' },
  { id: 'steam', name: 'Steam', logo: '🎮', minAmount: 5, maxAmount: 500, buyRate: 0.88, sellRate: 0.84, processingTime: '1-3 min', popular: true, volume: '720K' },
  { id: 'target', name: 'Target', logo: '🎯', minAmount: 10, maxAmount: 1000, buyRate: 0.90, sellRate: 0.86, processingTime: '2-5 min', popular: false, volume: '310K' },
  { id: 'walmart', name: 'Walmart', logo: '🛍️', minAmount: 10, maxAmount: 1000, buyRate: 0.89, sellRate: 0.85, processingTime: '2-5 min', popular: false, volume: '560K' },
  { id: 'nike', name: 'Nike', logo: '👟', minAmount: 25, maxAmount: 500, buyRate: 0.83, sellRate: 0.79, processingTime: '3-6 min', popular: false, volume: '280K' },
  { id: 'xbox', name: 'Xbox', logo: '🎮', minAmount: 10, maxAmount: 400, buyRate: 0.87, sellRate: 0.83, processingTime: '1-4 min', popular: true, volume: '630K' },
  { id: 'spotify', name: 'Spotify', logo: '🎵', minAmount: 10, maxAmount: 300, buyRate: 0.80, sellRate: 0.76, processingTime: '1-2 min', popular: true, volume: '420K' },
  { id: 'netflix', name: 'Netflix', logo: '📺', minAmount: 15, maxAmount: 400, buyRate: 0.84, sellRate: 0.80, processingTime: '2-4 min', popular: true, volume: '780K' },
  { id: 'uber', name: 'Uber', logo: '🚗', minAmount: 10, maxAmount: 500, buyRate: 0.86, sellRate: 0.82, processingTime: '2-5 min', popular: false, volume: '290K' },
  { id: 'airbnb', name: 'Airbnb', logo: '🏠', minAmount: 50, maxAmount: 2000, buyRate: 0.88, sellRate: 0.84, processingTime: '3-6 min', popular: false, volume: '180K' },
];

const GiftCardScreen = () => {
  const [transactionType, setTransactionType] = useState('sell'); // 'sell' or 'buy'
  const [selectedCard, setSelectedCard] = useState(null);
  const [amount, setAmount] = useState('');
  const [cardCode, setCardCode] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [showBalance, setShowBalance] = useState(true);
  const [copied, setCopied] = useState(false);

  // Mock wallet balance
  const walletBalance = 2450.0;

  // Filter gift cards based on search
  const filteredCards = GIFT_CARDS.filter(card =>
    card.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Popular cards for quick select
  const popularCards = GIFT_CARDS.filter(card => card.popular).slice(0, 5);

  const handleSelectCard = (card) => {
    setSelectedCard(card);
    setDropdownOpen(false);
    setErrorMessage('');
    setSuccessMessage('');
  };

  const calculateReceiveAmount = () => {
    if (!selectedCard || !amount) return 0;
    const numAmount = parseFloat(amount);
    if (isNaN(numAmount)) return 0;
    
    if (transactionType === 'sell') {
      return numAmount * selectedCard.buyRate;
    } else {
      return numAmount * selectedCard.sellRate;
    }
  };

  const calculateRatePercentage = () => {
    if (!selectedCard) return 0;
    if (transactionType === 'sell') {
      return (selectedCard.buyRate * 100).toFixed(1);
    } else {
      return (selectedCard.sellRate * 100).toFixed(1);
    }
  };

  const validateAmount = () => {
    if (!selectedCard) return false;
    const numAmount = parseFloat(amount);
    if (isNaN(numAmount)) return false;
    if (numAmount < selectedCard.minAmount) {
      setErrorMessage(`Minimum amount is $${selectedCard.minAmount}`);
      return false;
    }
    if (numAmount > selectedCard.maxAmount) {
      setErrorMessage(`Maximum amount is $${selectedCard.maxAmount}`);
      return false;
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!selectedCard) {
      setErrorMessage('Please select a gift card brand');
      return;
    }
    
    if (!validateAmount()) return;
    
    if (transactionType === 'sell' && !cardCode.trim()) {
      setErrorMessage('Please enter the gift card code/pin');
      return;
    }
    
    setIsProcessing(true);
    setErrorMessage('');
    setSuccessMessage('');
    
    // Simulate API call
    setTimeout(() => {
      setIsProcessing(false);
      if (transactionType === 'sell') {
        setSuccessMessage(`✅ Success! You sold $${amount} ${selectedCard.name} gift card and received $${calculateReceiveAmount().toFixed(2)} in your wallet.`);
      } else {
        setSuccessMessage(`✅ Success! You purchased $${amount} ${selectedCard.name} gift card for $${calculateReceiveAmount().toFixed(2)}. Card details sent to your email.`);
      }
      setAmount('');
      setCardCode('');
      setTimeout(() => setSuccessMessage(''), 5000);
    }, 2000);
  };

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const formatNumber = (num) => {
    if (num >= 1000000000) return `$${(num / 1000000000).toFixed(2)}B`;
    if (num >= 1000000) return `$${(num / 1000000).toFixed(2)}M`;
    if (num >= 1000) return `$${(num / 1000).toFixed(2)}K`;
    return `$${num.toFixed(2)}`;
  };

  const getRateDisplay = () => {
    if (!selectedCard) return 'Select a card first';
    if (transactionType === 'sell') {
      return `1 USD = $${selectedCard.buyRate.toFixed(2)} receive`;
    } else {
      return `1 USD = $${selectedCard.sellRate.toFixed(2)} pay`;
    }
  };

  // Stats data
  const stats = [
    { label: 'Total Volume', value: '$2.4M', icon: TrendingUp, color: 'text-[#0ECB81]' },
    { label: 'Active Users', value: '1,284', icon: Clock, color: 'text-[#F0B90B]' },
    { label: 'Avg. Processing', value: '< 3 min', icon: Sparkles, color: 'text-[#0ECB81]' },
    { label: 'Trust Score', value: '4.92', icon: Shield, color: 'text-[#F0B90B]' },
  ];

  return (
    <div className="space-y-4 pb-24">
      {/* Header Banner */}
      <div className="bg-linear-to-r from-[#F0B90B]/10 via-[#F0B90B]/5 to-transparent rounded-xl p-4">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-[#F0B90B] text-xs font-semibold uppercase tracking-wider">Gift Card Trading</p>
            <p className="text-white text-lg font-bold">Instant Exchange</p>
            <p className="text-[#A0A5AA] text-xs mt-1">Best rates • Secure • Instant payout</p>
          </div>
          <div className="flex items-center gap-2 text-[#0ECB81] bg-[#0ECB81]/10 px-3 py-1.5 rounded-full">
            <Shield size={14} />
            <span className="text-xs font-semibold">100% Protected</span>
          </div>
        </div>
      </div>

      {/* Stats Row */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-2">
        {stats.map((stat, idx) => {
          const Icon = stat.icon;
          return (
            <div key={idx} className="bg-[#1E2329] rounded-xl p-3 border border-[#2B3139]">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-[#A0A5AA] text-[9px]">{stat.label}</p>
                  <p className="text-white text-sm font-bold">{stat.value}</p>
                </div>
                <Icon size={16} className={stat.color} />
              </div>
            </div>
          );
        })}
      </div>

      {/* Transaction Type Toggle */}
      <div className="flex gap-1.5 p-0.5 bg-[#1E2329] rounded-lg">
        {[
          { id: 'sell', label: 'Sell Gift Card → Get Cash', icon: ArrowRightLeft },
          { id: 'buy', label: 'Buy Gift Card', icon: Sparkles },
        ].map((type) => {
          const Icon = type.icon;
          const isActive = transactionType === type.id;
          return (
            <button
              key={type.id}
              onClick={() => {
                setTransactionType(type.id);
                setErrorMessage('');
                setSuccessMessage('');
              }}
              className={`flex-1 flex items-center justify-center gap-1.5 py-2 rounded-md font-semibold text-[11px] transition-all ${
                isActive
                  ? 'bg-[#F0B90B] text-[#0A0B0D]'
                  : 'text-[#A0A5AA]'
              }`}
            >
              <Icon size={12} />
              {type.label}
            </button>
          );
        })}
      </div>

      {/* Gift Card Selection */}
      <div className="bg-[#1E2329] rounded-xl p-4 border border-[#2B3139]">
        <label className="block text-[#A0A5AA] text-xs mb-2">
          Select Gift Card Brand
        </label>
        <div className="relative">
          <button
            onClick={() => setDropdownOpen(!dropdownOpen)}
            className="w-full bg-[#0A0B0D] border border-[#2B3139] rounded-lg px-3 py-2.5 text-left flex items-center justify-between hover:border-[#F0B90B] transition-all"
          >
            <div className="flex items-center gap-2">
              {selectedCard ? (
                <>
                  <span className="text-xl">{selectedCard.logo}</span>
                  <span className="text-white text-sm font-medium">{selectedCard.name}</span>
                  {selectedCard.popular && (
                    <span className="text-[9px] bg-[#F0B90B]/20 text-[#F0B90B] px-1.5 py-0.5 rounded-full flex items-center gap-0.5">
                      <Star size={8} /> Popular
                    </span>
                  )}
                </>
              ) : (
                <span className="text-[#A0A5AA] text-sm">Choose a gift card...</span>
              )}
            </div>
            <ChevronDown size={14} className={`text-[#A0A5AA] transition-transform ${dropdownOpen ? 'rotate-180' : ''}`} />
          </button>
          
          {dropdownOpen && (
            <div className="absolute z-20 mt-2 w-full bg-[#1E2329] border border-[#2B3139] rounded-xl shadow-xl overflow-hidden">
              <div className="p-2 border-b border-[#2B3139]">
                <div className="relative">
                  <Search size={12} className="absolute left-2.5 top-1/2 transform -translate-y-1/2 text-[#A0A5AA]" />
                  <input
                    type="text"
                    placeholder="Search brands..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full bg-[#0A0B0D] border border-[#2B3139] rounded-lg pl-8 pr-2 py-1.5 text-white text-xs placeholder-[#A0A5AA] focus:outline-none focus:border-[#F0B90B]"
                  />
                </div>
              </div>
              <div className="max-h-56 overflow-y-auto">
                {filteredCards.map((card) => (
                  <button
                    key={card.id}
                    onClick={() => handleSelectCard(card)}
                    className="w-full px-3 py-2 flex items-center justify-between hover:bg-[#2B3139] transition-colors text-left"
                  >
                    <div className="flex items-center gap-2">
                      <span className="text-lg">{card.logo}</span>
                      <div>
                        <p className="text-white text-xs font-medium">{card.name}</p>
                        <p className="text-[#A0A5AA] text-[9px]">${card.minAmount} - ${card.maxAmount}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-[#F0B90B] text-[10px] font-medium">{card.buyRate * 100}% rate</p>
                      <p className="text-[#A0A5AA] text-[8px]">{card.volume} traded</p>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Trade Form */}
      <form onSubmit={handleSubmit} className="bg-[#1E2329] rounded-xl p-4 border border-[#2B3139]">
        <div className="space-y-3">
          {/* Amount Input */}
          <div>
            <div className="flex justify-between mb-1">
              <label className="text-[#A0A5AA] text-xs">Amount (USD)</label>
              {selectedCard && (
                <span className="text-[#A0A5AA] text-[9px]">
                  Min: ${selectedCard.minAmount} | Max: ${selectedCard.maxAmount}
                </span>
              )}
            </div>
            <div className="relative">
              <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[#A0A5AA] text-sm">$</span>
              <input
                type="number"
                step="0.01"
                value={amount}
                onChange={(e) => {
                  setAmount(e.target.value);
                  setErrorMessage('');
                }}
                placeholder="0.00"
                className="w-full bg-[#0A0B0D] border border-[#2B3139] rounded-lg pl-7 pr-3 py-2.5 text-white text-sm placeholder-[#A0A5AA] focus:outline-none focus:border-[#F0B90B]"
                disabled={!selectedCard}
              />
            </div>
          </div>

          {/* Rate Display */}
          {selectedCard && (
            <div className="bg-[#0A0B0D] rounded-lg p-2 flex items-center justify-between">
              <span className="text-[#A0A5AA] text-[10px]">Current Rate</span>
              <span className="text-[#F0B90B] font-mono text-[11px] font-semibold">{getRateDisplay()}</span>
            </div>
          )}

          {/* Calculated Amount */}
          {selectedCard && amount && parseFloat(amount) > 0 && (
            <div className="bg-[#0ECB81]/10 rounded-lg p-3 border border-[#0ECB81]/20">
              <div className="flex items-center justify-between">
                <span className="text-[#A0A5AA] text-xs">
                  {transactionType === 'sell' ? 'You receive:' : 'You pay:'}
                </span>
                <span className="text-white text-lg font-bold">
                  ${calculateReceiveAmount().toFixed(2)}
                </span>
              </div>
              <div className="flex items-center justify-between mt-1">
                <span className="text-[#A0A5AA] text-[9px]">Rate applied</span>
                <span className="text-[#0ECB81] text-[9px]">{calculateRatePercentage()}%</span>
              </div>
              <p className="text-[#A0A5AA] text-[9px] mt-2">
                {transactionType === 'sell' 
                  ? '💰 Amount credited to wallet instantly' 
                  : '📧 Gift card code delivered to email'}
              </p>
            </div>
          )}

          {/* Card Code Input (only for selling) */}
          {transactionType === 'sell' && (
            <div>
              <label className="block text-[#A0A5AA] text-xs mb-1">
                Gift Card Code / PIN
              </label>
              <textarea
                value={cardCode}
                onChange={(e) => setCardCode(e.target.value)}
                placeholder="Enter the gift card code or PIN..."
                rows={2}
                className="w-full bg-[#0A0B0D] border border-[#2B3139] rounded-lg px-3 py-2 text-white text-xs placeholder-[#A0A5AA] focus:outline-none focus:border-[#F0B90B] resize-none"
                disabled={!selectedCard}
              />
              <p className="text-[#A0A5AA] text-[8px] mt-1 flex items-center gap-1">
                <Shield size={10} />
                Your code is encrypted and secure
              </p>
            </div>
          )}

          {/* Error Message */}
          {errorMessage && (
            <div className="flex items-center gap-2 bg-[#F6465D]/10 border border-[#F6465D]/20 rounded-lg p-2">
              <AlertCircle size={14} className="text-[#F6465D]" />
              <p className="text-[#F6465D] text-[11px]">{errorMessage}</p>
            </div>
          )}

          {/* Success Message */}
          {successMessage && (
            <div className="flex items-center gap-2 bg-[#0ECB81]/10 border border-[#0ECB81]/20 rounded-lg p-2">
              <CheckCircle size={14} className="text-[#0ECB81]" />
              <p className="text-[#0ECB81] text-[11px]">{successMessage}</p>
            </div>
          )}

          {/* Submit Button */}
          <button
            type="submit"
            disabled={!selectedCard || !amount || isProcessing || (transactionType === 'sell' && !cardCode)}
            className="w-full py-2.5 bg-[#F0B90B] disabled:opacity-50 disabled:cursor-not-allowed text-[#0A0B0D] text-xs font-semibold rounded-lg transition-all active:scale-95 flex items-center justify-center gap-2"
          >
            {isProcessing ? (
              <>
                <div className="w-3.5 h-3.5 border-2 border-[#0A0B0D] border-t-transparent rounded-full animate-spin" />
                Processing...
              </>
            ) : (
              <>
                {transactionType === 'sell' ? 'Sell Gift Card' : 'Buy Gift Card'}
              </>
            )}
          </button>
        </div>
      </form>

      {/* Popular Cards Section */}
      <div className="bg-[#1E2329] rounded-xl p-4 border border-[#2B3139]">
        <div className="flex items-center gap-1.5 mb-3">
          <Sparkles size={14} className="text-[#F0B90B]" />
          <h3 className="text-white text-xs font-semibold">🔥 Popular Gift Cards</h3>
        </div>
        <div className="space-y-2">
          {popularCards.map((card) => (
            <button
              key={card.id}
              onClick={() => handleSelectCard(card)}
              className="w-full flex items-center justify-between p-2.5 bg-[#0A0B0D] rounded-lg hover:bg-[#2B3139] transition-all"
            >
              <div className="flex items-center gap-2">
                <span className="text-xl">{card.logo}</span>
                <div className="text-left">
                  <p className="text-white text-xs font-medium">{card.name}</p>
                  <p className="text-[#A0A5AA] text-[9px]">Rate: {card.buyRate * 100}%</p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-[#F0B90B] text-[10px] font-mono">{card.processingTime}</p>
                <p className="text-[#A0A5AA] text-[8px]">{card.volume}</p>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* How It Works */}
      <div className="bg-[#1E2329] rounded-xl p-4 border border-[#2B3139]">
        <h3 className="text-white text-xs font-semibold mb-3">📘 How It Works</h3>
        <div className="space-y-2.5">
          <div className="flex items-start gap-2">
            <div className="w-5 h-5 rounded-full bg-[#F0B90B]/20 text-[#F0B90B] flex items-center justify-center text-[9px] font-bold shrink-0">1</div>
            <div>
              <p className="text-white text-[11px] font-medium">Select gift card</p>
              <p className="text-[#A0A5AA] text-[9px]">Choose your brand and enter amount</p>
            </div>
          </div>
          <div className="flex items-start gap-2">
            <div className="w-5 h-5 rounded-full bg-[#F0B90B]/20 text-[#F0B90B] flex items-center justify-center text-[9px] font-bold shrink-0">2</div>
            <div>
              <p className="text-white text-[11px] font-medium">Enter details</p>
              <p className="text-[#A0A5AA] text-[9px]">Provide card code (sell) or proceed to payment (buy)</p>
            </div>
          </div>
          <div className="flex items-start gap-2">
            <div className="w-5 h-5 rounded-full bg-[#F0B90B]/20 text-[#F0B90B] flex items-center justify-center text-[9px] font-bold shrink-0">3</div>
            <div>
              <p className="text-white text-[11px] font-medium">Instant settlement</p>
              <p className="text-[#A0A5AA] text-[9px]">Get cash in wallet or receive e-gift card</p>
            </div>
          </div>
        </div>
      </div>

      {/* Features List */}
      <div className="bg-linear-to-r from-[#F0B90B]/10 to-transparent rounded-xl p-3 border border-[#F0B90B]/20">
        <div className="flex flex-wrap gap-3">
          <div className="flex items-center gap-1.5">
            <Shield size={12} className="text-[#0ECB81]" />
            <span className="text-white text-[10px]">100% secure</span>
          </div>
          <div className="flex items-center gap-1.5">
            <Clock size={12} className="text-[#F0B90B]" />
            <span className="text-white text-[10px]">Instant processing</span>
          </div>
          <div className="flex items-center gap-1.5">
            <Star size={12} className="text-[#F0B90B]" />
            <span className="text-white text-[10px]">Best rates guaranteed</span>
          </div>
        </div>
        <p className="text-[#A0A5AA] text-[9px] text-center mt-2">⭐ 4.92 · 12,847+ reviews</p>
      </div>

      {/* Supported Brands Strip */}
      <div className="flex flex-wrap justify-center gap-3 py-2">
        <span className="text-[#A0A5AA] text-[9px]">Amazon</span>
        <span className="text-[#A0A5AA] text-[9px]">Google Play</span>
        <span className="text-[#A0A5AA] text-[9px]">iTunes</span>
        <span className="text-[#A0A5AA] text-[9px]">Steam</span>
        <span className="text-[#A0A5AA] text-[9px]">Xbox</span>
        <span className="text-[#A0A5AA] text-[9px]">Netflix</span>
        <span className="text-[#A0A5AA] text-[9px]">Spotify</span>
      </div>
    </div>
  );
};

export default GiftCardScreen;