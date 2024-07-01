"use client"
import { useRouter } from 'next/navigation'
import React, { useState } from 'react'

const Speaker = ({ speaker }) => {
  const router = useRouter()
  const [data, setData] = useState(speaker)
  const [create, setCreate] = useState(null)

  const handleChange = (e) => {
    const { name, value } = e.target;    
    setData(prev => ({
      ...prev,
      [name]: value
    }))
  }
  const handleCreateChange = (e) => {
    const { name, value } = e.target;    
    setCreate(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleDelete = async () => {
    // Needs Try catch
    await fetch(`http://localhost:3000/api/speakers?id=${data?._id}`, {
      method: "DELETE"
    })
    router.refresh()
  }

  const handleEdit = async () => {
    console.log("EDIT SPEAKER!!!!!")
    try {
      const response = await fetch(
        `http://localhost:3000/api/speakers/${data?._id}`,
        {
          method: "PUT",
          header: { "Content-type": "application/json" },
          body: JSON.stringify(data),
        }
      );
      if (!response.ok) {
        throw new Error("Event was not updated");
      }
      router.refresh();

    } catch (error) {
      console.log(error);
    }
    router.refresh();

  }
  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const response = await fetch(
        `http://localhost:3000/api/speakers`,
        {
          method: "POST",
          header: { "Content-type": "application/json" },
          body: JSON.stringify(create),
        }
      );
      if (!response.ok) {
        throw new Error("Speaker was not updated");
      }
      
    } catch (error) {
      console.log(error);
    }
    router.refresh();
    setCreate(null)      
  }
  return (
    <>
      <div>Speaker</div>
      <p>{data._id}</p>
      <div style={{ display: "flex", gap: 10 }}>
        <p>{data.firstname}</p>
        <p>{data.lastname}</p>
        <p>{data.email}</p>
        <p>{data.title}</p>
        <p>{data.phone}</p>
        <p>{data.aboutme}</p>
        <p>{data.company}</p>
        <p>{data.presentation}</p>
        <p>{data.topics.map(topic => <>{topic}</>)}</p>
        <button onClick={handleDelete}>Delete</button>
      </div>
      <hr />
      <div>
        <form>

          <input type="text" name="firstname" onChange={handleChange} value={data.firstname} />
          <input type="text" name="lastname" onChange={handleChange} value={data.lastname} />
          <input type="text" name="email" onChange={handleChange} value={data.email} />
          <input type="text" name="title" onChange={handleChange} value={data.title} />
          <input type="text" name="phone" onChange={handleChange} value={data.phone} />
          <input type="text" name="aboutme" onChange={handleChange} value={data.aboutme} />
          <input type="text" name="company" onChange={handleChange} value={data.company} />
          <input type="text" name="presentation" onChange={handleChange} value={data.presentation} />
          {/* <input value={data.topics.map(topic => <>{topic}</>)} /> */}
          <button onClick={handleEdit} >Submit</button>
        </form>

      </div>
      <br/>
      <br/>
      <hr/>
      <form onSubmit={handleSubmit}>

        <input type="text" name="firstname" onChange={handleCreateChange} value={create?.firstname} />
        <input type="text" name="lastname" onChange={handleCreateChange} value={create?.lastname} />
        <input type="text" name="email" onChange={handleCreateChange} value={create?.email} />
        <input type="text" name="title" onChange={handleCreateChange} value={create?.title} />
        <input type="text" name="phone" onChange={handleCreateChange} value={create?.phone} />
        <input type="text" name="aboutme" onChange={handleCreateChange} value={create?.aboutme} />
        <input type="text" name="company" onChange={handleCreateChange} value={create?.company} />
        <input type="text" name="presentation" onChange={handleCreateChange} value={create?.presentation} />
        {/* <input value={data.topics.map(topic => <>{topic}</>)} /> */}
        <button onClick={handleEdit} >Submit</button>
      </form>

    </>

  )
}

export default Speaker