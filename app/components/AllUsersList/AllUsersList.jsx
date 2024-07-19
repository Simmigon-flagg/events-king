"use client"
import React, { useContext } from "react";

import { AllUsersContext } from "@/context/AllUsersContext";

import SearchBar from "../SearchBar/SearchSpeakers";
import { UsersContext } from "@/context/UsersContext";

const AllUsersList = () => {
  const { users } = useContext(UsersContext)

  return (
    <>
         {users ? <SearchBar items={users.users} /> : <Skeleton />}
    </>
  );
};
export default AllUsersList;
