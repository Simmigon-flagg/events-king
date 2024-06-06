'use client'
import React, { useState } from 'react'
import { Button } from '@mui/joy'
// import TopicsContext from '@/context/TopicsContext'

const EventsForm = () => {
  // const { handleEdit } = useContext(TopicsContext);
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
        <input type="text" onChange={handleChange} value={formData.date} name="date" placeholder='date' />
        <input type="text" onChange={handleChange} value={formData.time} name="time" placeholder='time' />
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