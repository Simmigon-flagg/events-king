"use client"
import { Box, Button } from '@mui/material'
import React, { useState } from 'react'
import { DataGrid } from '@mui/x-data-grid';

import { useRouter } from 'next/navigation';
import Link from 'next/link';
const SearchBar = ({ items, id }) => {
  
    const router = useRouter()
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

    const handleGetId = async (topic_Id) => {
        console.log(topic_Id);
        console.log(id);
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
            // Add the new topic ID to the existing topics array
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

            const updatedData = await updateRes.json();
            console.log('Updated Event:', updatedData);
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
        { field: 'id', headerName: 'ID', width: 90 },
        { field: 'itemId', headerName: 'Item Id', width: 90 },
        {
            field: 'title',
            headerName: 'Title',
            width: 150,
            editable: true,
        },
        {
            field: 'description',
            headerName: 'Description',
            width: 150,
            editable: true,
        }
        ,
        {
            field: 'location',
            headerName: 'Location',
            width: 150,
            editable: true,
        }
        ,
        {
            field: 'host',
            headerName: 'Host',
            width: 150,
            editable: true,
        }
        ,
        {
            field: 'date',
            headerName: 'Date',
            width: 150,
            editable: true,
        }
        ,
        {
            field: 'time',
            headerName: 'time',
            width: 150,
            editable: true,
        },
        {
            field: "actions",
            headerName: "Actions",
            width: 200,

            renderCell: (params) => (

                <Link
                    href={`/topicdetails/${params.row.itemId}`}
                >
                    <Button


                    //   onClick={() => alert(params.row.itemId)}
                    >
                        View
                    </Button>
                </Link>

            )
        },
        {
            field: "addtopic",
            headerName: "Add Topic",
            width: 200,

            renderCell: (params) => (

                <button onClick={() => handleGetId(params.row.itemId)}>Add Topic {params.row.itemId}</button>

            )
        },
    ];

    const rows = filteredItems.map((item, index) => {
        return {
            id: index + 1, // Ensure IDs start from 1
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
            <input type='text' name="title" value={searchTerm.title} placeholder='Search' onChange={handleSearch} />
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
                    disableRowSelectionOnClick
                />
            </Box>
        </>
    );
};

export default SearchBar;
                // <div key={item._id}>
                //     <div>{item.title} </div>
                //     <button onClick={() => handleGetId(item._id, id)}>Add Topic {item._id}</button>
                // </div>
