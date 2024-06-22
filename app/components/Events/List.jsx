import React from 'react'
import SearchEvents from '../SearchBar/SearchEvents'

const getEvents = async () => {
  try {
    const response = await fetch("http://localhost:3000/api/events", {
      cache: "no-store"
    })
    if (!response.ok) {
      throw new Error("Failed to fetch events")
    }
    return response.json();
  } catch (error) {
    console.log("Error loading events: ", error);
  }
}
const EventsList = async () => {
  const { events } = await getEvents();

  return (
    <>
      <SearchEvents items={events}/>
    </>

  )
}

export default EventsList