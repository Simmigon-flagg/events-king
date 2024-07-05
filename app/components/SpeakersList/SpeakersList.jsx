import React from 'react'
import Speaker from '../Speaker/Speaker';
import SearchSpeakers from '../SearchBar/SearchSpeakers'


const getSpeakers = async () => {
    try {
        const response = await fetch("http://localhost:3000/api/speakers", {
            cache: "no-store"
        })
        if (!response.ok) {
            throw new Error("Failed to fetch speakers")
        }
        return response.json();
    } catch (error) {
        console.log("Error loading speakers: ", error);
    }
}

const SpeakersList = async () => {
    const speakersData = await getSpeakers(); 
    console.log("SPEAKERS::::")   
    console.log(speakersData)
    return (
        <div>
            <SearchSpeakers items={speakersData.speakers} />
                    
            {speakersData?.speakers?.map(speaker => 
                <Speaker key={speaker?._id} speaker={speaker} />)}
        </div>
    )
}
export default SpeakersList