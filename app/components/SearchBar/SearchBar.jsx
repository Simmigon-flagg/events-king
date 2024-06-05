"use client"
import { Button } from '@mui/material'
import React, { useState } from 'react'

const SearchBar = ({ topics }) => {

    const [searchTerm, setSearchTerm] = useState({
        title: ""
    })
    const handleSearch = (e) => {
        const { name, value } = e.target;
        console.log(name, value)
        setSearchTerm(prev => ({
            ...prev,
            [name]: value
        }))
    }
    return (
        <>
            <input type='text' name="title" value={searchTerm.title} placeholder='Search' onChange={handleSearch} />
            {topics.filter(topic => {
                if (searchTerm.title == "" || searchTerm.title == null) {
                    return topic;
                } if (topic.title.toLowerCase().includes(searchTerm.title.toLowerCase())) {
                    return topic;
                }

            }).map(topic => {
                return (<div key={topic._id}>{topic.title}</div>)
            })

            }

        </>

    )
}

export default SearchBar