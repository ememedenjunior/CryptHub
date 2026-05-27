import { useEffect, useState } from "react";
import axios from "axios";

export default function useMe() {
  const [user, setUser] = useState({});
  const [account, setAccount] = useState(null);
  const [wallet, setWallet] = useState(null);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchMe = async () => {
      try {
        const res = await axios.get("https://bitnex-production.up.railway.app/api/v1/me", {
          withCredentials: true, // 🔥 sends cookies automatically
        });

        setUser(res.data.user);
        setAccount(res.data.account);
        setWallet(res.data.wallets);
      } catch (err) {
        setError(err.response?.data || "Request failed");
      } finally {
        setLoading(false);
      }
    };

    fetchMe();
  }, []);

  const logout = async () => {
    try {
      await axios.post(
        "https://bitnex-production.up.railway.app/api/auth/logout",
        {},
        { withCredentials: true },
      );

      // Clear frontend state
      setUser(null);
      setAccount(null);
      setWallet(null);

      window.location.reload();
    } catch (err) {
      console.log("❌ Logout failed:", err.response?.data || err.message);
    }
  };

  return { user, account, wallet, loading, logout };
}
