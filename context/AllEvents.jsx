'use client';

import React, { useState, useEffect, createContext } from 'react';
import { nanoid } from 'nanoid';
import { signOut, getSession } from 'next-auth/react';


const id = nanoid();

const initialValues = {

};

export const AllEventsContext = createContext(initialValues);

export const AllEventsContextProvider = ({ children }) => {
  const [events, setEvents] = useState({});
  
  const reloadEvents = async () => {
    const fetchData = async () => {
      try {

        const response = await fetch(`/api/events`);
        const data = await response.json();
        setEvents(data)

      } catch (error) {
        console.error('Failed to fetch user data:', error);
      }
    };
    fetchData();
  };

  useEffect(() => {
    const fetchData = async () => {
      try {

        const response = await fetch(`/api/events`);
        const data = await response.json();
        setEvents(data)

      } catch (error) {
        console.error('Failed to fetch user data:', error);
      }
    };
    fetchData();
  }, []);

  const createEvent = async (data) => {

    try {

      const res = await fetch(`/api/events`, {
        method: 'POST',
        body: data
      });
      if (res.ok) {
        const json = await res.json();
        console.log()
        setEvents((event) => ({
          ...event,
          ...json.savedEvent
        }));
        await reloadEvents(); // Reload events after creating a new event
        
        console.log("Event successfully added.");
      } else {
        throw new Error("Failed to add Event.");
      }
    } catch (error) {
      console.error("Error adding Event:", error);
    }
  };

  const updateEvent = async (edit) => {

    try {
      const response = await fetch(`/api/events/${edit.id}`,
        {
          method: "PUT",
          header: { "Content-type": "application/json" },
          body: JSON.stringify(edit),
        }
      );
      if (!response.ok) {
        throw new Error("Event was not updated");
      }
      await reloadEvents()

    } catch (error) {
      console.log(error);
    }
  };

  const deleteEvent = async (ids) => {

    try {
      await Promise.all(
        ids.map((id) => {
          fetch(`/api/events?id=${id}`, { method: "DELETE" });
        })
      );
      alert("Item(s) deleted successfully!");
      await reloadEvents(); // Reload events after creating a new event
    } catch (error) {
      alert("Failed to delete items");
      console.error(error);
    }
  };
  



  useEffect(() => {
    reloadEvents();
  }, []);

  const contextValue = { events, setEvents, createEvent, updateEvent, deleteEvent };

  return (
    <AllEventsContext.Provider value={contextValue}>
      {children}
    </AllEventsContext.Provider>
  );
};

export default AllEventsContextProvider;
