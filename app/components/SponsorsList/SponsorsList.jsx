import React from "react";
import SearchSpeakers from "../SearchBar/SearchSpeakers";

const getSpeakers = async () => {
  try {
    const response = await fetch("http://localhost:3000/api/users", {
      cache: "no-store",
    });
    if (!response.ok) {
      throw new Error("Failed to fetch speakers");
    }
    return await response.json();
  } catch (error) {
    console.log("Error loading speakers: ", error);
  }
};

const SponsorsList = async () => {
  const speakersData = await getSpeakers();
  const usersData = speakersData.users.filter(user => user.role === "sponsor" )
  
  return (
    <>
      <SearchSpeakers items={usersData} />
    </>
  );
};
export default SponsorsList;
