import React from 'react'
import { Container } from '@mui/joy'
import PageTitle from '../../components/PageTitle/PageTitle'
import AttendeesList from '../../components/AttendeesList/AttendeesList'

const AttendeesPage = () => {
  return (
    <Container fixed>
        <PageTitle heading="Attendees"/>
        <AttendeesList />
    </Container >

)}

export default AttendeesPage