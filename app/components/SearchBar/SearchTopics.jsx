"use client";
import { FaTrash } from "react-icons/fa";
import React, { useContext, useState } from "react";
import { useRouter } from "next/navigation";

import { DataGrid } from "@mui/x-data-grid";

import "./search.css";
import AddTopicFormDialog from "../Dialogs/AddTopicFormDialog";
import ViewTopicDetailDialog from "../Dialogs/ViewTopicDetailsDialog";
import ChipAvatar from "../Chips/ChipAvatar";
import Dates from "@/lib/Dates";
import Times from "@/lib/Times";
import NewSpeakerFormDialog from "../Dialogs/NewSpeakerFormDialog";
import { Box, Input } from "@mui/material";
import { AllTopicsContext } from "@/context/AllTopics";


const SearchBar = ({ items, id }) => {
  const { topics, deleteTopic } = useContext(AllTopicsContext)

  const router = useRouter();
  const [ids, setIds] = useState([]);
  const [searchTerm, setSearchTerm] = useState({
    title: "",
  });

  const handleSearch = (e) => {
    const { name, value } = e.target;

    setSearchTerm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const getIds = (rowIds) => {
    setIds(rowIds);
  };

  const handleDeleteSelected = async () => {
    deleteTopic(ids)

  };

  const columns = [
    { field: "ids", headerName: "#", width: 90 },
    {
      field: "title",
      headerName: "Title",
      width: 400,
      renderHeader: () => (
        <strong>
          {'Title'}
        </strong>),

      renderCell: (params) => (
        <ViewTopicDetailDialog topic={params.row} text={params.row.title} />
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
        </strong>),
      renderCell: (params) => (
        <ChipAvatar name={params.row.speaker} image={params.row.image} />
      ),
    },

    {
      field: "date",
      headerName: "Date",
      width: 150,
      renderCell: (params) => (
        <>
          {Dates(params.row.date, params.row.time)}
        </>

      ),
    },


    {
      field: "time",
      headerName: "Time",
      width: 150,
      renderHeader: () => (
        <strong>
          {'Time'}
        </strong>),
      renderCell: (params) => (
        <>
          {Times(params.row.date, params.row.time)}
        </>

      ),
    },

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
      _id: item._id, // Ensure IDs start from 1
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
          variant="outlined"
          type="text"
          name="title"
          value={searchTerm.title}
          placeholder="Search by Title"
          onChange={handleSearch}
        />
        <button variant="soft" onClick={handleDeleteSelected} disabled={ids?.length === 0}><FaTrash style={{ color: ids?.length === 0 ? 'lightGray' : 'red' }} /></button>
        <AddTopicFormDialog text="NEW" />
      </div>
      <Box sx={{ height: 400, width: "100%" }}>
        <DataGrid
          rows={rows}
          row
          sx={{
            boxShadow: 3,
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
          onRowSelectionModelChange={(selectedId) => getIds(selectedId)}
        />
      </Box>
    </>
  );
};

export default SearchBar;