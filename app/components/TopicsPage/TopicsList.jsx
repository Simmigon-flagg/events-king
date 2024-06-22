import React from 'react'

import SearchTopics from '../SearchBar/SearchTopics'

const getTopics = async () => {
  try {
    const response = await fetch("http://localhost:3000/api/topics", {
      cache: "no-store"
    })
    if (!response.ok) {
      throw new Error("Failed to fetch topics")
    }
    return await response.json();
  } catch (error) {
    console.log("Error loading topics: ", error);
  }
}

const TopicsList = async () => {
 
  const { topics } = await getTopics();

  return (
    <>
      <SearchTopics items={topics} />
    </>

  )
}

export default TopicsList