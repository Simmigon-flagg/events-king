"use client"
import React, { useContext } from "react";
import { AllEventsContext } from "@/context/AllEvents";
import SearchBar from "../SearchBar/SearchEvents";

const AllEventsList = () => {
  const { events } = useContext(AllEventsContext)

  return (
    <>
      {events ? <SearchBar items={events} /> : <Skeleton />}
    </>
  );
};
export default AllEventsList;
