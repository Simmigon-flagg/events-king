"use client"
import React, { createContext, useContext, useState } from 'react';

// Create a context to hold session data
const SessionContext = createContext();

// Custom hook to access session data
export function useSession() {
  return useContext(SessionContext);
}

// Provider component to manage session state
export function SessionProvider({ children }) {
  const [user, setUser] = useState(null);

  const login = (userData) => {
    setUser(userData);
  };

  const logout = () => {
    setUser(null);
  };

  return (
    <SessionContext.Provider value={{ user, login, logout }}>
      {children}
    </SessionContext.Provider>
  );
}
