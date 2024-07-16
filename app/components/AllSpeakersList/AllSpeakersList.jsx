"use client"
import React, { useContext } from "react";
import { SpeakersContext } from "@/context/SpeakersContext";
import SearchBar from "../SearchBar/SearchSpeakers";

const AllSpeakersList = () => {
  const { speakers } = useContext(SpeakersContext)
  
  return (
    <>
      {speakers ? <SearchBar items={speakers.speakers} /> : <Skeleton />}
    </>
  );
};
export default AllSpeakersList;
