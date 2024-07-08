'use client'
import React, { useState, useEffect, createContext } from 'react';
import { nanoid } from 'nanoid';
import { UserContext } from './UsersContet';

const id = nanoid();

const initialValues = {
    id: id,
    firstName: "",
    lastName: "",
    email: ""
}

const UserContext = createContext({});

export const UserProvider = ({ children }) => {
    const [user, setUser] = useState(null)

    useEffect(() => {
        const fetch = async () => {
            const user = await getSession()

            setUser(user?.user)
        }
        fetch()
    }, [])


    return (
        <UserContext.Provider value={{ user, setUser }}>
            {children}
        </UserContext.Provider>
    )
}

export default UserContext