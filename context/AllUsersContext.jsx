'use client';

import React, { useState, useEffect, createContext } from 'react';
import { nanoid } from 'nanoid';
import { signOut, getSession } from 'next-auth/react';

const id = nanoid();

const initialValues = {
  firsr: "sdfs"
};

export const AllUsersContext = createContext(initialValues);

export const AllUsersContextProvider = ({ children }) => {
  const [allUsers, setAllUsers] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      try {
        const session = await getSession();
        console.log(session)
        if (session) {
          const response = await fetch(`/api/users`);
          const userData = await response.json();
          console.log(userData)
          setAllUsers(userData);
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
      setAllUsers({});
    } catch (error) {
      console.error('Failed to sign out:', error);
    }
  };

  

  const handleRemove = async (event_id) => {
    if (!users?.user?.events) {
      console.error('No events found to remove');
      return;
    }

    const updatedEvents = users.user.events.filter(id => id !== event_id);

    try {
      const response = await fetch(`/api/users/${users.user._id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ events: updatedEvents })
      });

      const data = await response.json();
      setAllUsers(prev => ({
        ...prev,
        user: {
          ...prev.user,
          events: data.editedUser.events
        }
      }));
    } catch (error) {
      console.error('Failed to update user events:', error);
    }
  };
  const handleSave = async (user_id) => {

    try {
      const response = await fetch(`/api/users/${user_id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(users)
      });

      const data = await response.json();
 
    } catch (error) {
      console.error('Failed to update user events:', error);
    }
  };

  const contextValue = { allUsers, setAllUsers };

  return (
    <AllUsersContext.Provider value={contextValue}>
      {children}
    </AllUsersContext.Provider>
  );
};

export default AllUsersContextProvider;
