"use client"
import React, { useContext } from 'react'
import { UsersContext } from '@/context/UsersContext'
import { Typography } from '@mui/joy'

const Userprofile = () => {
    const { users, setUsers } = useContext(UsersContext)
    return (
        <div>
            Userprofile
            {JSON.stringify(users?.user)}
            <Typography>{users?.user?.name}</Typography>
            <Typography>{users?.user?.email}</Typography>
            <Typography>{users?.user?.events}</Typography>
            <Typography>{users?.user?.topics}</Typography>

        </div>
    )
}

export default Userprofile