"use client"
import React, { useContext, useEffect, useState } from 'react'
import { UsersContext } from '@/context/UsersContext'
import { Button, Input, Typography } from '@mui/joy'

const Userprofile = () => {
    const { users, setUsers } = useContext(UsersContext)
    const [userType, setUsersType] = useState({
        _id: users?.user?._id,
        firstname: users?.user?.name,
        email: users?.user?.email,
        events: users?.user?.events,
        topics: users?.user?.topics,
        lastname: "",
        title: "",
        phone: "",
        aboutme: "",
        company: "",
        presentation: "",
        description: "",
        role: null

    });

    const handleChange = (e) => {
        const { name, value } = e.target
        console.log(name, value)
        setUsersType(prev => ({
            ...prev,
            [name]: value

        }))
    }
    const handleAttendee = async () => {
        setUsersType((user) => ({
            ...user,
            // Assuming there might be additional user type modifications here
            role: "attendee"
        }));

    };


    const handleSpeaker = async () => {

        setUsersType((user) => ({
            ...user,
            // Assuming there might be additional user type modifications here
            role: "speaker"
        }));

        
    }
    const handleSponsor = async () => {

        setUsersType((user) => ({
            ...user,
            role: "sponsor"
            // Assuming there might be additional user type modifications here
        }));

        
    }
    useEffect(() => {
      setUsersType(prev => ({
        ...prev
      }))
    }, [])
    return (
        <div>
            Userprofile
            {JSON.stringify(userType)}
            <Button onClick={handleAttendee} >Attendee</Button>
            <Button onClick={handleSpeaker} >Speaker</Button>
            <Button onClick={handleSponsor} >Sponsor</Button>
            <Typography>{userType?.name}</Typography>
            <Typography>{userType?.email}</Typography>
            <Typography>{userType?.events}</Typography>
            <Typography>{userType?.topics}</Typography>
            <Input onChange={handleChange} value={userType?.firstname} name='firstname' type='text' />
            <Input onChange={handleChange} value={userType?.lastname} name='lastname' type='text' />
            <Input onChange={handleChange} value={userType?.company} name='company' type='text' />
            <Input onChange={handleChange} value={userType?.phone} name='phone' type='text' />
            <Input onChange={handleChange} value={userType?.description} name='description' type='text' />
            <Input onChange={handleChange} value={userType?.presentation} name='presentation' type='text' />
            <Input onChange={handleChange} value={userType?.aboutme} name='aboutme' type='text' />

        </div>
    )
}

export default Userprofile