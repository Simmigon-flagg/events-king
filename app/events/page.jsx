import React from 'react'
import "./Events.css"
import { Container } from '@mui/material'
import EventsForm from '../components/Forms/EventsForm';
import EventsList from '../components/Events/List';
const Events = () => {
  return (
    <Container fixed>
      <EventsForm />
      <div>Events</div>
      <EventsList />
    </Container>
  )
}

export default Events