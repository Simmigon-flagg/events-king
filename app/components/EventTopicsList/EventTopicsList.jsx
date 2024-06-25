"use client"
import React, { useState } from 'react'

const EventTopicsList = ({ eventTopic }) => {
    const [events, setEvents] = useState(eventTopic)
    const view = events.map((topic) => (<div key={topic?._id}>{topic?.title}<button onClick={() => alert(topic._id)}>Delete</button></div>))
    return (
        <>
            {view}
        </>
    )
}

export default EventTopicsList