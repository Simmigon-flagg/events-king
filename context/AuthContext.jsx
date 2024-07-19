'use client';

import React, { useState, useEffect, createContext } from 'react';
import { nanoid } from 'nanoid';
import { signOut, getSession } from 'next-auth/react';

const id = nanoid();

const initialValues = {};

export const AuthContext = createContext(initialValues);

export const AuthContextProvider = ({ children }) => {
  const [auth, setAuth] = useState({});

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const session = await getSession();
        if (session) {
          const response = await fetch(`/api/users/${session.user.id}`);
          const userData = await response.json();
          setAuth(userData);
        }
      } catch (error) {
        console.error('Failed to fetch user data:', error);
      }
    };
    fetchUserData();
  }, []);

  const signOutUser = async () => {
    try {
      await signOut();
      setAuth({});
    } catch (error) {
      console.error('Failed to sign out:', error);
    }
  };

  const reloadUsers = async () => {
    try {
      const session = await getSession();
      if (session) {
        const response = await fetch(`/api/users/${session.user.id}`);
        const data = await response.json();
        setAuth(data);
      }
    } catch (error) {
      console.error('Failed to reload user data:', error);
    }
  };

  const createUser = async (data) => {
    try {
      const session = await getSession();
      if (session) {
        await fetch(`/api/users/${session.user.id}`, {
          method: 'POST',
          headers: {
            'Content-type': 'application/json',
          },
          body: JSON.stringify(data),
        });
        await reloadUsers();
      }
    } catch (error) {
      console.error('Failed to create user:', error);
    }
  };

  const updateUser = async (edit) => {
    try {
      const session = await getSession();
      if (session) {
        const response = await fetch(`/api/users/${session.user.id}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ user: edit }),
        });
        if (!response.ok) {
          throw new Error('User was not updated');
        }
        alert('User updated!');
        await reloadUsers();
      }
    } catch (error) {
      console.error('Failed to update user:', error);
    }
  };

  const deleteUser = async (ids) => {
    try {
      await Promise.all(
        ids.map((id) => fetch(`/api/users?id=${id}`, { method: 'DELETE' }))
      );
      await reloadUsers();
    } catch (error) {
      console.error('Failed to delete users:', error);
    }
  };

  useEffect(() => {
    reloadUsers();
  }, []);

  const contextValue = { auth, setAuth, signOutUser, createUser, updateUser, deleteUser };

  return (
    <AuthContext.Provider value={contextValue}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContextProvider;
