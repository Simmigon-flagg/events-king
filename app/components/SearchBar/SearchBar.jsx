"use client"
import { Button } from '@mui/material'
import React, { useState } from 'react'
import { DataGrid } from '@mui/x-data-grid';

const SearchBar = ({ items, id }) => {

    const [searchTerm, setSearchTerm] = useState({
        title: ""
    });

    const handleSearch = (e) => {
        const { name, value } = e.target;
        console.log(name, value);
        setSearchTerm(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleGetId = async (topic_Id, eventId) => {
        try {
            // Fetch the existing event
            const res = await fetch(`http://localhost:3000/api/events/${eventId}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                }
            });

            const data = await res.json();
            const { event } = data;
            const { topics } = event
            // Add the new topic ID to the existing topics array
            const updatedTopics = [...topics, topic_Id];

            // Update the event with the new topics array
            const updateRes = await fetch(`http://localhost:3000/api/events/${eventId}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ topics: updatedTopics })
            });

            if (!updateRes.ok) {
                throw new Error('Failed to update event');
            }

            const updatedData = await updateRes.json();
            console.log('Updated Event:', updatedData);
        } catch (error) {
            console.error('Error updating event:', error);
        }
    };

    return (
        <>
            <input type='text' name="title" value={searchTerm.title} placeholder='Search' onChange={handleSearch} />
            {items.filter(item => {
                if (searchTerm.title === "" || searchTerm.title == null) {
                    return item;
                }
                if (item.title.toLowerCase().includes(searchTerm.title.toLowerCase())) {
                    return item;
                }
                return null;
            }).map(item => (
                <div key={item._id}>
                    <div>{item.title} {id}</div>
                    <button onClick={() => handleGetId(item._id, id)}>Add Topic</button>
                </div>
            ))}
        </>
    );
};

export default SearchBar;
