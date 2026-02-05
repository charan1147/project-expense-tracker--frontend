import { createContext, useState, useEffect, useContext } from "react";
import { getCurrentUser, login, register, logout } from "../api/api";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("jwt");

    if (!token) {
      setLoading(false);
      return;
    }

    const loadUser = async () => {
      try {
        const res = await getCurrentUser();

        if (res.data.success) {
          setUser(res.data.user);
        }
      } catch (err) {
        if (err.response?.status === 401) {
          localStorage.removeItem("jwt");
          setUser(null);
        }
      } finally {
        setLoading(false);
      }
    };

    loadUser();
  }, []);

  const signUp = async (username, email, password) => {
    const res = await register({ username, email, password });

    if (res.data.success) {
      localStorage.setItem("jwt", res.data.token);
      setUser(res.data.user);
      return true;
    }

    throw new Error(res.data.message);
  };

  const signIn = async (email, password) => {
    const res = await login({ email, password });

    if (res.data.success) {
      localStorage.setItem("jwt", res.data.token);
      setUser(res.data.user);
      return true;
    }

    throw new Error(res.data.message);
  };

  const signOut = async () => {
    try {
      await logout();
    } finally {
      localStorage.removeItem("jwt");
      setUser(null);
    }
  };

  return (
    <AuthContext.Provider value={{ user, loading, signUp, signIn, signOut }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
