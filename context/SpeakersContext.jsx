'use client'
import React, { useState, useEffect, createContext } from 'react';
import { nanoid } from 'nanoid';
import { signOut, getSession } from 'next-auth/react';

const id = nanoid();

const initialValues = {
  firstname: "",
  lastname: "",
  email: "",
  title: "",
  phone: "",
  aboutme: "",
  company: "",
  presentation: "",
  description: ""
}

export const SpeakersContext = createContext(initialValues);

export const SpeakersContextProvider = ({ children }) => {

  const [speakers, setSpeakers] = useState({})
  useEffect(() => {
    const fetchData = async () => {
      const data = await getSession()
      const speakerData = await fetch(`/api/speakers/${data.speaker.id}`)
      const speakerJson = await speakerData.json()

      setSpeakers((prev) => ({
        ...prev,
        speaker: speakerJson.speaker
      }
      ))
    }
    fetchData()
  }, [])


  const userEvents = (events) => {
    console.log(events)
  }

  const handleRemove = async (event_id) => {
    // alert("Removed Id " + event_id)
    console.log(speakers?.speaker?.events)
    const removedId = speakers?.speaker?.events.filter((id) => id !== event_id)


    console.log(speakers?.speaker)
    const remove = await fetch(`/api/speakers/${speakers?.speaker?._id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ events: removedId })
    })

    const data = await remove.json()
    console.log(data)
    setSpeakers(prev => ({
      ...prev,
      speaker: {
        ...prev.speaker,
        events: data.editedUser.events
      }
    }))

  }

  const contextValue = { speakers, setSpeakers, userEvents, signOutUser, handleRemove };
  return (
    <SpeakersContext.Provider value={contextValue}>
      {children}
    </SpeakersContext.Provider>
  )
}

export default SpeakersContextProvider