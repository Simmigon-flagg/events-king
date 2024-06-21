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
      <div>ID: {topic?._id}</div>
      <div>Title: {topic?.title}</div>
      <div>Date: {topic?.date}</div>
      <div>Time: {topic?.time}</div>
      <div>Location: {topic?.location}</div>
      <div>Host: {topic?.host}</div>
      <div>Description: {topic?.description}</div>

    </>
  )
}

export default TopicsDetails