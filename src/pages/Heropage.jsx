import React, {
  useState,
  useEffect,
} from "react";
import {
  ArrowRight,
  Shield,
  Gift,
  TrendingUp,
  Menu,
  X,
  ChevronRight,
  Search,
  BarChart3,
  Award,
  Globe,
  Star,
  Zap,
} from "lucide-react";
import { Link } from "react-router-dom";

// ============================================================
// CONSTANTS & DATA
// ============================================================

const CRYPTO_DATA = [
  {
    coin: "Bitcoin",
    symbol: "BTC",
    price: "43,521.20",
    change: "+2.4%",
    positive: true,
    volume: "$24.5B",
    color: "#F7931A",
  },
  {
    coin: "Ethereum",
    symbol: "ETH",
    price: "2,345.67",
    change: "+1.8%",
    positive: true,
    volume: "$12.3B",
    color: "#627EEA",
  },
  {
    coin: "BNB",
    symbol: "BNB",
    price: "315.42",
    change: "+0.5%",
    positive: true,
    volume: "$1.2B",
    color: "#F3BA2F",
  },
  {
    coin: "Solana",
    symbol: "SOL",
    price: "98.45",
    change: "+5.2%",
    positive: true,
    volume: "$3.1B",
    color: "#00FFA3",
  },
];

const TOP_GAINERS = [
  {
    coin: "Celestia",
    symbol: "TIA",
    price: "$18.42",
    change: "+42.5%",
    positive: true,
  },
  {
    coin: "Injective",
    symbol: "INJ",
    price: "$38.75",
    change: "+28.3%",
    positive: true,
  },
  {
    coin: "Sei",
    symbol: "SEI",
    price: "$0.85",
    change: "+15.7%",
    positive: true,
  },
];

const GIFT_CARDS_DATA = [
  {
    id: "amazon",
    name: "Amazon",
    discount: "5%",
    minAmount: 25,
    maxAmount: 500,
    instantDelivery: true,
    popular: true,
  },
  {
    id: "google",
    name: "Google Play",
    discount: "3%",
    minAmount: 10,
    maxAmount: 500,
    instantDelivery: true,
    popular: true,
  },
  {
    id: "steam",
    name: "Steam",
    discount: "8%",
    minAmount: 20,
    maxAmount: 500,
    instantDelivery: true,
    popular: false,
  },
  {
    id: "apple",
    name: "Apple",
    discount: "4%",
    minAmount: 25,
    maxAmount: 500,
    instantDelivery: false,
    popular: true,
  },
];

// ============================================================
// CUSTOM HOOKS
// ============================================================

const useScrollAnimation = () => {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);
  return scrolled;
};

const useMousePosition = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  useEffect(() => {
    const updateMousePosition = (ev) => {
      setMousePosition({ x: ev.clientX, y: ev.clientY });
    };
    window.addEventListener("mousemove", updateMousePosition);
    return () => window.removeEventListener("mousemove", updateMousePosition);
  }, []);
  return mousePosition;
};

const useResponsive = () => {
  const [isMobile, setIsMobile] = useState(false);
  const [isTablet, setIsTablet] = useState(false);
  const [isDesktop, setIsDesktop] = useState(false);

  useEffect(() => {
    const checkScreenSize = () => {
      const width = window.innerWidth;
      setIsMobile(width < 768);
      setIsTablet(width >= 768 && width < 1024);
      setIsDesktop(width >= 1024);
    };
    checkScreenSize();
    window.addEventListener("resize", checkScreenSize);
    return () => window.removeEventListener("resize", checkScreenSize);
  }, []);

  return { isMobile, isTablet, isDesktop };
};

// ============================================================
// COMPONENTS
// ============================================================

