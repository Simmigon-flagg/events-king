import React from 'react'
import "./Events.css"
import { Container } from '@mui/material'
import EventsForm from '../components/Forms/EventsForm';
import EventsList from '../components/Events/List';
import EventFormDialog from '../components/Dialogs/EventFormDialog';
const Events = () => {
  return (
    <Container fixed>
      <div>Events</div>
  
      <EventFormDialog />
      {/* <EventsForm /> */}

      <EventsList />
    </Container>
  )
}

export default Events