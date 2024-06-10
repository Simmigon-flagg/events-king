'use client'
import React, { useState } from 'react'
import { Button } from '@mui/joy'
import { DatePicker, LocalizationProvider, TimePicker } from '@mui/x-date-pickers';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs from 'dayjs';
import { useRouter } from 'next/navigation';
// import TopicsContext from '@/context/TopicsContext'

const EventsForm = () => {
  // const { handleEdit } = useContext(TopicsContext);
  const router = useRouter()
  const [formData, setFormData] = useState({
    title: "",
    desc: "",
    speaker: "",
    date: "",
    time: "",
    location: "",
  });
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleDateChange = (date) => {
    setFormData(prev => ({
      ...prev,
      date: date ? date.format('YYYY-MM-DD') : null
    }));
  };

  const handleTimeChange = (time) => {
    setFormData(prev => ({
      ...prev,
      time: time ? time.format('HH:mm') : null
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // TODO: Empty text boxes needs handling
    // alert(JSON.stringify(formData));
    try {
      const response = await fetch("http://localhost:3000/api/events",
        {
          method: "POST",
          headers: {
            "Content-type": "application/json"
          },
          body: JSON.stringify(formData)

        }
      )
      if (response.ok) {

        setFormData({
          title: "",
          desc: "",
          speaker: "",
          date: "",
          time: "",
          location: ""
        })
        router.refresh()
      } else {
        throw new Error("Failed to create a topic")
      }
    } catch (error) {
      console.log(error);
    }


  }
  return (
    <div>
      <div>
        <input type="text" onChange={handleChange} value={formData.title} name="title" placeholder='title' />
        <input type="text" onChange={handleChange} value={formData.desc} name="desc" placeholder='desc' />
        <input type="text" onChange={handleChange} value={formData.speaker} name="speaker" placeholder='speaker' />
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DemoContainer components={['DatePicker']}>
            <DatePicker
              label="Basic date picker"
              value={formData.date ? dayjs(formData.date) : null}
              onChange={handleDateChange}
            />
          </DemoContainer>
        </LocalizationProvider>

        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DemoContainer components={['TimePicker']}>
            <TimePicker
              label="Basic time picker"
              value={formData.time ? dayjs(formData.time, 'HH:mm') : null}
              onChange={handleTimeChange}
            />
          </DemoContainer>
        </LocalizationProvider>
        <input type="text" onChange={handleChange} value={formData.location} name="location" placeholder='location' />
      </div>
      <div style={{ marginTop: 30 }}>
        <Button style={{ backgroundColor: "green" }} onClick={handleSubmit}>Add Event</Button>
      </div>
      <div>
        {/* <RemoveBtn /> */}
        {/* <FaEdit onClick={handleEdit}/> */}
      </div>
    </div>
  )
}

export default EventsForm