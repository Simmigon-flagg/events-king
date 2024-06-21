"use client";

import React, { useState } from "react";
import TextField from "@mui/material/TextField";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import "./EditTopicForm.css";
const EditTopicForm = ({ edit, handleChange }) => {
  return (
    <div className="edit-topic-container">
      <DialogTitle>Edit Session Details</DialogTitle>
      <DialogContent>
        <DialogContentText>Details</DialogContentText>
        <div className="edit-topic-form-container">
          <TextField
            label="Session Title"
            type="text"
            onChange={handleChange}
            value={edit?.title}
            name="title"
          />
          <TextField
            label="description"
            type="text"
            onChange={handleChange}
            value={edit?.description}
            name="description"
          />
          <TextField
            label="Speaker"
            type="text"
            onChange={handleChange}
            value={edit?.speaker}
            name="speaker"
          />
          <TextField
            label="Date"
            type="text"
            onChange={handleChange}
            value={edit?.date}
            name="date"
          />
          <TextField
            label="Time"
            type="text"
            onChange={handleChange}
            value={edit?.time}
            name="time"
          />
          <TextField
            label="location"
            type="text"
            onChange={handleChange}
            value={edit?.location}
            name="location"
          />
        </div>
      </DialogContent>
    </div>
  );
};

export default EditTopicForm;
