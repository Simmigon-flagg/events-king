"use client"
import { useRouter } from 'next/navigation'
import React, { useState, useEffect } from 'react'

const EventTopicsList = ({ event, eventTopic }) => {
    const router = useRouter()
    const [topics, setTopics] = useState(eventTopic)

    const handleDeleteTopic  = async (topic_id) => {
        const removedTopic = await topics.filter((topic) => topic._id !== topic_id)
        setTopics([...removedTopic])
        console.log(removedTopic)
        try {
            // Replace the URL with your API endpoint
            const response = await fetch(`/api/events/${event._id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ topics: removedTopic }),
            });

            if (!response.ok) {
                throw new Error('Failed to update event topics');
            }

            const updatedEvent = await response.json();
            console.log(updatedEvent)
            setTopics(updatedEvent.editedEvent.topics); // Optional: Update topics with the response from the server
            router.refresh()
        } catch (error) {
            console.error('Error updating event topics:', error);
        }
    }
    // Effect to update topics when event or eventTopic changes


    const view = topics?.map((topic) => (
        <div key={topic?._id}>
            Title: {topic?.title}<br />
            Host:{topic?.host}<br />
            <button
                onClick={() => handleDeleteTopic(topic._id)}>Delete
            </button>
            <hr />
        </div>))
    return (
        <>
            {view}
        </>
    )
}

export default EventTopicsList