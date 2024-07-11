"use client"
import React, { useContext, useEffect, useState } from 'react'
import { UsersContext } from '@/context/UsersContext'
import { Button, Input, Typography } from '@mui/joy'

const Userprofile = () => {
    const { users, setUsers } = useContext(UsersContext)
    const [userType, setUsersType] = useState({
        firstname: "",
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
            role: "attendee"
        }))
    }
    const handleSpeaker = async () => {

        setUsersType((user) => ({
            ...user,
            role: "speaker"
        }))
    }
    const handleSponsor = async () => {

        setUsersType((user) => ({
            ...user,
            role: "sponsor"
        }))
    }
    useEffect(() => {
        console.log(userType)
    }, [userType])
    return (
        <div>
            Userprofile
            {JSON.stringify(users?.user)}
            <Button onClick={handleAttendee} >Attendee</Button>
            <Button onClick={handleSpeaker} >Speaker</Button>
            <Button onClick={handleSponsor} >Sponsor</Button>
            <Typography>{users?.user?.name}</Typography>
            <Typography>{users?.user?.email}</Typography>
            <Typography>{users?.user?.events}</Typography>
            <Typography>{users?.user?.topics}</Typography>
            <Input onChange={handleChange} value={userType.firstname} name='firstname' type='text' />
            <Input onChange={handleChange} value={userType.lastname} name='lastname' type='text' />
            <Input onChange={handleChange} value={userType.company} name='company' type='text' />
            <Input onChange={handleChange} value={userType.phone} name='phone' type='text' />
            <Input onChange={handleChange} value={userType.description} name='description' type='text' />
            <Input onChange={handleChange} value={userType.presentation} name='presentation' type='text' />
            <Input onChange={handleChange} value={userType.aboutme} name='aboutme' type='text' />

        </div>
    )
}

export default Userprofile