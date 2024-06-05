"use client"
import { Button } from '@mui/material'
import React, { useState } from 'react'

const SearchBar = ({ items }) => {

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
            {items.filter(item => {
                if (searchTerm.title == "" || searchTerm.title == null) {
                    return item;
                } if (item.title.toLowerCase().includes(searchTerm.title.toLowerCase())) {
                    return item;
                }

            }).map(item => {
                return (<div key={item._id}>{item.title}</div>)
            })

            }

        </>

    )
}

export default SearchBar