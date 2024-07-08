'use client'
import React, { useState, useEffect, createContext } from 'react';
import { nanoid } from 'nanoid';
import { signOut, getSession } from 'next-auth/react';

const id = nanoid();

const initialValues = {
  id: id,
  firstName: "",
  lastName: "",
  email: ""
}

export const UsersContext = createContext({});

export const UsersContextProvider = ({ children }) => {

  const [users, setUsers] = useState({})
  useEffect(() => {
    const fetchData = async () => {
      const data = await getSession()
      const userData = await fetch(`/api/users/${data.user.id}`)
      const userJson = await userData.json()

      setUsers((prev) => ({
        ...prev,
        user: userJson.user
      }
      ))
    }
    fetchData()
  }, [])

  const signOutUser = async () => {
    const data = await signOut()
    console.log(data)
  }
  const userEvents = (events) => {
    console.log(events)
  }

  const handleRemove = async (event_id) => {
   // alert("Removed Id "+ event_id)
    // console.log(users?.user?.events)
    const removedId = users?.user?.events.filter((id) => id !== event_id)
  

    console.log(users?.user)
    const remove = await fetch(`/api/users/${users?.user?._id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ events: removedId })
    })
    
    const data = await remove.json()
    console.log(data)
      setUsers(prev => ({
      ...prev,
      user: {
        ...prev.user,
        events: data.editedUser.events
      }
    }))
  
  }

  const contextValue = { users, setUsers, userEvents, signOutUser, handleRemove };
  return (
    <UsersContext.Provider value={contextValue}>
      {children}
    </UsersContext.Provider>
  )
}

export default UsersContextProvider