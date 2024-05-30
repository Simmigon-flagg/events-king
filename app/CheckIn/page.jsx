import React from 'react'
import Form from '../components/Forms/AttendeeForm'
import AttendeesList from '../components/AttendeesList/AttendeesList'
import "./CheckIn.css"

const CheckIn = () => {
  return (
    <div>
        <Form />
        <AttendeesList />
    </div>
  )
}

export default CheckIn