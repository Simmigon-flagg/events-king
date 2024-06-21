"use client";
import React, { useState } from "react";
import TopicsForm from "../Forms/TopicsForm";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import "./AddTopicFormDialog.css";
import { useRouter } from "next/navigation";

const getTopicById = async (id) => {
  try {
    const res = await fetch(`http://localhost:3000/api/topics/${id}`, {
      cache: "no-store",
    });
    if (!res.ok) {
      throw new Error("Failed to fetch topic");
    }

    return res.json();
  } catch (error) {
    console.log(error);
  }
};

const ViewTopicDetailDialog = ({ topic }) => {
  const { _id, title, date, time, location, host, description } = topic;

  //   const { topic } =  getTopicById(topicId);
  const router = useRouter();
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div className="view-dialog-container">
      <div className="btn-dialog">
        <Button variant="contained" onClick={handleClickOpen}>
          VIEW
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
            console.log(email);
            handleClose();
          },
        }}
      >
        <DialogTitle>Topic</DialogTitle>

        <DialogContent>
          <DialogContentText>Details</DialogContentText>
          <div>ID: {_id}</div>
          <div>Title: {title}</div>
          <div>Date: {date}</div>
          <div>Time: {time}</div>
          <div>Location: {location}</div>
          <div>Host: {host}</div>
          <div>Description: {description}</div>
        </DialogContent>

        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button>edit</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default ViewTopicDetailDialog;
