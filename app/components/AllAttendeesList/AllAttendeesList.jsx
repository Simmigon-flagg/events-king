"use client"
import React, { useContext } from "react";
import { SpeakersContext } from "@/context/SpeakersContext";
import SearchBar from "../SearchBar/SearchSpeakers";
import { UsersContext } from "@/context/UsersContext";
import { Skeleton } from "@mui/material";


const AllSpeakersList = () => {
  const { users } = useContext(UsersContext)

  return (
    <>
      {users ? <SearchBar items={users.users.filter(user => user.role === "attendee")} /> : <Skeleton />}
    </>
  );
};
export default AllSpeakersList;
