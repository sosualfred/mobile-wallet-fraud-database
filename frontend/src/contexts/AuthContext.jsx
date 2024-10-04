// src/contexts/AuthContext.jsx
import React, { createContext, useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const saveToken = useCallback((newToken) => {
    setToken(newToken);
    localStorage.setItem("token", newToken);
    api.defaults.headers.common["Authorization"] = `Bearer ${newToken}`;
  }, []);

  const clearToken = useCallback(() => {
    setToken(null);
    localStorage.removeItem("token");
    delete api.defaults.headers.common["Authorization"];
  }, []);

  useEffect(() => {
    const initializeAuth = async () => {
      const storedToken = localStorage.getItem("token");
      if (storedToken) {
        saveToken(storedToken);
        try {
          const response = await api.get("/auth/me");
          setUser(response.data);
        } catch (err) {
          console.error("Failed to fetch user data:", err);
          clearToken();
        }
      }
      setLoading(false);
    };

    initializeAuth();
  }, [saveToken, clearToken]);

  const login = async (credentials) => {
    try {
      setError(null);
      setLoading(true);
      const response = await api.post("/auth/login", credentials);
      const { user: userData, token: newToken, refreshToken } = response.data;
      setUser(userData);
      saveToken(newToken);
      localStorage.setItem("refreshToken", refreshToken); // Store the refresh token
      navigate("/");
      return userData;
    } catch (err) {
      setError(err.response?.data?.message || "An error occurred during login");
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const logout = useCallback(() => {
    setUser(null);
    clearToken();
    navigate("/login"); // This is now safe to use
  }, [clearToken, navigate]);

  const value = {
    user,
    token,
    loading,
    error,
    login,
    logout,
    isAuthenticated: !!user,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export default AuthContext;
