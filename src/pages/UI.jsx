import React, { useState, useEffect, useRef } from "react";
import {
  Home,
  TrendingUp,
  Users,
  Gift,
  Bell,
  User,
  Search,
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
  Check,
  Copy,
  BarChart3,
  Activity,
  DollarSign,
} from "lucide-react";
import useMe from "../hooks/useMe";
import LoadingSpinner from "../components/Spinner";

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

// Market Data
const MARKET_DATA = [
  {
    symbol: "BTC",
    name: "Bitcoin",
    price: 43521.20,
    change: 2.4,
    positive: true,
    icon: "₿",
    color: "#F7931A",
    marketCap: "850B",
    volume24h: "24.5B",
    high24h: 44200,
    low24h: 42500,
  },
  {
    symbol: "ETH",
    name: "Ethereum",
    price: 2345.67,
    change: 1.8,
    positive: true,
    icon: "Ξ",
    color: "#627EEA",
    marketCap: "280B",
    volume24h: "12.3B",
    high24h: 2380,
    low24h: 2300,
  },
  {
    symbol: "BNB",
    name: "BNB",
    price: 315.42,
    change: 0.5,
    positive: true,
    icon: "B",
    color: "#F3BA2F",
    marketCap: "50B",
    volume24h: "1.2B",
    high24h: 318.5,
    low24h: 312.0,
  },
  {
    symbol: "SOL",
    name: "Solana",
    price: 98.45,
    change: 5.2,
    positive: true,
    icon: "◎",
    color: "#00FFA3",
    marketCap: "42B",
    volume24h: "3.1B",
    high24h: 100.5,
    low24h: 95.2,
  },
  {
    symbol: "XRP",
    name: "XRP",
    price: 0.52,
    change: -1.2,
    positive: false,
    icon: "X",
    color: "#23292F",
    marketCap: "28B",
    volume24h: "0.8B",
    high24h: 0.53,
    low24h: 0.51,
  },
  {
    symbol: "SUI",
    name: "Sui",
    price: 2.49,
    change: 3.5,
    positive: true,
    icon: "S",
    color: "#6BCBEF",
    marketCap: "2.8B",
    volume24h: "0.15B",
    high24h: 2.55,
    low24h: 2.42,
  },
  {
    symbol: "DOGE",
    name: "Dogecoin",
    price: 0.082,
    change: 15.7,
    positive: true,
    icon: "🐕",
    color: "#C3A634",
    marketCap: "11.5B",
    volume24h: "0.85B",
    high24h: 0.085,
    low24h: 0.078,
  },
];

// ============================================================
// COMPONENTS
// ============================================================

