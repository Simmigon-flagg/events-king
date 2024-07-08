"use client";
import React, { useState } from "react";
import {Button} from "@mui/joy";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import "./Dialog.css";
import { useRouter } from "next/navigation";
import EventsForm from "../Forms/EventsForm";
import Border from "@/public/image/graphics/orangeblue.jpg" 
import Image from "next/image";

const EventFormDialog = ({ text }) => {
  const router = useRouter();
  const [open, setOpen] = useState(false);
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData();
    Object.keys(formData).forEach((key) => {
      if (key === "topics") {
        formData[key].forEach((topic) => data.append(key, topic));
      } else {
        data.append(key, formData[key]);
      }
    });

    try {
      const response = await fetch("/api/events", {
        method: "POST",
        body: data,
      });

      if (response.ok) {
        setFormData({
          title: "",
          host: "",
          date: "",
          time: "",
          location: "",
          description: "",
          topics: [],
          image: null,
        });
        router.refresh();
      } else {
        throw new Error("Failed to create a event");
      }
    } catch (error) {
      console.log(error);
    }
    setOpen(false);
  };

  return (
    <div className="dialog-container">
      <div className="btn-dialog">
        <Button onClick={handleClickOpen}>
          {text} <AddCircleIcon />
        </Button>
      </div>
      <Dialog
        open={open}
        onClose={handleClose}
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
          <Button onClick={handleClose}>Cancel</Button>
          <Button type="submit" onClick={handleSubmit}>
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default EventFormDialog;
