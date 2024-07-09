"use client";
import { FaTrash } from "react-icons/fa";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { Box, Button } from "@mui/joy";
import { DataGrid } from "@mui/x-data-grid";
import Input from "@mui/joy/Input";
import "./search.css";
import AddTopicFormDialog from "../Dialogs/AddTopicFormDialog";
import ViewTopicDetailDialog from "../Dialogs/ViewTopicDetailsDialog";
import ChipAvatar from "../Chips/ChipAvatar";
import Dates from "@/lib/Dates";
import Times from "@/lib/Times";
import ViewSpeakerDetailDialog from "../Dialogs/ViewSpeakerDetailDialog";
import Image from "next/image";
import Avatar from '@mui/joy/Avatar';
import NewSpeakerFormDialog from "../Dialogs/NewSpeakerFormDialog";


const SearchBar = ({ items, id }) => {
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

  const handleGetId = async (topic_Id, speakerId) => {
    try {
      // Fetch the existing event
      const res = await fetch(
        `http://localhost:3000/api/speakers/${speakerId}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      const data = await res.json();
      const { event } = data;
      const { topics } = event;
      const updatedTopics = [...topics, topic_Id];

      const updateRes = await fetch(
        `http://localhost:3000/api/speakers/${speakerId}`,
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
          fetch(`/api/speakers?id=${id}`, { method: "DELETE" });
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
    { field: "ids", headerName: "#", width: 50 },
    {
      field: "firstname",
      headerName: "First Name",
      width: 200,
      renderHeader: () => <strong>{"First Name"}</strong>,
      renderCell: (params) => (
        <div className="speaker-name">
          <Avatar variant="solid" alt="SE" size="sm"> {params.row.firstname && params.row.firstname.substring(0, 1) + params.row.lastname.substring(0, 1)}</Avatar>
          <ViewSpeakerDetailDialog
            speaker={params.row}
            text={params.row.firstname}
          />
        </div>
        // <ChipAvatar name={params.row.firstname} image={params.row.firstname} />
      ),
    },
    {
      field: "lastname",
      headerName: "Last Name",
      width: 150,
      renderHeader: () => <strong>{"Last Name"}</strong>,
      renderCell: (params) => (
        <ViewSpeakerDetailDialog
          speaker={params.row}
          text={params.row.lastname}
        />
      ),
    },

    {
      field: "title",
      headerName: "Title",
      width: 150,
      renderHeader: () => <strong>{"Title/Occupation"}</strong>,
      renderCell: (params) => (
        <ViewSpeakerDetailDialog speaker={params.row} text={params.row.title} />
      ),
    },

    {
      field: "company",
      headerName: "Company",
      width: 150,
      renderHeader: () => <strong>{"Company"}</strong>,
      renderCell: (params) => (
        <ViewSpeakerDetailDialog
          speaker={params.row}
          text={params.row.company}
        />
      ),
    },
    {
      field: "topics",
      headerName: "Topics",
      width: 150,
      renderHeader: () => <strong>{"Topics"}</strong>,
      renderCell: (params) => (
        <ViewSpeakerDetailDialog
          speaker={params.row}
          text={params.row.topics}
        />
      ),
    },
    {
      field: "presentation",
      headerName: "Presentation",
      width: 150,
      renderHeader: () => <strong>{"Presentation"}</strong>,
      renderCell: (params) => (
        <ViewSpeakerDetailDialog
          speaker={params.row}
          text={params.row.presentation}
        />
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
      firstname: item.firstname,
      lastname: item.lastname,
      title: item.title,
      company: item.company,
      topics: item.topics,
      presentation: item.presentation,
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
        <Button
          variant="soft"
          onClick={handleDeleteSelected}
          disabled={ids.length === 0}
        >
          <FaTrash style={{ color: ids.length === 0 ? "lightGray" : "red" }} />
        </Button>
        <NewSpeakerFormDialog text="NEW" />
      </div>
      <Box sx={{ height: 400, width: "100%" }}>
        <DataGrid
          rows={rows}
          row
          sx={{
            boxShadow: 3,
            borderColor: "primary",
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
