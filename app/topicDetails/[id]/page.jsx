import { Button, Input } from '@mui/material';
import React from 'react'
const getTopicById = async (id) => {
  try {
    const res = await fetch(`http://localhost:3000/api/topics/${id}`, {
      cache: "no-store",
    });
    if (!res.ok) {
      throw new Error("Failed to fetch topic");
    }


    return res.json();
  } catch (error) {
    console.log(error);
  }
};

const TopicsDetails = async ({ params }) => {
  const { id } = params;
  const { topic } = await getTopicById(id);
  return (
    <>
      <div>topicDetails {topic._id}</div>
      <div>topicDetails {topic.title}</div>
      <div>topicDetails {topic.date}</div>
      <div>topicDetails {topic.time}</div>
      <div>topicDetails {topic.location}</div>
      <div>topicDetails {topic.host}</div>
      <div>topicDetails {topic.description}</div>

    </>
  )
}

export default TopicsDetails