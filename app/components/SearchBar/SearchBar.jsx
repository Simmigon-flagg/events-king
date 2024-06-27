"use client"
import { Box, Button } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { DataGrid } from '@mui/x-data-grid';
import Input from '@mui/joy/Input';
import "./search.css"

import { useRouter } from 'next/navigation';
import Link from 'next/link';
const SearchBar = ({ items, id }) => {

    const [ids, setIds] = useState([]);;

    const getIds = (rowIds) => {
        setIds(rowIds);
        console.log("ids:", ids)
        handleAddTopicToEvent()
    };

    useEffect((rowIds) => {
        getIds(rowIds)

    },[ids])

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
            // Add the new topic ID to the existing topics array
            const updatedTopics = [...new Set([...topics, ...ids])];

            // Update the event with the new topics array
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
            // Fetch the existing event
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

            // Add the new topic ID to the existing topics array
            // router.refresh(`http://localhost:3000/eventdetails/${id}`)
            if (found) {

                return
            }

            const updatedTopics = [...topics, topic_Id];

            // Update the event with the new topics array
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

            // await updateRes.json();


            router.refresh()

        } catch (error) {
            console.error('Error updating event:', error);
        }

    };

    const filteredItems = items.filter(item => {
        if (searchTerm.title === "" || searchTerm.title == null) {
            return item;
        }
        if (item.title.toLowerCase().includes(searchTerm.title.toLowerCase())) {
            return item;
        }

        return null;
    });

    const columns = [
        // { field: 'id', headerName: 'ID', width: 90 },
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
            field: 'host',
            headerName: 'Host',
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
        // {
        //     field: "actions",
        //     headerName: "Actions",
        //     width: 200,

        //     renderCell: (params) => (

        //         <Link
        //             href={`/topicdetails/${params.row.itemId}`}
        //         >
        //             <Button>
        //                 View
        //             </Button>
        //         </Link>

        //     )
        // },

    ];

    const rows = filteredItems.map((item, index) => {
        return {
            id: item._id, // Ensure IDs start from 1
            rowNumber: index + 1, // Ensure IDs start from 1
            title: item.title,
            itemId: item._id,
            description: item.description,
            host: item.host,
            date: item.date,
            time: item.time,
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
                    // disableRowSelectionOnClick={true}
                    onRowSelectionModelChange={(selectedId) => getIds(selectedId)}
                />
            </Box>
        </>
    );
};

export default SearchBar;