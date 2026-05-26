import { useEffect, useState } from "react";
import axios from "axios";

const COINS = {
  bitcoin: "bitcoin",
  ethereum: "ethereum",
  binancecoin: "binancecoin",
  solana: "solana",
  ripple: "ripple",
  sui: "sui",
};

export const useCryptoPrices = (refreshInterval = 10000) => {
  const [prices, setPrices] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchPrices = async () => {
    try {
      setError(null);

      const ids = Object.values(COINS).join(",");

      const res = await axios.get(
        `https://api.coingecko.com/api/v3/simple/price`,
        {
          params: {
            ids,
            vs_currencies: "usd",
            include_24hr_change: true,
          },
        }
      );

      console.log(res.data)

      setPrices(res.data);
    } catch (err) {
      setError("Failed to fetch prices");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPrices();

    const interval = setInterval(fetchPrices, refreshInterval);

    return () => clearInterval(interval);
  }, [refreshInterval]);

  return { prices, loading, error };
};