"use client"
import React, { useContext } from "react";
import SearchTopics from '../SearchBar/SearchTopics'
import { AllTopicsContext } from "@/context/AllTopics";

const AllTopicsList = () => {
  const { topics } = useContext(AllTopicsContext)

  return (
    <>
      {topics ? <SearchTopics items={topics.topics} /> : <Skeleton />}

    </>
  );
};
export default AllTopicsList;
