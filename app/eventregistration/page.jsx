import React from 'react'
import SearchEvents from '@/app/components/SearchBar/SearchEvents'
import { Button } from '@mui/joy'

const getEvents = async () => {
    try {
        const response = await fetch("http://localhost:3000/api/events", {
            cache: "no-store"
        })
        if (!response.ok) {
            throw new Error("Failed to fetch events")
        }
        return response.json();
    } catch (error) {
        console.log("Error loading events: ", error);
    }
}

const EventSignUp = async () => {
    const { events } = await getEvents();    

    return (
        <div>
            
           <Button>Attendees</Button>
           <Button>Speakers</Button>
           <Button>Sponsors</Button>
        </div>
    )
}

export default EventSignUp