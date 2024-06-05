import Link from 'next/link';
import React from 'react'
import SearchBar from '../SearchBar/SearchBar';
// const getTopics = async () => {
//   try {
//     const response = await fetch("http://localhost:3000/api/topics", {
//       cache: "no-store"
//     })
//     if (!response.ok) {
//       throw new Error("Failed to fetch topics")
//     }
//     return response.json();
//   } catch (error) {
//     console.log("Error loading topics: ", error);
//   }
// }
const SearchTopics = () => {
  // const { topics } = await getTopics();
  return (
    <>
      <br />
      <div>Topics List</div>
      <SearchBar />
      {/* {topics.map(topic => {
          return (<div key={topic._id }>
            <Link href={`/topicDetails/${topic._id}`}> <h2>{topic.title}</h2></Link>
          <p>{topic.desc}</p>         
        </div>)
      })} */}
    </>

  )
}

export default SearchTopics