"use client";

import { UsersContext } from '@/context/UsersContext';
import Dates from '@/lib/Dates';
import Times from '@/lib/Times';
import { Box, Button, Input, Skeleton } from '@mui/joy';
import { Paper } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import Link from 'next/link';
import React, { useContext, useEffect, useState } from 'react';

const Speakers = () => {
  const { users, setUsers, handleRemove } = useContext(UsersContext);

  const [ids, setIds] = useState([]);

  const getIds = (rowIds) => {
    setIds(rowIds);
    console.log("ids:-", rowIds);
  };

  const handleSelection = async () => {
    try {
      const response = await fetch(`/api/users/${users?.user?._id}`);
      if (!response.ok) throw new Error("Network response was not ok");

      const data = await response.json();
      const existingEvents = data.user.events || [];

      // Merge existing IDs with new IDs and remove duplicates using Set
      const updatedEvents = Array.from(new Set([...existingEvents, ...ids]));

      // Update the user's context with the new events
      setUsers((prevUsers) => ({
        ...prevUsers,
        user: {
          ...prevUsers.user,
          events: updatedEvents
        }
      }));

      const updateResponse = await fetch(`/api/users/${users?.user?._id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ events: updatedEvents })
      });

      if (!updateResponse.ok) throw new Error("Update response was not ok");

      const updatedJSONResponse = await updateResponse.json();
      console.log("Update successful: ", updatedJSONResponse);

    } catch (error) {
      console.error("Fetch or Update error: ", error);
    }
  };

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
    { field: 'host', headerName: 'Host', width: 150 },
    { field: 'date', headerName: 'Date', width: 150 },
    { field: 'time', headerName: 'Time', width: 150 },
  ];

  const rows = filteredItems.map((item, index) => ({
    id: item._id,
    _id: item._id,
    rowNumber: index + 1,
    title: item.title,
    description: item.description,
    host: item.host,
    date: Dates(item.date, item.time),
    time: Times(item.date, item.time),
    location: item.location
  }));


  return (
    <div>
      <h1>Speakers Registration </h1>
      {users !== undefined ?

        <>
          {users?.user?.events ? (
            <>
               {users?.user?.events.map(event_id => (  events.map(events =>  events?._id === event_id  ?  <><Link href={`/eventdetails/${events?._id}`}>{events.title}</Link><Button onClick={() =>handleRemove(events?._id)}>remove</Button></> : null)  ))}
              {/* {users?.user?.events.map(event => { { return <><p key={event?._id}>{event?._id} <Button onClick={() => handleRemove(event?._id)}>Remove</Button></p></> } })} */}
            </>

          ) : (

            <Skeleton width={200} height={100} />
          )}</>
        :
        <p>No events</p>

      }
      <Input
        className="search-session-input"
        type="text"
        name="title"
        value={searchTerm.title}
        placeholder="Search Title"
        onChange={handleSearch}
      />
      <Button onClick={() => handleSelection()}>Add Event</Button>

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
          onRowSelectionModelChange={(selectedIds) => getIds(selectedIds)}
        />
      </Box>
    </div>
  );
};

export default Speakers;
