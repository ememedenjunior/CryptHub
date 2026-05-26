import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import LoadingSpinner from "./Spinner";
import axios from "axios";

// cookie reader
const getCookie = (name) => {
  const match = document.cookie.match(new RegExp("(^| )" + name + "=([^;]+)"));
  return match ? match[2] : null;
};

const api = axios.create({
  baseURL: "http://localhost:8000",
  withCredentials: true,
});

const UnProtectedRoute = ({ children }) => {
  const [loading, setLoading] = useState(true);
  const [isAuth, setIsAuth] = useState(false);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const csrfToken = getCookie("csrf_token");

        const res = await api.get("/api/v1/me", {
          headers: {
            "X-CSRF-Token": csrfToken || "",
          },
        });

        if (res.status === 200) {
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

  if (isAuth) return <Navigate to="/home" replace />;

  return children;
};

export default UnProtectedRoute;