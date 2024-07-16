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

  const reloadTopics = async () => {
    const fetchData = async () => {
      try {

        const response = await fetch(`/api/topics`);
        const data = await response.json();
        setTopics(data)

      } catch (error) {
        console.error('Failed to fetch user data:', error);
      }
    };
    fetchData();
  };

  useEffect(() => {
    const fetchData = async () => {
      try {

        const response = await fetch(`/api/topics`);
        const data = await response.json();
        setTopics(data)

      } catch (error) {
        console.error('Failed to fetch user data:', error);
      }
    };
    fetchData();
  }, []);

  const createTopic = async (data) => {


    const response = await fetch("http://localhost:3000/api/topics", {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(data),
    });
    await reloadTopics()
  };

  const updateTopic = async (edit) => {

    try {
      const response = await fetch(`/api/topics/${edit.id}`,
        {
          method: "PUT",
          header: { "Content-type": "application/json" },
          body: JSON.stringify(edit),
        }
      );
      if (!response.ok) {
        throw new Error("Topic was not updated");
      }
      await reloadTopics()

    } catch (error) {
      console.log(error);
    }
  };

  const deleteTopic = async (ids) => {
    console.log(ids)
    try {
      await Promise.all(
        ids.map((id) => {
          fetch(`/api/topics?id=${id}`, { method: "DELETE" });
        })
      );


    } catch (error) {
      alert("Failed to delete items");
      console.error(error);
    }

    await reloadTopics()
  };

  useEffect(() => {
    reloadTopics();
  }, []);

  const contextValue = { topics, setTopics, createTopic, updateTopic, deleteTopic };

  return (
    <AllTopicsContext.Provider value={contextValue}>
      {children}
    </AllTopicsContext.Provider>
  );
};

export default AllTopicsContextProvider;
