import { useEffect, useState } from "react";
import axios from "axios";

const ASSETS = [
  {
    id: 1,
    key: "bitcoin",
    symbol: "BTC",
    name: "Bitcoin",
    icon: "₿",
    color: "#F7931A",
    chain: "bitcoin",
    website: "https://bitcoin.org",
    explorer: "https://blockstream.info",
    decimals: 8,
    contractAddress: "Native Token",
    supportsInternalTransfer: true,
  },

  {
    id: 2,
    key: "ethereum",
    symbol: "ETH",
    name: "Ethereum",
    icon: "Ξ",
    color: "#627EEA",
    chain: "ethereum",
    website: "https://ethereum.org",
    explorer: "https://etherscan.io",
    decimals: 18,
    contractAddress: "Native Token",
    supportsInternalTransfer: true,
  },

  {
    id: 3,
    key: "binancecoin",
    symbol: "BNB",
    name: "BNB",
    icon: "B",
    color: "#F3BA2F",
    chain: "bsc",
    website: "https://bnbchain.org",
    explorer: "https://bscscan.com",
    decimals: 18,
    contractAddress: "Native Token",
    supportsInternalTransfer: true,
  },

  {
    id: 4,
    key: "solana",
    symbol: "SOL",
    name: "Solana",
    icon: "◎",
    color: "#00FFA3",
    chain: "solana",
    website: "https://solana.com",
    explorer: "https://solscan.io",
    decimals: 9,
    contractAddress: "Native Token",
    supportsInternalTransfer: true,
  },

  {
    id: 5,
    key: "ripple",
    symbol: "XRP",
    name: "XRP",
    icon: "X",
    color: "#23292F",
    chain: "ripple",
    website: "https://xrpl.org",
    explorer: "https://xrpscan.com",
    decimals: 6,
    contractAddress: "Native Token",
    supportsInternalTransfer: true,
  },

  {
    id: 6,
    key: "sui",
    symbol: "SUI",
    name: "Sui",
    icon: "S",
    color: "#6BCBEF",
    chain: "sui",
    website: "https://sui.io",
    explorer: "https://suiscan.xyz",
    decimals: 9,
    contractAddress: "Native Token",
    supportsInternalTransfer: true,
  },

  {
    id: 7,
    key: "algorand",
    symbol: "ALGO",
    name: "Algorand",
    icon: "A",
    color: "#000000",
    chain: "algorand",
    website: "https://algorand.org",
    explorer: "https://algoexplorer.io",
    decimals: 6,
    contractAddress: "Native Token",
    supportsInternalTransfer: true,
  },

  {
    id: 8,
    key: "tron",
    symbol: "TRX",
    name: "Tron",
    icon: "T",
    color: "#FF0013",
    chain: "tron",
    website: "https://tron.network",
    explorer: "https://tronscan.org",
    decimals: 6,
    contractAddress: "Native Token",
    supportsInternalTransfer: true,
  },
];

export const useCryptoPrices = (accounts = [], refreshInterval = 100000) => {
  const [assets, setAssets] = useState([]);
  const [price_loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const normalizeAsset = (asset) => {
    const map = {
      BITCOIN: "bitcoin",
      ETHEREUM: "ethereum",
      BNB: "binancecoin",
      SOLANA: "solana",
      XRP: "ripple",
      SUI: "sui",
      ALGORAND: "algorand",
      TRON: "tron",
    };
    return map[asset?.toUpperCase()] || asset?.toLowerCase();
  };

  const fetchPrices = async () => {
    try {
      setError(null);

      const ids = ASSETS.map((a) => a.key).join(",");

      const res = await axios.get(
        "https://api.coingecko.com/api/v3/coins/markets",
        {
          params: {
            vs_currency: "usd",
            ids,
            price_change_percentage: "24h",
          },
        },
      );

      const marketData = res.data;

      const formatted = ASSETS.map((asset) => {
        const data = marketData.find((c) => c.id === asset.key);

        const price = data?.current_price || 0;
        const change = data?.price_change_percentage_24h || 0;
        const volume = data?.total_volume || 0;
        const marketCap = data?.market_cap || 0;

        // find user holding
        const holding = accounts.find(
          (h) => normalizeAsset(h.asset) === asset.key,
        );

        const amount = parseFloat(holding?.balance || 0);

        return {
          ...asset,

          // PRICE DATA
          price,
          change: `${change >= 0 ? "+" : ""}${change.toFixed(2)}%`,
          positive: change >= 0,

          // WALLET DATA
          amount,

          // 💰 VALUE CALCULATION
          value: Number((amount * price).toFixed(6)),

          // MARKET DATA
          marketCap: formatMoney(marketCap),
          volume24h: formatMoney(volume),

          image: data?.image || null,
        };
      });

      setAssets(formatted);
    } catch (err) {
      console.error(err);
      setError("Failed to fetch crypto data");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPrices();

    const interval = setInterval(fetchPrices, refreshInterval);

    return () => clearInterval(interval);
  }, [refreshInterval, accounts]);

  return { assets, price_loading, error, refresh: fetchPrices };
};

// helper
function formatMoney(num) {
  if (!num) return "$0";
  if (num >= 1e12) return `$${(num / 1e12).toFixed(2)}T`;
  if (num >= 1e9) return `$${(num / 1e9).toFixed(2)}B`;
  if (num >= 1e6) return `$${(num / 1e6).toFixed(2)}M`;
  return `$${num.toFixed(2)}`;
}
