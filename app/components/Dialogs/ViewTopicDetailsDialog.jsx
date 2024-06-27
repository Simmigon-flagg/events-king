"use client";
import React, { useState } from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { useRouter } from "next/navigation";
import TopicDetailsView from "../TopicDetailsView/TopicDetailsView";
import EditTopicForm from "../Forms/EditTopicForm";
import "./Dialog.css"

const ViewTopicDetailDialog = ({ topic, text }) => {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [edit, setEdit] = useState(topic);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setIsEditing(false);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    console.log(name, value);
    setEdit((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleDateChange = (date) => {
    setEdit((prev) => ({
      ...prev,
      date: date ? date.format("YYYY-MM-DD") : null,
    }));
  };

  const handleTimeChange = (time) => {
    setEdit((prev) => ({
      ...prev,
      time: time ? time.format("HH:mm") : null,
    }));
  };
  const handleSubmit = async () => {
    try {
      const response = await fetch(
        `http://localhost:3000/api/topics/${edit.id}`,
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
  // AI Business Conference 2024
  // Event Details 666b39e0cda4eb60783a65ff
  // Title:
  // AI Business Conference 2024
  // Date:
  // 2024-06-30
  // Location:
  // Atlanta, GA
  // Host:
  // Merriam Lexington
  // Description:
  // AI is now the epicenter of the global AI ecosystem and the industry’s only must-attend annual event. Discover the latest applications, the state of generative AI, and best practices shaping the future of artificial intelligence. Enjoy dedicated content & unbeatable networking for both business & technical leaders from every major industry and job function, from leading enterprises, AI startups, investors, government organizations, and media. Together, we’re building the future of responsible human-machine collaboration.
  return (
    <div>
      <div className="btn-dialog">
        <h4 onClick={handleClickOpen}>{text}</h4>
        {/* {<Button variant="contained" onClick={handleClickOpen}>
          VIEW
        </Button>} */}
      </div>
      <Dialog
        open={open}
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
        
          <DialogTitle>{topic.title}</DialogTitle>
          <DialogContent>
            <DialogContentText>Details</DialogContentText>
            {isEditing ? (
              <EditTopicForm edit={edit} handleChange={handleChange} handleDateChange={handleDateChange} handleTimeChange={handleTimeChange} />
            ) : (
              <TopicDetailsView topic={topic} />
            )}
          </DialogContent>
 
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          {isEditing ? (
            <Button onClick={handleSubmit}>SAVE</Button>
          ) : (
            <Button onClick={() => setIsEditing(true)}>EDIT</Button>
          )}
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default ViewTopicDetailDialog;
