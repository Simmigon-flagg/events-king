import React from "react";
import SearchSpeakers from "../SearchBar/SearchSpeakers";

const getSpeakers = async () => {
  try {
    const response = await fetch("http://localhost:3000/api/speakers", {
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

const SpeakersList = async () => {
  const speakersData = await getSpeakers();

  return (
    <>
      <SearchSpeakers items={speakersData.speakers} />
    </>
  );
};
export default SpeakersList;
