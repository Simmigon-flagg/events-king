"use client";
import Link from "next/link";
import { FaTrash } from "react-icons/fa";
import React, { useContext, useEffect, useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import { Box, Input } from "@mui/material";
import { useRouter } from "next/navigation";
import { Button } from "@mui/joy";

import "./search.css";
import EventFormDialog from "../Dialogs/EventFormDialog";
import EditEventDetailsDialog from "../Dialogs/EditEventDetailsDialog";
import Dates from "@/lib/Dates";
import { AllEventsContext } from "@/context/AllEvents";
import Times from "@/lib/Times";
import { AllTopicsContext } from "@/context/AllTopics";

const SearchBar = ({ items, id, setUserSelection, user }) => {
  const { setEvents, deleteEvent } = useContext(AllEventsContext);
  const { topics } = useContext(AllTopicsContext);

  const router = useRouter();
  const [ids, setIds] = useState([]);

  const [searchTerm, setSearchTerm] = useState({
    title: "",
  });

  const getIds = (rowIds) => {
    setIds(rowIds);
  };

  const handleDeleteSelected = async () => {
    await deleteEvent(ids);
  };

  const topicsDropDown = items.topics?.map(itemTopicId => {
    const foundTopic = topics.topics.find(topic => topic._id === itemTopicId);
    if (foundTopic) {
      console.log(foundTopic.title);
      return foundTopic.title;
    }
    return null;
  }).filter(title => title !== null);
  

  const handleSearch = (e) => {
    const { name, value } = e.target;
    setSearchTerm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const filteredItems = items?.events?.filter((item) => {
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
      renderHeader: () => <strong>{"Title"}</strong>,
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
      renderHeader: () => <strong>{"Description"}</strong>,
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
      renderHeader: () => <strong>{"Location"}</strong>,
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
      renderHeader: () => <strong>{"Host"}</strong>,
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
      renderHeader: () => <strong>{"Date"}</strong>,
      renderCell: (params) => (
        <Link href={`/eventdetails/${params.row.id}`}>
          {Dates(params.row.date, params.row.time)}
        </Link>
      ),
    },
    {
      field: "time",
      headerName: "Time",
      width: 150,
      renderHeader: () => <strong>{"Time"}</strong>,
      renderCell: (params) => (
        <Link href={`/eventdetails/${params.row.id}`}>
          {Times(params.row.date, params.row.time)}
        </Link>
      ),
    },
    {
      field: "topics",
      headerName: "Topics",
      width: 150,
      renderHeader: () => <strong>{"Topics"}</strong>,
      renderCell: (params) => {
        const topicTitles = params.row.topics.map(topicId => {
          const topic = topics?.topics?.find(t => t._id === topicId);
          return topic ? topic.title : "Unknown";
        });

        return (
          <select name="topics" readOnly>
            {topicTitles.map((title, index) => (
              <option key={index} value={title}>
                {title}
              </option>
            ))}
          </select>
        );
      },
    },

    {
      field: "editActions",
      headerName: "Edit Event",
      width: 90,
      renderHeader: () => <strong>{"Edit Event"}</strong>,
      renderCell: (params) => (
        <EditEventDetailsDialog event={params.row} text="EDIT" />
      ),
    },
  ];

  const rows = filteredItems?.map((item, index) => {
    return {
      id: item._id, // Ensure IDs start from 1
      ids: index + 1,
      edit: item._id, // Ensure IDs start from 1
      title: item.title,
      description: item.description,
      host: item.host,
      topics: item.topics,
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
          value={searchTerm?.title}
          placeholder="Search by Title"
          onChange={handleSearch}
        />
        <button onClick={handleDeleteSelected} disabled={ids.length === 0}>
          <FaTrash style={{ color: ids.length === 0 ? "lightGray" : "red" }} />
        </button>
        <EventFormDialog text="NEW" />
      </div>

      <Box sx={{ height: 400 }}>
        <DataGrid
          rows={rows}
          columns={columns}
          sx={{
            boxShadow: 3,
            borderColor: "primary",
            "& .MuiDataGrid-cell": {
              border: "none",
            },
            "& .MuiDataGrid-columnHeaders": {
              borderBottom: "none",
            },
            "& .MuiDataGrid-cell:hover": {
              color: "primary.main",
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
