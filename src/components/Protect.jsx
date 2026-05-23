import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import LoadingSpinner from "./Spinner";

const ProtectedRoute = ({ children }) => {
  const [loading, setLoading] = useState(true);
  const [isAuth, setIsAuth] = useState(false);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const res = await fetch("http://localhost:8000/api/me", {
          method: "GET",
          credentials: "include", // 🔥 sends cookie automatically
        });

        if (res.ok) {
          setIsAuth(true);
        } else {
          setIsAuth(false);
        }
      } catch (err) {
        setIsAuth(false);
      } finally {
        setLoading(false);
      }
    };

    checkAuth();
  }, []);

  if (loading) return <LoadingSpinner />;

  if (!isAuth) return <Navigate to="/login" />;

  return children;
};

export default ProtectedRoute;