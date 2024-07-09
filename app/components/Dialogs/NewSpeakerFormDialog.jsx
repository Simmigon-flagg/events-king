"use client";
import React, { useState } from "react";

import { Button, Tooltip } from "@mui/joy";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import { useRouter } from "next/navigation";
import "./Dialog.css";
import Border from "@/public/image/graphics/orangeblue.jpg";
import Image from "next/image";
import NewSpeakerForm from "../Forms/NewSpeakerForm";
import { Avatar } from "@mui/material";

const NewSpeakerFormDialog = ({text}) => {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [formData, setFormData] = useState({
    firstname: "",
    lastname: "",
    title: "",
    company: "",
    email: "",
    phone: "",
    description: "",
    topics: null,
    presentation: null,
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

  // const handleDateChange = (date) => {
  //   setFormData((prev) => ({
  //     ...prev,
  //     date: date ? date.format("YYYY-MM-DD") : null,
  //   }));
  // };

  // const handleTimeChange = (time) => {
  //   setFormData((prev) => ({
  //     ...prev,
  //     time: time ? time.format("HH:mm") : null,
  //   }));
  // };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const handleDeleteTopic = async (topic_id) => {

    try {
      const response = await fetch(`/api/events/${event_id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ topics: [topic_id, ...eventTopic] }),
      });

      if (!response.ok) {
        throw new Error("Failed to update event topics");
      }

      router.refresh();
    } catch (error) {
      console.error("Error updating event topics:", error);
    }
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:3000/api/speakers", {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      if (response.ok) {
        setFormData({
          firstname: "",
          lastname: "",
          title: "",
          company: "",
          email: "",
          phone: "",
          description: "",
          topics: null,
          presentation: null,
          image: null,
          
        });
        const { speakers } = await response.json();
        console.log(speakers.speakers)

        // handleDeleteTopic(speaker?._id);
      } else {
        throw new Error("Failed to create a speaker");
      }
    } catch (error) {
      console.log(error);
    }
    setOpen(false);
    router.refresh();
  };

  return (
    <div className="dialog-container">
    <div className="btn-dialog">
      <Tooltip
        title="Add new speaker"
        variant="solid"
        size="lg"
        placement="top-end"
      >
        <Button variant="solid" onClick={handleClickOpen}>
          {text} <AddCircleIcon color="green" />
        </Button>
      </Tooltip>
    </div>
    <Dialog
      open={open}
      onClose={handleClose}
      PaperProps={{
        component: "form",
        onSubmit: (event) => {
          event.preventDefault();
          handleClose();
        },
      }}
    >
      <Image src={Border} alt="oranglebluebackground" className="border-image" />
      <DialogTitle>Add New Speaker</DialogTitle>
    
      <DialogContent sx={{display:"flex", flexDirection:"column",  alignItems: 'center'}}>
      <Avatar variant="solid" sx={{ width: 60, height: 60 }}/> <p style={{textDecoration:"underline", color:"blue", fontSize:"12px"}}>Edit</p>
        <DialogContentText>
          <NewSpeakerForm
            formData={formData}
            handleChange={handleChange}
            handleMultiChange={handleMultiChange}
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
  )
};

export default NewSpeakerFormDialog;
