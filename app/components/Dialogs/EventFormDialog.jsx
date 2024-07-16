"use client";
import React, { useContext, useEffect, useState } from "react";
import { Button } from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import "./Dialog.css";

import EventsForm from "../Forms/EventsForm";
import Border from "@/public/image/graphics/orangeblue.jpg";
import Image from "next/image";
import { AllEventsContext } from "@/context/AllEvents";

const EventFormDialog = ({ text }) => {

  const [open, setOpen] = useState(false);
  const { setEvents, createEvent } = useContext(AllEventsContext);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    host: "",
    date: null,
    time: null,
    location: "",
    image: null,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleMultiChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      description: e.target.value,
    }));
  };

  const handleDateChange = (date) => {
    setFormData((prev) => ({
      ...prev,
      date: date ? date.format("YYYY-MM-DD") : null,
    }));
  };

  const handleTimeChange = (time) => {
    setFormData((prev) => ({
      ...prev,
      time: time ? time.format("HH:mm") : null,
    }));
  };

  const handleFileChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      image: e.target.files[0],
    }));
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const data = new FormData();
    Object.keys(formData).forEach((key) => {
      if (key === "topics") {
        formData[key].forEach((topic) => data.append(key, topic));
      } else {
        data.append(key, formData[key]);
      }
    });

    setOpen(false);
    await createEvent(data);

  };

  useEffect(() => {

  }, [formData])
  return (
    <div className="dialog-container">
      <div className="btn-dialog">
        <button onClick={handleClickOpen}>
          {text} <AddCircleIcon />
        </button>
      </div>
      <Dialog
        open={open}
        onClose={handleClose}
        PaperProps={{
          component: "form",
          onSubmit: handleSubmit,
        }}
      >
        <Image src={Border} alt="oranglebluebackground" className="border-image" />
        <DialogTitle>New Event</DialogTitle>
        <DialogContent>
          <DialogContentText>
            <EventsForm
              formData={formData}
              handleFileChange={handleFileChange}
              handleChange={handleChange}
              handleMultiChange={handleMultiChange}
              handleDateChange={handleDateChange}
              handleTimeChange={handleTimeChange}
            />
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <button onClick={handleClose}>Cancel</button>
          <button type="submit">Save</button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default EventFormDialog;
