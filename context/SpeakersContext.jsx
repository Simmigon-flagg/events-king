'use client';

import React, { useState, useEffect, createContext } from 'react';
import { nanoid } from 'nanoid';
import { signOut, getSession } from 'next-auth/react';

const id = nanoid();

const initialValues = {

};

export const SpeakersContext = createContext(initialValues);

export const SpeakersContextProvider = ({ children }) => {
  const [speakers, setSpeakers] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      try {
        const session = await getSession();
        if (session) {
          const response = await fetch(`/api/users`);
          const speakerData = await response.json();
          const speakers = speakerData.users.filter(speaker => speaker.role === "speaker")
          
          setSpeakers({ speakers })
        }
      } catch (error) {
        console.error('Failed to fetch user data:', error);
      }
    };
    fetchData();
  }, []);

  const signOutUser = async () => {
    try {
      await signOut();
      setSpeakers({});
    } catch (error) {
      console.error('Failed to sign out:', error);
    }
  };


  const contextValue = { speakers, setSpeakers };

  return (
    <SpeakersContext.Provider value={contextValue}>
      {children}
    </SpeakersContext.Provider>
  );
};

export default SpeakersContextProvider;
