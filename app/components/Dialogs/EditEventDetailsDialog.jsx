"use client";
import React, { useState } from "react";
import { Button } from "@mui/joy";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import EditEventForm from "../Forms/EditEventForm";
import { useRouter } from "next/navigation";
import "./Dialog.css"
import Border from "@/public/image/graphics/orangeblue.jpg" 
import Image from "next/image";


const EditEventDetailsDialog = ({ event, text }) => {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [edit, setEdit] = useState(event);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
   
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    
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
    console.log("EDIT EVENTS!!!!!")
    try {
      const response = await fetch(
        `http://localhost:3000/api/events/${edit.id}`,
        {
          method: "PUT",
          header: { "Content-type": "application/json" },
          body: JSON.stringify(edit),
        }
      );
      if (!response.ok) {
        throw new Error("Event was not updated");
      }
      router.push("/events");
  
    } catch (error) {
      console.log(error);
    }
    router.refresh();
    handleClose();
  };

  return (
    <div>
      <div className="btn-dialog">
        {/* <h4 onClick={handleClickOpen}>{text}</h4> */}
        {<Button size="sm" variant="outlined" onClick={handleClickOpen}>
            {text}
          </Button>}
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
        <DialogTitle>{event.title}</DialogTitle>
        <DialogContent>
          <DialogContentText>Details</DialogContentText>


          <EditEventForm edit={edit} handleChange={handleChange} handleDateChange={handleDateChange} handleTimeChange={handleTimeChange}/>

        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleSubmit}>Save</Button>
          {/* {isEditing ? <Button onClick={handleSubmit}>SAVE</Button> : <Button onClick={() => setIsEditing(true)}>EDIT</Button>} */}
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default EditEventDetailsDialog;
