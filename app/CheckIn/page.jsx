import React from 'react'
import Form from '../components/Forms/AttendeeForm'
import AttendeesList from '../components/AttendeesList/AttendeesList'
import "./CheckIn.css"
import { Container } from '@mui/material'

const CheckIn = () => {
  return (
    <Container fixed>

        <Form />
        <AttendeesList />
    
    </Container>
  )
}

export default CheckIn