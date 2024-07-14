"use client"
import React, { useContext } from "react";

import { AllTopicsContext } from "@/context/AllTopics";

const AllTopicsList =  () => {
  const { topics } = useContext(AllTopicsContext)
  
  return (
    <>
     {JSON.stringify(topics)}
    </>
  );
};
export default AllTopicsList;
