"use client"
import React, { useContext } from "react";
import { AllEventsContext } from "@/context/AllEvents";

const AllEventsList =  () => {
  const { allEvents } = useContext(AllEventsContext)
  
  return (
    <>
     {JSON.stringify(allEvents)}
    </>
  );
};
export default AllEventsList;
