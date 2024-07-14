'use client';

import React, { useState, useEffect, createContext } from 'react';
import { nanoid } from 'nanoid';
import { signOut, getSession } from 'next-auth/react';

const id = nanoid();

const initialValues = {

};

export const AllTopicsContext = createContext(initialValues);

export const AllTopicsContextProvider = ({ children }) => {
  const [topics, setTopics] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      try {
        const session = await getSession();
        if (session) {
          const response = await fetch(`/api/topics`);
          const data = await response.json();
          setTopics(data)
        }
      } catch (error) {
        console.error('Failed to fetch user data:', error);
      }
    };
    fetchData();
  }, []);


  const contextValue = { topics, setTopics };

  return (
    <AllTopicsContext.Provider value={contextValue}>
      {children}
    </AllTopicsContext.Provider>
  );
};

export default AllTopicsContextProvider;
