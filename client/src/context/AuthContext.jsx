/* eslint-disable react-refresh/only-export-components */
import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(() => localStorage.getItem('scheme_sathi_token'));
  const [loading, setLoading] = useState(true);

  // Set default axios authorization header
  useEffect(() => {
    if (token) {
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      fetchCurrentUser();
    } else {
      delete axios.defaults.headers.common['Authorization'];
      setUser(null);
      setLoading(false);
    }
  }, [token]);

  const fetchCurrentUser = async () => {
    try {
      const res = await axios.get('/api/auth/me');
      if (res.data.success) {
        setUser(res.data.user);
      }
    } catch (err) {
      console.error('Session expired or invalid:', err);
      logout();
    } finally {
      setLoading(false);
    }
  };

  const login = async (email, password) => {
    const res = await axios.post('/api/auth/login', { email, password });
    if (res.data.success) {
      localStorage.setItem('scheme_sathi_token', res.data.token);
      axios.defaults.headers.common['Authorization'] = `Bearer ${res.data.token}`;
      setToken(res.data.token);
      setUser(res.data.user);
      return res.data;
    }
  };

  const register = async (userData) => {
    const res = await axios.post('/api/auth/register', userData);
    if (res.data.success) {
      localStorage.setItem('scheme_sathi_token', res.data.token);
      axios.defaults.headers.common['Authorization'] = `Bearer ${res.data.token}`;
      setToken(res.data.token);
      setUser(res.data.user);
      return res.data;
    }
  };

  const logout = () => {
    localStorage.removeItem('scheme_sathi_token');
    delete axios.defaults.headers.common['Authorization'];
    setToken(null);
    setUser(null);
  };

  const toggleSaveScheme = async (schemeId) => {
    if (!user) return false;
    try {
      const res = await axios.post(`/api/auth/save-scheme/${schemeId}`);
      if (res.data.success) {
        setUser(prev => ({
          ...prev,
          savedSchemes: res.data.savedSchemes
        }));
        return res.data.saved;
      }
    } catch (err) {
      console.error('Error toggling scheme bookmark:', err);
    }
    return false;
  };

  const isSchemeSaved = (schemeId) => {
    if (!user || !user.savedSchemes) return false;
    return user.savedSchemes.some(s => (s._id || s) === schemeId);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        loading,
        login,
        register,
        logout,
        toggleSaveScheme,
        isSchemeSaved,
        refreshUser: fetchCurrentUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