const AnimatedGradient = () => {
  const mousePosition = useMousePosition();
  const { isMobile } = useResponsive();

  // Disable gradient animation on mobile for performance
  if (isMobile) return null;

  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none">
      <div
        className="absolute inset-0 opacity-30 transition-all duration-300 ease-out"
        style={{
          background: `radial-gradient(circle at ${mousePosition.x}px ${mousePosition.y}px, rgba(240, 185, 11, 0.15) 0%, rgba(10, 11, 13, 0) 50%)`,
        }}
      />
      <div className="absolute top-0 -left-4 w-72 sm:w-96 h-72 sm:h-96 bg-[#F0B90B] rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-pulse-slow"></div>
      <div className="absolute bottom-0 -right-4 w-72 sm:w-96 h-72 sm:h-96 bg-[#F0B90B] rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-pulse-slow animation-delay-2000"></div>
    </div>
  );
};

const Navbar = ({ scrolled }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { isMobile, isTablet, isDesktop } = useResponsive();

  // Prevent body scroll when menu is open
  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isMenuOpen]);

  const menuItems = [
    { name: "Buy Crypto", icon: TrendingUp, href: "#" },
    { name: "Markets", icon: BarChart3, href: "#" },
    { name: "Trade", icon: ArrowRight, href: "#" },
    { name: "Futures", icon: Zap, href: "#" },
    { name: "Gift Cards", icon: Gift, href: "#" },
  ];

  return (
    <>
      <nav
        className={`fixed top-0 w-full z-50 transition-all duration-700 ${
          scrolled
            ? "bg-[#0A0B0D]/98 backdrop-blur-2xl border-b border-[#2B3139] shadow-2xl"
            : "bg-transparent"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-14 sm:h-16">
            <div className="flex items-center space-x-4 sm:space-x-8 lg:space-x-12">
              <Link to="/" className="flex items-center space-x-2 cursor-pointer group">
                <div className="relative">
                  <div className="absolute inset-0 bg-[#F0B90B] rounded-lg blur-xl opacity-50 group-hover:opacity-100 transition-opacity duration-500"></div>
                  <div className="relative w-7 h-7 sm:w-8 sm:h-8 bg-linear-to-br from-[#F0B90B] to-[#F0B90B]/80 rounded-lg flex items-center justify-center transform group-hover:scale-110 transition-transform duration-300">
                    <span className="text-[#0A0B0D] font-bold text-xs sm:text-sm">
                      C
                    </span>
                  </div>
                </div>
                {!isMobile && (
                  <span className="text-white font-bold text-lg sm:text-xl tracking-tight bg-linear-to-r from-white to-[#A0A5AA] bg-clip-text">
                    CryptHub
                  </span>
                )}
              </Link>

              <div className="hidden lg:flex items-center space-x-6 xl:space-x-8">
                {menuItems.map((item) => (
                  <a
                    key={item.name}
                    href={item.href}
                    className="group relative text-[#A0A5AA] hover:text-white transition-colors duration-300 text-sm font-medium"
                  >
                    {item.name}
                    <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-linear-to-r from-[#F0B90B] to-[#F0B90B]/50 transition-all duration-300 group-hover:w-full"></span>
                  </a>
                ))}
              </div>
            </div>

            <div className="hidden md:flex items-center space-x-2 lg:space-x-4">
              <Link to="/login">
                <button className="px-3 sm:px-4 py-1.5 sm:py-2 text-[#F0B90B] border border-[#F0B90B] rounded-xl text-xs sm:text-sm font-semibold hover:bg-[#F0B90B]/10 transition-all duration-300">
                  Log In
                </button>
              </Link>
              <Link to="/signup">
                <button className="px-3 sm:px-4 py-1.5 sm:py-2 bg-linear-to-r from-[#F0B90B] to-[#F0B90B]/90 text-[#0A0B0D] rounded-xl text-xs sm:text-sm font-semibold hover:shadow-lg hover:shadow-[#F0B90B]/25 transition-all duration-300 transform hover:scale-105">
                  Sign Up
                </button>
              </Link>
            </div>

            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden text-white p-2 relative z-50"
              aria-label="Toggle menu"
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      {isMenuOpen && (
        <div className="fixed inset-0 z-40 md:hidden">
          {/* Backdrop with blur and gradient */}
          <div 
            className="absolute inset-0 bg-linear-to-br from-[#0A0B0D]/98 via-[#0A0B0D]/95 to-[#0A0B0D]/98 backdrop-blur-xl animate-fade-in"
            onClick={() => setIsMenuOpen(false)}
          />
          
          {/* Animated Menu Panel */}
          <div className="absolute inset-y-0 right-0 w-full max-w-sm bg-linear-to-b from-[#1A1D24] to-[#0A0B0D] shadow-2xl animate-slide-in-right">
            {/* Decorative linear header */}
            <div className="absolute top-0 left-0 right-0 h-40 bg-linear-to-b from-[#F0B90B]/15 via-[#F0B90B]/5 to-transparent pointer-events-none" />
            
            {/* Decorative circles */}
            <div className="absolute top-20 -right-10 w-40 h-40 bg-[#F0B90B]/5 rounded-full blur-3xl" />
            <div className="absolute bottom-20 -left-10 w-40 h-40 bg-[#F0B90B]/5 rounded-full blur-3xl" />
            
            {/* Menu Header */}
            <div className="relative pt-20 pb-6 px-6 border-b border-[#2B3139]/50">
              <div className="flex items-center gap-3 mb-4">
                <div className="relative">
                  <div className="absolute inset-0 bg-[#F0B90B] rounded-full blur-lg opacity-50 animate-pulse"></div>
                  <div className="relative w-12 h-12 bg-linear-to-br from-[#F0B90B] to-[#F0B90B]/80 rounded-full flex items-center justify-center">
                    <span className="text-[#0A0B0D] font-bold text-lg">C</span>
                  </div>
                </div>
                <div>
                  <h3 className="text-white font-bold text-lg">CryptHub</h3>
                  <p className="text-[#A0A5AA] text-xs">Trade. Earn. Grow.</p>
                </div>
              </div>
              
              {/* Welcome message */}
              <div className="mt-4 p-3 bg-[#F0B90B]/5 rounded-xl border border-[#F0B90B]/10">
                <p className="text-[#A0A5AA] text-xs">
                  Welcome to CryptHub! 🚀 Start your crypto journey today.
                </p>
              </div>
            </div>

            {/* Navigation Links */}
            <div className="flex-1 py-6 px-6 overflow-y-auto max-h-[calc(100vh-280px)]">
              <div className="space-y-1">
                {menuItems.map((item, idx) => (
                  <a
                    key={item.name}
                    href={item.href}
                    className="flex items-center justify-between px-4 py-3 text-[#A0A5AA] hover:text-white hover:bg-[#2B3139]/50 rounded-xl transition-all duration-300 group animate-slide-in"
                    style={{ animationDelay: `${idx * 50}ms` }}
                    onClick={() => setIsMenuOpen(false)}
                  >
                    <div className="flex items-center gap-3">
                      <item.icon size={18} className="text-[#F0B90B]" />
                      <span className="font-medium">{item.name}</span>
                    </div>
                    <ChevronRight 
                      size={16} 
                      className="opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all duration-300" 
                    />
                  </a>
                ))}
              </div>

              {/* Divider */}
              <div className="my-6 h-px bg-linear-to-r from-transparent via-[#2B3139] to-transparent" />

              {/* Quick Stats */}
              <div className="grid grid-cols-2 gap-3 mb-6 animate-slide-in animation-delay-300">
                <div className="p-3 bg-[#1E2329]/50 rounded-xl border border-[#2B3139]">
                  <p className="text-[#A0A5AA] text-[10px] mb-1">24h Volume</p>
                  <p className="text-white font-bold text-sm">$24.5B</p>
                </div>
                <div className="p-3 bg-[#1E2329]/50 rounded-xl border border-[#2B3139]">
                  <p className="text-[#A0A5AA] text-[10px] mb-1">Active Users</p>
                  <p className="text-white font-bold text-sm">2M+</p>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="space-y-3 animate-slide-in animation-delay-400">
                <Link to="/login" onClick={() => setIsMenuOpen(false)}>
                  <button className="w-full px-4 py-3 text-[#F0B90B] border border-[#F0B90B] rounded-xl font-semibold hover:bg-[#F0B90B]/10 transition-all duration-300">
                    Log In
                  </button>
                </Link>
                <Link to="/signup" onClick={() => setIsMenuOpen(false)}>
                  <button className="w-full px-4 py-3 mt-4 bg-linear-to-r from-[#F0B90B] to-[#F0B90B]/90 text-[#0A0B0D] rounded-xl font-semibold hover:shadow-lg hover:shadow-[#F0B90B]/25 transition-all duration-300 transform hover:scale-[1.02]">
                    Sign Up
                  </button>
                </Link>
              </div>

              {/* Trust Badge */}
              <div className="mt-6 p-4 bg-[#1E2329]/30 rounded-xl border border-[#2B3139] backdrop-blur-sm">
                <div className="flex items-center justify-center gap-2">
                  <Shield size={14} className="text-[#0ECB81]" />
                  <p className="text-[#A0A5AA] text-xs">Secure & Regulated Platform</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

const PriceTicker = () => {
  const [hoveredIndex, setHoveredIndex] = useState(null);
  const { isMobile } = useResponsive();

  return (
    <div className="bg-[#1E2329] rounded-xl sm:rounded-2xl p-4 sm:p-6 border border-[#2B3139] hover:border-[#F0B90B]/20 transition-all duration-500">
      <div className="flex justify-between items-center mb-4 sm:mb-6">
        <div className="flex items-center gap-2 sm:gap-3">
          <div className="p-1.5 sm:p-2 bg-[#F0B90B]/10 rounded-lg sm:rounded-xl">
            <BarChart3 size={isMobile ? 16 : 20} className="text-[#F0B90B]" />
          </div>
          <span className="text-white font-semibold text-sm sm:text-base">
            Market Overview
          </span>
        </div>
        <button className="text-[#F0B90B] text-xs sm:text-sm hover:opacity-80 transition-opacity flex items-center gap-1">
          View All
          <ChevronRight size={isMobile ? 12 : 14} />
        </button>
      </div>

      <div className="space-y-1 sm:space-y-2">
        {CRYPTO_DATA.map((crypto, idx) => (
          <div
            key={idx}
            className="group relative flex items-center justify-between p-2 sm:p-4 rounded-lg sm:rounded-xl hover:bg-[#2B3139] transition-all duration-300 cursor-pointer"
            onMouseEnter={() => setHoveredIndex(idx)}
            onMouseLeave={() => setHoveredIndex(null)}
          >
            <div className="flex items-center gap-2 sm:gap-4">
              <div
                className="w-7 h-7 sm:w-10 sm:h-10 rounded-full flex items-center justify-center text-base sm:text-xl"
                style={{
                  backgroundColor: `${crypto.color}20`,
                  color: crypto.color,
                }}
              >
                {crypto.symbol === "BTC"
                  ? "₿"
                  : crypto.symbol === "ETH"
                    ? "Ξ"
                    : crypto.symbol === "BNB"
                      ? "B"
                      : "◎"}
              </div>
              <div>
                <div className="text-white font-semibold text-sm sm:text-base">
                  {crypto.coin}
                </div>
                <div className="text-[#A0A5AA] text-[10px] sm:text-xs">
                  {crypto.symbol}
                </div>
              </div>
            </div>
            <div className="text-right">
              <div className="text-white font-semibold text-sm sm:text-base">
                ${crypto.price}
              </div>
              <div
                className={`text-[10px] sm:text-xs ${crypto.positive ? "text-[#0ECB81]" : "text-[#F6465D]"} flex items-center gap-1 justify-end`}
              >
                {crypto.positive ? (
                  <TrendingUp size={isMobile ? 10 : 12} />
                ) : (
                  <TrendingUp
                    size={isMobile ? 10 : 12}
                    className="rotate-180"
                  />
                )}
                {crypto.change}
              </div>
            </div>
            {!isMobile && (
              <div
                className={`absolute right-4 transition-all duration-300 ${hoveredIndex === idx ? "opacity-100 translate-x-0" : "opacity-0 translate-x-4 pointer-events-none"}`}
              >
                <button className="px-2 sm:px-3 py-1 sm:py-1.5 bg-[#F0B90B] text-[#0A0B0D] rounded-lg text-[10px] sm:text-xs font-semibold hover:shadow-lg transition-all">
                  Trade
                </button>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

const TopGainers = () => {
  const { isMobile } = useResponsive();

  return (
    <div className="bg-[#1E2329] rounded-xl sm:rounded-2xl p-4 sm:p-6 border border-[#2B3139] hover:border-[#F0B90B]/20 transition-all duration-500">
      <div className="flex items-center gap-2 sm:gap-3 mb-4 sm:mb-6">
        <div className="p-1.5 sm:p-2 bg-[#F0B90B]/10 rounded-lg sm:rounded-xl">
          <Award size={isMobile ? 16 : 20} className="text-[#F0B90B]" />
        </div>
        <span className="text-white font-semibold text-sm sm:text-base">
          Top Gainers (24h)
        </span>
      </div>
      <div className="space-y-1 sm:space-y-2">
        {TOP_GAINERS.map((gainer, idx) => (
          <div
            key={idx}
            className="group flex items-center justify-between p-2 sm:p-4 rounded-lg sm:rounded-xl hover:bg-[#2B3139] transition-all duration-300 cursor-pointer"
          >
            <div>
              <div className="text-white font-semibold text-sm sm:text-base">
                {gainer.coin}
              </div>
              <div className="text-[#A0A5AA] text-[10px] sm:text-xs">
                {gainer.symbol}
              </div>
            </div>
            <div className="text-right">
              <div className="text-white font-semibold text-sm sm:text-base">
                {gainer.price}
              </div>
              <div className="text-[#0ECB81] text-[10px] sm:text-xs font-semibold">
                {gainer.change}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

const GiftCardSection = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const { isMobile, isTablet, isDesktop } = useResponsive();

  const filteredCards = GIFT_CARDS_DATA.filter((card) =>
    card.name.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  // Responsive grid columns
  const getGridCols = () => {
    if (isMobile) return "grid-cols-2";
    if (isTablet) return "grid-cols-3";
    return "grid-cols-4";
  };

  return (
    <div className="bg-[#1E2329] rounded-xl sm:rounded-2xl p-4 sm:p-6 mt-4 sm:mt-6 border border-[#2B3139] hover:border-[#F0B90B]/20 transition-all duration-500">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-4 sm:mb-6">
        <div className="flex items-center gap-2 sm:gap-3">
          <div className="p-1.5 sm:p-2 bg-[#F0B90B]/10 rounded-lg sm:rounded-xl">
            <Gift size={isMobile ? 16 : 20} className="text-[#F0B90B]" />
          </div>
          <span className="text-white font-semibold text-sm sm:text-base">
            Gift Cards
          </span>
          <span className="text-[#0ECB81] text-[10px] sm:text-xs bg-[#0ECB81]/10 px-1.5 sm:px-2 py-0.5 sm:py-1 rounded-full">
            Up to 8% off
          </span>
        </div>
        <div className="relative w-full sm:w-auto">
          <Search
            size={14}
            className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[#A0A5AA]"
          />
          <input
            type="text"
            placeholder={isMobile ? "Search..." : "Search gift cards..."}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-9 pr-4 py-1.5 sm:py-2 bg-[#2B3139] border border-[#2B3139] rounded-lg sm:rounded-xl text-white text-xs sm:text-sm placeholder-[#A0A5AA] focus:outline-none focus:border-[#F0B90B] transition-all w-full sm:w-48"
          />
        </div>
      </div>

      <div className={`grid ${getGridCols()} gap-4 sm:gap-3`}>
        {filteredCards.map((card) => (
          <div
            key={card.id}
            className="group relative bg-[#2B3139] rounded-lg sm:rounded-xl p-2 sm:p-4 text-center hover:bg-[#363D45] transition-all duration-300 cursor-pointer transform hover:scale-105"
          >
            <div className="absolute top-1 right-1 sm:top-2 sm:right-2">
              {card.popular && (
                <Star
                  size={isMobile ? 8 : 12}
                  className="text-[#F0B90B] fill-[#F0B90B]"
                />
              )}
            </div>
            <div className="text-xl sm:text-3xl mb-1 sm:mb-2 group-hover:scale-110 transition-transform duration-300">
              {card.name === "Amazon"
                ? "📦"
                : card.name === "Google Play"
                  ? "🎮"
                  : card.name === "Steam"
                    ? "🎯"
                    : card.name === "Apple"
                      ? "🍎"
                      : card.name === "Netflix"
                        ? "🎬"
                        : "🎵"}
            </div>
            <div className="text-white text-xs sm:text-sm font-medium">
              {card.name}
            </div>
            <div className="text-[#0ECB81] text-[10px] sm:text-xs font-semibold mt-0.5 sm:mt-1">
              {card.discount} discount
            </div>
            {!isMobile && (
              <>
                <div className="text-[#A0A5AA] text-[8px] sm:text-[10px] mt-0.5 sm:mt-1">
                  ${card.minAmount} - ${card.maxAmount}
                </div>
                {card.instantDelivery && (
                  <div className="mt-1 sm:mt-2 text-[8px] sm:text-[10px] text-[#F0B90B]">
                    Instant Delivery
                  </div>
                )}
              </>
            )}
          </div>
        ))}
      </div>

      <button className="w-full mt-4 sm:mt-6 py-2 sm:py-3 bg-[#F0B90B]/10 text-[#F0B90B] rounded-lg sm:rounded-xl text-xs sm:text-sm font-semibold hover:bg-[#F0B90B]/20 transition-all duration-300 flex items-center justify-center gap-2 group">
        Browse All Gift Cards
        <ChevronRight
          size={isMobile ? 12 : 14}
          className="group-hover:translate-x-1 transition-transform"
        />
      </button>
    </div>
  );
};

const StatsCard = ({ value, label, icon: Icon, change, description }) => {
  const { isMobile } = useResponsive();

  return (
    <div className="group bg-[#1E2329] rounded-xl sm:rounded-2xl p-3 sm:p-6 border border-[#2B3139] hover:border-[#F0B90B]/20 transition-all duration-500 cursor-pointer">
      <div className="flex items-center justify-between mb-2 sm:mb-4">
        <div className="p-1.5 sm:p-2 bg-[#F0B90B]/10 rounded-lg sm:rounded-xl group-hover:bg-[#F0B90B]/20 transition-all duration-300">
          <Icon size={isMobile ? 14 : 20} className="text-[#F0B90B]" />
        </div>
        {change && (
          <div className="text-[#0ECB81] text-[10px] sm:text-xs font-semibold flex items-center gap-1">
            <TrendingUp size={isMobile ? 10 : 12} />
            {change}
          </div>
        )}
      </div>
      <div className="text-xl sm:text-3xl font-bold text-white mb-1 sm:mb-2">
        {value}
      </div>
      <div className="text-[#A0A5AA] text-xs sm:text-sm mb-1 sm:mb-2">
        {label}
      </div>
      {description && !isMobile && (
        <div className="text-[#A0A5AA] text-[10px] sm:text-xs">
          {description}
        </div>
      )}
    </div>
  );
};

const TrustSection = () => {
  const { isMobile, isTablet } = useResponsive();

  const brands = [
    "Binance",
    "Coinbase",
    "Kraken",
    "Bybit",
    "KuCoin",
    "Crypto.com",
  ];
  const visibleBrands = isMobile ? brands.slice(0, 4) : brands;

  return (
    <div className="relative border-t border-[#2B3139] py-8 sm:py-16 mt-12 sm:mt-20 overflow-hidden">
      <div className="absolute inset-0 bg-linear-to-r from-transparent via-[#F0B90B]/5 to-transparent"></div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <p className="text-center text-[#A0A5AA] text-[10px] sm:text-xs uppercase tracking-wider mb-6 sm:mb-10">
          Trusted by industry leaders worldwide
        </p>
        <div className="flex flex-wrap justify-center items-center gap-6 sm:gap-12 md:gap-16">
          {visibleBrands.map((brand, idx) => (
            <div key={idx} className="relative group cursor-pointer">
              <div
                className={`text-[#70757A] font-bold text-base sm:text-xl opacity-50 group-hover:opacity-100 transition-all duration-300 ${!isMobile && "group-hover:scale-110"}`}
              >
                {brand}
              </div>
              {!isMobile && (
                <div className="absolute -bottom-2 left-0 w-0 h-0.5 bg-linear-to-r from-[#F0B90B] to-transparent group-hover:w-full transition-all duration-300"></div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

const FloatingCTA = () => {
  const [isVisible, setIsVisible] = useState(false);
  const { isMobile } = useResponsive();

  useEffect(() => {
    const handleScroll = () => {
      setIsVisible(window.scrollY > 300);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-4 sm:bottom-6 right-4 sm:right-6 z-40 animate-fade-in-up">
      <Link to="/login">
        <button className="group relative px-4 sm:px-6 py-2 sm:py-3 bg-linear-to-r from-[#F0B90B] to-[#F0B90B]/80 rounded-lg sm:rounded-xl text-[#0A0B0D] font-semibold shadow-2xl hover:shadow-[#F0B90B]/25 transition-all duration-300 transform hover:scale-105">
          <span className="flex items-center gap-1 sm:gap-2 text-sm sm:text-base">
            Start Trading
            <ArrowRight
              size={isMobile ? 14 : 16}
              className="group-hover:translate-x-1 transition-transform"
            />
          </span>
          <div className="absolute inset-0 rounded-lg sm:rounded-xl bg-white opacity-0 group-hover:opacity-20 transition-all duration-300"></div>
        </button>
      </Link>
    </div>
  );
};

// ============================================================
// MAIN APP COMPONENT
// ============================================================

const HeroPage = () => {
  const scrolled = useScrollAnimation();
  const { isMobile, isTablet, isDesktop } = useResponsive();

  return (
    <div className="min-h-screen bg-[#0A0B0D] overflow-x-hidden">
      <AnimatedGradient />
      <Navbar scrolled={scrolled} />

      {/* Hero Section */}
      <main className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 sm:pt-28 lg:pt-32 pb-12 sm:pb-16 lg:pb-20">
        <div className="grid lg:grid-cols-2 gap-8 sm:gap-12 lg:gap-16 items-start">
          {/* Left Content */}
          <div className="space-y-6 sm:space-y-8 lg:space-y-10">
            <div className="inline-flex items-center px-3 sm:px-4 py-1.5 sm:py-2 rounded-full bg-[#F0B90B]/10 border border-[#F0B90B]/20 backdrop-blur-sm animate-fade-in-up">
              <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-[#0ECB81] rounded-full mr-1.5 sm:mr-2 animate-pulse"></div>
              <span className="text-[#F0B90B] text-[10px] sm:text-xs font-medium">
                {isMobile ? "Active Traders" : "Active Traders"}
              </span>
            </div>

            <div className="space-y-3 sm:space-y-4 animate-fade-in-up animation-delay-200">
              <h1 className="text-3xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold leading-tight tracking-tight">
                <span className="text-white">Buy & Sell</span>
                <br />
                <span className="bg-linear-to-r from-[#F0B90B] via-[#F0B90B] to-[#F0B90B]/70 bg-clip-text text-transparent">
                  Crypto Instantly
                </span>
                <br />
                <span className="text-[#A0A5AA] text-2xl sm:text-4xl lg:text-5xl xl:text-6xl">
                  with 0% fees
                </span>
              </h1>
            </div>

            <p className="text-[#A0A5AA] text-sm sm:text-base lg:text-lg leading-relaxed max-w-lg animate-fade-in-up animation-delay-400">
              Trade Bitcoin, Ethereum, and 350+ cryptocurrencies with the lowest
              fees. Get gift cards instantly with the best rates in the market.
            </p>

            <div className="flex flex-wrap gap-3 sm:gap-4 animate-fade-in-up animation-delay-600">
              <Link to="/signup">
                <button className="group relative px-5 sm:px-8 py-2.5 sm:py-4 bg-linear-to-r from-[#F0B90B] to-[#F0B90B]/90 text-[#0A0B0D] rounded-lg sm:rounded-xl font-semibold flex items-center gap-1 sm:gap-2 overflow-hidden text-sm sm:text-base">
                  <span className="relative z-10">Get Started</span>
                  <ArrowRight
                    size={isMobile ? 14 : 18}
                    className="relative z-10 group-hover:translate-x-1 transition-transform"
                  />
                  <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-20 transition-all duration-300"></div>
                </button>
              </Link>
              <Link to="/login">
                <button className="px-5 sm:px-8 py-2.5 sm:py-4 border border-[#2B3139] rounded-lg sm:rounded-xl text-white font-semibold hover:bg-[#1E2329] transition-all duration-300 flex items-center gap-1 sm:gap-2 text-sm sm:text-base">
                  <Zap size={isMobile ? 14 : 18} />
                  Trade Now
                </button>
              </Link>
            </div>

            <div className="grid grid-cols-3 gap-2 sm:gap-4 pt-4 sm:pt-8 animate-fade-in-up animation-delay-800">
              <StatsCard
                value="$24B+"
                label="24h Volume"
                icon={BarChart3}
                change="+12.5%"
                description="+12.5% vs yesterday"
              />
              <StatsCard
                value="350+"
                label="Markets"
                icon={Globe}
                description="Crypto & Gift Cards"
              />
              <StatsCard
                value="99.99%"
                label="Uptime"
                icon={Shield}
                description="99.99% SLA guaranteed"
              />
            </div>
          </div>

          {/* Right Content */}
          <div className="space-y-3 sm:space-y-4 animate-fade-in-up animation-delay-400">
            <PriceTicker />
            <TopGainers />
            <GiftCardSection />
          </div>
        </div>
      </main>

      <TrustSection />
      <FloatingCTA />

      <style>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        @keyframes pulse-slow {
          0%, 100% {
            opacity: 0.1;
            transform: scale(1);
          }
          50% {
            opacity: 0.2;
            transform: scale(1.05);
          }
        }
        
        @keyframes fadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }
        
        @keyframes slideInRight {
          from {
            transform: translateX(100%);
          }
          to {
            transform: translateX(0);
          }
        }
        
        @keyframes slideIn {
          from {
            opacity: 0;
            transform: translateX(20px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }
        
        .animate-fade-in-up {
          animation: fadeInUp 0.8s cubic-bezier(0.4, 0, 0.2, 1) forwards;
          opacity: 0;
        }
        
        .animate-pulse-slow {
          animation: pulse-slow 8s ease-in-out infinite;
        }
        
        .animate-fade-in {
          animation: fadeIn 0.3s ease-out forwards;
        }
        
        .animate-slide-in-right {
          animation: slideInRight 0.4s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }
        
        .animate-slide-in {
          opacity: 0;
          animation: slideIn 0.4s ease-out forwards;
        }
        
        .animation-delay-200 { animation-delay: 0.2s; }
        .animation-delay-300 { animation-delay: 0.3s; }
        .animation-delay-400 { animation-delay: 0.4s; }
        .animation-delay-600 { animation-delay: 0.6s; }
        .animation-delay-800 { animation-delay: 0.8s; }
        .animation-delay-2000 { animation-delay: 2s; }
        
        /* Touch-friendly hover states for mobile */
        @media (max-width: 768px) {
          .hover\\:scale-105:hover {
            transform: scale(1);
          }
          
          .group:hover .group-hover\\:scale-110 {
            transform: scale(1);
          }
          
          button, a, [role="button"] {
            min-height: 44px;
          }
        }
        
        /* Custom scrollbar */
        ::-webkit-scrollbar {
          width: 6px;
          height: 6px;
        }
        
        ::-webkit-scrollbar-track {
          background: #1E2329;
        }
        
        ::-webkit-scrollbar-thumb {
          background: #F0B90B;
          border-radius: 4px;
        }
        
        ::-webkit-scrollbar-thumb:hover {
          background: #F0B90B/80;
        }
        
        * {
          -webkit-font-smoothing: antialiased;
          -moz-osx-font-smoothing: grayscale;
        }
      `}</style>
    </div>
  );
};

export default HeroPage;