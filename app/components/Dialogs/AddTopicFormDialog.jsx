"use client";
import React, { useState } from "react";
import TopicsForm from "../Forms/TopicsForm";
import { Button, Tooltip } from "@mui/joy";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import { useRouter } from "next/navigation";
import "./Dialog.css";
import Border from "@/public/image/graphics/orangeblue.jpg" 
import Image from "next/image";

const AddTopicFormDialog = ({ text, event_id, eventTopic }) => {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    speaker: "",
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

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const handleDeleteTopic = async (topic_id) => {
    // const removedTopic = await eventTopic.filter((topic) => topic._id !== topic_id)

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

      // const updatedEvent = await response.json();
      // console.log(updatedEvent)
      router.refresh();
    } catch (error) {
      console.error("Error updating event topics:", error);
    }
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    // TODO: Empty text boxes needs handling
    // alert(JSON.stringify(formData));
    try {
      const response = await fetch("http://localhost:3000/api/topics", {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      if (response.ok) {
        setFormData({
          title: "",
          description: "",
          speaker: "",
          date: null,
          time: null,
          location: "",
          image: null,
        });
        const { topic } = await response.json();

        handleDeleteTopic(topic?._id);
      } else {
        throw new Error("Failed to create a topic");
      }
    } catch (error) {
      console.log(error);
    }
    setOpen(false);
  };

  return (
    <div className="dialog-container">
      <div className="btn-dialog">
        <Tooltip
          title="Create a brand new topic."
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
            const formData = new FormData(event.currentTarget);
            const formJson = Object.fromEntries(formData.entries());
            const email = formJson.email;
            handleClose();
          },
        }}
      >
          <Image src={Border} alt="oranglebluebackground" className="border-image"/>
        <DialogTitle>New Session</DialogTitle>
        <DialogContent>
          <DialogContentText>
            <TopicsForm
              formData={formData}
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

export default AddTopicFormDialog;
