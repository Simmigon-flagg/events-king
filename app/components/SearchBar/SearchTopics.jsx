"use client"
import Link from 'next/link'
import RemoveBtn from '../Buttons/RemoveBtn'
import { FaEdit } from 'react-icons/fa'
import React, { useState } from 'react'
import { useRouter } from 'next/navigation' 
import { Box, Button } from '@mui/material'
import { DataGrid } from '@mui/x-data-grid'
const SearchBar = ({ items, id }) => {
    const router = useRouter()
    const [ids, setIds] = useState([])
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

    const getIds = (rowIds) => {
        setIds(rowIds)
        console.log(ids)

    }

    const handleDeleteSelected = async () => {
        try {
            await Promise.all(ids.map(id =>{

                console.log(id)
                fetch(`/api/topics?id=${id}`, { method: 'DELETE' })
            }
            ));
            alert('Items deleted successfully!');
            router.refresh()
        } catch (error) {
            alert('Failed to delete items');
            console.error(error);
        }
    };

    const columns = [
        { field: 'id', headerName: 'ID', width: 90 },
        { field: 'itemId', headerName: 'Topic Id', width: 90 },
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
        // {
        //     field: 'date',
        //     headerName: 'Date',
        //     width: 150,
        //     editable: true,
        // }
        // ,
        // {
        //     field: 'time',
        //     headerName: 'time',
        //     width: 150,
        //     editable: true,
        // },
        {
            field: "topicActions",
            headerName: "Topic Details",
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
            field: "editActions",
            headerName: "Edit Topic",
            width: 200,

            renderCell: (params) => (

                <Link
                    href={`/edittopic/${params.row.itemId}`}
                >
                    <Button


                    //   onClick={() => alert(params.row.itemId)}
                    >
                        View
                    </Button>
                </Link>

            )
        },
    ];
    const filteredItems = items.filter(item => {
        if (searchTerm.title === "" || searchTerm.title == null) {
            return item;
        }
        if (item.title.toLowerCase().includes(searchTerm.title.toLowerCase())) {
            return item;
        }
        return null;
    });

    const rows = filteredItems.map((item, index) => {
        return {
            id: item._id, // Ensure IDs start from 1
            title: item.title,
            itemId: index + 1,
            description: item.description,
            host: item.host,
            // date: item.date,
            // time: item.time,
            location: item.location
        };
    });
    return (
        <>
            <input type='text' name="title" value={searchTerm.title} placeholder='Search' onChange={handleSearch} />
            <Button onClick={handleDeleteSelected}>Delete Selected</Button>
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
                    onRowSelectionModelChange={(selectedId) => getIds(selectedId)}
                />
            </Box>
        </>
    );
};

export default SearchBar;

{/* <button onClick={() => handleGetId(item._id, id)}>Add Topic</button>
<Link href={`/topicdetails/${item._id}`}>
    <h2>{item.title}</h2>
</Link>
<p>{item.desc}</p>
<RemoveBtn id={item._id} />
<Link href={`/edittopic/${item._id}`}>
    <FaEdit />
</Link> */}