import React, { createContext, useState, useEffect } from 'react';

const UserContext = createContext();

const ThemeProvider = ({ children }) => {
  const [user, setUser] = useState(null)

  useEffect(() => {
    const fetch = async () => {
      const user = await getSession()

      setUser(user?.user)
    }
    fetch()
  }, [])

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};

export { ThemeProvider, UserContext };
