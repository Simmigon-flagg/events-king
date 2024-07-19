"use client";
import React, { useContext, useState } from "react";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import TopicDetailsView from "../TopicDetailsView/TopicDetailsView";
import EditTopicForm from "../Forms/EditTopicForm";
import Border from "@/public/image/graphics/orangeblue.jpg";
import Image from "next/image";
import "./Dialog.css";
import { AllTopicsContext } from "@/context/AllTopics";

const ViewTopicDetailDialog = ({ topic, text }) => {
  const { updateTopic } = useContext(AllTopicsContext);
  const [open, setOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [edit, setEdit] = useState(topic);

  const handleClickOpen = () => {
    setOpen(true);
    setIsEditing(false);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleEdit = () => {
    setIsEditing(true);
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

  const handleSubmit = async (event) => {
    event.preventDefault();
    updateTopic(edit);
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
      >
        <Image
          src={Border}
          alt="oranglebluebackground"
          className="border-image"
        />

        <DialogTitle>
          <span style={{ textDecoration: "underline", fontSize: "25px" }}>
            <strong>{topic?.title}</strong>
          </span>{" "}
        </DialogTitle>
        <DialogContent>
          <DialogContentText>Event: Atlanta Tech Con 2025</DialogContentText>
          {isEditing ? (
            <EditTopicForm
              edit={edit}
              handleChange={handleChange}
              handleDateChange={handleDateChange}
              handleTimeChange={handleTimeChange}
            />
          ) : (
            <TopicDetailsView topic={topic} />
          )}
        </DialogContent>

        <DialogActions>
          <button onClick={handleClose}>Cancel</button>
          {isEditing ? (
            <button type="submit" onClick={handleSubmit}>Save</button>
          ) : (
            <button onClick={handleEdit}>Edit</button>
          )}
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default ViewTopicDetailDialog;
