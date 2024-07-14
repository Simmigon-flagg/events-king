"use client"
import React, { useContext } from "react";

import { AllUsersContext } from "@/context/AllUsersContext";

const AllUsersList =  () => {
  const { users } = useContext(AllUsersContext)
  
  return (
    <>
     {JSON.stringify(users)}
    </>
  );
};
export default AllUsersList;
