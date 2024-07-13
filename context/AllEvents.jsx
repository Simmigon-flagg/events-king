'use client';

import React, { useState, useEffect, createContext } from 'react';
import { nanoid } from 'nanoid';
import { signOut, getSession } from 'next-auth/react';

const id = nanoid();

const initialValues = {

};

export const AllEventsContext = createContext(initialValues);

export const AllEventsContextProvider = ({ children }) => {
  const [allEvents, setAllEvents] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      try {
        const session = await getSession();
        if (session) {
          const response = await fetch(`/api/events`);
          const data = await response.json();
          setAllEvents(data)
        }
      } catch (error) {
        console.error('Failed to fetch user data:', error);
      }
    };
    fetchData();
  }, []);


  const contextValue = { allEvents, setAllEvents };

  return (
    <AllEventsContext.Provider value={contextValue}>
      {children}
    </AllEventsContext.Provider>
  );
};

export default AllEventsContextProvider;
