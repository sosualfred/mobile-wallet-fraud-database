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
    localStorage.removeItem("refreshToken");
    delete api.defaults.headers.common["Authorization"];
  }, []);

  const refreshToken = useCallback(async () => {
    try {
      const refreshToken = localStorage.getItem("refreshToken");
      if (!refreshToken) {
        throw new Error("No refresh token available");
      }
      const response = await api.post("/auth/refresh-token", { refreshToken });
      const { token: newToken } = response.data;
      saveToken(newToken);
      return newToken;
    } catch (error) {
      console.error("Failed to refresh token:", error);
      clearToken();
      throw error;
    }
  }, [saveToken, clearToken]);

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
          if (err.response && err.response.status === 401) {
            try {
              await refreshToken();
              const response = await api.get("/auth/me");
              setUser(response.data);
            } catch (refreshError) {
              console.error("Failed to refresh token:", refreshError);
              clearToken();
            }
          } else {
            clearToken();
          }
        }
      }
      setLoading(false);
    };

    initializeAuth();
  }, [saveToken, clearToken, refreshToken]);

  const login = async (credentials) => {
    try {
      setError(null);
      setLoading(true);
      const response = await api.post("/auth/login", credentials);
      const { user: userData, token: newToken, refreshToken } = response.data;
      setUser(userData);
      saveToken(newToken);
      localStorage.setItem("refreshToken", refreshToken);
      navigate("/");
      return userData;
    } catch (err) {
      setError(err.response?.data?.message || "An error occurred during login");
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const signup = async (userData) => {
    try {
      setError(null);
      setLoading(true);
      const response = await api.post("/auth/register", userData);
      const { user: newUser, token: newToken, refreshToken } = response.data;
      setUser(newUser);
      saveToken(newToken);
      localStorage.setItem("refreshToken", refreshToken);

      // Automatically log in the user after successful signup
      await login({ email: userData.email, password: userData.password });

      return newUser;
    } catch (err) {
      setError(
        err.response?.data?.message || "An error occurred during signup"
      );
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const logout = useCallback(() => {
    setUser(null);
    clearToken();
    navigate("/login");
  }, [clearToken, navigate]);

  // Add token refresh to the api interceptor
  api.interceptors.response.use(
    (response) => response,
    async (error) => {
      const originalRequest = error.config;
      if (error.response.status === 401 && !originalRequest._retry) {
        originalRequest._retry = true;
        try {
          const newToken = await refreshToken();
          originalRequest.headers["Authorization"] = `Bearer ${newToken}`;
          return api(originalRequest);
        } catch (refreshError) {
          return Promise.reject(refreshError);
        }
      }
      return Promise.reject(error);
    }
  );

  const value = {
    user,
    token,
    loading,
    error,
    login,
    signup,
    logout,
    isAuthenticated: !!user,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export default AuthContext;
