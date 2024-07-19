"use client";
import { FaTrash } from "react-icons/fa";
import React, { useState } from "react";

import { Avatar, Box, Input, Button } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import "./search.css";
import ViewSpeakerDetailDialog from "../Dialogs/ViewSpeakerDetailDialog";
import NewSpeakerFormDialog from "../Dialogs/NewSpeakerFormDialog";
import ChipAvatar from "../Chips/ChipAvatar";

const SearchBar = ({ items }) => {


  const [ids, setIds] = useState([]);
  const [searchTerm, setSearchTerm] = useState({ firstname: "" });

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
    try {
      await Promise.all(
        ids.map((id) => fetch(`/api/users?id=${id}`, { method: "DELETE" }))
      );
      // alert("Items deleted successfully!");

    } catch (error) {
      alert("Failed to delete items");
      console.error(error);
    }
  };

  const columns = [
    { field: "ids", headerName: "#", width: 50 },
    {
      field: "admin",
      headerName: "admin",
      width: 150,
      renderHeader: () => <strong>{"Admin"}</strong>,
      renderCell: (params) => {
        <ViewSpeakerDetailDialog speaker={params.row} text={params.row.admin}

      />
        
      },
    },

    {
      field: "firstname",
      headerName: "First Name",
      width: 200,
      renderHeader: () => <strong>{"First Name"}</strong>,
      renderCell: (params) => (
        <div className="speaker-name">
          <Avatar variant="solid" alt="SE" size="sm">
            {params.row.firstname && params.row.firstname.substring(0, 1) + params.row.lastname.substring(0, 1)}
          </Avatar>
    
          <ChipAvatar name={params.row.firstname} image={params.row.firstname} />
        </div>
      ),
    },
    {
      field: "lastname",
      headerName: "Last Name",
      width: 150,
      renderHeader: () => <strong>{"Last Name"}</strong>,
      renderCell: (params) => (
        <ViewSpeakerDetailDialog speaker={params.row} text={params.row.lastname} />
      ),
    },
    {
      field: "email",
      headerName: "Email",
      width: 150,
      renderHeader: () => <strong>{"Email"}</strong>,
      renderCell: (params) => <ViewSpeakerDetailDialog speaker={params.row} text={params.row.email} />,
    },
    {
      field: "role",
      headerName: "Role",
      width: 150,
      renderHeader: () => <strong>{"Role"}</strong>,
      renderCell: (params) => <ViewSpeakerDetailDialog speaker={params.row} text={params.row.role} />,
    },
    {
      field: "phone",
      headerName: "Phone",
      width: 150,
      renderHeader: () => <strong>{"Phone"}</strong>,
      renderCell: (params) => <ViewSpeakerDetailDialog speaker={params.row} text={params.row.phone} />,
    },
    {
      field: "title",
      headerName: "Title",
      width: 150,
      renderHeader: () => <strong>{"Title/Occupation"}</strong>,
      renderCell: (params) => <ViewSpeakerDetailDialog speaker={params.row} text={params.row.title} />,
    },
    {
      field: "company",
      headerName: "Company",
      width: 150,
      renderHeader: () => <strong>{"Company"}</strong>,
      renderCell: (params) => <ViewSpeakerDetailDialog speaker={params.row} text={params.row.company} />,
    },
    {
      field: "events",
      headerName: "Events",
      width: 150,
      renderHeader: () => <strong>{"Events"}</strong>,
      renderCell: (params) => <ViewSpeakerDetailDialog speaker={params.row} text={params.row.events} />,
    },
    {
      field: "topics",
      headerName: "Topics",
      width: 150,
      renderHeader: () => <strong>{"Topics"}</strong>,
      renderCell: (params) => <ViewSpeakerDetailDialog speaker={params.row} text={params.row.topics} />,
    },
    {
      field: "aboutme",
      headerName: "About me",
      width: 150,
      renderHeader: () => <strong>{"About me"}</strong>,
      renderCell: (params) => <ViewSpeakerDetailDialog speaker={params.row} text={params.row.aboutme} />,
    },

    {
      field: "presentation",
      headerName: "Presentation",
      width: 150,
      renderHeader: () => <strong>{"Presentation"}</strong>,
      renderCell: (params) => <ViewSpeakerDetailDialog speaker={params.row} text={params.row.presentation} />,
    },
  ];

  const filteredItems = items?.filter((item) => {
    if (searchTerm?.firstname === "" || searchTerm?.firstname == null) {
      return item;
    }
    if (item?.firstname?.toLowerCase().includes(searchTerm?.firstname?.toLowerCase())) {
      return item;
    }
    return null;
  });

  const rows = filteredItems?.map((item, index) => ({
    id: item._id,
    _id: item._id,
    ids: index + 1,
    name: item.name,
    email: item.email,
    events: item.events,
    topics: item.topics,
    role: item.role,
    aboutme: item.aboutme,
    company: item.company,
    description: item.description,
    firstname: item.firstname,
    lastname: item.lastname,
    phone: item.phone,
    presentation: item.presentation,
    title: item.title,
    admin: item.admin

  }));

  return (
    <>
      <div className="search-container">
        <Input
          type="text"
          name="firstname"
          value={searchTerm.firstname}
          placeholder="Search by First Name"
          onChange={handleSearch}
        />
        <Button
          variant="contained"
          color="secondary"
          onClick={handleDeleteSelected}
          disabled={ids && ids?.length === 0}
        >
          <FaTrash style={{ color: ids && ids?.length === 0 ? "lightGray" : "red" }} />
        </Button>
        <NewSpeakerFormDialog text="NEW" />
      </div>
      <Box sx={{ height: 400 }}>
        <DataGrid
          rows={rows}
          sx={{
            boxShadow: 3,
            borderColor: "primary.main",
            "& .MuiDataGrid-cell:hover": {
              color: "primary.main",
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
