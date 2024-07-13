"use client"
import React, { useContext } from "react";

import { AllUsersContext } from "@/context/AllUsersContext";

const AllUsersList =  () => {
  const { allUsers } = useContext(AllUsersContext)
  
  return (
    <>
     {JSON.stringify(allUsers)}
    </>
  );
};
export default AllUsersList;
