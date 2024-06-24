"use client";
import Link from "next/link";
import RemoveBtn from "../Buttons/RemoveBtn";
import { FaEdit, FaTrash } from "react-icons/fa";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { Box, Button } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import Input from "@mui/joy/Input";
import "./search.css";
import AddTopicFormDialog from "../Dialogs/AddTopicFormDialog";
import ViewTopicDetailDialog from "../Dialogs/ViewTopicDetailsDialog";
import Chip from "@mui/material/Chip";
import Stack from "@mui/material/Stack";
import ChipAvatar from "../Chips/ChipAvatar";

const SearchBar = ({ items, id }) => {
  const router = useRouter();
  const [ids, setIds] = useState([]);
  const [searchTerm, setSearchTerm] = useState({
    title: "",
  });

  const handleSearch = (e) => {
    const { name, value } = e.target;
    console.log(name, value);
    setSearchTerm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleGetId = async (topic_Id, eventId) => {
    try {
      // Fetch the existing event
      const res = await fetch(`http://localhost:3000/api/events/${eventId}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      const data = await res.json();
      const { event } = data;
      const { topics } = event;
      // Add the new topic ID to the existing topics array
      const updatedTopics = [...topics, topic_Id];

      // Update the event with the new topics array
      const updateRes = await fetch(
        `http://localhost:3000/api/events/${eventId}`,
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

  const getIds = (rowIds) => {
    setIds(rowIds);
  };

  const handleDeleteSelected = async () => {
    try {
      await Promise.all(
        ids.map((id) => {
          console.log(id);
          fetch(`/api/topics?id=${id}`, { method: "DELETE" });
        })
      );
      alert("Items deleted successfully!");
      router.refresh();
    } catch (error) {
      alert("Failed to delete items");
      console.error(error);
    }
  };

  const columns = [
    { field: "ids", headerName: "#", width: 90 },
    // { field: "id", headerName: "Topic ID", width: 30 },
    {
      field: "title",
      headerName: "Title",
      width: 400,
      renderHeader: () => (
        <strong>
          {'Title'}
        </strong> ),

      renderCell: (params) => (
        <ViewTopicDetailDialog topic={params.row} text={params.row.title} />
      ),
    },
    // {
    //   field: "description",
    //   headerName: "Description",
    //   width: 150,
    //   renderCell: (params) => (
    //     <ViewTopicDetailDialog topic={params.row} text={params.row.description} />
    //   ),

    // },
    {
      field: "location",
      headerName: "Location",
      width: 150,
      renderHeader: () => (
        <strong>
          {'Location'}
        </strong> ),
      renderCell: (params) => (
        <ViewTopicDetailDialog topic={params.row} text={params.row.location} />
      ),
    },
    {
      
      field: "speaker",
      headerName: "Speaker",
      width: 150,
      renderHeader: () => (
        <strong>
          {'Speaker'}
        </strong> ),
      renderCell: (params) => (
    
         <ChipAvatar name={params.row.speaker} image={params.row.image}/>
        
      ),
    },

    {
      field: "date",
      headerName: "Date",
      width: 150,
      renderHeader: () => (
        <strong>
          {'Date'}
        </strong> ),
      renderCell: (params) => (
        <ViewTopicDetailDialog topic={params.row} text={params.row.date} />
      ),
    },
    {
      field: "time",
      headerName: "Time",
      width: 150,
      renderHeader: () => (
        <strong>
          {'Time'}
        </strong> ),
      renderCell: (params) => (
        <ViewTopicDetailDialog topic={params.row} text={params.row.time} />
      ),
    },
    // {
    //   field: "topicActions",
    //   headerName: "Topic Details",
    //   width: 100,

    //   renderCell: (params) => (
    //     <ViewTopicDetailDialog topic={params.row} />
    //   ),
    // },
  ];
  const filteredItems = items?.filter((item) => {
    if (searchTerm.title === "" || searchTerm.title == null) {
      return item;
    }
    if (item.title.toLowerCase().includes(searchTerm.title.toLowerCase())) {
      return item;
    }
    return null;
  });

  const rows = filteredItems?.map((item, index) => {
    return {
      id: item._id, // Ensure IDs start from 1
      ids: index + 1, // Ensure IDs start from 1
      title: item.title,
      description: item.description,
      speaker: item.speaker,
      image: item.image,
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
          // sx={{ width: "75%" }}
        />
      <Button variant="outlined" onClick={handleDeleteSelected}><FaTrash color="red" /></Button>
        <AddTopicFormDialog text="NEW SESSION" />
      </div>
      <Box sx={{ height: 400, width: "100%" }}>
        <DataGrid
          rows={rows}
          row
          sx={{
          boxShadow: 3,
          // border: 1,
          borderColor: 'primary',
          '& .MuiDataGrid-cell:hover': {
            color: 'primary.main',
          },
        }}
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
          // disableRowSelectionOnClick
          onRowSelectionModelChange={(selectedId) => getIds(selectedId)}
        />
      </Box>
    </>
  );
};

export default SearchBar;