"use client";
import React, { useState } from "react";
import TopicsForm from "../Forms/TopicsForm";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import "./AddTopicFormDialog.css";
import { useRouter } from "next/navigation";

const AddTopicFormDialog = ({ text }) => {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    speaker: "",
    date: null,
    time: null,
    location: "",
    image: null
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
          image: null
        });
        router.refresh();
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
        <Button variant="contained" onClick={handleClickOpen}>
          {text} {" "} <AddCircleIcon />
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
        <DialogTitle>Session Topic</DialogTitle>
        <DialogContent>
          <DialogContentText>Enter details:</DialogContentText>
          <TopicsForm
            formData={formData}
            handleChange={handleChange}
            handleMultiChange={handleMultiChange}
            handleDateChange={handleDateChange}
            handleTimeChange={handleTimeChange}
          />
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
