"use client"
import React, { useContext } from "react";
import { AllEventsContext } from "@/context/AllEvents";

const AllEventsList =  () => {
  const { events } = useContext(AllEventsContext)
  
  return (
    <>
     {JSON.stringify(events)}
    </>
  );
};
export default AllEventsList;
