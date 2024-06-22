import React from 'react'
import "./Events.css"
import { Container } from '@mui/material'
import EventsForm from '../components/Forms/EventsForm';
import EventsList from '../components/Events/List';
import EventFormDialog from '../components/Dialogs/EventFormDialog';
import PageTitle from '../components/PageTitle/PageTitle';
const Events = () => {
  return (
    <Container fixed>
      <PageTitle heading="Events" subheading=""/>
  
      
      {/* <EventsForm /> */}

      <EventsList />
    </Container>
  )
}

export default Events