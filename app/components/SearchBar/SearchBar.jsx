"use client"
import { Box } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { DataGrid } from '@mui/x-data-grid';
import Input from '@mui/joy/Input';
import "./search.css"
import { useRouter } from 'next/navigation';
import Dates from '@/lib/Dates';
import Times from '@/lib/Times';

const SearchBar = ({ items, id }) => {

    const [ids, setIds] = useState([]);

    const getIds = (rowIds) => {
        setIds(rowIds);
        console.log("ids:", ids)
        handleAddTopicToEvent()
    };

    useEffect((rowIds) => {
        getIds(rowIds)

    }, [ids])

    const handleAddTopicToEvent = async () => {

        try {
            // Fetch the existing event
            const res = await fetch(`http://localhost:3000/api/events/${id}`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                },
            });

            const data = await res.json();
            const { event } = data;
            const { topics } = event;
            const updatedTopics = [...new Set([...topics, ...ids])];
            const updateRes = await fetch(
                `http://localhost:3000/api/events/${id}`,
                {
                    method: "PUT",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({ topics: updatedTopics }),
                }
            );

            if (!updateRes.ok) {
                throw new Error("Failed to update event");
            }

            const updatedData = await updateRes.json();
            console.log("Updated Event:", updatedData);
        } catch (error) {
            console.error("Error updating event:", error);
        }
    };

    const router = useRouter()
    const [searchTerm, setSearchTerm] = useState({
        title: ""
    });

    const handleSearch = (e) => {
        const { name, value } = e.target;

        setSearchTerm(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleGetId = async (topic_Id) => {
        let found = null;

        try {

            const res = await fetch(`http://localhost:3000/api/events/${id}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                }
            });

            const data = await res.json();
            const { event } = data;
            const { topics } = event
            found = topics.find(id => id === topic_Id)
            if (found) {

                return
            }

            const updatedTopics = [...topics, topic_Id];
            const updateRes = await fetch(`http://localhost:3000/api/events/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ topics: updatedTopics })
            });

            if (!updateRes.ok) {
                throw new Error('Failed to update event');
            }

            router.refresh()

        } catch (error) {
            console.error('Error updating event:', error);
        }

    };

    const filteredItems = items?.filter(item => {
        if (searchTerm.title === "" || searchTerm.title == null) {
            return item;
        }
        if (item.title.toLowerCase().includes(searchTerm.title.toLowerCase())) {
            return item;
        }

        return null;
    });

    const columns = [
        { field: 'rowNumber', headerName: '#', width: 90 },

        {
            field: 'title',
            headerName: 'Title',
            width: 150,

        },
        {
            field: 'description',
            headerName: 'Description',
            width: 150,

        }
        ,
        {
            field: 'location',
            headerName: 'Location',
            width: 150,

        }
        ,
        {
            field: 'speaker',
            headerName: 'Speaker',
            width: 150,

        }
        ,
        {
            field: 'date',
            headerName: 'Date',
            width: 150,

        }
        ,
        {
            field: 'time',
            headerName: 'time',
            width: 150,

        },
    ];

    const rows = filteredItems?.map((item, index) => {
        return {
            id: item._id, // Ensure IDs start from 1
            rowNumber: index + 1, // Ensure IDs start from 1
            title: item.title,
            itemId: item._id,
            description: item.description,
            speaker: item.speaker,
            date: Dates(item.date,item.time),
            time: Times(item.date,item.time),
            location: item.location
        };
    });

    return (
        <>
            <Input className="search-session-input" type='text' name="title" value={searchTerm.title} placeholder='Search Title' onChange={handleSearch} />

            <Box sx={{ height: 400, width: '100%' }}>
                <DataGrid
                    rows={rows}
                    columns={columns}
                    initialState={{
                        pagination: {
                            paginationModel: {
                                pageSize: 6,
                            },
                        },
                    }}
                    pageSizeOptions={[6]}
                    checkboxSelection
                    onRowSelectionModelChange={(selectedId) => getIds(selectedId)}
                />
            </Box>
        </>
    );
};

export default SearchBar;