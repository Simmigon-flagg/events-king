'use client'
import React, { useContext, useEffect, useState } from 'react'
import { UsersContext } from '@/context/UsersContext'
import { Button, Input, Typography } from '@mui/joy'

const Userprofile = () => {
    const { users, setUsers, handleSave } = useContext(UsersContext)

    const handleChange = (e) => {
        const { name, value } = e.target
        setUsers(prev => ({
            ...prev,
            user: {
                ...prev.user,
                [name]: value
            }
        }))
    }

    const handleAttendee = async () => {
        setUsers(prev => ({
            ...prev,
            user: {
                ...prev.user,
                role: "attendee"
            }
        }))
    }

    const handleSpeaker = async () => {
        setUsers(prev => ({
            ...prev,
            user: {
                ...prev.user,
                role: "speaker"
            }
        }))
    }

    const handleSponsor = async () => {
        setUsers(prev => ({
            ...prev,
            user: {
                ...prev.user,
                role: "sponsor"
            }
        }))
    }

    useEffect(() => {
        setUsers(prev => ({
            ...prev
        }))
    }, [setUsers])

    return (
        <div>
            Userprofile
            {JSON.stringify(users)}
            <Button onClick={handleAttendee}>Attendee</Button>
            <Button onClick={handleSpeaker}>Speaker</Button>
            <Button onClick={handleSponsor}>Sponsor</Button>
            <Typography>{users?.user?.name}</Typography>
            <Typography>{users?.user?.email}</Typography>
            <Typography>{users?.user?.events}</Typography>
            <Typography>{users?.user?.topics}</Typography>
            <Input onChange={handleChange} value={users?.user?.firstname } name='firstname' type='text' />
            <Input onChange={handleChange} value={users?.user?.lastname } name='lastname' type='text' />
            <Input onChange={handleChange} value={users?.user?.company } name='company' type='text' />
            <Input onChange={handleChange} value={users?.user?.phone } name='phone' type='text' />
            <Input onChange={handleChange} value={users?.user?.description } name='description' type='text' />
            <Input onChange={handleChange} value={users?.user?.presentation } name='presentation' type='text' />
            <Input onChange={handleChange} value={users?.user?.aboutme } name='aboutme' type='text' />
            <Button onClick={() => handleSave(users?.user?._id)}>Save</Button>
        </div>
    )
}

export default Userprofile
