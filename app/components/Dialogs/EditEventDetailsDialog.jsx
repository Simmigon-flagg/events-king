"use client";
import React, { useContext, useState } from "react";
// import { Button } from "@mui/joy";
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
import { AllEventsContext } from "@/context/AllEvents";

const EditEventDetailsDialog = ({ event, text }) => {
  const router = useRouter();
  const { updateEvent } = useContext(AllEventsContext);
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
    
    updateEvent(edit)
    handleClose();
  };

  return (
    <div>
      <div className="btn-dialog">

        {<button
          size="sm"
          variant="outlined"
          onClick={handleClickOpen}>
          {text}
        </button>}
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
        <Image src={Border} alt="oranglebluebackground" className="border-image" />
        <DialogTitle>{event.title}</DialogTitle>
        <DialogContent>
          <DialogContentText>Details</DialogContentText>
          <EditEventForm edit={edit} handleChange={handleChange} handleDateChange={handleDateChange} handleTimeChange={handleTimeChange} />

        </DialogContent>
        <DialogActions>
          <button onClick={handleClose}>Cancel</button>
          <button onClick={handleSubmit}>Save</button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default EditEventDetailsDialog;
