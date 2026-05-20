import React, { useState, useEffect } from "react";
import {
  Home,
  TrendingUp,
  Users,
  Gift,
  Bot,
  Bell,
  User,
  Search,
  Send,
  Wallet,
  RefreshCw,
  FilterX as Filter,
  LineChart,
  Shield,
  ChevronDown,
  ClipboardList,
  BookOpen,
  History,
  XIcon as X,
  Minus,
  Plus,
  ChevronRight,
  Copy
} from "lucide-react";

// ============================================================
// CONSTANTS & DATA
// ============================================================

const GIFT_CARDS = [
  {
    name: "Amazon",
    discount: "5%",
    minAmount: 25,
    maxAmount: 500,
    popular: true,
    icon: "📦",
  },
  {
    name: "Google Play",
    discount: "3%",
    minAmount: 10,
    maxAmount: 500,
    popular: true,
    icon: "🎮",
  },
  {
    name: "Steam",
    discount: "8%",
    minAmount: 20,
    maxAmount: 500,
    popular: false,
    icon: "🎯",
  },
  {
    name: "Apple",
    discount: "4%",
    minAmount: 25,
    maxAmount: 500,
    popular: true,
    icon: "🍎",
  },
];

// ============================================================
// COMPONENTS
// ============================================================

// Home Screen Component - Institutional Grade with Smaller Fonts
const HomeScreen = () => {
  const [showBalance, setShowBalance] = useState(true);
  const [selectedMarketTab, setSelectedMarketTab] = useState("altcoins");
  const [selectedMarketItem, setSelectedMarketItem] = useState(null);
  const [showMarketModal, setShowMarketModal] = useState(false);
  const [userAssets, setUserAssets] = useState([
    {
      id: 1,
      symbol: "USDT",
      name: "Tether",
      amount: 5240.5,
      value: 5240.5,
      change: "+0.01%",
      positive: true,
      chain: "altcoin",
      icon: "💵",
      color: "#26A17B",
      receiveAddress: "0x1234...5678",
      decimals: 6,
    },
    {
      id: 2,
      symbol: "USDC",
      name: "USD Coin",
      amount: 3120.0,
      value: 3120.0,
      change: "+0.01%",
      positive: true,
      chain: "altcoin",
      icon: "💎",
      color: "#2775CA",
      receiveAddress: "0x2345...6789",
      decimals: 6,
    },
    {
      id: 3,
      symbol: "DAI",
      name: "Dai",
      amount: 1500.0,
      value: 1500.0,
      change: "+0.02%",
      positive: true,
      chain: "altcoin",
      icon: "🪙",
      color: "#F5AC37",
      receiveAddress: "0x3456...7890",
      decimals: 18,
    },
    {
      id: 4,
      symbol: "BTC",
      name: "Bitcoin",
      amount: 0.42,
      value: 18450.0,
      change: "+2.4%",
      positive: true,
      chain: "altcoin",
      icon: "₿",
      color: "#F7931A",
      receiveAddress: "bc1q...xyz",
      decimals: 8,
    },
    {
      id: 5,
      symbol: "ETH",
      name: "Ethereum",
      amount: 3.2,
      value: 5340.8,
      change: "+1.8%",
      positive: true,
      chain: "altcoin",
      icon: "Ξ",
      color: "#627EEA",
      receiveAddress: "0x4567...8901",
      decimals: 18,
    },
    {
      id: 6,
      symbol: "SOL",
      name: "Solana",
      amount: 25.0,
      value: 2462.5,
      change: "+5.2%",
      positive: true,
      chain: "altcoin",
      icon: "◎",
      color: "#00FFA3",
      receiveAddress: "Solana...xyz",
      decimals: 9,
    },
    {
      id: 7,
      symbol: "TRX",
      name: "Tron",
      amount: 15000,
      value: 1245.0,
      change: "+3.1%",
      positive: true,
      chain: "altcoin",
      icon: "T",
      color: "#FF0000",
      receiveAddress: "T...xyz",
      decimals: 6,
    },
    {
      id: 8,
      symbol: "DOGE",
      name: "Dogecoin",
      amount: 12500,
      value: 1025.0,
      change: "+15.7%",
      positive: true,
      chain: "memecoin",
      icon: "🐕",
      color: "#C3A634",
      receiveAddress: "D...xyz",
      decimals: 8,
    },
    {
      id: 9,
      symbol: "SHIB",
      name: "Shiba Inu",
      amount: 5000000,
      value: 115.0,
      change: "+8.3%",
      positive: true,
      chain: "memecoin",
      icon: "🐕‍🦺",
      color: "#FF5A5F",
      receiveAddress: "0x5678...9012",
      decimals: 18,
    },
    {
      id: 10,
      symbol: "PEPE",
      name: "Pepe",
      amount: 25000000,
      value: 187.5,
      change: "+22.4%",
      positive: true,
      chain: "memecoin",
      icon: "🐸",
      color: "#4CAF50",
      receiveAddress: "0x6789...0123",
      decimals: 18,
    },
  ]);

  const [totalPortfolioValue, setTotalPortfolioValue] = useState(0);
  const [totalProfit, setTotalProfit] = useState(0);
  const [profitPercentage, setProfitPercentage] = useState(0);
  const [selectedAsset, setSelectedAsset] = useState(null);
  const [showTransactionModal, setShowTransactionModal] = useState(false);
  const [transactionType, setTransactionType] = useState("send");
  const [transactionAmount, setTransactionAmount] = useState("");
  const [transactionAddress, setTransactionAddress] = useState("");
  const [showNotification, setShowNotification] = useState(false);
  const [notificationMessage, setNotificationMessage] = useState("");
  const [notificationType, setNotificationType] = useState("success");
  const [copiedAddress, setCopiedAddress] = useState(false);

  // Swap States - Institutional Grade
  const [showSwapModal, setShowSwapModal] = useState(false);
  const [swapFromAsset, setSwapFromAsset] = useState(null);
  const [swapToAsset, setSwapToAsset] = useState(null);
  const [swapAmount, setSwapAmount] = useState("");
  const [swapSlippage, setSwapSlippage] = useState(0.5);
  const [isCalculating, setIsCalculating] = useState(false);
  const [estimatedOutput, setEstimatedOutput] = useState(0);
  const [minimumReceived, setMinimumReceived] = useState(0);
  const [priceImpact, setPriceImpact] = useState(0);
  const [routeInfo, setRouteInfo] = useState(null);
  const [showAssetSelector, setShowAssetSelector] = useState(null); // 'from' or 'to'

  // Market Data with liquidity pools
  const [marketData, setMarketData] = useState({
    altcoins: [
      {
        symbol: "BTC",
        name: "Bitcoin",
        price: 43521.2,
        change: 2.4,
        positive: true,
        icon: "₿",
        color: "#F7931A",
        high24h: 44200,
        low24h: 42500,
        volume: 24500000000,
        marketCap: 850000000000,
        supply: 19500000,
        liquidity: 500000000,
      },
      {
        symbol: "ETH",
        name: "Ethereum",
        price: 2345.67,
        change: 1.8,
        positive: true,
        icon: "Ξ",
        color: "#627EEA",
        high24h: 2380,
        low24h: 2300,
        volume: 12300000000,
        marketCap: 280000000000,
        supply: 120000000,
        liquidity: 300000000,
      },
      {
        symbol: "USDT",
        name: "Tether",
        price: 1.0,
        change: 0.01,
        positive: true,
        icon: "💵",
        color: "#26A17B",
        high24h: 1.0,
        low24h: 1.0,
        volume: 45000000000,
        marketCap: 83000000000,
        supply: 83000000000,
        liquidity: 1000000000,
      },
      {
        symbol: "TRX",
        name: "Tron",
        price: 0.083,
        change: 3.1,
        positive: true,
        icon: "T",
        color: "#FF0000",
        high24h: 0.085,
        low24h: 0.081,
        volume: 1200000000,
        marketCap: 7400000000,
        supply: 100000000000,
        liquidity: 50000000,
      },
      {
        symbol: "SOL",
        name: "Solana",
        price: 98.45,
        change: 5.2,
        positive: true,
        icon: "◎",
        color: "#00FFA3",
        high24h: 100.5,
        low24h: 95.2,
        volume: 3100000000,
        marketCap: 42000000000,
        supply: 430000000,
        liquidity: 150000000,
      },
      {
        symbol: "BNB",
        name: "BNB",
        price: 315.42,
        change: 0.5,
        positive: true,
        icon: "B",
        color: "#F3BA2F",
        high24h: 318.5,
        low24h: 312.0,
        volume: 1200000000,
        marketCap: 50000000000,
        supply: 160000000,
        liquidity: 200000000,
      },
    ],
    memecoins: [
      {
        symbol: "DOGE",
        name: "Dogecoin",
        price: 0.082,
        change: 15.7,
        positive: true,
        icon: "🐕",
        color: "#C3A634",
        high24h: 0.085,
        low24h: 0.078,
        volume: 850000000,
        marketCap: 11500000000,
        supply: 140000000000,
        liquidity: 25000000,
      },
      {
        symbol: "SHIB",
        name: "Shiba Inu",
        price: 0.000023,
        change: 8.3,
        positive: true,
        icon: "🐕‍🦺",
        color: "#FF5A5F",
        high24h: 0.000024,
        low24h: 0.000022,
        volume: 420000000,
        marketCap: 13500000000,
        supply: 589000000000000,
        liquidity: 15000000,
      },
      {
        symbol: "PEPE",
        name: "Pepe",
        price: 0.0000075,
        change: 22.4,
        positive: true,
        icon: "🐸",
        color: "#4CAF50",
        high24h: 0.0000082,
        low24h: 0.0000071,
        volume: 310000000,
        marketCap: 3200000000,
        supply: 420000000000000,
        liquidity: 10000000,
      },
      {
        symbol: "FLOKI",
        name: "Floki",
        price: 0.00018,
        change: 12.1,
        positive: true,
        icon: "🐕",
        color: "#00BCD4",
        high24h: 0.00019,
        low24h: 0.00017,
        volume: 195000000,
        marketCap: 1700000000,
        supply: 9500000000000,
        liquidity: 8000000,
      },
      {
        symbol: "BONK",
        name: "Bonk",
        price: 0.000015,
        change: 18.3,
        positive: true,
        icon: "🐕",
        color: "#FF6B35",
        high24h: 0.000016,
        low24h: 0.000014,
        volume: 178000000,
        marketCap: 950000000,
        supply: 65000000000000,
        liquidity: 5000000,
      },
      {
        symbol: "WIF",
        name: "Wif",
        price: 0.0024,
        change: 9.7,
        positive: true,
        icon: "🐱",
        color: "#9C27B0",
        high24h: 0.0025,
        low24h: 0.0023,
        volume: 95000000,
        marketCap: 240000000,
        supply: 100000000000,
        liquidity: 3000000,
      },
    ],
    nfts: [
      {
        collection: "Bored Ape",
        floorPrice: 12.5,
        volume: 2400,
        change: 5.2,
        positive: true,
        icon: "🦍",
        currency: "ETH",
        totalSupply: 10000,
        owners: 5400,
      },
      {
        collection: "Pudgy Penguins",
        floorPrice: 4.2,
        volume: 890,
        change: 12.3,
        positive: true,
        icon: "🐧",
        currency: "ETH",
        totalSupply: 8888,
        owners: 4200,
      },
      {
        collection: "Azuki",
        floorPrice: 3.8,
        volume: 1200,
        change: -2.1,
        positive: false,
        icon: "⛩️",
        currency: "ETH",
        totalSupply: 10000,
        owners: 3800,
      },
      {
        collection: "CloneX",
        floorPrice: 2.9,
        volume: 650,
        change: 3.4,
        positive: true,
        icon: "🤖",
        currency: "ETH",
        totalSupply: 20000,
        owners: 8900,
      },
      {
        collection: "Moonbirds",
        floorPrice: 2.1,
        volume: 420,
        change: 1.8,
        positive: true,
        icon: "🦉",
        currency: "ETH",
        totalSupply: 10000,
        owners: 5600,
      },
      {
        collection: "Doodles",
        floorPrice: 1.8,
        volume: 380,
        change: -1.5,
        positive: false,
        icon: "🎨",
        currency: "ETH",
        totalSupply: 10000,
        owners: 6100,
      },
    ],
  });

  // Calculate totals
  useEffect(() => {
    const totalValue = userAssets.reduce((sum, asset) => sum + asset.value, 0);
    setTotalPortfolioValue(totalValue);
    const simulatedProfit = totalValue * 0.082;
    setTotalProfit(simulatedProfit);
    setProfitPercentage(8.2);
  }, [userAssets]);

  // Real-time swap calculation
  useEffect(() => {
    if (swapFromAsset && swapToAsset && swapAmount && parseFloat(swapAmount) > 0) {
      const amount = parseFloat(swapAmount);
      const fromPrice = getAssetPrice(swapFromAsset.symbol);
      const toPrice = getAssetPrice(swapToAsset.symbol);
      const fromLiquidity = getAssetLiquidity(swapFromAsset.symbol);
      const toLiquidity = getAssetLiquidity(swapToAsset.symbol);
      
      const valueInUSD = amount * fromPrice;
      let outputAmount = valueInUSD / toPrice;
      
      const tradeValueUSD = valueInUSD;
      const avgLiquidity = (fromLiquidity + toLiquidity) / 2;
      let impact = (tradeValueUSD / avgLiquidity) * 100;
      impact = Math.min(impact, 15);
      setPriceImpact(impact);
      
      outputAmount = outputAmount * (1 - impact / 100);
      const fee = outputAmount * 0.0025;
      outputAmount = outputAmount - fee;
      
      const slippageAmount = outputAmount * (swapSlippage / 100);
      const minReceived = outputAmount - slippageAmount;
      
      setEstimatedOutput(outputAmount);
      setMinimumReceived(minReceived);
      
      if (impact < 0.5) {
        setRouteInfo({ type: "direct", message: "Direct route - Best rate" });
      } else if (impact < 2) {
        setRouteInfo({ type: "stable", message: "Stable route - Low impact" });
      } else if (impact < 5) {
        setRouteInfo({ type: "multi", message: "Multi-hop route - Medium impact" });
      } else {
        setRouteInfo({ type: "warning", message: "High price impact - Consider smaller amount" });
      }
    } else {
      setEstimatedOutput(0);
      setMinimumReceived(0);
      setPriceImpact(0);
      setRouteInfo(null);
    }
  }, [swapFromAsset, swapToAsset, swapAmount, swapSlippage]);

  const getAssetLiquidity = (symbol) => {
    const allCoins = [...marketData.altcoins, ...marketData.memecoins];
    const coin = allCoins.find((c) => c.symbol === symbol);
    return coin ? coin.liquidity : 1000000;
  };

  const altcoinAssets = userAssets.filter((asset) => asset.chain === "altcoin");
  const memecoinAssets = userAssets.filter(
    (asset) => asset.chain === "memecoin",
  );

  const getTotalByCategory = (category) => {
    const assets = userAssets.filter((asset) => asset.chain === category);
    return assets.reduce((sum, asset) => sum + asset.value, 0);
  };

  const formatNumber = (num) => {
    if (num >= 1000000000) return `$${(num / 1000000000).toFixed(2)}B`;
    if (num >= 1000000) return `$${(num / 1000000).toFixed(2)}M`;
    if (num >= 1000) return `$${(num / 1000).toFixed(2)}K`;
    return `$${num.toFixed(2)}`;
  };

  const formatPrice = (price) => {
    if (price < 0.001) return price.toFixed(8);
    if (price < 1) return price.toFixed(4);
    return price.toLocaleString();
  };

  const getAssetPrice = (symbol) => {
    const allCoins = [...marketData.altcoins, ...marketData.memecoins];
    const coin = allCoins.find((c) => c.symbol === symbol);
    return coin ? coin.price : 1;
  };

  const handleSwap = async () => {
    if (!swapFromAsset || !swapToAsset) {
      showNotificationMessage("Please select both tokens", "error");
      return;
    }

    if (swapFromAsset.id === swapToAsset.id) {
      showNotificationMessage("Cannot swap the same token", "error");
      return;
    }

    if (!swapAmount || parseFloat(swapAmount) <= 0) {
      showNotificationMessage("Please enter a valid amount", "error");
      return;
    }

    const amount = parseFloat(swapAmount);
    if (amount > swapFromAsset.amount) {
      showNotificationMessage("Insufficient balance", "error");
      return;
    }

    if (estimatedOutput <= 0) {
      showNotificationMessage("Unable to calculate swap output", "error");
      return;
    }

    if (priceImpact > 5) {
      const confirmed = window.confirm(
        `Warning: High price impact of ${priceImpact.toFixed(2)}%.\n` +
        `You will receive significantly less than the market rate.\n` +
        `Do you want to continue?`
      );
      if (!confirmed) return;
    }

    setIsCalculating(true);

    setTimeout(() => {
      setUserAssets((prev) =>
        prev.map((asset) => {
          if (asset.id === swapFromAsset.id) {
            const newAmount = asset.amount - amount;
            const newValue = newAmount * getAssetPrice(asset.symbol);
            return { ...asset, amount: newAmount, value: newValue };
          }
          if (asset.id === swapToAsset.id) {
            const newAmount = asset.amount + estimatedOutput;
            const newValue = newAmount * getAssetPrice(asset.symbol);
            return { ...asset, amount: newAmount, value: newValue };
          }
          return asset;
        })
      );

      showNotificationMessage(
        `✓ Swapped ${amount.toFixed(4)} ${swapFromAsset.symbol} → ${estimatedOutput.toFixed(6)} ${swapToAsset.symbol}`,
        "success"
      );

      setShowSwapModal(false);
      setSwapAmount("");
      setSwapFromAsset(null);
      setSwapToAsset(null);
      setEstimatedOutput(0);
      setMinimumReceived(0);
      setPriceImpact(0);
      setIsCalculating(false);
    }, 1500);
  };

  const handleSend = (asset) => {
    setSelectedAsset(asset);
    setTransactionType("send");
    setTransactionAmount("");
    setTransactionAddress("");
    setShowTransactionModal(true);
  };

  const handleReceive = (asset) => {
    setSelectedAsset(asset);
    setTransactionType("receive");
    setShowTransactionModal(true);
  };

  const handleSwapClick = (asset) => {
    setSwapFromAsset(asset);
    setSwapToAsset(null);
    setSwapAmount("");
    setEstimatedOutput(0);
    setMinimumReceived(0);
    setPriceImpact(0);
    setShowSwapModal(true);
  };

  const handleMarketItemClick = (item, type) => {
    setSelectedMarketItem({ ...item, type });
    setShowMarketModal(true);
  };

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text);
    setCopiedAddress(true);
    showNotificationMessage("Address copied to clipboard!", "success");
    setTimeout(() => setCopiedAddress(false), 2000);
  };

  const executeTransaction = () => {
    if (transactionType === "send") {
      if (!transactionAmount || !transactionAddress) {
        showNotificationMessage("Please fill all fields", "error");
        return;
      }

      const amount = parseFloat(transactionAmount);
      if (amount > selectedAsset.value) {
        showNotificationMessage("Insufficient balance", "error");
        return;
      }

      setUserAssets((prev) =>
        prev.map((asset) => {
          if (asset.id === selectedAsset.id) {
            const newAmount =
              asset.amount - amount / (asset.value / asset.amount);
            const newValue = newAmount * (asset.value / asset.amount);
            return { ...asset, amount: newAmount, value: newValue };
          }
          return asset;
        }),
      );

      showNotificationMessage(
        `Successfully sent ${amount} ${selectedAsset.symbol}`,
        "success",
      );
      setShowTransactionModal(false);
      setTransactionAmount("");
      setTransactionAddress("");
    }
  };

  const showNotificationMessage = (message, type) => {
    setNotificationMessage(message);
    setNotificationType(type);
    setShowNotification(true);
    setTimeout(() => setShowNotification(false), 3000);
  };

  const AssetSelectionModal = ({ isOpen, onClose, onSelect, title, selectedAsset, type }) => {
    if (!isOpen) return null;

    const allAssets = [...altcoinAssets, ...memecoinAssets];

    return (
      <div
        className="fixed inset-0 bg-black/80 z-250 flex items-end justify-center animate-fade-in"
        onClick={onClose}
      >
        <div
          className="bg-[#1E2329] w-full max-w-md rounded-t-2xl p-5 animate-slide-up pb-8 max-h-[80vh] overflow-y-auto"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="flex justify-between items-center mb-4 sticky top-0 bg-[#1E2329] pt-0 pb-2">
            <h3 className="text-white font-semibold text-base">{title}</h3>
            <button onClick={onClose} className="text-[#A0A5AA]">
              ✕
            </button>
          </div>

          <div className="space-y-2">
            {allAssets.map((asset) => (
              <button
                key={asset.id}
                onClick={() => {
                  onSelect(asset);
                  onClose();
                }}
                className={`w-full flex items-center justify-between p-3 rounded-xl transition-all ${
                  selectedAsset?.id === asset.id
                    ? "bg-[#F0B90B]/20 border border-[#F0B90B]"
                    : "bg-[#2B3139] hover:bg-[#363D45]"
                }`}
              >
                <div className="flex items-center gap-3">
                  <div
                    className="w-8 h-8 rounded-full flex items-center justify-center text-base"
                    style={{
                      backgroundColor: `${asset.color}20`,
                      color: asset.color,
                    }}
                  >
                    {asset.icon}
                  </div>
                  <div className="text-left">
                    <p className="text-white font-medium text-sm">{asset.name}</p>
                    <p className="text-[#A0A5AA] text-xs">{asset.symbol}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-white text-sm">
                    {asset.amount.toLocaleString()}
                  </p>
                  <p className="text-[#A0A5AA] text-xs">
                    {formatNumber(asset.value)}
                  </p>
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="space-y-4 pb-24">
      {/* Notification Toast */}
      {showNotification && (
        <div
          className={`fixed top-20 left-4 right-4 z-100 p-3 rounded-xl animate-slide-down whitespace-pre-line ${
            notificationType === "success"
              ? "bg-[#0ECB81]/90"
              : notificationType === "error"
                ? "bg-[#F6465D]/90"
                : "bg-[#F0B90B]/90"
          }`}
        >
          <p className="text-white text-xs font-medium text-center">
            {notificationMessage}
          </p>
        </div>
      )}

      {/* Balance Card */}
      <div
        id="balance-card"
        className="bg-linear-to-br from-[#1E2329] to-[#2B3139] rounded-2xl p-4"
      >
        <div className="flex justify-between items-start mb-3">
          <div>
            <p className="text-[#A0A5AA] text-xs">Total Balance</p>
            <div className="flex items-center gap-2">
              <h1 className="text-2xl font-bold text-white">
                {showBalance ? formatNumber(totalPortfolioValue) : "••••••"}
              </h1>
              <button
                onClick={() => setShowBalance(!showBalance)}
                className="p-0.5"
              >
                {showBalance ? (
                  <EyeOff size={14} className="text-[#A0A5AA]" />
                ) : (
                  <Eye size={14} className="text-[#A0A5AA]" />
                )}
              </button>
            </div>
          </div>
          <div className="px-2 py-0.5 bg-[#0ECB81]/10 rounded-lg">
            <p className="text-[#0ECB81] text-[10px] font-semibold">
              +${totalProfit.toFixed(2)}
            </p>
          </div>
        </div>

        <div className="grid grid-cols-3 gap-2 mb-3">
          <div className="text-center">
            <p className="text-[#A0A5AA] text-[9px]">24h Change</p>
            <p className="text-[#0ECB81] text-xs font-semibold">
              +{profitPercentage}%
            </p>
          </div>
          <div className="text-center">
            <p className="text-[#A0A5AA] text-[9px]">Assets</p>
            <p className="text-white text-xs font-semibold">
              {userAssets.length}
            </p>
          </div>
          <div className="text-center">
            <p className="text-[#A0A5AA] text-[9px]">Profit</p>
            <p className="text-[#0ECB81] text-xs font-semibold">
              +${totalProfit.toFixed(0)}
            </p>
          </div>
        </div>

        <div className="grid grid-cols-3 gap-2 mt-2">
          <button
            onClick={() => handleSend(altcoinAssets[0])}
            className="flex items-center justify-center gap-1.5 py-2 bg-[#F0B90B] rounded-xl text-[#0A0B0D] text-xs font-semibold active:scale-95 transition-transform"
          >
            <Send size={12} /> Send
          </button>
          <button
            onClick={() => handleReceive(altcoinAssets[0])}
            className="flex items-center justify-center gap-1.5 py-2 bg-[#2B3139] rounded-xl text-white text-xs font-semibold active:scale-95 transition-transform"
          >
            <Wallet size={12} /> Receive
          </button>
          <button
            onClick={() => handleSwapClick(altcoinAssets[0])}
            className="flex items-center justify-center gap-1.5 py-2 bg-[#1E2329] rounded-xl text-white text-xs font-semibold active:scale-95 transition-transform border border-[#F0B90B]/30"
          >
            <RefreshCw size={12} /> Swap
          </button>
        </div>
      </div>

      {/* Category Summary Cards */}
      <div className="grid grid-cols-3 gap-2">
        <div className="bg-[#1E2329] rounded-xl p-2 text-center">
          <p className="text-[#A0A5AA] text-[9px]">💰 Altcoins</p>
          <p className="text-white text-xs font-bold">
            {formatNumber(getTotalByCategory("altcoin"))}
          </p>
          <p className="text-[#0ECB81] text-[8px]">
            {altcoinAssets.length} Assets
          </p>
        </div>
        <div className="bg-[#1E2329] rounded-xl p-2 text-center">
          <p className="text-[#A0A5AA] text-[9px]">🔥 Memecoins</p>
          <p className="text-white text-xs font-bold">
            {formatNumber(getTotalByCategory("memecoin"))}
          </p>
          <p className="text-[#0ECB81] text-[8px]">
            {memecoinAssets.length} Assets
          </p>
        </div>
        <div className="bg-[#1E2329] rounded-xl p-2 text-center cursor-pointer hover:bg-[#2B3139] transition-all">
          <p className="text-[#A0A5AA] text-[9px]">🎨 NFTs</p>
          <p className="text-white text-xs font-bold">$0.00</p>
          <p className="text-[#F0B90B] text-[8px]">Coming Soon</p>
        </div>
      </div>

      {/* Your Assets Section */}
      <div>
        <div className="flex justify-between items-center mb-2 px-1">
          <h2 className="text-white text-sm font-semibold">Your Assets</h2>
        </div>

        <div className="space-y-2">
          {/* Altcoins Section */}
          <div className="mb-3">
            {altcoinAssets.map((asset) => (
              <div
                key={asset.id}
                className="bg-[#1E2329] rounded-xl p-3 hover:bg-[#2B3139] transition-all duration-300 mb-2"
              >
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-3">
                    <div
                      className="w-8 h-8 rounded-full flex items-center justify-center text-base"
                      style={{
                        backgroundColor: `${asset.color}20`,
                        color: asset.color,
                      }}
                    >
                      {asset.icon}
                    </div>
                    <div>
                      <p className="text-white font-semibold text-sm">{asset.name}</p>
                      <p className="text-[#A0A5AA] text-[10px]">{asset.symbol}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-white font-semibold text-sm">
                      {formatNumber(asset.value)}
                    </p>
                    <p
                      className={`text-[10px] ${asset.positive ? "text-[#0ECB81]" : "text-[#F6465D]"}`}
                    >
                      {asset.change}
                    </p>
                  </div>
                </div>

                <div className="flex justify-between items-center pt-2 border-t border-[#2B3139]">
                  <div>
                    <p className="text-[#A0A5AA] text-[9px]">Amount</p>
                    <p className="text-white text-xs font-medium">
                      {asset.amount.toLocaleString()} {asset.symbol}
                    </p>
                  </div>
                  <div className="flex gap-1.5">
                    <button
                      onClick={() => handleSend(asset)}
                      className="px-2.5 py-1 bg-[#F0B90B]/10 rounded-lg text-[#F0B90B] text-[10px] font-semibold"
                    >
                      Send
                    </button>
                    <button
                      onClick={() => handleReceive(asset)}
                      className="px-2.5 py-1 bg-[#2B3139] rounded-lg text-white text-[10px] font-semibold"
                    >
                      Receive
                    </button>
                    <button
                      onClick={() => handleSwapClick(asset)}
                      className="px-2.5 py-1 bg-[#1E2329] rounded-lg text-white text-[10px] font-semibold border border-[#F0B90B]/30"
                    >
                      Swap
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Memecoins Section */}
          <div>
            <p className="text-[#F0B90B] text-[10px] font-semibold mb-2">
              🔥 Memecoins
            </p>
            {memecoinAssets.map((asset) => (
              <div
                key={asset.id}
                className="bg-[#1E2329] rounded-xl p-3 hover:bg-[#2B3139] transition-all duration-300 mb-2"
              >
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-3">
                    <div
                      className="w-8 h-8 rounded-full flex items-center justify-center text-base"
                      style={{
                        backgroundColor: `${asset.color}20`,
                        color: asset.color,
                      }}
                    >
                      {asset.icon}
                    </div>
                    <div>
                      <p className="text-white font-semibold text-sm">{asset.name}</p>
                      <p className="text-[#A0A5AA] text-[10px]">{asset.symbol}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-white font-semibold text-sm">
                      {formatNumber(asset.value)}
                    </p>
                    <p
                      className={`text-[10px] ${asset.positive ? "text-[#0ECB81]" : "text-[#F6465D]"}`}
                    >
                      {asset.change}
                    </p>
                  </div>
                </div>

                <div className="flex justify-between items-center pt-2 border-t border-[#2B3139]">
                  <div>
                    <p className="text-[#A0A5AA] text-[9px]">Amount</p>
                    <p className="text-white text-xs font-medium">
                      {asset.amount.toLocaleString()} {asset.symbol}
                    </p>
                  </div>
                  <div>
                    <p className="text-[#A0A5AA] text-[9px]">Avg Price</p>
                    <p className="text-white text-xs font-medium">
                      ${(asset.value / asset.amount).toFixed(4)}
                    </p>
                  </div>
                  <div className="flex gap-1.5">
                    <button
                      onClick={() => handleSend(asset)}
                      className="px-2.5 py-1 bg-[#F0B90B]/10 rounded-lg text-[#F0B90B] text-[10px] font-semibold"
                    >
                      Send
                    </button>
                    <button
                      onClick={() => handleReceive(asset)}
                      className="px-2.5 py-1 bg-[#2B3139] rounded-lg text-white text-[10px] font-semibold"
                    >
                      Receive
                    </button>
                    <button
                      onClick={() => handleSwapClick(asset)}
                      className="px-2.5 py-1 bg-[#1E2329] rounded-lg text-white text-[10px] font-semibold border border-[#F0B90B]/30"
                    >
                      Swap
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Market Overview */}
      <div>
        <div className="flex justify-between items-center mb-2 px-1">
          <h2 className="text-white text-sm font-semibold">Market Overview</h2>
        </div>

        <div className="flex gap-2 mb-3">
          <button
            onClick={() => setSelectedMarketTab("altcoins")}
            className={`flex-1 py-1.5 rounded-lg font-semibold text-xs transition-all ${
              selectedMarketTab === "altcoins"
                ? "bg-[#F0B90B] text-[#0A0B0D]"
                : "bg-[#1E2329] text-[#A0A5AA]"
            }`}
          >
            Altcoins
          </button>
          <button
            onClick={() => setSelectedMarketTab("memecoins")}
            className={`flex-1 py-1.5 rounded-lg font-semibold text-xs transition-all ${
              selectedMarketTab === "memecoins"
                ? "bg-[#F0B90B] text-[#0A0B0D]"
                : "bg-[#1E2329] text-[#A0A5AA]"
            }`}
          >
            Memecoins 🔥
          </button>
          <button
            onClick={() => setSelectedMarketTab("nfts")}
            className={`flex-1 py-1.5 rounded-lg font-semibold text-xs transition-all ${
              selectedMarketTab === "nfts"
                ? "bg-[#F0B90B] text-[#0A0B0D]"
                : "bg-[#1E2329] text-[#A0A5AA]"
            }`}
          >
            NFTs 🎨
          </button>
        </div>

        <div className="space-y-2">
          {selectedMarketTab === "altcoins" &&
            marketData.altcoins.map((coin, idx) => (
              <div
                key={idx}
                onClick={() => handleMarketItemClick(coin, "altcoin")}
                className="bg-[#1E2329] rounded-xl p-3 hover:bg-[#2B3139] transition-all duration-300 cursor-pointer"
              >
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-3">
                    <div
                      className="w-8 h-8 rounded-full flex items-center justify-center text-base"
                      style={{
                        backgroundColor: `${coin.color}20`,
                        color: coin.color,
                      }}
                    >
                      {coin.icon}
                    </div>
                    <div>
                      <p className="text-white font-semibold text-sm">{coin.name}</p>
                      <p className="text-[#A0A5AA] text-[10px]">
                        {coin.symbol}/USDT
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-white font-semibold text-sm">
                      ${coin.price.toLocaleString()}
                    </p>
                    <p
                      className={`text-[10px] ${coin.positive ? "text-[#0ECB81]" : "text-[#F6465D]"}`}
                    >
                      {coin.positive ? "+" : ""}
                      {coin.change.toFixed(2)}%
                    </p>
                  </div>
                </div>
                <div className="flex justify-between text-[10px] text-[#A0A5AA]">
                  <span>
                    24h Vol: ${(coin.volume / 1000000000).toFixed(1)}B
                  </span>
                  <span>
                    MCap: ${(coin.marketCap / 1000000000).toFixed(1)}B
                  </span>
                </div>
              </div>
            ))}

          {selectedMarketTab === "memecoins" &&
            marketData.memecoins.map((coin, idx) => (
              <div
                key={idx}
                onClick={() => handleMarketItemClick(coin, "memecoin")}
                className="bg-[#1E2329] rounded-xl p-3 hover:bg-[#2B3139] transition-all duration-300 cursor-pointer"
              >
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-3">
                    <div
                      className="w-8 h-8 rounded-full flex items-center justify-center text-base"
                      style={{
                        backgroundColor: `${coin.color}20`,
                        color: coin.color,
                      }}
                    >
                      {coin.icon}
                    </div>
                    <div>
                      <p className="text-white font-semibold text-sm">{coin.name}</p>
                      <p className="text-[#A0A5AA] text-[10px]">
                        {coin.symbol}/USDT
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-white font-semibold text-sm">
                      ${formatPrice(coin.price)}
                    </p>
                    <p
                      className={`text-[10px] ${coin.positive ? "text-[#0ECB81]" : "text-[#F6465D]"}`}
                    >
                      {coin.positive ? "+" : ""}
                      {coin.change.toFixed(2)}%
                    </p>
                  </div>
                </div>
                <div className="flex justify-between text-[10px] text-[#A0A5AA]">
                  <span>24h Vol: ${(coin.volume / 1000000).toFixed(1)}M</span>
                  <span>
                    MCap: ${(coin.marketCap / 1000000000).toFixed(2)}B
                  </span>
                </div>
              </div>
            ))}
        </div>
      </div>

      {/* Market Detail Modal */}
      {showMarketModal && selectedMarketItem && (
        <div
          className="fixed inset-0 bg-black/80 z-200 flex items-end justify-center animate-fade-in"
          onClick={() => setShowMarketModal(false)}
        >
          <div
            className="bg-[#1E2329] w-full max-w-md rounded-t-2xl p-5 animate-slide-up pb-8"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex justify-between items-center mb-4">
              <div className="flex items-center gap-3">
                <div
                  className="w-10 h-10 rounded-full flex items-center justify-center text-xl"
                  style={{
                    backgroundColor: `${selectedMarketItem.color}20`,
                    color: selectedMarketItem.color,
                  }}
                >
                  {selectedMarketItem.icon}
                </div>
                <div>
                  <h3 className="text-white font-bold text-lg">
                    {selectedMarketItem.name}
                  </h3>
                  <p className="text-[#A0A5AA] text-xs">
                    {selectedMarketItem.symbol}
                  </p>
                </div>
              </div>
              <button
                onClick={() => setShowMarketModal(false)}
                className="text-[#A0A5AA] text-xl"
              >
                ✕
              </button>
            </div>

            <div className="space-y-4">
              <div className="p-4 bg-[#2B3139] rounded-xl">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-[#A0A5AA] text-xs">Current Price</span>
                  <span className="text-white text-xl font-bold">
                    ${formatPrice(selectedMarketItem.price)}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#A0A5AA] text-xs">24h Change</span>
                  <span
                    className={`text-xs ${selectedMarketItem.positive ? "text-[#0ECB81]" : "text-[#F6465D]"} font-semibold`}
                  >
                    {selectedMarketItem.positive ? "+" : ""}
                    {selectedMarketItem.change}%
                  </span>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="p-3 bg-[#2B3139] rounded-xl">
                  <p className="text-[#A0A5AA] text-[9px]">24h High</p>
                  <p className="text-white text-sm font-semibold">
                    ${selectedMarketItem.high24h?.toLocaleString()}
                  </p>
                </div>
                <div className="p-3 bg-[#2B3139] rounded-xl">
                  <p className="text-[#A0A5AA] text-[9px]">24h Low</p>
                  <p className="text-white text-sm font-semibold">
                    ${selectedMarketItem.low24h?.toLocaleString()}
                  </p>
                </div>
                <div className="p-3 bg-[#2B3139] rounded-xl">
                  <p className="text-[#A0A5AA] text-[9px]">24h Volume</p>
                  <p className="text-white text-sm font-semibold">
                    ${(selectedMarketItem.volume / 1000000).toFixed(1)}M
                  </p>
                </div>
                <div className="p-3 bg-[#2B3139] rounded-xl">
                  <p className="text-[#A0A5AA] text-[9px]">Market Cap</p>
                  <p className="text-white text-sm font-semibold">
                    ${(selectedMarketItem.marketCap / 1000000000).toFixed(2)}B
                  </p>
                </div>
              </div>

              <div className="flex gap-3 pt-2 pb-4">
                <button
                  onClick={() => {
                    setShowMarketModal(false);
                    const ownedAsset = userAssets.find(
                      (a) => a.symbol === selectedMarketItem.symbol,
                    );
                    if (ownedAsset) {
                      handleSend(ownedAsset);
                    } else {
                      showNotificationMessage(
                        `You don't own any ${selectedMarketItem.symbol} yet`,
                        "info",
                      );
                    }
                  }}
                  className="flex-1 py-2.5 bg-[#F0B90B] rounded-xl text-[#0A0B0D] text-sm font-semibold"
                >
                  {userAssets.find(
                    (a) => a.symbol === selectedMarketItem.symbol,
                  )
                    ? "Send"
                    : "Buy"}
                </button>
                <button
                  onClick={() => {
                    setShowMarketModal(false);
                    const ownedAsset = userAssets.find(
                      (a) => a.symbol === selectedMarketItem.symbol,
                    );
                    handleSwapClick(ownedAsset || userAssets[0]);
                  }}
                  className="flex-1 py-2.5 bg-[#2B3139] rounded-xl text-white text-sm font-semibold"
                >
                  Swap
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Send/Receive Modal */}
      {showTransactionModal && selectedAsset && (
        <div
          className="fixed inset-0 bg-black/80 z-200 flex items-end justify-center animate-fade-in"
          onClick={() => setShowTransactionModal(false)}
        >
          <div
            className="bg-[#1E2329] w-full max-w-md rounded-t-2xl p-5 animate-slide-up pb-8"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex justify-between items-center mb-4">
              <div className="flex items-center gap-3">
                <div
                  className="w-8 h-8 rounded-full flex items-center justify-center text-base"
                  style={{
                    backgroundColor: `${selectedAsset.color}20`,
                    color: selectedAsset.color,
                  }}
                >
                  {selectedAsset.icon}
                </div>
                <div>
                  <h3 className="text-white font-semibold text-base">
                    {transactionType === "send" ? "Send" : "Receive"}{" "}
                    {selectedAsset.symbol}
                  </h3>
                  <p className="text-[#A0A5AA] text-xs">{selectedAsset.name}</p>
                </div>
              </div>
              <button
                onClick={() => setShowTransactionModal(false)}
                className="text-[#A0A5AA]"
              >
                ✕
              </button>
            </div>

            {transactionType === "send" && (
              <>
                <div className="mb-4 p-3 bg-[#2B3139]/50 rounded-xl">
                  <div className="flex justify-between items-center">
                    <div>
                      <p className="text-[#A0A5AA] text-[9px]">
                        Available Balance
                      </p>
                      <p className="text-white font-semibold text-base">
                        {selectedAsset.amount.toLocaleString()}{" "}
                        {selectedAsset.symbol}
                      </p>
                      <p className="text-[#A0A5AA] text-[9px]">
                        ≈ {formatNumber(selectedAsset.value)}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="text-[#A0A5AA] text-[9px]">Network</p>
                      <p className="text-white text-xs font-medium">
                        {selectedAsset.symbol}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="mb-4">
                  <p className="text-[#A0A5AA] text-xs mb-2">Amount</p>
                  <input
                    type="number"
                    value={transactionAmount}
                    onChange={(e) => setTransactionAmount(e.target.value)}
                    placeholder="0.00"
                    className="w-full p-2.5 bg-[#2B3139] rounded-xl text-white text-sm placeholder-[#A0A5AA] focus:outline-none border border-transparent focus:border-[#F0B90B]"
                  />
                  <div className="flex justify-end mt-1">
                    <button
                      onClick={() =>
                        setTransactionAmount(selectedAsset.amount.toString())
                      }
                      className="text-[#F0B90B] text-[10px]"
                    >
                      MAX
                    </button>
                  </div>
                </div>

                <div className="mb-4">
                  <p className="text-[#A0A5AA] text-xs mb-2">
                    Recipient {selectedAsset.symbol} Address
                  </p>
                  <input
                    type="text"
                    value={transactionAddress}
                    onChange={(e) => setTransactionAddress(e.target.value)}
                    placeholder={`Enter ${selectedAsset.symbol} wallet address`}
                    className="w-full p-2.5 bg-[#2B3139] rounded-xl text-white text-sm placeholder-[#A0A5AA] focus:outline-none border border-transparent focus:border-[#F0B90B]"
                  />
                </div>

                <div className="mb-4 p-2.5 bg-[#2B3139]/50 rounded-xl">
                  <p className="text-[#A0A5AA] text-[10px]">Network Fee: ~$0.50</p>
                  <p className="text-[#A0A5AA] text-[10px]">
                    Estimated Arrival: 5-10 minutes
                  </p>
                  <p className="text-[#F6465D] text-[10px] mt-1">
                    ⚠️ Only send {selectedAsset.symbol} to{" "}
                    {selectedAsset.symbol} addresses
                  </p>
                </div>
              </>
            )}

            {transactionType === "receive" && (
              <div className="text-center">
                <div className="mb-4 p-4 bg-[#2B3139] rounded-xl">
                  <p className="text-[#A0A5AA] text-xs mb-2">
                    Your {selectedAsset.symbol} Address
                  </p>
                  <div className="bg-[#0A0B0D] p-3 rounded-lg">
                    <p className="text-white text-xs font-mono break-all">
                      {selectedAsset.receiveAddress}
                    </p>
                  </div>
                  <button
                    onClick={() =>
                      copyToClipboard(selectedAsset.receiveAddress)
                    }
                    className="mt-3 w-full py-2 bg-[#F0B90B]/10 rounded-lg text-[#F0B90B] text-xs font-semibold hover:bg-[#F0B90B]/20 transition-all flex items-center justify-center gap-2"
                  >
                    {copiedAddress ? <Check size={14} /> : <Copy size={14} />}
                    {copiedAddress ? "Copied!" : "Copy Address"}
                  </button>
                </div>

                <div className="mb-4 p-2.5 bg-[#2B3139]/50 rounded-xl">
                  <p className="text-[#F0B90B] text-[10px] font-semibold">
                    Network: {selectedAsset.symbol}
                  </p>
                  <p className="text-[#A0A5AA] text-[10px] mt-1">
                    ⚠️ Only send {selectedAsset.symbol} to this address
                  </p>
                  <p className="text-[#A0A5AA] text-[10px]">
                    Minimum deposit: 0.001 {selectedAsset.symbol}
                  </p>
                  <p className="text-[#A0A5AA] text-[10px] mt-1">
                    ⏱️ Estimated arrival: 5-10 minutes
                  </p>
                </div>
              </div>
            )}

            <button
              onClick={
                transactionType === "send"
                  ? executeTransaction
                  : () => copyToClipboard(selectedAsset.receiveAddress)
              }
              className="w-full py-2.5 bg-[#F0B90B] rounded-xl text-[#0A0B0D] text-sm font-semibold mt-2 active:scale-95 transition-transform"
            >
              {transactionType === "send" ? "Send Now" : "Copy Address"}
            </button>
          </div>
        </div>
      )}

      {/* Institutional Grade Swap Modal */}
      {showSwapModal && (
        <div
          className="fixed inset-0 bg-black/80 z-200 flex items-end justify-center animate-fade-in"
          onClick={() => setShowSwapModal(false)}
        >
          <div
            className="bg-[#1E2329] w-full max-w-md rounded-t-2xl p-5 animate-slide-up pb-8"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-white font-semibold text-base">Swap Tokens</h3>
              <button
                onClick={() => setShowSwapModal(false)}
                className="text-[#A0A5AA]"
              >
                ✕
              </button>
            </div>

            {/* From Asset */}
            <div className="bg-[#2B3139] rounded-xl p-3 mb-3">
              <div className="flex justify-between items-center mb-2">
                <p className="text-[#A0A5AA] text-xs">From</p>
                <p className="text-[#A0A5AA] text-[10px]">
                  Balance: {swapFromAsset?.amount.toLocaleString() || "0"}{" "}
                  {swapFromAsset?.symbol}
                </p>
              </div>
              <div className="flex justify-between items-center">
                <input
                  type="number"
                  value={swapAmount}
                  onChange={(e) => setSwapAmount(e.target.value)}
                  placeholder="0.00"
                  className="bg-transparent text-white text-xl font-semibold outline-none flex-1"
                />
                <button
                  onClick={() => setShowAssetSelector("from")}
                  className="flex items-center gap-2 px-2.5 py-1.5 bg-[#1E2329] rounded-xl"
                >
                  <div
                    className="w-5 h-5 rounded-full flex items-center justify-center text-sm"
                    style={{
                      backgroundColor: `${swapFromAsset?.color}20`,
                      color: swapFromAsset?.color,
                    }}
                  >
                    {swapFromAsset?.icon || "💰"}
                  </div>
                  <span className="text-white text-xs font-medium">
                    {swapFromAsset?.symbol || "Select"}
                  </span>
                  <ChevronRight size={12} className="text-[#A0A5AA]" />
                </button>
              </div>
            </div>

            {/* Swap Icon */}
            <div className="flex justify-center -my-2 relative z-10">
              <button
                onClick={() => {
                  setSwapFromAsset(swapToAsset);
                  setSwapToAsset(swapFromAsset);
                  setSwapAmount("");
                }}
                className="p-1.5 bg-[#F0B90B] rounded-full"
              >
                <ArrowUpDown size={14} className="text-[#0A0B0D]" />
              </button>
            </div>

            {/* To Asset */}
            <div className="bg-[#2B3139] rounded-xl p-3 mt-3">
              <div className="flex justify-between items-center mb-2">
                <p className="text-[#A0A5AA] text-xs">To</p>
                <p className="text-[#A0A5AA] text-[10px]">
                  Balance: {swapToAsset?.amount.toLocaleString() || "0"}{" "}
                  {swapToAsset?.symbol}
                </p>
              </div>
              <div className="flex justify-between items-center">
                <p className="text-white text-xl font-semibold">
                  {estimatedOutput > 0 
                    ? `${estimatedOutput.toFixed(6)} ${swapToAsset?.symbol || ""}`
                    : "0.00"}
                </p>
                <button
                  onClick={() => setShowAssetSelector("to")}
                  className="flex items-center gap-2 px-2.5 py-1.5 bg-[#1E2329] rounded-xl"
                >
                  <div
                    className="w-5 h-5 rounded-full flex items-center justify-center text-sm"
                    style={{
                      backgroundColor: `${swapToAsset?.color}20`,
                      color: swapToAsset?.color,
                    }}
                  >
                    {swapToAsset?.icon || "💰"}
                  </div>
                  <span className="text-white text-xs font-medium">
                    {swapToAsset?.symbol || "Select"}
                  </span>
                  <ChevronRight size={12} className="text-[#A0A5AA]" />
                </button>
              </div>
            </div>

            {/* Advanced Swap Info */}
            {swapFromAsset && swapToAsset && swapAmount && parseFloat(swapAmount) > 0 && (
              <div className="mt-3 p-2.5 bg-[#2B3139]/50 rounded-xl space-y-1.5">
                <div className="flex justify-between text-xs">
                  <p className="text-[#A0A5AA]">Rate</p>
                  <p className="text-white text-xs">
                    1 {swapFromAsset.symbol} ≈{" "}
                    {(estimatedOutput / parseFloat(swapAmount)).toFixed(6)} {swapToAsset.symbol}
                  </p>
                </div>
                <div className="flex justify-between text-xs">
                  <p className="text-[#A0A5AA]">Price Impact</p>
                  <p className={`text-xs ${priceImpact > 3 ? "text-[#F6465D]" : priceImpact > 1 ? "text-[#F0B90B]" : "text-[#0ECB81]"}`}>
                    {priceImpact.toFixed(2)}%
                  </p>
                </div>
                <div className="flex justify-between text-xs">
                  <p className="text-[#A0A5AA]">Minimum Received</p>
                  <p className="text-white text-xs">
                    {minimumReceived > 0 ? minimumReceived.toFixed(6) : "0"} {swapToAsset?.symbol}
                  </p>
                </div>
                <div className="flex justify-between text-xs">
                  <p className="text-[#A0A5AA]">Slippage Tolerance</p>
                  <div className="flex gap-1">
                    {[0.5, 1, 2].map((value) => (
                      <button
                        key={value}
                        onClick={() => setSwapSlippage(value)}
                        className={`px-1.5 py-0.5 rounded text-[10px] ${
                          swapSlippage === value
                            ? "bg-[#F0B90B] text-[#0A0B0D]"
                            : "bg-[#2B3139] text-[#A0A5AA]"
                        }`}
                      >
                        {value}%
                      </button>
                    ))}
                  </div>
                </div>
                <div className="flex justify-between text-xs">
                  <p className="text-[#A0A5AA]">Fee</p>
                  <p className="text-white text-xs">0.25%</p>
                </div>
                {routeInfo && (
                  <div className={`mt-1.5 p-1.5 rounded-lg text-[10px] ${
                    routeInfo.type === "warning" 
                      ? "bg-[#F6465D]/20 text-[#F6465D]" 
                      : routeInfo.type === "multi"
                      ? "bg-[#F0B90B]/20 text-[#F0B90B]"
                      : "bg-[#0ECB81]/20 text-[#0ECB81]"
                  }`}>
                    {routeInfo.message}
                  </div>
                )}
              </div>
            )}

            <button
              onClick={handleSwap}
              disabled={
                !swapFromAsset || !swapToAsset || !swapAmount || parseFloat(swapAmount) <= 0 || isCalculating
              }
              className="w-full py-2.5 bg-[#F0B90B] rounded-xl text-[#0A0B0D] text-sm font-semibold mt-3 active:scale-95 transition-transform disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isCalculating ? (
                <div className="flex items-center justify-center gap-2">
                  <div className="w-3 h-3 border-2 border-[#0A0B0D] border-t-transparent rounded-full animate-spin"></div>
                  Processing...
                </div>
              ) : (
                "Swap Now"
              )}
            </button>
          </div>
        </div>
      )}

      {/* Asset Selection Modals */}
      <AssetSelectionModal
        isOpen={showAssetSelector === "from"}
        onClose={() => setShowAssetSelector(null)}
        onSelect={(asset) => {
          setSwapFromAsset(asset);
          setSwapAmount("");
        }}
        title="Select Token to Swap From"
        selectedAsset={swapFromAsset}
        type="from"
      />
      <AssetSelectionModal
        isOpen={showAssetSelector === "to"}
        onClose={() => setShowAssetSelector(null)}
        onSelect={(asset) => setSwapToAsset(asset)}
        title="Select Token to Swap To"
        selectedAsset={swapToAsset}
        type="to"
      />

      <style>{`
        @keyframes slide-down {
          from { opacity: 0; transform: translateY(-20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes slide-up {
          from { transform: translateY(100%); }
          to { transform: translateY(0); }
        }
        @keyframes fade-in {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        .animate-slide-down { animation: slide-down 0.3s ease-out; }
        .animate-slide-up { animation: slide-up 0.3s ease-out; }
        .animate-fade-in { animation: fade-in 0.3s ease-out; }
        .animate-spin { animation: spin 1s linear infinite; }
      `}</style>
    </div>
  );
};

// Exchange Screen Component - Professional Trading Terminal
const ExchangeScreen = () => {
  const [tradeType, setTradeType] = useState('spot');
  const [orderType, setOrderType] = useState('limit');
  const [side, setSide] = useState('buy');
  const [selectedPair, setSelectedPair] = useState('BTC/USDT');
  const [price, setPrice] = useState('');
  const [amount, setAmount] = useState('');
  const [total, setTotal] = useState('');
  const [leverage, setLeverage] = useState(1);
  const [activeBottomTab, setActiveBottomTab] = useState('orders');
  const [showTokenSelector, setShowTokenSelector] = useState(false);
  const [orderSubmitted, setOrderSubmitted] = useState(false);
  const [notification, setNotification] = useState(null);
  const [showChart, setShowChart] = useState(true);
  
  // Trading pairs data
  const tradingPairs = [
    { symbol: 'BTC/USDT', name: 'Bitcoin', price: 43521.20, change: 2.4, positive: true, volume: '24.5B', high: 44200, low: 42500, icon: '₿', color: '#F7931A' },
    { symbol: 'ETH/USDT', name: 'Ethereum', price: 2345.67, change: 1.8, positive: true, volume: '12.3B', high: 2380, low: 2300, icon: 'Ξ', color: '#627EEA' },
    { symbol: 'BNB/USDT', name: 'BNB', price: 315.42, change: 0.5, positive: true, volume: '1.2B', high: 318.5, low: 312, icon: 'B', color: '#F3BA2F' },
    { symbol: 'SOL/USDT', name: 'Solana', price: 98.45, change: 5.2, positive: true, volume: '3.1B', high: 100.5, low: 95.2, icon: '◎', color: '#00FFA3' },
    { symbol: 'XRP/USDT', name: 'Ripple', price: 0.52, change: -1.2, positive: false, volume: '890M', high: 0.53, low: 0.51, icon: 'X', color: '#23292F' },
    { symbol: 'DOGE/USDT', name: 'Dogecoin', price: 0.082, change: 15.7, positive: true, volume: '850M', high: 0.085, low: 0.078, icon: '🐕', color: '#C3A634' }
  ];

  // Enhanced Order Book Data with better bid/ask distinction
  const orderBook = {
    asks: [
      [43522.00, 1.5, 98.2],
      [43523.50, 2.1, 96.7],
      [43525.00, 3.4, 94.6],
      [43527.00, 1.9, 91.2],
      [43530.00, 2.8, 89.3],
      [43532.50, 1.2, 86.5],
      [43535.00, 2.5, 85.3]
    ],
    bids: [
      [43520.50, 2.3, 100.0],
      [43519.80, 1.8, 98.5],
      [43518.20, 3.1, 96.7],
      [43517.50, 2.5, 93.6],
      [43516.00, 4.2, 91.1],
      [43515.30, 1.9, 86.9],
      [43514.20, 2.7, 85.0]
    ]
  };

  // Sample Orders
  const openOrders = [
    { id: 1, pair: 'BTC/USDT', side: 'buy', price: 43200, amount: 0.05, filled: 0.02, total: 2160, time: '12:30', status: 'open', type: 'limit' },
    { id: 2, pair: 'ETH/USDT', side: 'sell', price: 2400, amount: 0.5, filled: 0, total: 1200, time: '12:15', status: 'open', type: 'limit' }
  ];

  // Sample Positions
  const openPositions = [
    { id: 1, pair: 'BTC/USDT', side: 'long', entryPrice: 43200, markPrice: 43521, amount: 0.1, value: 4320, pnl: 32.10, pnlPercent: 0.74, liquidation: 41500, leverage: 10 },
    { id: 2, pair: 'ETH/USDT', side: 'short', entryPrice: 2380, markPrice: 2345, amount: 1.5, value: 3570, pnl: 52.50, pnlPercent: 1.47, liquidation: 2450, leverage: 5 }
  ];

  // Trade History
  const tradeHistory = [
    { id: 1, pair: 'BTC/USDT', side: 'buy', price: 43100, amount: 0.1, total: 4310, time: '11:25:30', fee: 4.31, type: 'limit' },
    { id: 2, pair: 'ETH/USDT', side: 'sell', price: 2350, amount: 0.8, total: 1880, time: '10:15:22', fee: 1.88, type: 'market' },
    { id: 3, pair: 'SOL/USDT', side: 'buy', price: 97.50, amount: 5, total: 487.5, time: '09:45:10', fee: 0.49, type: 'limit' }
  ];

  const currentPair = tradingPairs.find(p => p.symbol === selectedPair);
  const userBalance = 0.42;

  const calculateTotal = () => {
    if (price && amount) {
      const totalValue = parseFloat(price) * parseFloat(amount);
      setTotal(totalValue.toFixed(2));
    } else {
      setTotal('');
    }
  };

  const handlePriceChange = (e) => {
    setPrice(e.target.value);
    setTimeout(calculateTotal, 10);
  };

  const handleAmountChange = (e) => {
    setAmount(e.target.value);
    setTimeout(calculateTotal, 10);
  };

  const handleSetAmount = (percent) => {
    const maxAmount = userBalance;
    setAmount((maxAmount * percent / 100).toFixed(4));
    setTimeout(calculateTotal, 10);
  };

  const handleSetPriceFromOrderBook = (priceValue) => {
    setPrice(priceValue.toString());
    setTimeout(calculateTotal, 10);
  };

  const handleSubmitOrder = () => {
    if (!amount || parseFloat(amount) === 0) {
      showNotification('Please enter an amount', 'error');
      return;
    }
    
    if (orderType === 'limit' && (!price || parseFloat(price) === 0)) {
      showNotification('Please enter a price', 'error');
      return;
    }

    setOrderSubmitted(true);
    showNotification(`${side.toUpperCase()} order submitted successfully!`, 'success');
    
    setTimeout(() => {
      setAmount('');
      setPrice('');
      setTotal('');
      setOrderSubmitted(false);
    }, 2000);
  };

  const showNotification = (message, type) => {
    setNotification({ message, type });
    setTimeout(() => setNotification(null), 3000);
  };

  const quickAmounts = [25, 50, 75, 100];

  return (
    <div className="min-h-screen bg-[#0A0B0D]">
      {/* Notification */}
      {notification && (
        <div className={`fixed top-20 left-4 right-4 z-50 p-3 rounded-xl animate-slide-down ${
          notification.type === 'success' ? 'bg-[#0ECB81]' : 'bg-[#F6465D]'
        }`}>
          <p className="text-white text-xs font-medium text-center">{notification.message}</p>
        </div>
      )}

      {/* Token Selector Modal */}
      {showTokenSelector && (
        <div className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4" onClick={() => setShowTokenSelector(false)}>
          <div className="bg-[#1E2329] rounded-xl w-full max-w-md max-h-[80vh] overflow-hidden" onClick={(e) => e.stopPropagation()}>
            <div className="flex justify-between items-center p-4 border-b border-[#2B3139]">
              <h3 className="text-white font-semibold text-sm">Select Token</h3>
              <button onClick={() => setShowTokenSelector(false)} className="text-[#A0A5AA]">
                <X size={16} />
              </button>
            </div>
            <div className="p-2 space-y-1 max-h-[60vh] overflow-y-auto">
              {tradingPairs.map((pair) => (
                <button
                  key={pair.symbol}
                  onClick={() => {
                    setSelectedPair(pair.symbol);
                    setShowTokenSelector(false);
                  }}
                  className="w-full flex items-center justify-between p-3 rounded-lg hover:bg-[#2B3139] transition-all"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full flex items-center justify-center text-sm" 
                         style={{ backgroundColor: `${pair.color}20`, color: pair.color }}>
                      {pair.icon}
                    </div>
                    <div className="text-left">
                      <p className="text-white font-medium text-sm">{pair.symbol}</p>
                      <p className="text-[#A0A5AA] text-[10px]">{pair.name}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-white text-xs">${pair.price.toLocaleString()}</p>
                    <p className={`text-[10px] ${pair.positive ? 'text-[#0ECB81]' : 'text-[#F6465D]'}`}>
                      {pair.positive ? '+' : ''}{pair.change}%
                    </p>
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Main Trading Layout */}
      <div className="max-w-7xl mx-auto px-4 py-3">
        {/* Top Bar - Token Selector & Info */}
        <div className="bg-[#1E2329] rounded-xl p-3 mb-3">
          <div className="flex flex-wrap justify-between items-center gap-3">
            {/* Token Selector */}
            <button 
              onClick={() => setShowTokenSelector(true)}
              className="flex items-center gap-2 px-3 py-1.5 bg-[#2B3139] rounded-lg hover:bg-[#363D45] transition-all"
            >
              <div className="w-6 h-6 rounded-full flex items-center justify-center text-sm" 
                   style={{ backgroundColor: `${currentPair?.color}20`, color: currentPair?.color }}>
                {currentPair?.icon}
              </div>
              <div className="text-left">
                <p className="text-white font-medium text-xs">{selectedPair}</p>
                <p className="text-[#A0A5AA] text-[9px]">{currentPair?.name}</p>
              </div>
              <ChevronDown size={12} className="text-[#A0A5AA]" />
            </button>

            {/* Token Info */}
            <div className="flex flex-wrap gap-3">
              <div>
                <p className="text-[#A0A5AA] text-[9px]">Price</p>
                <p className="text-white font-semibold text-sm">${currentPair?.price.toLocaleString()}</p>
              </div>
              <div>
                <p className="text-[#A0A5AA] text-[9px]">24h Change</p>
                <p className={`font-semibold text-xs ${currentPair?.positive ? 'text-[#0ECB81]' : 'text-[#F6465D]'}`}>
                  {currentPair?.positive ? '+' : ''}{currentPair?.change}%
                </p>
              </div>
              <div>
                <p className="text-[#A0A5AA] text-[9px]">24h High/Low</p>
                <p className="text-white text-[10px]">{currentPair?.high.toLocaleString()} / {currentPair?.low.toLocaleString()}</p>
              </div>
              <div>
                <p className="text-[#A0A5AA] text-[9px]">24h Volume</p>
                <p className="text-white text-[10px]">{currentPair?.volume}</p>
              </div>
            </div>

            {/* Trade Type Tabs */}
            <div className="flex gap-1 bg-[#2B3139] rounded-lg p-0.5">
              <button
                onClick={() => setTradeType('spot')}
                className={`px-3 py-1 rounded-lg text-xs font-semibold transition-all ${
                  tradeType === 'spot' ? 'bg-[#F0B90B] text-[#0A0B0D]' : 'text-[#A0A5AA]'
                }`}
              >
                Spot
              </button>
              <button
                onClick={() => setTradeType('futures')}
                className={`px-3 py-1 rounded-lg text-xs font-semibold transition-all ${
                  tradeType === 'futures' ? 'bg-[#F0B90B] text-[#0A0B0D]' : 'text-[#A0A5AA]'
                }`}
              >
                Futures
              </button>
            </div>
          </div>
        </div>

        {/* Chart Area */}
        {showChart && (
          <div className="bg-[#1E2329] rounded-xl p-3 mb-3">
            <div className="flex justify-between items-center mb-3">
              <h3 className="text-white font-semibold text-xs">Chart</h3>
              <div className="flex gap-1">
                {['1m', '5m', '15m', '1h', '4h', '1d'].map((tf) => (
                  <button key={tf} className="px-1.5 py-0.5 text-[#A0A5AA] text-[9px] hover:text-white transition-colors">
                    {tf}
                  </button>
                ))}
                <button onClick={() => setShowChart(false)} className="ml-2 text-[#A0A5AA] text-[9px]">✕</button>
              </div>
            </div>
            <div className="h-48 bg-[#0A0B0D] rounded-lg flex items-center justify-center">
              <div className="text-center">
                <LineChart size={32} className="text-[#F0B90B] mx-auto mb-1 opacity-50" />
                <p className="text-[#A0A5AA] text-[10px]">Advanced Trading Chart</p>
                <p className="text-[#A0A5AA] text-[9px]">{selectedPair} - Real-time candlestick chart</p>
              </div>
            </div>
          </div>
        )}

        {/* Two Column Layout - Trading Form & Order Book */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-3 mb-3">
          {/* Left Side - Trading Form */}
          <div className="bg-[#1E2329] rounded-xl p-3">
            {/* Order Type Tabs */}
            <div className="flex gap-1 mb-3 bg-[#2B3139] rounded-lg p-0.5">
              {['limit', 'market'].map((type) => (
                <button
                  key={type}
                  onClick={() => setOrderType(type)}
                  className={`flex-1 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                    orderType === type ? 'bg-[#F0B90B] text-[#0A0B0D]' : 'text-[#A0A5AA]'
                  }`}
                >
                  {type.toUpperCase()}
                </button>
              ))}
            </div>

            {/* Leverage for Futures */}
            {tradeType === 'futures' && (
              <div className="mb-3 p-2 bg-[#0A0B0D] rounded-lg">
                <div className="flex justify-between items-center mb-1">
                  <p className="text-[#A0A5AA] text-[10px]">Leverage</p>
                  <div className="flex items-center gap-2">
                    <button 
                      onClick={() => setLeverage(Math.max(1, leverage - 1))}
                      className="p-0.5 bg-[#2B3139] rounded"
                    >
                      <Minus size={10} />
                    </button>
                    <p className="text-[#F0B90B] font-semibold text-xs">{leverage}x</p>
                    <button 
                      onClick={() => setLeverage(Math.min(50, leverage + 1))}
                      className="p-0.5 bg-[#2B3139] rounded"
                    >
                      <Plus size={10} />
                    </button>
                  </div>
                </div>
                <input
                  type="range"
                  min="1"
                  max="50"
                  value={leverage}
                  onChange={(e) => setLeverage(parseInt(e.target.value))}
                  className="w-full h-1 bg-[#2B3139] rounded-lg appearance-none cursor-pointer"
                  style={{ accentColor: '#F0B90B' }}
                />
                <div className="flex justify-between mt-1">
                  {[1, 5, 10, 20, 50].map((lev) => (
                    <button
                      key={lev}
                      onClick={() => setLeverage(lev)}
                      className={`text-[9px] px-1.5 py-0.5 rounded ${leverage === lev ? 'bg-[#F0B90B] text-[#0A0B0D]' : 'text-[#A0A5AA]'}`}
                    >
                      {lev}x
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Buy/Sell Buttons */}
            <div className="flex gap-2 mb-3">
              <button
                onClick={() => setSide('buy')}
                className={`flex-1 py-2 rounded-lg font-semibold text-xs transition-all ${
                  side === 'buy' ? 'bg-[#0ECB81] text-white' : 'bg-[#2B3139] text-[#A0A5AA]'
                }`}
              >
                BUY
              </button>
              <button
                onClick={() => setSide('sell')}
                className={`flex-1 py-2 rounded-lg font-semibold text-xs transition-all ${
                  side === 'sell' ? 'bg-[#F6465D] text-white' : 'bg-[#2B3139] text-[#A0A5AA]'
                }`}
              >
                SELL
              </button>
            </div>

            {/* Price Input */}
            {orderType === 'limit' && (
              <div className="mb-3">
                <div className="flex justify-between mb-1">
                  <label className="text-[#A0A5AA] text-[10px]">Price (USDT)</label>
                  <div className="flex gap-1">
                    {[43100, 43300, 43500, 43700].map((p) => (
                      <button
                        key={p}
                        onClick={() => setPrice(p.toString())}
                        className="px-1.5 py-0.5 bg-[#2B3139] rounded text-[#A0A5AA] text-[9px]"
                      >
                        {p}
                      </button>
                    ))}
                  </div>
                </div>
                <input
                  type="number"
                  value={price}
                  onChange={handlePriceChange}
                  placeholder="0.00"
                  className="w-full p-2 bg-[#0A0B0D] rounded-lg text-white text-xs placeholder-[#A0A5AA] focus:outline-none border border-transparent focus:border-[#F0B90B]"
                />
              </div>
            )}

            {/* Amount Input */}
            <div className="mb-3">
              <div className="flex justify-between mb-1">
                <label className="text-[#A0A5AA] text-[10px]">Amount ({selectedPair.split('/')[0]})</label>
                <span className="text-[#A0A5AA] text-[9px]">Balance: {userBalance}</span>
              </div>
              <input
                type="number"
                value={amount}
                onChange={handleAmountChange}
                placeholder="0.00"
                className="w-full p-2 bg-[#0A0B0D] rounded-lg text-white text-xs placeholder-[#A0A5AA] focus:outline-none border border-transparent focus:border-[#F0B90B]"
              />
              <div className="flex gap-1 mt-1.5">
                {quickAmounts.map((percent) => (
                  <button
                    key={percent}
                    onClick={() => handleSetAmount(percent)}
                    className="flex-1 py-1 bg-[#2B3139] rounded-lg text-[#A0A5AA] text-[9px] hover:bg-[#363D45] transition-all"
                  >
                    {percent}%
                  </button>
                ))}
              </div>
            </div>

            {/* Total */}
            <div className="mb-3 p-2 bg-[#0A0B0D] rounded-lg">
              <div className="flex justify-between">
                <span className="text-[#A0A5AA] text-[10px]">Total</span>
                <span className="text-white font-semibold text-xs">
                  {total ? `${parseFloat(total).toFixed(2)}` : '0.00'} USDT
                </span>
              </div>
            </div>

            {/* Submit Button */}
            <button
              onClick={handleSubmitOrder}
              disabled={orderSubmitted}
              className={`w-full py-2 rounded-lg font-semibold text-xs transition-all transform active:scale-95 ${
                side === 'buy' 
                  ? 'bg-linear-to-r from-[#0ECB81] to-[#0ECB81]/80 text-white' 
                  : 'bg-linear-to-r from-[#F6465D] to-[#F6465D]/80 text-white'
              } ${orderSubmitted ? 'opacity-50 cursor-not-allowed' : ''}`}
            >
              {orderSubmitted ? 'Order Submitted ✓' : (side === 'buy' ? `BUY ${selectedPair.split('/')[0]}` : `SELL ${selectedPair.split('/')[0]}`)}
            </button>
          </div>

          {/* Right Side - Order Book */}
          <div className="bg-[#1E2329] rounded-xl p-3">
            <h3 className="text-white font-semibold text-xs mb-2">Order Book</h3>
            
            {/* Asks (Sell Orders) - Top */}
            <div className="mb-2">
              <div className="grid grid-cols-3 text-[#A0A5AA] text-[9px] mb-1 pb-1 border-b border-[#2B3139]">
                <span>Price (USDT)</span>
                <span className="text-center">Amount (BTC)</span>
                <span className="text-right">Total</span>
              </div>
              <div className="space-y-0.5">
                {orderBook.asks.map((ask, idx) => (
                  <div 
                    key={idx} 
                    onClick={() => handleSetPriceFromOrderBook(ask[0])}
                    className="grid grid-cols-3 text-xs cursor-pointer hover:bg-[#2B3139] p-1 rounded transition-all"
                  >
                    <span className="text-[#F6465D] font-mono text-[11px]">{ask[0].toFixed(2)}</span>
                    <span className="text-white text-center text-[11px]">{ask[1].toFixed(2)}</span>
                    <span className="text-[#A0A5AA] text-right text-[11px]">{ask[2].toFixed(1)}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Current Price Indicator */}
            <div className="py-1.5 my-1.5 text-center border-y border-[#2B3139]">
              <p className="text-white font-bold text-sm">${currentPair?.price.toLocaleString()}</p>
              <p className={`text-[10px] ${currentPair?.positive ? 'text-[#0ECB81]' : 'text-[#F6465D]'}`}>
                {currentPair?.positive ? '▲' : '▼'} {Math.abs(currentPair?.change)}%
              </p>
            </div>

            {/* Bids (Buy Orders) - Bottom */}
            <div className="mt-2">
              <div className="grid grid-cols-3 text-[#A0A5AA] text-[9px] mb-1 pb-1 border-b border-[#2B3139]">
                <span>Price (USDT)</span>
                <span className="text-center">Amount (BTC)</span>
                <span className="text-right">Total</span>
              </div>
              <div className="space-y-0.5">
                {orderBook.bids.map((bid, idx) => (
                  <div 
                    key={idx} 
                    onClick={() => handleSetPriceFromOrderBook(bid[0])}
                    className="grid grid-cols-3 text-xs cursor-pointer hover:bg-[#2B3139] p-1 rounded transition-all"
                  >
                    <span className="text-[#0ECB81] font-mono text-[11px]">{bid[0].toFixed(2)}</span>
                    <span className="text-white text-center text-[11px]">{bid[1].toFixed(2)}</span>
                    <span className="text-[#A0A5AA] text-right text-[11px]">{bid[2].toFixed(1)}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Section - Orders, Positions, Trade History */}
        <div className="bg-[#1E2329] rounded-xl overflow-hidden mb-20">
          <div className="flex border-b border-[#2B3139]">
            {[
              { id: 'orders', label: 'Open Orders', icon: ClipboardList, count: openOrders.length },
              { id: 'positions', label: 'Positions', icon: BookOpen, count: openPositions.length },
              { id: 'history', label: 'Trade History', icon: History, count: tradeHistory.length }
            ].map((tab) => {
              const Icon = tab.icon;
              const isActive = activeBottomTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveBottomTab(tab.id)}
                  className={`flex-1 flex items-center justify-center gap-1.5 py-2 text-xs font-semibold transition-all ${
                    isActive ? 'text-[#F0B90B] border-b-2 border-[#F0B90B]' : 'text-[#A0A5AA] hover:text-white'
                  }`}
                >
                  <Icon size={12} />
                  {tab.label}
                  {tab.count > 0 && (
                    <span className={`px-1 py-0.5 rounded-full text-[9px] ${isActive ? 'bg-[#F0B90B]/20' : 'bg-[#2B3139]'}`}>
                      {tab.count}
                    </span>
                  )}
                </button>
              );
            })}
          </div>

          <div className="p-2 max-h-64 overflow-y-auto">
            {/* Open Orders */}
            {activeBottomTab === 'orders' && (
              openOrders.length > 0 ? (
                <div className="space-y-1.5">
                  <div className="grid grid-cols-6 gap-1 text-[#A0A5AA] text-[9px] pb-1 border-b border-[#2B3139]">
                    <span>Pair</span>
                    <span>Side</span>
                    <span>Price</span>
                    <span>Amount</span>
                    <span>Filled</span>
                    <span>Action</span>
                  </div>
                  {openOrders.map((order) => (
                    <div key={order.id} className="grid grid-cols-6 gap-1 text-[10px] py-1 hover:bg-[#2B3139] rounded transition-all">
                      <span className="text-white">{order.pair}</span>
                      <span className={order.side === 'buy' ? 'text-[#0ECB81]' : 'text-[#F6465D]'}>
                        {order.side.toUpperCase()}
                      </span>
                      <span className="text-white">${order.price}</span>
                      <span className="text-white">{order.amount}</span>
                      <span className="text-[#A0A5AA]">{order.filled}/{order.amount}</span>
                      <button className="text-[#F6465D] text-[9px] hover:opacity-80">Cancel</button>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-6">
                  <p className="text-[#A0A5AA] text-xs">No open orders</p>
                </div>
              )
            )}

            {/* Positions */}
            {activeBottomTab === 'positions' && (
              openPositions.length > 0 ? (
                <div className="space-y-1.5">
                  <div className="grid grid-cols-6 gap-1 text-[#A0A5AA] text-[9px] pb-1 border-b border-[#2B3139]">
                    <span>Pair</span>
                    <span>Side</span>
                    <span>Entry/Mark</span>
                    <span>Amount/Value</span>
                    <span>PnL</span>
                    <span>Action</span>
                  </div>
                  {openPositions.map((position) => (
                    <div key={position.id} className="grid grid-cols-6 gap-1 text-[10px] py-1 hover:bg-[#2B3139] rounded transition-all">
                      <span className="text-white">{position.pair}</span>
                      <span className={position.side === 'long' ? 'text-[#0ECB81]' : 'text-[#F6465D]'}>
                        {position.side.toUpperCase()}
                      </span>
                      <div>
                        <span className="text-white">{position.entryPrice}</span>
                        <span className="text-[#A0A5AA] text-[9px]"> / {position.markPrice}</span>
                      </div>
                      <div>
                        <span className="text-white">{position.amount}</span>
                        <span className="text-[#A0A5AA] text-[9px]"> / ${position.value}</span>
                      </div>
                      <div>
                        <span className={`${position.pnl > 0 ? 'text-[#0ECB81]' : 'text-[#F6465D]'}`}>
                          ${position.pnl}
                        </span>
                        <span className={`text-[9px] ${position.pnl > 0 ? 'text-[#0ECB81]' : 'text-[#F6465D]'} ml-0.5`}>
                          ({position.pnlPercent}%)
                        </span>
                      </div>
                      <button className="text-[#F0B90B] text-[9px] hover:opacity-80">Close</button>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-6">
                  <p className="text-[#A0A5AA] text-xs">No open positions</p>
                </div>
              )
            )}

            {/* Trade History */}
            {activeBottomTab === 'history' && (
              tradeHistory.length > 0 ? (
                <div className="space-y-1.5">
                  <div className="grid grid-cols-6 gap-1 text-[#A0A5AA] text-[9px] pb-1 border-b border-[#2B3139]">
                    <span>Pair</span>
                    <span>Side</span>
                    <span>Price</span>
                    <span>Amount</span>
                    <span>Total</span>
                    <span>Time</span>
                  </div>
                  {tradeHistory.map((trade) => (
                    <div key={trade.id} className="grid grid-cols-6 gap-1 text-[10px] py-1 hover:bg-[#2B3139] rounded transition-all">
                      <span className="text-white">{trade.pair}</span>
                      <span className={trade.side === 'buy' ? 'text-[#0ECB81]' : 'text-[#F6465D]'}>
                        {trade.side.toUpperCase()}
                      </span>
                      <span className="text-white">${trade.price}</span>
                      <span className="text-white">{trade.amount}</span>
                      <span className="text-white">${trade.total}</span>
                      <span className="text-[#A0A5AA] text-[9px]">{trade.time}</span>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-6">
                  <p className="text-[#A0A5AA] text-xs">No trade history</p>
                </div>
              )
            )}
          </div>
        </div>
      </div>

      <style>{`
        @keyframes slide-down {
          from {
            opacity: 0;
            transform: translateY(-20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        .animate-slide-down {
          animation: slide-down 0.3s ease-out;
        }
        
        input[type="range"] {
          -webkit-appearance: none;
        }
        
        input[type="range"]::-webkit-slider-thumb {
          -webkit-appearance: none;
          width: 12px;
          height: 12px;
          background: #F0B90B;
          border-radius: 50%;
          cursor: pointer;
        }
        
        input[type="number"]::-webkit-inner-spin-button,
        input[type="number"]::-webkit-outer-spin-button {
          -webkit-appearance: none;
          margin: 0;
        }
        
        ::-webkit-scrollbar {
          width: 4px;
          height: 4px;
        }
        
        ::-webkit-scrollbar-track {
          background: #1E2329;
        }
        
        ::-webkit-scrollbar-thumb {
          background: #F0B90B;
          border-radius: 4px;
        }
      `}</style>
    </div>
  );
};

const P2PScreen = () => {
  const [activeTab, setActiveTab] = useState("buy");
  const [selectedCurrency, setSelectedCurrency] = useState("USDT");
  const [selectedFiat, setSelectedFiat] = useState("USD");
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedOffer, setSelectedOffer] = useState(null);
  const [showOrderModal, setShowOrderModal] = useState(false);
  const [orderAmount, setOrderAmount] = useState("");
  const [orderMessage, setOrderMessage] = useState("");
  const [showNotification, setShowNotification] = useState(false);
  const [notificationMessage, setNotificationMessage] = useState("");
  const [notificationType, setNotificationType] = useState("success");
  const [sortBy, setSortBy] = useState("price");
  const [sortOrder, setSortOrder] = useState("asc");
  const [showPaymentFilter, setShowPaymentFilter] = useState(false);

  // Extended P2P Data
  const P2P_OFFERS = [
    {
      id: 1,
      user: "TraderPro",
      userAvatar: "🤵",
      type: "buy",
      currency: "USDT",
      price: 1.01,
      limitMin: 100,
      limitMax: 5000,
      payment: "Bank Transfer",
      completed: 1234,
      completionRate: 98.5,
      responseTime: "< 2 min",
      verified: true,
      merchant: true,
      terms: "Bank transfer only. Must send payment within 15 minutes.",
    },
    {
      id: 2,
      user: "CryptoKing",
      userAvatar: "👑",
      type: "sell",
      currency: "BTC",
      price: 43250,
      limitMin: 0.01,
      limitMax: 1,
      payment: "USDT",
      completed: 892,
      completionRate: 99.2,
      responseTime: "< 5 min",
      verified: true,
      merchant: false,
      terms: "Fast trade. USDT only.",
    },
    {
      id: 3,
      user: "FastTrade",
      userAvatar: "⚡",
      type: "buy",
      currency: "ETH",
      price: 2340,
      limitMin: 0.1,
      limitMax: 10,
      payment: "Cash App",
      completed: 2156,
      completionRate: 97.8,
      responseTime: "< 1 min",
      verified: true,
      merchant: true,
      terms: "Instant release after payment.",
    },
    {
      id: 4,
      user: "SecureDeals",
      userAvatar: "🔒",
      type: "sell",
      currency: "USDT",
      price: 1.015,
      limitMin: 500,
      limitMax: 50000,
      payment: "Bank Transfer",
      completed: 3456,
      completionRate: 99.5,
      responseTime: "< 3 min",
      verified: true,
      merchant: true,
      terms: "High volume trader. Multiple payment methods.",
    },
    {
      id: 5,
      user: "CryptoExpress",
      userAvatar: "🚀",
      type: "buy",
      currency: "SOL",
      price: 98.45,
      limitMin: 1,
      limitMax: 500,
      payment: "PayPal",
      completed: 567,
      completionRate: 96.5,
      responseTime: "< 10 min",
      verified: false,
      merchant: false,
      terms: "PayPal verified accounts only.",
    },
    {
      id: 6,
      user: "WhaleTrader",
      userAvatar: "🐋",
      type: "sell",
      currency: "BTC",
      price: 43150,
      limitMin: 0.5,
      limitMax: 10,
      payment: "Bank Transfer",
      completed: 234,
      completionRate: 99.8,
      responseTime: "< 1 min",
      verified: true,
      merchant: true,
      terms: "Institutional trader. Best rates.",
    },
  ];

  const currencies = ["USDT", "BTC", "ETH", "BNB", "SOL", "XRP"];
  const fiats = ["USD", "EUR", "GBP", "CAD", "AUD", "JPY", "CNY"];
  const paymentMethods = ["all", "Bank Transfer", "Cash App", "PayPal", "USDT", "Revolut", "Wise"];

  const formatNumber = (num) => {
    if (num >= 1000000) return `${(num / 1000000).toFixed(1)}M`;
    if (num >= 1000) return `${(num / 1000).toFixed(1)}K`;
    return num.toString();
  };

  const getFilteredOffers = () => {
    let filtered = P2P_OFFERS.filter(
      (offer) =>
        offer.type === activeTab &&
        offer.currency === selectedCurrency &&
        (selectedPaymentMethod === "all" || offer.payment === selectedPaymentMethod) &&
        (searchTerm === "" || offer.user.toLowerCase().includes(searchTerm.toLowerCase()))
    );

    filtered.sort((a, b) => {
      let aVal, bVal;
      switch (sortBy) {
        case "price":
          aVal = a.price;
          bVal = b.price;
          break;
        case "limit":
          aVal = a.limitMin;
          bVal = b.limitMin;
          break;
        case "completion":
          aVal = a.completionRate;
          bVal = b.completionRate;
          break;
        default:
          aVal = a.price;
          bVal = b.price;
      }
      return sortOrder === "asc" ? aVal - bVal : bVal - aVal;
    });

    return filtered;
  };

  const handleBuySell = (offer) => {
    setSelectedOffer(offer);
    setOrderAmount("");
    setOrderMessage("");
    setShowOrderModal(true);
  };

  const executeOrder = () => {
    if (!orderAmount || parseFloat(orderAmount) <= 0) {
      showNotificationMessage("Please enter a valid amount", "error");
      return;
    }

    const amount = parseFloat(orderAmount);
    if (amount < selectedOffer.limitMin || amount > selectedOffer.limitMax) {
      showNotificationMessage(
        `Amount must be between ${selectedOffer.limitMin} and ${selectedOffer.limitMax} ${selectedOffer.currency}`,
        "error"
      );
      return;
    }

    showNotificationMessage(
      `Order placed! Please send ${amount} ${selectedOffer.currency} to complete the trade.`,
      "success"
    );
    setShowOrderModal(false);
  };

  const showNotificationMessage = (message, type) => {
    setNotificationMessage(message);
    setNotificationType(type);
    setShowNotification(true);
    setTimeout(() => setShowNotification(false), 3000);
  };

  const getBestPrice = () => {
    const offers = P2P_OFFERS.filter((o) => o.type === activeTab && o.currency === selectedCurrency);
    if (offers.length === 0) return null;
    return activeTab === "buy"
      ? Math.min(...offers.map((o) => o.price))
      : Math.max(...offers.map((o) => o.price));
  };

  const bestPrice = getBestPrice();

  return (
    <div className="space-y-3 pb-24">
      {/* Notification Toast */}
      {showNotification && (
        <div
          className={`fixed top-20 left-4 right-4 z-100 p-3 rounded-xl animate-slide-down ${
            notificationType === "success"
              ? "bg-[#0ECB81]/90"
              : notificationType === "error"
              ? "bg-[#F6465D]/90"
              : "bg-[#F0B90B]/90"
          }`}
        >
          <p className="text-white text-xs font-medium text-center">{notificationMessage}</p>
        </div>
      )}

      {/* Header Banner */}
      <div className="bg-linear-to-r from-[#F0B90B]/10 via-[#F0B90B]/5 to-transparent rounded-xl p-3">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-[#F0B90B] text-xs font-semibold">P2P Trading</p>
            <p className="text-white text-sm font-bold">0% Fee • Escrow Protected</p>
            <p className="text-[#A0A5AA] text-[10px] mt-0.5">
              Trade directly with other users. Safe and secure.
            </p>
          </div>
          <div className="text-right">
            <div className="flex items-center gap-1 text-[#0ECB81]">
              <Shield size={14} />
              <span className="text-[10px] font-semibold">100% Protected</span>
            </div>
          </div>
        </div>
      </div>

      {/* Filters Bar */}
      <div className="space-y-2">
        {/* Currency Selection */}
        <div className="flex gap-1.5 overflow-x-auto pb-1">
          {currencies.map((curr) => (
            <button
              key={curr}
              onClick={() => setSelectedCurrency(curr)}
              className={`px-2.5 py-1 rounded-lg font-semibold text-[11px] transition-all whitespace-nowrap ${
                selectedCurrency === curr
                  ? "bg-[#F0B90B] text-[#0A0B0D]"
                  : "bg-[#1E2329] text-[#A0A5AA]"
              }`}
            >
              {curr}
            </button>
          ))}
        </div>

        {/* Fiat Selection */}
        <div className="flex gap-1.5 overflow-x-auto pb-1">
          {fiats.map((fiat) => (
            <button
              key={fiat}
              onClick={() => setSelectedFiat(fiat)}
              className={`px-2 py-1 rounded-lg text-[10px] transition-all whitespace-nowrap ${
                selectedFiat === fiat
                  ? "bg-[#F0B90B] text-[#0A0B0D]"
                  : "bg-[#1E2329] text-[#A0A5AA]"
              }`}
            >
              {fiat}
            </button>
          ))}
        </div>

        {/* Best Price Indicator */}
        {bestPrice && (
          <div className="bg-[#1E2329] rounded-lg p-2">
            <div className="flex justify-between items-center">
              <span className="text-[#A0A5AA] text-[9px]">
                Best {activeTab === "buy" ? "buy" : "sell"} price for {selectedCurrency}
              </span>
              <div className="flex items-center gap-1.5">
                <span className="text-white font-semibold text-[11px]">
                  1 {selectedCurrency} ≈ {bestPrice} {selectedFiat}
                </span>
                <span className="text-[#0ECB81] text-[9px]">Best Rate</span>
              </div>
            </div>
          </div>
        )}

        {/* Search and Filter Row */}
        <div className="flex gap-2">
          <div className="relative flex-1">
            <Search size={12} className="absolute left-2.5 top-1/2 transform -translate-y-1/2 text-[#A0A5AA]" />
            <input
              type="text"
              placeholder="Search by username..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-8 pr-3 py-1.5 bg-[#1E2329] border border-[#2B3139] rounded-lg text-white text-[11px] placeholder-[#A0A5AA] focus:outline-none focus:border-[#F0B90B] transition-all"
            />
          </div>
          <button
            onClick={() => setShowPaymentFilter(!showPaymentFilter)}
            className="px-2.5 py-1.5 bg-[#1E2329] rounded-lg text-[#A0A5AA] hover:text-white transition-colors"
          >
            <Filter size={12} />
          </button>
        </div>

        {/* Payment Method Filter Dropdown */}
        {showPaymentFilter && (
          <div className="bg-[#1E2329] rounded-lg p-2 absolute right-4 left-4 mt-1 z-10 shadow-xl">
            <p className="text-white text-[11px] font-semibold mb-1.5">Payment Method</p>
            <div className="space-y-0.5">
              {paymentMethods.map((method) => (
                <button
                  key={method}
                  onClick={() => {
                    setSelectedPaymentMethod(method);
                    setShowPaymentFilter(false);
                  }}
                  className={`w-full text-left px-2 py-1.5 rounded-md text-[11px] transition-all ${
                    selectedPaymentMethod === method
                      ? "bg-[#F0B90B]/20 text-[#F0B90B]"
                      : "text-[#A0A5AA] hover:bg-[#2B3139]"
                  }`}
                >
                  {method === "all" ? "All Methods" : method}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Buy/Sell Tabs */}
      <div className="flex gap-1.5 p-0.5 bg-[#1E2329] rounded-lg">
        {["buy", "sell"].map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`flex-1 py-1.5 rounded-md font-semibold text-[11px] capitalize transition-all ${
              activeTab === tab
                ? "bg-[#F0B90B] text-[#0A0B0D]"
                : "text-[#A0A5AA]"
            }`}
          >
            {tab === "buy" ? "Buy" : "Sell"} {selectedCurrency}
          </button>
        ))}
      </div>

      {/* Sort Header */}
      <div className="flex justify-between items-center px-1">
        <span className="text-[#A0A5AA] text-[9px]">Found {getFilteredOffers().length} offers</span>
        <div className="flex gap-2">
          {[
            { key: "price", label: "Price" },
            { key: "limit", label: "Limit" },
            { key: "completion", label: "Completion" },
          ].map((sort) => (
            <button
              key={sort.key}
              onClick={() => {
                if (sortBy === sort.key) {
                  setSortOrder(sortOrder === "asc" ? "desc" : "asc");
                } else {
                  setSortBy(sort.key);
                  setSortOrder("asc");
                }
              }}
              className="text-[#A0A5AA] text-[9px] flex items-center gap-0.5"
            >
              {sort.label}
              {sortBy === sort.key && <span>{sortOrder === "asc" ? "↑" : "↓"}</span>}
            </button>
          ))}
        </div>
      </div>

      {/* Offers List */}
      <div className="space-y-2">
        {getFilteredOffers().map((offer) => (
          <div
            key={offer.id}
            className="bg-[#1E2329] rounded-lg p-3 hover:border-[#F0B90B]/30 transition-all duration-300 border border-transparent"
          >
            {/* User Info */}
            <div className="flex justify-between items-start mb-2">
              <div className="flex items-center gap-2">
                <div className="w-7 h-7 rounded-full bg-[#2B3139] flex items-center justify-center text-sm">
                  {offer.userAvatar}
                </div>
                <div>
                  <div className="flex items-center gap-1.5">
                    <p className="text-white font-semibold text-[11px]">{offer.user}</p>
                    {offer.merchant && (
                      <span className="px-1 py-0.5 bg-[#F0B90B]/20 rounded text-[8px] text-[#F0B90B] font-semibold">
                        Merchant
                      </span>
                    )}
                    {offer.verified && <Shield size={9} className="text-[#0ECB81]" />}
                  </div>
                  <div className="flex items-center gap-2 mt-0.5">
                    <p className="text-[#A0A5AA] text-[9px]">{formatNumber(offer.completed)}+ trades</p>
                    <p className="text-[#0ECB81] text-[9px]">★ {offer.completionRate}%</p>
                    <p className="text-[#A0A5AA] text-[9px]">⏱️ {offer.responseTime}</p>
                  </div>
                </div>
              </div>
              <div className="text-right">
                <p className="text-[#0ECB81] text-[9px] font-semibold">
                  {activeTab === "buy" ? "Selling" : "Buying"}
                </p>
              </div>
            </div>

            {/* Price and Limits */}
            <div className="grid grid-cols-3 gap-2 mb-2">
              <div>
                <p className="text-[#A0A5AA] text-[8px]">Price</p>
                <p className="text-white font-bold text-sm">
                  ${offer.price.toLocaleString()}
                </p>
                <p className="text-[#A0A5AA] text-[8px]">≈ {offer.price} {selectedFiat}</p>
              </div>
              <div>
                <p className="text-[#A0A5AA] text-[8px]">Limit</p>
                <p className="text-white font-semibold text-[10px]">
                  {offer.limitMin} - {offer.limitMax} {offer.currency}
                </p>
                <p className="text-[#A0A5AA] text-[8px]">
                  ≈ ${(offer.limitMin * offer.price).toFixed(0)} - ${(offer.limitMax * offer.price).toFixed(0)}
                </p>
              </div>
              <div>
                <p className="text-[#A0A5AA] text-[8px]">Payment</p>
                <div className="flex items-center gap-1">
                  <p className="text-white font-semibold text-[10px]">{offer.payment}</p>
                  <div className="w-1.5 h-1.5 bg-[#0ECB81] rounded-full"></div>
                </div>
                <p className="text-[#A0A5AA] text-[8px]">Auto-release</p>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-2">
              <button
                onClick={() => handleBuySell(offer)}
                className="flex-1 py-1.5 bg-[#F0B90B] rounded-lg text-[#0A0B0D] text-[11px] font-semibold hover:bg-[#F0B90B]/90 transition-all"
              >
                {activeTab === "buy" ? "Buy" : "Sell"} {offer.currency}
              </button>
              <button className="px-3 py-1.5 bg-[#2B3139] rounded-lg text-white text-[11px] hover:bg-[#363D45] transition-all">
                View Ads
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Order Modal */}
      {showOrderModal && selectedOffer && (
        <div
          className="fixed inset-0 bg-black/80 z-200 flex items-end justify-center animate-fade-in"
          onClick={() => setShowOrderModal(false)}
        >
          <div
            className="bg-[#1E2329] w-full max-w-md rounded-t-2xl p-4 animate-slide-up pb-6"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex justify-between items-center mb-3">
              <h3 className="text-white font-bold text-sm">
                {activeTab === "buy" ? "Buy" : "Sell"} {selectedOffer.currency}
              </h3>
              <button onClick={() => setShowOrderModal(false)} className="text-[#A0A5AA]">
                <X size={16} />
              </button>
            </div>

            {/* Trader Info */}
            <div className="flex items-center gap-2 mb-3 p-2 bg-[#2B3139] rounded-lg">
              <div className="w-8 h-8 rounded-full bg-[#1E2329] flex items-center justify-center text-sm">
                {selectedOffer.userAvatar}
              </div>
              <div>
                <p className="text-white font-semibold text-[11px]">{selectedOffer.user}</p>
                <p className="text-[#A0A5AA] text-[9px]">
                  {formatNumber(selectedOffer.completed)}+ trades • {selectedOffer.completionRate}% completion
                </p>
              </div>
            </div>

            {/* Order Details */}
            <div className="space-y-2 mb-3">
              <div className="flex justify-between text-[11px]">
                <span className="text-[#A0A5AA]">Price</span>
                <span className="text-white font-semibold">
                  {selectedOffer.price} {selectedFiat} per {selectedOffer.currency}
                </span>
              </div>
              <div className="flex justify-between text-[11px]">
                <span className="text-[#A0A5AA]">Limit</span>
                <span className="text-white">
                  {selectedOffer.limitMin} - {selectedOffer.limitMax} {selectedOffer.currency}
                </span>
              </div>
              <div className="flex justify-between text-[11px]">
                <span className="text-[#A0A5AA]">Payment Method</span>
                <span className="text-white">{selectedOffer.payment}</span>
              </div>
            </div>

            {/* Amount Input */}
            <div className="mb-3">
              <p className="text-[#A0A5AA] text-[11px] mb-1">Amount ({selectedOffer.currency})</p>
              <input
                type="number"
                value={orderAmount}
                onChange={(e) => setOrderAmount(e.target.value)}
                placeholder={`Min ${selectedOffer.limitMin} - Max ${selectedOffer.limitMax}`}
                className="w-full p-2 bg-[#2B3139] rounded-lg text-white text-[11px] placeholder-[#A0A5AA] focus:outline-none border border-transparent focus:border-[#F0B90B]"
              />
              {orderAmount && (
                <p className="text-[#A0A5AA] text-[9px] mt-1">
                  Total: ${(parseFloat(orderAmount) * selectedOffer.price).toFixed(2)} {selectedFiat}
                </p>
              )}
            </div>

            {/* Message */}
            <div className="mb-3">
              <p className="text-[#A0A5AA] text-[11px] mb-1">Message (Optional)</p>
              <textarea
                value={orderMessage}
                onChange={(e) => setOrderMessage(e.target.value)}
                placeholder="Add any notes for the trader..."
                rows={2}
                className="w-full p-2 bg-[#2B3139] rounded-lg text-white text-[11px] placeholder-[#A0A5AA] focus:outline-none border border-transparent focus:border-[#F0B90B] resize-none"
              />
            </div>

            {/* Terms */}
            <div className="mb-3 p-2 bg-[#2B3139]/50 rounded-lg">
              <p className="text-[#F0B90B] text-[9px] font-semibold mb-0.5">Trade Terms</p>
              <p className="text-[#A0A5AA] text-[9px]">{selectedOffer.terms}</p>
              <div className="flex items-center gap-1.5 mt-1.5">
                <Shield size={10} className="text-[#0ECB81]" />
                <p className="text-[#A0A5AA] text-[8px]">Escrow protected. Funds are held securely.</p>
              </div>
            </div>

            {/* Confirm Button */}
            <button
              onClick={executeOrder}
              className="w-full py-2 bg-[#F0B90B] rounded-lg text-[#0A0B0D] text-[11px] font-semibold active:scale-95 transition-transform"
            >
              Confirm {activeTab === "buy" ? "Purchase" : "Sale"}
            </button>
          </div>
        </div>
      )}

      {/* Security Notice */}
      <div className="bg-linear-to-r from-[#F0B90B]/10 via-transparent to-[#F0B90B]/5 rounded-lg p-3">
        <div className="flex items-start gap-2">
          <Shield size={14} className="text-[#0ECB81] shrink-0 mt-0.5" />
          <div>
            <p className="text-[#F0B90B] text-[11px] font-semibold">Trade with confidence</p>
            <p className="text-[#A0A5AA] text-[9px] mt-0.5">
              All trades are protected by escrow. Your funds are safe until both parties confirm.
            </p>
            <div className="flex gap-2 mt-1.5">
              <span className="text-[#0ECB81] text-[8px]">✓ 100% secure</span>
              <span className="text-[#0ECB81] text-[8px]">✓ 24/7 support</span>
              <span className="text-[#0ECB81] text-[8px]">✓ Fast dispute resolution</span>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes slide-down {
          from {
            opacity: 0;
            transform: translateY(-20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        @keyframes slide-up {
          from {
            transform: translateY(100%);
          }
          to {
            transform: translateY(0);
          }
        }
        
        @keyframes fade-in {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }
        
        .animate-slide-down {
          animation: slide-down 0.3s ease-out;
        }
        
        .animate-slide-up {
          animation: slide-up 0.3s ease-out;
        }
        
        .animate-fade-in {
          animation: fade-in 0.3s ease-out;
        }
      `}</style>
    </div>
  );
};


// Gift Card Screen Component
const GiftCardScreen = () => {
  const [searchTerm, setSearchTerm] = useState("");

  return (
    <div className="space-y-4 pb-20">
      {/* Search Bar */}
      <div className="relative">
        <Search
          size={18}
          className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[#A0A5AA]"
        />
        <input
          type="text"
          placeholder="Search gift cards..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full pl-10 pr-4 py-3 bg-[#1E2329] border border-[#2B3139] rounded-xl text-white placeholder-[#A0A5AA] focus:outline-none focus:border-[#F0B90B]"
        />
      </div>

      {/* Featured Cards */}
      <div>
        <h2 className="text-white font-semibold mb-3">Popular Gift Cards</h2>
        <div className="grid grid-cols-2 gap-3">
          {GIFT_CARDS.filter((card) => card.popular).map((card, idx) => (
            <div key={idx} className="bg-[#1E2329] rounded-xl p-4 text-center">
              <div className="text-3xl mb-2">{card.icon}</div>
              <p className="text-white font-semibold">{card.name}</p>
              <p className="text-[#0ECB81] text-sm font-semibold mt-1">
                {card.discount} off
              </p>
              <p className="text-[#A0A5AA] text-xs mt-1">
                ${card.minAmount} - ${card.maxAmount}
              </p>
              <button className="w-full mt-3 py-2 bg-[#F0B90B]/10 rounded-lg text-[#F0B90B] text-sm font-semibold">
                Buy Now
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* All Cards */}
      <div>
        <div className="flex justify-between items-center mb-3">
          <h2 className="text-white font-semibold">All Gift Cards</h2>
          <button className="text-[#F0B90B] text-xs">View All →</button>
        </div>
        <div className="space-y-2">
          {GIFT_CARDS.map((card, idx) => (
            <div
              key={idx}
              className="bg-[#1E2329] rounded-xl p-3 flex items-center justify-between"
            >
              <div className="flex items-center gap-3">
                <div className="text-2xl">{card.icon}</div>
                <div>
                  <p className="text-white font-semibold">{card.name}</p>
                  <p className="text-[#0ECB81] text-xs">
                    {card.discount} discount
                  </p>
                </div>
              </div>
              <button className="px-4 py-1.5 bg-[#F0B90B] rounded-lg text-[#0A0B0D] text-sm font-semibold">
                Buy
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

// AI Assistant Screen Component
const AIScreen = () => {
  const [messages, setMessages] = useState([
    {
      role: "assistant",
      content:
        "Hello! I'm your AI trading assistant. I can help you with market analysis, trading strategies, and crypto insights. How can I help you today?",
    },
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSend = () => {
    if (!input.trim()) return;

    setMessages([...messages, { role: "user", content: input }]);
    setInput("");
    setIsLoading(true);

    // Simulate AI response
    setTimeout(() => {
      let response = "";
      if (
        input.toLowerCase().includes("bitcoin") ||
        input.toLowerCase().includes("btc")
      ) {
        response =
          "Bitcoin is currently trading at $43,521 with a 2.4% increase in the last 24 hours. The market sentiment is bullish. Would you like to see more detailed analysis?";
      } else if (
        input.toLowerCase().includes("memecoin") ||
        input.toLowerCase().includes("doge")
      ) {
        response =
          "Memecoins are showing strong momentum today. DOGE is up 15.7% and PEPE has gained 22.4%. The memecoin sector has seen increased volume recently.";
      } else if (input.toLowerCase().includes("nft")) {
        response =
          "The NFT market is showing recovery signs. Bored Ape Yacht Club floor price is 12.5 ETH with 2.4K ETH volume in the past 24 hours.";
      } else {
        response =
          "I can help you with market analysis, trading strategies, gift card offers, and P2P trading tips. What specific information are you looking for?";
      }
      setMessages((prev) => [
        ...prev,
        { role: "assistant", content: response },
      ]);
      setIsLoading(false);
    }, 1000);
  };

  const suggestions = [
    "BTC price prediction",
    "Best memecoins to buy",
    "NFT market trends",
    "P2P trading tips",
    "Gift card discounts",
    "Market analysis",
  ];

  return (
    <div className="flex flex-col h-[calc(100vh-120px)] pb-20">
      {/* Chat Messages */}
      <div className="flex-1 space-y-3 mb-4 overflow-y-auto">
        {messages.map((msg, idx) => (
          <div
            key={idx}
            className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
          >
            <div
              className={`max-w-[80%] p-3 rounded-xl ${
                msg.role === "user"
                  ? "bg-[#F0B90B] text-[#0A0B0D]"
                  : "bg-[#1E2329] text-white"
              }`}
            >
              <p className="text-sm">{msg.content}</p>
            </div>
          </div>
        ))}
        {isLoading && (
          <div className="flex justify-start">
            <div className="bg-[#1E2329] p-3 rounded-xl">
              <div className="flex gap-1">
                <div className="w-2 h-2 bg-[#F0B90B] rounded-full animate-bounce"></div>
                <div className="w-2 h-2 bg-[#F0B90B] rounded-full animate-bounce animation-delay-200"></div>
                <div className="w-2 h-2 bg-[#F0B90B] rounded-full animate-bounce animation-delay-400"></div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Suggestions */}
      <div className="mb-3">
        <div className="flex gap-2 overflow-x-auto pb-2">
          {suggestions.map((suggestion, idx) => (
            <button
              key={idx}
              onClick={() => setInput(suggestion)}
              className="px-3 py-1.5 bg-[#1E2329] rounded-full text-[#A0A5AA] text-xs whitespace-nowrap"
            >
              {suggestion}
            </button>
          ))}
        </div>
      </div>

      {/* Input Area */}
      <div className="flex gap-2">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyPress={(e) => e.key === "Enter" && handleSend()}
          placeholder="Ask me anything about crypto..."
          className="flex-1 px-4 py-3 bg-[#1E2329] border border-[#2B3139] rounded-xl text-white placeholder-[#A0A5AA] focus:outline-none focus:border-[#F0B90B]"
        />
        <button
          onClick={handleSend}
          className="px-4 py-3 bg-[#F0B90B] rounded-xl text-[#0A0B0D] font-semibold"
        >
          Send
        </button>
      </div>
    </div>
  );
};

// Bottom Navigation Component
const BottomNav = ({ activeTab, setActiveTab }) => {
  const navItems = [
    { id: "home", label: "Home", icon: Home },
    { id: "exchange", label: "Trade", icon: TrendingUp },
    { id: "p2p", label: "P2P", icon: Users },
    { id: "giftcard", label: "Gift Card", icon: Gift },
    { id: "ai", label: "AI", icon: Bot },
  ];

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-[#1E2329] border-t border-[#2B3139] px-4 py-2 z-50">
      <div className="flex justify-around items-center max-w-md mx-auto">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeTab === item.id;
          return (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`flex flex-col items-center gap-1 py-1 px-3 rounded-lg transition-all relative ${
                isActive ? "text-[#F0B90B]" : "text-[#A0A5AA]"
              }`}
            >
              <Icon
                size={22}
                className={isActive ? "animate-pulse-slow" : ""}
              />
              <span className="text-[10px] font-medium">{item.label}</span>
              {isActive && (
                <div className="absolute -top-2 w-1 h-1 bg-[#F0B90B] rounded-full"></div>
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
};

// Header Component
const Header = ({ title }) => {
  return (
    <div className="flex justify-between items-center mb-6">
      <div>
        <p className="text-[#A0A5AA] text-xs">Welcome back,</p>
        <h1 className="text-white text-xl font-bold">John Doe</h1>
      </div>
      <div className="flex gap-2">
        <button className="p-2 bg-[#1E2329] rounded-xl relative">
          <Bell size={18} className="text-[#F0B90B]" />
          <div className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></div>
        </button>
        <button className="p-2 bg-[#1E2329] rounded-xl">
          <User size={18} className="text-[#A0A5AA]" />
        </button>
      </div>
    </div>
  );
};

// ============================================================
// MAIN APP COMPONENT
// ============================================================

const UI = () => {
  const [activeTab, setActiveTab] = useState("home");

  const renderScreen = () => {
    switch (activeTab) {
      case "home":
        return <HomeScreen />;
      case "exchange":
        return <ExchangeScreen />;
      case "p2p":
        return <P2PScreen />;
      case "giftcard":
        return <GiftCardScreen />;
      case "ai":
        return <AIScreen />;
      default:
        return <HomeScreen />;
    }
  };

  return (
    <div className="min-h-screen bg-[#0A0B0D]">
      {/* Main Content */}
      <div className="px-4 pt-6 pb-4">
        <Header />
        {renderScreen()}
      </div>

      {/* Bottom Navigation */}
      <BottomNav activeTab={activeTab} setActiveTab={setActiveTab} />

      <style>{`
        @keyframes bounce {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-4px); }
        }
        
        @keyframes pulse-slow {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.05); }
        }
        
        .animate-bounce {
          animation: bounce 0.6s ease-in-out infinite;
        }
        
        .animate-pulse-slow {
          animation: pulse-slow 2s ease-in-out infinite;
        }
        
        .animation-delay-200 {
          animation-delay: 0.2s;
        }
        
        .animation-delay-400 {
          animation-delay: 0.4s;
        }
        
        input[type="range"] {
          -webkit-appearance: none;
        }
        
        input[type="range"]::-webkit-slider-thumb {
          -webkit-appearance: none;
          width: 16px;
          height: 16px;
          background: #F0B90B;
          border-radius: 50%;
          cursor: pointer;
        }
        
        ::-webkit-scrollbar {
          width: 4px;
          height: 4px;
        }
        
        ::-webkit-scrollbar-track {
          background: #1E2329;
        }
        
        ::-webkit-scrollbar-thumb {
          background: #F0B90B;
          border-radius: 4px;
        }
      `}</style>
    </div>
  );
};

// Helper components
const Eye = (props) => (
  <svg
    {...props}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
  >
    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
    <circle cx="12" cy="12" r="3" />
  </svg>
);

const EyeOff = (props) => (
  <svg
    {...props}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
  >
    <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24" />
    <line x1="1" y1="1" x2="23" y2="23" />
  </svg>
);

const ArrowUpDown = (props) => (
  <svg
    {...props}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
  >
    <path d="m3 16 4 4 4-4M7 20V4M21 8l-4-4-4 4M17 4v16" />
  </svg>
);

export default UI;
