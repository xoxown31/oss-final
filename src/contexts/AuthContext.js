
import React, { createContext, useState, useContext, useEffect } from 'react';
import { login as apiLogin, updateUser } from '../api';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check for a logged-in user in localStorage on initial load
    const storedUser = localStorage.getItem('bookend-user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setLoading(false);
  }, []);

  // Effect to keep localStorage in sync with the user state
  useEffect(() => {
    if (user) {
      localStorage.setItem('bookend-user', JSON.stringify(user));
    } else {
      localStorage.removeItem('bookend-user');
    }
  }, [user]);

  const login = async (username, password) => {
    try {
      const userData = await apiLogin(username, password);
      localStorage.setItem('bookend-user', JSON.stringify(userData));
      setUser(userData);
    } catch (error) {
      console.error('Login failed:', error);
      throw error;
    }
  };

  const logout = () => {
    localStorage.removeItem('bookend-user');
    setUser(null);
  };

  const dismissTutorial = async () => {
    if (user && user.isNewUser) {
      try {
        const updatedUser = { ...user, isNewUser: false };
        await updateUser(user.id, updatedUser);
        setUser(updatedUser);
        localStorage.setItem('bookend-user', JSON.stringify(updatedUser));
      } catch (error) {
        console.error("Failed to update user's new status", error);
      }
    }
  };

  const isAuthenticated = !!user;

  const value = { user, setUser, isAuthenticated, login, logout, loading, dismissTutorial };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
