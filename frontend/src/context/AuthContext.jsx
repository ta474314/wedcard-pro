import React, { createContext, useState, useContext, useEffect } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [token, setToken] = useState(localStorage.getItem('token'));

  const API_URL = 'http://localhost:5000/api';

  // Set axios default header
  if (token) {
    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  }

  useEffect(() => {
    if (token) {
      fetchUser();
    } else {
      setLoading(false);
    }
  }, [token]);

  const fetchUser = async () => {
    try {
      const response = await axios.get(`${API_URL}/auth/me`);
      if (response.data.success) {
        setUser(response.data.data);
      }
    } catch (error) {
      console.error('Error fetching user:', error);
      localStorage.removeItem('token');
      setToken(null);
      delete axios.defaults.headers.common['Authorization'];
    } finally {
      setLoading(false);
    }
  };

  const register = async (name, email, password, phone) => {
    try {
      console.log('📝 Registering user:', { name, email });
      
      const response = await axios.post(`${API_URL}/auth/register`, {
        name,
        email,
        password,
        phone: phone || ''
      });
      
      console.log('✅ Registration response:', response.data);
      
      if (response.data.success) {
        const { token, ...userData } = response.data.data;
        localStorage.setItem('token', token);
        setToken(token);
        axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
        setUser(userData);
        toast.success('🎉 Registration successful! Welcome to WedCard Pro!');
        return true;
      }
      return false;
    } catch (error) {
      console.error('❌ Registration error:', error.response?.data || error.message);
      const errorMsg = error.response?.data?.message || 'Registration failed. Please try again.';
      toast.error(errorMsg);
      return false;
    }
  };

  const login = async (email, password) => {
    try {
      console.log('🔐 Logging in user:', { email });
      
      const response = await axios.post(`${API_URL}/auth/login`, {
        email,
        password
      });
      
      console.log('✅ Login response:', response.data);
      
      if (response.data.success) {
        const { token, ...userData } = response.data.data;
        localStorage.setItem('token', token);
        setToken(token);
        axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
        setUser(userData);
        toast.success('✨ Login successful! Welcome back!');
        return true;
      }
      return false;
    } catch (error) {
      console.error('❌ Login error:', error.response?.data || error.message);
      const errorMsg = error.response?.data?.message || 'Login failed. Please check your credentials.';
      toast.error(errorMsg);
      return false;
    }
  };

  // ============= LOGOUT FUNCTION =============
  const logout = async () => {
    try {
      // Optional: Call backend logout API to blacklist token
      if (token) {
        await axios.post(`${API_URL}/auth/logout`, {}, {
          headers: { Authorization: `Bearer ${token}` }
        });
      }
    } catch (error) {
      console.error('Backend logout error:', error);
    } finally {
      // Clear all local storage data
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      
      // Clear session storage if used
      sessionStorage.clear();
      
      // Remove axios authorization header
      delete axios.defaults.headers.common['Authorization'];
      
      // Clear state
      setToken(null);
      setUser(null);
      
      // Show success message
      toast.success('👋 Logged out successfully!');
      
      // Optional: Clear any cached data
      window.location.href = '/login';
    }
  };
  // ===========================================

  return (
    <AuthContext.Provider value={{ user, login, register, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};