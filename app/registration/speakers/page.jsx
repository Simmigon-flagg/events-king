"use client";

import SearchBar from '@/app/components/SearchBar/SearchBar';
import Dates from '@/lib/Dates';
import Times from '@/lib/Times';
import { Box, Button, Input } from '@mui/joy';
import { DataGrid } from '@mui/x-data-grid';
import { getSession } from 'next-auth/react';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';

const Speakers = () => {
  const [user, setUser] = useState()
  const [ids, setIds] = useState([]);
  const getIds = (rowIds) => {
    setIds(rowIds);
    console.log()
    console.log("ids:-", rowIds)
    console.log(user)
  };
  const handleSelection = async () => { 
    try {
      const response = await fetch(`/api/users/${user?.id}`);
      if (!response.ok) throw new Error("Network response was not ok");
      
      const data = await response.json();
      const events = data.user.events;

      const update = Array.from(new Set([...ids, ...events]));
      data.user.events = update;
  
      const updateResponse = await fetch(`/api/users/${user?.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ events: data.user.events })
      });
  
      if (!updateResponse.ok) throw new Error("Update response was not ok");
  
    } catch (error) {
      console.error("Fetch or Update error: ", error);
    }
  };
  
  useEffect(() => {
    const fetch = async () => {
      const user = await getSession()
      setUser(user?.user)
    }
    fetch()
  }, [])

  const [events, setEvents] = useState([]);
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

  useEffect(() => {
    const fetchEventData = async () => {
      try {
        const response = await fetch("/api/events");
        if (!response.ok) throw new Error("Network response was not ok");
        const eventData = await response.json();
        setEvents(eventData.events);
      } catch (error) {
        console.error("Fetch error: ", error);
      }
    };
    fetchEventData();
  }, []);

  const filteredItems = events.filter(item => {
    if (!searchTerm.title) return item;
    if (item.title.toLowerCase().includes(searchTerm.title.toLowerCase())) return item;
    return null;
  });

  const columns = [
    { field: 'rowNumber', headerName: '#', width: 90 },
    {
      field: 'title', headerName: 'Title', width: 150,
      renderCell: (params) => (
        <>
          {<Link href={`/eventdetails/${params.row._id}`}>{params.row.title}</Link>}
        </>

      ),

    },
    { field: 'description', headerName: 'Description', width: 150 },
    { field: 'location', headerName: 'Location', width: 150 },
    { field: 'speaker', headerName: 'Speaker', width: 150 },
    { field: 'date', headerName: 'Date', width: 150 },
    { field: 'time', headerName: 'Time', width: 150 },
  ];

  const rows = filteredItems.map((item, index) => ({
    id: item._id,
    _id: item._id,
    rowNumber: index + 1,
    title: item.title,
    description: item.description,
    speaker: item.speaker,
    date: Dates(item.date, item.time),
    time: Times(item.date, item.time),
    location: item.location
  }));

  return (
    <div>
      <h1>Speakers Registration {user?.name}</h1>
      <Input
        className="search-session-input"
        type="text"
        name="title"
        value={searchTerm.title}
        placeholder="Search Title"
        onChange={handleSearch}
      />
      <Button onClick={() => handleSelection()} >add event</Button>

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
    </div>
  );
};

export default Speakers;
