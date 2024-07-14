"use client"
import React, { useContext } from "react";
import { SpeakersContext } from "@/context/SpeakersContext";

const AllSpeakersList = () => {
  const { speakers } = useContext(SpeakersContext)
  // const usersData = speakersData.users.filter(user => user.role === "speaker" )
  
  return (
    <>
       {JSON.stringify(speakers)}
    </>
  );
};
export default AllSpeakersList;
