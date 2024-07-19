'use client'
import { AllEventsContext } from '@/context/AllEvents'
import { Container } from '@mui/joy'
import React, { useContext } from 'react'

const KingEvents = () => {
  const {events} = useContext(AllEventsContext)
  
  return (
    <Container>

      
      <div>
      {events?.events?.map(event => (
        <div key={event._id} className="event-card">
          <h2>{event.title}</h2>
          <p><strong>Host:</strong> {event.host}</p>
          <p><strong>Date:</strong> {event.date}</p>
          <p><strong>Time:</strong> {event.time}</p>
          <p><strong>Location:</strong> {event.location}</p>
          <p><strong>Description:</strong> {event.description}</p>
          {event.image && (
            <img src={`path/to/images/${event.image}`} alt={event.title} />
          )}
          <p><strong>Topics:</strong> {event.topics.join(', ')}</p>
        </div>
      ))}
    </div>
 
    </Container>

  )
}

export default KingEvents