const HomeScreen = () => {
  const [showBalance, setShowBalance] = useState(true);
  const [selectedAsset, setSelectedAsset] = useState(null);
  const [showTransactionModal, setShowTransactionModal] = useState(false);
  const [transactionType, setTransactionType] = useState("send");
  const [transactionAmount, setTransactionAmount] = useState("");
  const [transactionAddress, setTransactionAddress] = useState("");
  const [showNotification, setShowNotification] = useState(false);
  const [notificationMessage, setNotificationMessage] = useState("");
  const [notificationType, setNotificationType] = useState("success");
  const [copiedAddress, setCopiedAddress] = useState(false);
  const [selectedAssetForDetail, setSelectedAssetForDetail] = useState(null);
  const [showAssetDetailModal, setShowAssetDetailModal] = useState(false);
  
  // Transfer specific states
  const [showTransferModal, setShowTransferModal] = useState(false);
  const [transferAsset, setTransferAsset] = useState(null);
  const [transferAmount, setTransferAmount] = useState("");
  const [recipientUID, setRecipientUID] = useState("");
  const [transferNotes, setTransferNotes] = useState("");
  const [isSearching, setIsSearching] = useState(false);
  const [recipientInfo, setRecipientInfo] = useState(null);
  const [transferStep, setTransferStep] = useState(1);

  // Mock users database
  const mockUsers = [
    { uid: "1000000001", username: "john_doe", email: "john@example.com", name: "John Doe" },
    { uid: "1000000002", username: "jane_smith", email: "jane@example.com", name: "Jane Smith" },
    { uid: "1000000003", username: "bob_wilson", email: "bob@example.com", name: "Bob Wilson" },
    { uid: "1000000004", username: "alice_brown", email: "alice@example.com", name: "Alice Brown" },
  ];

  const [userAssets, setUserAssets] = useState([
    {
      id: 1,
      symbol: "BTC",
      name: "Bitcoin",
      amount: 0.42,
      value: 18450.0,
      change: "+2.4%",
      positive: true,
      icon: "₿",
      color: "#F7931A",
      receiveAddress: "bc1qxyz789...abc123",
      decimals: 8,
      price: 43921.50,
      chain: "bitcoin",
      contractAddress: "Native Token",
      website: "https://bitcoin.org",
      explorer: "https://blockstream.info",
      marketCap: "$850B",
      volume24h: "$24.5B",
      supportsInternalTransfer: true,
    },
    {
      id: 2,
      symbol: "ETH",
      name: "Ethereum",
      amount: 3.2,
      value: 5340.8,
      change: "+1.8%",
      positive: true,
      icon: "Ξ",
      color: "#627EEA",
      receiveAddress: "0x4567...8901def",
      decimals: 18,
      price: 1669.00,
      chain: "ethereum",
      contractAddress: "Native Token",
      website: "https://ethereum.org",
      explorer: "https://etherscan.io",
      marketCap: "$200B",
      volume24h: "$12.3B",
      supportsInternalTransfer: true,
    },
    {
      id: 3,
      symbol: "BNB",
      name: "BNB",
      amount: 5.5,
      value: 1734.81,
      change: "+0.8%",
      positive: true,
      icon: "B",
      color: "#F3BA2F",
      receiveAddress: "bnb1xyz...456abc",
      decimals: 18,
      price: 315.42,
      chain: "bsc",
      contractAddress: "Native Token",
      website: "https://bnbchain.org",
      explorer: "https://bscscan.com",
      marketCap: "$50B",
      volume24h: "$1.2B",
      supportsInternalTransfer: true,
    },
    {
      id: 4,
      symbol: "SOL",
      name: "Solana",
      amount: 25.0,
      value: 2462.5,
      change: "+5.2%",
      positive: true,
      icon: "◎",
      color: "#00FFA3",
      receiveAddress: "Solana...xyz789",
      decimals: 9,
      price: 98.50,
      chain: "solana",
      contractAddress: "Native Token",
      website: "https://solana.com",
      explorer: "https://solscan.io",
      marketCap: "$42B",
      volume24h: "$3.1B",
      supportsInternalTransfer: true,
    },
    {
      id: 5,
      symbol: "XRP",
      name: "XRP",
      amount: 1200,
      value: 624.0,
      change: "+1.2%",
      positive: true,
      icon: "X",
      color: "#23292F",
      receiveAddress: "rXYZ...789abc",
      decimals: 6,
      price: 0.52,
      chain: "ripple",
      contractAddress: "Native Token",
      website: "https://xrpl.org",
      explorer: "https://xrpscan.com",
      marketCap: "$28B",
      volume24h: "$0.8B",
      supportsInternalTransfer: true,
    },
    {
      id: 6,
      symbol: "SUI",
      name: "Sui",
      amount: 500,
      value: 1245.0,
      change: "+3.5%",
      positive: true,
      icon: "S",
      color: "#6BCBEF",
      receiveAddress: "0xabc...123def",
      decimals: 9,
      price: 2.49,
      chain: "sui",
      contractAddress: "Native Token",
      website: "https://sui.io",
      explorer: "https://suiscan.xyz",
      marketCap: "$2.8B",
      volume24h: "$0.15B",
      supportsInternalTransfer: true,
    },
  ]);

  const [totalPortfolioValue, setTotalPortfolioValue] = useState(0);
  const [totalProfit, setTotalProfit] = useState(0);
  const [profitPercentage, setProfitPercentage] = useState(0);

  useEffect(() => {
    const totalValue = userAssets.reduce((sum, asset) => sum + asset.value, 0);
    setTotalPortfolioValue(totalValue);
    const simulatedProfit = totalValue * 0.082;
    setTotalProfit(simulatedProfit);
    setProfitPercentage(8.2);
  }, [userAssets]);

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

  const searchUserByUID = async (uid) => {
    if (!uid || uid.length < 10) {
      setRecipientInfo(null);
      return;
    }
    
    setIsSearching(true);
    setTimeout(() => {
      const found = mockUsers.find(user => user.uid === uid);
      setRecipientInfo(found || null);
      setIsSearching(false);
    }, 500);
  };

  const handleInternalTransfer = async () => {
    if (!transferAsset || !transferAmount || !recipientUID || !recipientInfo) {
      showNotificationMessage("Please fill all fields", "error");
      return;
    }

    const amount = parseFloat(transferAmount);
    if (amount > transferAsset.amount) {
      showNotificationMessage("Insufficient balance", "error");
      return;
    }

    setUserAssets((prev) =>
      prev.map((asset) => {
        if (asset.id === transferAsset.id) {
          const newAmount = asset.amount - amount;
          const newValue = newAmount * asset.price;
          return { ...asset, amount: newAmount, value: newValue };
        }
        return asset;
      })
    );

    showNotificationMessage(
      `✓ Successfully transferred ${amount} ${transferAsset.symbol} to ${recipientInfo.name}`,
      "success"
    );

    setShowTransferModal(false);
    setTransferAsset(null);
    setTransferAmount("");
    setRecipientUID("");
    setRecipientInfo(null);
    setTransferNotes("");
    setTransferStep(1);
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

  const handleTransferClick = (asset) => {
    setTransferAsset(asset);
    setTransferAmount("");
    setRecipientUID("");
    setRecipientInfo(null);
    setTransferNotes("");
    setTransferStep(1);
    setShowTransferModal(true);
  };

  const handleAssetClick = (asset) => {
    setSelectedAssetForDetail(asset);
    setShowAssetDetailModal(true);
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
            const newAmount = asset.amount - amount;
            const newValue = newAmount * asset.price;
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

  const TransferModal = () => {
    if (!showTransferModal || !transferAsset) return null;

    return (
      <div
        className="fixed inset-0 bg-black/80 z-200 flex items-end justify-center animate-fade-in"
        onClick={() => setShowTransferModal(false)}
      >
        <div
          className="bg-[#1E2329] w-full max-w-md rounded-t-2xl p-5 animate-slide-up pb-8 max-h-[85vh] overflow-y-auto"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="flex justify-between items-center mb-4 sticky top-0 bg-[#1E2329] pt-0 pb-2">
            <div className="flex items-center gap-3">
              <div
                className="w-8 h-8 rounded-full flex items-center justify-center text-base"
                style={{
                  backgroundColor: `${transferAsset.color}20`,
                  color: transferAsset.color,
                }}
              >
                {transferAsset.icon}
              </div>
              <div>
                <h3 className="text-white font-semibold text-base">Internal Transfer</h3>
                <p className="text-[#A0A5AA] text-xs">{transferAsset.symbol}</p>
              </div>
            </div>
            <button
              onClick={() => setShowTransferModal(false)}
              className="text-[#A0A5AA] text-xl"
            >
              ✕
            </button>
          </div>

          {transferStep === 1 ? (
            <>
              <div className="mb-4 p-3 bg-[#2B3139]/50 rounded-xl">
                <div className="flex justify-between items-center">
                  <div>
                    <p className="text-[#A0A5AA] text-[9px]">Available Balance</p>
                    <p className="text-white font-semibold text-base">
                      {transferAsset.amount.toLocaleString()} {transferAsset.symbol}
                    </p>
                    <p className="text-[#A0A5AA] text-[9px]">
                      ≈ {formatNumber(transferAsset.value)}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-[#A0A5AA] text-[9px]">Transfer Fee</p>
                    <p className="text-[#0ECB81] text-xs font-semibold">Free</p>
                  </div>
                </div>
              </div>

              <div className="mb-4">
                <p className="text-[#A0A5AA] text-xs mb-2">
                  Recipient User UID <span className="text-[#F0B90B]">*</span>
                </p>
                <div className="relative">
                  <input
                    type="text"
                    value={recipientUID}
                    onChange={(e) => {
                      setRecipientUID(e.target.value);
                      searchUserByUID(e.target.value);
                    }}
                    placeholder="Enter 10-digit User UID (e.g., 1000000001)"
                    maxLength={10}
                    className="w-full p-2.5 bg-[#2B3139] rounded-xl text-white text-sm placeholder-[#A0A5AA] focus:outline-none border border-transparent focus:border-[#F0B90B]"
                  />
                  {isSearching && (
                    <div className="absolute right-3 top-3">
                      <div className="w-4 h-4 border-2 border-[#F0B90B] border-t-transparent rounded-full animate-spin"></div>
                    </div>
                  )}
                </div>
                
                {recipientInfo && (
                  <div className="mt-2 p-2 bg-[#0ECB81]/10 rounded-lg border border-[#0ECB81]/30">
                    <div className="flex items-center gap-2">
                      <div className="w-6 h-6 bg-[#0ECB81]/20 rounded-full flex items-center justify-center">
                        <Check size={12} className="text-[#0ECB81]" />
                      </div>
                      <div>
                        <p className="text-white text-xs font-medium">{recipientInfo.name}</p>
                        <p className="text-[#A0A5AA] text-[9px]">@{recipientInfo.username}</p>
                      </div>
                    </div>
                  </div>
                )}
                
                {recipientUID && !recipientInfo && !isSearching && (
                  <div className="mt-2 p-2 bg-[#F6465D]/10 rounded-lg border border-[#F6465D]/30">
                    <p className="text-[#F6465D] text-xs">User not found. Please check the UID.</p>
                  </div>
                )}
              </div>

              <div className="mb-4">
                <p className="text-[#A0A5AA] text-xs mb-2">
                  Amount <span className="text-[#F0B90B]">*</span>
                </p>
                <div className="relative">
                  <input
                    type="number"
                    value={transferAmount}
                    onChange={(e) => setTransferAmount(e.target.value)}
                    placeholder="0.00"
                    className="w-full p-2.5 bg-[#2B3139] rounded-xl text-white text-sm placeholder-[#A0A5AA] focus:outline-none border border-transparent focus:border-[#F0B90B]"
                  />
                  <button
                    onClick={() => setTransferAmount(transferAsset.amount.toString())}
                    className="absolute right-3 top-2 text-[#F0B90B] text-xs font-semibold"
                  >
                    MAX
                  </button>
                </div>
                {transferAmount && parseFloat(transferAmount) > 0 && (
                  <p className="text-[#A0A5AA] text-[10px] mt-1">
                    ≈ ${(parseFloat(transferAmount) * transferAsset.price).toFixed(2)} USD
                  </p>
                )}
              </div>

              <div className="mb-4">
                <p className="text-[#A0A5AA] text-xs mb-2">Note (Optional)</p>
                <input
                  type="text"
                  value={transferNotes}
                  onChange={(e) => setTransferNotes(e.target.value)}
                  placeholder="Add a message..."
                  className="w-full p-2.5 bg-[#2B3139] rounded-xl text-white text-sm placeholder-[#A0A5AA] focus:outline-none border border-transparent focus:border-[#F0B90B]"
                />
              </div>

              <div className="mb-4 p-2.5 bg-[#2B3139]/50 rounded-xl">
                <p className="text-[#0ECB81] text-[10px] font-semibold">✓ Internal Transfer Benefits:</p>
                <p className="text-[#A0A5AA] text-[9px] mt-1">• No network fees (FREE)</p>
                <p className="text-[#A0A5AA] text-[9px]">• Instant transfer</p>
                <p className="text-[#A0A5AA] text-[9px]">• No blockchain confirmation delay</p>
                <p className="text-[#A0A5AA] text-[9px]">• Protected by platform security</p>
              </div>

              <button
                onClick={() => {
                  if (!recipientInfo) {
                    showNotificationMessage("Please enter a valid recipient UID", "error");
                    return;
                  }
                  if (!transferAmount || parseFloat(transferAmount) <= 0) {
                    showNotificationMessage("Please enter a valid amount", "error");
                    return;
                  }
                  if (parseFloat(transferAmount) > transferAsset.amount) {
                    showNotificationMessage("Insufficient balance", "error");
                    return;
                  }
                  setTransferStep(2);
                }}
                className="w-full py-2.5 bg-[#F0B90B] rounded-xl text-[#0A0B0D] text-sm font-semibold mt-2 active:scale-95 transition-transform"
              >
                Continue
              </button>
            </>
          ) : (
            <>
              <div className="mb-4 p-3 bg-[#2B3139]/50 rounded-xl">
                <p className="text-[#F0B90B] text-xs font-semibold mb-3">Confirm Transfer</p>
                
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-[#A0A5AA]">From</span>
                    <span className="text-white font-medium">You</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-[#A0A5AA]">To</span>
                    <span className="text-white font-medium">{recipientInfo?.name}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-[#A0A5AA]">Recipient UID</span>
                    <span className="text-white font-mono text-xs">{recipientUID}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-[#A0A5AA]">Asset</span>
                    <span className="text-white font-medium">{transferAsset.symbol}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-[#A0A5AA]">Amount</span>
                    <span className="text-white font-bold">{transferAmount} {transferAsset.symbol}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-[#A0A5AA]">Value</span>
                    <span className="text-white">≈ ${(parseFloat(transferAmount) * transferAsset.price).toFixed(2)} USD</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-[#A0A5AA]">Transfer Fee</span>
                    <span className="text-[#0ECB81] font-semibold">FREE</span>
                  </div>
                  {transferNotes && (
                    <div className="flex justify-between text-sm">
                      <span className="text-[#A0A5AA]">Note</span>
                      <span className="text-white text-xs">{transferNotes}</span>
                    </div>
                  )}
                </div>
              </div>

              <div className="flex gap-3">
                <button
                  onClick={() => setTransferStep(1)}
                  className="flex-1 py-2.5 bg-[#2B3139] rounded-xl text-white text-sm font-semibold"
                >
                  Back
                </button>
                <button
                  onClick={handleInternalTransfer}
                  className="flex-1 py-2.5 bg-[#F0B90B] rounded-xl text-[#0A0B0D] text-sm font-semibold"
                >
                  Confirm Transfer
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    );
  };

  const AssetDetailModal = () => {
    if (!showAssetDetailModal || !selectedAssetForDetail) return null;

    return (
      <div
        className="fixed inset-0 bg-black/80 z-200 flex items-end justify-center animate-fade-in"
        onClick={() => setShowAssetDetailModal(false)}
      >
        <div
          className="bg-[#1E2329] w-full max-w-md rounded-t-2xl p-5 animate-slide-up pb-8 max-h-[85vh] overflow-y-auto"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="flex justify-between items-center mb-4 sticky top-0 bg-[#1E2329] pt-0 pb-2">
            <div className="flex items-center gap-3">
              <div
                className="w-10 h-10 rounded-full flex items-center justify-center text-xl"
                style={{
                  backgroundColor: `${selectedAssetForDetail.color}20`,
                  color: selectedAssetForDetail.color,
                }}
              >
                {selectedAssetForDetail.icon}
              </div>
              <div>
                <h3 className="text-white font-bold text-lg">
                  {selectedAssetForDetail.name}
                </h3>
                <p className="text-[#A0A5AA] text-xs">
                  {selectedAssetForDetail.symbol}
                </p>
              </div>
            </div>
            <button
              onClick={() => setShowAssetDetailModal(false)}
              className="text-[#A0A5AA] text-xl"
            >
              ✕
            </button>
          </div>

          <div className="space-y-3">
            <div className="p-4 bg-[#2B3139] rounded-xl">
              <div className="flex justify-between items-center mb-2">
                <span className="text-[#A0A5AA] text-xs">Current Price</span>
                <span className="text-white text-xl font-bold">
                  ${formatPrice(selectedAssetForDetail.price)}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#A0A5AA] text-xs">24h Change</span>
                <span className={`text-xs ${selectedAssetForDetail.positive ? "text-[#0ECB81]" : "text-[#F6465D]"} font-semibold`}>
                  {selectedAssetForDetail.change}
                </span>
              </div>
            </div>

            <div className="p-3 bg-[#2B3139]/50 rounded-xl">
              <p className="text-[#A0A5AA] text-[10px] mb-1">Contract Address</p>
              <div className="flex justify-between items-center gap-2">
                <p className="text-white text-[10px] font-mono break-all flex-1">
                  {selectedAssetForDetail.contractAddress}
                </p>
                <button
                  onClick={() => copyToClipboard(selectedAssetForDetail.contractAddress)}
                  className="p-1.5 bg-[#F0B90B]/20 rounded-lg"
                >
                  <Copy size={12} className="text-[#F0B90B]" />
                </button>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-2">
              <div className="p-3 bg-[#2B3139] rounded-xl">
                <p className="text-[#A0A5AA] text-[9px]">Chain/Network</p>
                <p className="text-white text-sm font-semibold mt-1">
                  {selectedAssetForDetail.chain.toUpperCase()}
                </p>
              </div>
              <div className="p-3 bg-[#2B3139] rounded-xl">
                <p className="text-[#A0A5AA] text-[9px]">Decimals</p>
                <p className="text-white text-sm font-semibold mt-1">
                  {selectedAssetForDetail.decimals}
                </p>
              </div>
            </div>

            <div className="p-3 bg-[#2B3139] rounded-xl">
              <p className="text-[#A0A5AA] text-[9px] mb-2">Your Holding</p>
              <div className="flex justify-between items-center mb-1">
                <span className="text-white text-sm">Quantity</span>
                <span className="text-white text-sm font-semibold">
                  {selectedAssetForDetail.amount.toLocaleString()} {selectedAssetForDetail.symbol}
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-white text-sm">Value</span>
                <span className="text-white text-sm font-semibold">
                  {formatNumber(selectedAssetForDetail.value)}
                </span>
              </div>
            </div>

            <div className="p-3 bg-[#2B3139]/50 rounded-xl">
              <p className="text-[#F0B90B] text-[10px] font-semibold mb-2">Market Information</p>
              <div className="flex justify-between mb-1">
                <span className="text-[#A0A5AA] text-[10px]">Market Cap</span>
                <span className="text-white text-[10px]">{selectedAssetForDetail.marketCap}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#A0A5AA] text-[10px]">24h Volume</span>
                <span className="text-white text-[10px]">{selectedAssetForDetail.volume24h}</span>
              </div>
            </div>

            <div className="flex gap-3 pt-2">
              <button
                onClick={() => {
                  setShowAssetDetailModal(false);
                  handleSend(selectedAssetForDetail);
                }}
                className="flex-1 py-2.5 bg-[#F0B90B] rounded-xl text-[#0A0B0D] text-sm font-semibold"
              >
                Send
              </button>
              <button
                onClick={() => {
                  setShowAssetDetailModal(false);
                  handleReceive(selectedAssetForDetail);
                }}
                className="flex-1 py-2.5 bg-[#2B3139] rounded-xl text-white text-sm font-semibold"
              >
                Receive
              </button>
              <button
                onClick={() => {
                  setShowAssetDetailModal(false);
                  handleTransferClick(selectedAssetForDetail);
                }}
                className="flex-1 py-2.5 bg-[#1E2329] rounded-xl text-white text-sm font-semibold border border-[#F0B90B]/30"
              >
                Transfer
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="space-y-4 pb-24">
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
              <button onClick={() => setShowBalance(!showBalance)} className="p-0.5">
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
            <p className="text-[#0ECB81] text-xs font-semibold">+{profitPercentage}%</p>
          </div>
          <div className="text-center">
            <p className="text-[#A0A5AA] text-[9px]">Assets</p>
            <p className="text-white text-xs font-semibold">{userAssets.length}</p>
          </div>
          <div className="text-center">
            <p className="text-[#A0A5AA] text-[9px]">Profit</p>
            <p className="text-[#0ECB81] text-xs font-semibold">+${totalProfit.toFixed(0)}</p>
          </div>
        </div>
      </div>

      <div>
        <div className="flex justify-between items-center mb-2 px-1">
          <h2 className="text-white text-sm font-semibold">Your Assets</h2>
          <span className="text-[#A0A5AA] text-[10px]">{userAssets.length} assets</span>
        </div>

        <div className="space-y-2">
          {userAssets.map((asset) => (
            <div
              key={asset.id}
              className="bg-[#1E2329] rounded-xl p-3 hover:bg-[#2B3139] transition-all duration-300 mb-2 cursor-pointer"
              onClick={() => handleAssetClick(asset)}
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
                  <p className="text-white font-semibold text-sm">{formatNumber(asset.price)}</p>
                  <p className={`text-[10px] ${asset.positive ? "text-[#0ECB81]" : "text-[#F6465D]"}`}>
                    {asset.change}
                  </p>
                </div>
              </div>

              <div className="flex justify-between items-center pt-2 border-t border-[#2B3139]">
                <div>
                  <p className="text-[#A0A5AA] text-[9px]">Quantity</p>
                  <p className="text-white text-xs font-medium">
                    {asset.amount.toLocaleString()} {asset.symbol}
                  </p>
                </div>
                <div>
                  <p className="text-[#A0A5AA] text-[9px]">Holdings</p>
                  <p className="text-white text-xs font-medium">${formatPrice(asset.value)}</p>
                </div>
                <div className="flex gap-1.5">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleSend(asset);
                    }}
                    className="px-2.5 py-1 bg-[#F0B90B]/10 rounded-lg text-[#F0B90B] text-[10px] font-semibold"
                  >
                    Send
                  </button>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleReceive(asset);
                    }}
                    className="px-2.5 py-1 bg-[#2B3139] rounded-lg text-white text-[10px] font-semibold"
                  >
                    Receive
                  </button>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleTransferClick(asset);
                    }}
                    className="px-2.5 py-1 bg-[#1E2329] rounded-lg text-white text-[10px] font-semibold border border-[#F0B90B]/30"
                  >
                    Transfer
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

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
                    {transactionType === "send" ? "Send" : "Receive"} {selectedAsset.symbol}
                  </h3>
                  <p className="text-[#A0A5AA] text-xs">{selectedAsset.name}</p>
                </div>
              </div>
              <button onClick={() => setShowTransactionModal(false)} className="text-[#A0A5AA]">
                ✕
              </button>
            </div>

            {transactionType === "send" && (
              <>
                <div className="mb-4 p-3 bg-[#2B3139]/50 rounded-xl">
                  <div className="flex justify-between items-center">
                    <div>
                      <p className="text-[#A0A5AA] text-[9px]">Available Balance</p>
                      <p className="text-white font-semibold text-base">
                        {selectedAsset.amount.toLocaleString()} {selectedAsset.symbol}
                      </p>
                      <p className="text-[#A0A5AA] text-[9px]">≈ {formatNumber(selectedAsset.value)}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-[#A0A5AA] text-[9px]">Network</p>
                      <p className="text-white text-xs font-medium">{selectedAsset.chain.toUpperCase()}</p>
                    </div>
                  </div>
                </div>

                <div className="mb-4">
                  <p className="text-[#A0A5AA] text-xs mb-2">Amount</p>
                  <div className="relative">
                    <input
                      type="number"
                      value={transactionAmount}
                      onChange={(e) => setTransactionAmount(e.target.value)}
                      placeholder="0.00"
                      className="w-full p-2.5 bg-[#2B3139] rounded-xl text-white text-sm placeholder-[#A0A5AA] focus:outline-none border border-transparent focus:border-[#F0B90B]"
                    />
                    <button
                      onClick={() => setTransactionAmount(selectedAsset.amount.toString())}
                      className="absolute right-3 top-2 text-[#F0B90B] text-xs font-semibold"
                    >
                      MAX
                    </button>
                  </div>
                </div>

                <div className="mb-4">
                  <p className="text-[#A0A5AA] text-xs mb-2">Recipient Address</p>
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
                  <p className="text-[#A0A5AA] text-[10px]">Estimated Arrival: 5-10 minutes</p>
                  <p className="text-[#F6465D] text-[10px] mt-1">
                    ⚠️ Only send {selectedAsset.symbol} to {selectedAsset.symbol} addresses
                  </p>
                </div>
              </>
            )}

            {transactionType === "receive" && (
              <div className="text-center">
                <div className="mb-4 p-4 bg-[#2B3139] rounded-xl">
                  <p className="text-[#A0A5AA] text-xs mb-2">Your {selectedAsset.symbol} Address</p>
                  <div className="bg-[#0A0B0D] p-3 rounded-lg">
                    <p className="text-white text-xs font-mono break-all">{selectedAsset.receiveAddress}</p>
                  </div>
                  <button
                    onClick={() => copyToClipboard(selectedAsset.receiveAddress)}
                    className="mt-3 w-full py-2 bg-[#F0B90B]/10 rounded-lg text-[#F0B90B] text-xs font-semibold hover:bg-[#F0B90B]/20 transition-all flex items-center justify-center gap-2"
                  >
                    {copiedAddress ? <Check size={14} /> : <Copy size={14} />}
                    {copiedAddress ? "Copied!" : "Copy Address"}
                  </button>
                </div>

                <div className="mb-4 p-2.5 bg-[#2B3139]/50 rounded-xl">
                  <p className="text-[#F0B90B] text-[10px] font-semibold">Network: {selectedAsset.chain.toUpperCase()}</p>
                  <p className="text-[#A0A5AA] text-[10px] mt-1">⚠️ Only send {selectedAsset.symbol} to this address</p>
                  <p className="text-[#A0A5AA] text-[10px]">Minimum deposit: 0.001 {selectedAsset.symbol}</p>
                  <p className="text-[#A0A5AA] text-[10px] mt-1">⏱️ Estimated arrival: 5-10 minutes</p>
                </div>
              </div>
            )}

            <button
              onClick={transactionType === "send" ? executeTransaction : () => copyToClipboard(selectedAsset.receiveAddress)}
              className="w-full py-2.5 bg-[#F0B90B] rounded-xl text-[#0A0B0D] text-sm font-semibold mt-2 active:scale-95 transition-transform"
            >
              {transactionType === "send" ? "Send Now" : "Copy Address"}
            </button>
          </div>
        </div>
      )}

      <TransferModal />
      <AssetDetailModal />

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
        .animate-slide-down { animation: slide-down 0.3s ease-out; }
        .animate-slide-up { animation: slide-up 0.3s ease-out; }
        .animate-fade-in { animation: fade-in 0.3s ease-out; }
        .animate-spin { animation: spin 1s linear infinite; }
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
};

// Market Screen Component
const MarketScreen = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState("rank");
  const [sortOrder, setSortOrder] = useState("asc");
  const [selectedCoin, setSelectedCoin] = useState(null);
  const [showCoinModal, setShowCoinModal] = useState(false);

  const getFilteredCoins = () => {
    let filtered = MARKET_DATA.filter(
      (coin) =>
        coin.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        coin.symbol.toLowerCase().includes(searchTerm.toLowerCase())
    );

    filtered.sort((a, b) => {
      let aVal, bVal;
      switch (sortBy) {
        case "price":
          aVal = a.price;
          bVal = b.price;
          break;
        case "change":
          aVal = a.change;
          bVal = b.change;
          break;
        case "marketCap":
          aVal = parseFloat(a.marketCap);
          bVal = parseFloat(b.marketCap);
          break;
        case "volume":
          aVal = parseFloat(a.volume24h);
          bVal = parseFloat(b.volume24h);
          break;
        default:
          aVal = a.rank || 0;
          bVal = b.rank || 0;
      }
      return sortOrder === "asc" ? aVal - bVal : bVal - aVal;
    });

    return filtered;
  };

  const formatLargeNumber = (num) => {
    if (num >= 1000000000) return `$${(num / 1000000000).toFixed(2)}B`;
    if (num >= 1000000) return `$${(num / 1000000).toFixed(2)}M`;
    return `$${num.toFixed(2)}`;
  };

  const handleCoinClick = (coin) => {
    setSelectedCoin(coin);
    setShowCoinModal(true);
  };

  return (
    <div className="space-y-4 pb-24">
      {/* Header Banner */}
      <div className="bg-linear-to-r from-[#F0B90B]/10 via-[#F0B90B]/5 to-transparent rounded-xl p-3">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-[#F0B90B] text-xs font-semibold">Market Overview</p>
            <p className="text-white text-sm font-bold">Crypto Prices</p>
            <p className="text-[#A0A5AA] text-[10px] mt-0.5">
              Real-time cryptocurrency prices and market data
            </p>
          </div>
          <div className="text-right">
            <div className="flex items-center gap-1 text-[#0ECB81]">
              <Activity size={14} />
              <span className="text-[10px] font-semibold">Live Updates</span>
            </div>
          </div>
        </div>
      </div>

      {/* Search Bar */}
      <div className="relative">
        <Search
          size={16}
          className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[#A0A5AA]"
        />
        <input
          type="text"
          placeholder="Search coins..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full pl-10 pr-4 py-2.5 bg-[#1E2329] border border-[#2B3139] rounded-xl text-white text-sm placeholder-[#A0A5AA] focus:outline-none focus:border-[#F0B90B] transition-all"
        />
      </div>

      {/* Market Stats Summary */}
      <div className="grid grid-cols-3 gap-2">
        <div className="bg-[#1E2329] rounded-xl p-2 text-center">
          <p className="text-[#A0A5AA] text-[8px]">Total Market Cap</p>
          <p className="text-white text-xs font-bold">$2.45T</p>
          <p className="text-[#0ECB81] text-[8px]">+2.4%</p>
        </div>
        <div className="bg-[#1E2329] rounded-xl p-2 text-center">
          <p className="text-[#A0A5AA] text-[8px]">24h Volume</p>
          <p className="text-white text-xs font-bold">$68.5B</p>
          <p className="text-[#0ECB81] text-[8px]">+12.3%</p>
        </div>
        <div className="bg-[#1E2329] rounded-xl p-2 text-center">
          <p className="text-[#A0A5AA] text-[8px]">Active Coins</p>
          <p className="text-white text-xs font-bold">2,458</p>
          <p className="text-[#A0A5AA] text-[8px]">+12 new</p>
        </div>
      </div>

      {/* Sort Header */}
      <div className="flex justify-between items-center px-1">
        <span className="text-[#A0A5AA] text-[9px]">
          Found {getFilteredCoins().length} coins
        </span>
        <div className="flex gap-2">
          {[
            { key: "marketCap", label: "Market Cap" },
            { key: "price", label: "Price" },
            { key: "change", label: "24h %" },
            { key: "volume", label: "Volume" },
          ].map((sort) => (
            <button
              key={sort.key}
              onClick={() => {
                if (sortBy === sort.key) {
                  setSortOrder(sortOrder === "asc" ? "desc" : "asc");
                } else {
                  setSortBy(sort.key);
                  setSortOrder("desc");
                }
              }}
              className="text-[#A0A5AA] text-[9px] flex items-center gap-0.5 hover:text-white transition-colors"
            >
              {sort.label}
              {sortBy === sort.key && (
                <span>{sortOrder === "asc" ? "↑" : "↓"}</span>
              )}
            </button>
          ))}
        </div>
      </div>

      {/* Coins List */}
      <div className="space-y-2">
        {getFilteredCoins().map((coin, idx) => (
          <div
            key={coin.symbol}
            onClick={() => handleCoinClick(coin)}
            className="bg-[#1E2329] rounded-xl p-3 hover:bg-[#2B3139] transition-all duration-300 cursor-pointer border border-transparent hover:border-[#F0B90B]/30"
          >
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-3">
                <div
                  className="w-8 h-8 rounded-full flex items-center justify-center text-sm"
                  style={{
                    backgroundColor: `${coin.color}20`,
                    color: coin.color,
                  }}
                >
                  {coin.icon}
                </div>
                <div>
                  <p className="text-white font-semibold text-sm">{coin.name}</p>
                  <p className="text-[#A0A5AA] text-[9px]">{coin.symbol}/USD</p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-white font-bold text-sm">
                  ${coin.price.toLocaleString()}
                </p>
                <p
                  className={`text-[10px] font-semibold ${coin.positive ? "text-[#0ECB81]" : "text-[#F6465D]"}`}
                >
                  {coin.positive ? "+" : ""}{coin.change}%
                </p>
              </div>
            </div>

            <div className="flex justify-between items-center pt-2 border-t border-[#2B3139]">
              <div>
                <p className="text-[#A0A5AA] text-[8px]">Market Cap</p>
                <p className="text-white text-[10px] font-medium">{coin.marketCap}</p>
              </div>
              <div>
                <p className="text-[#A0A5AA] text-[8px]">24h Volume</p>
                <p className="text-white text-[10px] font-medium">{coin.volume24h}</p>
              </div>
              <div>
                <p className="text-[#A0A5AA] text-[8px]">24h Range</p>
                <p className="text-white text-[10px] font-medium">
                  {coin.low24h.toLocaleString()} - {coin.high24h.toLocaleString()}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Coin Detail Modal */}
      {showCoinModal && selectedCoin && (
        <div
          className="fixed inset-0 bg-black/80 z-200 flex items-end justify-center animate-fade-in"
          onClick={() => setShowCoinModal(false)}
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
                    backgroundColor: `${selectedCoin.color}20`,
                    color: selectedCoin.color,
                  }}
                >
                  {selectedCoin.icon}
                </div>
                <div>
                  <h3 className="text-white font-bold text-lg">
                    {selectedCoin.name}
                  </h3>
                  <p className="text-[#A0A5AA] text-xs">{selectedCoin.symbol}/USD</p>
                </div>
              </div>
              <button
                onClick={() => setShowCoinModal(false)}
                className="text-[#A0A5AA] text-xl"
              >
                ✕
              </button>
            </div>

            <div className="space-y-3">
              <div className="p-4 bg-[#2B3139] rounded-xl">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-[#A0A5AA] text-xs">Current Price</span>
                  <span className="text-white text-xl font-bold">
                    ${selectedCoin.price.toLocaleString()}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#A0A5AA] text-xs">24h Change</span>
                  <span
                    className={`text-xs font-semibold ${selectedCoin.positive ? "text-[#0ECB81]" : "text-[#F6465D]"}`}
                  >
                    {selectedCoin.positive ? "+" : ""}{selectedCoin.change}%
                  </span>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div className="p-3 bg-[#2B3139] rounded-xl">
                  <p className="text-[#A0A5AA] text-[9px]">24h High</p>
                  <p className="text-white text-sm font-semibold">
                    ${selectedCoin.high24h.toLocaleString()}
                  </p>
                </div>
                <div className="p-3 bg-[#2B3139] rounded-xl">
                  <p className="text-[#A0A5AA] text-[9px]">24h Low</p>
                  <p className="text-white text-sm font-semibold">
                    ${selectedCoin.low24h.toLocaleString()}
                  </p>
                </div>
                <div className="p-3 bg-[#2B3139] rounded-xl">
                  <p className="text-[#A0A5AA] text-[9px]">Market Cap</p>
                  <p className="text-white text-sm font-semibold">{selectedCoin.marketCap}</p>
                </div>
                <div className="p-3 bg-[#2B3139] rounded-xl">
                  <p className="text-[#A0A5AA] text-[9px]">24h Volume</p>
                  <p className="text-white text-sm font-semibold">{selectedCoin.volume24h}</p>
                </div>
              </div>

              <div className="flex gap-3 pt-2">
                <button className="flex-1 py-2.5 bg-[#F0B90B] rounded-xl text-[#0A0B0D] text-sm font-semibold">
                  Trade {selectedCoin.symbol}
                </button>
                <button className="flex-1 py-2.5 bg-[#2B3139] rounded-xl text-white text-sm font-semibold">
                  Add to Watchlist
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

// Exchange Screen Component - Professional Trading Terminal
const ExchangeScreen = () => {
  const [tradeType, setTradeType] = useState("spot");
  const [orderType, setOrderType] = useState("limit");
  const [side, setSide] = useState("buy");
  const [selectedPair, setSelectedPair] = useState("BTC/USDT");
  const [price, setPrice] = useState("");
  const [amount, setAmount] = useState("");
  const [total, setTotal] = useState("");
  const [leverage, setLeverage] = useState(1);
  const [activeBottomTab, setActiveBottomTab] = useState("orders");
  const [showTokenSelector, setShowTokenSelector] = useState(false);
  const [orderSubmitted, setOrderSubmitted] = useState(false);
  const [notification, setNotification] = useState(null);
  const [showChart, setShowChart] = useState(true);

  const tradingPairs = [
    {
      symbol: "BTC/USDT",
      name: "Bitcoin",
      price: 43521.2,
      change: 2.4,
      positive: true,
      volume: "24.5B",
      high: 44200,
      low: 42500,
      icon: "₿",
      color: "#F7931A",
    },
    {
      symbol: "ETH/USDT",
      name: "Ethereum",
      price: 2345.67,
      change: 1.8,
      positive: true,
      volume: "12.3B",
      high: 2380,
      low: 2300,
      icon: "Ξ",
      color: "#627EEA",
    },
    {
      symbol: "BNB/USDT",
      name: "BNB",
      price: 315.42,
      change: 0.5,
      positive: true,
      volume: "1.2B",
      high: 318.5,
      low: 312,
      icon: "B",
      color: "#F3BA2F",
    },
    {
      symbol: "SOL/USDT",
      name: "Solana",
      price: 98.45,
      change: 5.2,
      positive: true,
      volume: "3.1B",
      high: 100.5,
      low: 95.2,
      icon: "◎",
      color: "#00FFA3",
    },
    {
      symbol: "XRP/USDT",
      name: "Ripple",
      price: 0.52,
      change: -1.2,
      positive: false,
      volume: "890M",
      high: 0.53,
      low: 0.51,
      icon: "X",
      color: "#23292F",
    },
  ];

  const orderBook = {
    asks: [
      [43522.0, 1.5, 98.2],
      [43523.5, 2.1, 96.7],
      [43525.0, 3.4, 94.6],
      [43527.0, 1.9, 91.2],
      [43530.0, 2.8, 89.3],
    ],
    bids: [
      [43520.5, 2.3, 100.0],
      [43519.8, 1.8, 98.5],
      [43518.2, 3.1, 96.7],
      [43517.5, 2.5, 93.6],
      [43516.0, 4.2, 91.1],
    ],
  };

  const openOrders = [
    {
      id: 1,
      pair: "BTC/USDT",
      side: "buy",
      price: 43200,
      amount: 0.05,
      filled: 0.02,
      total: 2160,
      time: "12:30",
      status: "open",
      type: "limit",
    },
  ];

  const openPositions = [
    {
      id: 1,
      pair: "BTC/USDT",
      side: "long",
      entryPrice: 43200,
      markPrice: 43521,
      amount: 0.1,
      value: 4320,
      pnl: 32.1,
      pnlPercent: 0.74,
      liquidation: 41500,
      leverage: 10,
    },
  ];

  const tradeHistory = [
    {
      id: 1,
      pair: "BTC/USDT",
      side: "buy",
      price: 43100,
      amount: 0.1,
      total: 4310,
      time: "11:25:30",
      fee: 4.31,
      type: "limit",
    },
    {
      id: 2,
      pair: "ETH/USDT",
      side: "sell",
      price: 2350,
      amount: 0.8,
      total: 1880,
      time: "10:15:22",
      fee: 1.88,
      type: "market",
    },
  ];

  const currentPair = tradingPairs.find((p) => p.symbol === selectedPair);
  const userBalance = 0.42;

  const calculateTotal = () => {
    if (price && amount) {
      const totalValue = parseFloat(price) * parseFloat(amount);
      setTotal(totalValue.toFixed(2));
    } else {
      setTotal("");
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
    setAmount(((maxAmount * percent) / 100).toFixed(4));
    setTimeout(calculateTotal, 10);
  };

  const handleSetPriceFromOrderBook = (priceValue) => {
    setPrice(priceValue.toString());
    setTimeout(calculateTotal, 10);
  };

  const handleSubmitOrder = () => {
    if (!amount || parseFloat(amount) === 0) {
      showNotification("Please enter an amount", "error");
      return;
    }

    if (orderType === "limit" && (!price || parseFloat(price) === 0)) {
      showNotification("Please enter a price", "error");
      return;
    }

    setOrderSubmitted(true);
    showNotification(
      `${side.toUpperCase()} order submitted successfully!`,
      "success",
    );

    setTimeout(() => {
      setAmount("");
      setPrice("");
      setTotal("");
      setOrderSubmitted(false);
    }, 2000);
  };

  const showNotification = (message, type) => {
    setNotification({ message, type });
    setTimeout(() => setNotification(null), 3000);
  };

  const quickAmounts = [25, 50, 75, 100];

  return (
    <div className="min-h-screen bg-[#0A0B0D] pb-20">
      {notification && (
        <div
          className={`fixed top-20 left-4 right-4 z-50 p-3 rounded-xl animate-slide-down ${
            notification.type === "success" ? "bg-[#0ECB81]" : "bg-[#F6465D]"
          }`}
        >
          <p className="text-white text-xs font-medium text-center">
            {notification.message}
          </p>
        </div>
      )}

      {showTokenSelector && (
        <div
          className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4"
          onClick={() => setShowTokenSelector(false)}
        >
          <div
            className="bg-[#1E2329] rounded-xl w-full max-w-md max-h-[80vh] overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex justify-between items-center p-4 border-b border-[#2B3139]">
              <h3 className="text-white font-semibold text-sm">Select Token</h3>
              <button
                onClick={() => setShowTokenSelector(false)}
                className="text-[#A0A5AA]"
              >
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
                    <div
                      className="w-8 h-8 rounded-full flex items-center justify-center text-sm"
                      style={{
                        backgroundColor: `${pair.color}20`,
                        color: pair.color,
                      }}
                    >
                      {pair.icon}
                    </div>
                    <div className="text-left">
                      <p className="text-white font-medium text-sm">
                        {pair.symbol}
                      </p>
                      <p className="text-[#A0A5AA] text-[10px]">{pair.name}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-white text-xs">
                      ${pair.price.toLocaleString()}
                    </p>
                    <p
                      className={`text-[10px] ${pair.positive ? "text-[#0ECB81]" : "text-[#F6465D]"}`}
                    >
                      {pair.positive ? "+" : ""}
                      {pair.change}%
                    </p>
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      <div className="max-w-7xl mx-auto px-4 py-3">
        {/* Top Bar */}
        <div className="bg-[#1E2329] rounded-xl p-3 mb-3">
          <div className="flex flex-wrap justify-between items-center gap-3">
            <button
              onClick={() => setShowTokenSelector(true)}
              className="flex items-center gap-2 px-3 py-1.5 bg-[#2B3139] rounded-lg hover:bg-[#363D45] transition-all"
            >
              <div
                className="w-6 h-6 rounded-full flex items-center justify-center text-sm"
                style={{
                  backgroundColor: `${currentPair?.color}20`,
                  color: currentPair?.color,
                }}
              >
                {currentPair?.icon}
              </div>
              <div className="text-left">
                <p className="text-white font-medium text-xs">{selectedPair}</p>
                <p className="text-[#A0A5AA] text-[9px]">{currentPair?.name}</p>
              </div>
              <ChevronDown size={12} className="text-[#A0A5AA]" />
            </button>

            <div className="flex flex-wrap gap-3">
              <div>
                <p className="text-[#A0A5AA] text-[9px]">Price</p>
                <p className="text-white font-semibold text-sm">
                  ${currentPair?.price.toLocaleString()}
                </p>
              </div>
              <div>
                <p className="text-[#A0A5AA] text-[9px]">24h Change</p>
                <p
                  className={`font-semibold text-xs ${currentPair?.positive ? "text-[#0ECB81]" : "text-[#F6465D]"}`}
                >
                  {currentPair?.positive ? "+" : ""}
                  {currentPair?.change}%
                </p>
              </div>
              <div>
                <p className="text-[#A0A5AA] text-[9px]">24h High/Low</p>
                <p className="text-white text-[10px]">
                  {currentPair?.high.toLocaleString()} /{" "}
                  {currentPair?.low.toLocaleString()}
                </p>
              </div>
              <div>
                <p className="text-[#A0A5AA] text-[9px]">24h Volume</p>
                <p className="text-white text-[10px]">{currentPair?.volume}</p>
              </div>
            </div>

            <div className="flex gap-1 bg-[#2B3139] rounded-lg p-0.5">
              <button
                onClick={() => setTradeType("spot")}
                className={`px-3 py-1 rounded-lg text-xs font-semibold transition-all ${
                  tradeType === "spot"
                    ? "bg-[#F0B90B] text-[#0A0B0D]"
                    : "text-[#A0A5AA]"
                }`}
              >
                Spot
              </button>
              <button
                onClick={() => setTradeType("futures")}
                className={`px-3 py-1 rounded-lg text-xs font-semibold transition-all ${
                  tradeType === "futures"
                    ? "bg-[#F0B90B] text-[#0A0B0D]"
                    : "text-[#A0A5AA]"
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
                {["1m", "5m", "15m", "1h", "4h", "1d"].map((tf) => (
                  <button
                    key={tf}
                    className="px-1.5 py-0.5 text-[#A0A5AA] text-[9px] hover:text-white transition-colors"
                  >
                    {tf}
                  </button>
                ))}
                <button
                  onClick={() => setShowChart(false)}
                  className="ml-2 text-[#A0A5AA] text-[9px]"
                >
                  ✕
                </button>
              </div>
            </div>
            <div className="h-48 bg-[#0A0B0D] rounded-lg flex items-center justify-center">
              <div className="text-center">
                <LineChart
                  size={32}
                  className="text-[#F0B90B] mx-auto mb-1 opacity-50"
                />
                <p className="text-[#A0A5AA] text-[10px]">
                  Advanced Trading Chart
                </p>
                <p className="text-[#A0A5AA] text-[9px]">
                  {selectedPair} - Real-time candlestick chart
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Two Column Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-3 mb-3">
          <div className="bg-[#1E2329] rounded-xl p-3">
            <div className="flex gap-1 mb-3 bg-[#2B3139] rounded-lg p-0.5">
              {["limit", "market"].map((type) => (
                <button
                  key={type}
                  onClick={() => setOrderType(type)}
                  className={`flex-1 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                    orderType === type
                      ? "bg-[#F0B90B] text-[#0A0B0D]"
                      : "text-[#A0A5AA]"
                  }`}
                >
                  {type.toUpperCase()}
                </button>
              ))}
            </div>

            {tradeType === "futures" && (
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
                    <p className="text-[#F0B90B] font-semibold text-xs">
                      {leverage}x
                    </p>
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
                  style={{ accentColor: "#F0B90B" }}
                />
                <div className="flex justify-between mt-1">
                  {[1, 5, 10, 20, 50].map((lev) => (
                    <button
                      key={lev}
                      onClick={() => setLeverage(lev)}
                      className={`text-[9px] px-1.5 py-0.5 rounded ${leverage === lev ? "bg-[#F0B90B] text-[#0A0B0D]" : "text-[#A0A5AA]"}`}
                    >
                      {lev}x
                    </button>
                  ))}
                </div>
              </div>
            )}

            <div className="flex gap-2 mb-3">
              <button
                onClick={() => setSide("buy")}
                className={`flex-1 py-2 rounded-lg font-semibold text-xs transition-all ${
                  side === "buy"
                    ? "bg-[#0ECB81] text-white"
                    : "bg-[#2B3139] text-[#A0A5AA]"
                }`}
              >
                BUY
              </button>
              <button
                onClick={() => setSide("sell")}
                className={`flex-1 py-2 rounded-lg font-semibold text-xs transition-all ${
                  side === "sell"
                    ? "bg-[#F6465D] text-white"
                    : "bg-[#2B3139] text-[#A0A5AA]"
                }`}
              >
                SELL
              </button>
            </div>

            {orderType === "limit" && (
              <div className="mb-3">
                <div className="flex justify-between mb-1">
                  <label className="text-[#A0A5AA] text-[10px]">
                    Price (USDT)
                  </label>
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

            <div className="mb-3">
              <div className="flex justify-between mb-1">
                <label className="text-[#A0A5AA] text-[10px]">
                  Amount ({selectedPair.split("/")[0]})
                </label>
                <span className="text-[#A0A5AA] text-[9px]">
                  Balance: {userBalance}
                </span>
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

            <div className="mb-3 p-2 bg-[#0A0B0D] rounded-lg">
              <div className="flex justify-between">
                <span className="text-[#A0A5AA] text-[10px]">Total</span>
                <span className="text-white font-semibold text-xs">
                  {total ? `${parseFloat(total).toFixed(2)}` : "0.00"} USDT
                </span>
              </div>
            </div>

            <button
              onClick={handleSubmitOrder}
              disabled={orderSubmitted}
              className={`w-full py-2 rounded-lg font-semibold text-xs transition-all transform active:scale-95 ${
                side === "buy"
                  ? "bg-linear-to-r from-[#0ECB81] to-[#0ECB81]/80 text-white"
                  : "bg-linear-to-r from-[#F6465D] to-[#F6465D]/80 text-white"
              } ${orderSubmitted ? "opacity-50 cursor-not-allowed" : ""}`}
            >
              {orderSubmitted
                ? "Order Submitted ✓"
                : side === "buy"
                  ? `BUY ${selectedPair.split("/")[0]}`
                  : `SELL ${selectedPair.split("/")[0]}`}
            </button>
          </div>

          <div className="bg-[#1E2329] rounded-xl p-3">
            <h3 className="text-white font-semibold text-xs mb-2">
              Order Book
            </h3>

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
                    <span className="text-[#F6465D] font-mono text-[11px]">
                      {ask[0].toFixed(2)}
                    </span>
                    <span className="text-white text-center text-[11px]">
                      {ask[1].toFixed(2)}
                    </span>
                    <span className="text-[#A0A5AA] text-right text-[11px]">
                      {ask[2].toFixed(1)}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            <div className="py-1.5 my-1.5 text-center border-y border-[#2B3139]">
              <p className="text-white font-bold text-sm">
                ${currentPair?.price.toLocaleString()}
              </p>
              <p
                className={`text-[10px] ${currentPair?.positive ? "text-[#0ECB81]" : "text-[#F6465D]"}`}
              >
                {currentPair?.positive ? "▲" : "▼"}{" "}
                {Math.abs(currentPair?.change)}%
              </p>
            </div>

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
                    <span className="text-[#0ECB81] font-mono text-[11px]">
                      {bid[0].toFixed(2)}
                    </span>
                    <span className="text-white text-center text-[11px]">
                      {bid[1].toFixed(2)}
                    </span>
                    <span className="text-[#A0A5AA] text-right text-[11px]">
                      {bid[2].toFixed(1)}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="bg-[#1E2329] rounded-xl overflow-hidden mb-20">
          <div className="flex border-b border-[#2B3139]">
            {[
              {
                id: "orders",
                label: "Open Orders",
                icon: ClipboardList,
                count: openOrders.length,
              },
              {
                id: "positions",
                label: "Positions",
                icon: BookOpen,
                count: openPositions.length,
              },
              {
                id: "history",
                label: "Trade History",
                icon: History,
                count: tradeHistory.length,
              },
            ].map((tab) => {
              const Icon = tab.icon;
              const isActive = activeBottomTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveBottomTab(tab.id)}
                  className={`flex-1 flex items-center justify-center gap-1.5 py-2 text-xs font-semibold transition-all ${
                    isActive
                      ? "text-[#F0B90B] border-b-2 border-[#F0B90B]"
                      : "text-[#A0A5AA] hover:text-white"
                  }`}
                >
                  <Icon size={12} />
                  {tab.label}
                  {tab.count > 0 && (
                    <span
                      className={`px-1 py-0.5 rounded-full text-[9px] ${isActive ? "bg-[#F0B90B]/20" : "bg-[#2B3139]"}`}
                    >
                      {tab.count}
                    </span>
                  )}
                </button>
              );
            })}
          </div>

          <div className="p-2 max-h-64 overflow-y-auto">
            {activeBottomTab === "orders" &&
              (openOrders.length > 0 ? (
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
                    <div
                      key={order.id}
                      className="grid grid-cols-6 gap-1 text-[10px] py-1 hover:bg-[#2B3139] rounded transition-all"
                    >
                      <span className="text-white">{order.pair}</span>
                      <span
                        className={
                          order.side === "buy"
                            ? "text-[#0ECB81]"
                            : "text-[#F6465D]"
                        }
                      >
                        {order.side.toUpperCase()}
                      </span>
                      <span className="text-white">${order.price}</span>
                      <span className="text-white">{order.amount}</span>
                      <span className="text-[#A0A5AA]">
                        {order.filled}/{order.amount}
                      </span>
                      <button className="text-[#F6465D] text-[9px] hover:opacity-80">
                        Cancel
                      </button>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-6">
                  <p className="text-[#A0A5AA] text-xs">No open orders</p>
                </div>
              ))}

            {activeBottomTab === "positions" &&
              (openPositions.length > 0 ? (
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
                    <div
                      key={position.id}
                      className="grid grid-cols-6 gap-1 text-[10px] py-1 hover:bg-[#2B3139] rounded transition-all"
                    >
                      <span className="text-white">{position.pair}</span>
                      <span
                        className={
                          position.side === "long"
                            ? "text-[#0ECB81]"
                            : "text-[#F6465D]"
                        }
                      >
                        {position.side.toUpperCase()}
                      </span>
                      <div>
                        <span className="text-white">
                          {position.entryPrice}
                        </span>
                        <span className="text-[#A0A5AA] text-[9px]">
                          {" "}
                          / {position.markPrice}
                        </span>
                      </div>
                      <div>
                        <span className="text-white">{position.amount}</span>
                        <span className="text-[#A0A5AA] text-[9px]">
                          {" "}
                          / ${position.value}
                        </span>
                      </div>
                      <div>
                        <span
                          className={`${position.pnl > 0 ? "text-[#0ECB81]" : "text-[#F6465D]"}`}
                        >
                          ${position.pnl}
                        </span>
                        <span
                          className={`text-[9px] ${position.pnl > 0 ? "text-[#0ECB81]" : "text-[#F6465D]"} ml-0.5`}
                        >
                          ({position.pnlPercent}%)
                        </span>
                      </div>
                      <button className="text-[#F0B90B] text-[9px] hover:opacity-80">
                        Close
                      </button>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-6">
                  <p className="text-[#A0A5AA] text-xs">No open positions</p>
                </div>
              ))}

            {activeBottomTab === "history" &&
              (tradeHistory.length > 0 ? (
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
                    <div
                      key={trade.id}
                      className="grid grid-cols-6 gap-1 text-[10px] py-1 hover:bg-[#2B3139] rounded transition-all"
                    >
                      <span className="text-white">{trade.pair}</span>
                      <span
                        className={
                          trade.side === "buy"
                            ? "text-[#0ECB81]"
                            : "text-[#F6465D]"
                        }
                      >
                        {trade.side.toUpperCase()}
                      </span>
                      <span className="text-white">${trade.price}</span>
                      <span className="text-white">{trade.amount}</span>
                      <span className="text-white">${trade.total}</span>
                      <span className="text-[#A0A5AA] text-[9px]">
                        {trade.time}
                      </span>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-6">
                  <p className="text-[#A0A5AA] text-xs">No trade history</p>
                </div>
              ))}
          </div>
        </div>
      </div>
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
  ];

  const currencies = ["USDT", "BTC", "ETH", "BNB", "SOL", "XRP"];
  const fiats = ["USD", "EUR", "GBP", "CAD", "AUD", "JPY", "CNY"];
  const paymentMethods = [
    "all",
    "Bank Transfer",
    "Cash App",
    "PayPal",
    "USDT",
    "Revolut",
    "Wise",
  ];

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
        (selectedPaymentMethod === "all" ||
          offer.payment === selectedPaymentMethod) &&
        (searchTerm === "" ||
          offer.user.toLowerCase().includes(searchTerm.toLowerCase())),
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
        "error",
      );
      return;
    }

    showNotificationMessage(
      `Order placed! Please send ${amount} ${selectedOffer.currency} to complete the trade.`,
      "success",
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
    const offers = P2P_OFFERS.filter(
      (o) => o.type === activeTab && o.currency === selectedCurrency,
    );
    if (offers.length === 0) return null;
    return activeTab === "buy"
      ? Math.min(...offers.map((o) => o.price))
      : Math.max(...offers.map((o) => o.price));
  };

  const bestPrice = getBestPrice();

  return (
    <div className="space-y-3 pb-24">
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
          <p className="text-white text-xs font-medium text-center">
            {notificationMessage}
          </p>
        </div>
      )}

      <div className="bg-linear-to-r from-[#F0B90B]/10 via-[#F0B90B]/5 to-transparent rounded-xl p-3">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-[#F0B90B] text-xs font-semibold">P2P Trading</p>
            <p className="text-white text-sm font-bold">
              0% Fee • Escrow Protected
            </p>
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

      <div className="space-y-2">
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

        {bestPrice && (
          <div className="bg-[#1E2329] rounded-lg p-2">
            <div className="flex justify-between items-center">
              <span className="text-[#A0A5AA] text-[9px]">
                Best {activeTab === "buy" ? "buy" : "sell"} price for{" "}
                {selectedCurrency}
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

        <div className="flex gap-2">
          <div className="relative flex-1">
            <Search
              size={12}
              className="absolute left-2.5 top-1/2 transform -translate-y-1/2 text-[#A0A5AA]"
            />
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

        {showPaymentFilter && (
          <div className="bg-[#1E2329] rounded-lg p-2 absolute right-4 left-4 mt-1 z-10 shadow-xl">
            <p className="text-white text-[11px] font-semibold mb-1.5">
              Payment Method
            </p>
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

      <div className="flex justify-between items-center px-1">
        <span className="text-[#A0A5AA] text-[9px]">
          Found {getFilteredOffers().length} offers
        </span>
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
              {sortBy === sort.key && (
                <span>{sortOrder === "asc" ? "↑" : "↓"}</span>
              )}
            </button>
          ))}
        </div>
      </div>

      <div className="space-y-2">
        {getFilteredOffers().map((offer) => (
          <div
            key={offer.id}
            className="bg-[#1E2329] rounded-lg p-3 hover:border-[#F0B90B]/30 transition-all duration-300 border border-transparent"
          >
            <div className="flex justify-between items-start mb-2">
              <div className="flex items-center gap-2">
                <div className="w-7 h-7 rounded-full bg-[#2B3139] flex items-center justify-center text-sm">
                  {offer.userAvatar}
                </div>
                <div>
                  <div className="flex items-center gap-1.5">
                    <p className="text-white font-semibold text-[11px]">
                      {offer.user}
                    </p>
                    {offer.merchant && (
                      <span className="px-1 py-0.5 bg-[#F0B90B]/20 rounded text-[8px] text-[#F0B90B] font-semibold">
                        Merchant
                      </span>
                    )}
                    {offer.verified && (
                      <Shield size={9} className="text-[#0ECB81]" />
                    )}
                  </div>
                  <div className="flex items-center gap-2 mt-0.5">
                    <p className="text-[#A0A5AA] text-[9px]">
                      {formatNumber(offer.completed)}+ trades
                    </p>
                    <p className="text-[#0ECB81] text-[9px]">
                      ★ {offer.completionRate}%
                    </p>
                    <p className="text-[#A0A5AA] text-[9px]">
                      ⏱️ {offer.responseTime}
                    </p>
                  </div>
                </div>
              </div>
              <div className="text-right">
                <p className="text-[#0ECB81] text-[9px] font-semibold">
                  {activeTab === "buy" ? "Selling" : "Buying"}
                </p>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-2 mb-2">
              <div>
                <p className="text-[#A0A5AA] text-[8px]">Price</p>
                <p className="text-white font-bold text-sm">
                  ${offer.price.toLocaleString()}
                </p>
                <p className="text-[#A0A5AA] text-[8px]">
                  ≈ {offer.price} {selectedFiat}
                </p>
              </div>
              <div>
                <p className="text-[#A0A5AA] text-[8px]">Limit</p>
                <p className="text-white font-semibold text-[10px]">
                  {offer.limitMin} - {offer.limitMax} {offer.currency}
                </p>
                <p className="text-[#A0A5AA] text-[8px]">
                  ≈ ${(offer.limitMin * offer.price).toFixed(0)} - $
                  {(offer.limitMax * offer.price).toFixed(0)}
                </p>
              </div>
              <div>
                <p className="text-[#A0A5AA] text-[8px]">Payment</p>
                <div className="flex items-center gap-1">
                  <p className="text-white font-semibold text-[10px]">
                    {offer.payment}
                  </p>
                  <div className="w-1.5 h-1.5 bg-[#0ECB81] rounded-full"></div>
                </div>
                <p className="text-[#A0A5AA] text-[8px]">Auto-release</p>
              </div>
            </div>

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
              <button
                onClick={() => setShowOrderModal(false)}
                className="text-[#A0A5AA]"
              >
                <X size={16} />
              </button>
            </div>

            <div className="flex items-center gap-2 mb-3 p-2 bg-[#2B3139] rounded-lg">
              <div className="w-8 h-8 rounded-full bg-[#1E2329] flex items-center justify-center text-sm">
                {selectedOffer.userAvatar}
              </div>
              <div>
                <p className="text-white font-semibold text-[11px]">
                  {selectedOffer.user}
                </p>
                <p className="text-[#A0A5AA] text-[9px]">
                  {formatNumber(selectedOffer.completed)}+ trades •{" "}
                  {selectedOffer.completionRate}% completion
                </p>
              </div>
            </div>

            <div className="space-y-2 mb-3">
              <div className="flex justify-between text-[11px]">
                <span className="text-[#A0A5AA]">Price</span>
                <span className="text-white font-semibold">
                  {selectedOffer.price} {selectedFiat} per{" "}
                  {selectedOffer.currency}
                </span>
              </div>
              <div className="flex justify-between text-[11px]">
                <span className="text-[#A0A5AA]">Limit</span>
                <span className="text-white">
                  {selectedOffer.limitMin} - {selectedOffer.limitMax}{" "}
                  {selectedOffer.currency}
                </span>
              </div>
              <div className="flex justify-between text-[11px]">
                <span className="text-[#A0A5AA]">Payment Method</span>
                <span className="text-white">{selectedOffer.payment}</span>
              </div>
            </div>

            <div className="mb-3">
              <p className="text-[#A0A5AA] text-[11px] mb-1">
                Amount ({selectedOffer.currency})
              </p>
              <input
                type="number"
                value={orderAmount}
                onChange={(e) => setOrderAmount(e.target.value)}
                placeholder={`Min ${selectedOffer.limitMin} - Max ${selectedOffer.limitMax}`}
                className="w-full p-2 bg-[#2B3139] rounded-lg text-white text-[11px] placeholder-[#A0A5AA] focus:outline-none border border-transparent focus:border-[#F0B90B]"
              />
              {orderAmount && (
                <p className="text-[#A0A5AA] text-[9px] mt-1">
                  Total: $
                  {(parseFloat(orderAmount) * selectedOffer.price).toFixed(2)}{" "}
                  {selectedFiat}
                </p>
              )}
            </div>

            <div className="mb-3">
              <p className="text-[#A0A5AA] text-[11px] mb-1">
                Message (Optional)
              </p>
              <textarea
                value={orderMessage}
                onChange={(e) => setOrderMessage(e.target.value)}
                placeholder="Add any notes for the trader..."
                rows={2}
                className="w-full p-2 bg-[#2B3139] rounded-lg text-white text-[11px] placeholder-[#A0A5AA] focus:outline-none border border-transparent focus:border-[#F0B90B] resize-none"
              />
            </div>

            <div className="mb-3 p-2 bg-[#2B3139]/50 rounded-lg">
              <p className="text-[#F0B90B] text-[9px] font-semibold mb-0.5">
                Trade Terms
              </p>
              <p className="text-[#A0A5AA] text-[9px]">{selectedOffer.terms}</p>
              <div className="flex items-center gap-1.5 mt-1.5">
                <Shield size={10} className="text-[#0ECB81]" />
                <p className="text-[#A0A5AA] text-[8px]">
                  Escrow protected. Funds are held securely.
                </p>
              </div>
            </div>

            <button
              onClick={executeOrder}
              className="w-full py-2 bg-[#F0B90B] rounded-lg text-[#0A0B0D] text-[11px] font-semibold active:scale-95 transition-transform"
            >
              Confirm {activeTab === "buy" ? "Purchase" : "Sale"}
            </button>
          </div>
        </div>
      )}

      <div className="bg-linear-to-r from-[#F0B90B]/10 via-transparent to-[#F0B90B]/5 rounded-lg p-3">
        <div className="flex items-start gap-2">
          <Shield size={14} className="text-[#0ECB81] shrink-0 mt-0.5" />
          <div>
            <p className="text-[#F0B90B] text-[11px] font-semibold">
              Trade with confidence
            </p>
            <p className="text-[#A0A5AA] text-[9px] mt-0.5">
              All trades are protected by escrow. Your funds are safe until both
              parties confirm.
            </p>
            <div className="flex gap-2 mt-1.5">
              <span className="text-[#0ECB81] text-[8px]">✓ 100% secure</span>
              <span className="text-[#0ECB81] text-[8px]">✓ 24/7 support</span>
              <span className="text-[#0ECB81] text-[8px]">
                ✓ Fast dispute resolution
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const GiftCardScreen = () => {
  const [searchTerm, setSearchTerm] = useState("");

  return (
    <div className="space-y-4 pb-24">
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

// Bottom Navigation Component
const BottomNav = ({ activeTab, setActiveTab }) => {
  const navItems = [
    { id: "home", label: "Home", icon: Home },
    { id: "market", label: "Market", icon: BarChart3 },
    { id: "exchange", label: "Trade", icon: TrendingUp },
    { id: "p2p", label: "P2P", icon: Users },
    { id: "giftcard", label: "Gift Card", icon: Gift },
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
const Header = ({ user, onLogout }) => {
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const profileRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (profileRef.current && !profileRef.current.contains(event.target)) {
        setIsProfileOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="flex justify-between items-center mb-6">
      <div>
        <p className="text-[#A0A5AA] text-xs">Welcome back,</p>
        <h1 className="text-white text-xl font-bold">
          {user?.username || "John Doe"}
        </h1>
      </div>
      <div className="flex gap-2">
        <button className="p-2 bg-[#1E2329] rounded-xl relative hover:bg-[#2A3036] transition-all duration-200">
          <Bell size={18} className="text-[#F0B90B]" />
          <div className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></div>
        </button>

        <div className="relative" ref={profileRef}>
          <button
            onClick={() => setIsProfileOpen(!isProfileOpen)}
            className="p-2 bg-[#1E2329] rounded-xl hover:bg-[#2A3036] transition-all duration-200 group"
          >
            <User
              size={18}
              className="text-[#A0A5AA] group-hover:text-[#F0B90B] transition-colors duration-200"
            />
          </button>

          {isProfileOpen && (
            <div className="absolute right-0 mt-2 w-64 bg-[#1E2329] rounded-xl shadow-2xl border border-[#2A3036] overflow-hidden z-50 animate-slideDown">
              <div className="p-4 border-b border-[#2A3036]">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-linear-to-br from-[#F0B90B] to-[#D4940A] rounded-full flex items-center justify-center">
                    <span className="text-[#0A0B0D] font-bold text-lg">
                      {user?.name?.charAt(0) || "J"}
                    </span>
                  </div>
                  <div>
                    <p className="text-white font-semibold text-sm">
                      {user?.username || "John Doe"}
                    </p>
                    <p className="text-[#A0A5AA] text-xs">
                      {user?.email || "john@example.com"}
                    </p>
                  </div>
                </div>
              </div>

              <div className="p-4 border-b border-[#2A3036] bg-[#1A1E23]">
                <p className="text-[#A0A5AA] text-xs uppercase tracking-wider mb-1">
                  User ID
                </p>
                <div className="flex items-center justify-between gap-2">
                  <code className="text-[#F0B90B] text-sm font-mono bg-[#0A0B0D] px-2 py-1 rounded flex-1">
                    {user?.user_uid || "1000000001"}
                  </code>
                  <button
                    onClick={() => {
                      navigator.clipboard.writeText(user?.uid || "1000000001");
                    }}
                    className="text-[#A0A5AA] hover:text-[#F0B90B] transition-colors"
                    title="Copy UID"
                  >
                    <Copy size={14} />
                  </button>
                </div>
              </div>

              <button
                onClick={() => {
                  setIsProfileOpen(false);
                  onLogout?.();
                }}
                className="w-full p-3 text-left text-red-400 hover:bg-red-500/10 transition-all duration-200 flex items-center gap-2 group"
              >
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path>
                  <polyline points="16 17 21 12 16 7"></polyline>
                  <line x1="21" y1="12" x2="9" y2="12"></line>
                </svg>
                <span className="text-sm font-medium group-hover:text-red-400">
                  Logout
                </span>
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

// ============================================================
// MAIN APP COMPONENT
// ============================================================

const UI = () => {
  const [activeTab, setActiveTab] = useState("home");
  const { user, account, wallet, loading, logout } = useMe();

  if (loading) return <LoadingSpinner />;

  const handleLogout = async () => {
    await logout?.();
  };

  const renderScreen = () => {
    switch (activeTab) {
      case "home":
        return <HomeScreen />;
      case "market":
        return <MarketScreen />;
      case "exchange":
        return <ExchangeScreen />;
      case "p2p":
        return <P2PScreen />;
      case "giftcard":
        return <GiftCardScreen />;
      default:
        return <HomeScreen />;
    }
  };

  return (
    <div className="min-h-screen bg-[#0A0B0D]">
      <div className="px-4 pt-6 pb-4">
        <Header user={user} onLogout={handleLogout} />
        {renderScreen()}
      </div>

      <BottomNav activeTab={activeTab} setActiveTab={setActiveTab} />
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

export default UI;