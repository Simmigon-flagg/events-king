"use client";
import Link from "next/link";
import { FaTrash } from "react-icons/fa";
import React, { useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import { Box } from "@mui/material";
import { useRouter } from "next/navigation";
import { Button } from "@mui/joy";
import Input from "@mui/joy/Input";
import "./search.css";
import EventFormDialog from "../Dialogs/EventFormDialog";
import EditEventDetailsDialog from "../Dialogs/EditEventDetailsDialog";
import Dates from "@/lib/Dates";

const SearchBar = ({ items, id , setUserSelection, user }) => {
  const router = useRouter();
  const [ids, setIds] = useState([]);

  const [searchTerm, setSearchTerm] = useState({
    title: "",
  });

  const getIds = (rowIds) => {
    setIds(rowIds);
    console.log()
    console.log("ids:-", rowIds)
    console.log(user)
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
    { field: "ids", headerName: "#", width: 90 },
    {
      field: "title",
      headerName: "Title",
      width: 200,
      renderHeader: () => (
        <strong>
          {'Title'}
        </strong>),
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
      renderHeader: () => (
        <strong>
          {'Description'}
        </strong>),
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
      renderHeader: () => (
        <strong>
          {'Location'}
        </strong>),
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
      renderHeader: () => (
        <strong>
          {'Host'}
        </strong>),
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
      renderHeader: () => (
        <strong>
          {'Date'}
        </strong>),
      renderCell: (params) => (
        <Link href={`/eventdetails/${params.row.id}`}>         
         {Dates(params.row.date, params.row.time)}
        </Link>
      ),
    },

    {
      field: "editActions",
      headerName: "Edit Topic",
      width: 90,
      renderHeader: () => (
        <strong>
          {'Edit Topic'}
        </strong>),
      renderCell: (params) => (
        <EditEventDetailsDialog event={params.row} text="EDIT" />
      ),
    },
  ];

  const rows = filteredItems.map((item, index) => {
    return {
      id: item._id, // Ensure IDs start from 1
      ids: index + 1,
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
        <Button variant="soft" onClick={handleDeleteSelected} disabled={ids.length === 0}><FaTrash style={{ color: ids.length === 0 ? 'lightGray' : 'red' }} /></Button>
        <EventFormDialog text="NEW" />
      </div>

      <Box sx={{ height: 400, width: "100%" }}>

        <DataGrid
          rows={rows}
          columns={columns}
          sx={{
            boxShadow: 3,
            // border: 1,
            borderColor: 'primary',
            '& .MuiDataGrid-cell:hover': {
              color: 'primary.main',
            },
          }}
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
