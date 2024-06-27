"use client";
import React, { useState } from "react";
import TopicsList from "../TopicsPage/TopicsList";
import { useRouter } from "next/navigation";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { Button, Tooltip } from "@mui/joy";
import SearchTopics from "../SearchBar/SearchTopics";
import SearchBar from "../SearchBar/SearchBar";
import { AddCircleOutline } from "@mui/icons-material";

const BrowseSessionDialog = ({ text, topics, event }) => {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  //   const [edit, setEdit] = useState(topic);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setIsEditing(false);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    setEdit((prev) => ({
      ...prev,
      [name]: value,
    }));
  };
  const handleAdd = async (ids) => {  
        
    router.refresh();
    setIsEditing(false);
    handleClose();
  };
  const handleSubmit = async () => {
    try {
      const response = await fetch(
        `http://localhost:3000/api/topics/${edit.itemId}`,
        {
          method: "PUT",
          header: { "Content-type": "application/json" },
          body: JSON.stringify(edit),
        }
      );
      if (!response.ok) {
        throw new Error("Topic was not updated");
      }
      // router.push("/topics")
    } catch (error) {
      console.log(error);
    }
    router.refresh();
    setIsEditing(false);
    handleClose();
  };

  const getEventById = async (id) => {
    try {
      const res = await fetch(`http://localhost:3000/api/events/${id}`, {
        cache: "no-store",
      });
      if (!res.ok) {
        throw new Error("Failed to fetch topic");
      }

      return res.json();
    } catch (error) {
      console.log(error);
    }
  };

  const getImageById = async (id) => {
   if(id){
    try {
      const res = await fetch(`http://localhost:3000/api/images/${id}`, {
        cache: "no-store",
      });
      if (!res.ok) {
        throw new Error("Failed to fetch topic");
      }

      return res.json();
    } catch (error) {
      console.log(error);
    }
   }
  };

  const getTopics = async () => {
    try {
      const response = await fetch("http://localhost:3000/api/topics", {
        cache: "no-store",
      });
      if (!response.ok) {
        throw new Error("Failed to fetch topics");
      }
      return response.json();
    } catch (error) {
      console.log("Error loading topics: ", error);
    }
  };
  // Getting topics related to the event
  const getEventTopics = (event, topics) => {
    return event.topics.map((eventTopicId) =>
      topics.find((topic) => topic._id === eventTopicId)
    );
  };

  return (
    <div>
      <div className="btn-dialog">
        {/* <h4 onClick={handleClickOpen}>{text}</h4>  */}
        {
          <Tooltip
            title="Add from the list of existing topics."
            variant="solid"
            size="lg"
            placement="top-end"
          >
            <Button className="btn" variant="solid"  onClick={handleClickOpen}>
              {text}
            </Button>
          </Tooltip>
        }
      </div>
      <Dialog
        open={open}
        maxWidth={100}
        onClose={handleClose}
        className="view-dialog-container"
        PaperProps={{
          component: "form",
          onSubmit: (event) => {
            event.preventDefault();
            const formData = new FormData(event.currentTarget);
            const formJson = Object.fromEntries(formData.entries());
            const email = formJson.email;

            handleClose();
          },
        }}
      >
        <DialogTitle>Session Topic</DialogTitle>
        <DialogContent>
          <DialogContentText>
            {/* CONTENT MUST GO HERE */}
            {/* <TopicsList /> */}
            {/* <SearchTopics /> */}
            {/* <SearchBar /> Hello */}
            {/* {()=>alert("")} */}

            <SearchBar items={topics} id={event?._id} />
          </DialogContentText>
        </DialogContent>

        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleAdd}>Add</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default BrowseSessionDialog;
