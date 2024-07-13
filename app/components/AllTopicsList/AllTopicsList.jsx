"use client"
import React, { useContext } from "react";

import { AllTopicsContext } from "@/context/AllTopics";

const AllTopicsList =  () => {
  const { allTopics } = useContext(AllTopicsContext)
  
  return (
    <>
     {JSON.stringify(allTopics)}
    </>
  );
};
export default AllTopicsList;
