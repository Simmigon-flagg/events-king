import Link from 'next/link'
import React from 'react'
import RemoveEvent from '../Events/RemoveEvent'
import { FaEdit } from 'react-icons/fa'
import SearchBar from '../SearchBar/SearchBar'
const getTopics = async () => {
  try {
    const response = await fetch("http://localhost:3000/api/topics", {
      cache: "no-store"
    })
    if (!response.ok) {
      throw new Error("Failed to fetch topics")
    }
    return response.json();
  } catch (error) {
    console.log("Error loading topics: ", error);
  }
}
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
  const { topics } = await getTopics();
  return (
    <>
      <div>Topics List</div>

      <SearchBar items={topics} />
      <hr />
      <div>Events List</div>
      {events.map(events => {
        return (

          <div key={events._id}>
            <Link href={`/eventdetails/${events._id}`}>
              <h2>{events.title}</h2>
            </Link>

            <p>{events.desc}</p>
            <RemoveEvent id={events._id} />
            <Link href={`/editevent/${events._id}`}>
              <FaEdit />
            </Link>
          </div>)
      })}
    </>

  )
}

export default EventsList