"use client";
import React, { useState, useRef } from "react";

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
import { styled } from "@mui/material/styles";
import Badge from "@mui/material/Badge";

const NewSpeakerFormDialog = ({text}) => {
  const router = useRouter();
  const inputRef = useRef(null);
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


  const StyledBadge = styled(Badge)(({ theme }) => ({
    "& .MuiBadge-badge": {
      backgroundColor: "#44b700",
      color: "#44b700",
      boxShadow: `0 0 0 2px ${theme.palette.background.paper}`,
      "&::after": {
        position: "absolute",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        borderRadius: "50%",
        animation: "ripple 1.2s infinite ease-in-out",
        border: "1px solid currentColor",
        content: '""',
      },
    },
    "@keyframes ripple": {
      "0%": {
        transform: "scale(.8)",
        opacity: 1,
      },
      "100%": {
        transform: "scale(2.4)",
        opacity: 0,
      },
    },
  }));

  const handleImageClick = () => {
    inputRef.current.click();
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    console.log(file);
   
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
      
        <DialogContentText>
          <NewSpeakerForm
            formData={formData}
            handleChange={handleChange}
            handleMultiChange={handleMultiChange}
            handleImageClick={handleImageClick}
            handleImageChange={handleImageChange}
            inputRef={inputRef}
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
