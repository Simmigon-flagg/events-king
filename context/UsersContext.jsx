'use client';

import React, { useState, useEffect, createContext } from 'react';
import { nanoid } from 'nanoid';
import { signOut, getSession } from 'next-auth/react';

const id = nanoid();

const initialValues = {

};

export const UsersContext = createContext(initialValues);

export const UsersContextProvider = ({ children }) => {
  const [users, setUsers] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      try {
        const session = await getSession();
        if (session) {
          const response = await fetch(`/api/users/${session.user.id}`);
          const userData = await response.json();
          
          setUsers(prev => ({
            ...prev,
            user: userData.user
          }));
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
      setUsers({});
    } catch (error) {
      console.error('Failed to sign out:', error);
    }
  };

  const reloadUsers = async () => {
    const fetchData = async () => {
      try {

        const response = await fetch(`/api/users`);
        const data = await response.json();
        setUsers(data)

      } catch (error) {
        console.error('Failed to fetch user data:', error);
      }
    };
    fetchData();
  };

  useEffect(() => {
    const fetchData = async () => {
      try {

        const response = await fetch(`/api/users`);
        const data = await response.json();
        setUsers(data)

      } catch (error) {
        console.error('Failed to fetch user data:', error);
      }
    };
    fetchData();
  }, []);

  const createUser = async (data) => {


    const response = await fetch("/api/users", {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(data),
    });
    await reloadUsers()
  };

  const updateUser = async (edit) => {

    try {
      const response = await fetch(`/api/users/${edit.id}`,
        {
          method: "PUT",
          header: { "Content-type": "application/json" },
          body: JSON.stringify(edit),
        }
      );
      if (!response.ok) {
        throw new Error("Topic was not updated");
      }
      await reloadUsers()

    } catch (error) {
      console.log(error);
    }
  };

  const deleteUser = async (ids) => {
    
    try {
      await Promise.all(
        ids.map((id) => {
          fetch(`/api/users?id=${id}`, { method: "DELETE" });
        })
      );


    } catch (error) {
      alert("Failed to delete items");
      console.error(error);
    }

    await reloadUsers()
  };

  useEffect(() => {
    reloadUsers();
  }, []);
  const contextValue = { users, setUsers, signOutUser, createUser, updateUser, deleteUser };

  return (
    <UsersContext.Provider value={contextValue}>
      {children}
    </UsersContext.Provider>
  );
};

export default UsersContextProvider;
