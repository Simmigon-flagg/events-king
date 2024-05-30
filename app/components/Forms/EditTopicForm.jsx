"use client"
import { Button } from '@mui/joy'
import React, { useState } from 'react'
import { useRouter } from 'next/navigation'
const EditTopicForm = ({topic}) => {
   
    const [edit, setEdit] = useState(topic)
    const router = useRouter();
    const handleChange = (e) => {
        const { name, value } = e.target;
      
        setEdit(prev => ({
            ...prev,
            [name]: value
        }))
    }
    const handleSubmit = async () => {
        try {
            const response = await fetch(`http://localhost:3000/api/topics/${edit._id}` , {
                method: "PUT",
                header: {"Content-type": "application/json"},
                body: JSON.stringify(edit)
    
            })
            if(!response.ok){
                throw new Error("Topic was not updated")
            }
            router.refresh();
            router.push("/topics")
        } catch (error) {
            console.log(error);
        }
    }
    return (
        <div>
            <div>
                <input type="text" onChange={handleChange} value={edit.title} name="title" placeholder='title' />
                <input type="text" onChange={handleChange} value={edit.desc} name="desc" placeholder='desc' />
                <input type="text" onChange={handleChange} value={edit.speaker} name="speaker" placeholder='speaker' />
                <input type="text" onChange={handleChange} value={edit.date} name="date" placeholder='date' />
                <input type="text" onChange={handleChange} value={edit.time} name="time" placeholder='time' />
                <input type="text" onChange={handleChange} value={edit.location} name="location" placeholder='location' />
            </div>
            <div style={{ marginTop: 30 }}>
                <Button style={{ backgroundColor: "green" }} onClick={handleSubmit}>Update Topic</Button>
            </div>
            <div>
                {/* <RemoveBtn /> */}
                {/* <FaEdit onClick={handleEdit}/> */}
            </div>
        </div>
    )
}

export default EditTopicForm