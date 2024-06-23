"use client";
import Link from "next/link";
import RemoveBtn from "../Buttons/RemoveBtn";
import { FaEdit } from "react-icons/fa";
import React, { useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import { Box, ButtonBase } from "@mui/material";
import { useRouter } from "next/navigation";
import { Button } from "@mui/joy";
import Input from "@mui/joy/Input";
import "./search.css";
import EventFormDialog from "../Dialogs/EventFormDialog";

const SearchBar = ({ items, id }) => {
  const router = useRouter();
  const [ids, setIds] = useState([]);

  const [searchTerm, setSearchTerm] = useState({
    title: "",
  });

  const getIds = (rowIds) => {
    setIds(rowIds);
  };
  const handleDeleteSelected = async () => {
    try {
      await Promise.all(
        ids.map((id) => {
          fetch(`/api/events?id=${id}`, { method: "DELETE" });
        })
      );
      alert("Items deleted successfully!");
      router.refresh();
    } catch (error) {
      alert("Failed to delete items");
      console.error(error);
    }
  };

  const handleSearch = (e) => {
    const { name, value } = e.target;
    setSearchTerm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const filteredItems = items.filter((item) => {
    if (searchTerm.title === "" || searchTerm.title == null) {
      return item;
    }
    if (item.title.toLowerCase().includes(searchTerm.title.toLowerCase())) {
      return item;
    }
    return null;
  });

  const columns = [
    { field: 'itemId', headerName: 'ID', width: 30 },
    { field: 'id', headerName: 'Event Id', width: 90 },
    {
      field: "title",
      headerName: "Title",
      width: 200,
      renderCell: (params) => (
        <Link href={`/eventdetails/${params.row.id}`}>
         {params.row.title}
        </Link>
      ),
    },
    {
      field: "description",
      headerName: "Description",
      width: 150,
      renderCell: (params) => (
        <Link href={`/eventdetails/${params.row.id}`}>
         {params.row.description}
        </Link>
      ),

      
    },
    {
      field: "location",
      headerName: "Location",
      width: 150,
      renderCell: (params) => (
        <Link href={`/eventdetails/${params.row.id}`}>
         {params.row.location}
        </Link>
      ),
    },
    {
      field: "host",
      headerName: "Host",
      width: 150,
      renderCell: (params) => (
        <Link href={`/eventdetails/${params.row.id}`}>
         {params.row.host}
        </Link>
      ),
    },
    {
      field: "date",
      headerName: "Date",
      width: 150,
      renderCell: (params) => (
        <Link href={`/eventdetails/${params.row.id}`}>
         {params.row.date}
        </Link>
      ),
    },
    
    {
      field: "editActions",
      headerName: "Edit Topic",
      width: 90,

      renderCell: (params) => (
        <Link href={`/editevent/${params.row.edit}`}>
          <Button>Edit</Button>
        </Link>
      ),
    },
  ];

  const rows = filteredItems.map((item, index) => {
    return {
      id: item._id, // Ensure IDs start from 1
      edit: item._id, // Ensure IDs start from 1  
      title: item.title,
      description: item.description,
      host: item.host,
      date: item.date,
      time: item.time,
      location: item.location,
    };
  });

  return (
    <>
      <div className="search-container">
        <Input
          type="text"
          name="title"
          value={searchTerm.title}
          placeholder="Search by Title"
          onChange={handleSearch}
        />
        <Button onClick={handleDeleteSelected}>DELETE SELECTED</Button>
        <EventFormDialog />
      </div>

      <Box sx={{ height: 400, width: "100%" }}>
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
          disableSelectionOnClick
          onRowSelectionModelChange={(selectedId) => getIds(selectedId)}
        />
      </Box>
    </>
  );
};

export default SearchBar;
