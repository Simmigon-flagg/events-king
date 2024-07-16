"use client"
import React, { useContext } from "react";

import { AllUsersContext } from "@/context/AllUsersContext";

import SearchBar from "../SearchBar/SearchSpeakers";

const AllUsersList = () => {
  const { users } = useContext(AllUsersContext)

  return (
    <>
         {users ? <SearchBar items={users.users} /> : <Skeleton />}
    </>
  );
};
export default AllUsersList;
