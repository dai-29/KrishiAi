// Auth Context — JWT authentication state management
import React, { createContext, useContext, useState, useEffect, useCallback } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [loading, setLoading] = useState(true);

  const logout = useCallback(() => {
    setUser(null);
    setToken(null);
    localStorage.removeItem("krishiai_token");
    localStorage.removeItem("krishiai_user");
  }, []);

  // On mount, restore session from localStorage
  useEffect(() => {
    const storedToken = localStorage.getItem("krishiai_token");
    const storedUser = localStorage.getItem("krishiai_user");
    if (storedToken && storedUser) {
      try {
        setToken(storedToken);
        setUser(JSON.parse(storedUser));
      } catch {
        logout();
      }
    }
    setLoading(false);
  }, [logout]);

  const login = useCallback((userData, jwtToken) => {
    setUser(userData);
    setToken(jwtToken);
    localStorage.setItem("krishiai_token", jwtToken);
    localStorage.setItem("krishiai_user", JSON.stringify(userData));
  }, []);

  const updateUser = useCallback((updatedData) => {
    const merged = { ...user, ...updatedData };
    setUser(merged);
    localStorage.setItem("krishiai_user", JSON.stringify(merged));
  }, [user]);

  return (
    <AuthContext.Provider value={{ user, token, loading, login, logout, updateUser, isAuthenticated: !!token }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
};
