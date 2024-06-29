import React from 'react'
import "./Events.css"
import { Container } from '@mui/material'
import EventsList from '../components/Events/List';
import PageTitle from '../components/PageTitle/PageTitle';

const Events = () => {
  return (
    <Container fixed>
      <PageTitle heading="Events" subheading=""/>
      <EventsList />
    </Container>
  )
}

export default Events