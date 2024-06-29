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
import Border from "@/public/image/graphics/orangeblue.jpg" 
import Image from "next/image";
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
        `http://localhost:3000/api/topics/${edit?._id}`,
        {
          method: "PUT",
          header: { "Content-type": "application/json" },
          body: JSON.stringify(edit),
        }
      );
      if (!response.ok) {
        throw new Error("Topic was not updated");
      }
  
    } catch (error) {
      console.log(error);
    }
    router.refresh();
    setIsEditing(false);
    handleClose();
  };

  return (
    <div>
      <div className="btn-dialog">
        <h4 onClick={handleClickOpen}>{text}</h4>

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
       <Image src={Border} alt="oranglebluebackground" className="border-image"/>
        
          <DialogTitle><span style={{textDecoration:"underline", fontSize:"25px"}}><strong>{topic?.title}</strong></span> </DialogTitle>
          <DialogContent>
            <DialogContentText>Event: Atlanta Tech Con 2025</DialogContentText>
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
