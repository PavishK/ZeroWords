import React, { createContext, useContext, useState, useEffect } from "react";
import { authApi } from "../services/api";
import toast from "react-hot-toast";

const AuthContext = createContext();

export default function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const forceLogout = async () => {
    try {
      await authApi.post("/api/auth/logout-user/", {});
    } catch (error) {
      toast.error("Internal server error!");
    }
  };
    
  const fetchUser = async () => {
    try {
      setLoading(true);
      toast.loading("Checking...", { id: "session" });

      const res = await authApi.get("/api/auth/whoami/");
      setUser(res.data);
      toast.success("Session in use!", { id: "session" });

    } catch (err) {
      const status = err.response?.status;

      if (status === 401) {
        toast.error(err.response?.data?.detail || "Unauthorized access", { id: "session" });
        await forceLogout();
      } else {
        toast.dismiss("session");
      }

      setUser(null);

    } finally {
      setLoading(false);
    }
  };
  
  useEffect(() => {
    fetchUser();
  }, []);

  return (
    <AuthContext.Provider value={{ user, setUser, loading, fetchUser }}>
      {/* ✅ Only render children when loading is done */}
      {!loading && children}
    </AuthContext.Provider>
  );
}

// ✅ Custom hook to use AuthContext
export const useAuth = () => useContext(AuthContext);