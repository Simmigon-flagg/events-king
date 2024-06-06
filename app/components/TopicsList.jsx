import Link from 'next/link'
import React from 'react'
import RemoveBtn from './Buttons/RemoveBtn'
import { FaEdit } from 'react-icons/fa'
import SearchBar from './SearchBar/SearchBar'
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
      throw new Error("Failed to fetch topics")
    }
    return response.json();
  } catch (error) {
    console.log("Error loading topics: ", error);
  }
}
const TopicsList = async () => {
  const { topics } = await getTopics();
  const { events } = await getEvents();
  return (
    <>
      <div>Events List</div>
      <SearchBar items={events} />
      <hr />
      <div>Topics List</div>
      {topics.map(topic => {
        return (<div key={topic._id}>
          <Link href={`/topicdetails/${topic._id}`}>
            <h2>{topic.title}</h2>
          </Link>
          <p>{topic.desc}</p>
          <RemoveBtn id={topic._id} />
          <Link href={`/edittopic/${topic._id}`}>
            <FaEdit />
          </Link>
        </div>)
      })}
    </>

  )
}

export default TopicsList